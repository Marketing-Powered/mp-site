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

const URL = "/tools/intake-funnel-health-check";

export const metadata: Metadata = {
  title: "Intake Funnel Health Check Tool | Optimize Admissions",
  description:
    "Enhance your clinic's admissions with our intake funnel health check tool. Identify gaps and increase effectiveness. Try it today!",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "Intake Funnel Health Check Tool | Optimize Admissions",
    description:
      "Enhance your clinic's admissions with our intake funnel health check tool. Identify gaps and increase effectiveness. Try it today!",
    url: URL,
  },
};

const DIMENSIONS: AssessmentDimension[] = [
  {
    key: "coverage",
    name: "Call coverage",
    question: "How well do you answer inbound calls across time blocks?",
    options: [
      "Business hours only, many missed",
      "Business hours well covered, gaps after hours",
      "Extended hours, occasional weekend gaps",
      "24/7 coverage including weekends",
    ],
    rec: "Close after-hours and weekend coverage gaps — those time blocks routinely convert well below weekday rates and quietly cost admissions.",
  },
  {
    key: "callback",
    name: "Callback speed",
    question: "How fast do you call back web forms and missed calls?",
    options: [
      "4+ hours, or no defined process",
      "1–4 hours",
      "Under 1 hour",
      "Under 30 minutes, automated alerts",
    ],
    rec: "Cut callback time toward sub-30 minutes — patients contact multiple facilities at once, and speed-to-lead is decisive for form-to-admission conversion.",
  },
  {
    key: "verification",
    name: "Insurance verification",
    question: "How fast and clear is your insurance verification (VOB) workflow?",
    options: [
      "Manual, slow, frequent delays",
      "Defined but slow on some plans",
      "Same-day VOB for most plans",
      "Rapid VOB with proactive patient communication",
    ],
    rec: "Speed up VOB turnaround and keep patients informed — verification delays are a common point where ready-to-admit prospects go elsewhere.",
  },
  {
    key: "capacity",
    name: "Coordinator capacity",
    question: "How does admission coordinator staffing match call volume?",
    options: [
      "Volume regularly exceeds staffing",
      "Strained on high-volume days",
      "Adequate with occasional backlog",
      "Staffed to peak with overflow handling",
    ],
    rec: "Staff admission coordination to peak volume so high-traffic days don't create callback backlogs that lose otherwise-qualified admissions.",
  },
  {
    key: "attribution",
    name: "Source-to-admission",
    question: "Can you trace admissions back to the marketing source?",
    options: [
      "Lead-stage metrics only",
      "Some source tracking, breaks at intake",
      "Source tracked to qualified lead",
      "Closed-loop source-to-admission attribution",
    ],
    rec: "Connect marketing source through to admission — without it you can't tell which channels deliver census, only which deliver raw leads.",
  },
];

const TIERS: AssessmentTier[] = [
  {
    max: 40,
    label: "High Leakage",
    color: "#F2663C",
    msg: "Your intake funnel is losing a large share of qualified leads between first contact and completed intake. The fixes here often beat additional ad spend on speed-to-ROI.",
  },
  {
    max: 70,
    label: "Recoverable Gaps",
    color: "#F5B23E",
    msg: "You convert, but you're leaving admissions on the table. Targeted operational fixes — coverage, callback speed, verification — can lift conversion without more media spend.",
  },
  {
    max: 100,
    label: "Optimized Funnel",
    color: green,
    msg: "Your intake converts efficiently from contact to admission. Maintain the discipline and keep source-to-admission attribution sharp to protect every marketing dollar.",
  },
];

const FAQ = [
  {
    q: "What is an intake funnel health check?",
    a: "An intake funnel health check is a systematic evaluation of your admissions process from first contact through completed admission. It identifies where qualified leads drop out of your funnel, whether due to call handling gaps, verification delays, staffing bottlenecks, or handoff failures. For behavioral health facilities, this diagnostic reveals the specific operational factors causing lost admissions and prioritizes fixes by estimated revenue impact.",
  },
  {
    q: "How can an intake audit improve operations?",
    a: "An intake audit exposes the hidden conversion losses in your admissions workflow. By measuring call answer rates, callback speed, verification turnaround, and admission coordinator capacity, you identify exactly which operational changes will affect census most directly. Facilities typically find 2-3 high-impact gaps that, when addressed, improve lead-to-admission conversion rates without requiring additional marketing spend.",
  },
  {
    q: "What are the benefits of a call funnel audit?",
    a: "A call funnel audit connects marketing performance to intake reality. You learn which lead sources convert best at the admission stage (not just the lead stage), where call handling quality varies by time or staffing, and how quickly your team responds to inquiries. These insights let you reallocate marketing budget toward higher-converting channels and focus operational improvements where they affect revenue most.",
  },
  {
    q: "How does the tool enhance the intake process?",
    a: "The tool evaluates your intake funnel across five categories: call coverage, callback speed, insurance verification workflow, admission coordinator capacity, and attribution completeness. You receive a score for each category plus prioritized recommendations based on patterns validated across $50M+ in managed behavioral health media spend. The output is actionable, specific to your facility type, and ranked by estimated census impact.",
  },
  {
    q: "Can I see real-life examples of successful audits?",
    a: "Yes. Facilities using this intake funnel diagnostic have achieved measurable improvements: one network increased weekend conversion rates by matching weekday performance after addressing coverage and training gaps; another reduced cost per admission by 31% by reallocating budget based on admission-stage attribution; a third increased form-to-admission conversion by 28% by reducing callback time. Visit our success stories for additional case examples.",
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
              name: "Intake Funnel Health Check",
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
        <Breadcrumbs url={URL} current="Intake Funnel Health Check" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Free Tool</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Optimize Your Admissions with the Intake Funnel Health Check
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Identify the gaps costing you admissions. This free diagnostic pinpoints exactly where
            your intake process loses qualified leads.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <ScoredAssessment
          dimensions={DIMENSIONS}
          tiers={TIERS}
          scoreLabel="Intake Funnel Health"
          leakage={{
            max: 50,
            min: 8,
            label: "of potential admissions likely lost between first contact and completed intake.",
          }}
          ctaText="Request an Intake Audit"
          ctaLink="/get-started/request-an-audit"
        />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      <Prose heading="Understanding the Importance of an Intake Funnel Health Check">
        <p>
          Every missed call, slow callback, and unclear admission pathway costs your facility
          revenue. For behavioral health providers, the intake funnel is where marketing spend either
          converts to census or disappears. An intake funnel health check gives you a structured way
          to identify exactly where qualified leads fall out of your admissions process.
        </p>
        <p>
          Most treatment centers lose 30% to 50% of potential admissions between first contact and
          completed intake. The causes vary: hold times exceed tolerance, after-hours coverage gaps,
          insurance verification delays, or handoff failures between marketing-generated calls and
          admission coordinators. Without a systematic admissions funnel audit, these losses remain
          invisible while your cost per admission climbs.
        </p>
        <p>
          This diagnostic matters because behavioral health operates under constraints other verticals
          do not face. You cannot retarget website visitors. You cannot follow up with abandoned form
          fills the same way an e-commerce brand can. Every lead that enters your funnel needs to
          convert on that interaction or through carefully compliant follow-up.
        </p>
      </Prose>

      <Prose heading="What the Health Check Scores">
        <p>
          The tool evaluates your intake funnel across five categories that predict census
          performance: call coverage by time block, speed-to-callback, insurance verification
          workflow, admission coordinator capacity, and source-to-admission attribution. Answer
          honestly — optimistic answers produce optimistic, useless recommendations.
        </p>
        <p>
          Each category receives a score, and findings group into strengths, gaps, and risks with
          recommendations ranked by impact. The consistent finding across $50M+ in managed behavioral
          health media spend: intake improvements often yield faster ROI than additional ad spend. A
          10% improvement in call-to-admission conversion can deliver more census impact than a 20%
          increase in lead volume.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="See where your intake funnel is losing admissions"
        body="Your intake funnel is either converting the leads your marketing generates or wasting them. If the results reveal gaps you want help addressing, request an audit and send the details to a team that has scaled behavioral health operations through multi-market growth."
        ctaText="Request a Free Audit"
        ctaLink="/get-started/request-an-audit"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
