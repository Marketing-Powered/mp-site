/**
 * Website lead intake for the "Marketing Powered Website Leads" Google Sheet.
 *
 * The site's /api/contact route POSTs each form submission here as JSON keyed
 * by the sheet's column headers (see src/lib/leadSheet.ts). This script writes
 * one row per submission on the "Leads" tab.
 *
 * Setup (once):
 *   1. Open the sheet → Extensions → Apps Script. Replace the editor's contents
 *      with this file and save.
 *   2. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Deploy, approve the permissions prompt, and copy the Web app URL
 *      (it ends in /exec).
 *   3. Set that URL as GOOGLE_SHEETS_WEBHOOK_URL in the site's Vercel
 *      environment variables and redeploy the site.
 *
 * After editing this script, publish the change with Deploy → Manage
 * deployments → edit (pencil) → Version: New version. That keeps the same
 * URL; a brand-new deployment would get a new URL.
 */

var TAB = 'Leads';
var RECEIVED = 'Received';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Two submissions at the same moment must not write to the same row.
    lock.waitLock(20000);

    var lead = JSON.parse(e.postData.contents);
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(TAB) || book.getSheets()[0];

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

    var row = headers.map(function (h) {
      return h === RECEIVED ? new Date() : asText(lead[h]);
    });
    sheet.appendRow(row);

    return reply({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Store what the visitor typed as plain text. The leading apostrophe stops the
// sheet from turning a value into a formula (a visitor could type "=..."), a
// date, or a number that drops a phone number's formatting. It isn't shown.
function asText(value) {
  if (value === undefined || value === null || value === '') return '';
  return "'" + String(value);
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
