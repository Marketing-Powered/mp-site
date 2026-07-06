import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/links";
import { SITE_URL } from "@/lib/site";

/* Enumerated from the canonical route registry in lib/links so the sitemap
   stays in sync with what actually ships. Excludes noindex utility pages.
   URLs are the served non-trailing-slash form (trailingSlash is off), so
   sitemap entries resolve 200 directly instead of through a 308. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => ({
    url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
