import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { getPage, HUB_CHILDREN } from "./pages";
import { getAuthor } from "./authors";
import { indexableRoutes } from "./links";
import { SITE_URL, FEED_PATH, FEED_TITLE } from "./site";
import dates from "../../content/dates.json";

/* ================================================================== */
/*  RSS feed of the resources library (/resources/**).                 */
/*  Items come from the same content briefs the pages render, so the   */
/*  feed cannot drift from the site. Dates come from content/dates.json */
/*  (git first/last commit per brief; see scripts/content-dates.mjs).   */
/* ================================================================== */

export const FEED_DESCRIPTION =
  "Guides, playbooks, research, and benchmarks on healthcare and behavioral health marketing, paid media, attribution, compliance, and owned AI infrastructure from Marketing Powered.";

/** Newest items included. Keeps the document a sane size for readers. */
export const FEED_LIMIT = 50;

export type FeedItem = {
  url: string;
  title: string;
  description: string;
  category: string;
  author: string | null;
  published: Date;
  updated: Date;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "pages");
const DATE_INDEX = dates.pages as Record<string, { published: string; updated: string }>;
const FALLBACK_DATE = new Date(dates.generatedAt);

/* Hub/landing pages under /resources are navigation, not articles. */
const HUB_FILES = new Set(Object.keys(HUB_CHILDREN).filter((f) => f.startsWith("resources/")));

function categoryFor(url: string): string {
  if (url.startsWith("/resources/guides/")) return "Guides";
  if (url.startsWith("/resources/research/")) return "Research";
  return "Resources";
}

function listResourceFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) out.push(path.relative(CONTENT_ROOT, full));
    }
  };
  walk(path.join(CONTENT_ROOT, "resources"));
  return out.sort();
}

/** Every resource article, newest first. */
export const feedItems = cache((): FeedItem[] => {
  const live = new Set(indexableRoutes());
  const items: FeedItem[] = [];
  for (const file of listResourceFiles()) {
    if (HUB_FILES.has(file) || path.basename(file) === "index.md") continue;
    const p = getPage(file);
    const url = (p.frontmatter.url || "").replace(/\/+$/, "");
    // only pages that are routed and indexable (drops noindex + unshipped briefs)
    if (!url.startsWith("/resources/") || !live.has(url)) continue;
    const d = DATE_INDEX[file];
    items.push({
      url,
      title: p.h1 || p.frontmatter.title,
      description: p.seo.description || p.lead || "",
      category: categoryFor(url),
      author: getAuthor(p.frontmatter.author)?.name ?? null,
      published: d ? new Date(d.published) : FALLBACK_DATE,
      updated: d ? new Date(d.updated) : FALLBACK_DATE,
    });
  }
  return items.sort((a, b) => b.published.getTime() - a.published.getTime());
});

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RSS 2.0 document for the newest FEED_LIMIT resources. */
export function renderRss(): string {
  const items = feedItems().slice(0, FEED_LIMIT);
  const lastBuild = items.reduce(
    (max, i) => (i.updated > max ? i.updated : max),
    items[0]?.published ?? FALLBACK_DATE,
  );
  const body = items
    .map((i) => {
      const link = `${SITE_URL}${i.url}`;
      return [
        "    <item>",
        `      <title>${esc(i.title)}</title>`,
        `      <link>${esc(link)}</link>`,
        `      <guid isPermaLink="true">${esc(link)}</guid>`,
        `      <pubDate>${i.published.toUTCString()}</pubDate>`,
        `      <category>${esc(i.category)}</category>`,
        ...(i.author ? [`      <dc:creator>${esc(i.author)}</dc:creator>`] : []),
        `      <description>${esc(i.description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${esc(FEED_TITLE)}</title>`,
    `    <link>${esc(`${SITE_URL}/resources`)}</link>`,
    `    <description>${esc(FEED_DESCRIPTION)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${esc(`${SITE_URL}${FEED_PATH}`)}" rel="self" type="application/rss+xml" />`,
    body,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
