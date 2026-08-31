# n8n

Integration and workflow engine — NOT the application backend or business-rule
database (plan §12). Separate dev and production instances (own DB, encryption key,
credentials, webhook domains). Queue mode with Redis when volume justifies. Workflow
naming: `MAIOS | domain | purpose | version`. Workflow JSON exports are versioned in
source control (FLOW-010). Forbidden responsibilities listed in §12.2.
