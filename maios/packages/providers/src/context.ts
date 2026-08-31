/**
 * Shared provider context and reference types (plan §9).
 * Vendor-specific payloads must not leak across the interface boundary.
 */

export interface ProviderContext {
  tenantId: string;
  connectionId: string;
  correlationId: string;
  /** Authenticated actor on whose behalf the operation runs. */
  actor: { type: 'user' | 'service' | 'agent'; id: string };
}

export interface ProviderObjectRef {
  provider: string;
  connectionId: string;
  objectType: string;
  externalId: string;
  externalUrl?: string;
  providerVersion?: string;
  updatedAt?: string;
}

/** Raw inbound webhook — exact bytes preserved for signature verification. */
export interface RawWebhookInput {
  provider: string;
  connectionId?: string;
  headers: Record<string, string>;
  /** Raw request body bytes; verify signatures against these, not re-serialized JSON. */
  rawBody: Uint8Array;
  receivedAt: string;
}

export interface ValidatedProviderEvent {
  provider: string;
  connectionId: string;
  providerEventId: string;
  eventType: string;
  occurredAt?: string;
  signatureStatus: 'valid' | 'invalid' | 'unsigned';
  payload: unknown;
}

export interface ReconciliationCursor {
  connectionId: string;
  cursor: string | null;
  checkpointAt?: string;
}

export interface ProviderChange {
  objectType: string;
  externalId: string;
  changeType: 'created' | 'updated' | 'deleted' | 'unknown';
  occurredAt?: string;
  cursor: string;
  payload: unknown;
}
