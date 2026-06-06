import Link from "next/link";
import { mono } from "./theme";

const LABELS: Record<string, string> = {
  services: "Services",
  "ai-edge": "AI Edge",
  "who-we-help": "Who We Help",
  "get-started": "Get Started",
  company: "Company",
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

  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35"
      style={{ fontFamily: mono }}
      aria-label="Breadcrumb"
    >
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#0090F0]/50">/</span>}
          {i === crumbs.length - 1 ? (
            <span className="text-white/55">{c.label}</span>
          ) : (
            <Link href={c.href} className="transition-colors hover:text-[#7FCBFF]">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
