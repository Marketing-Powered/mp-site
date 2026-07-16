import Reveal from "@/components/Reveal";
import { ModalCta } from "./LeadModal";
import { getPage } from "@/lib/pages";
import PageShell from "./PageShell";
import Breadcrumbs from "./Breadcrumbs";
import Section from "./Section";
import StickyMobileCta from "./StickyMobileCta";
import FaqAccordion from "./FaqAccordion";
import { serif, mono } from "./theme";
import { Kicker, GoldRule } from "./ui";
import { siteContent as s } from "@/lib/content";

/* Text-heavy template for legal / utility documents. No hero banner,
   no image slots, tighter measure for readability. Keeps the shared
   chrome and a single quiet CTA pointing at contact. */
export default function LegalPage({ file }: { file: string }) {
  const page = getPage(file);
  const url = page.frontmatter.url || "/";

  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={url} current={page.h1} />
        <div className="mt-8">
          <Kicker>Legal</Kicker>
          <h1
            className="text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {page.h1}
          </h1>
          {page.lead && (
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/55">
              {page.lead}
            </p>
          )}
          <p
            className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/30"
            style={{ fontFamily: mono }}
          >
            Last updated · June 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* prose sections — Section is already max-w-3xl */}
      {page.sections.map((sec, i) => (
        <Section key={i} heading={sec.heading} nodes={sec.nodes} />
      ))}

      {page.faq.length > 0 && <FaqAccordion items={page.faq} />}

      {/* quiet contact CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-28 pt-6 lg:px-12">
        <Reveal
          variant="blur"
          className="rounded-[24px] border border-white/10 px-8 py-10 text-center"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%, rgba(0,144,240,0.10), transparent 60%), rgba(255,255,255,0.015)",
          }}
        >
          <p
            className="text-[1.25rem] leading-snug text-white/90"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            Questions about this policy?
          </p>
          <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/50">
            Reach our team and we&apos;ll walk you through anything you need clarified.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <ModalCta
              href="/company/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-14px_rgba(0,144,240,0.6)]"
            >
              Contact Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </ModalCta>
            <a
              href={`mailto:${s.brand.email}`}
              className="text-[13px] text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
            >
              {s.brand.email}
            </a>
          </div>
        </Reveal>
      </section>

      <StickyMobileCta />
    </PageShell>
  );
}
