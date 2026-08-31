# PostgreSQL

Runs ON the TNAS with its data directory on the local HDD pool (`MAIOS_DATA_ROOT`,
ADR-0002) — local block storage, never an SMB/NFS mount. `postgresql.tnas.conf` is the
HDD-tuned production config (synchronous_commit stays ON; random_page_cost=4;
smoothed checkpoints; throttled autovacuum; pg_stat_statements for the health
dashboards). Per-service roles with least privilege and append-only evidence grants
are created in `docs/runbooks/tnas-deployment.md` §4. Nightly encrypted backups to the
share + offsite via `infra/backup/backup-postgres.sh`; monthly timed restore tests.
Revisit triggers for moving off HDD are listed in ADR-0002.
