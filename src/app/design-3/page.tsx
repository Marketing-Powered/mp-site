"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* ================================================================== */
/*  DESIGN 3 — "Aurora"                                                */
/*  Modern SaaS in the Stripe lineage. Deep space base, animated       */
/*  mesh-gradient orbs (indigo→fuchsia→cyan), frosted glass cards,      */
/*  floating UI fragments, Sora geometric sans. Density + motion.      */
/* ================================================================== */

const BASE = "#070711";
const sans = "'Sora', system-ui, sans-serif";

const GRAD = "linear-gradient(110deg,#7C5CFF,#C04BFF 45%,#34E2D6)";

function Orb({
  className,
  color,
  delay = 0,
}: {
  className: string;
  color: string;
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{
        background: color,
        animation: `mp-float-slow ${16 + delay}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

export default function Design3() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      style={{ background: BASE, color: "#EDEBFF", fontFamily: sans }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* mesh orbs */}
      <Orb className="left-[-10%] top-[-8%] h-[480px] w-[480px] opacity-60" color="#5B3CFF" />
      <Orb className="right-[-8%] top-[18%] h-[420px] w-[420px] opacity-50" color="#C04BFF" delay={3} />
      <Orb className="bottom-[10%] left-[20%] h-[460px] w-[460px] opacity-40" color="#1FB6C9" delay={6} />
      {/* grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 80% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* ---------- NAV ---------- */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-black"
            style={{ background: GRAD }}
          >
            ◆
          </span>
          Marketing Powered
        </div>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {s.nav.map((n) => (
            <a key={n} href="#" className="transition-colors hover:text-white">
              {n}
            </a>
          ))}
        </nav>
        <Link
          href={s.hero.ctaLink}
          className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-black transition-transform hover:scale-[1.04]"
          style={{ background: GRAD }}
        >
          Book a Call
        </Link>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-14 text-center lg:px-10 lg:pt-24">
        <div
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] text-white/70 backdrop-blur"
          style={{ animation: "mp-fade-in 0.9s ease both" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#34E2D6", boxShadow: "0 0 10px #34E2D6" }}
          />
          AI-native since 2022 · HIPAA-conscious
        </div>

        <h1
          className="mx-auto max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight"
          style={{ animation: "mp-blur-in 1s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          The AI marketing engine for{" "}
          <span
            style={{
              background: GRAD,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            behavioral health
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-white/60">
          {s.hero.subheadline}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={s.hero.ctaLink}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold text-black transition-transform hover:scale-[1.04]"
            style={{ background: GRAD }}
          >
            {s.hero.cta}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <span className="text-[13px] text-white/45">{s.socialProof}</span>
        </div>

        {/* floating glass dashboard */}
        <Reveal
          variant="blur"
          delay={150}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div
            className="absolute -inset-[1px] rounded-3xl opacity-70 blur-md"
            style={{ background: GRAD }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[12px] text-white/40">
                marketingpowered.ai — live attribution
              </span>
            </div>
            <Image
              src={s.hero.image}
              alt={s.hero.imageAlt}
              width={1200}
              height={620}
              priority
              className="h-[clamp(260px,38vw,460px)] w-full object-cover opacity-90"
            />
          </div>
          {/* floating stat chips */}
          <div className="absolute -left-4 top-1/3 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-xl md:block" style={{ animation: "mp-float 7s ease-in-out infinite" }}>
            <div className="text-xl font-bold" style={{ color: "#34E2D6" }}>847%</div>
            <div className="text-[11px] text-white/60">ROAS</div>
          </div>
          <div className="absolute -right-4 bottom-1/4 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-xl md:block" style={{ animation: "mp-float 9s ease-in-out 1s infinite" }}>
            <div className="text-xl font-bold" style={{ color: "#C04BFF" }}>$42</div>
            <div className="text-[11px] text-white/60">cost / admission</div>
          </div>
        </Reveal>
      </section>

      {/* ---------- LOGO STRIP / PROOF ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[13px] uppercase tracking-[0.18em] text-white/35">
          {["$1.5–2M / mo Google Ads", "LegitScript Compliant", "Mac Studio M3 Clusters", "Full-Funnel Attribution"].map(
            (t) => (
              <span key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-white/40" /> {t}
              </span>
            ),
          )}
        </div>
      </section>

      {/* ---------- EXPERTS / GROWTH ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#C04BFF" }}>
              Built by operators
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] font-bold leading-[1.08]">
              {s.growth.headline}
            </h2>
            <p className="mt-6 leading-relaxed text-white/60">{s.growth.body}</p>
            <p className="mt-5 leading-relaxed text-white/45">{s.growth.body3}</p>
          </Reveal>
          <Reveal variant="blur" delay={120} className="relative">
            <div
              className="absolute -inset-[1px] rounded-3xl opacity-60 blur-md"
              style={{ background: GRAD }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={s.growth.image}
                alt={s.growth.imageAlt}
                width={720}
                height={620}
                className="h-[clamp(320px,40vw,480px)] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- STATS (glass) ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 80}
              className="rounded-3xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-md transition-colors hover:border-white/25"
            >
              <div
                className="text-[clamp(2.2rem,4vw,3rem)] font-bold leading-none"
                style={{
                  background: GRAD,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {stat.value}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-white/55">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SERVICES (glass bento) ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#34E2D6" }}>
            The platform
          </span>
          <h2 className="mt-4 text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1]">
            {s.servicesIntro.headline}
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <Reveal
              key={svc.title}
              delay={(i % 3) * 90}
              className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] p-7 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: GRAD }}
              />
              <div
                className="mb-5 grid h-11 w-11 place-items-center rounded-xl text-black"
                style={{ background: GRAD }}
              >
                {["◎", "⊹", "▤", "⛨", "⚡", "⌘"][i]}
              </div>
              <h3 className="text-[1.2rem] font-semibold">{svc.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">
                {svc.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SPECIALIZED (split glass) ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Reveal className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] backdrop-blur-md">
          <div className="grid lg:grid-cols-2">
            <div className="p-10 md:p-14">
              <span className="text-[13px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#C04BFF" }}>
                Compliance-first
              </span>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-[1.12]">
                {s.specializedMarketing.headline}
              </h2>
              <p className="mt-6 leading-relaxed text-white/60">
                {s.specializedMarketing.body}
              </p>
              <p className="mt-5 leading-relaxed text-white/45">
                {s.specializedMarketing.body4}
              </p>
            </div>
            <div className="relative min-h-[300px]">
              <Image
                src={s.specializedMarketing.image}
                alt={s.specializedMarketing.imageAlt}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(7,7,17,0.6), transparent 30%)",
                }}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- WHY CHOOSE ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1]">
            {s.whyChoose.headline}
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 2) * 90}
              className="rounded-3xl border border-white/12 bg-white/[0.03] p-8 backdrop-blur-md"
            >
              <h3 className="flex items-center gap-3 text-[1.2rem] font-semibold">
                <span
                  className="grid h-7 w-7 place-items-center rounded-lg text-[12px] font-bold text-black"
                  style={{ background: GRAD }}
                >
                  {i + 1}
                </span>
                {card.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <h2 className="mb-10 text-center text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold">
            Frequently asked
          </h2>
        </Reveal>
        <div className="space-y-3">
          {s.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.question}
                className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] backdrop-blur-md"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-medium">{f.question}</span>
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-black transition-transform duration-300"
                    style={{
                      background: GRAD,
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-white/55">
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
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <Reveal variant="blur" className="relative overflow-hidden rounded-[2.5rem] p-[1.5px]">
          <div className="absolute inset-0" style={{ background: GRAD }} />
          <div className="relative overflow-hidden rounded-[2.4rem] bg-[#0A0A18] px-8 py-20 text-center md:px-16">
            <Orb className="left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 opacity-40" color="#7C5CFF" />
            <h2 className="relative mx-auto max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.08]">
              {s.cta.headline}
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl leading-relaxed text-white/60">
              {s.cta.body}
            </p>
            <Link
              href={s.cta.ctaLink}
              className="relative mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 text-[14px] font-semibold text-black transition-transform hover:scale-[1.04]"
              style={{ background: GRAD }}
            >
              {s.cta.ctaText}
              <span>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-14 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5 text-[16px] font-semibold">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg text-black"
              style={{ background: GRAD }}
            >
              ◆
            </span>
            Marketing Powered
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-white/50">
            {s.footer.services.map((svc) => (
              <a key={svc} href="#" className="transition-colors hover:text-white">
                {svc}
              </a>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-[12px] text-white/30">
          {s.footer.copyright}
        </p>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] text-white/70 backdrop-blur transition-colors hover:text-white"
      >
        ← Gallery
      </Link>
    </div>
  );
}
