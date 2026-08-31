-- 0003: UTM capture, identity resolution, and attribution (plan §6, §4.2 Tracking/Marketing/Attribution)
-- Touches and conversion events are immutable evidence; rollups are reproducible projections.

CREATE TABLE sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  name text NOT NULL,
  hostnames text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'active',
  consent_policy jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Visitor IDs are random opaque identifiers — never derived from email/phone/name (§6.2).
CREATE TABLE visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  site_id uuid NOT NULL REFERENCES sites(id),
  opaque_id text NOT NULL,
  person_id uuid NULL REFERENCES people(id), -- set only by deterministic association (§6.4)
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, site_id, opaque_id)
);

CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  visitor_id uuid NOT NULL REFERENCES visitors(id),
  opaque_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  device jsonb NOT NULL DEFAULT '{}'::jsonb, -- coarse, privacy-approved context only (§6.1)
  UNIQUE (tenant_id, visitor_id, opaque_id)
);

-- Normalized marketing hierarchy (§4.2 Marketing)
CREATE TABLE ad_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  platform text NOT NULL, -- google | meta | linkedin | tiktok | other
  external_account_id text NOT NULL,
  name text,
  UNIQUE (tenant_id, platform, external_account_id)
);

CREATE TABLE campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  ad_account_id uuid NULL REFERENCES ad_accounts(id),
  platform text,
  external_campaign_id text,
  name text NOT NULL,
  normalized_name text,
  status text NOT NULL DEFAULT 'active',
  UNIQUE NULLS NOT DISTINCT (tenant_id, platform, external_campaign_id)
);

CREATE TABLE ad_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  campaign_id uuid NOT NULL REFERENCES campaigns(id),
  external_ad_group_id text,
  name text
);

CREATE TABLE ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  ad_group_id uuid NOT NULL REFERENCES ad_groups(id),
  external_ad_id text,
  name text,
  creative_reference text
);

CREATE TABLE consent_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  visitor_id uuid NULL REFERENCES visitors(id),
  person_id uuid NULL REFERENCES people(id),
  analytics boolean,
  marketing boolean,
  policy_version text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb
);

-- Immutable journey evidence (§6.5). Raw values preserved; normalization is separate.
CREATE TABLE touch_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  visitor_id uuid NOT NULL REFERENCES visitors(id),
  session_id uuid NULL REFERENCES sessions(id),
  person_id uuid NULL REFERENCES people(id),
  lead_id uuid NULL REFERENCES leads(id),
  event_type text NOT NULL,
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  raw_landing_url text,
  normalized_landing_path text,
  raw_referrer_url text,
  referrer_domain text,
  utm_source text, utm_medium text, utm_campaign text,
  utm_term text, utm_content text, utm_id text,
  gclid text, gbraid text, wbraid text, fbclid text,
  msclkid text, ttclid text, li_fat_id text,
  campaign_id uuid NULL REFERENCES campaigns(id),
  ad_group_id uuid NULL REFERENCES ad_groups(id),
  ad_id uuid NULL REFERENCES ads(id),
  consent_event_id uuid NULL REFERENCES consent_events(id),
  source_classification text, -- direct | organic | referral | paid | email | social | other
  is_valid_traffic boolean NOT NULL DEFAULT true, -- bot traffic classified, never destroyed (§6.3)
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX touch_events_journey_idx ON touch_events (tenant_id, person_id, occurred_at);
CREATE INDEX touch_events_session_idx ON touch_events (tenant_id, session_id, occurred_at);
CREATE INDEX touch_events_visitor_idx ON touch_events (tenant_id, visitor_id, occurred_at);

CREATE TABLE page_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  session_id uuid NOT NULL REFERENCES sessions(id),
  event_id_client text NOT NULL, -- client event id for deduplication
  event_type text NOT NULL,
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  url text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (tenant_id, session_id, event_id_client)
);

CREATE TABLE form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  site_id uuid NOT NULL REFERENCES sites(id),
  session_id uuid NULL REFERENCES sessions(id),
  visitor_id uuid NULL REFERENCES visitors(id),
  form_id text NOT NULL,
  submission_client_id text NOT NULL,
  person_id uuid NULL REFERENCES people(id),
  lead_id uuid NULL REFERENCES leads(id),
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (tenant_id, form_id, submission_client_id)
);

-- Identity association evidence (§6.4): deterministic-first; conflicts quarantine.
CREATE TABLE identity_associations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  visitor_id uuid NOT NULL REFERENCES visitors(id),
  person_id uuid NOT NULL REFERENCES people(id),
  evidence_level text NOT NULL CHECK
    (evidence_level IN ('deterministic_strong','deterministic_contextual','probabilistic','conflicting')),
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'active', -- active | quarantined | rejected
  associated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE conversion_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  person_id uuid NULL REFERENCES people(id),
  lead_id uuid NULL REFERENCES leads(id),
  opportunity_id uuid NULL REFERENCES opportunities(id),
  event_type text NOT NULL, -- lead_qualified | meeting_booked | opportunity_created | won | revenue | admission | ...
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  value_minor bigint NULL,
  currency text NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX conversion_events_tenant_time_idx ON conversion_events (tenant_id, occurred_at);

-- Attribution results are append-only; a current rollup points to the latest approved run (§6.6).
CREATE TABLE attribution_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  model_name text NOT NULL, -- first_touch | last_non_direct | linear | position_based | time_decay
  model_version text NOT NULL,
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  lookback_window interval,
  normalization_rules_version text,
  code_version text,
  conversion_set jsonb NOT NULL DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz NULL,
  status text NOT NULL DEFAULT 'running'
);

CREATE TABLE attribution_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  attribution_run_id uuid NOT NULL REFERENCES attribution_runs(id),
  conversion_event_id uuid NOT NULL REFERENCES conversion_events(id),
  touch_event_id uuid NOT NULL REFERENCES touch_events(id),
  credit numeric NOT NULL CHECK (credit >= 0 AND credit <= 1),
  UNIQUE (attribution_run_id, conversion_event_id, touch_event_id)
);

CREATE TABLE attribution_rollups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  subject_type text NOT NULL, -- lead | opportunity | person
  subject_id uuid NOT NULL,
  latest_run_id uuid NOT NULL REFERENCES attribution_runs(id),
  first_touch jsonb NOT NULL DEFAULT '{}'::jsonb, -- projected to Close custom fields (§5.3)
  latest_touch jsonb NOT NULL DEFAULT '{}'::jsonb,
  model_rollups jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, subject_type, subject_id)
);
