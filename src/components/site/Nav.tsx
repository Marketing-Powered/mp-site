"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand";
import { NAV } from "@/lib/nav";
import { mono } from "./theme";

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
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1.5 py-2 text-[13px] tracking-wide text-white/60 transition-colors hover:text-white"
              >
                {item.label}
                {item.children && (
                  <span className="text-[8px] text-white/40">▼</span>
                )}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070E1C]/95 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-4 py-2.5 text-[13px] text-white/65 transition-colors hover:bg-white/5 hover:text-[#7FCBFF]"
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
            href="/get-started/"
            className="group relative hidden overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black sm:inline-flex"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          {/* mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-white/8 px-6 py-4 md:hidden">
          {NAV.map((item) => (
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
            href="/get-started/"
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
