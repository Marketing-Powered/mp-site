import fs from "node:fs";
import path from "node:path";

// ---- shared parsing logic (kept in sync with src/lib/pages.ts) ----
export function parsePage(raw) {
  // frontmatter
  const fm = {};
  let body = raw;
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fmMatch) {
    body = raw.slice(fmMatch[0].length);
    for (const line of fmMatch[1].split("\n")) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }

  // SEO metadata
  const seo = {};
  const titleTag = body.match(/Title tag[^:]*:\s*(.+)/);
  const metaDesc = body.match(/Meta description[^:]*:\s*(.+)/);
  const h1Line = body.match(/\nH1:\s*(.+)/);
  if (titleTag) seo.title = titleTag[1].trim();
  if (metaDesc) seo.description = metaDesc[1].trim();
  if (h1Line) seo.h1 = h1Line[1].trim();

  // PAGE COPY
  const copyStart = body.indexOf("PAGE COPY");
  let copy = copyStart >= 0 ? body.slice(copyStart + "PAGE COPY".length) : body;
  const enders = ["SCHEMA RECOMMENDATION", "DELIVERY NOTES"];
  let endIdx = copy.length;
  for (const e of enders) {
    const i = copy.indexOf(e);
    if (i >= 0 && i < endIdx) endIdx = i;
  }
  copy = copy.slice(0, endIdx);

  // Separate FAQ
  const faq = [];
  const faqIdx = copy.search(/\nFAQ\s*\n/);
  let mainCopy = copy;
  if (faqIdx >= 0) {
    const faqBlock = copy.slice(faqIdx);
    mainCopy = copy.slice(0, faqIdx);
    const qaRe = /Q:\s*([\s\S]*?)\nA:\s*([\s\S]*?)(?=\nQ:|\s*$)/g;
    let m;
    while ((m = qaRe.exec(faqBlock))) {
      faq.push({ q: m[1].trim().replace(/\s+/g, " "), a: m[2].trim().replace(/\s+/g, " ") });
    }
  }

  // Parse main copy into nodes
  const lines = mainCopy.split("\n").map((l) => l.trim()).filter(Boolean);
  let h1 = seo.h1 || fm.title || "";
  const nodes = [];
  let listBuf = null;
  const flushList = () => { if (listBuf) { nodes.push({ type: "list", items: listBuf }); listBuf = null; } };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0) { h1 = line; continue; }
    if (/^\[CTA\]/.test(line)) {
      flushList();
      const rest = line.replace(/^\[CTA\]\s*/, "");
      const [text, link] = rest.split(/→|->/).map((s) => s && s.trim());
      nodes.push({ type: "cta", text: (text || "Book a Discovery Call").replace(/\s*$/, ""), link: link || "" });
      continue;
    }
    if (/^[*-]\s+/.test(line)) {
      if (!listBuf) listBuf = [];
      listBuf.push(line.replace(/^[*-]\s+/, ""));
      continue;
    }
    flushList();
    const isHeading =
      line.length <= 78 &&
      line.split(/\s+/).length <= 12 &&
      !/[.:,;]$/.test(line) &&
      !/\]\(/.test(line);
    nodes.push({ type: isHeading ? "heading" : "paragraph", text: line });
  }
  flushList();

  return { fm, seo, h1, nodes, faq };
}

// ---- preview runner ----
const root = path.resolve("content/pages");
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(root);

let warnings = 0;
for (const f of files.sort()) {
  const parsed = parsePage(fs.readFileSync(f, "utf8"));
  const headings = parsed.nodes.filter((n) => n.type === "heading").map((n) => n.text);
  const paras = parsed.nodes.filter((n) => n.type === "paragraph").length;
  const lists = parsed.nodes.filter((n) => n.type === "list").length;
  const ctas = parsed.nodes.filter((n) => n.type === "cta").length;
  console.log("\n=== " + path.relative(root, f) + " ===");
  console.log("H1:", parsed.h1);
  console.log(`nodes: ${headings.length} headings, ${paras} paras, ${lists} lists, ${ctas} ctas | faq: ${parsed.faq.length}`);
  console.log("headings:", JSON.stringify(headings));
  if (!parsed.h1) { console.log("!!! no H1"); warnings++; }
  if (headings.length === 0) { console.log("!!! no headings"); warnings++; }
}
console.log("\n\nTotal files:", files.length, "warnings:", warnings);
