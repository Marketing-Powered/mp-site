# Agent definitions

Versioned agent manifests and prompts (plan §10). Initial catalog (§10.2):
`lead_priority`, `next_best_action`, `call_summary`, `call_qa`, `attribution_analyst`,
`crm_hygiene`, `operations_router`, `knowledge_assistant`.

Every production agent has: owner, purpose, tool allowlist, data policy, approval
policy, timeout, output schema, evaluation report, and rollback (a prior version can be
restored without a database rollback).
