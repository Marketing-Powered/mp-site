import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBand from "@/components/site/CtaBand";
import { Kicker, GoldRule, PrimaryCta } from "@/components/site/ui";
import { serif } from "@/components/site/theme";
import CpaCalculator from "./CpaCalculator";

const URL = "/tools/cpa-benchmark-calculator/";

export const metadata: Metadata = {
  title: "CPA Calculator Tool - Marketing Powered",
  description:
    "Access accurate CPA benchmarks with our calculator. Ideal for marketers managing ad spend.",
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: "CPA Calculator Tool - Marketing Powered",
    description:
      "Access accurate CPA benchmarks with our calculator. Ideal for marketers managing ad spend.",
    url: URL,
  },
};

const FAQ = [
  {
    q: "What is a CPA calculator used for?",
    a: "A CPA calculator determines the cost to acquire a single customer by dividing total advertising spend by the number of conversions. Marketers use it to evaluate campaign efficiency, set budgets, and compare performance against industry benchmarks. The calculation is straightforward (spend divided by conversions equals CPA), but the value comes from tracking it consistently and acting on what the numbers reveal.",
  },
  {
    q: "How can I use CPA benchmarks effectively?",
    a: "Use benchmarks to set realistic campaign goals before launch and to evaluate performance after. Compare your CPA against the industry average for your vertical and channel. If you consistently beat the benchmark, consider scaling spend. If you consistently miss it, investigate targeting, creative, or offer quality before increasing the budget.",
  },
  {
    q: "What metrics are essential in CPA calculations?",
    a: "The core inputs are total ad spend and the number of conversions, such as leads, sales, or other defined actions. For deeper analysis, add conversion rate, click-through rate, and cost per click to identify where in the funnel performance breaks down. In industries with longer sales cycles, tie CPA to downstream metrics like close rate and lifetime value.",
  },
  {
    q: "Can CPA calculators save money on advertising?",
    a: "CPA calculators do not save money directly, but they reveal where money is wasted. By identifying campaigns, channels, or audiences with above-benchmark CPAs, you can reallocate spend toward what works. Teams that track CPA weekly and act on the data typically reduce wasted spend by pausing underperformers faster than teams that review monthly or quarterly.",
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
              name: "CPA Benchmark Calculator",
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

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={URL} current="CPA Benchmark Calculator" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Free Tool</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Use Our CPA Calculator for Accurate Benchmarks
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Input your campaign data, compare against industry standards, and identify where your ad
            spend can work harder.
          </p>
        </div>
      </section>

      {/* ---------- CALCULATOR ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <CpaCalculator />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- SUPPORTING COPY ---------- */}
      <Prose heading="Why Use a CPA Calculator?">
        <p>
          Every dollar in your advertising budget should pull its weight. A CPA calculator gives you
          the math to prove whether it does. By dividing total campaign spend by the number of
          conversions, you get a single number that answers the question: what did each new customer
          actually cost?
        </p>
        <p>
          That number matters because it ties directly to profitability. If your cost per
          acquisition exceeds the lifetime value of a customer, you are burning money. If it sits
          well below that threshold, you have room to scale. Without calculating CPA consistently,
          you are guessing at both.
        </p>
        <p>
          Benchmarks add context. Knowing your CPA is $47 means nothing in isolation. Knowing the
          industry average for your vertical is $62 tells you that you are outperforming peers. A
          cost per acquisition calculator paired with reliable benchmark data turns a raw number
          into an actionable signal.
        </p>
      </Prose>

      <Prose heading="Understanding CPA Benchmarks">
        <p>
          CPA benchmarks represent the average cost to acquire a customer within a specific
          industry, channel, or campaign type. They are compiled from aggregated data across
          thousands of advertisers and updated as market conditions shift.
        </p>
        <p>
          Benchmarks serve two purposes. First, they help you set realistic goals before a campaign
          launches. Second, they help you evaluate performance after a campaign runs. Beating the
          benchmark consistently suggests your targeting, creative, or offer is working. Missing it
          consistently suggests the opposite.
        </p>
        <p>
          The businesses that benefit most include agencies managing paid media across multiple
          verticals, performance marketers optimizing limited budgets, and operators in high-CPA
          industries like healthcare, legal, and financial services, where small improvements
          translate to significant savings.
        </p>
      </Prose>

      <Prose heading="How Our CPA Calculator Works">
        <p>
          The calculator accepts three inputs: total ad spend, number of conversions, and your
          industry vertical. From those inputs, it returns your current CPA, the relevant industry
          benchmark, and the percentage variance between the two. Spend can be entered for any time
          period as long as your conversion count matches the same window.
        </p>
      </Prose>

      <Prose heading="Maximize Advertising ROI with Precise CPA Calculations">
        <p>
          A CPA calculator is a diagnostic tool, not a fix. The fix comes from what you do with the
          data. Track CPA by channel, not just in aggregate — your blended CPA might look healthy
          while one channel hemorrhages budget and another overperforms.
        </p>
        <p>
          Compare CPA against customer lifetime value, not just against benchmarks. A $200 CPA is
          expensive for a $150 customer and cheap for a $2,000 customer. Review weekly rather than
          monthly, and tie CPA to downstream metrics: in behavioral health, a low cost per lead
          means nothing if those leads do not convert to admissions.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="Ready to go beyond the calculator?"
        body="The calculator gives you a baseline. A full audit gives you the channel-level breakdown, attribution analysis, and benchmark comparisons that turn data into decisions, backed by $50M+ in managed behavioral health and mental health media spend."
        ctaText="Request a Free Audit"
        ctaLink="/get-started/request-an-audit/"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
