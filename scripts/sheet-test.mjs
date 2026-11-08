#!/usr/bin/env node
/**
 * Post one clearly-labelled test lead straight to the leads sheet's Apps
 * Script web app and report what came back. Use it after deploying (or
 * re-deploying) scripts/google-sheets-leads.gs to confirm the row lands and
 * the lead email reaches info@marketingpowered.ai.
 *
 *   node scripts/sheet-test.mjs "https://script.google.com/macros/s/.../exec"
 *
 * Falls back to GOOGLE_SHEETS_WEBHOOK_URL when no argument is given. Delete
 * the test row from the sheet (and the test email) afterwards.
 */

const url = (process.argv[2] || process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").trim();
if (!url) {
  console.error("Usage: node scripts/sheet-test.mjs <web app URL>");
  process.exit(1);
}

const row = {
  Form: "TEST — delete me",
  Page: "/scripts/sheet-test",
  Name: "Sheet Test",
  Email: "test@example.com",
  Phone: "+1 (555) 010-0000",
  Organization: "Test Org",
  Message: "Test row from scripts/sheet-test.mjs. Safe to delete.",
};

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(row),
});
const body = await res.text();
console.log(`HTTP ${res.status}`);
console.log(body.slice(0, 500));

let reply = null;
try {
  reply = JSON.parse(body);
} catch {
  // not JSON
}
if (reply?.ok && reply?.emailed) {
  console.log(`OK — test lead written to row ${reply.row} and emailed.`);
} else if (reply) {
  console.error(
    `PARTIAL — row written: ${reply.ok === true}, email sent: ${reply.emailed === true}. ${reply.error ?? ""}`,
  );
  process.exit(1);
} else {
  console.error(
    "FAILED — if the reply is an HTML page, the deployment's access is not set to Anyone or the URL is not the /exec one.",
  );
  process.exit(1);
}
