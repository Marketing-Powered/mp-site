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

Claim only the ids in the queue's `batch`: at most `batch_limit` pages (30), highest priority first. The rest of
`items` wait for the next Ship check, which takes the next batch. A batch you claim, you finish (build, report).

```bash
node scripts/studio-ship.mjs claim <id> <id> ...     # the ids in `batch`, nothing else
node scripts/studio-ship.mjs import <id>             # one page at a time
```

`import` writes `content/pages/<path>.md` (the site's brief format), creates `src/app/<path>/page.tsx` for a new page,
saves the chosen images under `public/images/pages/<path>/`, and registers the page in `src/lib/links.ts`
(VALID, which also feeds the sitemap), `src/lib/pages.ts` (HUB_CHILDREN) and `src/components/site/pageImages.ts`.

Images are saved as WebP (longest side 1600px) with descriptive file names (`<primary-keyword>-<what-it-shows>.webp`)
and embedded metadata (description/alt, title, creator, copyright; generated images are marked as AI-generated with the
IPTC digital source type). They are registered with `studioImg(..., ratio)`: shown edge to edge at their own aspect
ratio, never on a white artboard. Pages with their own images list them in the image sitemap automatically.
`node scripts/studio-ship.mjs reimage <id>` rebuilds a built page's images the same way.
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
- **Images:** alt text describes what the image shows in one sentence (under about 150 characters); hero first, then
  at most three section images. A hub page (`HubPage`) shows only one image (the overview, the second registered).

## 5. Verify, then review it like a designer

```bash
npm run lint
npm run build
npm run start &                                                   # http://localhost:3000
node scripts/page-ui-check.mjs <path> <path> ...                  # every new or changed page
```

Lint and build must pass, and `page-ui-check` must exit 0. It loads each page at 1280px and 390px in a real browser,
saves full-page screenshots to `.studio-ship/shots/`, and fails on: a page that is not 200, horizontal scrolling, not
exactly one H1, broken images, images without alt, **letterboxed images** (empty bands inside the frame) and images
cropped by more than 12%. Fix every error. Fix warnings on pages you built (a "soft" image means the `sizes` hint is
narrower than the frame).

Then open the desktop and phone screenshot of every page and review it as a UI/UX designer would. Fix anything that
fails before merging:

- **Images:** photos run edge to edge in their frame; no white bands, borders or padding around a photo; faces and the
  subject are not cut off; no two images in a row without copy between them; a portrait graphic sits in a narrow
  column, not a full-width slot; text inside a graphic is readable on the phone screenshot (if not, drop that image).
- **Hero:** the H1, one short lead paragraph, a button with a plain action label ("Request an acquisition audit", never
  a note such as "CONVERSION: …"), and the hero image (hub pages have none). No raw Markdown (`[text](/link)`, `**`,
  `#`) anywhere on the page.
- **Reading:** headings read as headings (no paragraph rendered as a heading or the reverse); sections open with a
  sentence, not a list; lists are 2 to 8 items; no wall of text longer than about 6 paragraphs without a heading,
  list or image; line length stays in the content column.
- **Phone:** nothing overflows or is clipped; buttons are full, tappable targets; tables and long words wrap.
- **Consistency:** compare with a well-built page of the same type (for example `/who-we-help/behavioral-health` for
  a who-we-help page, `/services/google-ads-management` for a service page): same hero pattern, spacing and image
  treatment.

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
