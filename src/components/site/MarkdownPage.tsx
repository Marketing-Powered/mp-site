import Reveal from "@/components/Reveal";
import { getPage } from "@/lib/pages";
import PageShell from "./PageShell";
import Breadcrumbs from "./Breadcrumbs";
import Section from "./Section";
import ImageSlot from "./ImageSlot";
import FaqAccordion from "./FaqAccordion";
import CtaBand from "./CtaBand";
import { serif } from "./theme";
import { Kicker, PrimaryCta, GoldRule } from "./ui";

const KICKERS: Record<string, string> = {
  services: "Capabilities",
  "ai-edge": "AI Edge",
  "who-we-help": "Who We Help",
  "get-started": "Get Started",
  company: "Marketing Powered",
};

function kickerFor(url: string) {
  const first = url.split("/").filter(Boolean)[0] || "company";
  return KICKERS[first] || "Marketing Powered";
}

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
  const heroCta = page.heroCta || { text: "Book a Discovery Call", link: "/get-started/" };

  // pick image-slot insertion points among the sections
  const n = page.sections.length;
  const slots = new Set<number>();
  if (n >= 2) slots.add(0);
  if (n >= 4) slots.add(Math.floor(n / 2));
  if (n >= 6) slots.add(n - 2);
  const slotLabels = ["Concept Illustration", "Process Infographic", "Results & Proof"];
  let slotCount = 0;

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
            <div className="mt-9">
              <PrimaryCta href={heroCta.link}>{heroCta.text}</PrimaryCta>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-[2px] rounded-[28px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#08AE67)" }}
            />
            <div className="relative">
              <ImageSlot label="Hero Banner" ratio="16 / 11" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- SECTIONS ---------- */}
      {page.sections.map((sec, i) => (
        <div key={i}>
          <Section heading={sec.heading} nodes={sec.nodes} />
          {slots.has(i) && (
            <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
              <ImageSlot
                label={slotLabels[slotCount++ % slotLabels.length]}
                ratio="16 / 7"
              />
            </div>
          )}
        </div>
      ))}

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
        />
      )}
    </PageShell>
  );
}
