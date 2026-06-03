"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* ================================================================== */
/*  DESIGN 1 — "Midnight Atelier"                                      */
/*  Cinematic near-black canvas, high-contrast Fraunces serif,         */
/*  champagne→amber gradient hairlines, film-grain atmosphere.         */
/*  Think Linear's precision dressed in luxury-brand restraint.        */
/* ================================================================== */

const INK = "#0A0A0B";
const serif = "'Fraunces', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";
const mono = "'Space Mono', monospace";

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-px w-full origin-left ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, #C9A24B 18%, #F5E6BE 50%, #C9A24B 82%, transparent)",
      }}
    />
  );
}

export default function Design1() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      style={{ background: INK, color: "#EDEAE3", fontFamily: sans }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* film-grain + vignette atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(201,162,75,0.10), transparent 55%), radial-gradient(80% 60% at 100% 120%, rgba(201,162,75,0.06), transparent 60%)",
        }}
      />

      {/* ---------- NAV ---------- */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-12">
        <div
          className="text-lg tracking-tight"
          style={{ fontFamily: serif, fontWeight: 600 }}
        >
          Marketing<span style={{ color: "#C9A24B" }}>.</span>Powered
        </div>
        <nav className="hidden items-center gap-9 text-[13px] tracking-wide text-white/55 md:flex">
          {s.nav.map((n) => (
            <a
              key={n}
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              {n}
            </a>
          ))}
        </nav>
        <Link
          href={s.hero.ctaLink}
          className="group relative hidden overflow-hidden rounded-full border border-white/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black sm:inline-flex"
        >
          <span className="relative z-10">Book a Call</span>
          <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#F5E6BE] to-[#C9A24B] transition-transform duration-300 group-hover:translate-y-0" />
        </Link>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div
              className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#C9A24B]"
              style={{
                animation: "mp-fade-in 1s ease both",
                fontFamily: mono,
              }}
            >
              <span className="inline-block h-px w-8 bg-[#C9A24B]" />
              AI-Native Since 2022
            </div>

            <h1
              className="text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.98]"
              style={{
                fontFamily: serif,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              {"Partner with an AI agency that "}
              <span
                className="italic"
                style={{
                  background:
                    "linear-gradient(100deg,#F5E6BE,#C9A24B 60%,#9c7a2e)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                knows
              </span>
              {" behavioral health"}
            </h1>

            <p className="mt-8 max-w-xl text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-white/55">
              {s.hero.subheadline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={s.hero.ctaLink}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#F5E6BE] to-[#C9A24B] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(201,162,75,0.6)]"
              >
                <span className="relative z-10">{s.hero.cta}</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <span
                className="text-[12px] uppercase tracking-[0.22em] text-white/40"
                style={{ fontFamily: mono }}
              >
                {s.socialProof}
              </span>
            </div>
          </div>

          {/* framed hero image */}
          <div
            className="relative"
            style={{
              animation: "mp-blur-in 1.2s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <div
              className="absolute -inset-px rounded-[28px] opacity-70"
              style={{
                background:
                  "linear-gradient(140deg, rgba(201,162,75,0.6), transparent 40%, transparent 70%, rgba(201,162,75,0.35))",
              }}
            />
            <div className="relative overflow-hidden rounded-[27px] border border-white/10">
              <Image
                src={s.hero.image}
                alt={s.hero.imageAlt}
                width={900}
                height={1000}
                priority
                className="h-[clamp(360px,52vw,560px)] w-full object-cover"
                style={{ filter: "saturate(1.05) contrast(1.04)" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,11,0.7), transparent 45%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <section className="relative z-10 border-y border-white/8 py-6">
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
            style={{ animation: "mp-marquee 32s linear infinite" }}
          >
            {[...Array(2)].map((_, dup) =>
              [
                "$50M+ Managed Ad Spend",
                "847% ROAS",
                "$42 Cost Per Admission",
                "0 Account Suspensions",
                "312% Organic Growth",
                "HIPAA-Conscious Infrastructure",
              ].map((t, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-16 text-[15px] uppercase tracking-[0.2em] text-white/35"
                  style={{ fontFamily: serif, fontStyle: "italic" }}
                >
                  {t}
                  <span className="text-[#C9A24B]">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </section>

      {/* ---------- GROWTH / EXPERTS ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal variant="blur" className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[24px] border border-white/10">
              <Image
                src={s.growth.image}
                alt={s.growth.imageAlt}
                width={800}
                height={760}
                className="h-[clamp(340px,42vw,520px)] w-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-4 rounded-2xl border border-[#C9A24B]/30 bg-[#0A0A0B]/80 px-6 py-5 backdrop-blur"
              style={{ boxShadow: "0 24px 60px -20px rgba(0,0,0,0.8)" }}
            >
              <div
                className="text-3xl"
                style={{ fontFamily: serif, color: "#F5E6BE" }}
              >
                3 → 24
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                Haven Health locations
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p
                className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#C9A24B]"
                style={{ fontFamily: mono }}
              >
                The Operator&apos;s Seat
              </p>
              <h2
                className="text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]"
                style={{ fontFamily: serif, fontWeight: 400 }}
              >
                {s.growth.headline}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 text-[1.05rem] leading-relaxed text-white/60">
                {s.growth.body}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <GoldRule className="my-8 max-w-xs" />
              <p className="text-[0.98rem] leading-relaxed text-white/45">
                {s.growth.body2}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 90}
              className="bg-[#0A0A0B] p-8"
            >
              <div
                className="text-[clamp(2.4rem,4vw,3.4rem)] leading-none"
                style={{
                  fontFamily: serif,
                  background: "linear-gradient(180deg,#F5E6BE,#C9A24B)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {stat.value}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-white/45">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SERVICES (editorial index) ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <Reveal className="mb-14 max-w-2xl">
          <p
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#C9A24B]"
            style={{ fontFamily: mono }}
          >
            Capabilities
          </p>
          <h2
            className="text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {s.servicesIntro.headline}
          </h2>
        </Reveal>

        <div className="border-t border-white/10">
          {s.services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 60}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[80px_0.9fr_1.4fr] md:gap-10">
                <span
                  className="text-sm text-white/30 transition-colors group-hover:text-[#C9A24B]"
                  style={{ fontFamily: mono }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="col-span-1 text-[1.35rem] leading-snug transition-transform duration-500 group-hover:translate-x-1"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  {svc.title}
                </h3>
                <p className="col-span-2 text-[0.95rem] leading-relaxed text-white/45 md:col-span-1">
                  {svc.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SPECIALIZED (image left) ---------- */}
      <section className="relative z-10 overflow-hidden border-y border-white/8 py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
          <Reveal>
            <p
              className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#C9A24B]"
              style={{ fontFamily: mono }}
            >
              Why Specialized
            </p>
            <h2
              className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {s.specializedMarketing.headline}
            </h2>
            <p className="mt-7 leading-relaxed text-white/55">
              {s.specializedMarketing.body}
            </p>
            <p className="mt-5 leading-relaxed text-white/40">
              {s.specializedMarketing.body3}
            </p>
          </Reveal>
          <Reveal variant="blur" delay={120} className="relative">
            <div className="overflow-hidden rounded-[24px] border border-white/10">
              <Image
                src={s.specializedMarketing.image}
                alt={s.specializedMarketing.imageAlt}
                width={760}
                height={680}
                className="h-[clamp(320px,40vw,500px)] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- RESULTS / WHY CHOOSE ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <Reveal className="mb-14 max-w-2xl">
          <h2
            className="text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {s.whyChoose.headline}
          </h2>
          <p className="mt-6 leading-relaxed text-white/50">
            {s.whyChoose.body}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 80}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-[#C9A24B]/40"
            >
              <span
                className="absolute right-6 top-6 text-5xl text-white/5 transition-colors group-hover:text-[#C9A24B]/20"
                style={{ fontFamily: serif }}
              >
                0{i + 1}
              </span>
              <h3
                className="text-xl"
                style={{ fontFamily: serif, fontWeight: 500, color: "#F5E6BE" }}
              >
                {card.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/50">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 lg:px-12">
        <Reveal>
          <h2
            className="mb-12 text-center text-[clamp(1.9rem,3.4vw,2.8rem)]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Questions, answered.
          </h2>
        </Reveal>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {s.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className="text-[1.1rem] leading-snug transition-colors"
                    style={{
                      fontFamily: serif,
                      color: isOpen ? "#F5E6BE" : "#EDEAE3",
                    }}
                  >
                    {f.question}
                  </span>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-[#C9A24B] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-[0.97rem] leading-relaxed text-white/50">
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
      <section className="relative z-10 px-6 pb-28 lg:px-12">
        <Reveal
          variant="blur"
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10"
        >
          <Image
            src={s.cta.image}
            alt={s.cta.imageAlt}
            width={1400}
            height={700}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(10,10,11,0.92), rgba(10,10,11,0.7))",
            }}
          />
          <div className="relative px-8 py-20 text-center md:px-16 md:py-28">
            <h2
              className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {s.cta.headline}
            </h2>
            <p className="mx-auto mt-7 max-w-xl leading-relaxed text-white/55">
              {s.cta.body}
            </p>
            <Link
              href={s.cta.ctaLink}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F5E6BE] to-[#C9A24B] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
            >
              {s.cta.ctaText}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-10 border-t border-white/8 px-6 py-14 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg" style={{ fontFamily: serif }}>
              Marketing<span style={{ color: "#C9A24B" }}>.</span>Powered
            </div>
            <p className="mt-2 max-w-xs text-[13px] text-white/40">
              {s.footer.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-white/45">
            {s.footer.services.map((svc) => (
              <a
                key={svc}
                href="#"
                className="transition-colors hover:text-[#C9A24B]"
              >
                {svc}
              </a>
            ))}
          </div>
        </div>
        <p
          className="mx-auto mt-10 max-w-7xl text-[12px] text-white/25"
          style={{ fontFamily: mono }}
        >
          {s.footer.copyright}
        </p>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/70 backdrop-blur transition-colors hover:text-white"
      >
        <span style={{ color: "#C9A24B" }}>←</span> Gallery
      </Link>
    </div>
  );
}
