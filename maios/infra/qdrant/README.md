# Qdrant

Vector database under MAIOS control (DEV-009, §10.3). Shared collections with
mandatory server-side tenant + access payload filters; dedicated collections only via
ADR. Scheduled snapshots to TNAS + offsite; every point carries embedding_model,
embedding_version, chunking_version, source_checksum, created_at, status.
