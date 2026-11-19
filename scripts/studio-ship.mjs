#!/usr/bin/env node
/**
 * Build pages handed over from MAIOS Content Studio (MP FRESH > Ship to dev).
 *
 *   node scripts/studio-ship.mjs queue              # what is waiting, and whether the batch is ready
 *   node scripts/studio-ship.mjs claim <id...>      # take tasks for this build (others cannot take them)
 *   node scripts/studio-ship.mjs import <id>        # write content, route, images and registrations for one page
 *   node scripts/studio-ship.mjs reimage <id>       # rebuild the images of a page already on the site
 *   node scripts/studio-ship.mjs done <id> <commit> # report the page built (records the live URL on the card)
 *   node scripts/studio-ship.mjs failed <id> "why"  # report the page not built (the card shows the reason)
 *
 * Needs the studio's builder token in .studio-ship/token (or STUDIO_BUILD_TOKEN) and optionally STUDIO_API
 * (default https://maios.marketingpowered.ai/api/studio). See .claude/skills/studio-ship/SKILL.md for the full procedure.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, unlinkSync } from 'node:fs';
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
  const placeholderRe = /\s*\[(?:PHONE|INTERNAL LINK|EVIDENCE SLOT|EVIDENCE|TBD|TODO|INSERT|PLACEHOLDER|CONFIRM)\b[^\]]*\]/gi;
  const placeholders = (text.match(placeholderRe) || []).length;
  const cleaned = text.replace(/\s*\[VERIFY[^\]]*\]/gi, '').replace(placeholderRe, '');
  // A person approved this page (possibly overriding QA), so leftover [VERIFY] tags are removed, not refused. The text they
  // were attached to stays; the builder reviews those sentences against the claim rules.
  const verifyTags = (text.match(/\[VERIFY[^\]]*\]/gi) || []).length;
  if (placeholders) warnings.push(`${placeholders} bracketed placeholder(s) such as [PHONE: …] removed. Check the sentences still read correctly.`);
  if (verifyTags) warnings.push(`${verifyTags} [VERIFY] tag(s) removed. Read the sentences they were attached to and check them against the claim rules.`);
  const meta = {
    title: strip(cleaned.match(/^\s*\**\s*(?:meta title|title tag|seo title)\s*:?\**\s*:?\s*(.+)$/im)?.[1] || ''),
    description: strip(cleaned.match(/^\s*\**\s*meta description\s*:?\**\s*:?\s*(.+)$/im)?.[1] || '')
  };
  const lines = cleaned.split('\n');
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
  heroLayout(out, warnings);
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
  // studioImg: full-bleed at the file's own aspect ratio (no white artboard, no bands, no crop).
  const entry = `  ${key}\n${slots.map((x, i) => `    // [${i}] ${i ? 'section image' : 'hero'}\n    studioImg(\n      ${JSON.stringify(dir)},\n      ${JSON.stringify(x.file)},\n      ${JSON.stringify(x.alt)},\n      ${JSON.stringify(x.ratio)},\n    ),`).join('\n')}\n  ],\n`;
  const existing = s.indexOf(`  ${key}`);
  if (existing >= 0) { const end = s.indexOf('\n  ],\n', existing) + '\n  ],\n'.length; s = `${s.slice(0, existing)}${entry}${s.slice(end)}`; }
  else { const open = s.indexOf('{', s.indexOf('const ROUTE_OVERRIDES')) + 2; s = `${s.slice(0, open)}${entry}${s.slice(open)}`; }
  write(rel, s);
}
// ---------- images ----------
// Every image ships as WebP (longest side 1600px) under a descriptive file name, with metadata embedded: EXIF
// ImageDescription, Artist and Copyright; XMP title, description, alt text, creator, rights and credit; and for
// studio-generated images the IPTC digital source type (trainedAlgorithmicMedia) that Google reads to label
// AI-generated images. The frame ratio of the saved file is returned (e.g. "3 / 2") for pageImages.ts.
const WEBP_PY = String.raw`
import sys, json, unicodedata
from PIL import Image
from xml.sax.saxutils import escape
src, dst, meta = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
im = Image.open(src).convert("RGB")
im.thumbnail((1600, 1600), Image.LANCZOS)
ascii_ = lambda s: unicodedata.normalize("NFKD", s.replace("’", "'").replace("“", '"').replace("”", '"').replace("—", "-").replace("©", "(c)")).encode("ascii", "ignore").decode()
exif = Image.Exif()
exif[0x010E] = ascii_(meta["description"])
exif[0x013B] = ascii_(meta["creator"])
exif[0x8298] = ascii_(meta["rights"])
e = lambda v: escape(v, {'"': "&quot;"})
lang = lambda tag, v: '<%s><rdf:Alt><rdf:li xml:lang="x-default">%s</rdf:li></rdf:Alt></%s>' % (tag, e(v), tag)
source = "<Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia</Iptc4xmpExt:DigitalSourceType>" if meta.get("generated") else ""
xmp = ('<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/">'
  '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about=""'
  ' xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"'
  ' xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">'
  + lang("dc:title", meta["title"]) + lang("dc:description", meta["description"])
  + lang("Iptc4xmpCore:AltTextAccessibility", meta["description"])
  + "<dc:creator><rdf:Seq><rdf:li>%s</rdf:li></rdf:Seq></dc:creator>" % e(meta["creator"])
  + lang("dc:rights", meta["rights"]) + "<photoshop:Credit>%s</photoshop:Credit>" % e(meta["creator"]) + source
  + '</rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>')
im.save(dst, "WEBP", quality=80, method=6, exif=exif.tobytes(), xmp=xmp.encode("utf-8"))
print(*im.size)
`;
function webp(input, output, meta) {
  mkdirSync(dirname(output), { recursive: true });
  const out = execFileSync('python3', ['-c', WEBP_PY, input, output, JSON.stringify(meta)]);
  return ratioOf(...String(out).trim().split(/\s+/).map(Number));
}
function imageSize(file) {
  const [w, h] = String(execFileSync('python3', ['-c', 'import sys\nfrom PIL import Image\nprint(*Image.open(sys.argv[1]).size)', file])).trim().split(/\s+/).map(Number);
  return { w, h };
}
const STOP = new Set('a an and are as at be by for from in into is it its of on or our the their this to was we with your next while'.split(' '));
/** "Substance use disorder marketing" -> "substance-use-disorder-marketing", cut at a word boundary. */
function slug(text, max = 60, dropStop = false) {
  const words = String(text || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/).filter((w) => w && !(dropStop && STOP.has(w)));
  let out = '';
  for (const w of words) { if ((out ? out.length + 1 : 0) + w.length > max) break; out = out ? `${out}-${w}` : w; }
  return out;
}
function ratioOf(w, h) { const g = (a, b) => (b ? g(b, a % b) : a); const d = g(w, h) || 1; return `${w / d} / ${h / d}`; }

/**
 * Choose the page's images (a landscape hero, then one image for each section that gets an image slot), save them as
 * WebP with metadata under public/images/pages/<route>/, and register them in pageImages.ts.
 */
async function shipImages(pkg, conv, route) {
  const imgs = pkg.images || [];
  if (!imgs.length) return [];
  const dir = join(WORK, pkg.id); mkdirSync(dir, { recursive: true });
  for (const x of imgs) {
    x.local = join(dir, `${x.id}.${x.mime.split('/')[1] || 'png'}`);
    writeFileSync(x.local, await api(x.download));
    Object.assign(x, imageSize(x.local));
  }
  // A portrait hero towers over the headline, so the hero is the first landscape image.
  const wide = (x) => x.w / x.h >= 1.2;
  const heroImg = imgs.find((x) => /Hero/i.test(x.name) && wide(x)) || imgs.find(wide) || imgs[0];
  const n = conv.sections.length, slotIdx = [];
  if (n >= 2) slotIdx.push(0); if (n >= 4) slotIdx.push(Math.floor(n / 2)); if (n >= 6) slotIdx.push(n - 2);
  const rest = imgs.filter((x) => x !== heroImg), used = new Set();
  const forSection = (heading) => rest.find((x) => !used.has(x) && x.name.toLowerCase().includes(heading.toLowerCase().slice(0, 40))) || rest.find((x) => !used.has(x));
  const chosen = [{ img: heroImg, alt: heroImg.alt || conv.h1 }];
  slotIdx.forEach((si) => { const x = forSection(conv.sections[si] || ''); if (x) { used.add(x); chosen.push({ img: x, alt: x.alt || x.name.replace(/^AI image \d+ · /, '') }); } });
  // File names: the page's keyword, then what the image shows (from its alt text), e.g.
  // substance-use-disorder-marketing-front-desk-coordinator-answering-inquiry-call.webp
  const base = slug(pkg.primary_keyword || route.split('/').pop(), 48) || 'page';
  const names = new Set();
  const rel = route.replace(/^\//, '');
  for (const [i, c] of chosen.entries()) {
    let name = i === 0 ? base : `${base}-${slug(c.alt, 40, true)}`;
    for (let k = 2; names.has(name); k++) name = `${name.replace(/-\d+$/, '')}-${k}`;
    names.add(name); c.file = `${name}.webp`;
    c.ratio = webp(c.img.local, join(ROOT, 'public/images/pages', rel, c.file), {
      title: i === 0 ? conv.h1 : `${conv.h1}: ${c.alt.split(/[.:;]/)[0]}`.slice(0, 160),
      description: c.alt, creator: 'Marketing Powered', rights: `© ${new Date().getFullYear()} Marketing Powered`,
      generated: c.img.source === 'generated'
    });
  }
  registerImages(route, chosen.map((c) => ({ file: c.file, alt: c.alt, ratio: c.ratio })));
  // Drop image files this page no longer uses (earlier imports), but never another page's folder.
  const folder = join(ROOT, 'public/images/pages', rel), keep = new Set(chosen.map((c) => c.file));
  for (const f of readdirSync(folder, { withFileTypes: true })) {
    if (f.isFile() && /\.(jpe?g|png|webp)$/i.test(f.name) && !keep.has(f.name) && !referenced(`/images/pages/${rel}/${f.name}`, `"${rel}",\n      "${f.name}"`)) unlinkSync(join(folder, f.name));
  }
  return chosen;
}
/** Whether any source file still points at an image (by URL, or as a pageImages.ts entry). */
function referenced(url, entry) {
  const hits = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).some((f) => {
    const p = join(dir, f.name);
    if (f.isDirectory()) return hits(p);
    if (!/\.(tsx?|mdx?|json|css)$/.test(f.name)) return false;
    const text = read(p); return text.includes(url) || text.includes(entry);
  });
  return hits('src') || hits('content');
}

/** Rebuild the images of a page that is already on the site (WebP, metadata, full-bleed registration). */
async function reimageTask(id) {
  const pkg = await api(`/api/ship/${id}`);
  if (!pkg.draft) throw new Error('No draft.');
  const route = pkg.path.replace(/\/+$/, '');
  const conv = convertDraft(pkg.draft.markdown, {});
  const chosen = await shipImages(pkg, conv, route);
  const report = { id, route, images: chosen.map((c) => `${c.file} (${c.ratio})`) };
  console.log(JSON.stringify(report, null, 2));
  return report;
}

async function importTask(id) {
  const pkg = await api(`/api/ship/${id}`);
  if (pkg.held) throw new Error(pkg.held);
  if (!pkg.draft) throw new Error('No draft.');
  const route = pkg.path.replace(/\/+$/, '');
  const ctaText = ctaLabel(pkg.cta);
  const conv = convertDraft(pkg.draft.markdown, { ctaText });
  const known = existingFile(route);
  // A plan page's address is worked out from its slug; never let it replace a live page without a person deciding.
  if (known && pkg.derived && pkg.mode !== 'refresh') throw new Error(`Held: a live page already exists at ${route}. Set "Mode: refresh" (to replace it) or another "URL:" in the card's notes.`);
  const file = known || `${route.replace(/^\//, '')}.md`;
  const prior = existsSync(join(ROOT, 'content/pages', file)) ? read(join('content/pages', file)) : '';
  const author = prior.match(/^author:\s*"?([^"\n]+)"?/m)?.[1] || (route.startsWith('/resources/') ? 'mike-hulick' : '');
  const q = (s) => JSON.stringify(String(s || ''));
  const chosen = await shipImages(pkg, conv, route);
  const fm = ['---', `title: ${q(conv.title)}`, `url: ${q(`${route}/`)}`, `primary_keyword: ${q(pkg.primary_keyword)}`,
    ...(pkg.secondary_keywords?.length ? [`secondary_keywords: ${q(pkg.secondary_keywords.join(', '))}`] : []), ...(author ? [`author: ${q(author)}`] : []), '---'].join('\n');
  write(join('content/pages', file), `${fm}\n\nSEO METADATA\nTitle tag: ${conv.title}\nMeta description: ${conv.description}\nH1: ${conv.h1}\n${chosen[0] ? `Hero image alt: ${chosen[0].alt}\n` : ''}\n\nPAGE COPY\n\n${conv.copy}\n`);
  const created = [];
  if (!known) {
    const kicker = route.startsWith('/resources/guides/') ? 'Guide' : route.startsWith('/resources/') ? 'Resources' : '';
    write(join('src/app', route, 'page.tsx'), `import MarkdownPage from "@/components/site/MarkdownPage";\nimport { pageMetadata } from "@/lib/pages";\n\nconst FILE = "${file}";\nexport const metadata = pageMetadata(FILE);\n\nexport default function Page() {\n  return <MarkdownPage file={FILE}${kicker ? ` kicker="${kicker}"` : ''} />;\n}\n`);
    created.push(`src/app${route}/page.tsx`);
  }
  const valid = registerValid(route);
  const hub = registerHub(route, file);
  const report = { id, route, mode: pkg.mode, file: `content/pages/${file}`, created, images: chosen.map((c) => `${c.file} (${c.ratio})`), valid_added: valid, hub, warnings: conv.warnings, live_url: pkg.live_url, qa: pkg.qa?.verdict || '', approved: pkg.approved };
  console.log(JSON.stringify(report, null, 2));
  return report;
}

/**
 * The hero shows the H1, ONE lead paragraph (plain text) and the CTA; the site parser drops anything else before the
 * first heading. So: move any other intro lines into the top of the first section (copy is never lost), and make the
 * lead plain text (keep link text; drop a sentence that is only a link). Works on PAGE COPY lines after the H1.
 */
export function heroLayout(out, warnings = []) {
  const plain = (l) => !l.startsWith('[CTA]') && !l.startsWith('* ') && !l.startsWith('### ');
  const isHeading = (l) => plain(l) && words(l) <= 12 && !/[.:,;!?)"'”\]]$/.test(l);
  const fh = out.findIndex(isHeading);
  if (fh > 0) {
    const intro = out.slice(0, fh);
    const leadIdx = intro.findIndex(plain);
    const extra = intro.filter((l, i) => i !== leadIdx && !l.startsWith('[CTA]'));
    if (extra.length) {
      const keep = intro.filter((l, i) => i === leadIdx || l.startsWith('[CTA]'));
      out.splice(0, fh, ...keep);
      out.splice(keep.length + 1, 0, ...extra);
      warnings.push(`${extra.length} intro line(s) after the lead moved to the top of the first section "${out[keep.length]}" (the hero shows one paragraph). Check the section still opens well.`);
    }
  }
  const li = out.findIndex(plain);
  if (li >= 0 && li < (out.findIndex(isHeading) + 1 || Infinity) && /\]\(/.test(out[li])) {
    out[li] = out[li].replace(/(^|[.!?])\s*\[[^\]]+\]\([^)]+\)\s*\.?\s*$/, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
    if (!/[.!?]$/.test(out[li])) out[li] += '.';
    warnings.push('Links removed from the lead paragraph (the hero shows it as plain text).');
  }
  return out;
}
/** A button label from the brief's CTA note: "Conversion: local visibility review (book a call)" -> "Request a local visibility review". */
export function ctaLabel(note) {
  const label = String(note || '').split(/[.(\n;]/)[0].replace(/^\s*(?:primary\s+|secondary\s+)?(?:cta|conversion|goal|action|offer)\s*[:\-–]\s*/i, '').replace(/\s+/g, ' ').trim();
  if (!label || label.split(' ').length > 6 || !/audit|review|assessment|consult|call|plan/i.test(label)) return 'Request a Free Audit';
  const lower = label.charAt(0).toLowerCase() + label.slice(1).replace(/\b([A-Z])([a-z]+)/g, (m, a, b) => a.toLowerCase() + b);
  return /^(request|get|book|start|schedule|claim)\b/i.test(label) ? label.charAt(0).toUpperCase() + lower.slice(1) : `Request a${/^[aeiou]/i.test(lower) ? 'n' : ''} ${lower}`;
}

const [cmd, ...args] = process.argv.slice(2);
const run = {
  queue: async () => console.log(JSON.stringify(await api('/api/ship/queue'), null, 2)),
  claim: async () => console.log(JSON.stringify(await api('/api/ship/claim', 'POST', { ids: args, batch: `site-build-${new Date().toISOString().slice(0, 16)}` }), null, 2)),
  import: async () => { for (const id of args) await importTask(id); },
  reimage: async () => { for (const id of args) await reimageTask(id); },
  done: async () => console.log(JSON.stringify(await api(`/api/ship/${args[0]}/done`, 'POST', { commit: args[1] || '', url: args[2] || '' }), null, 2)),
  failed: async () => console.log(JSON.stringify(await api(`/api/ship/${args[0]}/failed`, 'POST', { reason: args.slice(1).join(' ') }), null, 2))
}[cmd];
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!run) { console.error('Usage: node scripts/studio-ship.mjs queue | claim <id...> | import <id...> | reimage <id...> | done <id> <commit> [url] | failed <id> <reason>'); process.exit(2); }
  run().catch((e) => { console.error(String(e?.message || e)); process.exit(1); });
}
