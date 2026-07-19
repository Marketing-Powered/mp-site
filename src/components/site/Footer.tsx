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
      { label: "PPC Campaign Management", href: "/services/ppc/introduction-to-ppc-campaign-management" },
      { label: "Web Development", href: "/services/web-development" },
    ],
  },
  {
    title: "Problems We Solve",
    links: [
      { label: "Reduce CPA", href: "/problems/reduce-cpa" },
      { label: "Fix Marketing Attribution", href: "/problems/fix-attribution" },
      { label: "Improve Lead Quality", href: "/problems/fix-lead-quality" },
      { label: "Increase Qualified Calls", href: "/problems/increase-qualified-calls" },
      { label: "Multi-Location Marketing", href: "/problems/scale-multi-location-campaigns" },
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
      { label: "Open-Source AI Models", href: "/top-10-open-source-ai-models-of-2025" },
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
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.4fr]">
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
            <a
              href="https://www.designrush.com/agency/digital-marketing/florida"
              target="_blank"
              rel="noopener"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-3.5 pr-4.5 transition-all duration-300 hover:border-[#0090F0]/50 hover:bg-[#0090F0]/10 hover:shadow-[0_0_24px_-6px_rgba(0,144,240,0.45)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:scale-125" />
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors group-hover:text-[#7FCBFF]"
                style={{ fontFamily: mono }}
              >
                As seen on DesignRush
              </span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
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
