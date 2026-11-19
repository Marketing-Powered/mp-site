import Link from "next/link";
import { indexableRoutes } from "@/lib/links";
import { titlesByUrl, NAV } from "@/lib/pages";
import { mono, serif } from "./theme";

/* The HTML sitemap's link list: every indexable page, grouped by section.
   Groups are collapsible <details> so the page stays short on a phone; the
   links are in the HTML either way, so every page has at least one
   crawlable internal link (no sitemap-only orphans). */

const GROUPS: { key: string; label: string }[] = [
  { key: "services", label: "Services" },
  { key: "who-we-help", label: "Who We Help" },
  { key: "problems", label: "Problems We Solve" },
  { key: "areas-we-serve", label: "Areas We Serve" },
  { key: "ai-edge", label: "AI Edge" },
  { key: "resources", label: "Resources & Guides" },
  { key: "research", label: "Research" },
  { key: "tools", label: "Tools" },
  { key: "media", label: "Media" },
  { key: "company", label: "Company" },
  { key: "get-started", label: "Get Started" },
  { key: "legal", label: "Legal" },
];

function humanize(route: string): string {
  const slug = route.split("/").filter(Boolean).pop() || "home";
  return slug
    .split("-")
    .map((w) => (w.length <= 3 && /^(ai|seo|ppc|cro|llm|iop|php|cmo|lsa|crm)$/.test(w) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

export default function SitemapDirectory() {
  const titles = titlesByUrl();
  const navLabels = new Map<string, string>();
  for (const item of NAV) {
    navLabels.set(item.href, item.label);
    for (const c of item.children || []) navLabels.set(c.href, c.label);
  }
  const label = (r: string) => (r === "/" ? "Home" : titles.get(r) || navLabels.get(r) || humanize(r));

  const routes = indexableRoutes().filter((r) => r !== "/sitemap");
  const grouped = new Map<string, string[]>();
  for (const r of routes) {
    const first = r.split("/").filter(Boolean)[0] || "";
    const key = GROUPS.some((g) => g.key === first) ? first : "other";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(r);
  }
  const groups = [...GROUPS, { key: "other", label: "More Pages" }].filter((g) => grouped.has(g.key));

  return (
    <section
      id="all-pages"
      className="relative z-10 mx-auto max-w-4xl px-6 py-12 lg:px-12"
      aria-labelledby="all-pages-heading"
    >
      <h2
        id="all-pages-heading"
        className="mb-8 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08]"
        style={{ fontFamily: serif, fontWeight: 400 }}
      >
        All Pages
      </h2>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {groups.map((g) => {
          const items = grouped.get(g.key)!.sort((a, b) => {
            // hub first, then alphabetical by label
            const depth = a.split("/").length - b.split("/").length;
            return depth || label(a).localeCompare(label(b));
          });
          return (
            <details key={g.key} className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.15rem] text-[#EDEAE3]" style={{ fontFamily: serif, fontWeight: 500 }}>
                  {g.label}
                </h3>
                <span className="flex items-center gap-3 text-[12px] text-white/45" style={{ fontFamily: mono }}>
                  {items.length}
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-[#0090F0] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <ul className="grid gap-x-8 pb-6 sm:grid-cols-2">
                {items.map((r) => (
                  <li key={r}>
                    <Link
                      href={r}
                      prefetch={false}
                      className="block py-2 text-[0.95rem] leading-snug text-white/60 transition-colors hover:text-[#7FCBFF]"
                    >
                      {label(r)}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </section>
  );
}
