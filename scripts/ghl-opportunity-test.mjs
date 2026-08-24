#!/usr/bin/env node
/*
 * GHL direct-API smoke test — exercises the exact flow the live route
 * (src/app/api/contact/route.ts) runs for every form fill:
 *
 *   1. validate token + location by listing pipelines
 *   2. verify GHL_PIPELINE_ID / GHL_PIPELINE_STAGE_ID against the live list
 *   3. (--create only) upsert a clearly-labeled test contact, attach a note,
 *      and create a test opportunity — then print the IDs so you can see it
 *      land in GHL and delete it.
 *
 * Run it with the SAME env values the production deployment uses to find out
 * exactly which step fails (rotated token vs. stale pipeline vs. scopes):
 *
 *   GHL_API_TOKEN="pit-..." GHL_LOCATION_ID="..." GHL_PIPELINE_ID="..." \
 *     node scripts/ghl-opportunity-test.mjs           # validate only
 *   ... node scripts/ghl-opportunity-test.mjs --create  # full end-to-end
 */

const API = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const token = process.env.GHL_API_TOKEN;
const locationId = process.env.GHL_LOCATION_ID;
const pipelineId = process.env.GHL_PIPELINE_ID;
const stageIdEnv = process.env.GHL_PIPELINE_STAGE_ID;
const doCreate = process.argv.includes("--create");

if (!token || !locationId) {
  console.error(
    "Usage: GHL_API_TOKEN=pit-... GHL_LOCATION_ID=... [GHL_PIPELINE_ID=...] node scripts/ghl-opportunity-test.mjs [--create]",
  );
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
  Accept: "application/json",
};

function hint(status) {
  if (status === 401) return "→ token rejected: rotated/deleted? Regenerate the Private Integration token.";
  if (status === 403) return "→ missing scope: token needs Edit Contacts + Edit Opportunities (+ View Opportunities for pipeline listing).";
  if ([400, 404, 422].includes(status)) return "→ an ID is likely stale (location/pipeline/stage changed in GHL).";
  return "";
}

async function step(label, fn) {
  process.stdout.write(`\n== ${label}\n`);
  const res = await fn();
  const body = await res.text();
  console.log(`   ${res.status} ${res.statusText} ${hint(res.status)}`);
  if (!res.ok) {
    console.log(`   ${body.slice(0, 400)}`);
    console.error("\nFAILED at this step — this is what breaks the live form flow.");
    process.exit(1);
  }
  return JSON.parse(body || "{}");
}

// 1. Token + location check via pipeline listing.
const { pipelines = [] } = await step(
  "1. List pipelines (validates GHL_API_TOKEN + GHL_LOCATION_ID)",
  () => fetch(`${API}/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`, { headers }),
);
for (const p of pipelines) {
  console.log(`   pipeline "${p.name}" (${p.id})`);
  for (const s of p.stages ?? []) console.log(`     stage "${s.name}" (${s.id})`);
}

// 2. Pipeline/stage sanity — mirrors resolveOpportunityTarget() in the route.
if (!pipelineId) {
  console.log("\n== 2. GHL_PIPELINE_ID not set — live route upserts the contact but SKIPS the opportunity.");
  process.exit(doCreate ? 1 : 0);
}
const pipeline = pipelines.find((p) => p.id === pipelineId);
if (!pipeline) {
  console.error(`\n== 2. GHL_PIPELINE_ID ${pipelineId} NOT FOUND in this location — opportunities cannot be created.`);
  console.error("   Pick one of the pipeline ids listed above and update the env var.");
  process.exit(1);
}
const stage = pipeline.stages?.find((s) => s.id === stageIdEnv) ?? pipeline.stages?.[0];
console.log(`\n== 2. Target ok: pipeline "${pipeline.name}", stage "${stage?.name ?? "(none)"}"${
  stageIdEnv && stage?.id !== stageIdEnv ? " (configured stage NOT found — first stage used)" : ""
}`);

if (!doCreate) {
  console.log("\nValidation passed. Re-run with --create to create a labeled test contact + opportunity.");
  process.exit(0);
}

// 3. Full end-to-end: contact → note → opportunity, exactly like the route.
const contact = await step("3. Upsert test contact", () =>
  fetch(`${API}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId,
      source: "ghl-opportunity-test",
      firstName: "Website",
      lastName: "Smoke Test",
      email: "ghl-smoke-test@marketingpowered.ai",
      companyName: "DELETE ME — smoke test",
      tags: ["website-lead"],
    }),
  }),
);
const contactId = contact?.contact?.id;
console.log(`   contact id: ${contactId}`);
if (!contactId) {
  console.error("   upsert returned no contact id — live route would stop here.");
  process.exit(1);
}

await step("4. Attach note", () =>
  fetch(`${API}/contacts/${contactId}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ body: "Website form (ghl-opportunity-test)\nsmoke test — safe to delete" }),
  }),
);

const opp = await step("5. Create opportunity", () =>
  fetch(`${API}/opportunities/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId,
      pipelineId,
      contactId,
      status: "open",
      source: "ghl-opportunity-test",
      name: "DELETE ME — website smoke test",
      ...(stage?.id ? { pipelineStageId: stage.id } : {}),
    }),
  }),
);
console.log(`   opportunity id: ${opp?.opportunity?.id ?? "(unknown)"}`);
console.log(
  `\nAll steps passed — check pipeline "${pipeline.name}" in GHL for "DELETE ME — website smoke test", then delete the test contact + opportunity.`,
);
