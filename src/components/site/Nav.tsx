"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { mono } from "./theme";
import { ModalCta } from "./LeadModal";
import { CallCta } from "./ui";
import { MobileCallButton, StickyCallBar } from "./MobileCallButton";

const PRIMARY_NAV = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Paid Media", href: "/services/paid-media" },
      { label: "Google Ads", href: "/services/google-ads-management" },
      { label: "Meta Ads", href: "/services/meta-ads-management" },
      { label: "Landing Pages", href: "/services/landing-page-optimization" },
      { label: "Analytics & Attribution", href: "/services/analytics-and-attribution" },
      { label: "PPC Management", href: "/services/ppc" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "View All Services", href: "/services" },
    ],
  },
  {
    label: "Who We Help",
    href: "/who-we-help",
    children: [
      { label: "Behavioral Health", href: "/who-we-help/behavioral-health" },
      { label: "Mental Health", href: "/who-we-help/mental-health" },
      { label: "Residential Treatment", href: "/who-we-help/behavioral-health/residential-treatment" },
      { label: "Substance Use Disorder", href: "/who-we-help/behavioral-health/substance-use-disorder" },
      { label: "Outpatient Clinics", href: "/who-we-help/mental-health/outpatient-clinics" },
      { label: "View All Specialties", href: "/who-we-help" },
    ],
  },
  {
    label: "Problems",
    href: "/problems/reduce-cpa",
    children: [
      { label: "Reduce CPA", href: "/problems/reduce-cpa" },
      { label: "Fix Marketing Attribution", href: "/problems/fix-attribution" },
      { label: "Improve Lead Quality", href: "/problems/fix-lead-quality" },
      { label: "Increase Qualified Calls", href: "/problems/increase-qualified-calls" },
      { label: "Multi-Location Marketing", href: "/problems/scale-multi-location-campaigns" },
    ],
  },
  {
    label: "AI Edge",
    href: "/ai-edge",
    children: [
      { label: "AI Edge Overview", href: "/ai-edge" },
      { label: "AI in Paid Media", href: "/ai-edge/ai-in-paid-media" },
      { label: "Owned AI Systems", href: "/ai-edge/owned-ai-systems" },
      { label: "Data Sovereignty", href: "/ai-edge/data-sovereignty" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources Hub", href: "/resources" },
      { label: "Research", href: "/research" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Tools", href: "/tools" },
      { label: "Media", href: "/media" },
      { label: "Case Studies", href: "/results/case-studies" },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "Company Overview", href: "/company" },
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
      { label: "Security", href: "/company/security" },
    ],
  },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // The drawer is in flow and taller than a phone screen, so scrolling with it
  // open leaves the visitor below it with no way back to the close button —
  // and with the condensed bar suppressed for the rest of the page.
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const openedAt = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - openedAt) > 120) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  return (
    <header className="relative z-40 border-b border-white/8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" prefetch={false} aria-label="Marketing Powered home">
          <Logo tone="light" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                prefetch={false}
                className="flex items-center gap-1.5 py-2 text-[12px] tracking-wide text-white/55 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <span className="text-[8px] text-white/35">▼</span>
                )}
              </Link>
              {/* Always rendered (CSS-hidden until hover) so dropdown links
                  exist in the server HTML — crawlers never hover, and pages
                  linked only from here were being reported as orphans. */}
              {item.children && (
                <div
                  className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 transition-opacity duration-150 ${
                    openMenu === item.label ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070E1C]/95 p-1.5 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        prefetch={false}
                        className="block rounded-lg px-3 py-2 text-[12px] text-white/62 transition-colors hover:bg-white/5 hover:text-[#7FCBFF]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Unboxed so the audit pill stays the single primary action here.
              Visibility lives on the wrapper: appending a display utility to
              CallCta's own class list loses to the `inline-flex` in its base. */}
          <span className="hidden md:inline-flex">
            <CallCta variant="bare" />
          </span>
          {/* Below md the number itself doesn't fit, so the header carries the
              tap-to-call glyph on its own — visibility on the wrapper, same
              reason as above. */}
          <span className="md:hidden">
            <MobileCallButton />
          </span>
          <ModalCta
            href="/get-started/request-an-audit"
            className="group relative hidden overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black sm:inline-flex"
          >
            <span className="relative z-10">Request Audit</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
          </ModalCta>

          {/* mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-white/8 px-6 py-4 lg:hidden">
          {PRIMARY_NAV.map((item) => (
            <div key={item.label} className="border-b border-white/5 py-3">
              <Link
                href={item.href}
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className="block text-[15px] text-white/85"
                style={{ fontFamily: mono }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-2 flex flex-col gap-1 pl-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      prefetch={false}
                      onClick={() => setMobileOpen(false)}
                      className="py-1 text-[13px] text-white/50 transition-colors hover:text-[#7FCBFF]"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <ModalCta
              href="/get-started/request-an-audit"
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
            >
              Request Audit
            </ModalCta>
            <CallCta className="justify-center" />
          </div>
        </div>
      )}

      <StickyCallBar suppressed={mobileOpen} />
    </header>
  );
}
