#!/usr/bin/env bash
# Qdrant snapshot backup (plan §14.6). Schedule nightly after the Postgres job.
set -euo pipefail
: "${MAIOS_SHARE_ROOT:?}"
: "${QDRANT_API_KEY:?}"
: "${RCLONE_REMOTE:=offsite}"

STAMP=$(date -u +%Y/%m/%d)
DEST="${MAIOS_SHARE_ROOT}/platform/backups/qdrant/production/${STAMP}"
mkdir -p "${DEST}"

# Full-storage snapshot; per-collection snapshots can be added as collections grow.
SNAP=$(curl -fsS -X POST "http://localhost:6333/snapshots" \
  -H "api-key: ${QDRANT_API_KEY}" | python3 -c 'import sys,json;print(json.load(sys.stdin)["result"]["name"])')
curl -fsS "http://localhost:6333/snapshots/${SNAP}" \
  -H "api-key: ${QDRANT_API_KEY}" -o "${DEST}/${SNAP}"
sha256sum "${DEST}/${SNAP}" > "${DEST}/${SNAP}.sha256"

rclone copy "${DEST}" "${RCLONE_REMOTE}:maios-backups/qdrant/production/${STAMP}" --checksum
find "${MAIOS_SHARE_ROOT}/platform/backups/qdrant/production" -type f -mtime +14 -delete
echo "qdrant snapshot complete: ${SNAP}"
