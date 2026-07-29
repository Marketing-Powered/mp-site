import Reveal from "@/components/Reveal";
import { getPage, HUB_CHILDREN, cardBlurb } from "@/lib/pages";
import PageShell from "./PageShell";
import Breadcrumbs from "./Breadcrumbs";
import Section from "./Section";
import ServiceCard from "./ServiceCard";
import ImageSlot from "./ImageSlot";
import { pageImages } from "./pageImages";
import InlineCta from "./InlineCta";
import StickyMobileCta from "./StickyMobileCta";
import FaqAccordion from "./FaqAccordion";
import CtaBand from "./CtaBand";
import TrackedLink from "./TrackedLink";
import { serif } from "./theme";
import { Kicker, PrimaryCta, GoldRule } from "./ui";
import { siteContent as s } from "@/lib/content";

const KICKERS: Record<string, string> = {
  services: "Capabilities",
  "ai-edge": "AI Edge",
  "who-we-help": "Who We Help",
  "get-started": "Get Started",
  problems: "Problems We Solve",
  company: "Marketing Powered",
};

function kickerFor(url: string) {
  const first = url.split("/").filter(Boolean)[0] || "company";
  return KICKERS[first] || "Marketing Powered";
}

/* Rotating set of inline CTAs woven between content sections. */
const INLINE_CTAS = [
  {
    variant: "primary" as const,
    headline: "Want a straight read on where your budget is leaking?",
    ctaText: "Request a Free Audit",
    ctaLink: "/get-started/request-an-audit",
  },
  {
    variant: "email" as const,
    headline: "Prefer to send the context directly?",
    ctaText: "Email Us",
    ctaLink: `mailto:${s.brand.email}`,
  },
  {
    variant: "secondary" as const,
    headline: "Want to start with a quick message?",
    ctaText: "Contact Us",
    ctaLink: "/company/contact",
  },
];

export default function MarkdownPage({
  file,
  kicker,
  children,
  cta,
  hideCta = false,
}: {
  file: string;
  kicker?: string;
  children?: React.ReactNode;
  cta?: { headline?: string; body?: string; ctaText?: string; ctaLink?: string };
  hideCta?: boolean;
}) {
  const page = getPage(file);
  const url = page.frontmatter.url || "/";

  const heroCta = page.heroCta || {
    text: "Request a Free Audit",
    link: "/get-started/request-an-audit",
  };

  // hub vertical pages (behavioral-health, mental-health) get child cards
  const hubChildren = (HUB_CHILDREN[file] || []).map((c) => {
    const child = getPage(c.file);
    return { href: c.href, title: child.h1, description: cardBlurb(c.file) };
  });

  // image-slot insertion points among the sections
  const n = page.sections.length;
  const slots = new Set<number>();
  if (n >= 2) slots.add(0);
  if (n >= 4) slots.add(Math.floor(n / 2));
  if (n >= 6) slots.add(n - 2);
  const slotLabels = ["Concept Illustration", "Process Infographic", "Results & Proof"];
  let slotCount = 0;

  // brand imagery for this route: [0] hero, [1..] section slots
  const imgs = pageImages(url);
  const heroImg = imgs[0];

  // inline-CTA insertion: after every ~3rd section, never after the last one
  let ctaCount = 0;

  return (
    <PageShell>
      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={url} current={page.h1} />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Kicker>{kicker || kickerFor(url)}</Kicker>
            <h1
              className="text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.02]"
              style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {page.h1}
            </h1>
            {page.lead && (
              <p className="mt-7 max-w-xl text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-white/55">
                {page.lead}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCta href={heroCta.link} trackLocation="hero">
                {heroCta.text}
              </PrimaryCta>
              <TrackedLink
                href={`mailto:${s.brand.email}`}
                location="hero"
                className="text-[13px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#7FCBFF]"
              >
                or email us →
              </TrackedLink>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#08AE67)" }}
            />
            <div className="relative">
              <ImageSlot
                label="Hero Banner"
                ratio="16 / 9"
                src={heroImg?.src}
                alt={heroImg?.alt}
                fit={heroImg?.fit}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- hub child cards (vertical hubs only) ---------- */}
      {hubChildren.length > 0 && (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <Reveal className="mb-8 flex items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
              style={{ fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}
            >
              Explore
            </span>
            <GoldRule className="flex-1" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hubChildren.map((c, i) => (
              <ServiceCard
                key={c.href}
                index={i}
                title={c.title}
                description={c.description}
                href={c.href}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---------- SECTIONS ---------- */}
      {page.sections.map((sec, i) => {
        const isLast = i === n - 1;
        const showInlineCta = !isLast && (i + 1) % 3 === 0;
        const inlineCta = showInlineCta ? INLINE_CTAS[ctaCount++ % INLINE_CTAS.length] : null;
        return (
          <div key={i}>
            <Section heading={sec.heading} nodes={sec.nodes} />
            {slots.has(i) &&
              (() => {
                const label = slotLabels[slotCount % slotLabels.length];
                const sectionImg = imgs[1 + slotCount];
                slotCount++;
                return (
                  <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
                    <ImageSlot
                      label={label}
                      ratio="16 / 9"
                      src={sectionImg?.src}
                      alt={sectionImg?.alt}
                      fit={sectionImg?.fit}
                    />
                  </div>
                );
              })()}
            {inlineCta && (
              <InlineCta
                headline={inlineCta.headline}
                ctaText={inlineCta.ctaText}
                ctaLink={inlineCta.ctaLink}
                variant={inlineCta.variant}
              />
            )}
          </div>
        );
      })}

      {/* ---------- injected custom content (forms, etc.) ---------- */}
      {children}

      {/* ---------- FAQ ---------- */}
      <FaqAccordion items={page.faq} />

      {/* ---------- CTA ---------- */}
      {!hideCta && (
        <CtaBand
          headline={cta?.headline}
          body={cta?.body}
          ctaText={cta?.ctaText}
          ctaLink={cta?.ctaLink}
          secondaryCta={{ text: "Email Us", link: `mailto:${s.brand.email}` }}
        />
      )}

      <StickyMobileCta />
    </PageShell>
  );
}
