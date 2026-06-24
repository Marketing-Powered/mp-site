"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Logo, brand } from "@/components/brand";

/* ================================================================== */
/*  DESIGN 6 — "Console"                                              */
/*  A conversion-focused landing page in the language of a modern      */
/*  AI / dev-tool company (Vercel / Linear / Warp lineage). The         */
/*  terminal is a styling layer — monospace chrome, code windows as     */
/*  product visuals, a live attribution feed — wrapped around a real    */
/*  marketing site with strong hierarchy and repeated CTAs. Speaks      */
/*  to treatment-center operators: growth, compliance, attribution.     */
/* ================================================================== */

const mono = "var(--font-space-mono), ui-monospace, monospace";
const sans = "var(--font-manrope), system-ui, sans-serif";
const BG = "#07090F";
const PANEL = "#0C111B";
const BLUE = brand.blue;
const GREEN = brand.green;
const CYAN = brand.cyan;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] tracking-wider" style={{ fontFamily: mono, color: CYAN }}>
      {children}
    </span>
  );
}

function Window({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 ${className}`}
      style={{ background: PANEL, boxShadow: "0 40px 80px -50px rgba(0,144,240,0.5)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: GREEN }} />
        <span className="ml-2 text-[12px] text-white/40" style={{ fontFamily: mono }}>
          {title}
        </span>
      </div>
      <div className="p-4" style={{ fontFamily: mono }}>
        {children}
      </div>
    </div>
  );
}

const feed = [
  { t: "09:42:01", k: "click", v: "src=google/bh-detox → lp variant B", c: CYAN },
  { t: "09:42:03", k: "form_fill", v: "predicted score 0.91 · high intent", c: BLUE },
  { t: "09:42:04", k: "route", v: "→ intake priority queue", c: CYAN },
  { t: "09:42:55", k: "admission ✓", v: "channel=google · cpa=$42", c: GREEN },
];

export default function Design6() {
  const [open, setOpen] = useState<number | null>(0);

  const ctaPrimary =
    "inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[14px] font-bold text-black transition-transform hover:scale-[1.03]";

  return (
    <div style={{ background: BG, color: "#C7D2E0", fontFamily: sans }} className="relative min-h-screen overflow-hidden">
      <style>{`
        .mp-caret { animation: mp-blink 1.1s steps(1) infinite; }
        @keyframes mp-blink { 50% { opacity: 0; } }
      `}</style>
      {/* grid + glow atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(130% 80% at 50% 0%, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(70% 50% at 80% -5%, rgba(0,144,240,0.12), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(0,168,96,0.08), transparent 60%)",
        }}
      />

      {/* ---------- NAV ---------- */}
      <header className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Logo tone="light" />
        <nav className="hidden items-center gap-8 text-[13px] text-white/55 md:flex" style={{ fontFamily: mono }}>
          {s.nav.map((n) => (
            <a key={n} href="#" className="transition-colors hover:text-white">
              {n.toLowerCase()}
            </a>
          ))}
        </nav>
        <Link href={s.hero.ctaLink} className={ctaPrimary} style={{ background: BLUE, fontFamily: mono }}>
          book a call
        </Link>
      </header>

      <main className="relative z-10">
        {/* ---------- HERO ---------- */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20 lg:px-8">
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5"
              style={{ animation: "mp-fade-in 0.8s ease both" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
              <Kicker>ai-native marketing · since 2022</Kicker>
            </div>
            <h1
              className="text-[clamp(2.2rem,4.6vw,3.5rem)] font-bold leading-[1.08] text-white"
              style={{ fontFamily: mono, letterSpacing: "-0.02em" }}
            >
              AI marketing,
              <br />
              engineered for{" "}
              <span style={{ color: BLUE }}>behavioral health</span>.
            </h1>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-white/60">
              {s.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={s.hero.ctaLink} className={ctaPrimary} style={{ background: BLUE, fontFamily: mono }}>
                {s.hero.cta.toLowerCase()} →
              </Link>
              <a
                href="#proof"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3.5 text-[14px] font-bold text-white/80 transition-colors hover:text-white"
                style={{ fontFamily: mono }}
              >
                see the results
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3" style={{ fontFamily: mono }}>
              {[
                ["$50M+", "managed spend"],
                ["0", "suspensions"],
                ["LegitScript", "certified"],
              ].map(([v, l], i) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="text-[15px] font-bold" style={{ color: i === 1 ? GREEN : BLUE }}>
                    {v}
                  </span>
                  <span className="text-[12px] text-white/40">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* hero product visual: live attribution feed */}
          <Reveal variant="blur">
            <Window title="mp watch --attribution --live">
              <div className="flex items-center gap-2 text-[12px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: GREEN }} />
                <span style={{ color: GREEN }}>live</span>
                <span className="text-white/30">· streaming click → admission</span>
              </div>
              <div className="mt-3 space-y-1.5 text-[12.5px] leading-6">
                {feed.map((f, i) => (
                  <div key={f.t} className="flex flex-wrap gap-x-2" style={{ animation: `mp-fade-in 0.5s ease ${i * 0.4 + 0.3}s both` }}>
                    <span className="text-white/30">[{f.t}]</span>
                    <span style={{ color: f.c }}>{f.k}</span>
                    <span className="text-white/55">{f.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/8 pt-3 text-center">
                {[
                  ["ROAS", "8.47x", BLUE],
                  ["CPA", "$42", GREEN],
                  ["LTV", "tracked", CYAN],
                ].map(([l, v, c]) => (
                  <div key={l as string}>
                    <div className="text-[1.1rem] font-bold" style={{ color: c as string }}>
                      {v}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-white/35">{l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[12.5px]">
                <span style={{ color: GREEN }}>mp@marketingpowered</span>
                <span className="text-white/35">:~$ </span>
                <span className="mp-caret" style={{ color: BLUE }}>▋</span>
              </div>
            </Window>
          </Reveal>
        </section>

        {/* ---------- TRUST STRIP ---------- */}
        <section className="border-y border-white/8 bg-white/[0.015]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-5 text-[12.5px] text-white/40 lg:px-8" style={{ fontFamily: mono }}>
            {["$1.5–2M / mo Google Ads", "HIPAA-conscious infrastructure", "Mac Studio M3 clusters", "full-funnel attribution"].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-white/15">/</span>} {t}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- OPERATORS / GROWTH ---------- */}
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Kicker>{"// built by operators, not agencies"}</Kicker>
              <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1] text-white">
                {s.growth.headline}
              </h2>
              <p className="mt-6 leading-relaxed text-white/60">{s.growth.body}</p>
              <p className="mt-4 leading-relaxed text-white/45">{s.growth.body3}</p>
            </Reveal>
            <Reveal variant="blur" delay={120}>
              <Window title="portfolio-growth — media.log">
                <div className="space-y-1.5 text-[13px] leading-6">
                  <div>
                    <span style={{ color: GREEN }}>$</span>{" "}
                    <span className="text-white/80">mp optimize --portfolio bh-mh</span>
                  </div>
                  <div className="text-white/45">› analyzing accounts, attribution, creative...</div>
                  <div className="flex items-end gap-5 py-3">
                    <span className="text-[clamp(2.6rem,6vw,4rem)] font-bold leading-none" style={{ color: BLUE }}>
                      11+
                    </span>
                    <span className="pb-2 text-[12px] text-white/45">BH/MH ad accounts</span>
                  </div>
                  <div>
                    <span style={{ color: GREEN }}>[ ok ]</span> <span className="text-white/55">full-funnel attribution active</span>
                  </div>
                </div>
              </Window>
            </Reveal>
          </div>
        </section>

        {/* ---------- STATS ---------- */}
        <section className="mx-auto max-w-6xl px-6 pb-8 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.stats.map((stat, i) => (
              <Reveal
                key={stat.value}
                delay={i * 80}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="text-[12px] text-white/35" style={{ fontFamily: mono }}>
                  {`// 0${i + 1}`}
                </div>
                <div
                  className="mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-none"
                  style={{ fontFamily: mono, color: i % 2 ? GREEN : BLUE }}
                >
                  {stat.value}
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-white/50">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- SERVICES / MODULES ---------- */}
        <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <Kicker>{"// the system"}</Kicker>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1] text-white">
              {s.servicesIntro.headline}
            </h2>
            <p className="mt-5 leading-relaxed text-white/55">{s.servicesIntro.body}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {s.services.map((svc, i) => (
              <Reveal
                key={svc.title}
                delay={(i % 3) * 80}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0090F0]/50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded border border-white/10 px-2 py-1 text-[11px]"
                    style={{ fontFamily: mono, color: i % 2 ? GREEN : BLUE }}
                  >
                    module/{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/20 transition-colors group-hover:text-white/50" style={{ fontFamily: mono }}>
                    →
                  </span>
                </div>
                <h3 className="mt-5 text-[1.15rem] font-bold text-white" style={{ fontFamily: mono }}>
                  {svc.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">{svc.description}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- COMPLIANCE (risk reduction) ---------- */}
        <section className="border-y border-white/8 bg-white/[0.015]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8">
            <Reveal variant="blur">
              <Window title="mp compliance check --vertical behavioral-health">
                <div className="space-y-2 text-[13px]">
                  {[
                    "google ads sensitive-vertical policy",
                    "no-retargeting strategy enforced",
                    "legitscript certification",
                    "meta special-ad-category handling",
                    "hipaa-conscious data sovereignty",
                  ].map((c) => (
                    <div key={c} className="flex items-center gap-3">
                      <span className="font-bold" style={{ color: GREEN }}>
                        ✓ pass
                      </span>
                      <span className="text-white/55">{c}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/8 pt-2 text-white/40">
                    <span style={{ color: GREEN }}>0</span> account suspensions across all campaigns
                  </div>
                </div>
              </Window>
            </Reveal>
            <Reveal delay={120}>
              <Kicker>{"// compliance, built in"}</Kicker>
              <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.12] text-white">
                {s.specializedMarketing.headline}
              </h2>
              <p className="mt-6 leading-relaxed text-white/60">{s.specializedMarketing.body}</p>
              <p className="mt-4 leading-relaxed text-white/45">{s.specializedMarketing.body3}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- PROOF / RESULTS ---------- */}
        <section id="proof" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <Kicker>{"// proof, not adjectives"}</Kicker>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1] text-white">
              {s.whyChoose.headline}
            </h2>
            <p className="mt-5 leading-relaxed text-white/55">{s.whyChoose.body}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {s.whyChoose.cards.map((card, i) => (
              <Reveal
                key={card.title}
                delay={(i % 2) * 90}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-7"
              >
                <h3 className="flex items-center gap-3 text-[1.12rem] font-bold text-white" style={{ fontFamily: mono }}>
                  <span style={{ color: i % 2 ? GREEN : BLUE }}>›</span>
                  {card.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/55">{card.description}</p>
              </Reveal>
            ))}
          </div>

          {/* mid-page CTA band */}
          <Reveal
            className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#0090F0]/30 p-8 md:flex-row"
            style={{ background: "linear-gradient(120deg, rgba(0,144,240,0.10), rgba(0,168,96,0.06))" }}
          >
            <div>
              <h3 className="text-[1.3rem] font-extrabold text-white">Want this running for your treatment center?</h3>
              <p className="mt-1 text-[14px] text-white/55">Get a tailored audit of your spend, attribution, and compliance gaps.</p>
            </div>
            <Link href={s.hero.ctaLink} className={`${ctaPrimary} shrink-0`} style={{ background: BLUE, fontFamily: mono }}>
              {s.hero.cta.toLowerCase()} →
            </Link>
          </Reveal>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
          <Reveal>
            <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold text-white">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="space-y-3">
            {s.faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.question} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left"
                  >
                    <span style={{ fontFamily: mono, color: isOpen ? GREEN : CYAN }}>{isOpen ? "▾" : "▸"}</span>
                    <span className="flex-1 font-bold text-white/90">{f.question}</span>
                  </button>
                  <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-11 text-[0.95rem] leading-relaxed text-white/55">{f.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <section className="px-6 pb-24 lg:px-8">
          <Reveal
            variant="blur"
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 px-8 py-20 text-center md:px-16"
            style={{
              background:
                "radial-gradient(120% 130% at 50% 0%, rgba(0,144,240,0.18), transparent 55%), radial-gradient(90% 100% at 50% 120%, rgba(0,168,96,0.14), transparent 55%), #0A0F18",
            }}
          >
            <div className="mb-5" style={{ fontFamily: mono }}>
              <span style={{ color: GREEN }}>mp@marketingpowered</span>
              <span className="text-white/35">:~$ </span>
              <span className="text-white">mp deploy --your-treatment-center</span>
            </div>
            <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.1] text-white">
              {s.cta.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/60">{s.cta.body}</p>
            <Link
              href={s.cta.ctaLink}
              className="mt-9 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] font-bold text-black transition-transform hover:scale-[1.03]"
              style={{ background: BLUE, fontFamily: mono }}
            >
              {s.cta.ctaText.toLowerCase()} →
            </Link>
            <p className="mt-5 text-[12px] text-white/35" style={{ fontFamily: mono }}>
              {s.socialProof}
            </p>
          </Reveal>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-3 text-[13px] text-white/45">{s.footer.tagline}</p>
            <p className="mt-3 text-[13px] text-white/45" style={{ fontFamily: mono }}>
              {s.brand.phone} · {s.brand.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-white/50" style={{ fontFamily: mono }}>
            {s.footer.services.map((svc) => (
              <a key={svc} href="#" className="transition-colors hover:text-white">
                {svc}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8 px-6 py-5 text-center text-[12px] text-white/35 lg:px-8" style={{ fontFamily: mono }}>
          {s.footer.copyright}
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-5 left-5 z-50 rounded-lg border border-white/15 bg-black/70 px-4 py-2 text-[12px] text-white/70 backdrop-blur transition-colors hover:text-white"
        style={{ fontFamily: mono }}
      >
        ← gallery
      </Link>
    </div>
  );
}
