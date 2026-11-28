import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import { ownPageImages } from "@/components/site/pageImages";

/* Enumerated from the canonical route registry in lib/links so the sitemap
   stays in sync with what actually ships. Excludes noindex utility pages.
   URLs are the served trailing-slash form (trailingSlash is on), so sitemap
   entries resolve 200 directly instead of through a 308. Pages with their
   own images list them as image sitemap entries. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => {
    // Image sitemap entries for the page's own images (helps Google Images find them).
    const images = ownPageImages(route).map((i) => `${SITE_URL}${i.src}`);
    return {
      url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}/`,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      ...(images.length ? { images } : {}),
    };
  });
}
