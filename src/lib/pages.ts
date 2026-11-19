import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Metadata } from "next";
import { getAuthor } from "./authors";
import { cyclicNeighbors } from "./related";

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

  return { file, frontmatter, seo, h1, lead, heroCta, sections, faq };
}

export const getPage = cache((file: string): ParsedPage => {
  const raw = fs.readFileSync(path.join(CONTENT_ROOT, file), "utf8");
  return parse(raw, file);
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

/* hub → child source files, used to build card grids */
export const HUB_CHILDREN: Record<string, { href: string; file: string }[]> = {
  "areas-we-serve.md": [
    { href: "/areas-we-serve/palm-beach-gardens", file: "areas-we-serve/palm-beach-gardens.md" },
    { href: "/areas-we-serve/west-palm-beach", file: "areas-we-serve/west-palm-beach.md" },
    { href: "/areas-we-serve/jupiter", file: "areas-we-serve/jupiter.md" },
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
): { kicker: string; items: { href: string; title: string; description: string }[] } | null {
  for (const [hub, kicker] of Object.entries(RELATED_SIBLINGS)) {
    const siblings = (HUB_CHILDREN[hub] || []).filter((c) => !HUB_CHILDREN[c.file]);
    const idx = siblings.findIndex((c) => c.file === file);
    if (idx < 0) continue;
    const items = cyclicNeighbors(siblings, idx).map((c) => ({
      href: c.href,
      title: getPage(c.file).h1,
      description: cardBlurb(c.file),
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
