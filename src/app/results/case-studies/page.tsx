import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CtaBand from "@/components/site/CtaBand";
import { serif, mono } from "@/components/site/theme";
import { Kicker, GoldRule, PrimaryCta } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Case Studies & Results | Marketing Powered",
  description:
    "Aggregate results across $50M+ in managed behavioral and mental health ad spend. Detailed, HIPAA-conscious case studies available on request.",
  alternates: { canonical: "/results/case-studies/" },
  openGraph: {
    type: "website",
    title: "Case Studies & Results | Marketing Powered",
    description:
      "Aggregate results across $50M+ in managed behavioral and mental health ad spend. Detailed case studies available on request.",
    url: "/results/case-studies/",
  },
};

const STATS = [
  { value: "$50M+", label: "Managed ad spend across behavioral & mental health" },
  { value: "30–45%", label: "Typical reduction in cost per qualified lead" },
  { value: "2022", label: "Operating AI-native systems since" },
  { value: "Full", label: "Attribution tracked through to admission" },
];

export default function Page() {
  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url="/results/case-studies/" current="Case Studies" />
        <div className="mt-8 max-w-3xl">
          <Kicker>Results</Kicker>
          <h1
            className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.0]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Case studies & results
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            We&apos;ve managed over $50M in behavioral health and mental health ad spend, with
            attribution tracked all the way through to admission. Because our clients operate in a
            HIPAA-conscious space, we share named, detailed case studies privately rather than
            publishing them — request a walkthrough relevant to your vertical and we&apos;ll take
            you through the numbers.
          </p>
          <div className="mt-9">
            <PrimaryCta href="/get-started/request-an-audit/">Request the Case Studies</PrimaryCta>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <Reveal className="mb-8 flex items-center gap-4">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            By the numbers
          </span>
          <GoldRule className="flex-1" />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7"
            >
              <p
                className="text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-[#7FCBFF]"
                style={{ fontFamily: serif }}
              >
                {s.value}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        headline="Want the case studies for your vertical?"
        body="Tell us about your center and we'll walk you through relevant outcomes, including cost per admission trends, lead quality improvements, and intake conversion, alongside a free audit of your current marketing."
        ctaText="Request the Case Studies"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
