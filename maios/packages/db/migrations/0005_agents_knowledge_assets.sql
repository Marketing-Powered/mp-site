-- 0005: Agents, knowledge, and assets (plan §4.2 Agents/Knowledge/Assets, §10, §11)

-- ── Assets (TNAS metadata; binaries live on TNAS via AssetStorageProvider) ────
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  logical_uri text NOT NULL, -- maios:// logical path; never a mounted OS path (§11.2)
  original_filename text,
  content_type text,
  byte_size bigint,
  checksum_algorithm text NOT NULL DEFAULT 'sha256',
  checksum text,
  storage_class text NOT NULL DEFAULT 'standard',
  classification text NOT NULL DEFAULT 'confidential'
    CHECK (classification IN ('public','internal','confidential','restricted','regulated','secret')),
  retention_class text,
  legal_hold boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending', -- pending | active | failed | archived (§11.3: atomic commit)
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL,
  UNIQUE (tenant_id, logical_uri)
);

CREATE TABLE asset_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES assets(id),
  version int NOT NULL,
  checksum text,
  byte_size bigint,
  transformation jsonb NOT NULL DEFAULT '{}'::jsonb, -- derivatives never replace originals silently
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (asset_id, version)
);

CREATE TABLE asset_links (
  asset_id uuid NOT NULL REFERENCES assets(id),
  subject_type text NOT NULL,
  subject_id uuid NOT NULL,
  PRIMARY KEY (asset_id, subject_type, subject_id)
);

-- Every restricted read/export/playback creates an access event (§11.3).
CREATE TABLE asset_access_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id uuid NOT NULL REFERENCES assets(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  actor_type text NOT NULL,
  actor_id text NOT NULL,
  purpose text NOT NULL,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  correlation_id uuid
);

ALTER TABLE recordings
  ADD CONSTRAINT recordings_asset_fk FOREIGN KEY (asset_id) REFERENCES assets(id);

-- ── Knowledge / vector index (§4.2 Knowledge, §10.3–10.4) ─────────────────────
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  title text NOT NULL,
  purpose text,
  classification text NOT NULL DEFAULT 'internal',
  access_roles text[] NOT NULL DEFAULT '{}',
  retention_class text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  archived_at timestamptz NULL
);

CREATE TABLE document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id),
  version int NOT NULL,
  source_asset_id uuid NULL REFERENCES assets(id),
  source_checksum text,
  extraction_artifact_ref text,
  chunking_version text,
  embedding_model text,
  embedding_version text,
  status text NOT NULL DEFAULT 'ingesting', -- ingesting | validating | active | superseded | retired
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (document_id, version)
);

CREATE TABLE chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_version_id uuid NOT NULL REFERENCES document_versions(id),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  ordinal int NOT NULL,
  text_content text, -- stored only when collection policy allows (§10.3)
  token_count int,
  UNIQUE (document_version_id, ordinal)
);

CREATE TABLE vector_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id uuid NOT NULL REFERENCES chunks(id),
  collection_name text NOT NULL, -- knowledge_chunks | call_transcript_chunks | crm_memory | ...
  point_id text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  UNIQUE (collection_name, point_id)
);

CREATE TABLE ingestion_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  document_version_id uuid NOT NULL REFERENCES document_versions(id),
  status text NOT NULL DEFAULT 'pending',
  expected_points int,
  actual_points int,
  error text,
  started_at timestamptz,
  completed_at timestamptz
);

-- ── Agent runtime and governance (§4.2 Agents, §10) ───────────────────────────
CREATE TABLE agent_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE, -- call_summary | call_qa | lead_priority | next_best_action | ...
  name text NOT NULL,
  owner text NOT NULL,
  purpose text NOT NULL,
  status text NOT NULL DEFAULT 'draft' -- draft | shadow | pilot | production | disabled
);

CREATE TABLE agent_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES agent_definitions(id),
  version text NOT NULL,
  manifest jsonb NOT NULL, -- tools allowlist, model policy, data classes, approval policy, timeout
  evaluation_report_ref text,
  promoted_at timestamptz NULL,
  UNIQUE (agent_id, version)
);

CREATE TABLE agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  agent_version_id uuid NOT NULL REFERENCES agent_versions(id),
  subject_type text,
  subject_id uuid,
  purpose text,
  input_snapshot_ref text, -- inputs snapshotted at run creation (§10.1)
  status text NOT NULL DEFAULT 'created', -- created | running | completed | failed | timeout
  result jsonb,
  correlation_id uuid NOT NULL,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX agent_runs_tenant_time_idx ON agent_runs (tenant_id, created_at);

CREATE TABLE tool_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_run_id uuid NOT NULL REFERENCES agent_runs(id),
  tool_key text NOT NULL,
  input jsonb NOT NULL,
  status text NOT NULL, -- succeeded | pending_approval | rejected | failed
  result_ref text,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  agent_run_id uuid NULL REFERENCES agent_runs(id),
  tool_call_id uuid NULL REFERENCES tool_calls(id),
  risk_class text NOT NULL, -- provider_write | external_communication | destructive | financial (§10.5)
  proposed_mutation jsonb NOT NULL,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending', -- pending | approved | rejected | edited | expired
  decided_by uuid NULL REFERENCES users(id),
  decision_note text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  decided_at timestamptz NULL
);

CREATE TABLE evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_version_id uuid NOT NULL REFERENCES agent_versions(id),
  suite text NOT NULL, -- golden | adversarial | cross_tenant | prompt_injection | regression
  status text NOT NULL,
  report jsonb NOT NULL DEFAULT '{}'::jsonb,
  executed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE model_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NULL REFERENCES tenants(id),
  agent_run_id uuid NULL REFERENCES agent_runs(id),
  model_alias text NOT NULL,
  model_version text, -- immutable version or checksum recorded per run (§10.6)
  input_tokens int,
  output_tokens int,
  duration_ms int,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
