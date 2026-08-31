# Agent evaluations

Golden cases and regression tests (plan §10.7). Datasets must include normal,
ambiguous, adversarial, missing-data, cross-tenant, and policy-blocked examples, plus
a red-team set for data exfiltration, prompt injection, tool escalation, and
destructive actions (§13.6). Any prompt/model/retrieval/tool/schema/policy change
reruns the relevant suite before promotion.
