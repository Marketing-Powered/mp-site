#!/usr/bin/env node
/*
 * List GoHighLevel pipelines + stages for a location.
 *
 * Use this to grab the GHL_PIPELINE_ID and GHL_PIPELINE_STAGE_ID values that
 * src/app/api/contact/route.ts needs to create opportunities.
 *
 * Usage:
 *   GHL_API_TOKEN="pit-..." GHL_LOCATION_ID="..." node scripts/ghl-pipelines.mjs
 *   # or positionally:  node scripts/ghl-pipelines.mjs <token> <locationId>
 *
 * The token is a Private Integration token (GHL → Settings → Private
 * Integrations) with at least the "View Opportunities" scope; the same token
 * needs "Edit Contacts" + "Edit Opportunities" for the live route.
 */

const token = process.argv[2] || process.env.GHL_API_TOKEN;
const locationId = process.argv[3] || process.env.GHL_LOCATION_ID;

if (!token || !locationId) {
  console.error(
    "Usage: GHL_API_TOKEN=pit-... GHL_LOCATION_ID=... node scripts/ghl-pipelines.mjs",
  );
  process.exit(1);
}

const res = await fetch(
  `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      Accept: "application/json",
    },
  },
);

if (!res.ok) {
  console.error(`Request failed: ${res.status} ${res.statusText}`);
  console.error(await res.text());
  process.exit(1);
}

const { pipelines = [] } = await res.json();
if (!pipelines.length) {
  console.log("No pipelines found for this location.");
  process.exit(0);
}

for (const p of pipelines) {
  console.log(`\nPipeline: ${p.name}`);
  console.log(`  GHL_PIPELINE_ID=${p.id}`);
  for (const s of p.stages ?? []) {
    console.log(`    Stage: ${s.name}`);
    console.log(`      GHL_PIPELINE_STAGE_ID=${s.id}`);
  }
}
console.log(
  "\nPick the pipeline (and optionally the entry stage) for new website leads and set the env vars above.",
);
