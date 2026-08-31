# Backups (plan §14.6, ADR-0002)

- `backup-postgres.sh` — nightly encrypted `pg_dump -Fc` to the share + rclone offsite.
- `backup-qdrant.sh` — nightly Qdrant snapshot to the share + rclone offsite.
- n8n: back up its Postgres database (covered by the dump), the `${MAIOS_DATA_ROOT}/n8n`
  volume, and the `N8N_ENCRYPTION_KEY` (a database without the key is NOT a restore).
- The backup passphrase lives outside the share (secret manager / offline), and the
  restore procedure is tested monthly on a clean machine — see
  `docs/runbooks/tnas-deployment.md` §10.

RPO/RTO targets: RPO ≤ 24h, RTO ≤ 4h initially (§14.3) — tighten before production
criticality grows.
