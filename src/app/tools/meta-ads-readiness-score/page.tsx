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

const URL = "/tools/meta-ads-readiness-score";

export const metadata: Metadata = {
  title: "Meta Ads Readiness Score Tool | Marketing Powered",
  description:
    "Assess your Meta Ads readiness with our free tool. Get tailored insights to boost campaign efficiency and avoid compliance pitfalls.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Meta Ads Readiness Score Tool | Marketing Powered",
    description:
      "Assess your Meta Ads readiness with our free tool. Get tailored insights to boost campaign efficiency and avoid compliance pitfalls.",
    url: URL,
  },
};

const DIMENSIONS: AssessmentDimension[] = [
  {
    key: "account",
    name: "Account setup",
    question: "How is your Meta account configured?",
    options: [
      "Pixel only, basic setup",
      "Pixel + standard events",
      "Pixel + events + domain verified",
      "Pixel + events + Conversions API + domain verified",
    ],
    rec: "Complete your account foundation — Conversions API and domain verification are what keep measurement working under health restrictions.",
  },
  {
    key: "audience",
    name: "Audience strategy",
    question: "How do you build audiences within Meta's health restrictions?",
    options: [
      "Broad targeting, unsure of restrictions",
      "Interest targeting, no compliance review",
      "Compliant targeting, no behavioral-health retargeting",
      "Compliant targeting + CRM lookalikes within policy",
    ],
    rec: "Build audiences that respect Meta's sensitive-category rules — no behavioral-health retargeting — and lean on compliant CRM lookalikes instead.",
  },
  {
    key: "creative",
    name: "Creative compliance",
    question: "How do your creative and landing pages handle Meta's health policies?",
    options: [
      "Not reviewed for health policy",
      "Aware, informal checks",
      "Reviewed against Meta health policy",
      "Policy-reviewed + a tested compliant library",
    ],
    rec: "Review every ad and landing page against Meta's health policies before scaling — non-compliant creative is the fastest path to a restricted account.",
  },
  {
    key: "tracking",
    name: "Tracking & attribution",
    question: "How do you measure results without standard retargeting pixels?",
    options: [
      "Platform clicks only",
      "Pixel conversions",
      "Conversions API + first-party data",
      "CAPI + first-party data, tracked to admission",
    ],
    rec: "Strengthen first-party tracking and the Conversions API so you can optimize accurately when standard retargeting is off the table.",
  },
  {
    key: "landing",
    name: "Landing page readiness",
    question: "What is the state of your landing pages?",
    options: [
      "Generic site page, slow or unoptimized",
      "Dedicated page, basic",
      "Mobile-optimized with a clear conversion path",
      "Optimized + tested forms and page speed",
    ],
    rec: "Tighten landing-page speed, mobile experience, and form clarity — the best targeting still fails on a page that does not convert.",
  },
];

const TIERS: AssessmentTier[] = [
  {
    max: 39,
    label: "Low Readiness",
    color: "#F2663C",
    msg: "Significant work is needed before Meta Ads will perform. This is not a failure — it is a roadmap: fix the foundation, build compliant creative, configure tracking, then launch with confidence.",
  },
  {
    max: 74,
    label: "Moderate Readiness",
    color: "#F5B23E",
    msg: "You have the basics in place, but gaps exist. Address the weaknesses before scaling spend — prioritize compliance fixes first, then tracking, then creative expansion.",
  },
  {
    max: 100,
    label: "High Readiness",
    color: green,
    msg: "Your foundation is solid. Focus on scaling: increase budget incrementally, test new creative, expand audiences, and consider CRM lookalikes and Conversions API for sharper attribution.",
  },
];

const FAQ = [
  {
    q: "What is Meta Ads readiness?",
    a: "Meta Ads readiness measures how prepared your organization is to run effective, compliant advertising campaigns on Meta platforms, including Facebook and Instagram. It encompasses your account configuration, pixel and tracking setup, creative assets, audience strategy, and landing page infrastructure. For behavioral health and mental health organizations, readiness also includes compliance with Meta's health advertising policies and restrictions on sensitive category targeting.",
  },
  {
    q: "How can the Meta Ads audit tool help my business?",
    a: "The tool identifies specific gaps in your current Meta Ads setup before you waste budget on underperforming campaigns. It evaluates your tracking configuration, creative compliance, audience strategy, and conversion infrastructure. You receive a prioritized list of fixes rather than generic recommendations, allowing you to address foundational issues before scaling spend.",
  },
  {
    q: "Why is Facebook Ads readiness important for mental health organizations?",
    a: "Facebook Ads readiness determines whether your campaigns will perform efficiently or burn budget on low-quality leads and compliance violations. For mental health organizations, poor readiness often results in account restrictions, wasted spend on non-compliant creative, and attribution gaps that make optimization impossible. Assessing readiness first protects your budget and accelerates time to results.",
  },
  {
    q: "What areas does the Meta Ads Readiness Score assess?",
    a: "The assessment evaluates five core areas: account structure and pixel configuration, audience targeting strategy within health advertising restrictions, creative compliance with Meta policies, tracking and attribution infrastructure, and landing page readiness for conversion. Each area receives a score and specific recommendations for improvement.",
  },
  {
    q: "How often should I reassess my Meta Ads readiness?",
    a: "Reassess quarterly or whenever you make significant changes to your campaigns, targeting strategy, or conversion goals. Platform policies evolve, your business objectives shift, and what worked six months ago may no longer be optimal. Regular assessment catches configuration drift and identifies new optimization opportunities before they become performance problems.",
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
              name: "Meta Ads Readiness Score Tool",
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
        <Breadcrumbs url={URL} current="Meta Ads Readiness Score" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Free Tool</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Evaluate Your Meta Ads Readiness with Our Free Tool
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Understand where your Meta Ads strategy stands before you spend another dollar on
            campaigns that underperform.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <ScoredAssessment
          dimensions={DIMENSIONS}
          tiers={TIERS}
          scoreLabel="Meta Ads Health Score"
          ctaText="Request an Audit of Your Score"
          ctaLink="/get-started/request-an-audit"
        />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      <Prose heading="Why Assess Your Meta Ads Readiness?">
        <p>
          Running Meta Ads for a mental health or behavioral health organization is not the same as
          running them for e-commerce or SaaS. The compliance requirements are stricter, the audience
          targeting options are more limited, and the cost of getting it wrong extends beyond wasted
          ad spend to potential certification issues and platform bans.
        </p>
        <p>
          A proper Meta Ads readiness assessment answers specific questions before you commit budget.
          Do you have compliant creative assets? Is your pixel configured correctly for healthcare
          restrictions? Can you track conversions without relying on prohibited retargeting? Do you
          have the landing page infrastructure to convert traffic once it arrives?
        </p>
        <p>
          The organizations that scale Meta Ads profitably in behavioral health are the ones that
          assess their readiness first, build the right foundation, and then scale deliberately. This
          tool gives you the starting point.
        </p>
      </Prose>

      <Prose heading="Interpreting Your Meta Ads Health Score">
        <p>
          Your readiness score falls into one of three categories. <strong>High Readiness (75–100)</strong>{" "}
          means your foundation is solid — focus on scaling. <strong>Moderate Readiness (40–74)</strong>{" "}
          means the basics are in place but gaps exist; fix compliance first, then tracking, then
          creative. <strong>Low Readiness (0–39)</strong> means foundational work is needed before
          Meta Ads will perform.
        </p>
        <p>
          Regardless of your score, the assessment provides specific next steps rather than generic
          advice. Start with compliance and configuration issues — no amount of budget optimization
          overcomes a fundamentally broken foundation — then address tracking gaps, then build a
          creative and audience testing roadmap.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="Ready to see where you stand?"
        body="When you complete your Meta Ads readiness assessment, request an audit to review your results with our team. We'll walk through your score, identify the highest-impact fixes, and help you build a path to compliant, high-performing campaigns backed by $50M+ in managed behavioral health media spend."
        ctaText="Request a Free Audit"
        ctaLink="/get-started/request-an-audit"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
