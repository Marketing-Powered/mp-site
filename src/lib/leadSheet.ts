/* Server-side delivery of website leads to the "Marketing Powered Website
   Leads" Google Sheet.

   The sheet carries a small Apps Script web app (scripts/google-sheets-leads.gs)
   that appends one row per POST. The route posts a JSON object keyed by the
   sheet's column headers; the script writes each value under the matching
   header, stamps the Received time itself, and adds a column for any key the
   sheet doesn't have yet, so a field added to a form later is never dropped.

   Configured by one env var:
     GOOGLE_SHEETS_WEBHOOK_URL  the web app URL from Deploy → Manage deployments
   Unset = sheet delivery is skipped (the lead is still logged and emailed). */

/** Read an env var, trimmed, treating blank as unset. Values pasted into a
    hosting dashboard routinely carry a trailing space or newline. */
export function env(name: string): string | undefined {
  const raw = process.env[name];
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** fetch() with one retry on transient failures (network errors, timeouts,
    429, 5xx). A duplicate row is a better outcome than a lost lead. */
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  retries = 1,
  delayMs = 500,
  timeoutMs = 15000,
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
      if (!res.ok && (res.status >= 500 || res.status === 429) && attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      return res;
    } catch (err) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      throw err;
    }
  }
}

const str = (v: unknown) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v);

/* Form field name → sheet column. Forms name the same thing differently
   (org vs company; message vs notes vs challenge), so each column lists every
   field that feeds it and takes the first one present. "Received" is not here:
   the Apps Script stamps it when the row is written. */
const COLUMNS: [column: string, fields: string[]][] = [
  ["Form", ["source"]],
  ["Page", ["page"]],
  ["Name", ["name"]],
  ["Email", ["email"]],
  ["Phone", ["phone"]],
  ["Organization", ["org", "company"]],
  ["Website", ["website"]],
  ["Monthly Ad Spend", ["spend"]],
  ["Vertical", ["vertical"]],
  ["Locations", ["locations"]],
  ["Timeline", ["timeline"]],
  ["Message", ["message", "notes", "challenge"]],
];

const MAPPED = new Set(COLUMNS.flatMap(([, fields]) => fields));

/** Shape a raw submission as one sheet row, keyed by column header. Fields no
    column covers pass through under their own name. */
export function leadToSheetRow(
  data: Record<string, unknown>,
  source: string,
): Record<string, string> {
  const row: Record<string, string> = {};
  for (const [column, fields] of COLUMNS) {
    row[column] = fields.map((f) => str(data[f])).find(Boolean) ?? "";
  }
  row.Form = source;
  for (const [k, v] of Object.entries(data)) {
    if (!MAPPED.has(k) && str(v)) row[k] = str(v);
  }
  return row;
}

/** Outcome of sheet delivery. `configured: false` means the env var is unset
    on purpose; `configured: true, ok: false` is a real failure worth
    surfacing in the lead email. */
export type SheetResult = { configured: boolean; ok: boolean; detail?: string };

/** Append the lead to the Google Sheet. Never throws. */
export async function deliverToSheet(
  data: Record<string, unknown>,
  source: string,
): Promise<SheetResult> {
  const url = env("GOOGLE_SHEETS_WEBHOOK_URL");
  if (!url) {
    console.log("[lead] sheet delivery skipped: GOOGLE_SHEETS_WEBHOOK_URL not set");
    return { configured: false, ok: true };
  }

  try {
    // Apps Script answers a POST with a 302 to the script's output; fetch
    // follows it and the body is the script's JSON reply.
    const res = await fetchWithRetry(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadToSheetRow(data, source)),
    });
    const body = await res.text();
    if (!res.ok) {
      const detail = `sheet ${res.status} ${res.statusText}`;
      console.error(`[lead] sheet delivery non-OK: ${detail}`);
      return { configured: true, ok: false, detail };
    }
    let reply: { ok?: boolean; error?: string } | null = null;
    try {
      reply = JSON.parse(body);
    } catch {
      // An HTML page here usually means the deployment isn't public
      // ("Who has access" must be "Anyone") or the URL is not the /exec one.
    }
    if (!reply?.ok) {
      const detail = reply?.error
        ? `sheet script error: ${reply.error}`
        : "sheet did not confirm the row (check the web app URL and that access is set to Anyone)";
      console.error(`[lead] ${detail}`);
      return { configured: true, ok: false, detail };
    }
    return { configured: true, ok: true };
  } catch (err) {
    console.error("[lead] sheet delivery failed:", err);
    return { configured: true, ok: false, detail: `sheet ${String(err)}` };
  }
}
