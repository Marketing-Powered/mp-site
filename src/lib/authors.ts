import { SITE_URL } from "./site";

/* ================================================================== */
/*  Bylined authors. A guide opts in with `author: <key>` in its        */
/*  frontmatter; the key resolves here so every byline, link, and       */
/*  Article schema entry updates in one place.                          */
/*                                                                      */
/*  `href` is the canonical author profile page. The production brief   */
/*  for the profile asks that all bylines route to this single page     */
/*  and that no competing /about-mike style page be published.          */
/* ================================================================== */

export type Author = {
  key: string;
  /** Established public byline name (articles). */
  name: string;
  /** Full name shown on the profile page itself. */
  fullName: string;
  jobTitle: string;
  href: string;
  /** Approved professional headshot (portrait crop) and its alt text. */
  image: string;
  imageAlt: string;
  /** Verified external profiles for Person.sameAs. */
  sameAs: string[];
};

export const AUTHORS: Record<string, Author> = {
  "mike-hulick": {
    key: "mike-hulick",
    name: "Mike Hulick",
    fullName: "Mike Hulick",
    jobTitle: "Founder, Marketing Powered",
    href: "/author/mike-hulick",
    image: "/images/authors/mike-hulick.jpg",
    imageAlt: "Mike Hulick, founder of Marketing Powered",
    sameAs: [
      "https://www.linkedin.com/in/mike-hulick-2a1190200",
      "https://medium.com/@mhulick_97776",
    ],
  },
};

export function getAuthor(key: string | undefined): Author | null {
  if (!key) return null;
  return AUTHORS[key] ?? null;
}

/* Stable schema.org Person identity shared by every page that cites the author. */
export function authorSchemaId(author: Author): string {
  return `${SITE_URL}/#person-${author.key}`;
}

/* Person entity used by the profile page (full) and by Article schema on
   bylined guides (referenced by @id, with the essentials repeated). */
export function authorPersonSchema(author: Author) {
  return {
    "@type": "Person",
    "@id": authorSchemaId(author),
    name: author.name,
    alternateName: author.fullName,
    jobTitle: author.jobTitle,
    url: `${SITE_URL}${author.href}/`,
    image: `${SITE_URL}${author.image}`,
    sameAs: author.sameAs,
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}
