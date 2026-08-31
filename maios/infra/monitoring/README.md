# Monitoring

OpenTelemetry + Prometheus + Grafana + Loki (plan §14, DEV-010). Required dashboards
(§14.2/OPS-001): API, PostgreSQL, Redis/queues, Close integration (outbox backlog,
webhook lag, 429 rate, drift), tracking, attribution, calls, agents, TNAS/assets, n8n,
and business KPIs. Alert tiers per §14.4; every alert route tested with synthetic
failures.
