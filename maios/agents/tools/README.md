# Typed tools

Tools call domain services — never raw SQL or arbitrary HTTP (plan §10.5). Every call
carries ToolContext (tenant, actor, run, correlation, effective permissions, data
policy) and returns ToolResult with status succeeded | pending_approval | rejected |
failed plus evidence references. Tools validate authorization independently of the
model; a model instruction cannot bypass role, consent, approval, or classification.
