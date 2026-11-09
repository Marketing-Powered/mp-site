/* Server-side delivery of website leads to the "Marketing Powered Website
   Leads" Google Sheet and the info@ inbox.

   The sheet carries a small Apps Script web app (scripts/google-sheets-leads.gs).
   For each POST it appends one row and emails the lead to
   info@marketingpowered.ai (the address is fixed in the script). The route
   posts a JSON object keyed by the sheet's column headers; the script writes
   each value under the matching header, stamps the Received time itself, and
   adds a column for any key the sheet doesn't have yet, so a field added to a
   form later is never dropped.

   Configured by one env var:
     GOOGLE_SHEETS_WEBHOOK_URL  the web app URL from Deploy → Manage deployments
   Unset = skipped (the route then relies on the Resend fallback, if any). */

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
  // Powered Cards order requests (/cards/order). The Apps Script files rows
  // whose Form is "Powered Cards Order" on the sheet's Orders tab, whose
  // headers these are. Name, Email, Phone, Website, Locations and Message
  // above are shared with that tab.
  ["Item", ["item"]],
  ["Quantity", ["quantity"]],
  ["Add-ons", ["addons"]],
  ["Billing", ["billing"]],
  ["Estimated Total", ["total"]],
  ["Business", ["business"]],
  ["Business Type", ["businessType"]],
  ["Card Destination", ["destination"]],
  ["Destination Link", ["destinationLink"]],
  ["Logo Files", ["logo"]],
  ["Shipping Address", ["shipping"]],
];

const MAPPED = new Set(COLUMNS.flatMap(([, fields]) => fields));

/* Form value the Powered Cards order request posts (components/cards/OrderForm). */
export const ORDER_SOURCE = "Powered Cards Order";

/* Headers on the Leads tab, always written (blank or not) so every lead row
   has the same shape. */
const LEAD_COLUMNS = new Set([
  "Form",
  "Page",
  "Name",
  "Email",
  "Phone",
  "Organization",
  "Website",
  "Monthly Ad Spend",
  "Vertical",
  "Locations",
  "Timeline",
  "Message",
]);

/** Shape a raw submission as one sheet row, keyed by column header. Fields no
    column covers pass through under their own name. */
export function leadToSheetRow(
  data: Record<string, unknown>,
  source: string,
): Record<string, string> {
  const row: Record<string, string> = {};
  const isOrder = source === ORDER_SOURCE;
  for (const [column, fields] of COLUMNS) {
    const value = fields.map((f) => str(data[f])).find(Boolean) ?? "";
    // A lead row always carries the Leads tab's own headers, blank or not, so
    // every lead has the same shape. An order row sends only filled values,
    // so the script never adds lead-only columns to the Orders tab.
    if (value || (!isOrder && LEAD_COLUMNS.has(column))) row[column] = value;
  }
  row.Form = source;
  // New orders start in the Status dropdown's first state.
  if (isOrder) row.Status = "New";
  for (const [k, v] of Object.entries(data)) {
    if (!MAPPED.has(k) && str(v)) row[k] = str(v);
  }
  return row;
}

/** Outcome of the Apps Script call. `ok`: the row was written. `emailed`:
    the script sent the lead email. `configured: false` means the env var is
    unset on purpose. */
export type SheetResult = {
  configured: boolean;
  ok: boolean;
  emailed: boolean;
  detail?: string;
};

/** Append the lead to the Google Sheet and have the script email it.
    Never throws. */
export async function deliverToSheet(
  data: Record<string, unknown>,
  source: string,
): Promise<SheetResult> {
  const url = env("GOOGLE_SHEETS_WEBHOOK_URL");
  if (!url) {
    console.log("[lead] sheet delivery skipped: GOOGLE_SHEETS_WEBHOOK_URL not set");
    return { configured: false, ok: false, emailed: false };
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
      return { configured: true, ok: false, emailed: false, detail };
    }
    let reply: { ok?: boolean; emailed?: boolean; error?: string } | null = null;
    try {
      reply = JSON.parse(body);
    } catch {
      // An HTML page here usually means the deployment isn't public
      // ("Who has access" must be "Anyone") or the URL is not the /exec one.
    }
    if (!reply) {
      const detail =
        "sheet script gave no reply (check the web app URL and that access is set to Anyone)";
      console.error(`[lead] ${detail}`);
      return { configured: true, ok: false, emailed: false, detail };
    }
    const result: SheetResult = {
      configured: true,
      ok: reply.ok === true,
      emailed: reply.emailed === true,
      detail: reply.error ? `sheet script: ${reply.error}` : undefined,
    };
    if (result.detail) console.error(`[lead] ${result.detail}`);
    return result;
  } catch (err) {
    console.error("[lead] sheet delivery failed:", err);
    return { configured: true, ok: false, emailed: false, detail: `sheet ${String(err)}` };
  }
}
