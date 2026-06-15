import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // internal/design routes and the lead endpoint shouldn't be crawled
      disallow: ["/api/", "/design-1", "/design-6", "/design-7", "/boca-redesign"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
