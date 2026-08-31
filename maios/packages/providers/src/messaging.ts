/**
 * MessagingProvider contract (plan §9.4).
 * SMS is NOT hardwired into TelephonyProvider — voice and messaging may use different
 * carriers, registrations, consent rules, throughput, and compliance programs.
 * sendMessage must receive a canonical consent decision; the adapter cannot bypass consent policy.
 */
import type { ProviderContext, RawWebhookInput, ValidatedProviderEvent } from './context.js';

export interface MessagingCapabilities {
  sms: boolean;
  mms: boolean;
  inbound: boolean;
  deliveryEvents: boolean;
  optOutKeywords: boolean;
  senderSelection: boolean;
  a2pRegistrationRequired: boolean;
}

export interface SenderIdentity {
  provider: string;
  connectionId: string;
  senderId: string;
  e164?: string;
  registrationStatus?: 'registered' | 'pending' | 'invalid' | 'unknown';
}

export interface ConsentDecision {
  status: 'granted' | 'denied' | 'unknown';
  purpose: string;
  evidenceRef?: string;
  decidedAt: string;
}

export interface SendMessageInput {
  ctx: ProviderContext;
  canonicalMessageId: string;
  channel: 'sms' | 'mms';
  sender: SenderIdentity;
  toChannel: string;
  body: string;
  templateVersion?: string;
  /** Mandatory canonical consent decision — sends without it are POLICY_BLOCKED. */
  consent: ConsentDecision;
  mediaAssetIds?: string[];
  idempotencyKey: string;
}

export interface ProviderMessageRef {
  provider: string;
  connectionId: string;
  providerMessageId: string;
}

export interface ProviderMessageSnapshot {
  ref: ProviderMessageRef;
  status: 'queued' | 'sent' | 'delivered' | 'failed' | 'undelivered' | 'inbound' | 'opted_out';
  sentAt?: string;
  deliveredAt?: string;
  errorCode?: string;
  raw?: unknown;
}

export interface CanonicalMessageEvent {
  canonicalMessageId?: string;
  providerMessageId: string;
  eventType: string;
  occurredAt: string;
  providerEventId?: string;
  payload?: Record<string, unknown>;
}

export interface GetProviderMessageInput { ctx: ProviderContext; ref: ProviderMessageRef }
export interface ListSendersInput { ctx: ProviderContext }
export interface OptOutInput {
  ctx: ProviderContext;
  channel: 'sms' | 'mms';
  recipient: string;
  source: string;
  occurredAt: string;
}

export interface MessagingProvider {
  getCapabilities(ctx: ProviderContext): Promise<MessagingCapabilities>;
  listSenders(input: ListSendersInput): Promise<SenderIdentity[]>;
  sendMessage(input: SendMessageInput): Promise<ProviderMessageRef>;
  getMessage(input: GetProviderMessageInput): Promise<ProviderMessageSnapshot>;
  validateWebhook(input: RawWebhookInput): Promise<ValidatedProviderEvent>;
  normalizeEvent(input: ValidatedProviderEvent): Promise<CanonicalMessageEvent[]>;
  optOut(input: OptOutInput): Promise<void>;
}
