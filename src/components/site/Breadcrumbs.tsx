import Link from "next/link";
import { mono } from "./theme";
import { resolveLink } from "@/lib/links";
import { absoluteUrl } from "@/lib/site";

const LABELS: Record<string, string> = {
  services: "Services",
  "ai-edge": "AI Edge",
  "who-we-help": "Who We Help",
  "get-started": "Get Started",
  company: "Company",
  author: "Authors",
  "web-development": "Web Development",
  "behavioral-health": "Behavioral Health",
  "mental-health": "Mental Health",
};

function titleize(seg: string) {
  return (
    LABELS[seg] ||
    seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

/* Derives a breadcrumb trail from a page url like /services/paid-media/ */
export default function Breadcrumbs({ url, current }: { url: string; current: string }) {
  const segs = url.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [{ label: "Home", href: "/" }];
  let acc = "";
  segs.forEach((seg, i) => {
    acc += "/" + seg;
    const isLast = i === segs.length - 1;
    crumbs.push({ label: isLast ? current : titleize(seg), href: acc + "/" });
  });

  // BreadcrumbList structured data (Search Console breadcrumbs). Crumbs
  // whose segment has no live page (resolveLink → null) are dropped so the
  // trail never points at a 404; positions stay sequential after filtering.
  const schemaCrumbs = crumbs.flatMap((c) => {
    const dest = resolveLink(c.href);
    return dest ? [{ label: c.label, dest }] : [];
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaCrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.dest),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35"
        style={{ fontFamily: mono }}
        aria-label="Breadcrumb"
      >
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          const dest = resolveLink(c.href);
          return (
            <span key={c.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#0090F0]/50">/</span>}
              {isLast || !dest ? (
                <span className="text-white/55">{c.label}</span>
              ) : (
                <Link href={dest} className="transition-colors hover:text-[#7FCBFF]">
                  {c.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
