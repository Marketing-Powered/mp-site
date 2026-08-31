/**
 * Canonical event envelope (plan §3.4) and event catalog (Appendix A).
 * Event names are stable contracts. Additive payload changes bump event_version;
 * breaking changes require a new version and a compatibility period.
 */

export interface CanonicalEvent<TPayload = Record<string, unknown>> {
  event_id: string;
  event_type: string;
  event_version: number;
  tenant_id: string;
  occurred_at: string;
  recorded_at: string;
  actor: { type: 'user' | 'service' | 'agent' | 'provider'; id: string };
  subject: { type: string; id: string };
  correlation_id: string;
  causation_id: string | null;
  payload: TPayload;
}

/** Minimum initial event catalog (Appendix A). Add narrower events only after architecture review. */
export const EVENT_CATALOG = {
  identity: [
    'tenant.created', 'tenant.updated', 'membership.created', 'membership.revoked',
    'role.changed', 'service_account.used',
  ],
  crm: [
    'crm.company.created', 'crm.company.updated', 'crm.company.archived',
    'crm.person.created', 'crm.person.updated', 'crm.person.merged', 'crm.person.unmerged',
    'crm.contact_channel.changed',
    'crm.lead.created', 'crm.lead.assigned', 'crm.lead.qualified', 'crm.lead.score_updated',
    'crm.opportunity.created', 'crm.opportunity.updated', 'crm.opportunity.stage_changed',
    'crm.opportunity.won', 'crm.opportunity.lost',
    'crm.activity.recorded', 'crm.task.created', 'crm.task.updated', 'crm.task.completed',
    'crm.note.created',
  ],
  tracking: [
    'tracking.visitor.created', 'tracking.session.started', 'tracking.touch.recorded',
    'tracking.form_submitted', 'tracking.consent.changed', 'tracking.identity_associated',
  ],
  attribution: [
    'attribution.campaign_mapped', 'attribution.conversion.recorded',
    'attribution.run.started', 'attribution.run.completed', 'attribution.rollup.updated',
    'attribution.review_required',
  ],
  provider: [
    'provider.connection.created', 'provider.connection.failed', 'provider.sync.requested',
    'provider.sync.completed', 'provider.sync.failed', 'provider.mapping.conflict',
    'provider.reconciliation.completed',
  ],
  calls: [
    'call.created', 'call.routing', 'call.ringing', 'call.answered', 'call.held',
    'call.resumed', 'call.transferred', 'call.completed', 'call.failed',
    'call.disposition.updated', 'call.recording.available', 'call.transcript.available',
  ],
  messages: [
    'message.queued', 'message.sent', 'message.delivered', 'message.failed',
    'message.inbound', 'message.opted_out',
  ],
  assets: [
    'asset.upload_requested', 'asset.committed', 'asset.failed', 'asset.archived',
    'asset.accessed', 'document.ingestion.started', 'document.ingestion.completed',
    'document.ingestion.failed',
  ],
  agents: [
    'agent.run.created', 'agent.run.started', 'agent.tool.requested', 'agent.tool.completed',
    'agent.approval.requested', 'agent.approval.decided', 'agent.run.completed',
    'agent.run.failed', 'agent.evaluation.completed',
  ],
  operations: [
    'workflow.started', 'workflow.succeeded', 'workflow.failed',
    'backup.completed', 'backup.failed', 'restore.completed',
    'dead_letter.created', 'dead_letter.resolved',
  ],
  security: [
    'security.login.failed', 'security.webhook.invalid', 'security.permission.denied',
    'security.secret.rotated', 'security.kill_switch.enabled', 'security.cross_tenant.attempt',
  ],
} as const;

export type EventName = (typeof EVENT_CATALOG)[keyof typeof EVENT_CATALOG][number];
