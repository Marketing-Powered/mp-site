"""MAIOS agent and retrieval API (plan section 10).

Components to implement (10.1): agent registry, run coordinator, tool gateway,
retrieval service (tenant + role filters enforced SERVER-SIDE, never trusted from
the model or browser), approval service, evaluation service, model gateway, audit
ledger.

Hard rules:
- Agents access domain data through APIs or approved service libraries only —
  never raw SQL, arbitrary shell, or arbitrary HTTP (10.5).
- Structured outputs are validated against JSON Schema before any downstream use.
- High-impact actions enter the approval state and cannot execute before an
  authorized decision.
- Every retrieved document and transcript is untrusted input that may contain
  prompt injection (13.6); retrieved text cannot grant new tools or tenant access.
"""

from fastapi import FastAPI

app = FastAPI(title="MAIOS Agent API", version="0.1.0")


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "maios-agent-api"}
