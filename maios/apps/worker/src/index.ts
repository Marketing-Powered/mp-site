/**
 * MAIOS integration and projection workers (plan §3.2, §4.5, §5.5–5.7).
 *
 * Worker families (BullMQ on Redis; jobs reconstructable from PostgreSQL):
 * - outbox-dispatcher: claims outbox_events with DB locks, executes provider operations
 *   via adapters, records attempts, applies backoff with jitter, dead-letters permanents.
 * - webhook-processor: drains webhook_inbox after signature verification and dedupe.
 * - reconciliation: Close Event Log cursor sync (every 5–15 min), nightly drift scans,
 *   weekly full active-pipeline comparison, orphan detection (§5.7).
 * - artifact-poller: bounded polling for delayed recordings/transcripts (VOICE-005).
 * - projection: attribution rollups, journey projections, identity association (ATTR-006).
 *
 * TODO(DEV-008/CRM-009): implement queue framework, locking, and retry matrices (§14.5).
 */
export {};
