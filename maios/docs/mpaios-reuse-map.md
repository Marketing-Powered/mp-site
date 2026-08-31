# Reuse map: mpaios → MAIOS

The construction plan partly descends from the existing prototype at
[`Mhulick86/mpaios`](https://github.com/Mhulick86/mpaios) — a marketing-skills
orchestrator (multi-provider LLM planner/dispatcher, Quick Actions dashboard,
WhatsApp runtime on openclaw, Vercel serverless API with JWT auth). This document
maps what carries forward, what gets rebuilt behind plan contracts, and what retires.

| mpaios module | Fate in MAIOS | Where / work package |
|---|---|---|
| `src/orchestrator/` (planner, dispatch, providers: anthropic/openai/google/lmstudio) | **Carries forward as the model gateway pattern.** Local-planner-with-cloud-fallback becomes the gateway's routing policy: one internal API, model aliases, health, concurrency, structured-output validation, per-run version recording. Agents call aliases, never providers or hostnames directly (§10.6). | `apps/agent-api` + model gateway — AGENT-002 |
| `src/orchestrator/prompts.ts` (`ACTIONS`, `SPECIALIST_MODELS`) | **Becomes versioned agent manifests.** Each quick action turns into an agent definition with owner, tool allowlist, data policy, approval policy, output schema, and evaluation gate — not inline constants. | `agents/definitions/` — AGENT-001 |
| `api/quick-actions/*` (review-generation, check-citations, competitor-scan, audit-gbp) | **Rebuilt as typed tools + agent runs** behind the run coordinator, with approvals for external effects. The dashboard concept survives as `/app/agents` + `/app/approvals` (§7.2). | `agents/tools/`, APP-009 — AGENT-004/005/006 |
| `.claude/skills/` + `src/marketing/generated/skills.ts` + `scripts/build-skills-index.mjs` | **Becomes knowledge ingestion.** Skill documents flow through the document → chunk → embed → Qdrant pipeline with tenant/access payload filters and version manifests, instead of a build-time TS index. | `packages/db` knowledge tables, ASSET-007..009, AGENT-014 |
| `src/marketing/router.ts` + templates (whatsappSequence, churnWinback, inboundSurvey, coldWhatsapp) | **Logic survives, execution surface changes.** Sequences/keyword-pause/opt-out logic maps onto MessagingProvider with the canonical consent ledger (opt-out keywords processed immediately, §8.8) and n8n for long-running sequences. WhatsApp/openclaw channel is out of Phase 1 scope; revisit as a MessagingProvider adapter in Wave 5 (MSG-001) if the channel is still wanted. | `packages/providers/messaging.ts`, WP15, FLOW-004 |
| `src/auth/` (bcrypt passwords, JWT sessions, @vercel/kv store) | **Retires.** The plan mandates OIDC (Authentik/Keycloak/managed) with PKCE, MFA for privileged roles, and no custom password storage (§13.2). | SEC-001..003 |
| `api/*` Vercel serverless functions | **Retires as the backend shape.** Domain API is the NestJS modular monolith with outbox/idempotency/tenancy; the web app deploys to Vercel but the API does not run as scattered functions. | `apps/api`, WP3 |
| `VERCEL_DEPLOY.md` (LM Studio tunnel, env-var discipline) | Reference for the Vercel setup of `apps/web` and for pooled local-model compute reachable from the model gateway. | `infra/`, AGENT-002 |
| openclaw dependency | Not a Phase 1 dependency. Multi-channel gateway duties belong to provider adapters; keep mpaios running as-is until its actions are re-homed. | — |

**Porting rule:** nothing moves over by copy-paste into domain code paths. Everything
re-enters through the plan's contracts — typed tools, provider interfaces, canonical
events — so the prototype's lock-ins (inline prompts, ad-hoc auth, serverless state)
don't survive into the platform.
