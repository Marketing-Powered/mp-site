# MAIOS — Marketing Powered AI Operating System

Build-ready implementation of the **MAIOS Full Development Construction Plan** (v1.0, 2026-08-29).
The authoritative blueprint lives at [`docs/construction-plan/`](docs/construction-plan/) and supersedes
earlier Attio-first or immediate self-hosted-SIP concepts.

> **Priority order:** CRM → SIP/Telephony → MAIOS Application → Attribution → Agents

## What MAIOS owns (and what it doesn't)

Phase 1 uses **Close** as the operational sales CRM and telephony execution environment.
MAIOS owns the canonical SQL database, vector database, UTM and attribution history, agent
runtime, application API, and business rules. **TNAS** stores binary assets only. Every
integration is implemented behind provider interfaces so Close can later be replaced by an
owned CRM and SIP stack **without rewriting MAIOS**.

| Capability | System of record | Execution surface |
|---|---|---|
| Tenants, identity, permissions | MAIOS PostgreSQL + OIDC IdP | MAIOS app |
| Companies, people, leads, opportunities | MAIOS PostgreSQL | Close (Phase 1), MAIOS app |
| UTMs, click IDs, sessions, touches | MAIOS PostgreSQL | MAIOS app; first/latest rollups in Close |
| Attribution calculations | MAIOS attribution service (immutable runs) | MAIOS dashboards |
| Calls & SMS (Phase 1) | Close executes; MAIOS normalizes | Close UI; MAIOS intelligence |
| Calls & SMS (owned phase) | MAIOS voice/messaging services | MAIOS embedded softphone |
| Vector memory / RAG | Qdrant under MAIOS control | Agent runtime + app |
| Files and recordings | TNAS via `AssetStorageProvider` | Authorized retrieval through MAIOS |
| Automations | Domain services + n8n (external/long workflows) | Admin views and run logs |
| Projects / team chat | Asana / Slack (integrated, not rebuilt) | Asana / Slack |

## Mandatory design patterns

- **Canonical IDs** — MAIOS UUIDs for every domain object; provider IDs only in `external_object_map`.
- **Transactional outbox** — domain writes + outbound integration requests in one DB transaction.
- **Webhook inbox** — verify, persist, deduplicate, acknowledge before asynchronous processing.
- **Idempotency** — every repeatable operation accepts/derives a key and safely returns the prior result.
- **Provider interfaces + capability flags** — the app asks what a provider supports; it never assumes.
- **Tenant context** — every request, event, job, vector query, asset, and audit entry carries tenant scope.
- **Immutable event history** — touches, conversions, call events, webhook payloads are append-only.
- **Approval gates** — high-impact agent actions require policy and, where defined, human approval.

## Monorepo layout

```
apps/
  web/          Next.js MAIOS application (deployed on Vercel)
  api/          NestJS domain API (validation, authz, transactions, adapters, OpenAPI)
  agent-api/    Python FastAPI agent + retrieval services
  worker/       TypeScript integration and projection workers (outbox, webhooks, reconciliation)
  tracking/     Lightweight first-party tracking service (UTM/click capture)
packages/
  domain/       Entities, value objects, policies, canonical events
  db/           Migrations, generated types, repositories
  providers/    Provider interfaces and capability types (the anti-lock-in layer)
  provider-close/      Close CRM/telephony/messaging adapter (Phase 1)
  provider-twenty/     Future CRM adapter
  provider-maios-sip/  Future owned telephony adapter (Kamailio/FreeSWITCH)
  provider-tnas/       Asset storage adapter
  api-client/   Generated TypeScript client (no handwritten DTOs in the frontend)
  ui/           Shared design system
  observability/ Logging, tracing, metrics helpers
  test-fixtures/ Synthetic, tenant-safe test data
agents/
  definitions/  Versioned agent manifests and prompts
  tools/        Typed tools (no raw SQL, no arbitrary HTTP)
  evaluations/  Golden cases and regression tests
infra/
  compose/ proxy/ monitoring/ postgres/ qdrant/ n8n/ sip-lab/
docs/
  adr/ api/ runbooks/ data-dictionary/ construction-plan/
```

## Technology baseline

Next.js + React + TypeScript (web) · NestJS (core API) · Python FastAPI (agents) ·
PostgreSQL (canonical, UUID PKs) · Qdrant (vectors, tenant payload filters) · Redis + BullMQ
(queues) · n8n (long-running external workflows only) · Authentik/Keycloak/managed OIDC ·
OpenTelemetry + Prometheus + Grafana + Loki · Docker Compose · Caddy/Traefik · GitHub CI with
protected branches.

## Getting started

```bash
corepack enable                      # pnpm via corepack
pnpm install
docker compose -f infra/compose/docker-compose.yml up -d   # postgres, redis, qdrant, n8n
pnpm -r build
pnpm --filter @maios/web dev         # MAIOS application shell on :3000
```

Copy `.env.example` to `.env` and fill in values. Secrets never enter source control,
images, logs, or browser bundles.

## Delivery waves (see plan §17)

| Wave | Work packages | Outcome |
|---|---|---|
| 0 Foundation | WP0–WP2 | Repos, CI/CD, environments, OIDC, tenancy, secrets, observability |
| 1 Canonical CRM | WP3–WP5 | Leads canonical, attributed, projected to Close |
| 2 Operator app | WP6–WP7 | MAIOS app for context; Close for execution |
| 3 Intelligence | WP8–WP10 | Vector ingestion, agents, approvals, n8n workflows |
| 4 Migration | WP11–WP12 | GHL retired module by module; production launch |
| 5 Owned communications | WP13–WP15 | SIP lab, embedded softphone, owned messaging/DNI |
| 6 Optional owned CRM | WP16 | Close becomes replaceable |

Milestones are **gates, not calendar promises** — see plan §17.21 and §18.3 launch gates.

## Engineering directive (plan, Appendix E)

Build the owned intelligence layer first. Close is the Phase 1 execution terminal, not the
nervous system. The highest-risk failure would be rebuilding GHL under a new name: business
rules hidden in provider fields, no canonical IDs, no event history, no recovery path. Every
design decision should make the next provider easier to add and the current provider easier
to remove.
