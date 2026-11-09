import { SITE_URL } from "./site";

/* ================================================================== */
/*  Bylined authors. A guide opts in with `author: <key>` in its        */
/*  frontmatter; the key resolves here so every byline, link, and       */
/*  Article schema entry updates in one place.                          */
/*                                                                      */
/*  `href` is the page the author's name links to. Mike's dedicated     */
/*  author bio page is still in review (Asana: "Shell and mock up the   */
/*  bio pages"), so bylines point at the About page's founder section   */
/*  until it ships. Repoint `href` here when it does.                   */
/* ================================================================== */

export type Author = {
  key: string;
  name: string;
  jobTitle: string;
  href: string;
};

export const AUTHORS: Record<string, Author> = {
  "mike-hulick": {
    key: "mike-hulick",
    name: "Mike Hulick",
    jobTitle: "Founder and CEO, Marketing Powered",
    href: "/company/about",
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
