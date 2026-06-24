"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { Logo, Figure, brand, brandGradient } from "@/components/brand";

/* ================================================================== */
/*  DESIGN 7 — "Mission Control"                                      */
/*  The agency as a live analytics product. A bright dashboard of      */
/*  animated widgets: a click→admission funnel, count-up KPIs,         */
/*  sparklines and a growth chart. The data is the design. Brand       */
/*  blue/green/navy on a crisp, light control surface.                 */
/* ================================================================== */

const sans = "var(--font-manrope), system-ui, sans-serif";
const INK = "#0A1322";
const MUTE = "#5A6B82";
const SOFT = "#EEF4FB";
const LINE = "#E1EAF4";

/* count-up that fires when scrolled into view */
function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  dur = 1500,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  dur?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(end * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, dur]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Spark({ data, color }: { data: number[]; color: string }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / (max - min || 1)) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        className="draw-line"
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const funnel = [
  { label: "Click", pct: 100, value: "Impressions → site" },
  { label: "Form Fill / Call", pct: 68, value: "Intent captured" },
  { label: "Qualified Lead", pct: 41, value: "Predictive score ≥ threshold" },
  { label: "Admission", pct: 23, value: "Tracked to P&L" },
];

export default function Design7() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mc relative min-h-screen" style={{ background: SOFT, color: INK, fontFamily: sans }}>
      <style>{`
        .draw-line { stroke-dasharray: 600; stroke-dashoffset: 600; transition: stroke-dashoffset 1.6s ease; }
        [data-reveal].is-visible .draw-line { stroke-dashoffset: 0; }
        .bar-grow { transform: scaleX(0); transform-origin: left; transition: transform 1.1s cubic-bezier(.2,.8,.2,1); }
        [data-reveal].is-visible .bar-grow { transform: scaleX(1); }
        @keyframes mp-gauge { from { stroke-dashoffset: 214; } to { stroke-dashoffset: var(--off); } }
        .gauge-fill { stroke-dasharray: 214; stroke-dashoffset: 214; animation: mp-gauge 1.4s ease .2s forwards; }
      `}</style>

      {/* ---------- TOP BAR ---------- */}
      <header className="sticky top-0 z-40 border-b border-[#E1EAF4] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo tone="dark" />
            <span className="hidden items-center gap-1.5 rounded-full bg-[#EAF7EF] px-2.5 py-1 text-[11px] font-bold text-[#00854C] sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: brand.green }} />
              LIVE
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-[#3A4760] md:flex">
            {s.navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-[#0090F0]">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={s.hero.ctaLink}
            className="rounded-lg px-4 py-2 text-[13px] font-bold text-white"
            style={{ background: brand.blue }}
          >
            Request Audit
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------- HERO ---------- */}
        <section className="grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CFE6FA] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#0072D8]"
              style={{ animation: "mp-fade-in 0.8s ease both" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} />
              Full-funnel attribution · click → admission
            </div>
            <h1 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-extrabold leading-[1.06] tracking-tight" style={{ color: brand.navy }}>
              Marketing you can{" "}
              <span style={{ color: brand.blue }}>measure</span> to the{" "}
              <span style={{ color: brand.green }}>admission</span>.
            </h1>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed" style={{ color: MUTE }}>
              {s.hero.subheadline}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={s.hero.ctaLink}
                className="group inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(0,144,240,0.7)] transition-transform hover:scale-[1.03]"
                style={{ background: brand.blue }}
              >
                {s.hero.cta}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <span className="text-[13px] font-semibold" style={{ color: MUTE }}>
                {s.socialProof}
              </span>
            </div>
          </div>

          {/* dashboard panel */}
          <Reveal variant="blur" className="rounded-2xl border border-[#E1EAF4] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(0,24,72,0.5)]">
            <div className="flex items-center justify-between border-b border-[#EEF3F9] pb-3">
              <span className="text-[13px] font-bold" style={{ color: brand.navy }}>
                Attribution Overview
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#00854C]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: brand.green }} />
                live
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-4">
              <Kpi label="ROAS" value={<CountUp end={847} suffix="%" />} spark={[3, 5, 4, 7, 8, 7, 9]} color={brand.blue} />
              <Kpi label="Cost / Admission" value={<CountUp end={42} prefix="$" />} spark={[9, 8, 8, 6, 5, 5, 4]} color={brand.green} />
            </div>
            {/* funnel */}
            <div className="rounded-xl bg-[#F6FAFE] p-4">
              <div className="mb-3 text-[12px] font-bold uppercase tracking-wider" style={{ color: MUTE }}>
                Conversion funnel
              </div>
              <div className="space-y-2.5">
                {funnel.map((f, i) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-[12px] font-semibold" style={{ color: brand.navy }}>
                      {f.label}
                    </span>
                    <div className="h-6 flex-1 overflow-hidden rounded-md bg-[#E5EEF8]">
                      <div
                        className="bar-grow flex h-full items-center justify-end rounded-md pr-2 text-[11px] font-bold text-white"
                        style={{
                          width: `${f.pct}%`,
                          background: `linear-gradient(90deg, ${brand.blue}, ${i === funnel.length - 1 ? brand.green : brand.cyan})`,
                          transitionDelay: `${i * 140}ms`,
                        }}
                      >
                        {f.pct}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- KPI STAT ROW ---------- */}
        <section className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {s.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={i * 80}
              className="rounded-2xl border border-[#E1EAF4] bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold leading-none" style={{ color: i % 2 ? brand.green : brand.blue }}>
                  {stat.value}
                </div>
                <Spark data={[4, 6, 5, 7, 6, 8, 9]} color={i % 2 ? brand.green : brand.blue} />
              </div>
              <p className="mt-4 text-[13px] leading-relaxed" style={{ color: MUTE }}>
                {stat.label}
              </p>
            </Reveal>
          ))}
        </section>
      </main>

      {/* ---------- EXPERTS + GROWTH CHART ---------- */}
      <section className="border-y border-[#E1EAF4] bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
              Operator track record
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
              {s.growth.headline}
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: MUTE }}>
              {s.growth.body}
            </p>
          </Reveal>

          {/* account portfolio chart */}
          <Reveal variant="blur" className="rounded-2xl border border-[#E1EAF4] bg-[#FAFCFF] p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-wider" style={{ color: MUTE }}>
                  BH/MH ad accounts
                </div>
                <div className="mt-1 text-[2.4rem] font-extrabold leading-none" style={{ color: brand.green }}>
                  <CountUp end={11} suffix="+" />
                </div>
              </div>
              <div className="rounded-full bg-[#EAF7EF] px-3 py-1 text-[12px] font-bold text-[#00854C]">
                $1.5-2M/mo
              </div>
            </div>
            <svg viewBox="0 0 320 140" className="mt-5 w-full">
              <defs>
                <linearGradient id="mc-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brand.blue} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={brand.blue} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((g) => (
                <line key={g} x1="0" x2="320" y1={g * 35 + 5} y2={g * 35 + 5} stroke={LINE} strokeWidth="1" />
              ))}
              <path d="M0,120 C60,110 90,96 140,70 C190,44 230,30 320,12 L320,140 L0,140 Z" fill="url(#mc-area)" className="area-rise" />
              <path
                className="draw-line"
                d="M0,120 C60,110 90,96 140,70 C190,44 230,30 320,12"
                fill="none"
                stroke={brand.blue}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="0" cy="120" r="4" fill={brand.blue} />
              <circle cx="320" cy="12" r="5" fill={brand.green} />
            </svg>
            <div className="mt-1 flex justify-between text-[11px] font-semibold" style={{ color: MUTE }}>
              <span>Single account</span>
              <span>Multi-account portfolio</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SERVICES BENTO ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
            The system
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
            {s.servicesIntro.headline}
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.services.map((svc, i) => (
            <Reveal
              key={svc.title}
              delay={(i % 3) * 80}
              className="group rounded-2xl border border-[#E1EAF4] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(0,24,72,0.45)]"
            >
              <Widget kind={i} />
              <h3 className="mt-5 text-[1.1rem] font-bold" style={{ color: brand.navy }}>
                {svc.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed" style={{ color: MUTE }}>
                {svc.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- SPECIALIZED / COMPLIANCE STATUS ---------- */}
      <section className="border-y border-[#E1EAF4] bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
          <Reveal>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
              Compliance status
            </p>
            <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-[1.12]" style={{ color: brand.navy }}>
              {s.specializedMarketing.headline}
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: MUTE }}>
              {s.specializedMarketing.body}
            </p>
            <div className="mt-6 space-y-2">
              {[
                "Google Ads sensitive-vertical policy",
                "LegitScript certification",
                "Meta Special Ad Categories",
                "HIPAA-conscious data sovereignty",
              ].map((c) => (
                <div key={c} className="flex items-center justify-between rounded-lg border border-[#E6EEF7] bg-[#FAFCFF] px-4 py-2.5">
                  <span className="text-[14px] font-semibold" style={{ color: brand.navy }}>
                    {c}
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#00854C]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.green }} />
                    OK
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="blur" delay={120}>
            <Figure src={s.specializedMarketing.image} alt={s.specializedMarketing.imageAlt} ratio="16 / 9" />
          </Reveal>
        </div>
      </section>

      {/* ---------- RESULTS: gauges + cards ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: brand.blue }}>
            Proven results
          </p>
          <h2 className="mt-4 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.1]" style={{ color: brand.navy }}>
            {s.whyChoose.headline}
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 2) * 90}
              className="flex gap-5 rounded-2xl border border-[#E1EAF4] bg-white p-6"
            >
              <Gauge pct={[92, 100, 100, 99][i] ?? 95} color={i % 2 ? brand.green : brand.blue} />
              <div>
                <h3 className="text-[1.1rem] font-bold" style={{ color: brand.navy }}>
                  {card.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed" style={{ color: MUTE }}>
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-6 pb-20 lg:px-8">
        <Reveal>
          <h2 className="mb-10 text-center text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold" style={{ color: brand.navy }}>
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {s.faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.question} className="overflow-hidden rounded-2xl border border-[#E1EAF4] bg-white">
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
                <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
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
      <section className="px-6 pb-20 lg:px-8">
        <Reveal
          variant="blur"
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-20"
          style={{ background: brandGradient }}
        >
          <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.1] text-white">
            {s.cta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/85">{s.cta.body}</p>
          <Link
            href={s.cta.ctaLink}
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-4 text-[14px] font-bold text-[#0072D8] transition-transform hover:scale-[1.03]"
          >
            {s.cta.ctaText}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-[#E1EAF4] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="max-w-xs">
            <Logo tone="dark" />
            <p className="mt-3 text-[13px]" style={{ color: MUTE }}>
              {s.footer.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[13px]" style={{ color: MUTE }}>
            {s.footer.serviceLinks.map((svc) => (
              <Link key={svc.href} href={svc.href} className="transition-colors hover:text-[#0090F0]">
                {svc.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-[#E1EAF4] px-6 py-5 text-center text-[12px] lg:px-8" style={{ color: MUTE }}>
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

function Kpi({
  label,
  value,
  spark,
  color,
}: {
  label: string;
  value: React.ReactNode;
  spark: number[];
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[#EEF3F9] p-3.5">
      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: MUTE }}>
        {label}
      </div>
      <div className="mt-1 text-[1.5rem] font-extrabold" style={{ color }}>
        {value}
      </div>
      <div className="mt-1">
        <Spark data={spark} color={color} />
      </div>
    </div>
  );
}

/* small per-service viz motif */
function Widget({ kind }: { kind: number }) {
  const c = kind % 2 ? brand.green : brand.blue;
  const box = "grid h-12 w-12 place-items-center rounded-xl";
  if (kind % 3 === 0)
    return (
      <div className={box} style={{ background: "#EAF5FE" }}>
        <svg width="22" height="22" viewBox="0 0 24 24">
          {[6, 11, 16].map((x, i) => (
            <rect key={x} x={x} y={14 - i * 4} width="3" height={6 + i * 4} rx="1" fill={c} />
          ))}
        </svg>
      </div>
    );
  if (kind % 3 === 1)
    return (
      <div className={box} style={{ background: "#EAF7EF" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <path d="M3 17l5-5 4 3 6-8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="7" r="1.6" fill={c} stroke="none" />
        </svg>
      </div>
    );
  return (
    <div className={box} style={{ background: "#EAF5FE" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7.5 7.5 11 16M16.5 7.5 13 16M8 6h8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Gauge({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="relative shrink-0">
      <svg width="72" height="72" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="34" fill="none" stroke="#E8EEF6" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          className="gauge-fill"
          transform="rotate(-90 40 40)"
          style={{ ["--off" as string]: `${214 - (214 * pct) / 100}` }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[14px] font-extrabold" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}
