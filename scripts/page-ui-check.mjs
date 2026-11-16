#!/usr/bin/env node
/**
 * Visual and UX check for built pages, in a real browser at desktop and phone widths.
 *
 *   node scripts/page-ui-check.mjs [--base http://localhost:3000] /path /other-path ...
 *
 * For each page and width it saves a full-page screenshot to .studio-ship/shots/ (look at them) and reports:
 *   errors   - page not 200, horizontal scrolling, not exactly one H1, broken images, images without alt,
 *              images letterboxed (empty bands inside the frame), images cropped by more than 12%
 *   warnings - skipped heading levels, images downloaded smaller than they are shown (soft), very long alt text,
 *              two images in a row with no copy between them
 * Exits 1 when there are errors. Run it against `npm run start` before merging.
 */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SHOTS = join(ROOT, '.studio-ship', 'shots');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const argv = process.argv.slice(2);
let base = 'http://localhost:3000';
const paths = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--base') base = argv[++i].replace(/\/+$/, '');
  else paths.push(argv[i].startsWith('/') ? argv[i] : `/${argv[i]}`);
}
if (!paths.length) { console.error('Usage: node scripts/page-ui-check.mjs [--base http://localhost:3000] /path ...'); process.exit(2); }

const VIEWPORTS = [{ name: 'desktop', width: 1280, height: 900 }, { name: 'phone', width: 390, height: 844 }];

/** Runs in the page: measure layout, headings and every content image. */
function inspect() {
  const out = { errors: [], warnings: [] };
  const doc = document.documentElement;
  if (doc.scrollWidth > window.innerWidth + 1) {
    const wide = [...document.querySelectorAll('main *')].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 3)
      .map((el) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''}`);
    out.errors.push(`Horizontal scroll: the page is ${doc.scrollWidth}px wide in a ${window.innerWidth}px window (${wide.join(', ') || 'unknown element'}).`);
  }
  const h1s = document.querySelectorAll('h1');
  if (h1s.length !== 1) out.errors.push(`${h1s.length} H1 headings (a page needs exactly one).`);
  let last = 1;
  for (const h of document.querySelectorAll('main h1, main h2, main h3, main h4')) {
    const level = Number(h.tagName[1]);
    if (level > last + 1) out.warnings.push(`Heading level skips from H${last} to H${level}: "${h.textContent.trim().slice(0, 60)}".`);
    last = level;
  }
  const imgs = [...document.querySelectorAll('main img')].filter((img) => {
    const r = img.getBoundingClientRect();
    return r.width >= 120 && r.height >= 80; // content images, not icons or logos
  });
  let prevBottomImg = null;
  for (const img of imgs) {
    const name = (img.currentSrc || img.src).split('/').pop().split('?')[0].slice(0, 70) || 'image';
    const label = decodeURIComponent(new URL(img.currentSrc || img.src, location.href).searchParams.get('url') || name).split('/').pop();
    if (!img.complete || !img.naturalWidth) { out.errors.push(`Broken image: ${label}.`); continue; }
    const alt = img.getAttribute('alt');
    if (alt === null) out.errors.push(`No alt attribute: ${label}.`);
    else if (alt.length > 250) out.warnings.push(`Alt text is ${alt.length} characters (keep it under about 150): ${label}.`);
    const cs = getComputedStyle(img);
    const r = img.getBoundingClientRect();
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight), padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const boxW = r.width - padX, boxH = r.height - padY;
    const frame = boxW / boxH, file = img.naturalWidth / img.naturalHeight;
    const mismatch = 1 - Math.min(frame / file, file / frame);
    if (cs.objectFit === 'contain' && mismatch > 0.05) {
      out.errors.push(`Letterboxed: ${label} (${img.naturalWidth}x${img.naturalHeight}) sits in a ${Math.round(boxW)}x${Math.round(boxH)} frame, leaving ${Math.round(mismatch * 100)}% of the frame as empty bands. Give the frame the image's own ratio.`);
    } else if (cs.objectFit === 'cover' && mismatch > 0.12) {
      out.errors.push(`Cropped ${Math.round(mismatch * 100)}%: ${label} (${img.naturalWidth}x${img.naturalHeight}) fills a ${Math.round(boxW)}x${Math.round(boxH)} frame. Give the frame the image's own ratio.`);
    }
    // With srcset, naturalWidth is already density-corrected: below the frame width means the browser downloaded a
    // copy too small for the frame (usually a `sizes` hint narrower than the real layout).
    if (img.naturalWidth < boxW * 0.95) out.warnings.push(`Soft: ${label} is downloaded for ${img.naturalWidth}px but shown at ${Math.round(boxW)}px (check the sizes hint).`);
    // Two images stacked with no copy between them read as a gallery, not an article.
    if (prevBottomImg) {
      const gap = r.top - prevBottomImg.bottom;
      if (gap >= 0 && gap < 160) out.warnings.push(`Two images in a row with no copy between them (before ${label}).`);
    }
    prevBottomImg = r;
  }
  out.images = imgs.length;
  return out;
}

const browser = await chromium.launch();
mkdirSync(SHOTS, { recursive: true });
let failed = 0;
const report = [];
for (const path of paths) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.name === 'phone' ? 2 : 1 });
    const page = await ctx.newPage();
    const res = await page.goto(base + path, { waitUntil: 'networkidle' }).catch((e) => ({ status: () => `failed (${e.message.split('\n')[0]})` }));
    const status = res?.status?.();
    const entry = { path, viewport: vp.name, status, errors: [], warnings: [] };
    if (status !== 200) entry.errors.push(`HTTP ${status}.`);
    else {
      // Scroll through the page so lazy images load and reveal animations finish, then measure.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        // Wait for every image (lazy ones included) to finish loading or fail.
        await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => { img.addEventListener('load', r); img.addEventListener('error', r); setTimeout(r, 10000); }))));
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState('networkidle').catch(() => {});
      await page.waitForTimeout(600);
      Object.assign(entry, await page.evaluate(inspect));
      entry.errors = entry.errors || []; entry.warnings = entry.warnings || [];
      entry.screenshot = join('.studio-ship', 'shots', `${path.replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'home'}-${vp.name}.png`);
      await page.screenshot({ path: join(ROOT, entry.screenshot), fullPage: true });
    }
    if (entry.errors.length) failed++;
    report.push(entry);
    await ctx.close();
  }
}
await browser.close();
for (const e of report) {
  console.log(`${e.errors.length ? 'FAIL' : 'ok  '} ${e.path} [${e.viewport}] ${e.images ?? 0} images${e.screenshot ? ` -> ${e.screenshot}` : ''}`);
  for (const x of e.errors) console.log(`     error: ${x}`);
  for (const x of e.warnings) console.log(`     warn:  ${x}`);
}
process.exit(failed ? 1 : 0);
