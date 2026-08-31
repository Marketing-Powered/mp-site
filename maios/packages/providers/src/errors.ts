/**
 * Provider error taxonomy (plan §9.6).
 * Every adapter maps vendor failures into exactly one stable class so retry,
 * circuit-breaker, and operator behavior is uniform across providers.
 */

export type ProviderErrorClass =
  | 'AUTHENTICATION_FAILED' // no automatic retry after threshold; disable connection, notify admin
  | 'AUTHORIZATION_DENIED' // no retry; audit actor and target
  | 'RATE_LIMITED' // retry per provider guidance; queue and delay
  | 'PROVIDER_UNAVAILABLE' // bounded retry with circuit breaker; canonical writes stay available
  | 'VALIDATION_FAILED' // no retry until corrected; dead-letter with actionable field error
  | 'MAPPING_CONFLICT' // quarantine; require controlled mapping or merge resolution
  | 'DUPLICATE_OPERATION' // idempotent replay: return prior success
  | 'TIMEOUT_UNKNOWN_RESULT' // reconcile provider state before any retry
  | 'CAPABILITY_UNSUPPORTED' // no retry; hide/disable the action
  | 'POLICY_BLOCKED' // no retry; explain consent/role/quiet-hour/tenant policy
  | 'INTERNAL_INVARIANT_FAILED'; // no blind retry; alert engineering, preserve correlation chain

export class ProviderError extends Error {
  constructor(
    public readonly errorClass: ProviderErrorClass,
    message: string,
    public readonly options: {
      provider: string;
      connectionId?: string;
      operation?: string;
      correlationId?: string;
      retryable?: boolean;
      retryAfterSeconds?: number;
      /** Never include credentials or unrestricted provider payloads. */
      details?: Record<string, unknown>;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options.cause });
    this.name = 'ProviderError';
  }

  get retryable(): boolean {
    return (
      this.options.retryable ??
      ['RATE_LIMITED', 'PROVIDER_UNAVAILABLE'].includes(this.errorClass)
    );
  }
}
