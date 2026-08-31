# TNAS deployment runbook — Option B (everything self-hosted, ADR-0002)

End-to-end instructions for standing up the MAIOS core on the TNAS with databases on
the local HDD pool, the MAIOS web app on Vercel, and TNAS shares serving assets and
backups. Follow the sections in order; each ends with a verification step. Nothing in
this runbook requires SSDs.

---

## 0. Prerequisites

| Requirement | Detail |
|---|---|
| TNAS | x86_64, Docker + Docker Compose v2 available (TOS ≥ 5 "Docker Manager", or install docker-compose manually via SSH), ≥ 16 GB RAM strongly recommended (8 GB minimum with the model gateway disabled), ≥ 100 GB free on the pool |
| SSH access | Admin SSH enabled on the TNAS; all commands below run over SSH, not the web UI |
| DNS control | Ability to create A/CNAME records on `marketingpowered.ai` |
| Network path | EITHER port-forward 443→TNAS on the router (with a static LAN IP for the TNAS) OR a Cloudflare Tunnel (recommended — no open inbound ports) |
| Offsite storage | An rclone-compatible target for backups (Backblaze B2, S3, etc.) — **required**, not optional |
| Vercel | The existing Pro team; permission to create a project from the dashboard |
| Git | The `maios/` monorepo pushed to its own repository (or accessible branch) |

---

## 1. Pool layout — create the two dataset roots

Two separate trees with different roles. **`maios-data` is never exported over
SMB/NFS** — it holds live database files and belongs to Docker only.

```bash
# Adjust "/mnt/pool" to your actual pool mount (TOS: /Volume1, TrueNAS: /mnt/<pool>)
sudo mkdir -p /mnt/pool/maios-data/{postgres,redis,qdrant,n8n,caddy}
sudo mkdir -p /mnt/pool/maios-share/{tenants,platform/backups/{postgres,qdrant,config}/production,platform/models}

# Database dirs: root-owned tree, postgres container writes as its own uid (999)
sudo chown -R 999:999 /mnt/pool/maios-data/postgres
sudo chown -R 1000:1000 /mnt/pool/maios-data/{redis,qdrant,n8n,caddy}
```

If the TNAS UI lets you create datasets/folders with per-share settings: create
`maios-data` with **no SMB/NFS/AFP sharing at all**, snapshots enabled if supported;
create `maios-share` as a normal share restricted to a dedicated service account (no
guest access, no browser-visible credentials — plan §11.5).

**Verify:** `smbclient -L localhost` (or the UI's share list) shows `maios-share` but
NOT `maios-data`.

---

## 2. Install the stack

```bash
ssh admin@<tnas-ip>
docker --version && docker compose version   # need Compose v2; install if missing

# Clone the repo (use the dedicated maios repo once it exists; branch shown otherwise)
git clone <your-maios-repo-url> /opt/maios
cd /opt/maios
```

---

## 3. Secrets and environment

Create `/opt/maios/.env.production` (mode `600`, root-owned). Generate every secret —
none may be reused from other systems:

```bash
gen() { openssl rand -base64 36 | tr -d '/+=' ; }
cat > .env.production <<ENV
MAIOS_DATA_ROOT=/mnt/pool/maios-data
MAIOS_SHARE_ROOT=/mnt/pool/maios-share
RELEASE_VERSION=$(git rev-parse --short HEAD)

POSTGRES_PASSWORD=$(gen)
POSTGRES_API_PASSWORD=$(gen)
POSTGRES_WORKER_PASSWORD=$(gen)
POSTGRES_TRACKING_PASSWORD=$(gen)
QDRANT_API_KEY=$(gen)
N8N_ENCRYPTION_KEY=$(gen)
ENV
chmod 600 .env.production
```

Rules (plan §13.4): this file never enters git, images, logs, or the share; record the
values in your password manager; the **n8n encryption key and the backup passphrase
get an extra copy outside the TNAS** — losing either makes restores impossible.

---

## 4. First boot — data plane

```bash
cd /opt/maios/infra/compose
docker compose --env-file /opt/maios/.env.production \
  -f docker-compose.yml -f docker-compose.tnas.yml \
  up -d postgres redis qdrant

docker compose ps        # wait until postgres shows (healthy)
```

The base compose auto-applies `packages/db/migrations/*.sql` on a **fresh** postgres
volume. Confirm, then create the per-service database roles (least privilege, §13.4)
and the n8n database:

```bash
docker compose exec postgres psql -U maios -d maios -c "\dt" | head   # tables exist?

docker compose exec -e API_PW -e WORKER_PW -e TRACKING_PW postgres psql -U maios -d maios <<'SQL'
-- substitute the three passwords from .env.production
CREATE ROLE maios_api      LOGIN PASSWORD :'API_PW';
CREATE ROLE maios_worker   LOGIN PASSWORD :'WORKER_PW';
CREATE ROLE maios_tracking LOGIN PASSWORD :'TRACKING_PW';

GRANT USAGE ON SCHEMA public TO maios_api, maios_worker, maios_tracking;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO maios_api, maios_worker;
-- tracking service: narrow surface
GRANT SELECT, INSERT ON visitors, sessions, touch_events, page_events,
  form_submissions, consent_events TO maios_tracking;
GRANT UPDATE ON visitors, sessions TO maios_tracking;
-- append-only evidence: revoke UPDATE/DELETE everywhere it must never happen
REVOKE UPDATE, DELETE ON touch_events, conversion_events, call_events,
  audit_events, webhook_inbox, asset_access_events FROM maios_api, maios_worker, maios_tracking;

CREATE DATABASE n8n OWNER maios;
SQL
```

(Postgres `psql` variable passing: run it as three `-v API_PW=...` flags or edit
inline — just never echo passwords into shell history you keep.)

**Verify:** `docker compose exec postgres psql -U maios_api -d maios -c "DELETE FROM touch_events;"`
must fail with `permission denied`.

---

## 5. Application services

```bash
docker compose --env-file /opt/maios/.env.production \
  -f docker-compose.yml -f docker-compose.tnas.yml \
  up -d --build api worker tracking agent-api n8n

curl -s http://localhost:4000/v1/admin/system/health   # api → {"status":"ok",...}
```

n8n first-run: open `http://<tnas-lan-ip>:5678` **from the LAN only** (before Caddy is
up, temporarily `docker compose port n8n 5678`), create the owner account with a
strong password + the instance stays behind the internal vhost afterwards (§12.3).

---

## 6. DNS + ingress

### 6a. DNS records

| Record | Type | Target |
|---|---|---|
| `api.marketingpowered.ai` | A (or tunnel CNAME) | public IP of the TNAS site / tunnel |
| `hooks.marketingpowered.ai` | A / CNAME | same |
| `wfhooks.marketingpowered.ai` | A / CNAME | same |
| `mp.marketingpowered.ai` | A / CNAME | same |
| `app.marketingpowered.ai` | CNAME | `cname.vercel-dns.com` (set when adding the Vercel domain) |
| `flows.internal.marketingpowered.ai` | — | **LAN/VPN DNS only. Do not create a public record.** |

### 6b. Choose ONE ingress path

**Cloudflare Tunnel (recommended — zero inbound ports):**
```bash
docker run -d --name cloudflared --network compose_default --restart unless-stopped \
  cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TUNNEL_TOKEN>
```
In the Cloudflare Zero Trust dashboard, add public hostnames `api.`, `hooks.`,
`wfhooks.`, `mp.` → service `http://caddy:80`. Cloudflare terminates TLS publicly;
Caddy still enforces per-host routing and body limits.

**Port-forward:** give the TNAS a static LAN IP, forward router 443→TNAS:443 and
80→TNAS:80 (80 needed for Let's Encrypt HTTP-01), then start Caddy. **Never forward
anything else** — not 5432, not 6333, not 5678.

### 6c. Start Caddy

```bash
docker compose --env-file /opt/maios/.env.production \
  -f docker-compose.yml -f docker-compose.tnas.yml up -d caddy
curl -s https://api.marketingpowered.ai/v1/admin/system/health
```

**Verify from OUTSIDE the LAN** (phone on cellular): the health URL responds;
`https://flows.internal.marketingpowered.ai` does NOT resolve; `nmap` from outside
shows only 443 (and 80) open.

---

## 7. Vercel — the web app

1. Vercel dashboard → **Add New… → Project** → import the maios repo.
2. **Root Directory: `apps/web`** (critical — it's a monorepo). Framework auto-detects Next.js.
3. Environment variables: `API_BASE_URL=https://api.marketingpowered.ai` (add
   `NEXT_PUBLIC_`-prefixed variants only for values safe in the browser).
4. Deploy, then add domain `app.marketingpowered.ai` (Vercel shows the CNAME to set).

**Verify:** `https://app.marketingpowered.ai` renders the MAIOS shell; browser devtools
show no mixed-content or CORS errors when it calls the API (configure CORS in the API
to allow exactly `https://app.marketingpowered.ai` — no wildcard, §13.5).

---

## 8. Backups + offsite (NOT optional — ADR-0002 rule 2)

```bash
# one-time: configure the offsite remote and the encryption passphrase
rclone config                       # create remote named "offsite" (B2/S3/...)
sudo install -m 600 /dev/null /root/.maios-backup-passphrase
openssl rand -base64 48 | sudo tee /root/.maios-backup-passphrase >/dev/null
# copy that passphrase into the password manager NOW

# schedule (TNAS task scheduler or root crontab):
# 0 2 * * *  MAIOS_SHARE_ROOT=/mnt/pool/maios-share BACKUP_PASSPHRASE_FILE=/root/.maios-backup-passphrase /opt/maios/infra/backup/backup-postgres.sh
# 30 2 * * * MAIOS_SHARE_ROOT=/mnt/pool/maios-share QDRANT_API_KEY=<key> /opt/maios/infra/backup/backup-qdrant.sh
# weekly: tar /opt/maios/.env.production reference metadata + n8n volume + Caddyfile → same pipeline
```

Run both scripts once by hand and confirm files appear locally **and** on the offsite
remote (`rclone ls offsite:maios-backups`).

---

## 9. Operations

- **Update/deploy:** `cd /opt/maios && git pull && docker compose --env-file .env.production -f infra/compose/docker-compose.yml -f infra/compose/docker-compose.tnas.yml up -d --build`. Database migrations beyond the initial set are applied explicitly (`psql -f`) during a change window, backup first (§18.1).
- **Logs:** `docker compose logs -f --tail 100 api worker` (json-file, capped at 5×20 MB per service).
- **Kill switches (§SEC-010):** `docker compose stop worker` halts all outbound provider writes without touching canonical capture; `docker compose stop caddy` cuts all public ingress; per-connection disables come with CLOSE-001.
- **Resource watch:** `docker stats`; if postgres steadily sits at its 4 GB limit or IO-wait dominates `top`, consult the ADR-0002 revisit triggers.
- **Upgrades:** images are version-pinned; bump pins in git, test in staging compose, then pull on the TNAS. Never `latest`.

---

## 10. Monthly restore test (§14.6 — measured, not assumed)

On a clean machine (or a scratch dataset on the TNAS):

```bash
gpg --batch --decrypt --passphrase-file /root/.maios-backup-passphrase \
  <latest>.dump.gpg > /tmp/maios.dump
docker run -d --name restore-test -e POSTGRES_PASSWORD=x postgres:16
docker exec -i restore-test pg_restore -U postgres -C -d postgres < /tmp/maios.dump
docker exec restore-test psql -U postgres -d maios -c "SELECT count(*) FROM touch_events;"
```

Record duration and row counts in the release-evidence log. A restore that has never
been rehearsed is a backup in name only.

---

## 11. Final verification checklist

- [ ] `maios-data` is not reachable over SMB/NFS from any client
- [ ] External scan shows only 443 (and 80) open; DB/Redis/Qdrant/n8n ports closed
- [ ] `https://api.marketingpowered.ai/v1/admin/system/health` returns ok from outside
- [ ] `https://app.marketingpowered.ai` serves the shell from Vercel
- [ ] `hooks.` returns 404 on `/` and only routes `/v1/webhooks/*`
- [ ] Tracking endpoint accepts a test event; `touch_events` row appears
- [ ] `maios_api` role cannot DELETE from evidence tables
- [ ] Postgres + Qdrant backups exist locally AND offsite, encrypted, with checksums
- [ ] One restore test completed and timed
- [ ] n8n editor reachable only from LAN/VPN; owner account secured
- [ ] Secrets exist only in `.env.production` (600) + password manager
