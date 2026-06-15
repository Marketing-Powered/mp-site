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
  "/who-we-help/mental-health",
  "/who-we-help/mental-health/outpatient-clinics",
  "/who-we-help/mental-health/therapy-groups",
  "/who-we-help/mental-health/tele-mental-health",
  "/who-we-help/mental-health/psychiatric-practices",
  "/problems/reduce-cpa",
  "/results/case-studies",
  "/legal/privacy-policy",
  "/legal/terms",
  "/legal/cookie-policy",
  "/legal/advertising-disclaimer",
  "/legal/hipaa-phi-disclaimer",
  "/company/about-us",
  "/get-started",
  "/get-started/qualification",
  "/get-started/request-an-audit",
  "/get-started/book-a-call",
  "/get-started/thanks",
  "/company/about",
  "/company/contact",
]);

const REMAP: Record<string, string> = {
  // sub-verticals that don't have their own page yet → parent vertical
  "/who-we-help/behavioral-health/inpatient": "/who-we-help/behavioral-health/",
  "/who-we-help/behavioral-health/outpatient": "/who-we-help/behavioral-health/",
  "/who-we-help/behavioral-health/dual-diagnosis": "/who-we-help/behavioral-health/",
  "/who-we-help/dual-diagnosis": "/who-we-help/behavioral-health/",
  "/who-we-help/mental-health/trauma-ptsd": "/who-we-help/mental-health/",
  "/who-we-help/luxury-private-pay": "/who-we-help/",
  // legacy service path → current service page
  "/services/paid-media/google-ads": "/services/google-ads-management/",
  // results hub → the case-studies page (the real destination)
  "/results": "/results/case-studies/",
  // sections that don't exist yet → closest relevant page
  "/resources": "/ai-edge/",
  "/media": "/company/about/",
};

/* Indexable routes for the sitemap. Mirrors VALID, minus thin/utility
   pages we don't want crawled (noindex confirmation + qualification). */
const NOINDEX = new Set<string>([
  "/get-started/thanks",
  "/get-started/qualification",
]);

export function indexableRoutes(): string[] {
  return [...VALID].filter((r) => !NOINDEX.has(r));
}

/** Resolve an internal href. Returns a valid path, or null if the link
    should be rendered as plain text (no good destination exists). */
export function resolveLink(href: string): string | null {
  const [path, hash] = href.split("#");
  const norm = path.replace(/\/+$/, "") || "/";
  if (REMAP[norm]) return REMAP[norm];
  if (VALID.has(norm)) return href;
  return hash && norm === "" ? href : null;
}
