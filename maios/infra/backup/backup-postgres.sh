#!/usr/bin/env bash
# Nightly PostgreSQL backup (plan §14.6, ADR-0002 rule 2).
# Writes an encrypted dump to the TNAS share, then syncs offsite via rclone.
# Schedule from the TNAS task scheduler / cron: 0 2 * * *
set -euo pipefail

: "${MAIOS_SHARE_ROOT:?}"          # e.g. /mnt/pool/maios-share
: "${BACKUP_PASSPHRASE_FILE:?}"    # file containing the age/gpg passphrase — NOT the share
: "${RCLONE_REMOTE:=offsite}"      # rclone remote name for the offsite copy (e.g. B2/S3)

STAMP=$(date -u +%Y/%m/%d)
DEST="${MAIOS_SHARE_ROOT}/platform/backups/postgres/production/${STAMP}"
mkdir -p "${DEST}"

FILE="${DEST}/maios-$(date -u +%H%M%S).dump.gpg"
docker compose -f "$(dirname "$0")/../compose/docker-compose.yml" \
               -f "$(dirname "$0")/../compose/docker-compose.tnas.yml" \
  exec -T postgres pg_dump -U maios -d maios -Fc \
  | gpg --batch --symmetric --cipher-algo AES256 \
        --passphrase-file "${BACKUP_PASSPHRASE_FILE}" -o "${FILE}"

sha256sum "${FILE}" > "${FILE}.sha256"
echo "{\"file\":\"${FILE}\",\"created_at\":\"$(date -u +%FT%TZ)\",\"size\":$(stat -c%s "${FILE}")}" \
  > "${DEST}/manifest-$(date -u +%H%M%S).json"

# Offsite copy — a backup only on this TNAS is not disaster recovery.
rclone copy "${DEST}" "${RCLONE_REMOTE}:maios-backups/postgres/production/${STAMP}" --checksum

# Retention: keep 14 daily local, offsite lifecycle rules handle the rest.
find "${MAIOS_SHARE_ROOT}/platform/backups/postgres/production" -type f -mtime +14 -delete
find "${MAIOS_SHARE_ROOT}/platform/backups/postgres/production" -type d -empty -delete
echo "postgres backup complete: ${FILE}"
