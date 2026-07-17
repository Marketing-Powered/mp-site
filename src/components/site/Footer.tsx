import Link from "next/link";
import { Logo } from "@/components/brand";
import { siteContent as s } from "@/lib/content";
import { mono } from "./theme";
import { ModalCta } from "./LeadModal";
import MapEmbed from "./MapEmbed";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Paid Media", href: "/services/paid-media" },
      { label: "Meta Ads", href: "/services/meta-ads-management" },
      { label: "Google Ads", href: "/services/google-ads-management" },
      { label: "Landing Page Optimization", href: "/services/landing-page-optimization" },
      { label: "Analytics & Attribution", href: "/services/analytics-and-attribution" },
      { label: "Web Development", href: "/services/web-development" },
    ],
  },
  {
    title: "AI Edge",
    links: [
      { label: "AI in Paid Media", href: "/ai-edge/ai-in-paid-media" },
      { label: "Owned AI Systems", href: "/ai-edge/owned-ai-systems" },
      { label: "AI Governance", href: "/ai-edge/ai-governance" },
      { label: "Data Sovereignty", href: "/ai-edge/data-sovereignty" },
      { label: "Social Media", href: "/ai-edge/social-media" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Who We Help", href: "/who-we-help" },
      { label: "Behavioral Health", href: "/who-we-help/behavioral-health" },
      { label: "Mental Health", href: "/who-we-help/mental-health" },
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Legal Center", href: "/legal" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Advertising Disclaimer", href: "/legal/advertising-disclaimer" },
      { label: "HIPAA & PHI Disclaimer", href: "/legal/hipaa-phi-disclaimer" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/45">
              {s.footer.tagline}
            </p>
            <div className="mt-6 space-y-2 text-[13px] text-white/45" style={{ fontFamily: mono }}>
              <p>
                <a
                  href={`mailto:${s.brand.email}`}
                  className="text-[#7FCBFF] transition-colors hover:text-white"
                >
                  {s.brand.email}
                </a>
              </p>
              <p>{s.brand.phone}</p>
              <p className="max-w-[15rem]">{s.brand.address}</p>
            </div>
            <div className="mt-6 max-w-sm overflow-hidden rounded-xl border border-white/10">
              <MapEmbed className="block h-44 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p
                  className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#0090F0]"
                  style={{ fontFamily: mono }}
                >
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        prefetch={false}
                        className="text-[13px] text-white/55 transition-colors hover:text-[#7FCBFF]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-white/30" style={{ fontFamily: mono }}>
            {s.footer.copyright}
          </p>
          <ModalCta
            href="/get-started/request-an-audit"
            className="text-[12px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-[#7FCBFF]"
          >
            Request a Free Audit →
          </ModalCta>
        </div>
      </div>
    </footer>
  );
}
