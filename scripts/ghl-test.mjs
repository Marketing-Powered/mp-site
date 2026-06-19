#!/usr/bin/env node
/*
 * GHL webhook smoke test.
 *
 * Posts a realistic, normalized lead payload to a GoHighLevel inbound webhook
 * so you can confirm GHL receives it and your workflow field-mapping works.
 * It uses the SAME mapping the live route (src/app/api/contact/route.ts) uses,
 * so the shape here matches production exactly.
 *
 * Usage:
 *   node scripts/ghl-test.mjs "https://services.leadconnectorhq.com/hooks/.../webhook-trigger/..."
 *   # or:  GHL_WEBHOOK_URL="https://..." node scripts/ghl-test.mjs
 *   # pick a different sample form:  node scripts/ghl-test.mjs <url> contact|audit|book|qualification
 */

const str = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v));

// Mirror of mapLeadForGhl() in src/app/api/contact/route.ts
function mapLeadForGhl(data, source) {
  const fullName = str(data.name);
  const sp = fullName.indexOf(" ");
  const firstName = sp === -1 ? fullName : fullName.slice(0, sp);
  const lastName = sp === -1 ? "" : fullName.slice(sp + 1).trim();
  const consumed = new Set([
    "name", "org", "company", "message", "notes", "challenge", "source", "email", "phone",
  ]);
  const mapped = {
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

// Sample raw submissions, exactly as each form posts them to /api/contact.
const SAMPLES = {
  contact: {
    source: "Contact",
    raw: { name: "Dana Ruiz", org: "Coastal Recovery Group", email: "dana.ruiz@coastalrecovery.com", phone: "+1 561-555-0142", message: "We're opening two new locations and need help scaling compliant intake." },
  },
  audit: {
    source: "Request an Audit",
    raw: { name: "Marcus Webb", email: "mwebb@summitbh.org", company: "Summit Behavioral Health", website: "https://summitbh.org", spend: "$15K-$50K", challenge: "Our cost per admission keeps climbing and attribution is a black box." },
  },
  book: {
    source: "Book a Call",
    raw: { name: "Priya Anand", org: "Lighthouse Wellness", email: "priya@lighthousewellness.co", phone: "+1 305-555-0188", notes: "Prefer mornings ET. Want to discuss Google + Meta mix." },
  },
  qualification: {
    source: "Qualification",
    raw: { name: "Jordan Lee", org: "Riverside Mental Health", email: "jlee@riversidemh.com", vertical: "Mental Health", locations: "6–15", spend: "$100k–$500k", timeline: "This quarter", notes: "Currently with another agency, contract ends in 60 days." },
  },
};

const url = process.argv[2] || process.env.GHL_WEBHOOK_URL;
const which = (process.argv[3] || "qualification").toLowerCase();

if (!url) {
  console.error("Usage: node scripts/ghl-test.mjs <GHL_WEBHOOK_URL> [contact|audit|book|qualification]");
  process.exit(1);
}
const sample = SAMPLES[which];
if (!sample) {
  console.error(`Unknown sample "${which}". Choose: ${Object.keys(SAMPLES).join(", ")}`);
  process.exit(1);
}

const payload = mapLeadForGhl(sample.raw, sample.source);

console.log(`\nPOST ${url}`);
console.log(`Sample form: ${which} (source="${sample.source}")`);
console.log("Payload:\n" + JSON.stringify(payload, null, 2) + "\n");

try {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  console.log(`Response: ${res.status} ${res.statusText}`);
  if (body) console.log("Body: " + body);
  process.exit(res.ok ? 0 : 1);
} catch (err) {
  console.error("Request failed:", err);
  process.exit(1);
}
