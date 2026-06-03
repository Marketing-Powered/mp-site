"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Bolt } from "@/components/brand";

/* ================================================================== */
/*  DESIGN 4 — "Grid System"                                          */
/*  International Typographic Style. Pure white, rigid 12-col grid,    */
/*  Archivo Black display, single vermillion accent, oversized        */
/*  numerals, hairline rules, relentless negative space.              */
/* ================================================================== */

const RED = "#0090F0";
const black = "#0B0B0B";
const display = "'Archivo Black', sans-serif";
const sans = "'Archivo', system-ui, sans-serif";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: RED }}
    >
      {children}
    </span>
  );
}

export default function Design4() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      style={{ background: "#FFFFFF", color: black, fontFamily: sans }}
      className="relative min-h-screen"
    >
      {/* ---------- NAV ---------- */}
      <header className="sticky top-0 z-30 border-b-2 border-black bg-white">
        <div className="mx-auto flex max-w-[1400px] items-stretch justify-between">
          <div
            className="flex items-center gap-2.5 border-r-2 border-black px-6 py-4 text-[15px] uppercase tracking-tight"
            style={{ fontFamily: display }}
          >
            <Bolt className="h-5 w-5" />
            Marketing Powered
          </div>
          <nav className="hidden items-center md:flex">
            {s.nav.map((n) => (
              <a
                key={n}
                href="#"
                className="border-l border-black/15 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-black hover:text-white"
              >
                {n}
              </a>
            ))}
            <Link
              href={s.hero.ctaLink}
              className="border-l-2 border-black px-7 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90"
              style={{ background: RED }}
            >
              Book a Call
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="grid lg:grid-cols-12">
          <div className="border-black px-6 py-14 lg:col-span-7 lg:border-r-2 lg:py-20 lg:pl-12">
            <div
              className="mb-8 flex items-center gap-4"
              style={{ animation: "mp-fade-in 0.8s ease both" }}
            >
              <Tag>AI Marketing Agency</Tag>
              <span className="h-px flex-1 bg-black/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black/50">
                Est. 2022
              </span>
            </div>
            <h1
              className="text-[clamp(2.5rem,6.2vw,5.4rem)] uppercase leading-[0.92]"
              style={{ fontFamily: display, letterSpacing: "-0.01em" }}
            >
              Knows
              <br />
              <span style={{ color: RED }}>Behavioral</span>
              <br />
              Health.
            </h1>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-black/70">
              {s.hero.subheadline}
            </p>
            <Link
              href={s.hero.ctaLink}
              className="group mt-10 inline-flex items-center gap-3 border-2 border-black px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-white"
            >
              {s.hero.cta}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="relative flex min-h-[300px] items-center justify-center bg-white p-6 lg:col-span-5">
            <Image
              src={s.hero.image}
              alt={s.hero.imageAlt}
              width={760}
              height={475}
              priority
              className="h-auto w-full object-contain"
            />
            <div
              className="absolute bottom-0 left-0 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
              style={{ background: RED }}
            >
              Fig. 01 / Strategy
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BIG STAT BANNER ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black bg-black text-white">
        <div className="flex flex-col items-baseline gap-2 px-6 py-10 md:flex-row md:items-end md:justify-between lg:px-12">
          <div
            className="text-[clamp(3rem,9vw,8rem)] leading-[0.85]"
            style={{ fontFamily: display, color: RED }}
          >
            $50M+
          </div>
          <p className="max-w-md text-[15px] uppercase leading-relaxed tracking-[0.05em] text-white/70">
            {s.socialProof}
          </p>
        </div>
      </section>

      {/* ---------- EXPERTS / GROWTH ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="grid lg:grid-cols-12">
          <Reveal className="border-black px-6 py-16 lg:col-span-4 lg:border-r-2 lg:px-12">
            <Tag>01 — Origin</Tag>
            <h2
              className="mt-5 text-[clamp(1.8rem,2.6vw,2.6rem)] uppercase leading-[0.98]"
              style={{ fontFamily: display }}
            >
              {s.growth.headline}
            </h2>
          </Reveal>
          <Reveal delay={120} className="px-6 py-16 lg:col-span-8 lg:px-12">
            <p className="max-w-2xl text-[1.15rem] leading-[1.7]">{s.growth.body}</p>
            <div className="mt-10 grid gap-8 border-t-2 border-black pt-8 sm:grid-cols-2">
              <p className="text-[0.95rem] leading-relaxed text-black/70">
                {s.growth.body2}
              </p>
              <p className="text-[0.95rem] leading-relaxed text-black/70">
                {s.growth.body3}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS GRID ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 70}
              className={`group px-6 py-12 lg:px-8 ${
                i < s.stats.length - 1 ? "border-b-2 sm:border-b-0 lg:border-r-2" : ""
              } ${i % 2 === 0 ? "border-r-2 sm:border-r-2" : ""} border-black transition-colors hover:bg-black hover:text-white`}
            >
              <div className="text-[11px] font-bold tracking-[0.2em] text-black/40 group-hover:text-white/40">
                / 0{i + 1}
              </div>
              <div
                className="mt-4 text-[clamp(2.6rem,4.5vw,3.8rem)] leading-none transition-colors"
                style={{ fontFamily: display }}
              >
                <span className="group-hover:hidden">{stat.value}</span>
                <span className="hidden group-hover:inline" style={{ color: RED }}>
                  {stat.value}
                </span>
              </div>
              <p className="mt-5 text-[13px] leading-relaxed text-black/65 group-hover:text-white/70">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SERVICES (numbered grid) ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="border-b-2 border-black px-6 py-10 lg:px-12">
          <Tag>02 — Capabilities</Tag>
          <h2
            className="mt-4 max-w-3xl text-[clamp(1.8rem,3.4vw,3rem)] uppercase leading-[1.0]"
            style={{ fontFamily: display }}
          >
            {s.servicesIntro.headline}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <Reveal
              key={svc.title}
              delay={(i % 3) * 70}
              className={`group px-6 py-10 lg:px-8 ${
                (i + 1) % 3 !== 0 ? "lg:border-r-2" : ""
              } ${i % 2 === 0 ? "md:border-r-2 lg:border-r-2" : ""} ${
                i < s.services.length - (s.services.length % 3 || 3) ? "border-b-2" : ""
              } border-black`}
            >
              <div
                className="text-[2.5rem] leading-none text-black/15 transition-colors group-hover:text-[color:var(--r)]"
                style={{ fontFamily: display, ["--r" as string]: RED }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-[1.2rem] font-bold uppercase tracking-tight">
                {svc.title}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-black/65">
                {svc.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SPECIALIZED ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="grid lg:grid-cols-12">
          <div className="relative flex min-h-[320px] items-center justify-center border-black bg-white p-6 lg:col-span-5 lg:border-r-2">
            <Image
              src={s.specializedMarketing.image}
              alt={s.specializedMarketing.imageAlt}
              width={760}
              height={475}
              className="h-auto w-full object-contain"
            />
          </div>
          <Reveal className="px-6 py-16 lg:col-span-7 lg:px-12">
            <Tag>03 — The Discipline</Tag>
            <h2
              className="mt-5 text-[clamp(1.8rem,3vw,2.8rem)] uppercase leading-[1.0]"
              style={{ fontFamily: display }}
            >
              {s.specializedMarketing.headline}
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-black/70">
              {s.specializedMarketing.body}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-black/60">
              {s.specializedMarketing.body3}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHY CHOOSE ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="border-b-2 border-black px-6 py-10 lg:px-12">
          <Tag>04 — Evidence</Tag>
          <h2
            className="mt-4 max-w-3xl text-[clamp(1.8rem,3.4vw,3rem)] uppercase leading-[1.0]"
            style={{ fontFamily: display }}
          >
            {s.whyChoose.headline}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 2) * 80}
              className={`px-6 py-10 lg:px-12 ${i % 2 === 0 ? "sm:border-r-2" : ""} ${
                i < 2 ? "border-b-2" : ""
              } border-black`}
            >
              <h3 className="flex items-baseline gap-4 text-[1.2rem] font-bold uppercase tracking-tight">
                <span style={{ color: RED, fontFamily: display }}>0{i + 1}</span>
                {card.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-black/65">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-[1400px] border-b-2 border-black">
        <div className="grid lg:grid-cols-12">
          <div className="border-black px-6 py-12 lg:col-span-4 lg:border-r-2 lg:px-12">
            <Tag>05 — Questions</Tag>
            <h2
              className="mt-4 text-[clamp(1.8rem,2.6vw,2.4rem)] uppercase leading-[1.0]"
              style={{ fontFamily: display }}
            >
              The Common Five
            </h2>
          </div>
          <div className="lg:col-span-8">
            {s.faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.question}
                  className={`${i < s.faq.length - 1 ? "border-b-2" : ""} border-black`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 px-6 py-6 text-left lg:px-12"
                  >
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: RED, fontFamily: display }}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1 text-[1.05rem] font-bold uppercase tracking-tight">
                      {f.question}
                    </span>
                    <span
                      className="text-2xl transition-transform duration-300"
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
                      <p className="px-6 pb-6 pl-[3.4rem] text-[0.95rem] leading-relaxed text-black/65 lg:px-12 lg:pl-[5.4rem]">
                        {f.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section
        className="mx-auto max-w-[1400px] border-b-2 border-black text-white"
        style={{ background: RED }}
      >
        <div className="grid lg:grid-cols-12">
          <div className="px-6 py-16 lg:col-span-8 lg:px-12 lg:py-24">
            <h2
              className="text-[clamp(2rem,4.4vw,3.6rem)] uppercase leading-[0.98]"
              style={{ fontFamily: display }}
            >
              {s.cta.headline}
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-white/85">
              {s.cta.body}
            </p>
          </div>
          <div className="flex items-center justify-center border-white/20 px-6 py-12 lg:col-span-4 lg:border-l-2">
            <Link
              href={s.cta.ctaLink}
              className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-black"
            >
              {s.cta.ctaText}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 px-6 py-12 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4">
            <div
              className="flex items-center gap-2.5 text-[15px] uppercase"
              style={{ fontFamily: display }}
            >
              <Bolt className="h-5 w-5" />
              Marketing Powered
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-black/55">
              {s.footer.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-black/60 lg:col-span-6">
            {s.footer.services.map((svc) => (
              <a key={svc} href="#" className="transition-colors hover:text-[color:var(--r)]" style={{ ["--r" as string]: RED }}>
                {svc}
              </a>
            ))}
          </div>
          <div className="text-[12px] text-black/45 lg:col-span-2">
            {s.brand.phone}
          </div>
        </div>
        <div className="border-t-2 border-black px-6 py-5 text-[11px] uppercase tracking-[0.12em] text-black/45 lg:px-12">
          {s.footer.copyright}
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-black hover:text-white"
      >
        ← Gallery
      </Link>
    </div>
  );
}
