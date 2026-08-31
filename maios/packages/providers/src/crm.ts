/**
 * CRMProvider contract (plan §9.2).
 * Phase 1: CloseCRMProvider. Future: TwentyCRMProvider, HubSpotCRMProvider, MAIOSCRMProvider.
 * Domain services express business operations in provider-neutral terms only.
 */
import type {
  ProviderContext,
  ProviderObjectRef,
  RawWebhookInput,
  ValidatedProviderEvent,
  ProviderChange,
  ReconciliationCursor,
} from './context.js';

export interface CRMCapabilities {
  companies: boolean;
  people: boolean;
  leads: boolean;
  opportunities: boolean;
  tasks: boolean;
  activities: boolean;
  emailExecution: boolean;
  smsExecution: boolean;
  nativeDialer: boolean;
  externalCallControl: boolean;
  customFields: boolean;
  webhooks: boolean;
  reconciliation: boolean;
}

interface BaseUpsertInput {
  ctx: ProviderContext;
  /** Canonical MAIOS UUID — projected into a dedicated provider custom field. */
  canonicalId: string;
  /** Stable operation key for provider-side and adapter-side idempotency. */
  idempotencyKey: string;
}

export interface UpsertCompanyInput extends BaseUpsertInput {
  name: string;
  domain?: string;
  phone?: string;
  industry?: string;
  ownerExternalId?: string;
  fields?: Record<string, unknown>;
}

export interface UpsertPersonInput extends BaseUpsertInput {
  firstName?: string;
  lastName?: string;
  title?: string;
  companyRef?: ProviderObjectRef;
  emails?: string[];
  phones?: string[];
  fields?: Record<string, unknown>;
}

export interface UpsertLeadInput extends BaseUpsertInput {
  companyRef?: ProviderObjectRef;
  status?: string;
  /** First/latest attribution rollups only — never the full touch ledger. */
  attributionRollups?: Record<string, string | number | null>;
  journeyUrl?: string;
  fields?: Record<string, unknown>;
}

export interface UpsertOpportunityInput extends BaseUpsertInput {
  leadRef?: ProviderObjectRef;
  name: string;
  pipelineExternalId?: string;
  stageExternalId?: string;
  amountMinor?: number;
  currency?: string;
  probability?: number;
  expectedCloseAt?: string;
  status?: string;
  ownerExternalId?: string;
  fields?: Record<string, unknown>;
}

export interface CreateCRMTaskInput extends BaseUpsertInput {
  subjectRef: ProviderObjectRef;
  title: string;
  dueAt?: string;
  assigneeExternalId?: string;
}

export interface CreateCRMActivityInput extends BaseUpsertInput {
  subjectRef: ProviderObjectRef;
  activityType: 'call' | 'sms' | 'email' | 'meeting' | 'note';
  occurredAt: string;
  direction?: 'inbound' | 'outbound';
  summary?: string;
  metadata?: Record<string, unknown>;
}

export interface ArchiveCRMObjectInput {
  ctx: ProviderContext;
  ref: ProviderObjectRef;
  idempotencyKey: string;
}

export interface CRMDeepLinkInput {
  ctx: ProviderContext;
  ref: ProviderObjectRef;
}

export interface ReconcileInput {
  ctx: ProviderContext;
  cursor: ReconciliationCursor;
}

export interface CRMProvider {
  getCapabilities(ctx: ProviderContext): Promise<CRMCapabilities>;
  upsertCompany(input: UpsertCompanyInput): Promise<ProviderObjectRef>;
  upsertPerson(input: UpsertPersonInput): Promise<ProviderObjectRef>;
  upsertLead(input: UpsertLeadInput): Promise<ProviderObjectRef>;
  upsertOpportunity(input: UpsertOpportunityInput): Promise<ProviderObjectRef>;
  createTask(input: CreateCRMTaskInput): Promise<ProviderObjectRef>;
  createActivity(input: CreateCRMActivityInput): Promise<ProviderObjectRef>;
  archive(input: ArchiveCRMObjectInput): Promise<void>;
  /** Deep links are generated server-side from known provider IDs — never from browser input. */
  getDeepLink(input: CRMDeepLinkInput): Promise<string | null>;
  validateWebhook(input: RawWebhookInput): Promise<ValidatedProviderEvent>;
  reconcile(input: ReconcileInput): AsyncIterable<ProviderChange>;
}
