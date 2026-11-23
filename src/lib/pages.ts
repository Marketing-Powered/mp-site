import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Metadata } from "next";
import { getAuthor } from "./authors";
import { cyclicNeighbors } from "./related";
import { splitLongParagraph } from "./paragraphs";

/* ================================================================== */
/*  Content layer — parses the Marketing Powered page briefs in        */
/*  content/pages/**.md into structured, renderable data.              */
/*  Heuristics validated against all 29 source files.                  */
/* ================================================================== */

export type Node =
  | { type: "heading"; text: string; sub: boolean }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cta"; text: string; link: string };

export type ParsedPage = {
  file: string;
  frontmatter: Record<string, string>;
  seo: { title?: string; description?: string; h1?: string };
  h1: string;
  lead: string; // first paragraph after the H1
  heroCta: { text: string; link: string } | null;
  sections: { heading: string; sub: boolean; nodes: Node[] }[];
  faq: { q: string; a: string }[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "pages");

function isCallCta(text: string): boolean {
  return /book|call|consult|strategy|schedule/i.test(text);
}

function normalizeCtaText(text: string): string {
  if (isCallCta(text)) return "Request a Free Audit";
  return text;
}

function defaultCtaLink(text: string): string {
  if (/audit/i.test(text)) return "/get-started/request-an-audit";
  if (/contact|question/i.test(text)) return "/company/contact";
  if (isCallCta(text)) return "/get-started/request-an-audit";
  return "/get-started/request-an-audit";
}

function cleanCtaLink(link: string, text: string): string {
  const cleaned = link
    .trim()
    .replace(/^\[|\]$/g, "")
    .replace(/^\((.*)\)$/g, "$1")
    .trim();

  if (!cleaned) return defaultCtaLink(text);

  const pathOnly = cleaned.split("#")[0]?.replace(/\/+$/, "") || "";
  if (pathOnly === "/get-started/book-a-call") {
    return "/get-started/request-an-audit";
  }

  return cleaned;
}

function parse(raw: string, file: string): ParsedPage {
  // ---- frontmatter ----
  const frontmatter: Record<string, string> = {};
  let body = raw;
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fmMatch) {
    body = raw.slice(fmMatch[0].length);
    for (const line of fmMatch[1].split("\n")) {
      const m = line.match(/^(\w+):\s*(.*)$/);
      if (m) frontmatter[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }

  // ---- SEO metadata block ----
  const seo: ParsedPage["seo"] = {};
  const titleTag = body.match(/Title tag[^:]*:\s*(.+)/);
  const metaDesc = body.match(/Meta description[^:]*:\s*(.+)/);
  const h1Line = body.match(/\nH1:\s*(.+)/);
  if (titleTag) seo.title = titleTag[1].trim();
  if (metaDesc) seo.description = metaDesc[1].trim();
  if (h1Line) seo.h1 = h1Line[1].trim();

  // ---- isolate PAGE COPY ----
  const copyStart = body.indexOf("PAGE COPY");
  let copy = copyStart >= 0 ? body.slice(copyStart + "PAGE COPY".length) : body;
  let endIdx = copy.length;
  for (const e of ["SCHEMA RECOMMENDATION", "DELIVERY NOTES"]) {
    const i = copy.indexOf(e);
    if (i >= 0 && i < endIdx) endIdx = i;
  }
  copy = copy.slice(0, endIdx);

  // ---- split FAQ ----
  const faq: { q: string; a: string }[] = [];
  const faqIdx = copy.search(/\nFAQ\s*\n/);
  let mainCopy = copy;
  if (faqIdx >= 0) {
    const faqBlock = copy.slice(faqIdx);
    mainCopy = copy.slice(0, faqIdx);
    const qaRe = /Q:\s*([\s\S]*?)\nA:\s*([\s\S]*?)(?=\nQ:|\s*$)/g;
    let m: RegExpExecArray | null;
    while ((m = qaRe.exec(faqBlock))) {
      faq.push({
        q: m[1].trim().replace(/\s+/g, " "),
        a: m[2].trim().replace(/\s+/g, " "),
      });
    }
  }

  // ---- parse copy into flat nodes ----
  const lines = mainCopy.split("\n").map((l) => l.trim()).filter(Boolean);
  let h1 = seo.h1 || frontmatter.title || "";
  const nodes: Node[] = [];
  let listBuf: string[] | null = null;
  const flushList = () => {
    if (listBuf && listBuf.length) nodes.push({ type: "list", items: listBuf });
    listBuf = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0) {
      h1 = line;
      continue;
    }
    if (/^\[CTA\]/.test(line)) {
      flushList();
      const rest = line.replace(/^\[CTA\]\s*/, "");
      const parts = rest.split(/→|->/).map((s) => s.trim());
      const text = normalizeCtaText(parts[0] || "Request a Free Audit");
      nodes.push({
        type: "cta",
        text,
        link: cleanCtaLink(parts[1] || "", text),
      });
      continue;
    }
    if (/^[*-]\s+/.test(line)) {
      if (!listBuf) listBuf = [];
      listBuf.push(line.replace(/^[*-]\s+/, ""));
      continue;
    }
    // explicit "### " marker forces a sub-heading; the lowercase-initial
    // heuristic below can't catch Title Case sub-headings
    const explicitSub = line.match(/^###\s+(.+)$/);
    if (explicitSub) {
      flushList();
      nodes.push({ type: "heading", text: explicitSub[1].trim(), sub: true });
      continue;
    }
    flushList();
    const isHeading =
      line.length <= 78 &&
      line.split(/\s+/).length <= 12 &&
      !/[.:,;]$/.test(line) &&
      !/\]\(/.test(line);
    if (isHeading) {
      // lowercase-initial headings read as sub-headings within a section
      const sub = /^[a-z]/.test(line);
      nodes.push({ type: "heading", text: line, sub });
    } else {
      nodes.push({ type: "paragraph", text: line });
    }
  }
  flushList();

  // ---- fold flat nodes into hero + sections ----
  let lead = "";
  let heroCta: ParsedPage["heroCta"] = null;
  const sections: ParsedPage["sections"] = [];
  let idx = 0;
  // hero content = everything before the first top-level heading
  for (; idx < nodes.length; idx++) {
    const n = nodes[idx];
    if (n.type === "heading" && !n.sub) break;
    if (n.type === "paragraph" && !lead) lead = n.text;
    if (n.type === "cta" && !heroCta) heroCta = { text: n.text, link: n.link };
  }
  // remaining nodes grouped under their headings
  let current: ParsedPage["sections"][number] | null = null;
  for (; idx < nodes.length; idx++) {
    const n = nodes[idx];
    if (n.type === "heading" && !n.sub) {
      current = { heading: n.text, sub: n.sub, nodes: [] };
      sections.push(current);
    } else if (current) {
      current.nodes.push(n);
    } else {
      // safety: stray content before any heading
      current = { heading: "", sub: false, nodes: [n] };
      sections.push(current);
    }
  }

  // break long body paragraphs for phone screens (see lib/paragraphs.ts).
  // The hero lead is left whole: only the first hero paragraph renders, so
  // splitting it would drop the remainder.
  for (const sec of sections) {
    sec.nodes = sec.nodes.flatMap((n): Node[] =>
      n.type === "paragraph"
        ? splitLongParagraph(n.text).map((text) => ({ type: "paragraph" as const, text }))
        : [n],
    );
  }

  return { file, frontmatter, seo, h1, lead, heroCta, sections, faq };
}

export const getPage = cache((file: string): ParsedPage => {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  return parse(raw, file);
});

/** Served URL (no trailing slash) → page H1, for every content file.
    Feeds the HTML sitemap's link directory. */
export const titlesByUrl = cache((): Map<string, string> => {
  const out = new Map<string, string>();
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) {
        const p = getPage(path.relative(CONTENT_ROOT, full));
        const url = (p.frontmatter.url || "").replace(/\/+$/, "") || (p.frontmatter.url ? "/" : "");
        if (url && p.h1 && !out.has(url)) out.set(url, p.h1);
      }
    }
  };
  walk(CONTENT_ROOT);
  return out;
});

export function pageMetadata(file: string): Metadata {
  const p = getPage(file);
  const noindex =
    /noindex/i.test(p.frontmatter.primary_keyword || "") ||
    file.endsWith("thanks.md") ||
    file.endsWith("qualification.md");
  const title = p.seo.title || p.frontmatter.title || p.h1;
  const description = p.seo.description;
  // canonical must be the served (non-trailing-slash) URL, not a 308 redirect;
  // frontmatter urls are written with trailing slashes, so normalize here
  const url = p.frontmatter.url
    ? p.frontmatter.url.replace(/\/+$/, "") || "/"
    : undefined;
  const author = getAuthor(p.frontmatter.author);
  return {
    title,
    description,
    ...(author ? { authors: [{ name: author.name, url: author.href }] } : {}),
    ...(url ? { alternates: { canonical: url } } : {}),
    ...(noindex
      ? // noindex pages stay followable so they pass link equity (avoids
        // "nofollow page" flags and nofollow inlinks across the site)
        { robots: { index: false, follow: true } }
      : {
          openGraph: {
            type: "website",
            title,
            description,
            ...(url ? { url } : {}),
          },
        }),
  };
}

/* ---- site information architecture ----------------------------- */

export { NAV } from "./nav";

/* Short names for pages whose H1 is a full headline written for search
   ("A marketing agency Palm Beach Gardens businesses can evaluate"). Used
   wherever a page is named in passing rather than introduced: hub and
   sibling cards, and the last crumb of the breadcrumb trail. Pages not
   listed are named by their H1, as before. */
const SHORT_TITLES: Record<string, string> = {
  "areas-we-serve.md": "Areas We Serve",
  "areas-we-serve/palm-beach-gardens.md": "Palm Beach Gardens",
  "areas-we-serve/west-palm-beach.md": "West Palm Beach",
  "areas-we-serve/jupiter.md": "Jupiter",
};

/** The name to show for a page on a card or in a breadcrumb. */
export function shortTitle(file: string): string {
  return SHORT_TITLES[file] ?? getPage(file).h1;
}

/* hub → child source files, used to build card grids. `tag` is an optional
   label shown above the card title. */
export const HUB_CHILDREN: Record<string, { href: string; file: string; tag?: string }[]> = {
  /* The location directory. The tags carry the distinction the page copy
     insists on: Palm Beach Gardens is the office; the other two are areas
     served, not additional offices. */
  "areas-we-serve.md": [
    { href: "/areas-we-serve/palm-beach-gardens", file: "areas-we-serve/palm-beach-gardens.md", tag: "Our base" },
    { href: "/areas-we-serve/west-palm-beach", file: "areas-we-serve/west-palm-beach.md", tag: "Area served" },
    { href: "/areas-we-serve/jupiter", file: "areas-we-serve/jupiter.md", tag: "Area served" },
  ],
  "services/index.md": [
    { href: "/services/paid-media", file: "services/paid-media.md" },
    { href: "/services/meta-ads-management", file: "services/meta-ads-management.md" },
    { href: "/services/google-ads-management", file: "services/google-ads-management.md" },
    { href: "/services/landing-page-optimization", file: "services/landing-page-optimization.md" },
    { href: "/services/analytics-and-attribution", file: "services/analytics-and-attribution.md" },
    { href: "/services/call-tracking-and-intake-attribution", file: "services/call-tracking.md" },
    { href: "/services/conversion-rate-optimization", file: "services/conversion-rate-optimization.md" },
    { href: "/services/microsoft-ads-management", file: "services/microsoft-ads-management.md" },
    { href: "/services/youtube-ads", file: "services/youtube-ads.md" },
    { href: "/services/linkedin-ads", file: "services/linkedin-ads.md" },
    { href: "/services/intake-optimization", file: "services/intake-optimization.md" },
    { href: "/services/creative-testing", file: "services/creative-testing.md" },
    { href: "/services/ppc", file: "services/ppc/index.md" },
    { href: "/services/llm-advertising", file: "services/llm-advertising/index.md" },
    { href: "/services/web-development", file: "services/web-development/index.md" },
    { href: "/services/mental-health-seo", file: "services/mental-health-seo.md" },
    { href: "/services/healthcare-ppc", file: "services/healthcare-ppc.md" },
    { href: "/services/drug-rehab-seo", file: "services/drug-rehab-seo.md" },
    { href: "/services/rehab-ppc", file: "services/rehab-ppc.md" },
    { href: "/services/rehab-lead-generation", file: "services/rehab-lead-generation.md" },
    { href: "/services/healthcare-lead-generation", file: "services/healthcare-lead-generation.md" },
    { href: "/services/multi-location-healthcare-seo", file: "services/multi-location-healthcare-seo.md" },
    { href: "/services/healthcare-digital-marketing-services", file: "services/healthcare-digital-marketing-services.md" },
    { href: "/services/healthcare-local-seo", file: "services/healthcare-local-seo.md" },
    { href: "/services/patient-acquisition-marketing", file: "services/patient-acquisition-marketing.md" },
    { href: "/services/local-seo", file: "services/local-seo.md" },
    { href: "/services/addiction-treatment-website-design", file: "services/addiction-treatment-website-design.md" },
    { href: "/services/healthcare-conversion-rate-optimization", file: "services/healthcare-conversion-rate-optimization.md" },
    { href: "/services/mental-health-website-design", file: "services/mental-health-website-design.md" },
    { href: "/services/therapist-website-design", file: "services/therapist-website-design.md" },
    { href: "/services/therapist-seo", file: "services/therapist-seo.md" },
    { href: "/services/hospital-ppc", file: "services/hospital-ppc.md" },
    { href: "/services/hipaa-conscious-marketing-agency", file: "services/hipaa-conscious-marketing-agency.md" },
    { href: "/services/healthcare-marketing-automation", file: "services/healthcare-marketing-automation.md" },
    { href: "/services/psychiatrist-seo", file: "services/psychiatrist-seo.md" },
    { href: "/services/hospital-seo", file: "services/hospital-seo.md" },
    { href: "/services/performance-max-agency", file: "services/performance-max-agency.md" },
    { href: "/services/ai-marketing-agency", file: "services/ai-marketing-agency.md" },
    { href: "/services/landing-page-optimization-agency", file: "services/landing-page-optimization-agency.md" },
    { href: "/services/healthcare-ppc-services", file: "services/healthcare-ppc-services.md" },
    { href: "/services/conversion-rate-optimization-agency", file: "services/conversion-rate-optimization-agency.md" },
    { href: "/services/hospital-marketing-company", file: "services/hospital-marketing-company.md" },
    { href: "/services/generative-engine-optimization-agency", file: "services/generative-engine-optimization-agency.md" },
    { href: "/services/meta-ads-agency", file: "services/meta-ads-agency.md" },
    { href: "/services/google-review-cards", file: "services/google-review-cards.md" },
    { href: "/services/reputation-management-agency", file: "services/reputation-management-agency.md" },
    { href: "/services/multi-location-seo-services", file: "services/multi-location-seo-services.md" },
    { href: "/services/addiction-treatment-marketing-agency", file: "services/addiction-treatment-marketing-agency.md" },
    { href: "/services/call-tracking-services", file: "services/call-tracking-services.md" },
    { href: "/services/google-ads-agency", file: "services/google-ads-agency.md" },
    { href: "/services/hipaa-compliant-marketing-companies", file: "services/hipaa-compliant-marketing-companies.md" },
    { href: "/services/fractional-cmo-agency", file: "services/fractional-cmo-agency.md" },
    { href: "/services/healthcare-seo-company", file: "services/healthcare-seo-company.md" },
    { href: "/services/marketing-attribution-agency", file: "services/marketing-attribution-agency.md" },
    { href: "/services/healthcare-marketing-agency", file: "services/healthcare-marketing-agency.md" },
    { href: "/services/ai-seo-marketing-agency", file: "services/ai-seo-marketing-agency.md" },
    { href: "/services/ai-agents-for-marketing-agency", file: "services/ai-agents-for-marketing-agency.md" },
    { href: "/services/mental-health-marketing-agency", file: "services/mental-health-marketing-agency.md" },
    { href: "/services/private-ai-agency", file: "services/private-ai-agency.md" },
    { href: "/services/churn-analysis", file: "services/churn-analysis.md" },
    { href: "/services/managed-private-ai", file: "services/managed-private-ai.md" },
    { href: "/services/market-intelligence-agency", file: "services/market-intelligence-agency.md" },
    { href: "/services/ai-readiness-assessment", file: "services/ai-readiness-assessment.md" },
    { href: "/services/data-agency", file: "services/data-agency.md" },
    { href: "/services/peptide-legitscript-readiness", file: "services/peptide-legitscript-readiness.md" },
    { href: "/services/on-premise-ai-deployment", file: "services/on-premise-ai-deployment.md" },
    { href: "/services/rag-development", file: "services/rag-development.md" },
    { href: "/services/ai-data-preparation", file: "services/ai-data-preparation.md" },
    { href: "/services/data-engineering", file: "services/data-engineering.md" },
    { href: "/services/business-intelligence-consulting", file: "services/business-intelligence-consulting.md" },
    { href: "/services/customer-segmentation", file: "services/customer-segmentation.md" },
    { href: "/services/ideal-customer-profile-research", file: "services/ideal-customer-profile-research.md" },
    { href: "/services/voice-of-customer-research", file: "services/voice-of-customer-research.md" },
    { href: "/services/market-entry-research", file: "services/market-entry-research.md" },
    { href: "/services/location-market-analysis", file: "services/location-market-analysis.md" },
    { href: "/services/market-sizing-research", file: "services/market-sizing-research.md" },
    { href: "/services/win-loss-analysis", file: "services/win-loss-analysis.md" },
    { href: "/services/customer-data-integration", file: "services/customer-data-integration.md" },
    { href: "/services/enterprise-search-implementation", file: "services/enterprise-search-implementation.md" },
    { href: "/services/ai-model-migration", file: "services/ai-model-migration.md" },
    { href: "/services/private-ai-assistant", file: "services/private-ai-assistant.md" },
    { href: "/services/hybrid-ai-architecture", file: "services/hybrid-ai-architecture.md" },
    { href: "/services/sales-pipeline-analytics", file: "services/sales-pipeline-analytics.md" },
    { href: "/services/pricing-research", file: "services/pricing-research.md" },
    { href: "/services/competitive-positioning-research", file: "services/competitive-positioning-research.md" },
    { href: "/services/market-trend-monitoring", file: "services/market-trend-monitoring.md" },
    { href: "/services/channel-and-partner-research", file: "services/channel-and-partner-research.md" },
    { href: "/services/data-enrichment", file: "services/data-enrichment.md" },
    { href: "/services/data-warehouse-implementation", file: "services/data-warehouse-implementation.md" },
    { href: "/services/private-conversation-intelligence", file: "services/private-conversation-intelligence.md" },
    { href: "/services/market-intelligence-dashboards", file: "services/market-intelligence-dashboards.md" },
    { href: "/services/product-validation-research", file: "services/product-validation-research.md" },
    { href: "/services/ai-workflow-automation", file: "services/ai-workflow-automation.md" },
    { href: "/services/data-strategy-consulting", file: "services/data-strategy-consulting.md" },
    { href: "/services/competitive-intelligence", file: "services/competitive-intelligence.md" },
    { href: "/services/peptide-website-policy-remediation", file: "services/peptide-website-policy-remediation.md" },
    { href: "/services/peptide-ad-account-recovery", file: "services/peptide-ad-account-recovery.md" },
    { href: "/services/peptide-marketing-eligibility-audit", file: "services/peptide-marketing-eligibility-audit.md" },
    { href: "/services/peptide-ad-policy-monitoring", file: "services/peptide-ad-policy-monitoring.md" },
    { href: "/services/peptide-marketing-claims-review", file: "services/peptide-marketing-claims-review.md" },
    { href: "/services/peptide-paid-media", file: "services/peptide-paid-media.md" },
    { href: "/services/private-ai-peptide-marketing", file: "services/private-ai-peptide-marketing.md" },
    { href: "/services/peptide-website-design", file: "services/peptide-website-design.md" },
    { href: "/services/peptide-marketing-measurement", file: "services/peptide-marketing-measurement.md" },
    { href: "/services/peptide-merchant-center-remediation", file: "services/peptide-merchant-center-remediation.md" },
    { href: "/services/peptide-seo", file: "services/peptide-seo.md" },
    { href: "/services/peptide-conversion-optimization", file: "services/peptide-conversion-optimization.md" },
    { href: "/services/b2b-peptide-lead-generation", file: "services/b2b-peptide-lead-generation.md" },
    { href: "/services/peptide-reputation-management", file: "services/peptide-reputation-management.md" },
    { href: "/services/peptide-content-marketing", file: "services/peptide-content-marketing.md" },
    { href: "/services/peptide-competitive-intelligence", file: "services/peptide-competitive-intelligence.md" },
    { href: "/services/peptide-clinic-local-seo", file: "services/peptide-clinic-local-seo.md" },
    { href: "/services/intelligent-document-processing", file: "services/intelligent-document-processing.md" },
    { href: "/services/customer-lifetime-value-analysis", file: "services/customer-lifetime-value-analysis.md" },
  ],
  "services/ppc/index.md": [
    { href: "/services/ppc/introduction-to-ppc-campaign-management", file: "services/ppc/introduction-to-ppc-campaign-management.md" },
  ],
  "services/llm-advertising/index.md": [
    { href: "/services/llm-advertising/chatgpt", file: "services/llm-advertising/chatgpt.md" },
    { href: "/services/llm-advertising/ai-discovery-optimization", file: "services/llm-advertising/ai-discovery-optimization.md" },
  ],
  "services/web-development/index.md": [
    { href: "/services/web-development/website-design-and-build", file: "services/web-development/website-design.md" },
    { href: "/services/web-development/cro-development", file: "services/web-development/cro-development.md" },
    { href: "/services/web-development/technical-seo-and-performance", file: "services/web-development/technical-seo.md" },
    { href: "/services/web-development/landing-page-development", file: "services/web-development/landing-page-dev.md" },
    { href: "/services/web-development/integrations-and-tracking", file: "services/web-development/integrations.md" },
  ],
  "ai-edge/index.md": [
    { href: "/ai-edge/ai-in-paid-media", file: "ai-edge/ai-in-paid-media.md" },
    { href: "/ai-edge/owned-ai-systems", file: "ai-edge/owned-ai-systems.md" },
    { href: "/ai-edge/ai-governance", file: "ai-edge/ai-governance.md" },
    { href: "/ai-edge/data-sovereignty", file: "ai-edge/data-sovereignty.md" },
    { href: "/ai-edge/social-media", file: "ai-edge/social-media.md" },
    { href: "/ai-edge/customizable-ai", file: "ai-edge/customizable-ai.md" },
    { href: "/ai-edge/local-processing", file: "ai-edge/local-processing.md" },
    { href: "/ai-edge/open-source", file: "ai-edge/open-source.md" },
  ],
  "who-we-help/index.md": [
    { href: "/who-we-help/behavioral-health", file: "who-we-help/behavioral-health.md" },
    { href: "/who-we-help/mental-health", file: "who-we-help/mental-health.md" },
    { href: "/who-we-help/hospitals-and-health-systems", file: "who-we-help/hospitals-and-health-systems.md" },
    { href: "/who-we-help/peptide-telehealth-providers", file: "who-we-help/peptide-telehealth-providers.md" },
    { href: "/who-we-help/enterprise/private-ai", file: "who-we-help/enterprise/private-ai.md" },
    { href: "/who-we-help/small-business/market-intelligence", file: "who-we-help/small-business/market-intelligence.md" },
    { href: "/who-we-help/multi-location/data-and-market-intelligence", file: "who-we-help/multi-location/data-and-market-intelligence.md" },
    { href: "/who-we-help/peptide-businesses", file: "who-we-help/peptide-businesses.md" },
    { href: "/who-we-help/research-peptide-suppliers", file: "who-we-help/research-peptide-suppliers.md" },
    { href: "/who-we-help/peptide-clinics", file: "who-we-help/peptide-clinics.md" },
    { href: "/who-we-help/peptide-pharmacies", file: "who-we-help/peptide-pharmacies.md" },
    { href: "/who-we-help/peptide-skincare-brands", file: "who-we-help/peptide-skincare-brands.md" },
    { href: "/who-we-help/peptide-manufacturers", file: "who-we-help/peptide-manufacturers.md" },
  ],
  "who-we-help/behavioral-health.md": [
    { href: "/who-we-help/behavioral-health/residential-treatment", file: "who-we-help/behavioral-health/residential-treatment.md" },
    { href: "/who-we-help/behavioral-health/substance-use-disorder", file: "who-we-help/behavioral-health/substance-use-disorder.md" },
    { href: "/who-we-help/behavioral-health/adolescent-treatment", file: "who-we-help/behavioral-health/adolescent-treatment.md" },
    { href: "/who-we-help/behavioral-health/dual-diagnosis", file: "who-we-help/behavioral-health/dual-diagnosis.md" },
    { href: "/who-we-help/behavioral-health/detox-centers", file: "who-we-help/behavioral-health/detox-centers.md" },
    { href: "/who-we-help/behavioral-health/iop-php", file: "who-we-help/behavioral-health/iop-php.md" },
  ],
  "who-we-help/mental-health.md": [
    { href: "/who-we-help/mental-health/outpatient-clinics", file: "who-we-help/mental-health/outpatient-clinics.md" },
    { href: "/who-we-help/mental-health/therapy-groups", file: "who-we-help/mental-health/therapy-groups.md" },
    { href: "/who-we-help/mental-health/tele-mental-health", file: "who-we-help/mental-health/tele-mental-health.md" },
    { href: "/who-we-help/mental-health/psychiatric-practices", file: "who-we-help/mental-health/psychiatric-practices.md" },
    { href: "/who-we-help/mental-health/adolescent-mental-health", file: "who-we-help/mental-health/adolescent-mental-health.md" },
  ],
  "get-started/index.md": [
    { href: "/get-started/request-an-audit", file: "get-started/request-an-audit.md" },
    { href: "/get-started/book-a-call", file: "get-started/book-a-call.md" },
    { href: "/get-started/qualification", file: "get-started/qualification.md" },
  ],
  "resources/index.md": [
    { href: "/resources/guides", file: "resources/guides/index.md" },
    { href: "/resources/meta-ads", file: "resources/meta-ads.md" },
    { href: "/resources/google-ads", file: "resources/google-ads.md" },
    { href: "/resources/compliance-ad-policy", file: "resources/compliance-ad-policy.md" },
    { href: "/resources/llm-advertising", file: "resources/llm-advertising.md" },
    { href: "/resources/attribution-measurement", file: "resources/attribution-measurement.md" },
    { href: "/resources/mental-health-marketing", file: "resources/mental-health-marketing.md" },
    { href: "/resources/behavioral-health-marketing", file: "resources/behavioral-health-marketing.md" },
    { href: "/resources/paid-media", file: "resources/paid-media.md" },
    { href: "/resources/creative-conversion", file: "resources/creative-conversion.md" },
    { href: "/resources/ai-in-marketing", file: "resources/ai-in-marketing.md" },
    { href: "/resources/research", file: "resources/research.md" },
    { href: "/resources/healthcare-marketing-roi", file: "resources/healthcare-marketing-roi.md" },
    { href: "/resources/mental-health-advertising-guide", file: "resources/mental-health-advertising-guide.md" },
    { href: "/resources/location-page-seo-healthcare", file: "resources/location-page-seo-healthcare.md" },
    { href: "/resources/healthcare-ppc-advertising-guide", file: "resources/healthcare-ppc-advertising-guide.md" },
    { href: "/resources/mental-health-practice-marketing", file: "resources/mental-health-practice-marketing.md" },
    { href: "/resources/mental-health-google-ads", file: "resources/mental-health-google-ads.md" },
    { href: "/resources/addiction-treatment-content-marketing", file: "resources/addiction-treatment-content-marketing.md" },
    { href: "/resources/treatment-center-marketing-audit-checklist", file: "resources/treatment-center-marketing-audit-checklist.md" },
    { href: "/resources/rehab-ppc-vs-seo", file: "resources/rehab-ppc-vs-seo.md" },
    { href: "/resources/legitscript-certification-guide", file: "resources/legitscript-certification-guide.md" },
    { href: "/resources/rehab-advertising-guide", file: "resources/rehab-advertising-guide.md" },
    { href: "/resources/hospital-marketing-guide", file: "resources/hospital-marketing-guide.md" },
    { href: "/resources/hipaa-compliant-analytics", file: "resources/hipaa-compliant-analytics.md" },
    { href: "/resources/healthcare-marketing-compliance-checklist", file: "resources/healthcare-marketing-compliance-checklist.md" },
    { href: "/resources/multi-location-healthcare-reporting", file: "resources/multi-location-healthcare-reporting.md" },
    { href: "/resources/behavioral-health-marketing-strategies", file: "resources/behavioral-health-marketing-strategies.md" },
    { href: "/resources/in-house-vs-agency-behavioral-health", file: "resources/in-house-vs-agency-behavioral-health.md" },
    { href: "/resources/local-seo-for-rehab-centers", file: "resources/local-seo-for-rehab-centers.md" },
    { href: "/resources/treatment-center-marketing-guide", file: "resources/treatment-center-marketing-guide.md" },
    { href: "/resources/healthcare-marketing-analytics", file: "resources/healthcare-marketing-analytics.md" },
    { href: "/resources/hipaa-compliant-web-forms", file: "resources/hipaa-compliant-web-forms.md" },
    { href: "/resources/hipaa-compliant-marketing-automation", file: "resources/hipaa-compliant-marketing-automation.md" },
    { href: "/resources/google-ads-for-therapists", file: "resources/google-ads-for-therapists.md" },
    { href: "/resources/local-seo-for-therapists", file: "resources/local-seo-for-therapists.md" },
    { href: "/resources/multi-location-marketing-best-practices", file: "resources/multi-location-marketing-best-practices.md" },
    { href: "/resources/choose-healthcare-ppc-agency", file: "resources/choose-healthcare-ppc-agency.md" },
    { href: "/resources/rehab-marketing-budget", file: "resources/rehab-marketing-budget.md" },
    { href: "/resources/hipaa-compliant-call-tracking", file: "resources/hipaa-compliant-call-tracking.md" },
    { href: "/resources/is-google-analytics-hipaa-compliant", file: "resources/is-google-analytics-hipaa-compliant.md" },
    { href: "/resources/psychiatry-marketing", file: "resources/psychiatry-marketing.md" },
    { href: "/resources/hipaa-compliant-email-marketing", file: "resources/hipaa-compliant-email-marketing.md" },
    { href: "/resources/marketing-to-admissions-scorecard", file: "resources/marketing-to-admissions-scorecard.md" },
    { href: "/resources/healthcare-tracking-pixel-audit", file: "resources/healthcare-tracking-pixel-audit.md" },
    { href: "/resources/therapist-marketing-guide", file: "resources/therapist-marketing-guide.md" },
    { href: "/resources/hospital-marketing-ideas", file: "resources/hospital-marketing-ideas.md" },
    { href: "/resources/detox-center-seo", file: "resources/detox-center-seo.md" },
    { href: "/resources/residential-rehab-seo", file: "resources/residential-rehab-seo.md" },
    { href: "/resources/outpatient-rehab-seo", file: "resources/outpatient-rehab-seo.md" },
    { href: "/resources/hospital-service-line-marketing", file: "resources/hospital-service-line-marketing.md" },
    { href: "/resources/mental-health-content-marketing", file: "resources/mental-health-content-marketing.md" },
    { href: "/resources/measure-patient-acquisition-roi", file: "resources/measure-patient-acquisition-roi.md" },
    { href: "/resources/rehab-marketing-rfp", file: "resources/rehab-marketing-rfp.md" },
    { href: "/resources/healthcare-intake-marketing-data-dictionary", file: "resources/healthcare-intake-marketing-data-dictionary.md" },
    { href: "/resources/behavioral-health-intake-automation", file: "resources/behavioral-health-intake-automation.md" },
    { href: "/resources/healthcare-crm-marketing-integration", file: "resources/healthcare-crm-marketing-integration.md" },
    { href: "/resources/healthcare-campaign-management-systems", file: "resources/healthcare-campaign-management-systems.md" },
    { href: "/resources/choose-mental-health-marketing-agency", file: "resources/choose-mental-health-marketing-agency.md" },
    { href: "/resources/ai-search-healthcare-patient-acquisition", file: "resources/ai-search-healthcare-patient-acquisition.md" },
    { href: "/resources/cost-per-admission-rehab", file: "resources/cost-per-admission-rehab.md" },
    { href: "/resources/referral-and-digital-attribution-treatment-centers", file: "resources/referral-and-digital-attribution-treatment-centers.md" },
    { href: "/resources/42-cfr-part-2-marketing-data", file: "resources/42-cfr-part-2-marketing-data.md" },
    { href: "/resources/hospital-marketing-agency-rfp", file: "resources/hospital-marketing-agency-rfp.md" },
    { href: "/resources/healthcare-marketing-budget-by-location", file: "resources/healthcare-marketing-budget-by-location.md" },
    { href: "/resources/google-maps-vs-website-rankings", file: "resources/google-maps-vs-website-rankings.md" },
    { href: "/resources/city-pages-for-service-businesses", file: "resources/city-pages-for-service-businesses.md" },
    { href: "/resources/local-seo-call-tracking", file: "resources/local-seo-call-tracking.md" },
    { href: "/resources/palm-beach-county-local-visibility-audit", file: "resources/palm-beach-county-local-visibility-audit.md" },
    { href: "/resources/ai-marketing", file: "resources/ai-marketing.md" },
    { href: "/resources/healthcare-ppc", file: "resources/healthcare-ppc.md" },
    { href: "/resources/marketing-attribution", file: "resources/marketing-attribution.md" },
    { href: "/resources/multi-location-seo", file: "resources/multi-location-seo.md" },
    { href: "/resources/healthcare-marketing", file: "resources/healthcare-marketing.md" },
    { href: "/resources/conversion-rate-optimization", file: "resources/conversion-rate-optimization.md" },
    { href: "/resources/hipaa-compliant-marketing", file: "resources/hipaa-compliant-marketing.md" },
    { href: "/resources/google-ads-explained", file: "resources/google-ads-explained.md" },
    { href: "/resources/multi-location-marketing-strategy", file: "resources/multi-location-marketing-strategy.md" },
    { href: "/resources/local-llm", file: "resources/local-llm.md" },
    { href: "/resources/marketing-economics", file: "resources/marketing-economics.md" },
    { href: "/resources/meta-pixel-hipaa", file: "resources/meta-pixel-hipaa.md" },
    { href: "/resources/chatgpt-for-marketing", file: "resources/chatgpt-for-marketing.md" },
    { href: "/resources/intake-automation", file: "resources/intake-automation.md" },
    { href: "/resources/google-ads-best-practices", file: "resources/google-ads-best-practices.md" },
    { href: "/resources/facebook-ads-for-healthcare", file: "resources/facebook-ads-for-healthcare.md" },
    { href: "/resources/ai-marketing-ideas", file: "resources/ai-marketing-ideas.md" },
    { href: "/resources/ai-ownership", file: "resources/ai-ownership.md" },
    { href: "/resources/how-to-get-more-google-reviews", file: "resources/how-to-get-more-google-reviews.md" },
    { href: "/resources/what-is-healthcare-marketing", file: "resources/what-is-healthcare-marketing.md" },
    { href: "/resources/performance-max", file: "resources/performance-max.md" },
    { href: "/resources/patient-acquisition", file: "resources/patient-acquisition.md" },
    { href: "/resources/hipaa-marketing-authorization", file: "resources/hipaa-marketing-authorization.md" },
    { href: "/resources/what-is-hipaa-marketing", file: "resources/what-is-hipaa-marketing.md" },
    { href: "/resources/healthcare-seo", file: "resources/healthcare-seo.md" },
    { href: "/resources/local-seo-for-doctors", file: "resources/local-seo-for-doctors.md" },
    { href: "/resources/customer-acquisition-cost", file: "resources/customer-acquisition-cost.md" },
    { href: "/resources/hipaa-compliant-website-examples", file: "resources/hipaa-compliant-website-examples.md" },
    { href: "/resources/cost-per-lead", file: "resources/cost-per-lead.md" },
    { href: "/resources/privacy-first-marketing", file: "resources/privacy-first-marketing.md" },
    { href: "/resources/landing-page-optimization", file: "resources/landing-page-optimization.md" },
    { href: "/resources/google-ads-for-rehab", file: "resources/google-ads-for-rehab.md" },
    { href: "/resources/offline-conversion-tracking", file: "resources/offline-conversion-tracking.md" },
    { href: "/resources/lead-tracking", file: "resources/lead-tracking.md" },
    { href: "/resources/local-seo-best-practices", file: "resources/local-seo-best-practices.md" },
    { href: "/resources/reputation-management-for-doctors", file: "resources/reputation-management-for-doctors.md" },
    { href: "/resources/what-is-ai-marketing", file: "resources/what-is-ai-marketing.md" },
    { href: "/resources/answer-engine-optimization", file: "resources/answer-engine-optimization.md" },
    { href: "/resources/marketing-measurement", file: "resources/marketing-measurement.md" },
    { href: "/resources/hipaa-compliant-website", file: "resources/hipaa-compliant-website.md" },
    { href: "/resources/medical-practice-marketing", file: "resources/medical-practice-marketing.md" },
    { href: "/resources/ai-for-healthcare-marketing", file: "resources/ai-for-healthcare-marketing.md" },
    { href: "/resources/generative-engine-optimization", file: "resources/generative-engine-optimization.md" },
    { href: "/resources/google-ads-for-healthcare", file: "resources/google-ads-for-healthcare.md" },
    { href: "/resources/ppc-lead-quality", file: "resources/ppc-lead-quality.md" },
    { href: "/resources/ai-agents-for-marketing", file: "resources/ai-agents-for-marketing.md" },
    { href: "/resources/what-is-conversion-rate-optimization", file: "resources/what-is-conversion-rate-optimization.md" },
    { href: "/resources/healthcare-advertising", file: "resources/healthcare-advertising.md" },
    { href: "/resources/service-line-marketing", file: "resources/service-line-marketing.md" },
    { href: "/resources/addiction-treatment-seo", file: "resources/addiction-treatment-seo.md" },
    { href: "/resources/multi-touch-attribution", file: "resources/multi-touch-attribution.md" },
    { href: "/resources/hipaa-compliant-ai", file: "resources/hipaa-compliant-ai.md" },
    { href: "/resources/lead-quality", file: "resources/lead-quality.md" },
    { href: "/resources/admissions-marketing", file: "resources/admissions-marketing.md" },
    { href: "/resources/how-does-call-tracking-work", file: "resources/how-does-call-tracking-work.md" },
    { href: "/resources/what-is-local-seo", file: "resources/what-is-local-seo.md" },
    { href: "/resources/speed-to-lead", file: "resources/speed-to-lead.md" },
    { href: "/resources/google-business-profile-optimization", file: "resources/google-business-profile-optimization.md" },
    { href: "/resources/hospital-marketing", file: "resources/hospital-marketing.md" },
    { href: "/resources/what-is-behavioral-health-marketing", file: "resources/what-is-behavioral-health-marketing.md" },
    { href: "/resources/cost-per-admission", file: "resources/cost-per-admission.md" },
    { href: "/resources/call-tracking", file: "resources/call-tracking.md" },
    { href: "/resources/legitscript-certification", file: "resources/legitscript-certification.md" },
    { href: "/resources/server-side-tracking", file: "resources/server-side-tracking.md" },
    { href: "/resources/marketing-dashboard", file: "resources/marketing-dashboard.md" },
    { href: "/resources/marketing-attribution-tools", file: "resources/marketing-attribution-tools.md" },
    { href: "/resources/legitscript-certification-cost", file: "resources/legitscript-certification-cost.md" },
    { href: "/resources/physician-referral-marketing", file: "resources/physician-referral-marketing.md" },
    { href: "/resources/healthcare-content-marketing", file: "resources/healthcare-content-marketing.md" },
    { href: "/resources/healthcare-marketing-benchmarks", file: "resources/healthcare-marketing-benchmarks.md" },
    { href: "/resources/hipaa-compliant-crm", file: "resources/hipaa-compliant-crm.md" },
    { href: "/resources/mental-health-marketing-campaigns", file: "resources/mental-health-marketing-campaigns.md" },
    { href: "/resources/marketing-budget", file: "resources/marketing-budget.md" },
    { href: "/resources/best-conversion-rate-optimization-tools", file: "resources/best-conversion-rate-optimization-tools.md" },
    { href: "/resources/meta-ads-cost", file: "resources/meta-ads-cost.md" },
    { href: "/resources/ai-infrastructure", file: "resources/ai-infrastructure.md" },
    { href: "/resources/data-sovereignty", file: "resources/data-sovereignty.md" },
    { href: "/resources/local-seo-cost", file: "resources/local-seo-cost.md" },
    { href: "/resources/reputation-management-software", file: "resources/reputation-management-software.md" },
    { href: "/resources/ppc-management", file: "resources/ppc-management.md" },
    { href: "/resources/healthcare-marketing-platform", file: "resources/healthcare-marketing-platform.md" },
    { href: "/resources/drug-rehab-leads", file: "resources/drug-rehab-leads.md" },
    { href: "/resources/consent-mode", file: "resources/consent-mode.md" },
    { href: "/resources/google-ads-cost", file: "resources/google-ads-cost.md" },
    { href: "/resources/ai-seo-tools", file: "resources/ai-seo-tools.md" },
    { href: "/resources/cookieless-tracking", file: "resources/cookieless-tracking.md" },
    { href: "/resources/fractional-cmo", file: "resources/fractional-cmo.md" },
    { href: "/resources/ai-seo-pricing", file: "resources/ai-seo-pricing.md" },
    { href: "/resources/ai-marketing-tools", file: "resources/ai-marketing-tools.md" },
    { href: "/resources/facebook-ads-for-dentists", file: "resources/facebook-ads-for-dentists.md" },
    { href: "/resources/google-ads-vs-lsa", file: "resources/google-ads-vs-lsa.md" },
    { href: "/resources/senior-living-marketing", file: "resources/senior-living-marketing.md" },
    { href: "/resources/dental-marketing", file: "resources/dental-marketing.md" },
    { href: "/resources/urgent-care-marketing", file: "resources/urgent-care-marketing.md" },
    { href: "/resources/franchise-seo", file: "resources/franchise-seo.md" },
    { href: "/resources/local-seo-for-dentists", file: "resources/local-seo-for-dentists.md" },
    { href: "/resources/hipaa-compliant-texting", file: "resources/hipaa-compliant-texting.md" },
    { href: "/resources/law-firm-marketing", file: "resources/law-firm-marketing.md" },
    { href: "/resources/customer-acquisition-cost-by-industry", file: "resources/customer-acquisition-cost-by-industry.md" },
    { href: "/resources/in-house-vs-agency-marketing", file: "resources/in-house-vs-agency-marketing.md" },
    { href: "/resources/landing-page-vs-website", file: "resources/landing-page-vs-website.md" },
    { href: "/resources/generative-engine-optimization-vs-seo", file: "resources/generative-engine-optimization-vs-seo.md" },
    { href: "/resources/local-seo-vs-google-ads", file: "resources/local-seo-vs-google-ads.md" },
    { href: "/resources/local-seo-for-law-firms", file: "resources/local-seo-for-law-firms.md" },
    { href: "/resources/marketing-attribution-in-salesforce", file: "resources/marketing-attribution-in-salesforce.md" },
    { href: "/resources/telehealth-marketing", file: "resources/telehealth-marketing.md" },
    { href: "/resources/behavioral-health-vs-mental-health", file: "resources/behavioral-health-vs-mental-health.md" },
    { href: "/resources/addiction-treatment-marketing", file: "resources/addiction-treatment-marketing.md" },
    { href: "/resources/conversion-rate-optimization-examples", file: "resources/conversion-rate-optimization-examples.md" },
    { href: "/resources/google-ads-dashboard", file: "resources/google-ads-dashboard.md" },
    { href: "/resources/google-ads-audit", file: "resources/google-ads-audit.md" },
    { href: "/resources/first-party-data-vs-third-party-data", file: "resources/first-party-data-vs-third-party-data.md" },
    { href: "/resources/first-party-data-strategy", file: "resources/first-party-data-strategy.md" },
    { href: "/resources/rag-vs-fine-tuning", file: "resources/rag-vs-fine-tuning.md" },
    { href: "/resources/private-ai-vs-public-ai", file: "resources/private-ai-vs-public-ai.md" },
    { href: "/resources/private-ai-vendor-evaluation-checklist", file: "resources/private-ai-vendor-evaluation-checklist.md" },
    { href: "/resources/market-intelligence-vs-market-research", file: "resources/market-intelligence-vs-market-research.md" },
    { href: "/resources/data-agency-vs-bi-consultant", file: "resources/data-agency-vs-bi-consultant.md" },
    { href: "/resources/ai-knowledge-base-permissions", file: "resources/ai-knowledge-base-permissions.md" },
    { href: "/resources/ai-data-readiness-checklist", file: "resources/ai-data-readiness-checklist.md" },
    { href: "/resources/competitive-intelligence-research-methods", file: "resources/competitive-intelligence-research-methods.md" },
    { href: "/resources/market-sizing-tam-sam-som", file: "resources/market-sizing-tam-sam-som.md" },
    { href: "/resources/ai-proof-of-concept-success-criteria", file: "resources/ai-proof-of-concept-success-criteria.md" },
    { href: "/resources/market-intelligence-cost", file: "resources/market-intelligence-cost.md" },
    { href: "/resources/research-use-only-peptide-marketing", file: "resources/research-use-only-peptide-marketing.md" },
    { href: "/resources/peptide-advertising-eligibility", file: "resources/peptide-advertising-eligibility.md" },
    { href: "/resources/google-ads-peptide-drug-terms", file: "resources/google-ads-peptide-drug-terms.md" },
    { href: "/resources/peptide-marketing-agency-rfp", file: "resources/peptide-marketing-agency-rfp.md" },
    { href: "/resources/peptide-advertiser-identity-verification", file: "resources/peptide-advertiser-identity-verification.md" },
    { href: "/resources/peptide-market-research-methodology", file: "resources/peptide-market-research-methodology.md" },
    { href: "/resources/local-service-ads", file: "resources/local-service-ads.md" },
    { href: "/resources/hhs-peptide-compounding-policy-marketing", file: "resources/hhs-peptide-compounding-policy-marketing.md" },
    { href: "/resources/peptide-advertising-circumventing-systems", file: "resources/peptide-advertising-circumventing-systems.md" },
    { href: "/resources/meta-health-event-restrictions-peptide-marketing", file: "resources/meta-health-event-restrictions-peptide-marketing.md" },
    { href: "/resources/peptide-ad-suspension-diagnosis", file: "resources/peptide-ad-suspension-diagnosis.md" },
    { href: "/resources/peptide-ad-appeal-evidence-packet", file: "resources/peptide-ad-appeal-evidence-packet.md" },
    { href: "/resources/peptide-fda-approval-registration-certification", file: "resources/peptide-fda-approval-registration-certification.md" },
    { href: "/resources/peptide-website-security-ad-recovery", file: "resources/peptide-website-security-ad-recovery.md" },
    { href: "/resources/peptide-reviews-testimonials-marketing", file: "resources/peptide-reviews-testimonials-marketing.md" },
    { href: "/resources/peptide-marketing-geographic-eligibility", file: "resources/peptide-marketing-geographic-eligibility.md" },
    { href: "/resources/peptide-advertising-policy-monitoring", file: "resources/peptide-advertising-policy-monitoring.md" },
    { href: "/resources/peptide-marketing-crm-data-governance", file: "resources/peptide-marketing-crm-data-governance.md" },
    { href: "/resources/peptide-marketing-plan-budget", file: "resources/peptide-marketing-plan-budget.md" },
    { href: "/resources/peptide-content-clinical-review", file: "resources/peptide-content-clinical-review.md" },
    { href: "/resources/peptide-marketing-ad-suspension-continuity", file: "resources/peptide-marketing-ad-suspension-continuity.md" },
    { href: "/resources/peptide-claims-knowledge-base", file: "resources/peptide-claims-knowledge-base.md" },
    { href: "/resources/peptide-influencer-affiliate-marketing", file: "resources/peptide-influencer-affiliate-marketing.md" },
    { href: "/resources/peptide-supplement-cosmetic-claims", file: "resources/peptide-supplement-cosmetic-claims.md" },
    { href: "/resources/research-peptide-catalog-architecture", file: "resources/research-peptide-catalog-architecture.md" },
    { href: "/resources/peptide-marketing-in-house-vs-agency", file: "resources/peptide-marketing-in-house-vs-agency.md" },
    { href: "/resources/market-intelligence-brief-template", file: "resources/market-intelligence-brief-template.md" },
    { href: "/resources/peptide-email-marketing", file: "resources/peptide-email-marketing.md" },
  ],
  "legal/index.md": [
    { href: "/legal/terms", file: "legal/terms.md" },
    { href: "/legal/privacy-policy", file: "legal/privacy-policy.md" },
    { href: "/legal/cookie-policy", file: "legal/cookie-policy.md" },
    { href: "/legal/advertising-disclaimer", file: "legal/advertising-disclaimer.md" },
    { href: "/legal/hipaa-phi-disclaimer", file: "legal/hipaa-phi-disclaimer.md" },
  ],
  "company/index.md": [
    { href: "/company/contact", file: "company/contact.md" },
    { href: "/company/ai-systems-policy", file: "company/ai-systems-policy.md" },
    { href: "/company/data-sovereignty", file: "company/data-sovereignty.md" },
    { href: "/company/security", file: "company/security.md" },
  ],
  "research/index.md": [
    { href: "/research/studies", file: "research/studies/index.md" },
    { href: "/research/peptide-advertising-restrictions-evidence-review", file: "research/peptide-advertising-restrictions-evidence-review.md" },
  ],
  "research/studies/index.md": [
    { href: "/research/studies/annual-paid-media-and-ai-trends", file: "research/studies/annual-paid-media-and-ai-trends.md" },
    { href: "/research/studies/attribution-reality-check", file: "research/studies/attribution-reality-check.md" },
    { href: "/research/studies/meta-ads-benchmarks", file: "research/studies/meta-ads-benchmarks.md" },
    { href: "/research/studies/llm-advertising-early-signals", file: "research/studies/llm-advertising-early-signals.md" },
  ],
  "media/index.md": [
    { href: "/media/newsroom", file: "media/newsroom.md" },
    { href: "/media/email-marketing", file: "media/email-marketing.md" },
    { href: "/media/pitch-guidelines", file: "media/pitch-guidelines.md" },
    { href: "/media/podcast-appearances", file: "media/podcast-appearances.md" },
    { href: "/media/press", file: "media/press.md" },
    { href: "/media/media-kit", file: "media/media-kit.md" },
    { href: "/media/brand-assets", file: "media/brand-assets.md" },
    { href: "/media/guest-contributions", file: "media/guest-contributions.md" },
    { href: "/media/syndication", file: "media/syndication.md" },
    { href: "/media/editorial-topics", file: "media/editorial-topics.md" },
  ],
  "resources/guides/index.md": [
    { href: "/resources/guides/creative-testing-system-for-meta-ads", file: "resources/guides/creative-testing-system-for-meta-ads.md" },
    { href: "/resources/guides/google-ads-compliance-for-mental-and-behavioral-health", file: "resources/guides/google-ads-compliance-for-mental-and-behavioral-health.md" },
    { href: "/resources/guides/meta-ads-for-mental-health-practices", file: "resources/guides/meta-ads-for-mental-health-practices.md" },
    { href: "/resources/guides/behavioral-health-paid-media-playbook", file: "resources/guides/behavioral-health-paid-media-playbook.md" },
    { href: "/resources/guides/ai-discovery-optimization-what-replaces-traditional-seo", file: "resources/guides/ai-discovery-optimization-what-replaces-traditional-seo.md" },
    { href: "/resources/guides/mental-health-paid-media-playbook", file: "resources/guides/mental-health-paid-media-playbook.md" },
    { href: "/resources/guides/intake-attribution-and-call-quality-framework", file: "resources/guides/intake-attribution-and-call-quality-framework.md" },
    { href: "/resources/guides/meta-ads-for-treatment-centers", file: "resources/guides/meta-ads-for-treatment-centers.md" },
    { href: "/resources/guides/microsoft-ads-behavioral-health", file: "resources/guides/microsoft-ads-behavioral-health.md" },
    { href: "/resources/guides/brand-citation-share-ai-metric", file: "resources/guides/brand-citation-share-ai-metric.md" },
    { href: "/resources/guides/90-day-agency-onboarding-playbook", file: "resources/guides/90-day-agency-onboarding-playbook.md" },
    { href: "/resources/guides/landing-page-optimization-paid-media", file: "resources/guides/landing-page-optimization-paid-media.md" },
    { href: "/resources/guides/meta-ads-creative-behavioral-health", file: "resources/guides/meta-ads-creative-behavioral-health.md" },
    { href: "/resources/guides/intake-call-quality-scoring-framework", file: "resources/guides/intake-call-quality-scoring-framework.md" },
    { href: "/resources/guides/marketing-mix-modeling-modern-attribution", file: "resources/guides/marketing-mix-modeling-modern-attribution.md" },
    { href: "/resources/guides/llm-seo-vs-traditional-seo-behavioral-health", file: "resources/guides/llm-seo-vs-traditional-seo-behavioral-health.md" },
    { href: "/resources/guides/intake-handoff-marketing-roi", file: "resources/guides/intake-handoff-marketing-roi.md" },
    { href: "/resources/guides/private-equity-rollup-threat-treatment-centers", file: "resources/guides/private-equity-rollup-threat-treatment-centers.md" },
    { href: "/resources/guides/multimodal-ai-search-discovery", file: "resources/guides/multimodal-ai-search-discovery.md" },
    { href: "/resources/guides/marketing-attribution-models-b2b", file: "resources/guides/marketing-attribution-models-b2b.md" },
    { href: "/resources/guides/why-treatment-center-ceos-fire-marketing-agencies", file: "resources/guides/why-treatment-center-ceos-fire-marketing-agencies.md" },
    { href: "/resources/guides/evaluating-ai-marketing-capabilities", file: "resources/guides/evaluating-ai-marketing-capabilities.md" },
    { href: "/resources/guides/cro-six-tests-lead-generation", file: "resources/guides/cro-six-tests-lead-generation.md" },
    { href: "/resources/guides/google-ads-quality-score-optimization", file: "resources/guides/google-ads-quality-score-optimization.md" },
    { href: "/resources/guides/building-ai-native-marketing-function", file: "resources/guides/building-ai-native-marketing-function.md" },
    { href: "/resources/guides/ai-visibility-seo-visibility-complementary", file: "resources/guides/ai-visibility-seo-visibility-complementary.md" },
    { href: "/resources/guides/server-side-tracking-modern-setup", file: "resources/guides/server-side-tracking-modern-setup.md" },
    { href: "/resources/guides/generative-engine-optimization-content", file: "resources/guides/generative-engine-optimization-content.md" },
    { href: "/resources/guides/future-ai-search-2026-2027", file: "resources/guides/future-ai-search-2026-2027.md" },
    { href: "/resources/guides/hipaa-digital-marketing-risk", file: "resources/guides/hipaa-digital-marketing-risk.md" },
    { href: "/resources/guides/google-ads-match-types-2026-strategy", file: "resources/guides/google-ads-match-types-2026-strategy.md" },
    { href: "/resources/guides/phone-call-attribution-treatment-centers", file: "resources/guides/phone-call-attribution-treatment-centers.md" },
    { href: "/resources/guides/mental-health-marketing-playbook", file: "resources/guides/mental-health-marketing-playbook.md" },
  ],
};

/* Hubs whose child pages cross-link their siblings, with the label shown
   above the related cards. Without this, a child page's only incoming
   internal link is its hub's card grid. Child entries that are themselves
   hubs (e.g. /services/ppc) are skipped: they render their own card grid. */
const RELATED_SIBLINGS: Record<string, string> = {
  "areas-we-serve.md": "Other Areas We Serve",
  "resources/guides/index.md": "More Guides",
  "resources/index.md": "More Resource Topics",
  "research/studies/index.md": "More Studies",
  "media/index.md": "More From Media",
  "services/index.md": "More Services",
  "services/llm-advertising/index.md": "More LLM Advertising",
  "services/web-development/index.md": "More Web Development",
  "who-we-help/behavioral-health.md": "More Behavioral Health Programs",
  "who-we-help/mental-health.md": "More Mental Health Practices",
  "company/index.md": "More From the Company",
};

/** Sibling cards for a child page: its next three siblings under the same
    hub (cyclic), so each child gets three sibling links plus its hub's. */
export function relatedSiblings(
  file: string,
): {
  kicker: string;
  items: { href: string; title: string; description: string; tag?: string }[];
} | null {
  for (const [hub, kicker] of Object.entries(RELATED_SIBLINGS)) {
    const siblings = (HUB_CHILDREN[hub] || []).filter((c) => !HUB_CHILDREN[c.file]);
    const idx = siblings.findIndex((c) => c.file === file);
    if (idx < 0) continue;
    const items = cyclicNeighbors(siblings, idx).map((c) => ({
      href: c.href,
      title: shortTitle(c.file),
      description: cardBlurb(c.file),
      tag: c.tag,
    }));
    return { kicker, items };
  }
  return null;
}

/** short blurb for hub cards: first sentence of a child page's lead */
export function cardBlurb(file: string): string {
  const lead = getPage(file).lead || "";
  const firstSentence = lead.split(/(?<=[.!?])\s/)[0] || lead;
  if (firstSentence.length <= 160) return firstSentence;
  // truncate at a word boundary so the ellipsis never cuts a word in half
  const cut = lead.slice(0, 157);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:]$/, "").trimEnd() + "…";
}
