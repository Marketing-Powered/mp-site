-- 0004: Provider-neutral communications state (plan §8.2)
-- Close executes calls/SMS in Phase 1; MAIOS stores normalized activity and references.

CREATE TABLE routing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  name text NOT NULL,
  priority int NOT NULL DEFAULT 100,
  schedule jsonb NOT NULL DEFAULT '{}'::jsonb,
  match_conditions jsonb NOT NULL DEFAULT '{}'::jsonb,
  destination_type text NOT NULL, -- queue | user | voicemail | external
  destination_id text,
  fallback_rule_id uuid NULL REFERENCES routing_rules(id),
  enabled boolean NOT NULL DEFAULT true
);

CREATE TABLE phone_numbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  e164 text NOT NULL,
  provider text NOT NULL, -- close | maios-sip | carrier
  provider_number_id text,
  number_type text NOT NULL DEFAULT 'local', -- local | tollfree | tracking
  status text NOT NULL DEFAULT 'active',
  campaign_id uuid NULL REFERENCES campaigns(id),
  location_id uuid NULL,
  recording_policy jsonb NOT NULL DEFAULT '{}'::jsonb,
  routing_rule_id uuid NULL REFERENCES routing_rules(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, e164)
);

CREATE TABLE call_dispositions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  code text NOT NULL,
  label text NOT NULL,
  category text,
  requires_note boolean NOT NULL DEFAULT false,
  requires_follow_up boolean NOT NULL DEFAULT false,
  is_terminal boolean NOT NULL DEFAULT true,
  provider_mapping jsonb NOT NULL DEFAULT '{}'::jsonb, -- provider value preserved (§8.1)
  UNIQUE (tenant_id, code)
);

CREATE TABLE calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  provider text NOT NULL,
  provider_call_id text,
  direction text NOT NULL CHECK (direction IN ('inbound','outbound')),
  method text, -- manual | power_dialer | predictive_dialer | webrtc
  state text NOT NULL DEFAULT 'CREATED', -- canonical state machine (§8.3)
  outcome text,
  started_at timestamptz,
  answered_at timestamptz,
  ended_at timestamptz,
  duration_seconds int,
  disposition_id uuid NULL REFERENCES call_dispositions(id),
  person_id uuid NULL REFERENCES people(id),
  lead_id uuid NULL REFERENCES leads(id),
  opportunity_id uuid NULL REFERENCES opportunities(id),
  campaign_id uuid NULL REFERENCES campaigns(id),
  attribution_confidence text, -- quantify uncertainty; never present uncertain matches as fact (§6.7)
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (tenant_id, provider, provider_call_id)
);
CREATE INDEX calls_tenant_time_idx ON calls (tenant_id, started_at);
CREATE INDEX calls_tenant_person_idx ON calls (tenant_id, person_id);

-- Transfers and bridges create multiple legs under one logical call (§8.3).
CREATE TABLE call_legs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id uuid NOT NULL REFERENCES calls(id),
  provider_leg_id text,
  from_number text,
  to_number text,
  user_id uuid NULL REFERENCES users(id),
  queue_id text,
  state text NOT NULL DEFAULT 'CREATED',
  started_at timestamptz,
  answered_at timestamptz,
  ended_at timestamptz,
  disconnect_reason text
);

-- Provider events are stored before projection; the state reducer is idempotent (§8.3).
CREATE TABLE call_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id uuid NOT NULL REFERENCES calls(id),
  leg_id uuid NULL REFERENCES call_legs(id),
  event_type text NOT NULL,
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  sequence int,
  provider_event_id text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE NULLS NOT DISTINCT (call_id, provider_event_id)
);

CREATE TABLE recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id uuid NOT NULL REFERENCES calls(id),
  asset_id uuid NULL, -- FK added in 0005 once assets exist; archived via AssetStorageProvider
  provider_url_reference text,
  status text NOT NULL DEFAULT 'pending', -- pending | available | unavailable | archived
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds int,
  consent_basis text,
  retention_class text,
  transcript_status text NOT NULL DEFAULT 'none' -- none | pending | available | failed
);

CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  provider text NOT NULL,
  provider_message_id text,
  channel text NOT NULL CHECK (channel IN ('sms','mms','email')),
  direction text NOT NULL CHECK (direction IN ('inbound','outbound')),
  from_channel text,
  to_channel text,
  person_id uuid NULL REFERENCES people(id),
  lead_id uuid NULL REFERENCES leads(id),
  status text NOT NULL DEFAULT 'queued',
  body_reference text, -- separate metadata from message bodies (§4.7)
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE NULLS NOT DISTINCT (tenant_id, provider, provider_message_id)
);

CREATE TABLE message_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES messages(id),
  event_type text NOT NULL,
  occurred_at timestamptz NOT NULL,
  provider_event_id text,
  error_code text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE NULLS NOT DISTINCT (message_id, provider_event_id)
);

-- Owned-DNI phase only (§6.7, WP15) — created now for schema stability.
CREATE TABLE number_leases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number_id uuid NOT NULL REFERENCES phone_numbers(id),
  visitor_id uuid NULL REFERENCES visitors(id),
  session_id uuid NULL REFERENCES sessions(id),
  site_id uuid NULL REFERENCES sites(id),
  leased_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  released_at timestamptz NULL
);
