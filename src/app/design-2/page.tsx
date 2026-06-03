"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* ================================================================== */
/*  DESIGN 2 — "The Quarterly"                                         */
/*  High-end print magazine. Warm paper stock, Newsreader display      */
/*  serif, editorial multi-column copy, drop caps, ruled captions,     */
/*  oxblood accent. Intentional asymmetry and generous margins.        */
/* ================================================================== */

const PAPER = "#F4EFE6";
const INK = "#1C1815";
const display = "'Newsreader', Georgia, serif";
const accentSerif = "'Fraunces', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";

export default function Design2() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      style={{ background: PAPER, color: INK, fontFamily: sans }}
      className="relative min-h-screen"
    >
      {/* paper grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.45] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ---------- MASTHEAD ---------- */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex items-center justify-between border-b-2 border-[#1C1815] py-5 text-[11px] uppercase tracking-[0.25em]">
          <span>Vol. XII — Behavioral Health</span>
          <span className="hidden sm:block">Issue No. 2026</span>
          <span>{s.brand.address.split(",")[1]}</span>
        </div>
        <div className="flex flex-col items-center border-b border-[#1C1815]/30 py-8 text-center">
          <span className="mb-3 text-[11px] uppercase tracking-[0.4em] text-[#8A2B2B]">
            An AI Marketing Quarterly
          </span>
          <h1
            className="text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.92]"
            style={{ fontFamily: display, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            Marketing Powered
          </h1>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-[12px] uppercase tracking-[0.18em] text-[#1C1815]/70">
          {[...s.nav, "Contact"].map((n) => (
            <a key={n} href="#" className="transition-colors hover:text-[#8A2B2B]">
              {n}
            </a>
          ))}
        </nav>
      </header>

      {/* ---------- HERO / COVER STORY ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <p className="mb-6 text-[12px] uppercase tracking-[0.3em] text-[#8A2B2B]">
              The Cover Story
            </p>
            <h2
              className="text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.02]"
              style={{ fontFamily: display, fontWeight: 500, letterSpacing: "-0.015em" }}
            >
              {s.hero.headline}
            </h2>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-[#1C1815]/70">
              {s.hero.subheadline}
            </p>
            <Link
              href={s.hero.ctaLink}
              className="group mt-9 inline-flex items-center gap-3 border-b-2 border-[#8A2B2B] pb-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#8A2B2B]"
            >
              {s.hero.cta}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>

          <Reveal variant="blur" delay={120} className="relative">
            <figure className="relative">
              <div className="overflow-hidden">
                <Image
                  src={s.hero.image}
                  alt={s.hero.imageAlt}
                  width={760}
                  height={900}
                  priority
                  className="h-[clamp(360px,48vw,540px)] w-full object-cover"
                  style={{ filter: "sepia(0.08) contrast(1.03)" }}
                />
              </div>
              <figcaption className="mt-3 flex items-start gap-3 text-[11px] uppercase tracking-[0.14em] text-[#1C1815]/55">
                <span className="mt-0.5 inline-block h-3 w-3 shrink-0 bg-[#8A2B2B]" />
                Fig. 01 — Strategy built on $50M+ in managed spend
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- RULE / SOCIAL PROOF ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 border-y-2 border-[#1C1815] py-6 text-center">
          <p
            className="text-[clamp(1.1rem,2.4vw,1.8rem)] italic"
            style={{ fontFamily: accentSerif }}
          >
            “{s.socialProof}.”
          </p>
        </div>
      </section>

      {/* ---------- FEATURE / EXPERTS (drop cap + columns) ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-10">
              <p className="text-[12px] uppercase tracking-[0.3em] text-[#8A2B2B]">
                Feature
              </p>
              <h3
                className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05]"
                style={{ fontFamily: display, fontWeight: 500 }}
              >
                {s.growth.headline}
              </h3>
              <div className="mt-6 h-px w-16 bg-[#8A2B2B]" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="columns-1 gap-10 md:columns-2 [&>p]:mb-5 [&>p]:text-[1.02rem] [&>p]:leading-[1.75] [&>p]:text-[#1C1815]/75">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[4.5rem] first-letter:leading-[0.7] first-letter:text-[#8A2B2B] first-letter:[font-family:'Fraunces',serif]">
                {s.growth.body}
              </p>
              <p>{s.growth.body2}</p>
              <p>{s.growth.body3}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS (ledger) ---------- */}
      <section className="relative z-10 border-y-2 border-[#1C1815]">
        <div className="mx-auto grid max-w-6xl divide-y divide-[#1C1815]/20 px-6 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 lg:px-10">
          {s.stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 80} className="px-2 py-10 sm:px-6">
              <div
                className="text-[clamp(2.6rem,4.5vw,3.6rem)] leading-none text-[#8A2B2B]"
                style={{ fontFamily: display, fontWeight: 500 }}
              >
                {stat.value}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[#1C1815]/65">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SERVICES (editorial cards) ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="mb-12 flex items-end justify-between border-b border-[#1C1815]/30 pb-4">
            <h3
              className="text-[clamp(1.8rem,3.4vw,2.8rem)]"
              style={{ fontFamily: display, fontWeight: 500 }}
            >
              {s.servicesIntro.headline}
            </h3>
            <span className="hidden text-[12px] uppercase tracking-[0.2em] text-[#1C1815]/50 md:block">
              Six Disciplines
            </span>
          </div>
        </Reveal>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <Reveal key={svc.title} delay={(i % 3) * 80}>
              <article className="group">
                <div className="mb-4 flex items-baseline gap-3 border-b border-[#1C1815]/20 pb-3">
                  <span
                    className="text-[13px] text-[#8A2B2B]"
                    style={{ fontFamily: accentSerif }}
                  >
                    §{i + 1}
                  </span>
                  <h4
                    className="text-[1.3rem] leading-snug transition-colors group-hover:text-[#8A2B2B]"
                    style={{ fontFamily: display, fontWeight: 500 }}
                  >
                    {svc.title}
                  </h4>
                </div>
                <p className="text-[0.95rem] leading-relaxed text-[#1C1815]/70">
                  {svc.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- PULL QUOTE + IMAGE ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal variant="blur" className="relative">
            <Image
              src={s.specializedMarketing.image}
              alt={s.specializedMarketing.imageAlt}
              width={720}
              height={620}
              className="w-full object-cover"
              style={{ filter: "sepia(0.06) contrast(1.02)" }}
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-5 text-[12px] uppercase tracking-[0.3em] text-[#8A2B2B]">
              On Compliance
            </p>
            <blockquote
              className="text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25]"
              style={{ fontFamily: display, fontWeight: 400 }}
            >
              {s.specializedMarketing.headline}
            </blockquote>
            <p className="mt-7 leading-relaxed text-[#1C1815]/70">
              {s.specializedMarketing.body2}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- DOSSIER / WHY CHOOSE ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <Reveal>
          <h3
            className="mb-3 text-[clamp(1.8rem,3.4vw,2.8rem)]"
            style={{ fontFamily: display, fontWeight: 500 }}
          >
            {s.whyChoose.headline}
          </h3>
          <p className="mb-12 max-w-2xl leading-relaxed text-[#1C1815]/70">
            {s.whyChoose.body}
          </p>
        </Reveal>
        <div className="grid gap-px border border-[#1C1815]/25 bg-[#1C1815]/15 sm:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal key={card.title} delay={(i % 2) * 90} className="bg-[#F4EFE6] p-8">
              <h4
                className="flex items-center gap-3 text-[1.25rem]"
                style={{ fontFamily: display, fontWeight: 500 }}
              >
                <span className="text-[#8A2B2B]" style={{ fontFamily: accentSerif }}>
                  0{i + 1}
                </span>
                {card.title}
              </h4>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#1C1815]/70">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <Reveal>
          <h3
            className="mb-10 text-[clamp(1.8rem,3.4vw,2.6rem)]"
            style={{ fontFamily: display, fontWeight: 500 }}
          >
            Correspondence
          </h3>
        </Reveal>
        <div className="border-t-2 border-[#1C1815]">
          {s.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className="border-b border-[#1C1815]/25">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className="text-[1.15rem] leading-snug"
                    style={{
                      fontFamily: display,
                      fontWeight: 500,
                      color: isOpen ? "#8A2B2B" : INK,
                    }}
                  >
                    {f.question}
                  </span>
                  <span
                    className="shrink-0 text-2xl text-[#8A2B2B] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[0.97rem] leading-relaxed text-[#1C1815]/70">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA / BACK PAGE ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-10">
        <Reveal className="border-2 border-[#1C1815] bg-[#1C1815] p-10 text-[#F4EFE6] md:p-16">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="mb-5 text-[12px] uppercase tracking-[0.3em] text-[#E0A0A0]">
                The Invitation
              </p>
              <h3
                className="text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05]"
                style={{ fontFamily: display, fontWeight: 500 }}
              >
                {s.cta.headline}
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-[#F4EFE6]/70">
                {s.cta.body}
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href={s.cta.ctaLink}
                className="group inline-flex items-center gap-3 bg-[#8A2B2B] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#F4EFE6] transition-colors hover:bg-[#a13434]"
              >
                {s.cta.ctaText}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-16 lg:px-10">
        <div className="flex flex-col gap-6 border-t-2 border-[#1C1815] pt-8 text-[12px] uppercase tracking-[0.16em] text-[#1C1815]/60 md:flex-row md:items-center md:justify-between">
          <span style={{ fontFamily: accentSerif }} className="text-base normal-case tracking-normal">
            Marketing Powered
          </span>
          <span>{s.brand.phone}</span>
          <span className="normal-case tracking-normal">{s.footer.copyright}</span>
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 border border-[#1C1815] bg-[#F4EFE6] px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[#1C1815] transition-colors hover:bg-[#1C1815] hover:text-[#F4EFE6]"
      >
        ← Gallery
      </Link>
    </div>
  );
}
