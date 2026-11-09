import Reveal from "@/components/Reveal";
import { getPage, HUB_CHILDREN, cardBlurb, relatedSiblings } from "@/lib/pages";
import PageShell from "./PageShell";
import RelatedCards from "./RelatedCards";
import Breadcrumbs from "./Breadcrumbs";
import Section from "./Section";
import ServiceCard from "./ServiceCard";
import ImageSlot from "./ImageSlot";
import { pageImages } from "./pageImages";
import InlineCta from "./InlineCta";
import StickyMobileCta from "./StickyMobileCta";
import FaqAccordion from "./FaqAccordion";
import CtaBand from "./CtaBand";
import { serif } from "./theme";
import { Kicker, PrimaryCta, GoldRule } from "./ui";
import { siteContent as s } from "@/lib/content";
import { getAuthor, authorPersonSchema } from "@/lib/authors";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

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
  formFirst,
}: {
  file: string;
  kicker?: string;
  children?: React.ReactNode;
  cta?: { headline?: string; body?: string; ctaText?: string; ctaLink?: string };
  hideCta?: boolean;
  /** Conversion pages: render `children` (the form) directly under the hero
      instead of after every content section, and point the hero CTA at it.
      `id` is the form section's id; `ctaText` overrides the hero button copy.
      On a phone the form otherwise lands 6–7 screens down. */
  formFirst?: { id: string; ctaText?: string };
}) {
  const page = getPage(file);
  const url = page.frontmatter.url || "/";
  const author = getAuthor(page.frontmatter.author);

  const heroCta = formFirst
    ? {
        text: formFirst.ctaText ?? page.heroCta?.text ?? "Request a Free Audit",
        link: `#${formFirst.id}`,
      }
    : page.heroCta || {
        text: "Request a Free Audit",
        link: "/get-started/request-an-audit",
      };

  // hub vertical pages (behavioral-health, mental-health) get child cards
  const hubChildren = (HUB_CHILDREN[file] || []).map((c) => {
    const child = getPage(c.file);
    return { href: c.href, title: child.h1, description: cardBlurb(c.file) };
  });

  // child pages cross-link 3 siblings under the same hub (cyclic neighbors),
  // so every child is reachable from several internal pages, not just the hub
  const related = relatedSiblings(file);

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

  /* Article schema for bylined pages, with the author as a stable Person
     entity so search engines tie the piece to the founder named on the
     homepage Organization record. */
  const articleJsonLd = author
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: page.h1,
        ...(page.seo.description ? { description: page.seo.description } : {}),
        url: `${SITE_URL}${url.replace(/\/+$/, "")}`,
        mainEntityOfPage: `${SITE_URL}${url.replace(/\/+$/, "")}`,
        ...(heroImg?.src ? { image: `${SITE_URL}${heroImg.src}` } : {}),
        author: authorPersonSchema(author),
        publisher: { "@id": `${SITE_URL}/#organization` },
      }
    : null;

  return (
    <PageShell>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
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
            {author && (
              <p className="mt-6 text-[0.95rem] text-white/55">
                <span className="text-white/40">By </span>
                <Link
                  href={author.href}
                  rel="author"
                  className="text-[#7FCBFF] underline decoration-[#0090F0]/50 underline-offset-4 transition-colors hover:text-white hover:decoration-[#7FCBFF]"
                >
                  {author.name}
                </Link>
                <span className="text-white/40">, {author.jobTitle}</span>
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCta href={heroCta.link}>{heroCta.text}</PrimaryCta>
              <a
                href={`mailto:${s.brand.email}`}
                className="text-[13px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#7FCBFF]"
              >
                or email us →
              </a>
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
                ratio={heroImg?.ratio ?? "16 / 9"}
                src={heroImg?.src}
                alt={heroImg?.alt}
                fit={heroImg?.fit}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- form-first pages: the form sits right under the hero ---------- */}
      {formFirst && children}

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
                // Pages deliberately carry fewer images than slots (max two
                // per guide); an empty slot renders nothing rather than a
                // dashed placeholder.
                if (!sectionImg) return null;
                const ratio = sectionImg.ratio ?? "16 / 9";
                const narrow = ratio !== "16 / 9";
                return (
                  <div
                    className={`mx-auto px-6 py-8 lg:px-12 ${narrow ? "max-w-xl" : "max-w-5xl"}`}
                  >
                    <ImageSlot
                      label={label}
                      ratio={ratio}
                      src={sectionImg.src}
                      alt={sectionImg.alt}
                      fit={sectionImg.fit}
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
      {!formFirst && children}

      {/* ---------- FAQ ---------- */}
      <FaqAccordion items={page.faq} />

      {/* ---------- sibling pages under the same hub ---------- */}
      {related && <RelatedCards kicker={related.kicker} items={related.items} />}

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
