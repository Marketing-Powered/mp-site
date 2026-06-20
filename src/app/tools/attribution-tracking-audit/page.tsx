import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBand from "@/components/site/CtaBand";
import { Kicker, GoldRule } from "@/components/site/ui";
import { serif, green } from "@/components/site/theme";
import ScoredAssessment, {
  type AssessmentDimension,
  type AssessmentTier,
} from "@/components/site/ScoredAssessment";

const URL = "/tools/attribution-tracking-audit/";

export const metadata: Metadata = {
  title: "Attribution Audit Tool | Accurate Tracking Insights",
  description: "Optimize ad spend with our Attribution Audit Tool. Accurate data insights.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Attribution Audit Tool | Accurate Tracking Insights",
    description: "Optimize ad spend with our Attribution Audit Tool. Accurate data insights.",
    url: URL,
  },
};

const DIMENSIONS: AssessmentDimension[] = [
  {
    key: "coverage",
    name: "Conversion coverage",
    question: "Which conversion actions do you currently track?",
    options: [
      "Form submissions only",
      "Forms + phone calls",
      "Forms + calls + chat",
      "Forms + calls + chat + offline admissions",
    ],
    rec: "Track every conversion action — phone calls, chat, and offline admissions, not just form fills — so no qualified path goes unrecorded.",
  },
  {
    key: "reconciliation",
    name: "Data validation",
    question: "Do your GA4, ad platform, CRM, and call-tracking numbers reconcile?",
    options: [
      "We don't compare them",
      "They differ significantly / unsure",
      "Roughly aligned, occasional checks",
      "Reconciled and validated regularly",
    ],
    rec: "Validate that GA4, your ad platforms, CRM, and call tracking agree — unreconciled systems are where 15–40% of conversions quietly disappear.",
  },
  {
    key: "model",
    name: "Attribution model",
    question: "What attribution model assigns credit across touchpoints?",
    options: [
      "Last-click only",
      "Last-click, aware of its limits",
      "Data-driven or position-based",
      "Multi-touch, tracked through to admission",
    ],
    rec: "Move beyond last-click: with multi-day, multi-session patient journeys, last-click hides the campaigns that actually start the journey.",
  },
  {
    key: "offline",
    name: "Offline connection",
    question: "Do offline admissions connect back to the digital touchpoint?",
    options: [
      "No offline conversion tracking",
      "Manual / partial matching",
      "Offline conversion imports configured",
      "Closed-loop click-to-admission",
    ],
    rec: "Connect offline admissions to their originating click — without it, paid media looks far less effective than it actually is.",
  },
  {
    key: "compliance",
    name: "Compliant tracking",
    question: "Is your tracking built for healthcare sensitive-vertical rules?",
    options: [
      "Not sure / no review",
      "Aware but not validated",
      "Configured for the restrictions",
      "Compliance-reviewed, no PHI exposure, monitored",
    ],
    rec: "Confirm your tracking respects Google's sensitive-vertical restrictions and never exposes PHI while still capturing accurate performance data.",
  },
];

const TIERS: AssessmentTier[] = [
  {
    max: 40,
    label: "High Leakage",
    color: "#F2663C",
    msg: "A large share of your conversions is likely lost or misattributed. Budget decisions are running on incomplete data.",
  },
  {
    max: 70,
    label: "Partial Visibility",
    color: "#F5B23E",
    msg: "Core tracking is in place, but blind spots remain — especially around offline admissions and multi-touch journeys.",
  },
  {
    max: 100,
    label: "Closed-Loop",
    color: green,
    msg: "Your attribution traces clicks through to admission with validated data. Optimization decisions rest on solid ground.",
  },
];

const FAQ = [
  {
    q: "What is an attribution audit?",
    a: "An attribution audit is a systematic review of your marketing tracking infrastructure to verify that conversions are recorded accurately and credited to the correct channels, campaigns, and touchpoints. The audit identifies gaps where data is lost, misattributed, or incomplete. For behavioral health organizations, this includes validating phone call tracking, form submissions, and offline admission imports while respecting privacy and compliance requirements.",
  },
  {
    q: "How does an attribution audit improve marketing strategies?",
    a: "Accurate attribution data lets you make budget decisions based on which channels actually produce admissions, not just clicks or leads. When you can trace a patient from first touchpoint through intake, you can calculate true cost per acquisition and identify which campaigns deserve increased investment. This data also supports strategic planning conversations with leadership by providing evidence for budget recommendations.",
  },
  {
    q: "Why is a tracking audit important for behavioral health organizations?",
    a: "Behavioral health operates under Google Ads sensitive vertical restrictions, which prohibit retargeting and limit certain tracking methods. A tracking audit ensures your analytics setup works within these constraints while still providing accurate performance data. Proper tracking also supports compliance documentation by demonstrating marketing activity without exposing protected health information.",
  },
  {
    q: "Can the audit tool integrate with GA4?",
    a: "Yes. The audit includes a full review of your Google Analytics 4 configuration, including event tracking, conversion actions, and data stream settings. We validate that GA4 data aligns with your Google Ads conversion tracking, CRM records, and call tracking platforms. If gaps exist between systems, the audit identifies the specific integration points that need correction.",
  },
];

function Prose({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-10 lg:px-12">
      <h2
        className="text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.1]"
        style={{ fontFamily: serif, fontWeight: 400 }}
      >
        {heading}
      </h2>
      <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-white/60">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Attribution Tracking Audit",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: `https://marketingpowered.ai${URL}`,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={URL} current="Attribution Tracking Audit" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Free Tool</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Discover Your Attribution Insights with Our Audit Tool
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Stop guessing which channels drive admissions. Get a clear picture of your marketing
            attribution with an assessment built for behavioral health.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <ScoredAssessment
          dimensions={DIMENSIONS}
          tiers={TIERS}
          scoreLabel="Attribution Health"
          leakage={{
            max: 40,
            min: 5,
            label: "of conversions likely unattributed or misattributed at this level.",
          }}
          ctaText="Request Your Attribution Audit"
          ctaLink="/get-started/request-an-audit/"
        />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      <Prose heading="Understanding Attribution Audits">
        <p>
          An attribution audit examines your entire marketing data infrastructure to identify where
          tracking breaks down, where conversions go unrecorded, and where your reporting tells an
          incomplete story. For behavioral health organizations managing significant ad budgets, even
          small gaps in attribution can mean thousands of dollars allocated to the wrong channels
          each month.
        </p>
        <p>
          Most treatment centers we work with discover that 15% to 40% of their conversions are
          either unattributed or misattributed when we run an initial audit. Phone calls get credited
          to the wrong campaign. Form submissions drop out of the funnel before reaching your CRM.
          Offline admissions never connect back to the digital touchpoint that started the journey.
        </p>
        <p>
          A proper marketing attribution audit maps every conversion action, validates that tracking
          fires correctly at each stage, and confirms that the data flowing into your dashboards
          reflects reality. Without this foundation, optimization decisions are built on incomplete
          information.
        </p>
      </Prose>

      <Prose heading="How the Audit Scores Your Setup">
        <p>
          The assessment scores five dimensions drawn from a full technical audit: conversion
          coverage (form fills, calls, chat, offline admissions), data validation (whether GA4, your
          ad platforms, CRM, and call tracking reconcile), attribution model (last-click versus
          multi-touch across a multi-day patient journey), offline-to-digital connection, and
          compliance-aware tracking.
        </p>
        <p>
          Findings group into strengths, gaps, and risks, with an estimate of how much of your
          conversion data is likely leaking. Where the tool identifies gaps, a full audit quantifies
          the opportunity cost and builds a prioritized remediation roadmap — the same process behind
          attribution work across $50M+ in managed behavioral health and mental health media spend.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="Request your attribution audit"
        body="Get a technical review of your current tracking setup: identify gaps, correct misattributions, and build the data foundation for smarter budget decisions — backed by operators who tracked attribution through to admission while scaling from 3 to 24 locations."
        ctaText="Request Your Attribution Audit"
        ctaLink="/get-started/request-an-audit/"
        secondaryCta={{ text: "Book a Strategy Call", link: "/get-started/book-a-call/" }}
      />
    </PageShell>
  );
}
