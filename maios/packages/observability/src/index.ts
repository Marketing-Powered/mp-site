/**
 * @maios/observability — structured logging standard (plan §14.1).
 * Every log line carries: timestamp, level, service+version, correlation_id, tenant_id
 * (where applicable), actor, subject, provider context (no secrets), result, data
 * classification. No tokens, passwords, auth headers, full message bodies, or
 * unrestricted transcripts.
 */
import { randomUUID } from 'node:crypto';

export function newCorrelationId(): string {
  return randomUUID();
}

export interface LogContext {
  service: string;
  version: string;
  environment: string;
  correlationId: string;
  tenantId?: string;
  actor?: { type: string; id: string };
  subject?: { type: string; id: string };
}

// TODO(DEV-010): OpenTelemetry tracer/meter setup, Loki-friendly JSON logger, and
// correlation propagation across request → outbox → provider call → workflow → agent run.
