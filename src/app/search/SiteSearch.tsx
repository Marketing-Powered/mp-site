"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NAV } from "@/lib/nav";
import { indexableRoutes } from "@/lib/links";
import { mono } from "@/components/site/theme";

/* ------------------------------------------------------------------ */
/*  Client-side site search.                                           */
/*  The index is built from the site's own route registry — every      */
/*  indexable route in links.ts VALID, titled from nav.ts labels where */
/*  available and otherwise derived from the slug. No backend: matching */
/*  runs entirely in the browser over titles, paths, and section.      */
/* ------------------------------------------------------------------ */

type Entry = { href: string; title: string; section: string };

const TITLE_CASE = (s: string) =>
  s
    .split("-")
    .map((w) => (w.length <= 3 && /^(ppc|cpa|llm|seo|iop|php|ai|cro|ga4)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

function buildIndex(): Entry[] {
  // href (no trailing slash) -> human label, from the nav config
  const labels = new Map<string, string>();
  for (const item of NAV) {
    const norm = item.href.replace(/\/+$/, "") || "/";
    labels.set(norm, item.label);
    for (const c of item.children ?? []) {
      labels.set(c.href.replace(/\/+$/, "") || "/", c.label);
    }
  }

  const seen = new Set<string>();
  const entries: Entry[] = [];
  for (const route of indexableRoutes()) {
    const norm = route.replace(/\/+$/, "") || "/";
    if (seen.has(norm)) continue;
    seen.add(norm);
    const seg = norm.split("/").filter(Boolean);
    const last = seg[seg.length - 1] ?? "";
    const title = labels.get(norm) ?? (norm === "/" ? "Home" : TITLE_CASE(last));
    const section = seg.length ? TITLE_CASE(seg[0]) : "Home";
    entries.push({ href: norm === "/" ? "/" : `${norm}/`, title, section });
  }
  return entries;
}

export default function SiteSearch() {
  const index = useMemo(() => buildIndex(), []);
  const [q, setQ] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    const scored = index
      .map((e) => {
        const title = e.title.toLowerCase();
        const hay = `${title} ${e.href} ${e.section.toLowerCase()}`;
        let score = 0;
        if (title === term) score = 100;
        else if (title.startsWith(term)) score = 80;
        else if (title.includes(term)) score = 60;
        else if (hay.includes(term)) score = 30;
        return { e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.e.title.localeCompare(b.e.title));
    return scored.map((r) => r.e).slice(0, 24);
  }, [q, index]);

  const term = q.trim();

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/40">
          ⌕
        </span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services, resources, tools, insights…"
          aria-label="Search the site"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] py-4 pl-12 pr-5 text-[1.05rem] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#0090F0]/60"
        />
      </div>

      <div className="mt-6">
        {term.length < 2 ? (
          <p className="text-center text-[0.95rem] text-white/40">
            Type at least two characters to search the site.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-[0.95rem] text-white/40">
            No results for &ldquo;{term}&rdquo;. Try a simpler keyword, check spelling, or browse the
            main sections.
          </p>
        ) : (
          <>
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/40"
              style={{ fontFamily: mono }}
            >
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ul className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/10">
              {results.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <span>
                      <span className="block text-[1rem] text-white/85">{r.title}</span>
                      <span className="block text-[12px] text-white/35">{r.href}</span>
                    </span>
                    <span
                      className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#0090F0]/70"
                      style={{ fontFamily: mono }}
                    >
                      {r.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
