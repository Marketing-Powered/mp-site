# Engineering directives for this repository

Read `docs/construction-plan/` before implementing. Non-negotiables:

1. Canonical IDs are MAIOS UUIDs; provider IDs live only in `external_object_map`.
2. Every canonical write that needs provider projection goes through the transactional
   outbox — no fragile synchronous provider calls as the only delivery mechanism.
3. Webhooks: verify signature on raw bytes, dedupe by provider event id, ack fast,
   process asynchronously.
4. Every repeatable operation is idempotent; unknown-result timeouts reconcile before retry.
5. Ask providers for capabilities; never assume. `externalCallControl` is false for
   Close until a supported API is validated.
6. Every request/job/query/asset/audit entry carries tenant scope; tenant_id from a
   request body is never trusted as authorization.
7. Touches, conversions, call events, webhook payloads, audit entries: append-only.
8. High-impact agent actions require approval gates; agents never issue raw SQL,
   arbitrary shell, or arbitrary HTTP.
9. Secrets live in the secret manager only — never in source, images, logs, fixtures,
   browser bundles, or n8n exports.
10. No workstream is "done" on the happy path alone: observability, retries,
    idempotency, security, tests, rollback, and backup/recovery evidence are part of
    completion (plan, Document control).
