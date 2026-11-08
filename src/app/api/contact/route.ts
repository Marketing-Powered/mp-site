import { NextResponse } from "next/server";
import { deliverToSheet, env } from "@/lib/leadSheet";

export const runtime = "nodejs";

/* Lead delivery endpoint.
   Forms POST their fields here; we append them to the website leads Google
   Sheet (see src/lib/leadSheet.ts) and email them via Resend. Both channels
   are env-driven so the build never depends on secrets:
     - GOOGLE_SHEETS_WEBHOOK_URL  the sheet's Apps Script web app URL
     - RESEND_API_KEY   the Resend API key
     - LEADS_EMAIL      destination inbox(es), comma-separated
     - LEADS_FROM_EMAIL verified sender, e.g. "Marketing Powered <leads@marketingpowered.ai>"
   When a channel is unset we log the lead and skip it gracefully
   so the form still succeeds (the prospect is never blocked, the lead is
   never silently lost from the server logs). */

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  // Append to the leads sheet first. It never throws, so a sheet failure
  // can't affect email delivery; a configured-but-failing sheet is called
  // out at the top of the lead email instead of vanishing into server logs.
  const sheet = await deliverToSheet(data, source);
  const sheetOk = sheet.ok;

  const apiKey = env("RESEND_API_KEY");
  const to = env("LEADS_EMAIL");

  if (!apiKey || !to) {
    console.log("[lead] email delivery skipped: RESEND_API_KEY/LEADS_EMAIL not set");
    return NextResponse.json({ success: true, delivered: false, sheetOk });
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

    // Surfaced only when the sheet is set up and the append failed — never
    // for the case where sheet delivery isn't configured at all.
    const warningHtml = !sheetOk
      ? `<div style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B;font-size:13px;line-height:1.5">
          <strong>⚠ This lead did NOT reach the leads sheet</strong> — add it to the sheet manually.<br/>
          ${escapeHtml(sheet.detail ?? "")}
        </div>`
      : "";
    const warningText = !sheetOk
      ? `⚠ This lead did NOT reach the leads sheet — add it to the sheet manually.\n${sheet.detail ?? ""}\n\n`
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
      subject: `${sheetOk ? "" : "⚠ "}New lead — ${source}${email ? ` (${email})` : ""}`,
      replyTo: email || undefined,
      html,
      text,
    });

    if (error) {
      console.error("[lead] Resend delivery error:", error);
      return NextResponse.json({ success: true, delivered: false, sheetOk });
    }

    return NextResponse.json({ success: true, delivered: true, sheetOk });
  } catch (err) {
    console.error("[lead] delivery failed:", err);
    return NextResponse.json({ success: true, delivered: false, sheetOk });
  }
}
