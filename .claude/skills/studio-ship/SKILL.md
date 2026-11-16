---
name: studio-ship
description: Build pages handed over from MAIOS Content Studio (MP FRESH > Ship to dev) into this site, then merge and push. Use when asked to check or run the studio ship queue, or when a scheduled ship check arrives.
---

# Ship pages from MAIOS Content Studio

Content Studio (maios.marketingpowered.ai/content-studio) holds the finished pages. A card moved to **Ship to dev**
waits in the ship queue; the batch is **ready** once 5 minutes pass with no new card arriving. Build every ready page,
merge to `main`, push, and report each page back. The studio shows the result on each card.

The builder token goes in `.studio-ship/token` (git-ignored; write it with the file tool, not on a command line). The script reads it from there. It only opens the ship queue and image downloads.

## 1. Check the queue

```bash
node scripts/studio-ship.mjs queue
```

- `ready: false` or no `items`: nothing to do. Say so in one line (mention `ready_at`, anything in `building`, and any
  `held` cards with their reason) and stop. Do not create branches or commits.
- `held` cards are not built (no URL, no draft, or blocking QA findings). They need a fix in the studio.

## 2. Prepare the checkout

```bash
git fetch --depth=50 origin main && git checkout -B studio-ship origin/main
test -d node_modules || npm ci
```

## 3. Claim and import

```bash
node scripts/studio-ship.mjs claim <id> <id> ...     # every id in items
node scripts/studio-ship.mjs import <id>             # one page at a time
```

`import` writes `content/pages/<path>.md` (the site's brief format), creates `src/app/<path>/page.tsx` for a new page,
converts the chosen images to JPG under `public/images/pages/<path>/`, and registers the page in `src/lib/links.ts`
(VALID, which also feeds the sitemap), `src/lib/pages.ts` (HUB_CHILDREN) and `src/components/site/pageImages.ts`.
It prints a report. If import fails, run `node scripts/studio-ship.mjs failed <id> "<reason>"` and continue with the
others.

## 4. Review every imported page (do not skip)

- **Report items:** fix every warning (shorten headings over 12 words, check tables turned into lists). If `hub` says
  no hub was found, add the page to the right hub in `HUB_CHILDREN`. For a brand-new section (for example
  `/areas-we-serve`), build its hub the way `/who-we-help` and `/services` are built (`HubPage`), and add a footer or
  nav link only if the page notes ask for it.
- **Parsing:** open the generated `.md`. The first line of PAGE COPY is the H1, then the lead paragraph, then
  `[CTA] … → /get-started/request-an-audit`. Every top-level heading is a short line with no closing punctuation; every
  paragraph ends with punctuation. Sub-headings start with `### `. FAQ is `FAQ` then `Q:` / `A:` lines.
- **Refresh pages** (`mode: refresh`): the approved draft replaces the copy. Check `git diff` for anything on the old
  page that the new copy should have kept (an embed, a form, a table), and keep the page's existing images if the
  package had none.
- **Claim control** (approved Nov 16, 2026; fix the copy if any of these appear):
  - Never: "$50M+" managed spend, revenue growth figures (such as $30M to $140M), the former employer's name (Haven
    Health or any other), CMO tenure dates, named hardware or vendors (Mac Studio, TerraMaster).
  - Never claim HIPAA certification or guaranteed outcomes, or show agency client results without an approved record.
  - The founder's past results are personal history ("a former healthcare CMO who …"), not agency client results.
  - Allowed proof points: former healthcare CMO for a treatment network that grew from 3 to 24 locations (unnamed);
    $1.5 to $2M per month in Google Ads across 11+ behavioral and mental health accounts; court-certified expert witness
    in advertising strategy; AI-native since 2022; LegitScript-aware and HIPAA-aware; attribution tracked to admission;
    owned, local AI infrastructure for HIPAA-aware inference.
- **Images:** alt text describes the image; hero first, then at most three section images.

## 5. Verify

```bash
npm run lint
npm run build
```

Both must pass. Then start the site (`npm run start`) and screenshot each new or changed page at 1280px and 390px wide.
Look for paragraphs rendered as headings, missing images or broken layout, and fix them.

## 6. Merge, push, report

```bash
git add -A && git commit -m "Studio ship: <n> pages (<paths>)"
git checkout main && git merge --ff-only studio-ship
git -c push.negotiate=true push origin main
node scripts/studio-ship.mjs done <id> $(git rev-parse --short HEAD)      # each built page
node scripts/studio-ship.mjs failed <id> "<reason>"                       # each page that could not be built
```

If `--ff-only` fails, `main` moved: rebase `studio-ship` onto `origin/main`, rebuild, then merge. Never force-push.
Vercel deploys `main` to marketingpowered.ai. After a few minutes, confirm each live URL returns 200, then submit them:
`node scripts/indexnow-ping.mjs <path> ...`.

Finish with one short summary: pages built (live URLs), pages failed (why), cards held (why).
