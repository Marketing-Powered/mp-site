"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";

/* ================================================================== */
/*  DESIGN 5 — "The Descent"                                          */
/*  Immersive full-viewport scroll. Each chapter is its own world     */
/*  with proximity snap, fixed-attachment parallax imagery, and       */
/*  scroll-triggered reveals. Bricolage Grotesque display.            */
/*  Apple product page meets cinematic agency reel.                   */
/* ================================================================== */

const display = "'Bricolage Grotesque', system-ui, sans-serif";
const sans = "'Manrope', system-ui, sans-serif";
const LIME = "#C6F24E";

export default function Design5() {
  const [open, setOpen] = useState<number | null>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("mp-snap");
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.documentElement.classList.remove("mp-snap");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div style={{ background: "#08090C", color: "#F2F2EC", fontFamily: sans }}>
      <style>{`
        .mp-snap { scroll-snap-type: y proximity; }
        .mp-chapter { scroll-snap-align: start; }
        .mp-parallax {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }
        @media (max-width: 768px) { .mp-parallax { background-attachment: scroll; } }
      `}</style>

      {/* scroll progress rail */}
      <div className="fixed right-5 top-1/2 z-50 hidden h-40 w-px -translate-y-1/2 bg-white/15 md:block">
        <div
          className="w-px origin-top"
          style={{ height: "100%", background: LIME, transform: `scaleY(${progress})` }}
        />
      </div>

      {/* fixed corner brand */}
      <div className="fixed left-6 top-6 z-50 text-[13px] font-bold uppercase tracking-[0.2em] mix-blend-difference">
        Marketing Powered
      </div>
      <Link
        href={s.hero.ctaLink}
        className="fixed right-6 top-6 z-50 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-black"
        style={{ background: LIME }}
      >
        Book a Call
      </Link>

      {/* ---------- CHAPTER 00 — HERO ---------- */}
      <section className="mp-chapter relative flex min-h-screen items-end overflow-hidden">
        <div
          className="mp-parallax absolute inset-0"
          style={{ backgroundImage: `url(${s.hero.image})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,9,12,0.96) 4%, rgba(8,9,12,0.35) 55%, rgba(8,9,12,0.7))",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 lg:px-12">
          <div
            className="mb-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.3em]"
            style={{ color: LIME, animation: "mp-fade-in 1s ease both" }}
          >
            <span className="h-px w-10" style={{ background: LIME }} />
            AI Marketing for Behavioral Health
          </div>
          <h1
            className="max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92] tracking-tight"
            style={{ fontFamily: display, fontWeight: 700, animation: "mp-blur-in 1.2s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {s.hero.headline}
          </h1>
          <p className="mt-7 max-w-xl text-[1.1rem] leading-relaxed text-white/70">
            {s.hero.subheadline}
          </p>
          <div className="mt-10 flex items-center gap-5 text-[12px] uppercase tracking-[0.2em] text-white/45">
            <span className="animate-bounce">↓</span> Scroll to descend
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 01 — OPERATORS ---------- */}
      <section
        className="mp-chapter relative flex min-h-screen items-center"
        style={{ background: "#0E1A17" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 50%, rgba(198,242,78,0.18), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-12">
          <div>
            <Reveal>
              <p className="text-[12px] uppercase tracking-[0.3em]" style={{ color: LIME }}>
                Chapter 01 — The Operators
              </p>
              <h2
                className="mt-5 text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02]"
                style={{ fontFamily: display, fontWeight: 600 }}
              >
                {s.growth.headline}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-7 max-w-lg leading-relaxed text-white/65">
                {s.growth.body}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 flex items-end gap-6">
                <span
                  className="text-[clamp(4rem,9vw,7rem)] leading-[0.8]"
                  style={{ fontFamily: display, fontWeight: 700, color: LIME }}
                >
                  3→24
                </span>
                <span className="mb-3 max-w-[12rem] text-[13px] uppercase leading-snug tracking-[0.1em] text-white/50">
                  Haven Health locations scaled under our leadership
                </span>
              </div>
            </Reveal>
          </div>
          <Reveal variant="blur" delay={150} className="relative">
            <div className="overflow-hidden rounded-[28px]">
              <Image
                src={s.growth.image}
                alt={s.growth.imageAlt}
                width={760}
                height={760}
                className="h-[clamp(340px,46vw,560px)] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CHAPTER 02 — THE NUMBERS ---------- */}
      <section className="mp-chapter relative flex min-h-screen flex-col justify-center bg-black py-20">
        <Reveal className="mx-auto mb-14 w-full max-w-7xl px-6 lg:px-12">
          <p className="text-[12px] uppercase tracking-[0.3em]" style={{ color: LIME }}>
            Chapter 02 — The Numbers
          </p>
          <h2
            className="mt-4 text-[clamp(1.8rem,3.4vw,3rem)]"
            style={{ fontFamily: display, fontWeight: 600 }}
          >
            Proof, not adjectives.
          </h2>
        </Reveal>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {s.stats.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 90}>
                <div className="group flex flex-col gap-2 py-8 md:flex-row md:items-center md:justify-between">
                  <span
                    className="text-[clamp(3rem,8vw,6rem)] leading-[0.85] transition-colors group-hover:text-[color:var(--l)]"
                    style={{ fontFamily: display, fontWeight: 700, ["--l" as string]: LIME }}
                  >
                    {stat.value}
                  </span>
                  <p className="max-w-md text-[14px] leading-relaxed text-white/55 md:text-right">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 03 — CAPABILITIES (light world) ---------- */}
      <section
        className="mp-chapter relative flex min-h-screen flex-col justify-center py-20"
        style={{ background: "#F2F2EC", color: "#0B0B0B" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.3em] text-[#5a7a1f]">
              Chapter 03 — The System
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.04]"
              style={{ fontFamily: display, fontWeight: 600 }}
            >
              {s.servicesIntro.headline}
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
            {s.services.map((svc, i) => (
              <Reveal
                key={svc.title}
                delay={(i % 3) * 80}
                className="group bg-[#F2F2EC] p-8 transition-colors hover:bg-white"
              >
                <div
                  className="text-[2.4rem] leading-none text-black/15 transition-colors group-hover:text-[#5a7a1f]"
                  style={{ fontFamily: display, fontWeight: 700 }}
                >
                  0{i + 1}
                </div>
                <h3 className="mt-5 text-[1.25rem] font-bold" style={{ fontFamily: display }}>
                  {svc.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-black/60">
                  {svc.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 04 — COMPLIANCE (parallax) ---------- */}
      <section className="mp-chapter relative flex min-h-screen items-center overflow-hidden">
        <div
          className="mp-parallax absolute inset-0"
          style={{ backgroundImage: `url(${s.specializedMarketing.image})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(8,9,12,0.94) 30%, rgba(8,9,12,0.55))",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.3em]" style={{ color: LIME }}>
              Chapter 04 — The Constraints
            </p>
            <h2
              className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.02]"
              style={{ fontFamily: display, fontWeight: 600 }}
            >
              {s.specializedMarketing.headline}
            </h2>
            <p className="mt-7 leading-relaxed text-white/70">
              {s.specializedMarketing.body}
            </p>
            <p className="mt-5 leading-relaxed text-white/50">
              {s.specializedMarketing.body3}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- CHAPTER 05 — EVIDENCE ---------- */}
      <section
        className="mp-chapter relative flex min-h-screen flex-col justify-center py-20"
        style={{ background: "#0E1A17" }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.3em]" style={{ color: LIME }}>
              Chapter 05 — The Evidence
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.04]"
              style={{ fontFamily: display, fontWeight: 600 }}
            >
              {s.whyChoose.headline}
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {s.whyChoose.cards.map((card, i) => (
              <Reveal
                key={card.title}
                delay={(i % 2) * 90}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[color:var(--l)]"
                style={{ ["--l" as string]: LIME }}
              >
                <h3 className="text-[1.25rem]" style={{ fontFamily: display, fontWeight: 600 }}>
                  <span style={{ color: LIME }}>0{i + 1} </span>
                  {card.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">
                  {card.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 06 — FAQ + CTA (no snap, flows) ---------- */}
      <section className="relative bg-black py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <Reveal>
            <h2
              className="mb-10 text-[clamp(1.9rem,3.4vw,2.8rem)]"
              style={{ fontFamily: display, fontWeight: 600 }}
            >
              Before you descend.
            </h2>
          </Reveal>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {s.faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.question}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className="text-[1.08rem]"
                      style={{ fontFamily: display, fontWeight: 500, color: isOpen ? LIME : "#F2F2EC" }}
                    >
                      {f.question}
                    </span>
                    <span
                      className="shrink-0 text-2xl transition-transform duration-300"
                      style={{ color: LIME, transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-[0.95rem] leading-relaxed text-white/55">
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

      {/* ---------- FINAL CTA ---------- */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div
          className="mp-parallax absolute inset-0"
          style={{ backgroundImage: `url(${s.cta.image})` }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center lg:px-12">
          <Reveal variant="blur">
            <h2
              className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.0]"
              style={{ fontFamily: display, fontWeight: 700 }}
            >
              {s.cta.headline}
            </h2>
            <p className="mx-auto mt-7 max-w-xl leading-relaxed text-white/70">
              {s.cta.body}
            </p>
            <Link
              href={s.cta.ctaLink}
              className="group mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-black"
              style={{ background: LIME }}
            >
              {s.cta.ctaText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-white/10 bg-[#08090C] px-6 py-12 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="text-[14px] font-bold uppercase tracking-[0.18em]">
            Marketing Powered
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/45">
            {s.footer.services.map((svc) => (
              <a key={svc} href="#" className="transition-colors hover:text-white">
                {svc}
              </a>
            ))}
          </div>
          <span className="text-[12px] text-white/30">{s.footer.copyright}</span>
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/75 backdrop-blur transition-colors hover:text-white"
      >
        ← Gallery
      </Link>
    </div>
  );
}
