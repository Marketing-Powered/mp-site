import { NextResponse } from "next/server";
import {
  GHL_API,
  env,
  fetchWithRetry,
  ghlFailureHint,
  ghlHeaders,
  invalidateOpportunityTarget,
  resolveOpportunityTarget,
} from "@/lib/ghl";

export const runtime = "nodejs";

/* Lead delivery endpoint.
   Forms POST their fields here; we deliver them by email via Resend.
   Delivery is fully env-driven so the build never depends on secrets:
     - RESEND_API_KEY   the Resend API key
     - LEADS_EMAIL      destination inbox(es), comma-separated
     - LEADS_FROM_EMAIL verified sender, e.g. "Marketing Powered <leads@marketingpowered.ai>"
   When the key or destination is unset we log the lead and no-op gracefully
   so the form still succeeds (the prospect is never blocked, the lead is
   never silently lost from the server logs). */

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const str = (v: unknown) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v);

/* Normalize a raw form submission into a stable, GHL-friendly shape so the
   workflow field mapping never has to care which form a lead came from.
   Forms vary: org vs company, message vs notes vs challenge, name is a single
   full-name field. We map those to canonical keys, split the name, and pass
   through every remaining field (website, spend, vertical, locations, timeline)
   so nothing is lost. */
function mapLeadForGhl(
  data: Record<string, unknown>,
  source: string,
): Record<string, unknown> {
  const fullName = str(data.name);
  const sp = fullName.indexOf(" ");
  const firstName = sp === -1 ? fullName : fullName.slice(0, sp);
  const lastName = sp === -1 ? "" : fullName.slice(sp + 1).trim();

  // Keys consumed/renamed below — everything else is passed through untouched.
  const consumed = new Set([
    "name",
    "org",
    "company",
    "message",
    "notes",
    "challenge",
    "source",
    "email",
    "phone",
  ]);

  const mapped: Record<string, unknown> = {
    full_name: fullName,
    first_name: firstName,
    last_name: lastName,
    email: str(data.email),
    phone: str(data.phone),
    company: str(data.org) || str(data.company),
    message: str(data.message) || str(data.notes) || str(data.challenge),
    source,
  };

  for (const [k, v] of Object.entries(data)) {
    if (!consumed.has(k)) mapped[k] = v;
  }

  return mapped;
}

/* Outcome of one GHL delivery channel. `configured: false` means the env
   vars for that channel are intentionally unset (not a failure to report);
   `configured: true, ok: false` means it's set up but the call failed —
   the one case worth surfacing to a human. */
type GhlChannelResult = { configured: boolean; ok: boolean; detail?: string };

/* Best-effort delivery to a GoHighLevel inbound webhook. Independent of the
   Resend email path: this is fully wrapped so a GHL outage never blocks email
   delivery (and vice versa). When GHL_WEBHOOK_URL is unset we skip silently.
   Retries once on transient failures (see fetchWithRetry). */
async function deliverToGhl(
  data: Record<string, unknown>,
  source: string,
): Promise<GhlChannelResult> {
  const url = env("GHL_WEBHOOK_URL");
  if (!url) {
    console.log("[lead] GHL webhook delivery skipped: GHL_WEBHOOK_URL not set");
    return { configured: false, ok: true };
  }

  try {
    const res = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapLeadForGhl(data, source)),
    });
    if (!res.ok) {
      const detail = `webhook ${res.status} ${res.statusText}`;
      console.error(`[lead] GHL delivery non-OK: ${res.status} ${res.statusText}`);
      return { configured: true, ok: false, detail };
    }
    return { configured: true, ok: true };
  } catch (err) {
    console.error("[lead] GHL delivery failed:", err);
    return { configured: true, ok: false, detail: `webhook ${String(err)}` };
  }
}

/* Direct GoHighLevel API delivery: upsert the contact, attach the message and
   extra form fields as a note, and create an opportunity in the configured
   pipeline. Runs only when GHL_API_TOKEN + GHL_LOCATION_ID are set (Private
   Integration token with contacts.write + opportunities.write scopes); the
   opportunity additionally needs GHL_PIPELINE_ID. Best-effort like the webhook
   path — any failure is logged, never thrown, so the prospect is never blocked
   and email delivery is unaffected. GET /api/ghl-health (gated by
   DIAGNOSTICS_KEY) reports this pipeline's live config state when leads stop
   showing up in GHL. */
async function createGhlOpportunity(
  data: Record<string, unknown>,
  source: string,
): Promise<GhlChannelResult> {
  const token = env("GHL_API_TOKEN");
  const locationId = env("GHL_LOCATION_ID");
  if (!token || !locationId) {
    console.log("[lead] GHL API delivery skipped: GHL_API_TOKEN/GHL_LOCATION_ID not set");
    return { configured: false, ok: true };
  }

  const lead = mapLeadForGhl(data, source);
  const headers = ghlHeaders(token);

  try {
    // 1. Upsert the contact (dedupes on email/phone within the location).
    const contactBody: Record<string, unknown> = { locationId, source };
    if (lead.first_name) contactBody.firstName = lead.first_name;
    if (lead.last_name) contactBody.lastName = lead.last_name;
    if (lead.email) contactBody.email = lead.email;
    if (lead.phone) contactBody.phone = lead.phone;
    if (lead.company) contactBody.companyName = lead.company;
    contactBody.tags = ["website-lead"];

    const contactRes = await fetchWithRetry(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify(contactBody),
    });
    if (!contactRes.ok) {
      const detail = `contact upsert ${contactRes.status} ${await contactRes.text()} ${ghlFailureHint(contactRes.status)}`;
      console.error(`[lead] GHL contact upsert non-OK: ${detail}`);
      return { configured: true, ok: false, detail };
    }
    const contactJson = (await contactRes.json()) as { contact?: { id?: string } };
    const contactId = contactJson?.contact?.id;
    if (!contactId) {
      console.error("[lead] GHL contact upsert returned no contact id");
      return { configured: true, ok: false, detail: "contact upsert returned no contact id" };
    }

    // 2. Attach the message + any extra form fields (spend, website, vertical,
    //    timeline…) as a note so the full submission is visible on the contact.
    const noteLines = Object.entries(lead)
      .filter(([k, v]) => !["first_name", "last_name", "full_name"].includes(k) && str(v))
      .map(([k, v]) => `${k}: ${str(v)}`);
    if (noteLines.length) {
      const noteRes = await fetchWithRetry(`${GHL_API}/contacts/${contactId}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: `Website form (${source})\n${noteLines.join("\n")}` }),
      });
      if (!noteRes.ok) {
        console.error(`[lead] GHL note non-OK: ${noteRes.status} ${await noteRes.text()}`);
      }
    }

    // 3. Create the opportunity in the configured pipeline/stage. The stage
    //    is resolved against GHL's live pipeline list (stale IDs after a
    //    GHL-side pipeline rebuild are the main way this step silently dies)
    //    and always sent when the pipeline has stages — some tenants reject
    //    stage-less opportunities.
    const pipelineId = env("GHL_PIPELINE_ID");
    if (!pipelineId) {
      console.log(`[lead] GHL contact ${contactId} upserted (no GHL_PIPELINE_ID; skipping opportunity)`);
      return { configured: true, ok: true };
    }
    const target = await resolveOpportunityTarget(
      token,
      locationId,
      pipelineId,
      env("GHL_PIPELINE_STAGE_ID"),
    );
    console.log(`[lead] GHL opportunity target: ${target.note}`);
    if (target.pipelineMissing) {
      console.error(
        `[lead] GHL opportunity NOT created for contact ${contactId}: ${target.note}`,
      );
      return { configured: true, ok: false, detail: `opportunity: ${target.note}` };
    }
    const oppBody: Record<string, unknown> = {
      locationId,
      pipelineId: target.pipelineId,
      contactId,
      status: "open",
      source,
      name: `${str(lead.full_name) || str(lead.email) || "Website lead"} — ${source}`,
    };
    if (target.pipelineStageId) {
      oppBody.pipelineStageId = target.pipelineStageId;
    }

    const oppRes = await fetchWithRetry(`${GHL_API}/opportunities/`, {
      method: "POST",
      headers,
      body: JSON.stringify(oppBody),
    });
    if (!oppRes.ok) {
      invalidateOpportunityTarget();
      const detail = `opportunity ${oppRes.status} ${await oppRes.text()} ${ghlFailureHint(oppRes.status)}`;
      console.error(`[lead] GHL opportunity non-OK: ${detail}`);
      return { configured: true, ok: false, detail };
    }
    const oppJson = (await oppRes.json()) as { opportunity?: { id?: string } };
    console.log(
      `[lead] GHL opportunity created: ${oppJson?.opportunity?.id ?? "(id unknown)"} for contact ${contactId}`,
    );
    return { configured: true, ok: true };
  } catch (err) {
    console.error("[lead] GHL API delivery failed:", err);
    return { configured: true, ok: false, detail: String(err) };
  }
}

export async function POST(request: Request) {
  let data: Record<string, unknown> = {};
  try {
    const parsed = await request.json();
    if (parsed && typeof parsed === "object") data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }

  const source =
    typeof data.source === "string" && data.source.trim() ? data.source.trim() : "Website form";
  const email = typeof data.email === "string" ? data.email.trim() : "";

  // Always log so a lead is never lost, even before delivery is configured.
  console.log(`[lead] ${source}:`, JSON.stringify(data));

  // Best-effort push to GoHighLevel — inbound webhook (workflow-driven) and
  // direct API (contact + note + opportunity) run independently in parallel.
  // Neither throws, so a GHL failure can't affect Resend delivery. Their
  // outcomes feed the lead email below: a configured-but-failing channel is
  // the one case that otherwise vanishes into serverless logs no one is
  // watching, so it's surfaced directly in the notification instead.
  const [webhookResult, apiResult] = await Promise.all([
    deliverToGhl(data, source),
    createGhlOpportunity(data, source),
  ]);
  const ghlIssues = [webhookResult, apiResult]
    .filter((r) => r.configured && !r.ok)
    .map((r) => r.detail)
    .filter((d): d is string => Boolean(d));
  const ghlOk = ghlIssues.length === 0;

  const apiKey = env("RESEND_API_KEY");
  const to = env("LEADS_EMAIL");

  if (!apiKey || !to) {
    console.log("[lead] email delivery skipped: RESEND_API_KEY/LEADS_EMAIL not set");
    return NextResponse.json({ success: true, delivered: false, ghlOk });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from =
      env("LEADS_FROM_EMAIL") || "Marketing Powered <onboarding@resend.dev>";

    const entries = Object.entries(data).filter(([k]) => k !== "source");
    const rows = entries
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 14px;font-weight:600;color:#0A1322;text-transform:capitalize;border-bottom:1px solid #eef1f5;vertical-align:top;white-space:nowrap">${escapeHtml(
            k,
          )}</td><td style="padding:8px 14px;color:#33425a;border-bottom:1px solid #eef1f5">${escapeHtml(
            String(v ?? ""),
          )}</td></tr>`,
      )
      .join("");

    // Surfaced only when a configured GHL channel actually failed — never
    // for the (common, intentional) case where GHL isn't set up at all.
    const warningHtml = !ghlOk
      ? `<div style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B;font-size:13px;line-height:1.5">
          <strong>⚠ This lead did NOT reach GHL</strong> — add it to your CRM/workflow manually. Check <code>/api/ghl-health</code> for the full diagnosis.<br/>
          ${ghlIssues.map((d) => escapeHtml(d)).join("<br/>")}
        </div>`
      : "";
    const warningText = !ghlOk
      ? `⚠ This lead did NOT reach GHL — add it to your CRM/workflow manually. Check /api/ghl-health for the full diagnosis.\n${ghlIssues.join("\n")}\n\n`
      : "";

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto">
      ${warningHtml}
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0090F0;margin:0 0 4px">Marketing Powered · New Lead</p>
      <h2 style="margin:0 0 16px;color:#0A1322;font-size:20px">${escapeHtml(source)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;border:1px solid #eef1f5;border-radius:8px;overflow:hidden">${rows}</table>
    </div>`;

    const text = `${warningText}${entries.map(([k, v]) => `${k}: ${String(v ?? "")}`).join("\n")}`;

    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `${ghlOk ? "" : "⚠ "}New lead — ${source}${email ? ` (${email})` : ""}`,
      replyTo: email || undefined,
      html,
      text,
    });

    if (error) {
      console.error("[lead] Resend delivery error:", error);
      return NextResponse.json({ success: true, delivered: false, ghlOk });
    }

    return NextResponse.json({ success: true, delivered: true, ghlOk });
  } catch (err) {
    console.error("[lead] delivery failed:", err);
    return NextResponse.json({ success: true, delivered: false, ghlOk });
  }
}
