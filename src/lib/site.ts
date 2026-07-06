/* Central site config. Public values read from env so the deploy is
   "ready to go live" the moment real values are supplied. */

/** Canonical origin, no trailing slash. Used for metadataBase, sitemap,
    robots, and canonical URLs. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://marketingpowered.ai"
).replace(/\/+$/, "");

export const SITE_NAME = "Marketing Powered";

export const SITE_TAGLINE = "AI Marketing Agency for Behavioral Health";

export const SITE_TITLE =
  "Marketing Powered — AI Marketing Agency for Behavioral & Mental Health";

export const SITE_DESCRIPTION =
  "AI-native marketing agency for behavioral and mental health providers: $50M+ in managed ad spend, HIPAA-conscious infrastructure, attribution to admission.";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
