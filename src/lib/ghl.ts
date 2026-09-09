/* Server-side GoHighLevel API helpers shared by the lead delivery route
   (/api/contact) and the diagnostics route (/api/ghl-health).

   Opportunities silently stopped being created once before because the
   configured pipeline/stage IDs went stale after GHL-side edits (pipelines
   recreated in the GHL UI get new IDs) and because some GHL tenants reject
   opportunities without a pipelineStageId. Everything here exists to make
   that failure mode either self-heal (stage resolution) or loudly
   diagnosable (precise errors + /api/ghl-health). */

// Overridable so a mock server can stand in for GHL in local smoke tests.
export const GHL_API =
  process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";

/** fetch() with one retry on transient failures (network errors, 429, 5xx).
    Non-transient failures (401/403/404/422 — bad token/id/payload) return
    immediately since retrying can't fix a config problem. Used for every
    GHL call so a single dropped connection doesn't cost a lead. */
export async function fetchWithRetry(
  url: string,
  init: RequestInit,
  retries = 1,
  delayMs = 400,
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, init);
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

export function ghlHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export type GhlStage = { id: string; name?: string };
export type GhlPipeline = { id: string; name?: string; stages?: GhlStage[] };

export type PipelinesResult =
  | { ok: true; pipelines: GhlPipeline[] }
  | { ok: false; status?: number; detail: string };

/** List the location's pipelines. Needs the "View Opportunities" scope on the
    Private Integration token; callers must tolerate a failure here (the live
    lead path falls back to the configured env IDs). */
export async function fetchGhlPipelines(
  token: string,
  locationId: string,
): Promise<PipelinesResult> {
  try {
    const res = await fetchWithRetry(
      `${GHL_API}/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`,
      { headers: ghlHeaders(token) },
    );
    if (!res.ok) {
      return { ok: false, status: res.status, detail: await res.text() };
    }
    const json = (await res.json()) as { pipelines?: GhlPipeline[] };
    return { ok: true, pipelines: json.pipelines ?? [] };
  } catch (err) {
    return { ok: false, detail: String(err) };
  }
}

export type OpportunityTarget = {
  pipelineId: string;
  /** Stage new opportunities land in; omitted only when the pipeline has no
      stages or the pipeline list could not be fetched and no stage is set. */
  pipelineStageId?: string;
  /** Human-readable note about how the target was resolved (for logs). */
  note: string;
  /** True when we confirmed the configured pipeline no longer exists — the
      opportunity POST is guaranteed to fail, so callers should skip it and
      surface the log instead. */
  pipelineMissing?: boolean;
};

/* Cache the resolved target per serverless instance so we don't call the
   pipelines endpoint on every single lead. Short TTL keeps GHL-side edits
   (stage renamed, pipeline rebuilt) from being missed for long. */
let targetCache: { value: OpportunityTarget; at: number } | null = null;
const TARGET_TTL_MS = 5 * 60 * 1000;

/** Decide which pipeline/stage a new opportunity should be created in.
    Validates the configured GHL_PIPELINE_ID/GHL_PIPELINE_STAGE_ID against the
    live pipeline list and fills in the pipeline's first stage when no valid
    stage is configured. Falls back to the raw env values when the pipeline
    list is unavailable (e.g. token lacks the view scope). */
export async function resolveOpportunityTarget(
  token: string,
  locationId: string,
  pipelineId: string,
  configuredStageId?: string,
): Promise<OpportunityTarget> {
  if (targetCache && Date.now() - targetCache.at < TARGET_TTL_MS) {
    return targetCache.value;
  }

  let target: OpportunityTarget;
  const listed = await fetchGhlPipelines(token, locationId);

  if (!listed.ok) {
    target = {
      pipelineId,
      pipelineStageId: configuredStageId || undefined,
      note: `pipeline list unavailable (${listed.status ?? "network"}: ${listed.detail.slice(0, 200)}); using configured env IDs as-is`,
    };
  } else {
    const pipeline = listed.pipelines.find((p) => p.id === pipelineId);
    if (!pipeline) {
      const available = listed.pipelines
        .map((p) => `"${p.name ?? "?"}" (${p.id})`)
        .join(", ");
      target = {
        pipelineId,
        pipelineStageId: configuredStageId || undefined,
        pipelineMissing: true,
        note: `GHL_PIPELINE_ID ${pipelineId} not found in this location — it was likely deleted/recreated in GHL. Available pipelines: ${available || "(none)"}. Update the env var (run scripts/ghl-pipelines.mjs).`,
      };
    } else {
      const stages = pipeline.stages ?? [];
      const configured = stages.find((s) => s.id === configuredStageId);
      const stage = configured ?? stages[0];
      target = {
        pipelineId,
        pipelineStageId: stage?.id,
        note: configured
          ? `using configured stage "${configured.name ?? configured.id}"`
          : configuredStageId
            ? `GHL_PIPELINE_STAGE_ID ${configuredStageId} not found in pipeline "${pipeline.name ?? pipelineId}" — falling back to first stage "${stage?.name ?? stage?.id ?? "(pipeline has no stages)"}"`
            : `no GHL_PIPELINE_STAGE_ID set — using first stage "${stage?.name ?? stage?.id ?? "(pipeline has no stages)"}" of "${pipeline.name ?? pipelineId}"`,
      };
    }
  }

  targetCache = { value: target, at: Date.now() };
  return target;
}

/** Drop the cached pipeline/stage resolution (used after a failed
    opportunity POST so the next lead re-checks GHL instead of re-using a
    now-stale target for the full TTL). */
export function invalidateOpportunityTarget() {
  targetCache = null;
}

/** One-line operator hint for common GHL API failure statuses, appended to
    error logs so the fix is obvious from the log line alone. */
export function ghlFailureHint(status: number): string {
  if (status === 401)
    return "hint: the Private Integration token was rejected — it may have been rotated or deleted (GHL → Settings → Private Integrations). Update GHL_API_TOKEN.";
  if (status === 403)
    return "hint: the token is valid but lacks a required scope — it needs 'Edit Contacts' and 'Edit Opportunities' (plus 'View Opportunities' for pipeline lookups).";
  if (status === 404 || status === 400 || status === 422)
    return "hint: an ID in the request is likely stale (location/pipeline/stage changed in GHL). Run scripts/ghl-pipelines.mjs or open /api/ghl-health to verify.";
  return "";
}
