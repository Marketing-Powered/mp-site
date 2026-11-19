import MarkdownPage from "@/components/site/MarkdownPage";
import SitemapDirectory from "@/components/site/SitemapDirectory";
import { pageMetadata } from "@/lib/pages";

const FILE = "sitemap.md";
export const metadata = pageMetadata(FILE);

/* The link directory sits right under the hero: visitors open the sitemap
   to find a page, and on a phone the copy below would push it 8+ screens
   down. */
export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Sitemap" formFirst={{ id: "all-pages", ctaText: "Browse All Pages" }}>
      <SitemapDirectory />
    </MarkdownPage>
  );
}
