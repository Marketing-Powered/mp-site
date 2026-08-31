# Compose stacks

`docker-compose.yml` = local development data plane (synthetic seed data only — §3.3).
Storage boundary (§11.4): active PostgreSQL/Redis/Qdrant working storage stays on
locally attached compute storage; TNAS receives backups and binary assets, never the
live database directory. Add `docker-compose.staging.yml` / `production` overlays with
resource limits, health checks, and the observability stack (DEV-010).
