/**
 * TelephonyProvider contract (plan §9.3).
 *
 * Capability rule: optional methods may exist in the interface, but the application
 * must first inspect provider capabilities. CloseTelephonyProvider MUST report
 * externalCallControl=false unless Close publishes and Marketing Powered validates a
 * supported control API. MAIOSSipProvider may report true only after production tests pass.
 */
import type { ProviderContext, ValidatedProviderEvent } from './context.js';

export interface TelephonyCapabilities {
  inboundCalling: boolean;
  outboundCalling: boolean;
  externalCallControl: boolean;
  embeddedWebRTC: boolean;
  hold: boolean;
  transfer: boolean;
  dtmf: boolean;
  queues: boolean;
  powerDialer: boolean;
  predictiveDialer: boolean;
  recording: boolean;
  transcription: boolean;
  byocInbound: boolean;
  byocOutbound: boolean;
}

/** Canonical, provider-neutral call states (plan §8.3). */
export type CanonicalCallState =
  | 'CREATED'
  | 'ROUTING'
  | 'RINGING'
  | 'ANSWERED'
  | 'HELD'
  | 'TRANSFERRING'
  | 'COMPLETED'
  | 'BUSY'
  | 'NO_ANSWER'
  | 'VOICEMAIL'
  | 'REJECTED'
  | 'CANCELED'
  | 'FAILED';

export interface CanonicalCallEvent {
  callCanonicalId: string;
  legProviderId?: string;
  eventType: string;
  state?: CanonicalCallState;
  occurredAt: string;
  sequence?: number;
  providerEventId?: string;
  payload?: Record<string, unknown>;
}

export interface CreateCallIntentInput {
  ctx: ProviderContext;
  canonicalCallId: string;
  personId?: string;
  leadId?: string;
  purpose?: string;
  toNumber: string;
  fromNumberId?: string;
  idempotencyKey: string;
}

export interface CallIntentResult {
  canonicalCallId: string;
  providerCallRef?: ProviderCallRef;
  /** For handoff-style providers (Close Phase 1): a deep link instead of media control. */
  handoffUrl?: string;
}

export interface ProviderCallRef {
  provider: string;
  connectionId: string;
  providerCallId: string;
}

export interface ProviderCallSnapshot {
  ref: ProviderCallRef;
  state: CanonicalCallState;
  direction?: 'inbound' | 'outbound';
  startedAt?: string;
  answeredAt?: string;
  endedAt?: string;
  durationSeconds?: number;
  disposition?: string;
  recordingState?: 'pending' | 'available' | 'unavailable';
  transcriptState?: 'pending' | 'available' | 'failed';
  raw?: unknown;
}

export interface ProviderRecordingRef {
  ref: ProviderCallRef;
  providerRecordingId: string;
  /** Provider URL reference only — archival to TNAS goes through AssetStorageProvider. */
  providerUrlReference?: string;
  durationSeconds?: number;
}

export interface ProviderTranscriptRef {
  ref: ProviderCallRef;
  providerTranscriptId: string;
  source: string;
  version?: string;
}

export interface StartCallInput { ctx: ProviderContext; intent: CreateCallIntentInput }
export interface AnswerCallInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface EndCallInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface HoldCallInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface ResumeCallInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface TransferCallInput { ctx: ProviderContext; ref: ProviderCallRef; target: string }
export interface SendDtmfInput { ctx: ProviderContext; ref: ProviderCallRef; digits: string }
export interface GetProviderCallInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface GetRecordingInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface GetTranscriptInput { ctx: ProviderContext; ref: ProviderCallRef }
export interface CallDeepLinkInput { ctx: ProviderContext; ref: ProviderCallRef }

export interface TelephonyProvider {
  getCapabilities(ctx: ProviderContext): Promise<TelephonyCapabilities>;
  createCallIntent(input: CreateCallIntentInput): Promise<CallIntentResult>;
  startCall?(input: StartCallInput): Promise<ProviderCallRef>;
  answerCall?(input: AnswerCallInput): Promise<void>;
  endCall?(input: EndCallInput): Promise<void>;
  holdCall?(input: HoldCallInput): Promise<void>;
  resumeCall?(input: ResumeCallInput): Promise<void>;
  transferCall?(input: TransferCallInput): Promise<void>;
  sendDtmf?(input: SendDtmfInput): Promise<void>;
  getCall(input: GetProviderCallInput): Promise<ProviderCallSnapshot>;
  getRecording(input: GetRecordingInput): Promise<ProviderRecordingRef | null>;
  getTranscript(input: GetTranscriptInput): Promise<ProviderTranscriptRef | null>;
  getDeepLink(input: CallDeepLinkInput): Promise<string | null>;
  normalizeEvent(input: ValidatedProviderEvent): Promise<CanonicalCallEvent[]>;
}
