# Runbooks (plan §18.2)

Required before production launch — one file per runbook:
Close auth failure · Close webhook failure/pause · Close API outage or rate limit ·
mapping conflict/duplicates · PostgreSQL failure · Redis/worker failure · Qdrant or
model outage · TNAS unavailable · tracking outage · cross-tenant exposure · agent
unsafe behavior · outbound voice fraud · owned SIP outage · backup/restore failure ·
GHL cutover rollback.

Each runbook: symptoms, containment (kill switches per SEC-010), evidence
preservation, restore, reconciliation, and communication path.
