# ADR-0001: Canonical system ownership (ARC-001)

- **Status:** accepted
- **Date:** 2026-08-31
- **Owners:** MAIOS product and technical leadership

## Context
The construction plan (v1.0) requires ratified ownership boundaries before any
workstream builds against them.

## Decision
- **PostgreSQL** is the canonical source of relational truth: tenants, CRM objects,
  activities, tracking/touch evidence, attribution runs, communications state,
  provider mappings, agent governance, asset metadata, platform reliability tables.
- **Qdrant** serves vector retrieval only; every point is traceable to a versioned
  source and carries tenant/access payload filters enforced server-side.
- **Close** is the Phase 1 operational sales CRM and telephony execution environment —
  a projection/execution surface, never canonical. Connected exclusively through
  `CloseCRMProvider` / `CloseTelephonyProvider` / `CloseMessagingProvider` behind the
  transactional outbox and signed webhook inbox.
- **TNAS** stores binary assets and backups only, via `AssetStorageProvider`; never the
  live database working directory, never exposed to browsers or agents.
- **n8n** consumes canonical events and calls typed APIs for long-running external
  workflows; it is not the application backend or an unversioned business-rule store.
- **Owned SIP** (Kamailio/FreeSWITCH/coturn) is a later phase behind the same
  `TelephonyProvider` contract; it may not destabilize the CRM launch.
- Vendor identifiers are never primary keys in MAIOS domain tables; provider IDs live
  only in `external_object_map`.

## Consequences
Conflicting prior documents (Attio-first, immediate self-hosted SIP) are superseded.
Every integration must pass the provider conformance suite (§9.7). Changes to these
boundaries require a new ADR.
