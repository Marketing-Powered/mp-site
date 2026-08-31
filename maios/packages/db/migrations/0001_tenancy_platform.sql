-- 0001: Tenancy, access, and platform reliability tables (plan §4.2 — Tenancy, Providers, Platform)
-- Conventions (§4.1): MAIOS-generated UUIDs, tenant_id on every tenant-owned row,
-- timestamptz UTC, soft deletion via archived_at, optimistic concurrency via row_version.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Tenancy and access ────────────────────────────────────────────────────────
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  oidc_subject text UNIQUE,
  email_normalized text NOT NULL UNIQUE,
  email_display text NOT NULL,
  display_name text,
  status text NOT NULL DEFAULT 'active',
  mfa_enrolled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE, -- system_admin, tenant_admin, sales_leader, sales_rep, account_manager,
                            -- marketing_analyst, agent_operator, readonly_executive, service (§7.1)
  name text NOT NULL,
  description text
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  description text
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id),
  permission_id uuid NOT NULL REFERENCES permissions(id),
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  user_id uuid NOT NULL REFERENCES users(id),
  role_id uuid NOT NULL REFERENCES roles(id),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz NULL,
  UNIQUE (tenant_id, user_id, role_id)
);

CREATE TABLE service_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NULL REFERENCES tenants(id), -- NULL = platform-scoped
  name text NOT NULL,
  scopes text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz NULL
);

-- ── Provider integration state (§4.2 Providers) ───────────────────────────────
CREATE TABLE connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  provider text NOT NULL, -- close, asana, slack, ctm, tnas, qdrant, model-gateway, ...
  name text NOT NULL,
  auth_kind text NOT NULL, -- api_key | oauth | service_account
  secret_ref text NOT NULL, -- reference into secret manager; never the credential itself
  status text NOT NULL DEFAULT 'active', -- active | degraded | disabled | revoked
  capabilities jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX connections_tenant_provider_idx ON connections (tenant_id, provider);

CREATE TABLE external_object_map (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  connection_id uuid NOT NULL REFERENCES connections(id),
  object_type text NOT NULL,
  canonical_id uuid NOT NULL,
  external_id text NOT NULL,
  external_url text,
  provider_version text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (connection_id, object_type, external_id),
  UNIQUE (connection_id, object_type, canonical_id)
);
CREATE INDEX external_object_map_canonical_idx ON external_object_map (tenant_id, canonical_id);

-- ── Transactional outbox and webhook inbox (§4.5) ─────────────────────────────
CREATE TABLE outbox_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  event_type text NOT NULL,
  aggregate_type text NOT NULL,
  aggregate_id uuid NOT NULL,
  payload jsonb NOT NULL,
  correlation_id uuid NOT NULL,
  causation_id uuid NULL,
  idempotency_key text NOT NULL,
  available_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending', -- pending | in_progress | completed | dead_letter
  attempt_count int NOT NULL DEFAULT 0,
  locked_by text NULL,
  locked_at timestamptz NULL,
  completed_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (idempotency_key)
);
CREATE INDEX outbox_events_pending_idx ON outbox_events (status, available_at)
  WHERE status IN ('pending', 'in_progress');

CREATE TABLE webhook_inbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  connection_id uuid NULL REFERENCES connections(id),
  provider_event_id text NOT NULL,
  signature_status text NOT NULL, -- valid | invalid | unsigned
  headers jsonb NOT NULL DEFAULT '{}'::jsonb,
  raw_payload jsonb NOT NULL, -- restricted retention class; redact tokens (§4.7)
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz NULL,
  status text NOT NULL DEFAULT 'received', -- received | processing | processed | failed | quarantined
  error text NULL,
  UNIQUE (provider, provider_event_id) -- neutralizes duplicate deliveries (§5.6)
);
CREATE INDEX webhook_inbox_unprocessed_idx ON webhook_inbox (status, received_at)
  WHERE status IN ('received', 'processing', 'failed');

CREATE TABLE sync_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  connection_id uuid NOT NULL REFERENCES connections(id),
  kind text NOT NULL, -- outbound | reconciliation | drift_scan | orphan_detection
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz NULL
);

CREATE TABLE sync_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_job_id uuid NOT NULL REFERENCES sync_jobs(id),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz NULL,
  request_summary text, -- no secrets, no unnecessarily sensitive payloads (§4.5)
  response_status text,
  error_class text,
  retry_at timestamptz NULL
);

CREATE TABLE reconciliation_cursors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id uuid NOT NULL REFERENCES connections(id),
  stream text NOT NULL, -- e.g. close_event_log
  cursor text,
  checkpoint_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (connection_id, stream)
);

CREATE TABLE dead_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL, -- outbox | webhook | workflow | agent | asset
  source_id uuid NOT NULL,
  error_class text NOT NULL,
  payload_reference text,
  first_failed_at timestamptz NOT NULL DEFAULT now(),
  last_failed_at timestamptz NOT NULL DEFAULT now(),
  resolution_status text NOT NULL DEFAULT 'open', -- open | retried | resolved | discarded
  resolution_note text,
  resolved_by uuid NULL REFERENCES users(id)
);

CREATE TABLE idempotency_keys (
  key text PRIMARY KEY,
  tenant_id uuid NULL,
  operation text NOT NULL,
  result_hash text,
  response jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);

CREATE TABLE audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NULL REFERENCES tenants(id),
  event_type text NOT NULL,
  actor_type text NOT NULL, -- user | service | agent | provider
  actor_id text NOT NULL,
  subject_type text,
  subject_id text,
  correlation_id uuid,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  details jsonb NOT NULL DEFAULT '{}'::jsonb
  -- append-only: no UPDATE/DELETE grants for application roles (§13)
);
CREATE INDEX audit_events_tenant_time_idx ON audit_events (tenant_id, occurred_at);

CREATE TABLE feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  scope_type text NOT NULL DEFAULT 'global', -- global | tenant | role | user | percentage
  scope_id text,
  enabled boolean NOT NULL DEFAULT false,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (key, scope_type, scope_id)
);

CREATE TABLE system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
