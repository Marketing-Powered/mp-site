# ADR-0002: Blended hosting topology — Vercel edge, TNAS core, databases on local HDD pool

- **Status:** accepted
- **Date:** 2026-08-31
- **Owners:** Marketing Powered technical leadership

## Context

MAIOS must launch without new server hardware. The available compute is the company
TNAS (no free SSD/NVMe — a prior SSD attempt is not viable), plus the existing Vercel
Pro team that already serves `marketingpowered.ai` (mp-site). The construction plan's
storage boundary (§11.4) forbids running the active PostgreSQL/Qdrant working
directories **on network file storage**; it directs the data plane to locally attached
storage on the compute host.

## Decision

**Vercel (public edge):**
- `marketingpowered.ai` / `www` — mp-site (unchanged)
- `app.marketingpowered.ai` — MAIOS web application (`apps/web`)

**TNAS (self-hosted core, Docker Compose — `infra/compose/docker-compose.yml` +
`docker-compose.tnas.yml` overlay):**
- `apps/api`, `apps/worker`, `apps/tracking`, `apps/agent-api`, n8n, Redis,
  model gateway, Caddy reverse proxy
- **PostgreSQL and Qdrant run on the TNAS with data volumes on a local HDD pool
  dataset** (`MAIOS_DATA_ROOT`). This satisfies the plan's rule — the pool is local
  block storage on the same host, not SMB/NFS — at the cost of HDD latency, accepted
  for Phase 1 volumes (internal sales + one pilot tenant).
- TNAS shares keep their canonical role via `AssetStorageProvider`
  (`MAIOS_SHARE_ROOT`): assets, recordings, exports, model files, backup targets.

**Public DNS on the TNAS side:** `api.`, `hooks.` (provider webhooks), `mp.`
(tracking), optionally `auth.` — terminated by Caddy; only 443 exposed (port-forward
or tunnel). Internal-only: n8n editor, Grafana, model gateway. Staging mirrors under
`*.stg.marketingpowered.ai`.

## Hard rules that survive this decision

1. The database data directories are **never** placed on or served over SMB/NFS, and
   never mounted from another machine.
2. A backup that exists only on this TNAS is not disaster recovery: encrypted offsite
   copies (separate provider or site) remain mandatory (§14.6), and restore tests are
   timed against a clean host.
3. PostgreSQL runs with `synchronous_commit = on` — canonical lead capture (99.9%
   durable-capture SLO) is not traded for HDD latency.

## Revisit triggers (any one → move Postgres/Qdrant to SSD-backed compute or managed)

- CRM list/detail APIs miss the 500 ms p95 target (§7.7) under normal load.
- Tracking ingestion falls behind its 5-second processing SLO during campaign bursts.
- Vector ingestion or transcript embedding visibly delays interactive retrieval.
- Checkpoint/vacuum I/O saturates the pool during business hours.
- A second production tenant onboards with contractual performance commitments.

The compose files keep host paths behind `MAIOS_DATA_ROOT`/`MAIOS_SHARE_ROOT`, so a
future move is a volume migration, not a code change.
