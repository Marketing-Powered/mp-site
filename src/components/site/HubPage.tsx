import Reveal from "@/components/Reveal";
import { getPage, HUB_CHILDREN, cardBlurb } from "@/lib/pages";
import PageShell from "./PageShell";
import Breadcrumbs from "./Breadcrumbs";
import Section from "./Section";
import ServiceCard from "./ServiceCard";
import ImageSlot from "./ImageSlot";
import { pageImages } from "./pageImages";
import FaqAccordion from "./FaqAccordion";
import CtaBand from "./CtaBand";
import { serif } from "./theme";
import { Kicker, PrimaryCta, GoldRule } from "./ui";

export default function HubPage({
  file,
  kicker = "Overview",
  cardKicker = "Explore",
  cards,
}: {
  file: string;
  kicker?: string;
  cardKicker?: string;
  /** override card list; defaults to the registered children of this hub */
  cards?: { href: string; title: string; description: string }[];
}) {
  const page = getPage(file);
  const url = page.frontmatter.url || "/";
  const heroCta = page.heroCta || { text: "Book a Discovery Call", link: "/get-started/" };
  const overviewImg = pageImages(url)[1];

  const children =
    cards ||
    (HUB_CHILDREN[file] || []).map((c) => {
      const child = getPage(c.file);
      return { href: c.href, title: child.h1, description: cardBlurb(c.file) };
    });

  return (
    <PageShell>
      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={url} current={page.h1} />
        <div className="mt-8 max-w-3xl">
          <Kicker>{kicker}</Kicker>
          <h1
            className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.0]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {page.h1}
          </h1>
          {page.lead && (
            <p className="mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
              {page.lead}
            </p>
          )}
          <div className="mt-9">
            <PrimaryCta href={heroCta.link}>{heroCta.text}</PrimaryCta>
          </div>
        </div>
      </section>

      {/* ---------- CARD GRID ---------- */}
      {children.length > 0 && (
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-12">
          <Reveal className="mb-8 flex items-center gap-4">
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {cardKicker}
            </span>
            <GoldRule className="flex-1" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {children.map((c, i) => (
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

      {/* ---------- supporting copy ---------- */}
      {page.sections.slice(0, 4).map((sec, i) => (
        <div key={i}>
          <Section heading={sec.heading} nodes={sec.nodes} />
          {i === 1 && (
            <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
              <ImageSlot
                label="Capabilities Overview"
                ratio="16 / 7"
                src={overviewImg?.src}
                alt={overviewImg?.alt}
                fit={overviewImg?.fit}
              />
            </div>
          )}
        </div>
      ))}

      <FaqAccordion items={page.faq} />
      <CtaBand />
    </PageShell>
  );
}
