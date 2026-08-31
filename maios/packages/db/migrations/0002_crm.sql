-- 0002: Canonical CRM domain (plan §4.2 CRM/Activities, §4.3, §4.4, §4.6)

CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  name text NOT NULL,
  domain text,
  phone text,
  industry text,
  lifecycle_status text NOT NULL DEFAULT 'prospect',
  owner_id uuid NULL REFERENCES users(id),
  row_version bigint NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE INDEX companies_tenant_idx ON companies (tenant_id) WHERE archived_at IS NULL;
CREATE INDEX companies_tenant_domain_idx ON companies (tenant_id, domain) WHERE archived_at IS NULL;

CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  company_id uuid NULL REFERENCES companies(id),
  first_name text,
  last_name text,
  title text,
  status text NOT NULL DEFAULT 'active',
  owner_id uuid NULL REFERENCES users(id),
  row_version bigint NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE INDEX people_tenant_company_idx ON people (tenant_id, company_id) WHERE archived_at IS NULL;

-- Contact channels are separate: multiple emails/phones per person; never silently
-- replaced during identity merging (§4.3).
CREATE TABLE contact_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  person_id uuid NOT NULL REFERENCES people(id),
  channel_type text NOT NULL CHECK (channel_type IN ('email','phone','linkedin','other')),
  normalized_value text NOT NULL, -- E.164 for phones; case-folded for emails (§4.1)
  display_value text,
  is_primary boolean NOT NULL DEFAULT false,
  consent_status text NOT NULL DEFAULT 'unknown',
  verification_status text NOT NULL DEFAULT 'unverified',
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE UNIQUE INDEX contact_channels_unique_active_idx
  ON contact_channels (tenant_id, channel_type, normalized_value, person_id)
  WHERE archived_at IS NULL;
CREATE INDEX contact_channels_lookup_idx
  ON contact_channels (tenant_id, channel_type, normalized_value) WHERE archived_at IS NULL;

CREATE TABLE pipelines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pipeline_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  pipeline_id uuid NOT NULL REFERENCES pipelines(id),
  name text NOT NULL,
  position int NOT NULL,
  is_terminal boolean NOT NULL DEFAULT false,
  terminal_outcome text NULL CHECK (terminal_outcome IN ('won','lost') OR terminal_outcome IS NULL),
  UNIQUE (pipeline_id, position)
);

-- A lead is a commercial pursuit; a person may produce multiple leads over time (§4.3).
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  person_id uuid NULL REFERENCES people(id),
  company_id uuid NULL REFERENCES companies(id),
  source_status text NOT NULL DEFAULT 'new',
  qualification_status text NOT NULL DEFAULT 'unqualified',
  score numeric NULL,
  score_updated_at timestamptz NULL,
  owner_id uuid NULL REFERENCES users(id),
  row_version bigint NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE INDEX leads_tenant_owner_idx ON leads (tenant_id, owner_id) WHERE archived_at IS NULL;

CREATE TABLE lead_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  lead_id uuid NOT NULL REFERENCES leads(id),
  assignee_id uuid NOT NULL REFERENCES users(id),
  assigned_by uuid NULL REFERENCES users(id),
  assigned_at timestamptz NOT NULL DEFAULT now(),
  reason text
);

CREATE TABLE opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  lead_id uuid NULL REFERENCES leads(id),
  pipeline_id uuid NOT NULL REFERENCES pipelines(id),
  stage_id uuid NOT NULL REFERENCES pipeline_stages(id),
  name text NOT NULL,
  amount_minor bigint NULL, -- integer minor units; no floating-point money (§4.1)
  currency text NULL,
  probability numeric NULL,
  expected_close_at date NULL,
  status text NOT NULL DEFAULT 'open',
  owner_id uuid NULL REFERENCES users(id),
  row_version bigint NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE INDEX opportunities_tenant_stage_idx ON opportunities (tenant_id, pipeline_id, stage_id)
  WHERE archived_at IS NULL;

-- Stage changes are recorded in history; derived "current stage" is a projection (§2.3).
CREATE TABLE opportunity_stage_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  opportunity_id uuid NOT NULL REFERENCES opportunities(id),
  from_stage_id uuid NULL REFERENCES pipeline_stages(id),
  to_stage_id uuid NOT NULL REFERENCES pipeline_stages(id),
  actor_type text NOT NULL,
  actor_id text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  correlation_id uuid
);

-- Normalized cross-provider interaction ledger (§4.2 Activities). Append-oriented.
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  type text NOT NULL, -- call | sms | email | meeting | note | task_event
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  actor_id uuid NULL REFERENCES users(id),
  provider text NULL,
  provider_id text NULL,
  direction text NULL CHECK (direction IN ('inbound','outbound') OR direction IS NULL),
  subject text,
  body_summary text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE NULLS NOT DISTINCT (tenant_id, provider, provider_id)
);
CREATE INDEX activities_tenant_time_idx ON activities (tenant_id, occurred_at);

CREATE TABLE activity_links (
  activity_id uuid NOT NULL REFERENCES activities(id),
  subject_type text NOT NULL, -- company | person | lead | opportunity
  subject_id uuid NOT NULL,
  PRIMARY KEY (activity_id, subject_type, subject_id)
);

CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  assignee_id uuid NULL REFERENCES users(id),
  due_at timestamptz NULL,
  status text NOT NULL DEFAULT 'open',
  priority text NOT NULL DEFAULT 'normal',
  title text NOT NULL,
  subject_type text NULL,
  subject_id uuid NULL,
  provider text NULL, -- maios | close | asana — field ownership explicit per task type (§4.3)
  provider_id text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);
CREATE INDEX tasks_tenant_assignee_idx ON tasks (tenant_id, assignee_id, status)
  WHERE archived_at IS NULL;

CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  author_id uuid NULL REFERENCES users(id),
  subject_type text NOT NULL,
  subject_id uuid NOT NULL,
  body text NOT NULL,
  provider text NULL,
  provider_id text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);

-- Identity merges are recorded, evidence-bearing, and reversible (§4.6).
CREATE TABLE person_merges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  destination_person_id uuid NOT NULL REFERENCES people(id),
  source_person_ids uuid[] NOT NULL,
  actor_type text NOT NULL,
  actor_id text NOT NULL,
  reason text,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  reversible_mapping jsonb NOT NULL DEFAULT '{}'::jsonb,
  merged_at timestamptz NOT NULL DEFAULT now(),
  unmerged_at timestamptz NULL
);
