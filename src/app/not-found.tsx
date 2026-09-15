import Link from "next/link";
import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import CtaBand from "@/components/site/CtaBand";
import { Kicker, GoldRule } from "@/components/site/ui";
import { serif } from "@/components/site/theme";

/* Without this, an unknown URL falls back to Next's built-in 404: no nav, no
   footer, no tap-to-call, no chat, and none of the site's styling. */

export const metadata: Metadata = {
  title: "Page Not Found - Marketing Powered",
  description: "That page doesn't exist. Find what you need from the links below, or get in touch.",
  robots: { index: false, follow: true },
};

const ROUTES = [
  { label: "Services", href: "/services", note: "Paid media, web development, analytics" },
  { label: "Who We Help", href: "/who-we-help", note: "Behavioral health and mental health providers" },
  { label: "Resources", href: "/resources", note: "Guides, research, and tools" },
  { label: "Contact", href: "/company/contact", note: "Talk to us directly" },
  { label: "Search", href: "/search", note: "Find a page by keyword" },
  { label: "Sitemap", href: "/sitemap", note: "Every page on the site" },
];

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <Kicker>404</Kicker>
        <h1
          className="text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.06]"
          style={{ fontFamily: serif, fontWeight: 400 }}
        >
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/60">
          The link may be out of date, or the page may have moved. Here&rsquo;s where most
          people are headed.
        </p>
        <GoldRule className="mt-10" />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {ROUTES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                prefetch={false}
                className="block rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#0090F0]/50 hover:bg-[#0090F0]/[0.06]"
              >
                <span className="block text-[15px] text-white/85">{r.label}</span>
                <span className="mt-1 block text-[13px] text-white/45">{r.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        headline="Looking for something specific?"
        body="Tell us what you were after and we'll point you to it — or give you a straight read on your paid media, landing pages, and attribution while we're at it."
      />
    </PageShell>
  );
}
