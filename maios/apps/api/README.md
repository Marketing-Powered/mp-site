# @maios/api

NestJS domain API — the only write path to canonical PostgreSQL. Endpoint catalog in
plan §7.6; error contract in Appendix D; every response error carries a stable code and
correlation_id. Run `pnpm --filter @maios/api start:dev` (requires `nest-cli` — add when
implementing DEV-001 tooling).
