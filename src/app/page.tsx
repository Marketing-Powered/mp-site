"use client";

import Link from "next/link";
import { homeContent as c } from "@/lib/home";
import { siteContent as s } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import Reveal from "@/components/Reveal";
import { Figure } from "@/components/brand";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { ModalCta } from "@/components/site/LeadModal";
import { CallCta, FOCUS_RING, GoldRule } from "@/components/site/ui";
import StickyMobileCta from "@/components/site/StickyMobileCta";
import { INK, serif, sans, mono } from "@/components/site/theme";

/* ================================================================== */
/* HOMEPAGE — "Midnight Atelier" treatment of the November 2026 copy.  */
/*                                                                      */
/* Ten sections in publication order (see src/lib/home.ts). One H1 in  */
/* the hero; every other section heading is an H2; capability and      */
/* service subsections are H3. Headline and proof text stay in HTML,   */
/* contextual links are real anchors, and photographs are decorative    */
/* (empty alt text): they illustrate the section they sit in without    */
/* being presented as staff, offices, client work, or results.          */
/* ================================================================== */

const PRIMARY_BTN = `group relative inline-flex min-h-[44px] items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] ${FOCUS_RING}`;

/* Inline links on the near-black canvas: light blue, underlined, with a
   visible focus ring. Underline + colour so links never rely on colour alone. */
const LINK_CLS = `text-[#7FCBFF] underline decoration-[#0090F0]/50 underline-offset-4 transition-colors hover:text-white hover:decoration-[#7FCBFF] ${FOCUS_RING}`;

const BODY = "text-[1.02rem] leading-relaxed text-white/65";

/* Renders a paragraph whose copy may carry [anchor](path) contextual links.
   Internal paths render through next/link so they are crawlable anchors. */
function Prose({ text, className = BODY }: { text: string; className?: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <Link key={m.index} href={m[2]} prefetch={false} className={LINK_CLS}>
        {m[1]}
      </Link>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <p className={className}>{nodes}</p>;
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05] ${className}`}
      style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

function H3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`text-[1.3rem] leading-snug ${className}`}
      style={{ fontFamily: serif, fontWeight: 500, color: "#7FCBFF" }}
    >
      {children}
    </h3>
  );
}

function StrategyCallButton({ className = "" }: { className?: string }) {
  return (
    <ModalCta href={c.cta.href} className={`${PRIMARY_BTN} ${className}`}>
      <span className="relative z-10">{c.cta.label}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </ModalCta>
  );
}

/* Structured data: Organization (with the approved description + founder
   patch) and the ProfessionalService entity. Built from real site content and
   SSR'd into the initial HTML so crawlers see it. No FAQPage: the homepage no
   longer carries an FAQ. */
function HomeJsonLd() {
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
      description: c.organization.description,
      founder: {
        "@type": "Person",
        name: c.organization.founder.name,
        jobTitle: c.organization.founder.jobTitle,
      },
      email: s.brand.email,
      telephone: s.brand.phoneE164,
      address,
    },
    {
      "@context": "https://schema.org",
      // ProfessionalService is a LocalBusiness subtype; Google treats it as LocalBusiness.
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#localbusiness`,
      name: s.brand.name,
      url: SITE_URL,
      image: `${SITE_URL}${c.hero.image}`,
      telephone: s.brand.phoneE164,
      email: s.brand.email,
      address,
      areaServed: "US",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function HomePage() {
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

      {/* ---------- 01 HERO AND VALUE PROPOSITION ---------- */}
      <section
        id="hero"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-12 lg:pt-20"
      >
        {/* One grid, one image element. Below lg the children stack in source
            order, so the photo lands between the first and second paragraphs
            and paints in the first mobile viewport. At lg the image moves to
            the right column, spanning the three text rows and centred on them,
            as before. */}
        <div className="grid gap-x-14 lg:grid-cols-[1.05fr_0.95fr]">
          <h1
            className="text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[1.02] lg:col-start-1"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {c.hero.h1}
          </h1>

          <Prose
            text={c.hero.paragraphs[0]}
            className="mt-8 max-w-xl text-[clamp(1.05rem,1.4vw,1.2rem)] leading-relaxed text-white/75 lg:col-start-1"
          />

          {/* framed hero image (decorative) */}
          <div className="relative my-10 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:my-0 lg:self-center">
            <div
              aria-hidden
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#00A860)" }}
            />
            <Figure
              src={c.hero.image}
              alt={c.hero.imageAlt}
              ratio="16 / 9"
              rounded="26px"
              priority
              fetchPriority="high"
              fit="cover"
              className="relative"
            />
          </div>

          <div className="lg:col-start-1 lg:mt-5">
            <div className="max-w-xl space-y-5">
              {c.hero.paragraphs.slice(1).map((p, i) => (
                <Prose key={i} text={p} />
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StrategyCallButton />
              <CallCta />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- 02 EXPERIENCE AND LEADERSHIP ---------- */}
      <section id="experience" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <H2>{c.experience.h2}</H2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {c.experience.paragraphs.map((p, i) => (
                <Reveal key={i} delay={80 + i * 60}>
                  <Prose text={p} />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="blur" delay={120} className="relative">
            <Figure
              src={c.experience.image}
              alt={c.experience.imageAlt}
              ratio="16 / 9"
              fit="cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- 03 CORE MARKETING SERVICES ---------- */}
      <section id="services" className="relative z-10 border-y border-white/8 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="max-w-2xl">
            <H2>{c.services.h2}</H2>
            <Prose text={c.services.intro} className={`mt-6 ${BODY}`} />
          </Reveal>

          <div className="mt-14 border-t border-white/10">
            {c.services.items.map((item, i) => (
              <Reveal key={item.h3} delay={i * 50}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-white/10 py-8 md:grid-cols-[72px_0.9fr_1.4fr] md:gap-10">
                  <span className="text-sm text-white/40" style={{ fontFamily: mono }} aria-hidden>
                    0{i + 1}
                  </span>
                  <H3 className="col-span-1">{item.h3}</H3>
                  <Prose
                    text={item.body}
                    className={`col-span-2 text-[0.98rem] leading-relaxed text-white/60 md:col-span-1`}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 04 HOSPITALS AND HEALTH SYSTEMS ---------- */}
      <section id="hospitals" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <H2>{c.hospitals.h2}</H2>
              <GoldRule className="mt-8 max-w-xs" />
            </Reveal>
            <Reveal variant="blur" delay={120} className="relative mt-10">
              <Figure
                src={c.hospitals.image}
                alt={c.hospitals.imageAlt}
                ratio="16 / 9"
                fit="cover"
              />
            </Reveal>
          </div>
          <div className="space-y-5">
            {c.hospitals.paragraphs.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <Prose text={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 05 OWNED INFRASTRUCTURE ---------- */}
      <section id="infrastructure" className="relative z-10 border-y border-white/8 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal variant="blur" className="relative order-2 lg:order-1">
              <Figure
                src={c.infrastructure.image}
                alt={c.infrastructure.imageAlt}
                ratio="16 / 9"
                fit="cover"
              />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <H2>{c.infrastructure.h2}</H2>
              </Reveal>
              <div className="mt-8 space-y-5">
                {c.infrastructure.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={80 + i * 60}>
                    <Prose text={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {c.infrastructure.subsections.map((sub, i) => (
              <Reveal
                key={sub.h3}
                delay={i * 90}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
              >
                <H3>{sub.h3}</H3>
                <div className="mt-4 space-y-4">
                  {sub.paragraphs.map((p, j) => (
                    <Prose
                      key={j}
                      text={p}
                      className="text-[0.98rem] leading-relaxed text-white/60"
                    />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 06 DATA SOVEREIGNTY, OPEN SOURCE, AND CUSTOMIZATION ---------- */}
      <section id="data-control" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
        <Reveal className="max-w-2xl">
          <H2>{c.dataControl.h2}</H2>
          <Prose text={c.dataControl.intro} className={`mt-6 ${BODY}`} />
        </Reveal>
        {/* Three concepts, stacked on mobile. Every explanation stays visible;
            nothing is hidden behind hover. */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {c.dataControl.columns.map((col, i) => (
            <Reveal
              key={col.h3}
              delay={i * 90}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <H3>{col.h3}</H3>
              <div className="mt-4 space-y-4">
                {col.paragraphs.map((p, j) => (
                  <Prose
                    key={j}
                    text={p}
                    className="text-[0.98rem] leading-relaxed text-white/60"
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 07 PERFORMANCE, ATTRIBUTION, AND RESULTS ---------- */}
      <section id="performance" className="relative z-10 border-y border-white/8 py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
          <div>
            <Reveal>
              <H2>{c.performance.h2}</H2>
              <GoldRule className="mt-8 max-w-xs" />
            </Reveal>
            {/* Decorative photograph; the funnel on screen is illustrative,
                not a reported result. */}
            <Reveal variant="blur" delay={120} className="relative mt-10">
              <Figure
                src={c.performance.image}
                alt={c.performance.imageAlt}
                ratio="16 / 9"
                fit="cover"
              />
            </Reveal>
          </div>
          {/* Founder revenue context stays as attributed text — not an agency
              result card and not a chart. */}
          <div className="space-y-5">
            {c.performance.paragraphs.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <Prose text={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 08 INDUSTRIES AND SPECIALTIES ---------- */}
      <section id="industries" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
        <Reveal className="max-w-2xl">
          <H2>{c.industries.h2}</H2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.industries.items.map((item, i) => (
            <Reveal
              key={item.h3}
              delay={i * 80}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <H3>{item.h3}</H3>
              <Prose
                text={item.body}
                className="mt-4 text-[0.98rem] leading-relaxed text-white/60"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 09 WHY MARKETING POWERED ---------- */}
      <section id="why-marketing-powered" className="relative z-10 border-y border-white/8 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal>
            <H2>{c.why.h2}</H2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
            {c.why.items.map((item, i) => (
              <Reveal key={item.h3} delay={i * 90} className="bg-[#050B16] p-8">
                <H3 className="text-[1.15rem]">{item.h3}</H3>
                <Prose
                  text={item.body}
                  className="mt-4 text-[0.95rem] leading-relaxed text-white/60"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 10 FINAL CALL TO ACTION ---------- */}
      <section id="strategy-call" className="relative z-10 px-6 py-24 lg:px-12 lg:py-28">
        <Reveal
          variant="blur"
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10"
          style={{
            background:
              "radial-gradient(130% 150% at 50% 0%, rgba(0,144,240,0.22), transparent 55%), radial-gradient(100% 120% at 100% 100%, rgba(0,168,96,0.16), transparent 55%), #071226",
          }}
        >
          <div className="relative grid gap-12 px-8 py-16 text-center md:px-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:text-left">
            <div>
              <H2 className="mx-auto max-w-3xl text-[clamp(2rem,4vw,3.4rem)] lg:mx-0">{c.close.h2}</H2>
              <div className="mx-auto mt-7 max-w-2xl space-y-4 lg:mx-0">
                {c.close.paragraphs.map((p, i) => (
                  <Prose key={i} text={p} className="leading-relaxed text-white/65" />
                ))}
              </div>
              <div className="mt-10 flex justify-center lg:justify-start">
                <StrategyCallButton />
              </div>
              <p className="mt-6 text-[0.95rem] text-white/60">
                {c.cta.emailPrompt}{" "}
                <a href={`mailto:${s.brand.email}`} className={LINK_CLS}>
                  {s.brand.email}
                </a>
                .
              </p>
            </div>
            {/* Decorative photograph of a strategy conversation. */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-[2px] rounded-[28px] opacity-80"
                style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#00A860)" }}
              />
              <Figure
                src={c.close.image}
                alt={c.close.imageAlt}
                ratio="16 / 9"
                rounded="26px"
                fit="cover"
                className="relative"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- FOOTER ---------- */}
      <Footer />

      {/* Mobile bar carries the same primary action as the hero and the close. */}
      <StickyMobileCta href={c.cta.href} label="Strategy call" />
    </div>
  );
}
