"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Logo, Figure, brand, brandGradient } from "@/components/brand";

/* ================================================================== */
/*  DESIGN 2 — "Clarity"                                              */
/*  A clean, trust-forward B2B agency homepage built around what the  */
/*  company actually is: an AI-native marketing agency for behavioral */
/*  health. Light, structured, results-led, fully on brand            */
/*  (blue / green / navy). Modern Manrope, calm healthcare credibility.*/
/* ================================================================== */

const sans = "'Manrope', system-ui, sans-serif";
const INK = "#0A1322";
const MUTE = "#48566B";
const SOFT = "#F3F8FD";

function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 15l3-4 3 2 4-6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="m8 9-3 3 3 3" />
          <path d="m16 9 3 3-3 3" />
          <path d="m13 6-2 12" />
        </svg>
      );
  }
}

export default function Design2() {
  const [open, setOpen] = useState<number | null>(0);

  const trust = [
    { v: "$50M+", l: "Managed ad spend" },
    { v: "0", l: "Account suspensions" },
    { v: "LegitScript", l: "Compliant campaigns" },
  ];

  return (
    <div style={{ background: "#FFFFFF", color: INK, fontFamily: sans }} className="min-h-screen">
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-40 border-b border-[#E4ECF5] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Logo tone="dark" />
          <nav className="hidden items-center gap-8 text-[14px] font-medium text-[#3A4760] md:flex">
            {s.nav.map((n) => (
              <a key={n} href="#" className="transition-colors hover:text-[#0090F0]">
                {n}
              </a>
            ))}
          </nav>
          <Link
            href={s.hero.ctaLink}
            className="rounded-full px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(0,144,240,0.7)] transition-transform hover:scale-[1.03]"
            style={{ background: brand.blue }}
          >
            Book a Call
          </Link>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 85% 10%, rgba(0,144,240,0.10), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(0,168,96,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24 lg:px-8">
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#CDE6FA] bg-[#EAF5FE] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#0072D8]"
              style={{ animation: "mp-fade-in 0.8s ease both" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} />
              AI-native since 2022 · HIPAA-conscious
            </div>
            <h1 className="text-[clamp(2.3rem,4.6vw,3.7rem)] font-extrabold leading-[1.05] tracking-tight" style={{ color: brand.navy }}>
              {s.hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed" style={{ color: MUTE }}>
              {s.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={s.hero.ctaLink}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(0,144,240,0.7)] transition-transform hover:scale-[1.03]"
                style={{ background: brand.blue }}
              >
                {s.hero.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="#services" className="text-[14px] font-bold text-[#0072D8]">
                See how it works →
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#E4ECF5] pt-7">
              {trust.map((t) => (
                <div key={t.l}>
                  <div className="text-[1.4rem] font-extrabold" style={{ color: brand.blue }}>
                    {t.v}
                  </div>
                  <div className="text-[12px] font-medium" style={{ color: MUTE }}>
                    {t.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Reveal variant="blur">
            <Figure src={s.hero.image} alt={s.hero.imageAlt} ratio="16 / 11" priority />
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section style={{ background: SOFT }}>
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {s.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 80}
              className="rounded-2xl border border-[#E1ECF7] bg-white p-7 shadow-[0_18px_40px_-30px_rgba(0,24,72,0.5)]"
            >
              <div
                className="text-[clamp(2rem,3.4vw,2.8rem)] font-extrabold leading-none"
                style={{ color: i % 2 ? brand.green : brand.blue }}
              >
                {stat.value}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed" style={{ color: MUTE }}>
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- EXPERTS / GROWTH ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal variant="blur" className="order-2 lg:order-1">
            <Figure src={s.growth.image} alt={s.growth.imageAlt} ratio="16 / 11" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
                Built by operators
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
                {s.growth.headline}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 leading-relaxed" style={{ color: MUTE }}>
                {s.growth.body}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div
                className="mt-7 flex items-center gap-5 rounded-2xl border border-[#E1ECF7] p-5"
                style={{ background: SOFT }}
              >
                <span className="text-[2.6rem] font-extrabold leading-none" style={{ color: brand.green }}>
                  3→24
                </span>
                <span className="text-[13px] font-medium leading-snug" style={{ color: MUTE }}>
                  Haven Health locations scaled under our marketing leadership.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section id="services" style={{ background: SOFT }}>
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
              What we do
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
              {s.servicesIntro.headline}
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: MUTE }}>
              {s.servicesIntro.body}
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.services.map((svc, i) => (
              <Reveal
                key={svc.title}
                delay={(i % 3) * 80}
                className="group rounded-2xl border border-[#E1ECF7] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(0,24,72,0.45)]"
              >
                <div
                  className="mb-5 grid h-12 w-12 place-items-center rounded-xl text-white"
                  style={{ background: i % 2 ? brand.green : brand.blue }}
                >
                  <ServiceIcon name={svc.icon} />
                </div>
                <h3 className="text-[1.15rem] font-bold" style={{ color: brand.navy }}>
                  {svc.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed" style={{ color: MUTE }}>
                  {svc.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SPECIALIZED ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
              Why specialized matters
            </p>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1.12]" style={{ color: brand.navy }}>
              {s.specializedMarketing.headline}
            </h2>
            <p className="mt-6 leading-relaxed" style={{ color: MUTE }}>
              {s.specializedMarketing.body}
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "No retargeting in Google's sensitive vertical — we plan around it",
                "LegitScript & Meta Special Ad Category compliance, built in",
                "Attribution tracked from first click through to admission",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.95rem]" style={{ color: INK }}>
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
                    style={{ background: brand.green }}
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <Figure src={s.specializedMarketing.image} alt={s.specializedMarketing.imageAlt} ratio="16 / 10" />
          </Reveal>
        </div>
      </section>

      {/* ---------- RESULTS / WHY CHOOSE ---------- */}
      <section style={{ background: SOFT }}>
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
              Proven results
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
              {s.whyChoose.headline}
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: MUTE }}>
              {s.whyChoose.body}
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {s.whyChoose.cards.map((card, i) => (
              <Reveal
                key={card.title}
                delay={(i % 2) * 90}
                className="rounded-2xl border border-[#E1ECF7] bg-white p-8"
              >
                <h3 className="flex items-center gap-3 text-[1.15rem] font-bold" style={{ color: brand.navy }}>
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg text-[13px] font-extrabold text-white"
                    style={{ background: i % 2 ? brand.green : brand.blue }}
                  >
                    {i + 1}
                  </span>
                  {card.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed" style={{ color: MUTE }}>
                  {card.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <Reveal>
          <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold" style={{ color: brand.navy }}>
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {s.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.question}
                className="overflow-hidden rounded-2xl border border-[#E1ECF7] bg-white"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[1.02rem] font-bold" style={{ color: brand.navy }}>
                    {f.question}
                  </span>
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white transition-transform duration-300"
                    style={{ background: brand.blue, transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[0.95rem] leading-relaxed" style={{ color: MUTE }}>
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-6 pb-24 lg:px-8">
        <Reveal
          variant="blur"
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-20 text-center md:px-16"
          style={{ background: brandGradient }}
        >
          <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.1] text-white">
            {s.cta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/85">
            {s.cta.body}
          </p>
          <Link
            href={s.cta.ctaLink}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[14px] font-bold text-[#0072D8] transition-transform hover:scale-[1.03]"
          >
            {s.cta.ctaText}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-[#E4ECF5]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-xs">
            <Logo tone="dark" />
            <p className="mt-3 text-[13px]" style={{ color: MUTE }}>
              {s.footer.tagline}
            </p>
            <p className="mt-3 text-[13px]" style={{ color: MUTE }}>
              {s.brand.phone} · {s.brand.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px]" style={{ color: MUTE }}>
            {s.footer.services.map((svc) => (
              <a key={svc} href="#" className="transition-colors hover:text-[#0090F0]">
                {svc}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-[#E4ECF5] px-6 py-5 text-center text-[12px] lg:px-8" style={{ color: MUTE }}>
          {s.footer.copyright}
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-[#D5E5F5] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur transition-colors hover:text-[#0090F0]"
        style={{ color: INK }}
      >
        ← Gallery
      </Link>
    </div>
  );
}
