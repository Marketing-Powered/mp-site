/**
 * @maios/provider-close — Close CRM / telephony / messaging adapter (plan §5, WP5, WP7).
 *
 * Close is the Phase 1 operational sales workspace. It is NOT canonical. This adapter
 * must assume Close can be unavailable, rate-limited, duplicated, delayed, or replaced.
 * MAIOS must remain operational for canonical data capture even when Close sync is degraded.
 */
import type {
  CRMProvider,
  CRMCapabilities,
  TelephonyCapabilities,
  ProviderContext,
} from '@maios/providers';

/** Verified Phase 1 capability profile (plan §5.5, §9.3, Appendix C). */
export const CLOSE_CRM_CAPABILITIES: CRMCapabilities = {
  companies: true, // projected as Close Leads (§5.2)
  people: true, // projected as Close Contacts
  leads: true,
  opportunities: true,
  tasks: true,
  activities: true,
  emailExecution: true,
  smsExecution: true, // Close internal numbers only (Appendix C)
  nativeDialer: true,
  externalCallControl: false, // MUST stay false until Close publishes a supported control API
  customFields: true,
  webhooks: true,
  reconciliation: true, // Close Event Log, finite window — reconcile every 5–15 min (§5.7)
};

export const CLOSE_TELEPHONY_CAPABILITIES: TelephonyCapabilities = {
  inboundCalling: true,
  outboundCalling: true,
  externalCallControl: false,
  embeddedWebRTC: false,
  hold: false,
  transfer: false,
  dtmf: false,
  queues: true,
  powerDialer: true, // operated inside Close only (§7.3)
  predictiveDialer: true,
  recording: true,
  transcription: true,
  byocInbound: true,
  byocOutbound: false, // outbound media stays subject to Close telephony behavior (§1.2)
};

/**
 * CloseCRMProvider — implementation tracked as CLOSE-001..CLOSE-013 (plan §17.8).
 *
 * Non-negotiables for the implementation:
 * - Outbound sync only via transactional outbox worker; per-connection + per-endpoint
 *   rate limits; exponential backoff with jitter; dead letters for validation errors (§5.5, §5.8).
 * - Webhooks: verify signature against exact raw bytes, constant-time compare, dedupe by
 *   provider event id, ack fast, process asynchronously (§5.6).
 * - Mapping: external_object_map first, then canonical-ID custom field, then deterministic
 *   identity keys. NEVER fuzzy-match for automatic provider linkage (§5.5 step 4).
 * - Field ownership rules (§5.4): Close may not overwrite canonical IDs, UTM history,
 *   lead scores, or attribution ledgers. Only rollups project outward.
 */
export class CloseCRMProvider /* implements CRMProvider */ {
  constructor(private readonly options: { apiBase: string; secretRef: string }) {}

  async getCapabilities(_ctx: ProviderContext): Promise<CRMCapabilities> {
    return CLOSE_CRM_CAPABILITIES;
  }

  // TODO(CLOSE-004): upsertCompany/upsertPerson/upsertLead/upsertOpportunity/createTask/
  // createActivity/archive/getDeepLink/validateWebhook/reconcile per the CRMProvider contract.
}

export type { CRMProvider };
