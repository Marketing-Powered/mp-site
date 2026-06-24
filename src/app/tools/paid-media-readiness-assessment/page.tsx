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

const URL = "/tools/paid-media-readiness-assessment/";

export const metadata: Metadata = {
  title: "Paid Media Readiness Assessment Tool",
  description:
    "Identify your readiness for paid media success. Use our tool to assess maturity and get actionable insights to optimize spend and improve lead quality.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Paid Media Readiness Assessment Tool",
    description:
      "Identify your readiness for paid media success. Use our tool to assess maturity and get actionable insights to optimize spend and improve lead quality.",
    url: URL,
  },
};

const DIMENSIONS: AssessmentDimension[] = [
  {
    key: "attribution",
    name: "Attribution",
    question: "How far do you track a lead from a paid click?",
    options: [
      "Form fills / clicks only",
      "Calls + form fills",
      "Through to qualified lead in the CRM",
      "Closed-loop, through to admission",
    ],
    rec: "Build attribution that tracks click-to-admission, not just form fills — it's the foundation every other optimization relies on.",
  },
  {
    key: "compliance",
    name: "Compliance",
    question: "How is healthcare-advertising compliance handled?",
    options: [
      "No formal review / not sure",
      "Aware of the rules, no process",
      "LegitScript certified, periodic review",
      "LegitScript + HIPAA-aware, ongoing monitoring",
    ],
    rec: "Close compliance gaps first: LegitScript certification and a review process protect you from sensitive-vertical suspensions.",
  },
  {
    key: "channel",
    name: "Channel mix",
    question: "How is your paid spend distributed?",
    options: [
      "Single channel (e.g., Google only)",
      "Two channels",
      "Three or more, lightly managed",
      "Diversified and actively optimized by channel",
    ],
    rec: "Reduce concentration risk by diversifying beyond a single channel and managing budget allocation by performance.",
  },
  {
    key: "creative",
    name: "Creative & LP",
    question: "How aligned are your ads and landing pages?",
    options: [
      "One generic shared landing page",
      "A few dedicated pages",
      "Message-matched per campaign",
      "Message-matched and continuously tested",
    ],
    rec: "Match landing-page messaging to each campaign and test continuously — misalignment quietly tanks conversion on qualified clicks.",
  },
  {
    key: "budget",
    name: "Budget efficiency",
    question: "Which cost metrics do you actively track?",
    options: [
      "Spend only",
      "Cost per lead",
      "Cost per lead + conversion rate by channel",
      "Cost per admission + LTV by channel",
    ],
    rec: "Track cost per admission (not just cost per lead) so budget decisions reflect actual census outcomes.",
  },
];

const TIERS: AssessmentTier[] = [
  {
    max: 40,
    label: "Foundational",
    color: "#F2663C",
    msg: "Your program has significant gaps that put spend at risk. Address compliance and attribution before scaling budget.",
  },
  {
    max: 70,
    label: "Developing",
    color: "#F5B23E",
    msg: "The core is in place, but key gaps remain. Closing them is what separates a stable program from one ready to scale.",
  },
  {
    max: 100,
    label: "Scale-Ready",
    color: green,
    msg: "Your program is mature across the dimensions that matter. Refinement and channel-level optimization are where the next gains hide.",
  },
];

const FAQ = [
  {
    q: "What is paid media readiness?",
    a: "Paid media readiness measures your organization's ability to run paid advertising campaigns that produce qualified leads efficiently and compliantly. It encompasses tracking infrastructure, compliance posture, channel diversification, creative alignment, and budget benchmarking. Organizations with high readiness scores can scale spend confidently; those with gaps risk wasted budget and compliance exposure.",
  },
  {
    q: "How can a paid media assessment improve my strategy?",
    a: "A paid media assessment reveals where your current program underperforms relative to benchmarks and where it excels. It identifies specific gaps in attribution, compliance, and channel mix that, when addressed, improve lead quality and reduce cost-per-admission. The assessment prioritizes fixes so you act on the highest-impact items first rather than guessing where to start.",
  },
  {
    q: "Why should I conduct a paid media audit?",
    a: "Audits uncover inefficiencies that assessments flag but do not quantify. Common findings include wasted spend on underperforming audiences, retargeting campaigns violating healthcare ad policies, and attribution gaps hiding true ROI. An audit builds a remediation roadmap with projected impact, giving you a clear business case for each change.",
  },
  {
    q: "What metrics does the readiness assessment tool analyze?",
    a: "The tool evaluates cost-per-lead, cost-per-admission if tracked, conversion rates by channel, budget allocation across platforms, attribution model completeness, compliance posture against Google and Meta health policies, and creative-to-landing-page alignment. Each metric is scored against benchmarks from behavioral health operators managing significant monthly ad spend.",
  },
  {
    q: "How do I interpret the results of the assessment?",
    a: "Results are grouped into strengths, gaps, and risks. Risks require immediate attention because they represent compliance exposure or fundamental tracking failures. Gaps are improvement opportunities ranked by impact potential. Strengths are areas to maintain. Start with risks, then address gaps connected to your primary performance goal.",
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
              name: "Paid Media Readiness Assessment",
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
        <Breadcrumbs url={URL} current="Paid Media Readiness Assessment" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Free Tool</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Discover Your Paid Media Readiness
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Evaluate your organization&apos;s paid media maturity in minutes. Get actionable insights
            to optimize spend and improve lead quality.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <ScoredAssessment
          dimensions={DIMENSIONS}
          tiers={TIERS}
          scoreLabel="Readiness Score"
          contextSelect={{
            label: "Organization type",
            options: [
              { value: "treatment-center", label: "Treatment center" },
              { value: "multi-location", label: "Multi-location network" },
              { value: "mental-health-practice", label: "Mental health practice" },
              { value: "telehealth", label: "Telehealth / virtual care" },
            ],
          }}
          ctaText="Request a Marketing Audit"
          ctaLink="/get-started/request-an-audit/"
        />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      <Prose heading="Why Assess Your Paid Media Readiness?">
        <p>
          Paid media readiness determines whether your behavioral health organization can turn ad
          spend into qualified admissions. Without a clear understanding of your current maturity
          level, you risk pouring budget into channels that produce low-quality leads, create
          compliance exposure, or fail to track results back to actual admissions.
        </p>
        <p>
          Most treatment centers and mental health practices operate paid media programs without a
          structured framework for evaluating performance. They inherit campaigns from previous
          agencies, layer new tactics on top of outdated strategies, and lose visibility into what
          actually drives census growth. The result is wasted spend, unpredictable lead flow, and
          marketing decisions based on incomplete data.
        </p>
        <p>
          Our team has managed over $50M in behavioral health and mental health media spend. This
          assessment distills that operational experience into a tool you can complete in minutes to
          evaluate your own program across the dimensions that matter most.
        </p>
      </Prose>

      <Prose heading="What the Assessment Evaluates">
        <p>
          The assessment scores five dimensions: attribution infrastructure (do you track click to
          admission, not just form fills), compliance posture (Google sensitive-vertical
          restrictions, LegitScript, and platform health policies), channel mix maturity
          (concentration risk across Google, Meta, and programmatic), creative and landing-page
          alignment, and budget efficiency benchmarks.
        </p>
        <p>
          The output is not a generic report. It groups findings into strengths to maintain, gaps to
          address, and risks requiring immediate attention — then prioritizes recommendations.
          Focus first on the risks: compliance issues and attribution blind spots undermine
          everything else you do.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="Ready to see where you stand?"
        body="Your readiness report is a starting point. If you want us to review the results, send the details through the audit form and an operator who has managed $50M+ in behavioral health media spend will outline next steps."
        ctaText="Request a Marketing Audit"
        ctaLink="/get-started/request-an-audit/"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
