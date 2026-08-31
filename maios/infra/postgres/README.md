# PostgreSQL

Production configuration (DEV-007): per-service roles with least privilege, TLS,
migrations with lock + dry-run in CI, daily encrypted backups to TNAS **plus** a
separate encrypted offsite copy (§11.4, §14.6), monthly timed restore tests.
Never host the active data directory on TNAS.
