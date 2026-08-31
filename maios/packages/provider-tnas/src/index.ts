/**
 * @maios/provider-tnas — TNASStorageProvider (plan §11, WP8: ASSET-002).
 * TNAS is the binary asset and archive layer — never the live transactional database,
 * never directly exposed to browsers or agents. The Asset Service is the only supported path.
 *
 * Logical path convention (§11.2):
 *   /maios/tenants/{tenant-slug}/assets/{yyyy}/{mm}/{asset-id}/original/{sanitized-filename}
 *   /maios/tenants/{tenant-slug}/calls/{yyyy}/{mm}/{call-id}/recording/{asset-id}.wav
 *   /maios/platform/backups/postgres/{environment}/{yyyy}/{mm}/{dd}/
 *
 * TODO(ASSET-002): implement AssetStorageProvider — logical path mapping, temp upload,
 * atomic commit, authorized short-lived reads, checksum verification, reconciliation.
 */
export type { AssetStorageProvider } from '@maios/providers';
