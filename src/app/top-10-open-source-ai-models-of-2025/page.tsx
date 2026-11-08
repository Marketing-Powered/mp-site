import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata, getPage } from "@/lib/pages";
import { author } from "@/lib/author";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

const FILE = "top-10-open-source-ai-models-of-2025.md";
const URL_PATH = "/top-10-open-source-ai-models-of-2025";
export const metadata = pageMetadata(FILE);

/* Published July 23, 2025 (also on the author's LinkedIn). Keep this in
   step with the entry in lib/author.ts. */
const PUBLISHED = { iso: "2025-07-23", label: "July 23, 2025" };

/* Article markup: author is the Person behind /author/mike-hulick; the
   publisher is the site-wide Organization entity, declared separately. */
function ArticleJsonLd() {
  const page = getPage(FILE);
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${URL_PATH}#article`,
    headline: page.h1,
    description: page.seo.description,
    url: absoluteUrl(URL_PATH),
    mainEntityOfPage: absoluteUrl(URL_PATH),
    datePublished: PUBLISHED.iso,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}${author.path}#person`,
      name: author.bylineName,
      url: absoluteUrl(author.path),
      jobTitle: author.jobTitle,
      sameAs: [author.links.linkedin, author.links.medium],
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default function Page() {
  return (
    <>
      <ArticleJsonLd />
      <MarkdownPage file={FILE} kicker="AI Research" author={{ published: PUBLISHED }} />
    </>
  );
}
