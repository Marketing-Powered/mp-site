/* Client-safe internal-link resolver (no server/fs imports).
   The source content briefs link to several pages that were not part of
   the 29-page build (sub-verticals, a results/resources section, etc.).
   We remap those to the closest page that exists, and drop links with no
   sensible target so the site never renders a dead internal link. */

const VALID = new Set<string>([
  "/",
  "/services",
  "/services/paid-media",
  "/services/meta-ads-management",
  "/services/google-ads-management",
  "/services/landing-page-optimization",
  "/services/analytics-and-attribution",
  "/services/call-tracking-and-intake-attribution",
  "/services/conversion-rate-optimization",
  "/services/microsoft-ads-management",
  "/services/youtube-ads",
  "/services/linkedin-ads",
  "/services/intake-optimization",
  "/services/creative-testing",
  "/services/ppc",
  "/services/ppc/introduction-to-ppc-campaign-management",
  "/services/llm-advertising",
  "/services/llm-advertising/chatgpt",
  "/services/llm-advertising/ai-discovery-optimization",
  "/services/web-development",
  "/services/web-development/website-design-and-build",
  "/services/web-development/cro-development",
  "/services/web-development/technical-seo-and-performance",
  "/services/web-development/landing-page-development",
  "/services/web-development/integrations-and-tracking",
  "/ai-edge",
  "/ai-edge/ai-in-paid-media",
  "/ai-edge/owned-ai-systems",
  "/ai-edge/ai-governance",
  "/ai-edge/data-sovereignty",
  "/ai-edge/social-media",
  "/who-we-help",
  "/who-we-help/behavioral-health",
  "/who-we-help/behavioral-health/residential-treatment",
  "/who-we-help/behavioral-health/substance-use-disorder",
  "/who-we-help/behavioral-health/adolescent-treatment",
  "/who-we-help/behavioral-health/dual-diagnosis",
  "/who-we-help/behavioral-health/detox-centers",
  "/who-we-help/behavioral-health/iop-php",
  "/who-we-help/mental-health",
  "/who-we-help/mental-health/outpatient-clinics",
  "/who-we-help/mental-health/therapy-groups",
  "/who-we-help/mental-health/tele-mental-health",
  "/who-we-help/mental-health/psychiatric-practices",
  "/who-we-help/mental-health/adolescent-mental-health",
  "/tools",
  "/tools/cpa-benchmark-calculator",
  "/tools/llm-visibility-check",
  "/tools/paid-media-readiness-assessment",
  "/tools/attribution-tracking-audit",
  "/tools/meta-ads-readiness-score",
  "/tools/intake-funnel-health-check",
  "/problems/reduce-cpa",
  "/problems/fix-attribution",
  "/problems/scale-multi-location-campaigns",
  "/problems/fix-lead-quality",
  "/problems/increase-qualified-calls",
  "/results/case-studies",
  "/research",
  "/research/studies",
  "/research/studies/annual-paid-media-and-ai-trends",
  "/research/studies/attribution-reality-check",
  "/research/studies/meta-ads-benchmarks",
  "/research/studies/llm-advertising-early-signals",
  "/media",
  "/media/newsroom",
  "/media/email-marketing",
  "/media/pitch-guidelines",
  "/media/podcast-appearances",
  "/media/press",
  "/media/media-kit",
  "/media/brand-assets",
  "/media/guest-contributions",
  "/media/syndication",
  "/media/editorial-topics",
  "/resources",
  "/resources/meta-ads",
  "/resources/google-ads",
  "/resources/compliance-ad-policy",
  "/resources/llm-advertising",
  "/resources/attribution-measurement",
  "/resources/mental-health-marketing",
  "/resources/behavioral-health-marketing",
  "/resources/paid-media",
  "/resources/creative-conversion",
  "/resources/ai-in-marketing",
  "/resources/research",
  "/resources/guides",
  "/resources/guides/creative-testing-system-for-meta-ads",
  "/resources/guides/google-ads-compliance-for-mental-and-behavioral-health",
  "/resources/guides/meta-ads-for-mental-health-practices",
  "/resources/guides/behavioral-health-paid-media-playbook",
  "/resources/guides/ai-discovery-optimization-what-replaces-traditional-seo",
  "/resources/guides/mental-health-paid-media-playbook",
  "/resources/guides/intake-attribution-and-call-quality-framework",
  "/resources/guides/meta-ads-for-treatment-centers",
  "/legal",
  "/legal/privacy-policy",
  "/legal/terms",
  "/legal/cookie-policy",
  "/legal/advertising-disclaimer",
  "/legal/hipaa-phi-disclaimer",
  "/get-started",
  "/get-started/qualification",
  "/get-started/request-an-audit",
  "/get-started/book-a-call",
  "/get-started/thanks",
  "/company",
  "/company/about",
  "/company/contact",
  "/company/ai-systems-policy",
  "/company/data-sovereignty",
  "/company/security",
  "/accessibility",
  // migrated legacy pages (organic-traffic SEO pages preserved at original slugs)
  "/top-10-open-source-ai-models-of-2025",
  "/sitemap",
  "/search",
]);

const REMAP: Record<string, string> = {
  // sub-verticals that don't have their own page yet → closest live page
  "/who-we-help/behavioral-health/inpatient": "/who-we-help/behavioral-health/residential-treatment",
  "/who-we-help/behavioral-health/outpatient": "/who-we-help/behavioral-health",
  "/who-we-help/behavioral-health/sober-living": "/who-we-help/behavioral-health",
  "/who-we-help/mental-health/trauma-ptsd": "/who-we-help/mental-health",
  "/who-we-help/mental-health/anxiety-depression": "/who-we-help/mental-health",
  "/who-we-help/dual-diagnosis": "/who-we-help/behavioral-health/dual-diagnosis",
  "/who-we-help/luxury-private-pay": "/who-we-help",
  // legacy service path → current service page
  "/services/paid-media/google-ads": "/services/google-ads-management",
  "/services/paid-media/seo": "/services/paid-media",
  "/services/ai-edge": "/ai-edge",
  // legacy company path
  "/about-us": "/company/about",
  // results hub → the case-studies page (the real destination)
  "/results": "/results/case-studies",
  // (placeholder remaps removed as the real /resources and /media pages now exist)
};

/* Indexable routes for the sitemap. Mirrors VALID, minus thin/utility
   pages we don't want crawled (noindex confirmation + qualification). */
const NOINDEX = new Set<string>([
  "/get-started/thanks",
  "/get-started/qualification",
  "/search",
]);

export function indexableRoutes(): string[] {
  return [...VALID].filter((r) => !NOINDEX.has(r));
}

/** Resolve an internal href. Returns a valid path, or null if the link
    should be rendered as plain text (no good destination exists).
    Always returns the non-trailing-slash form — the site serves
    non-trailing-slash URLs, so a trailing slash costs a 308 hop. */
export function resolveLink(href: string): string | null {
  const [path, hash] = href.split("#");
  const norm = path.replace(/\/+$/, "") || "/";
  const suffix = hash ? `#${hash}` : "";
  if (REMAP[norm]) return `${REMAP[norm]}${suffix}`;
  if (VALID.has(norm)) return `${norm}${suffix}`;
  return hash && norm === "" ? href : null;
}
