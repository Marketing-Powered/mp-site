import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/links";
import { SITE_URL } from "@/lib/site";

/* Enumerated from the canonical route registry in lib/links so the sitemap
   stays in sync with what actually ships. Excludes noindex utility pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes().map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}/`.replace(/([^:]\/)\/+/g, "$1"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
