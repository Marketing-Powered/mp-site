/**
 * Lightweight first-party tracking service (plan §6.2–6.3, ATTR-002/003).
 *
 * POST /v1/tracking/events — public/signed first-party event ingestion.
 * Processing sequence (§6.3): validate site + schema + timestamp tolerance + idempotency
 * key → resolve tenant/site → bot and abuse checks → normalize UTMs (raw preserved) →
 * classify channel → upsert visitor/session (never cross-tenant) → insert immutable
 * touch/page event → publish tracking.event.recorded → minimal response.
 *
 * Invariants: tracking failure never blocks a form submission (§6.2); direct revisits
 * never overwrite a prior non-direct first touch; visitor IDs are opaque random values.
 *
 * TODO(ATTR-002): browser bundle (batching, sendBeacon fallback, hidden-field form bridge).
 * TODO(ATTR-003): ingestion HTTP service with abuse controls and metrics.
 */
export {};
