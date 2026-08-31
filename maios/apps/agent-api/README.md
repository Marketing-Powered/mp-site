# maios-agent-api

Python FastAPI service for the agent runtime, vector retrieval, evaluation harness,
and model gateway (plan section 10, WP9).

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

Initial agent catalog (10.2): lead priority, next-best-action, call summary, call QA,
attribution analyst, CRM hygiene, operations router, knowledge assistant. Every agent
ships with a versioned manifest in `agents/definitions/` and golden cases in
`agents/evaluations/` before promotion (10.7).
