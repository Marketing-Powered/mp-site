import { NextResponse, type NextRequest } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { env, fetchGhlPipelines, ghlFailureHint } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Lead-delivery diagnostics.

   Every delivery channel in /api/contact is deliberately best-effort: a GHL
   or Resend failure is logged and swallowed so the prospect is never blocked.
   The cost is that breakage (rotated token, rebuilt pipeline, wiped env vars)
   is invisible without server-log access. This endpoint makes it visible:

     GET /api/ghl-health?key=<DIAGNOSTICS_KEY>

   It reports which env vars are present, live-validates the GHL token +
   location + pipeline + stage against the pipelines API, and states plainly
   what happens to a form fill right now. Nothing here mutates anything and
   no secret values are echoed back.

   Gated by the DIAGNOSTICS_KEY env var: when it's unset, or the key doesn't
   match, the route answers 404 exactly like a route that doesn't exist. */

function keyMatches(provided: string | null, expected: string): boolean {
  if (!provided) return false;
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

const present = (v: string | undefined): boolean => Boolean(v && v.trim());

export async function GET(request: NextRequest) {
  const expected = env("DIAGNOSTICS_KEY");
  const provided =
    request.nextUrl.searchParams.get("key") ??
    request.headers.get("x-diagnostics-key");
  if (!expected || !keyMatches(provided, expected)) {
    return new NextResponse(null, { status: 404 });
  }

  const configured = {
    GHL_API_TOKEN: present(env("GHL_API_TOKEN")),
    GHL_LOCATION_ID: present(env("GHL_LOCATION_ID")),
    GHL_PIPELINE_ID: present(env("GHL_PIPELINE_ID")),
    GHL_PIPELINE_STAGE_ID: present(env("GHL_PIPELINE_STAGE_ID")),
    GHL_WEBHOOK_URL: present(env("GHL_WEBHOOK_URL")),
    RESEND_API_KEY: present(env("RESEND_API_KEY")),
    LEADS_EMAIL: present(env("LEADS_EMAIL")),
    LEADS_FROM_EMAIL: present(env("LEADS_FROM_EMAIL")),
  };

  const verdicts: string[] = [];
  let ghl: Record<string, unknown> | null = null;

  if (!configured.GHL_API_TOKEN || !configured.GHL_LOCATION_ID) {
    verdicts.push(
      "GHL opportunities: NOT created — GHL_API_TOKEN and/or GHL_LOCATION_ID are missing, so the direct-API path is skipped entirely.",
    );
  } else {
    const listed = await fetchGhlPipelines(
      env("GHL_API_TOKEN")!,
      env("GHL_LOCATION_ID")!,
    );
    if (!listed.ok) {
      ghl = {
        pipelinesFetch: `FAILED (${listed.status ?? "network"})`,
        detail: listed.detail.slice(0, 300),
        hint: listed.status ? ghlFailureHint(listed.status) : "",
      };
      verdicts.push(
        listed.status === 401
          ? "GHL opportunities: NOT created — the API token is being rejected (rotated/deleted). Generate a new Private Integration token and update GHL_API_TOKEN."
          : listed.status === 403
            ? "GHL pipeline check: token lacks the 'View Opportunities' scope, so this endpoint can't verify the pipeline. Contact/opportunity writes may still work if their scopes are granted."
            : `GHL pipeline check failed (${listed.status ?? "network error"}) — see detail.`,
      );
    } else {
      const pipelineId = env("GHL_PIPELINE_ID");
      const stageId = env("GHL_PIPELINE_STAGE_ID");
      const pipeline = listed.pipelines.find((p) => p.id === pipelineId);
      const stage = pipeline?.stages?.find((s) => s.id === stageId);
      ghl = {
        pipelinesFetch: "ok (token + location valid)",
        pipelines: listed.pipelines.map((p) => ({
          id: p.id,
          name: p.name,
          stages: (p.stages ?? []).map((s) => ({ id: s.id, name: s.name })),
        })),
        configuredPipeline: pipelineId
          ? pipeline
            ? `found: "${pipeline.name ?? pipelineId}"`
            : "NOT FOUND — pipeline was deleted/recreated in GHL; update GHL_PIPELINE_ID"
          : "not set",
        configuredStage: stageId
          ? stage
            ? `found: "${stage.name ?? stageId}"`
            : "NOT FOUND in configured pipeline — first stage will be used instead"
          : "not set — first stage of the pipeline will be used",
      };
      if (!pipelineId) {
        verdicts.push(
          "GHL opportunities: NOT created — GHL_PIPELINE_ID is not set (contact + note are still created).",
        );
      } else if (!pipeline) {
        verdicts.push(
          "GHL opportunities: NOT created — GHL_PIPELINE_ID no longer matches any pipeline in this location. Pick a pipeline id from the `pipelines` list above and update the env var.",
        );
      } else {
        verdicts.push(
          `GHL opportunities: OK — will be created in "${pipeline.name ?? pipelineId}", stage "${(stage ?? pipeline.stages?.[0])?.name ?? "(no stages)"}".`,
        );
      }
    }
  }

  verdicts.push(
    configured.GHL_WEBHOOK_URL
      ? "GHL webhook: configured — submissions are POSTed to the workflow webhook (check the workflow's enrollment history in GHL if leads are missing)."
      : "GHL webhook: not configured (GHL_WEBHOOK_URL unset) — workflow path skipped.",
    configured.RESEND_API_KEY && configured.LEADS_EMAIL
      ? "Email: configured — delivery still depends on a valid Resend key and verified sender domain (check the [lead] server logs if delivered:false)."
      : "Email: NOT sent — RESEND_API_KEY and/or LEADS_EMAIL are missing.",
  );

  return NextResponse.json({ env: configured, ghl, verdicts });
}
