# Compose stacks

- `docker-compose.yml` — local development data plane (synthetic seed data only, §3.3).
- `docker-compose.tnas.yml` — production overlay for the TNAS (ADR-0002, Option B):
  database volumes on the local HDD pool (`MAIOS_DATA_ROOT`), the asset/backup share
  mounted only into the worker (`MAIOS_SHARE_ROOT`), app services built from the repo,
  Caddy as the single public entry. Full step-by-step bring-up:
  `docs/runbooks/tnas-deployment.md`.

Storage boundary (§11.4): DB working directories live on local storage of the compute
host — the TNAS pool qualifies because the containers run on the same box; SMB/NFS
under a database is prohibited. Shares carry assets, recordings, exports, and backups.
