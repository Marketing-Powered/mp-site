# API documentation

OpenAPI is generated from the NestJS API (plan §3.4); the TypeScript client in
`packages/api-client` is generated from that schema. Endpoint catalog: plan §7.6.
Error contract: Appendix D (stable machine-readable `code`, `correlation_id` on every
server error, no credentials or unrestricted provider payloads in `details`).
