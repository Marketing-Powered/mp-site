import { NextResponse } from "next/server";

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

/* Best-effort delivery to a GoHighLevel inbound webhook. Independent of the
   Resend email path: this is fully wrapped so a GHL outage never blocks email
   delivery (and vice versa). When GHL_WEBHOOK_URL is unset we skip silently. */
async function deliverToGhl(data: Record<string, unknown>, source: string) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapLeadForGhl(data, source)),
    });
    if (!res.ok) {
      console.error(`[lead] GHL delivery non-OK: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("[lead] GHL delivery failed:", err);
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

  // Best-effort push to GoHighLevel. Independent of the email path below — it
  // never throws, so a GHL failure can't affect Resend delivery.
  await deliverToGhl(data, source);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json({ success: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from =
      process.env.LEADS_FROM_EMAIL || "Marketing Powered <onboarding@resend.dev>";

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

    const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto">
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0090F0;margin:0 0 4px">Marketing Powered · New Lead</p>
      <h2 style="margin:0 0 16px;color:#0A1322;font-size:20px">${escapeHtml(source)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;border:1px solid #eef1f5;border-radius:8px;overflow:hidden">${rows}</table>
    </div>`;

    const text = entries.map(([k, v]) => `${k}: ${String(v ?? "")}`).join("\n");

    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `New lead — ${source}${email ? ` (${email})` : ""}`,
      replyTo: email || undefined,
      html,
      text,
    });

    if (error) {
      console.error("[lead] Resend delivery error:", error);
      return NextResponse.json({ success: true, delivered: false });
    }

    return NextResponse.json({ success: true, delivered: true });
  } catch (err) {
    console.error("[lead] delivery failed:", err);
    return NextResponse.json({ success: true, delivered: false });
  }
}
