"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { Figure } from "@/components/brand";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

/* ================================================================== */
/*  DESIGN 1 — "Midnight Atelier"                                      */
/*  Cinematic near-black canvas, high-contrast Fraunces serif,         */
/*  champagne→amber gradient hairlines, film-grain atmosphere.         */
/*  Think Linear's precision dressed in luxury-brand restraint.        */
/* ================================================================== */

const INK = "#050B16";
const serif = "'Fraunces', Georgia, serif";
const sans = "'Manrope', system-ui, sans-serif";
const mono = "'Space Mono', monospace";

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-px w-full origin-left ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, #0090F0 18%, #7FCBFF 50%, #0090F0 82%, transparent)",
      }}
    />
  );
}

/* Count-up that fires when scrolled into view. Animates only the numeric part;
   `prefix`/`suffix` render verbatim so ranges and symbols ($50M+, 30-45%, 3 to 24)
   reconstruct exactly. Respects prefers-reduced-motion (snaps to the final value). */
function CountUp({
  to,
  prefix = "",
  suffix = "",
  dur = 1400,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  dur?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Initialize at the final value so SSR / no-JS / pre-hydration render the real
  // number (e.g. "$50M+"), never "$0M+". On the client we reset to 0 and animate
  // up when scrolled into view; the stats sit below the fold so there's no flash.
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || to === 0) {
      setVal(to);
      return;
    }
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
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
  }, [to, dur]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

/* Structured data: Organization + LocalBusiness + FAQPage, built entirely from
   real site content (content.ts brand info + the homepage FAQ). Rendered as
   JSON-LD; SSR'd into the initial HTML so crawlers see it. */
function HomeJsonLd() {
  const phoneE164 = "+1-561-560-6804"; // s.brand.phone "(561) 560-6804"
  const address = {
    "@type": "PostalAddress",
    streetAddress: "9494 Osprey Isles Blvd",
    addressLocality: "Palm Beach Gardens",
    addressRegion: "FL",
    postalCode: "33412",
    addressCountry: "US",
  };
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: s.brand.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description: s.seo.description,
      email: s.brand.email,
      telephone: phoneE164,
      address,
    },
    {
      "@context": "https://schema.org",
      // ProfessionalService is a LocalBusiness subtype; Google treats it as LocalBusiness.
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: s.brand.name,
      url: SITE_URL,
      image: `${SITE_URL}/images/01-hero-banner.jpg`,
      telephone: phoneE164,
      email: s.brand.email,
      address,
      areaServed: "US",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: s.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
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
      <HomeJsonLd />

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
            "radial-gradient(120% 80% at 50% -10%, rgba(0,144,240,0.10), transparent 55%), radial-gradient(80% 60% at 100% 120%, rgba(0,144,240,0.06), transparent 60%)",
        }}
      />

      {/* ---------- NAV ---------- */}
      <div className="relative z-20">
        <Nav />
      </div>

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-12 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div
              className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
              style={{
                animation: "mp-fade-in 1s ease both",
                fontFamily: mono,
              }}
            >
              <span className="inline-block h-px w-8 bg-[#0090F0]" />
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
                    "linear-gradient(100deg,#7FCBFF,#0090F0 60%,#0066CC)",
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
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)]"
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
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{
                background:
                  "linear-gradient(140deg,#0090F0,#00A8D8 50%,#00A860)",
              }}
            />
            <Figure
              src={s.hero.image}
              alt={s.hero.imageAlt}
              ratio="16 / 11"
              rounded="26px"
              priority
              className="relative"
            />
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL PROOF STRIP ---------- */}
      {/* Built only from verified, content-backed proof points (see content.ts:
          socialProof, stats, growth.body). No client logos/testimonials yet —
          those need real, consented assets (flagged for Jason). */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-7 md:px-10">
          <p
            className="mb-6 text-center text-[11px] uppercase tracking-[0.28em] text-white/40"
            style={{ fontFamily: mono }}
          >
            Trusted by behavioral health &amp; mental health operators
          </p>
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
            {[
              { v: "$50M+", l: "Managed ad spend" },
              { v: "$1.5–2M/mo", l: "Google Ads managed" },
              { v: "3 → 24", l: "Haven Health locations" },
              { v: "Since 2022", l: "AI-native systems" },
            ].map((p) => (
              <div key={p.l} className="text-center">
                <div
                  className="text-[clamp(1.4rem,2.4vw,2rem)] leading-none"
                  style={{
                    fontFamily: serif,
                    background: "linear-gradient(180deg,#7FCBFF,#0090F0)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {p.v}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {p.l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <section className="relative z-10 mt-16 border-y border-white/8 py-6">
        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
            style={{ animation: "mp-marquee 32s linear infinite" }}
          >
            {[...Array(2)].map((_, dup) =>
              [
                // All figures are content-backed (official homepage doc + content.ts).
                // The prior 847% ROAS / $42 CPA / 312% Organic Growth were not in the
                // official content and have been replaced with verified proof points.
                "$50M+ Managed Ad Spend",
                "$1.5–2M/mo Google Ads",
                "3 → 24 Locations",
                "30–45% Lower Cost Per Lead",
                "0 Account Suspensions",
                "HIPAA-Conscious Infrastructure",
              ].map((t, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-16 text-[15px] uppercase tracking-[0.2em] text-white/35"
                  style={{ fontFamily: serif, fontStyle: "italic" }}
                >
                  {t}
                  <span className="text-[#0090F0]">✦</span>
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
            <Figure src={s.growth.image} alt={s.growth.imageAlt} ratio="16 / 12" />
            <div
              className="absolute -bottom-6 -right-4 rounded-2xl border border-[#0090F0]/30 bg-[#050B16]/80 px-6 py-5 backdrop-blur"
              style={{ boxShadow: "0 24px 60px -20px rgba(0,0,0,0.8)" }}
            >
              <div
                className="text-3xl"
                style={{ fontFamily: serif, color: "#7FCBFF" }}
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
                className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
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
              className="bg-[#050B16] p-8"
            >
              <div
                className="text-[clamp(2.4rem,4vw,3.4rem)] leading-none"
                style={{
                  fontFamily: serif,
                  background: "linear-gradient(180deg,#7FCBFF,#0090F0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} />
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
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
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
          <Link
            href="/services/"
            className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0090F0] transition-colors hover:text-[#7FCBFF]"
            style={{ fontFamily: mono }}
          >
            View all services
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <div className="border-t border-white/10">
          {s.services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 60}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:grid-cols-[80px_0.9fr_1.4fr] md:gap-10">
                <span
                  className="text-sm text-white/30 transition-colors group-hover:text-[#0090F0]"
                  style={{ fontFamily: mono }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="col-span-1 text-[1.35rem] leading-snug transition-transform duration-500 group-hover:translate-x-1"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  <Link
                    href={svc.href}
                    className="transition-colors hover:text-[#7FCBFF]"
                  >
                    {svc.title}
                  </Link>
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
              className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
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
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/who-we-help/behavioral-health/"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0090F0] transition-colors hover:text-[#7FCBFF]"
                style={{ fontFamily: mono }}
              >
                Behavioral health <span aria-hidden>→</span>
              </Link>
              <Link
                href="/who-we-help/mental-health/"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0090F0] transition-colors hover:text-[#7FCBFF]"
                style={{ fontFamily: mono }}
              >
                Mental health <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal variant="blur" delay={120} className="relative">
            <Figure
              src={s.specializedMarketing.image}
              alt={s.specializedMarketing.imageAlt}
              ratio="16 / 10"
            />
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
          <Link
            href="/results/case-studies/"
            className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0090F0] transition-colors hover:text-[#7FCBFF]"
            style={{ fontFamily: mono }}
          >
            See case studies &amp; results <span aria-hidden>→</span>
          </Link>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {s.whyChoose.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 80}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-[#0090F0]/40"
            >
              <span
                className="absolute right-6 top-6 text-5xl text-white/5 transition-colors group-hover:text-[#0090F0]/20"
                style={{ fontFamily: serif }}
              >
                0{i + 1}
              </span>
              <h3
                className="text-xl"
                style={{ fontFamily: serif, fontWeight: 500, color: "#7FCBFF" }}
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
                      color: isOpen ? "#7FCBFF" : "#EDEAE3",
                    }}
                  >
                    {f.question}
                  </span>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-[#0090F0] transition-transform duration-300"
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
          style={{
            background:
              "radial-gradient(130% 150% at 50% 0%, rgba(0,144,240,0.22), transparent 55%), radial-gradient(100% 120% at 100% 100%, rgba(0,168,96,0.16), transparent 55%), #071226",
          }}
        >
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
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
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
      <Footer />
    </div>
  );
}
