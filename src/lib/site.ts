/* Central site config. Public values read from env so the deploy is
   "ready to go live" the moment real values are supplied. */

/** Canonical origin, no trailing slash. Used for metadataBase, sitemap,
    robots, and canonical URLs. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://marketingpowered.ai"
).replace(/\/+$/, "");

export const SITE_NAME = "Marketing Powered";

export const SITE_TAGLINE = "AI Marketing Agency for Behavioral Health";

/* Homepage search title and description from the November 2026 homepage
   package: 55 and 148 characters. Editorial limits, not Google display
   limits — search engines may rewrite or truncate either. */
export const SITE_TITLE = "Experienced Growth Marketing Agency | Marketing Powered";

export const SITE_DESCRIPTION =
  "Marketing leadership for hospitals, health systems, and multi-location organizations, with owned technology and execution tied to measurable growth.";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** RSS feed of the resources library (served by app/feed.xml/route.ts). */
export const FEED_PATH = "/feed.xml";
export const FEED_TITLE = "Marketing Powered Resources";
