#!/usr/bin/env node
/**
 * Build pages handed over from MAIOS Content Studio (MP FRESH > Ship to dev).
 *
 *   node scripts/studio-ship.mjs queue              # what is waiting, and whether the batch is ready
 *   node scripts/studio-ship.mjs claim <id...>      # take tasks for this build (others cannot take them)
 *   node scripts/studio-ship.mjs import <id>        # write content, route, images and registrations for one page
 *   node scripts/studio-ship.mjs done <id> <commit> # report the page built (records the live URL on the card)
 *   node scripts/studio-ship.mjs failed <id> "why"  # report the page not built (the card shows the reason)
 *
 * Needs the studio's builder token in .studio-ship/token (or STUDIO_BUILD_TOKEN) and optionally STUDIO_API
 * (default https://maios.marketingpowered.ai/api/studio). See .claude/skills/studio-ship/SKILL.md for the full procedure.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = (process.env.STUDIO_API || 'https://maios.marketingpowered.ai/api/studio').replace(/\/+$/, '');
// The token comes from the environment or from .studio-ship/token (git-ignored), so it never has to appear in a command.
const tokenFile = join(ROOT, '.studio-ship', 'token');
const TOKEN = (process.env.STUDIO_BUILD_TOKEN || (existsSync(tokenFile) ? readFileSync(tokenFile, 'utf8') : '')).trim();
const WORK = join(ROOT, '.studio-ship');

async function api(path, method = 'GET', body) {
  if (!TOKEN) throw new Error('No builder token: put it in .studio-ship/token (or set STUDIO_BUILD_TOKEN).');
  const r = await fetch(`${API}${path}`, { method, headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'X-MAIOS-Actor': 'MP site builder' }, body: body ? JSON.stringify(body) : undefined });
  if (!r.ok) throw new Error(`${method} ${path}: HTTP ${r.status} ${(await r.text()).slice(0, 300)}`);
  return (r.headers.get('content-type') || '').includes('json') ? r.json() : Buffer.from(await r.arrayBuffer());
}

// ---------- markdown draft -> site brief format (see src/lib/pages.ts for the parser it must satisfy) ----------
const strip = (s) => String(s || '')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')                 // images
  .replace(/\*\*([^*]+)\*\*/g, '$1').replace(/__([^_]+)__/g, '$1')
  .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1$2').replace(/(^|\W)_([^_\n]+)_(?=\W|$)/g, '$1$2')
  .replace(/`([^`]+)`/g, '$1')
  .replace(/https?:\/\/(www\.)?marketingpowered\.ai(?=\/)/g, '')   // site-absolute links become internal
  .replace(/\]\(#[^)]*\)/g, '](/get-started/request-an-audit)')   // in-page anchors (CTA buttons) point at the audit page
  .replace(/\s+/g, ' ').trim();
// Sections in a draft that are working notes, not page copy.
const DROP_SECTION = /^(suggested\s+)?(internal links?|schema( markup)?|seo( metadata)?|meta( title| description| data)?|notes?\b|production notes|editor('s)? notes|notes? for (the )?(editor|designer|developer)|graphics?\b|visuals?\b|images?\b|image (notes|suggestions|prompts)|sources?|references|change ?log|qa\b|fact[- ]check)|not for publication/i;
const isFaqHeading = (h) => /^(faq|faqs|frequently asked questions)\b/i.test(h);
const words = (s) => s.split(/\s+/).filter(Boolean).length;

export function convertDraft(md, { ctaText = 'Request a Free Audit', ctaLink = '/get-started/request-an-audit' } = {}) {
  const warnings = [];
  const text = String(md || '').replace(/\r/g, '');
  if (/\[VERIFY/i.test(text)) throw new Error('The draft still contains [VERIFY] markers. Resolve them in the studio before shipping.');
  const meta = {
    title: strip(text.match(/^\s*\**\s*(?:meta title|title tag|seo title)\s*:?\**\s*:?\s*(.+)$/im)?.[1] || ''),
    description: strip(text.match(/^\s*\**\s*meta description\s*:?\**\s*:?\s*(.+)$/im)?.[1] || '')
  };
  const lines = text.split('\n');
  let h1 = '', section = null, faq = [], inFaq = false, dropping = false, inCode = false, table = [];
  const out = [], paras = [];
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter((r) => !/^\|?\s*:?-{2,}/.test(r)).map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => strip(c)));
    const [head, ...body] = rows;
    for (const row of body) out.push(`* ${row.map((c, i) => (head?.[i] && i ? `${head[i]}: ${c}` : c)).filter(Boolean).join('; ')}`);
    warnings.push('A table was turned into a bulleted list. Check it reads well.');
    table = [];
  };
  let q = null;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^```/.test(line.trim())) { inCode = !inCode; if (inCode) warnings.push('A code block was dropped.'); continue; }
    if (inCode) continue;
    if (/^\s*\|.*\|\s*$/.test(line)) { if (!dropping && !inFaq) table.push(line.trim()); continue; }
    flushTable();
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      const level = h[1].length, title = strip(h[2]).replace(/[:.;,]+$/, '');
      if (level === 1) { if (!h1) h1 = title; continue; }
      if (level === 2) {
        dropping = DROP_SECTION.test(title); inFaq = isFaqHeading(title); q = null;
        if (dropping || inFaq) continue;
        if (words(title) > 12 || title.length > 78) warnings.push(`Heading too long for the site parser (max 12 words, 78 characters): "${title}"`);
        out.push(title); section = title; continue;
      }
      if (dropping) continue;
      if (inFaq) { q = { q: title, a: [] }; faq.push(q); continue; }
      out.push(`### ${title}`); continue;
    }
    if (dropping) continue;
    if (/^\s*\**\s*(meta title|meta description|title tag|seo title|h1|url|slug)\s*:?\**\s*:/i.test(line)) continue;
    if (/^\s*(---|\*\*\*)\s*$/.test(line) || !line.trim()) continue;
    const item = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/);
    if (inFaq) {
      const qa = line.match(/^\s*\**Q(?:uestion)?\s*[:.]\**\s*(.+)$/i), an = line.match(/^\s*\**A(?:nswer)?\s*[:.]\**\s*(.+)$/i);
      if (qa) { q = { q: strip(qa[1]), a: [] }; faq.push(q); continue; }
      if (q) q.a.push(strip(an ? an[1] : item ? item[1] : line));
      continue;
    }
    if (item) { out.push(`* ${strip(item[1])}`); continue; }
    // A line that is only a link is a button in the draft: make it a CTA (anchors and booking links go to the audit page).
    const button = line.trim().match(/^\**\[([^\]]+)\]\(([^)]+)\)\**$/);
    if (button) {
      const href = button[2].replace(/^https?:\/\/(www\.)?marketingpowered\.ai/, '');
      out.push(`[CTA] ${strip(button[1])} → ${href.startsWith('/') && !href.startsWith('/get-started/book-a-call') ? href : '/get-started/request-an-audit'}`);
      continue;
    }
    let p = strip(line.replace(/^\s*>\s?/, ''));
    if (!p) continue;
    // The site's parser reads a short line without closing punctuation as a heading, so give short paragraphs a full stop.
    if (words(p) <= 12 && p.length <= 78 && !/[.:,;!?)"'\]]$/.test(p)) p += '.';
    if (!section && out.length === 0 && !paras.length) paras.push(p);
    out.push(p);
  }
  flushTable();
  if (!h1) throw new Error('The draft has no H1 (a line starting with "# ").');
  // Hero CTA right after the lead paragraph.
  const firstHeading = out.findIndex((l) => !l.startsWith('* ') && !l.startsWith('### ') && !l.startsWith('[CTA]') && words(l) <= 12 && !/[.:,;!?]$/.test(l));
  // Hero CTA after the lead, unless the draft already put a button there.
  const heroHasCta = out.slice(0, firstHeading > 0 ? firstHeading : out.length).some((l) => l.startsWith('[CTA]'));
  const cta = `[CTA] ${ctaText} → ${ctaLink}`;
  if (!heroHasCta) { if (firstHeading > 0) out.splice(firstHeading, 0, cta); else out.unshift(cta); }
  const faqLines = faq.filter((x) => x.q && x.a.length).flatMap((x) => [`Q: ${x.q}`, `A: ${x.a.join(' ')}`]);
  const lead = out.find((l) => !l.startsWith('[CTA]') && !l.startsWith('* ') && !l.startsWith('### ')) || '';
  return {
    h1, title: meta.title || h1, description: meta.description || lead.slice(0, 155),
    copy: [h1, ...out, ...(faqLines.length ? ['', 'FAQ', ...faqLines] : [])].join('\n'),
    sections: out.filter((l) => !l.startsWith('[CTA]') && !l.startsWith('* ') && !l.startsWith('### ') && words(l) <= 12 && !/[.:,;!?]$/.test(l)),
    warnings: [...new Set(warnings)]
  };
}

// ---------- registrations ----------
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const write = (rel, s) => { mkdirSync(dirname(join(ROOT, rel)), { recursive: true }); writeFileSync(join(ROOT, rel), s); };
function existingFile(route) {
  const page = join(ROOT, 'src/app', route, 'page.tsx');
  if (!existsSync(page)) return null;
  return readFileSync(page, 'utf8').match(/const FILE = "([^"]+)"/)?.[1] || null;
}
function registerValid(route) {
  const rel = 'src/lib/links.ts', s = read(rel);
  if (s.includes(`  "${route}",`)) return false;
  const start = s.indexOf('const VALID = new Set<string>([');
  const end = s.indexOf(']);', start);
  write(rel, `${s.slice(0, end)}  "${route}",\n${s.slice(end)}`);
  return true;
}
function registerHub(route, file) {
  const rel = 'src/lib/pages.ts', s = read(rel);
  if (s.includes(`href: "${route}"`)) return 'already listed';
  const parent = route.split('/').slice(0, -1).join('/');
  // The hub whose existing children live under the same parent path.
  const keys = [...s.matchAll(/^  "([^"]+\.md)": \[\n([\s\S]*?)^  \],/gm)];
  const hub = keys.find((m) => [...m[2].matchAll(/href: "([^"]+)"/g)].some((h) => h[1].split('/').slice(0, -1).join('/') === parent));
  if (!hub) return `no hub found for ${parent}: add it to HUB_CHILDREN by hand, or create the hub page`;
  const at = hub.index + hub[0].lastIndexOf('  ],');
  write(rel, `${s.slice(0, at)}    { href: "${route}", file: "${file}" },\n${s.slice(at)}`);
  return `added to ${hub[1]}`;
}
function registerImages(route, slots) {
  const rel = 'src/components/site/pageImages.ts'; let s = read(rel);
  const key = `"${route}/": [`;
  const dir = route.replace(/^\//, '');
  const entry = `  ${key}\n${slots.map((x, i) => `    // [${i}] ${i ? 'section image' : 'hero'}\n    pageImg(\n      ${JSON.stringify(dir)},\n      ${JSON.stringify(x.file)},\n      ${JSON.stringify(x.alt)},\n    ),`).join('\n')}\n  ],\n`;
  const existing = s.indexOf(`  ${key}`);
  if (existing >= 0) { const end = s.indexOf('\n  ],\n', existing) + '\n  ],\n'.length; s = `${s.slice(0, existing)}${entry}${s.slice(end)}`; }
  else { const open = s.indexOf('{', s.indexOf('const ROUTE_OVERRIDES')) + 2; s = `${s.slice(0, open)}${entry}${s.slice(open)}`; }
  write(rel, s);
}
function jpeg(input, output) {
  mkdirSync(dirname(output), { recursive: true });
  execFileSync('python3', ['-c', 'import sys\nfrom PIL import Image\nim=Image.open(sys.argv[1]).convert("RGB")\nim.thumbnail((1600,1600))\nim.save(sys.argv[2],"JPEG",quality=82,optimize=True,progressive=True)', input, output]);
}

async function importTask(id) {
  const pkg = await api(`/api/ship/${id}`);
  if (pkg.held) throw new Error(pkg.held);
  if (!pkg.draft) throw new Error('No draft.');
  const route = pkg.path.replace(/\/+$/, '');
  const ctaText = /audit|review/i.test(pkg.cta || '') ? String(pkg.cta).split(/[.,(]/)[0].trim() : 'Request a Free Audit';
  const conv = convertDraft(pkg.draft.markdown, { ctaText });
  const known = existingFile(route);
  const file = known || `${route.replace(/^\//, '')}.md`;
  const prior = existsSync(join(ROOT, 'content/pages', file)) ? read(join('content/pages', file)) : '';
  const author = prior.match(/^author:\s*"?([^"\n]+)"?/m)?.[1] || (route.startsWith('/resources/') ? 'mike-hulick' : '');
  const q = (s) => JSON.stringify(String(s || ''));
  // Images: hero first, then up to three in-article images, matched to the sections that get image slots.
  const imgs = pkg.images || [];
  const heroImg = imgs.find((x) => /Hero/i.test(x.name)) || imgs[0];
  const n = conv.sections.length, slotIdx = [];
  if (n >= 2) slotIdx.push(0); if (n >= 4) slotIdx.push(Math.floor(n / 2)); if (n >= 6) slotIdx.push(n - 2);
  const rest = imgs.filter((x) => x !== heroImg), used = new Set();
  const forSection = (heading) => rest.find((x) => !used.has(x) && x.name.toLowerCase().includes(heading.toLowerCase().slice(0, 40))) || rest.find((x) => !used.has(x));
  const chosen = [];
  if (heroImg) chosen.push({ img: heroImg, file: '01-hero.jpg', alt: heroImg.alt || conv.h1 });
  slotIdx.forEach((si, k) => { const x = forSection(conv.sections[si] || ''); if (x) { used.add(x); chosen.push({ img: x, file: `0${k + 2}-section.jpg`, alt: x.alt || x.name.replace(/^AI image \d+ · /, '') }); } });
  const dir = join(WORK, id); mkdirSync(dir, { recursive: true });
  for (const c of chosen) {
    const src = join(dir, `${c.img.id}.${c.img.mime.split('/')[1] || 'png'}`);
    writeFileSync(src, await api(c.img.download));
    jpeg(src, join(ROOT, 'public/images/pages', route.replace(/^\//, ''), c.file));
  }
  const fm = ['---', `title: ${q(conv.title)}`, `url: ${q(`${route}/`)}`, `primary_keyword: ${q(pkg.primary_keyword)}`,
    ...(pkg.secondary_keywords?.length ? [`secondary_keywords: ${q(pkg.secondary_keywords.join(', '))}`] : []), ...(author ? [`author: ${q(author)}`] : []), '---'].join('\n');
  write(join('content/pages', file), `${fm}\n\nSEO METADATA\nTitle tag: ${conv.title}\nMeta description: ${conv.description}\nH1: ${conv.h1}\n${chosen[0] ? `Hero image alt: ${chosen[0].alt}\n` : ''}\n\nPAGE COPY\n\n${conv.copy}\n`);
  const created = [];
  if (!known) {
    const kicker = route.startsWith('/resources/guides/') ? 'Guide' : route.startsWith('/resources/') ? 'Resources' : '';
    write(join('src/app', route, 'page.tsx'), `import MarkdownPage from "@/components/site/MarkdownPage";\nimport { pageMetadata } from "@/lib/pages";\n\nconst FILE = "${file}";\nexport const metadata = pageMetadata(FILE);\n\nexport default function Page() {\n  return <MarkdownPage file={FILE}${kicker ? ` kicker="${kicker}"` : ''} />;\n}\n`);
    created.push(`src/app${route}/page.tsx`);
  }
  if (chosen.length) registerImages(route, chosen.map((c) => ({ file: c.file, alt: c.alt })));
  const valid = registerValid(route);
  const hub = registerHub(route, file);
  const report = { id, route, mode: pkg.mode, file: `content/pages/${file}`, created, images: chosen.map((c) => c.file), valid_added: valid, hub, warnings: conv.warnings, live_url: pkg.live_url, qa: pkg.qa?.verdict || '', approved: pkg.approved };
  console.log(JSON.stringify(report, null, 2));
  return report;
}

const [cmd, ...args] = process.argv.slice(2);
const run = {
  queue: async () => console.log(JSON.stringify(await api('/api/ship/queue'), null, 2)),
  claim: async () => console.log(JSON.stringify(await api('/api/ship/claim', 'POST', { ids: args, batch: `site-build-${new Date().toISOString().slice(0, 16)}` }), null, 2)),
  import: async () => { for (const id of args) await importTask(id); },
  done: async () => console.log(JSON.stringify(await api(`/api/ship/${args[0]}/done`, 'POST', { commit: args[1] || '', url: args[2] || '' }), null, 2)),
  failed: async () => console.log(JSON.stringify(await api(`/api/ship/${args[0]}/failed`, 'POST', { reason: args.slice(1).join(' ') }), null, 2))
}[cmd];
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!run) { console.error('Usage: node scripts/studio-ship.mjs queue | claim <id...> | import <id...> | done <id> <commit> [url] | failed <id> <reason>'); process.exit(2); }
  run().catch((e) => { console.error(String(e?.message || e)); process.exit(1); });
}
