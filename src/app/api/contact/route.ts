import { NextResponse } from "next/server";
import { deliverToSheet, env, type SheetResult } from "@/lib/leadSheet";

export const runtime = "nodejs";

/* Lead delivery endpoint.

   Every form posts here. Each lead goes to two places:
     1. a row in the "Marketing Powered Website Leads" Google Sheet, and
     2. an email to info@marketingpowered.ai.
   Both are done by the Apps Script attached to the sheet (see
   src/lib/leadSheet.ts and scripts/google-sheets-leads.gs), configured by
   GOOGLE_SHEETS_WEBHOOK_URL.

   Backup email: when the script did not send the email (unreachable, or its
   mail step failed), the route sends it through Resend instead, if Resend is
   configured:
     - RESEND_API_KEY   the Resend API key
     - LEADS_EMAIL      destination inbox(es), comma-separated; defaults to
                        info@marketingpowered.ai
     - LEADS_FROM_EMAIL verified sender, e.g. "Marketing Powered <leads@marketingpowered.ai>"

   The visitor gets a confirmation when the lead reached the sheet or an
   inbox. When it reached neither, the route answers 502 so the form shows
   its "could not send" message (try again, or email us) instead of
   confirming a request nobody received. Every lead is also logged. */

const DEFAULT_LEADS_EMAIL = "info@marketingpowered.ai";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Backup lead email through Resend. Returns false (without sending) when
    Resend isn't configured. Never throws. */
async function emailViaResend(
  data: Record<string, unknown>,
  source: string,
  sheet: SheetResult,
): Promise<boolean> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) {
    console.log("[lead] backup email skipped: RESEND_API_KEY not set");
    return false;
  }
  const to = (env("LEADS_EMAIL") || DEFAULT_LEADS_EMAIL)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const inSheet = sheet.configured && sheet.ok;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = env("LEADS_FROM_EMAIL") || "Marketing Powered <onboarding@resend.dev>";

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

    // Flag a lead that missed the sheet so someone adds it by hand.
    const missed = sheet.detail ?? "GOOGLE_SHEETS_WEBHOOK_URL is not set";
    const warningHtml = !inSheet
      ? `<div style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B;font-size:13px;line-height:1.5">
          <strong>⚠ This lead did NOT reach the leads sheet</strong> — add it to the sheet manually.<br/>
          ${escapeHtml(missed)}
        </div>`
      : "";
    const warningText = !inSheet
      ? `⚠ This lead did NOT reach the leads sheet — add it to the sheet manually.\n${missed}\n\n`
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
      to,
      subject: `${inSheet ? "" : "⚠ "}New lead — ${source}${email ? ` (${email})` : ""}`,
      replyTo: email || undefined,
      html,
      text,
    });
    if (error) {
      console.error("[lead] Resend delivery error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Resend delivery failed:", err);
    return false;
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

  // Always log so a lead is never lost, even before delivery is configured.
  console.log(`[lead] ${source}:`, JSON.stringify(data));

  // Sheet row + info@ email, both from the Apps Script. Never throws.
  const sheet = await deliverToSheet(data, source);
  const inSheet = sheet.configured && sheet.ok;

  // Backup email only when the script didn't send one, so info@ never gets
  // the same lead twice.
  const emailed = sheet.emailed || (await emailViaResend(data, source, sheet));

  if (inSheet || emailed) {
    return NextResponse.json({ success: true, inSheet, emailed });
  }

  console.error(`[lead] NOT DELIVERED (no sheet row, no email) — ${source}:`, JSON.stringify(data));
  return NextResponse.json(
    { success: false, error: "Lead could not be delivered" },
    { status: 502 },
  );
}
