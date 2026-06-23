"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { mono } from "./theme";

const PRIMARY_NAV = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Paid Media", href: "/services/paid-media/" },
      { label: "Google Ads", href: "/services/google-ads-management/" },
      { label: "Meta Ads", href: "/services/meta-ads-management/" },
      { label: "Landing Pages", href: "/services/landing-page-optimization/" },
      { label: "Analytics & Attribution", href: "/services/analytics-and-attribution/" },
      { label: "Web Development", href: "/services/web-development/" },
      { label: "View All Services", href: "/services/" },
    ],
  },
  {
    label: "Who We Help",
    href: "/who-we-help/",
    children: [
      { label: "Behavioral Health", href: "/who-we-help/behavioral-health/" },
      { label: "Mental Health", href: "/who-we-help/mental-health/" },
      { label: "Residential Treatment", href: "/who-we-help/behavioral-health/residential-treatment/" },
      { label: "Substance Use Disorder", href: "/who-we-help/behavioral-health/substance-use-disorder/" },
      { label: "Outpatient Clinics", href: "/who-we-help/mental-health/outpatient-clinics/" },
      { label: "View All Specialties", href: "/who-we-help/" },
    ],
  },
  {
    label: "AI Edge",
    href: "/ai-edge/",
    children: [
      { label: "AI Edge Overview", href: "/ai-edge/" },
      { label: "AI in Paid Media", href: "/ai-edge/ai-in-paid-media/" },
      { label: "Owned AI Systems", href: "/ai-edge/owned-ai-systems/" },
      { label: "Data Sovereignty", href: "/ai-edge/data-sovereignty/" },
    ],
  },
  {
    label: "Resources",
    href: "/resources/",
    children: [
      { label: "Resources Hub", href: "/resources/" },
      { label: "Research", href: "/research/" },
      { label: "Guides", href: "/resources/guides/" },
      { label: "Tools", href: "/tools/" },
      { label: "Media", href: "/media/" },
      { label: "Case Studies", href: "/results/case-studies/" },
    ],
  },
  {
    label: "Company",
    href: "/company/",
    children: [
      { label: "Company Overview", href: "/company/" },
      { label: "About", href: "/company/about/" },
      { label: "Contact", href: "/company/contact/" },
      { label: "Security", href: "/company/security/" },
    ],
  },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="relative z-40 border-b border-white/8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" aria-label="Marketing Powered home">
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
                className="flex items-center gap-1.5 py-2 text-[12px] tracking-wide text-white/55 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <span className="text-[8px] text-white/35">▼</span>
                )}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070E1C]/95 p-1.5 shadow-[0_24px_70px_-34px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
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
          <Link
            href="/get-started/book-a-call/"
            className="group relative hidden overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black sm:inline-flex"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          {/* mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 lg:hidden"
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
          <Link
            href="/get-started/book-a-call/"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
