/**
 * AssetStorageProvider contract (plan §9.5, §11).
 * Domain code stores asset_id and logical URI, not mounted filesystem paths.
 * Browser clients never receive SMB credentials or unrestricted TNAS paths.
 */
import type { ProviderContext } from './context.js';

export type AssetClassification =
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted'
  | 'regulated'
  | 'secret';

export interface CreateUploadIntentInput {
  ctx: ProviderContext;
  assetId: string;
  expectedContentType: string;
  expectedByteSize: number;
  classification: AssetClassification;
  retentionClass: string;
  linkedSubject?: { type: string; id: string };
  idempotencyKey: string;
}

export interface UploadIntent {
  assetId: string;
  /** Controlled upload method or worker job reference — never raw storage credentials. */
  method: 'proxy-upload' | 'worker-transfer';
  uploadUrl?: string;
  expiresAt: string;
}

export interface CommitUploadInput {
  ctx: ProviderContext;
  assetId: string;
  checksumAlgorithm: 'sha256';
  checksum: string;
}

export interface PutAssetStreamInput {
  ctx: ProviderContext;
  assetId: string;
  contentType: string;
  stream: AsyncIterable<Uint8Array>;
  classification: AssetClassification;
  retentionClass: string;
}

export interface AssetObjectRef {
  assetId: string;
  /** Logical URI (e.g. maios://tenants/{slug}/assets/...) — mapped to backend by the provider. */
  logicalUri: string;
  byteSize: number;
  checksumAlgorithm: string;
  checksum: string;
  contentType: string;
}

export interface GetAuthorizedAssetInput {
  ctx: ProviderContext;
  assetId: string;
  purpose: 'preview' | 'download' | 'playback' | 'processing';
  rangeSupport?: boolean;
}

export interface AuthorizedAssetRead {
  assetId: string;
  /** Short-lived authorized stream or proxy URL; every restricted read is audited. */
  url: string;
  expiresAt: string;
}

export interface AssetStatInput { ctx: ProviderContext; assetId: string }
export interface AssetMetadata {
  assetId: string;
  logicalUri: string;
  byteSize: number;
  contentType: string;
  checksum: string;
  classification: AssetClassification;
  createdAt: string;
}
export interface MoveAssetInput { ctx: ProviderContext; assetId: string; targetLogicalUri: string }
export interface ArchiveAssetInput { ctx: ProviderContext; assetId: string; reason: string }
export interface VerifyChecksumInput { ctx: ProviderContext; assetId: string }
export interface ChecksumResult { assetId: string; valid: boolean; expected: string; actual: string }

export interface AssetStorageProvider {
  createUploadIntent(input: CreateUploadIntentInput): Promise<UploadIntent>;
  commitUpload(input: CommitUploadInput): Promise<AssetObjectRef>;
  putStream(input: PutAssetStreamInput): Promise<AssetObjectRef>;
  getAuthorizedRead(input: GetAuthorizedAssetInput): Promise<AuthorizedAssetRead>;
  stat(input: AssetStatInput): Promise<AssetMetadata>;
  move(input: MoveAssetInput): Promise<AssetObjectRef>;
  archive(input: ArchiveAssetInput): Promise<void>;
  verifyChecksum(input: VerifyChecksumInput): Promise<ChecksumResult>;
}
