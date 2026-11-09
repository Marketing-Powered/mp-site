/**
 * Website lead intake for the "Marketing Powered Website Leads" Google Sheet.
 *
 * The site's /api/contact route POSTs each form submission here as JSON keyed
 * by the sheet's column headers (see src/lib/leadSheet.ts). For every
 * submission this script:
 *   1. writes one row on the "Leads" tab (Powered Cards order requests go to
 *      the "Orders" tab instead, see TABS_BY_FORM), and
 *   2. emails the lead to LEADS_TO, with Reply-To set to the prospect.
 * The two steps are independent: if one fails the other still runs, and the
 * reply tells the site which ones worked.
 *
 * The script opens the sheet by ID, so it runs the same whether it lives in
 * a standalone Apps Script project or attached to the sheet.
 *
 * Setup (once):
 *   1. Open the "Marketing Powered Website Leads" Apps Script project in
 *      Google Drive (or: open the sheet → Extensions → Apps Script and paste
 *      this file in).
 *   2. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Deploy, approve the permissions prompt (edit this spreadsheet, send
 *      email as you), and copy the Web app URL (it ends in /exec).
 *   3. Set that URL as GOOGLE_SHEETS_WEBHOOK_URL in the site's Vercel
 *      environment variables and redeploy the site.
 *
 * After editing this script, publish the change with Deploy → Manage
 * deployments → edit (pencil) → Version: New version. That keeps the same
 * URL; a brand-new deployment would get a new URL.
 */

// The "Marketing Powered Website Leads" spreadsheet.
var SHEET_ID = '19K6szs80mc5PHNgGcWSR5ptZuYKwq7E6HPnwYruGw5c';
var TAB = 'Leads';
// Submissions whose Form value is listed here are filed on their own tab
// instead of Leads. Powered Cards order requests (/cards/order) go to the
// Orders tab, which has a Status dropdown for working the order.
var TABS_BY_FORM = { 'Powered Cards Order': 'Orders' };
var ORDER_FORMS = { 'Powered Cards Order': true };
var RECEIVED = 'Received';
// Where lead emails go. Fixed here, never taken from the request, so the
// web app can't be used to send mail anywhere else.
var LEADS_TO = 'info@marketingpowered.ai';

function doPost(e) {
  var lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, emailed: false, error: 'invalid JSON' });
  }

  var result = { ok: false, emailed: false };
  var errors = [];

  try {
    result.row = appendLead(lead);
    result.ok = true;
  } catch (err) {
    errors.push('sheet: ' + err);
  }

  try {
    emailLead(lead, result.ok ? null : errors[0]);
    result.emailed = true;
  } catch (err) {
    errors.push('email: ' + err);
  }

  if (errors.length) result.error = errors.join('; ');
  return reply(result);
}

function appendLead(lead) {
  var lock = LockService.getScriptLock();
  // Two submissions at the same moment must not write to the same row.
  lock.waitLock(20000);
  try {
    var sheet = sheetFor(lead);
    var lastCol = sheet.getLastColumn();
    var headers = lastCol
      ? sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String)
      : [];
    if (headers.length === 0) {
      headers.push(RECEIVED);
      sheet.getRange(1, 1).setValue(RECEIVED);
    }

    // A field with no column yet gets one, so nothing a form sends is dropped.
    Object.keys(lead).forEach(function (key) {
      if (key && headers.indexOf(key) === -1) {
        headers.push(key);
        sheet.getRange(1, headers.length).setValue(key);
      }
    });

    sheet.appendRow(
      headers.map(function (h) {
        return h === RECEIVED ? new Date() : asText(lead[h]);
      })
    );
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function emailLead(lead, sheetError) {
  var form = String(lead.Form || 'Website form');
  var email = String(lead.Email || '').trim();
  var order = isOrder(lead);
  var kind = order ? 'New Order Request' : 'New Lead';
  var nextStep = order
    ? '<p style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#EEF6FF;border:1px solid #BFDBFE;color:#0A1322;font-size:13px;line-height:1.5">' +
      'No payment was taken on the site. Reply to confirm the design, destination and pricing, then collect payment before anything prints.</p>'
    : '';
  var fields = Object.keys(lead).filter(function (k) {
    return k !== 'Form' && String(lead[k] == null ? '' : lead[k]).trim() !== '';
  });

  var warningHtml = sheetError
    ? '<div style="margin:0 0 16px;padding:12px 16px;border-radius:8px;background:#FEF2F2;border:1px solid #FCA5A5;color:#991B1B;font-size:13px">' +
      '<strong>This lead did NOT reach the leads sheet.</strong> Add it to the sheet by hand.<br>' +
      escapeHtml(sheetError) +
      '</div>'
    : '';
  var rowsHtml = fields
    .map(function (k) {
      return (
        '<tr><td style="padding:8px 14px;font-weight:600;color:#0A1322;border-bottom:1px solid #eef1f5;vertical-align:top;white-space:nowrap">' +
        escapeHtml(k) +
        '</td><td style="padding:8px 14px;color:#33425a;border-bottom:1px solid #eef1f5;white-space:pre-wrap">' +
        escapeHtml(String(lead[k])) +
        '</td></tr>'
      );
    })
    .join('');
  var sheetUrl = book().getUrl();

  var htmlBody =
    '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">' +
    warningHtml +
    '<p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#0090F0;margin:0 0 4px">Marketing Powered · ' + kind + '</p>' +
    '<h2 style="margin:0 0 16px;color:#0A1322;font-size:20px">' + escapeHtml(form) + '</h2>' +
    nextStep +
    '<table style="border-collapse:collapse;width:100%;font-size:14px;border:1px solid #eef1f5">' + rowsHtml + '</table>' +
    '<p style="font-size:13px;margin:16px 0 0"><a href="' + sheetUrl + '">Open the leads sheet</a></p>' +
    '</div>';
  var body =
    (sheetError ? 'This lead did NOT reach the leads sheet. Add it by hand.\n' + sheetError + '\n\n' : '') +
    (order ? 'No payment was taken on the site. Confirm design, destination and pricing, then collect payment before anything prints.\n\n' : '') +
    fields.map(function (k) { return k + ': ' + lead[k]; }).join('\n') +
    '\n\nLeads sheet: ' + sheetUrl;

  var message = {
    to: LEADS_TO,
    subject:
      (sheetError ? '⚠ ' : '') +
      (order ? 'New order request — ' + String(lead.Item || form) : 'New lead — ' + form) +
      (email ? ' (' + email + ')' : ''),
    htmlBody: htmlBody,
    body: body,
    name: 'Marketing Powered Website',
  };
  // Reply goes straight to the prospect, when the address looks valid.
  if (/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email)) message.replyTo = email;
  MailApp.sendEmail(message);
}

function book() {
  return SpreadsheetApp.openById(SHEET_ID);
}

function leadsSheet() {
  var b = book();
  return b.getSheetByName(TAB) || b.getSheets()[0];
}

// The tab a submission belongs on: its Form's own tab when one is listed and
// exists, otherwise Leads. A missing tab is created with a header row so an
// order is never lost to a renamed sheet.
function sheetFor(lead) {
  var name = TABS_BY_FORM[String(lead.Form || '')];
  if (!name) return leadsSheet();
  var b = book();
  var sheet = b.getSheetByName(name);
  if (!sheet) {
    sheet = b.insertSheet(name);
    sheet.getRange(1, 1).setValue(RECEIVED);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function isOrder(lead) {
  return ORDER_FORMS[String(lead.Form || '')] === true;
}

// Store what the visitor typed as plain text. The leading apostrophe stops the
// sheet from turning a value into a formula (a visitor could type "=..."), a
// date, or a number that drops a phone number's formatting. It isn't shown.
function asText(value) {
  if (value === undefined || value === null || value === '') return '';
  return "'" + String(value);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
