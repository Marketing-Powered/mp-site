import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CtaBand from "@/components/site/CtaBand";
import { serif, mono } from "@/components/site/theme";
import { Kicker, GoldRule, PrimaryCta, RichText } from "@/components/site/ui";

/* ================================================================== */
/* Case studies index — November 2026 homepage package, content        */
/* delivery register (PDF p. 23) and proof standard (PDF p. 17).       */
/*                                                                      */
/* One entry per approved case. Each entry states the work owner,       */
/* dates, baseline, metric definition, comparison period, scope, and    */
/* limitations. Any founder-history entry is labeled prior executive    */
/* experience, not agency work.                                         */
/*                                                                      */
/* Held out of this page until an evidence record and public-use        */
/* approval exist: the agency-wide spend total, the percentage          */
/* reduction in cost per qualified lead, the "since 2022" operating     */
/* claim, and the "full attribution to admission" assertion that the    */
/* previous version carried in its stats panel and metadata.            */
/* ================================================================== */

const TITLE = "Case Studies and Results | Marketing Powered";
const DESCRIPTION =
  "How Marketing Powered presents evidence: one entry per approved case, with owner, dates, baseline, metric definition, comparison period, scope, and limitations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/results/case-studies/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/results/case-studies",
  },
};

/* Minimum record for a published case (package proof standard). */
const RECORD_FIELDS: { label: string; body: string }[] = [
  {
    label: "Who and when",
    body: "Client or approved anonymous descriptor; engagement dates; baseline and comparison periods.",
  },
  {
    label: "What and how",
    body: "Work performed; metric definition; source export; cost and conversion scope; data limitations.",
  },
  {
    label: "Who approves",
    body: "Client public-use permission where needed; Marketing Powered approval; separation from pre-agency work.",
  },
  {
    label: "Publication wording",
    body: "A completed, factual sentence naming the metric, period, scope, and attribution. No placeholder number.",
  },
];

type CaseEntry = {
  kicker: string;
  heading: string;
  rows: { label: string; value: string }[];
  note: string;
};

/* Founder history is the only entry with a complete, approved-for-draft
   record. It is prior executive experience and is labeled as such; it is
   not an agency case and does not satisfy the package's agency-case
   acceptance item. Figures are pending Mike's final sign-off (claims
   C01 to C04). */
const FOUNDER_HISTORY: CaseEntry = {
  kicker: "Prior executive experience, not agency work",
  heading: "Marketing leadership at a multi-state behavioral health operator",
  rows: [
    {
      label: "Who and when",
      value:
        "Mike Hulick, as CMO of a multi-state behavioral health operator, before founding Marketing Powered. The employer is not named. Tenure dates are held in the supporting record.",
    },
    {
      label: "Scope of responsibility",
      value:
        "Marketing operations across the organization, including attribution, intake, conversion, reporting, and the systems supporting expansion. He managed about $1.5 million to $2 million per month in Google Ads spend.",
    },
    {
      label: "Organizational change during tenure",
      value:
        "The organization expanded from 3 to 24 locations across 9 states. Employer revenue grew from about $30 million to about $140 million.",
    },
    {
      label: "Metric definition and comparison",
      value:
        "Location count and revenue at the start and end of the tenure, as supplied by the founder. The measurement basis and period are recorded in the supporting evidence and remain subject to final confirmation.",
    },
    {
      label: "Attribution",
      value:
        "Organizational growth during his tenure. This is not an agency result and not a claim that marketing alone caused the growth.",
    },
    {
      label: "Limitations",
      value:
        "Not independently verified. Not client work performed by Marketing Powered. Published to show operating experience, not to substitute for an agency case.",
    },
  ],
  note:
    "Prior executive experience is distinct from agency client work. That distinction matters when evaluating budgets managed and the contribution marketing made to an organization's growth.",
};

export default function Page() {
  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url="/results/case-studies" current="Case Studies" />
        <div className="mt-8 max-w-3xl">
          <Kicker>Results</Kicker>
          <h1
            className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.0]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Case studies and results
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            This page lists approved cases only. Each entry states who did the work, the dates,
            the baseline, the metric definition, the comparison period, the scope, and the
            limitations. Nothing is published here until the record is complete and public use
            is approved.
          </p>
          <div className="mt-9">
            <PrimaryCta href="/company/contact">Request a strategy call</PrimaryCta>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <GoldRule />
      </div>

      {/* ---------- how to read an entry ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <Reveal className="mb-8 flex items-center gap-4">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            How to read an entry
          </span>
          <GoldRule className="flex-1" />
        </Reveal>
        <Reveal>
          <p className="max-w-3xl text-[1.02rem] leading-relaxed text-white/65">
            A useful result should help you make a decision, not simply give you a larger
            number. Evaluate every entry against the starting point, the measurement period, the
            work performed, and the business context. Each published case carries the following
            record.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RECORD_FIELDS.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 80}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7"
            >
              <p
                className="text-[1.15rem] leading-snug text-[#7FCBFF]"
                style={{ fontFamily: serif, fontWeight: 500 }}
              >
                {f.label}
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- approved agency cases ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <Reveal className="mb-8 flex items-center gap-4">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            Approved agency cases
          </span>
          <GoldRule className="flex-1" />
        </Reveal>
        <Reveal className="max-w-3xl rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-7">
          <p className="text-[1.02rem] leading-relaxed text-white/65">
            No agency case is published yet. The first entry will appear here once a client case
            record is complete, the client has approved public use, and the metric, period, scope,
            and attribution can be stated in a single factual sentence. We do not publish
            aggregate claims, percentage reductions, or spend totals in place of a case.
          </p>
        </Reveal>
      </section>

      {/* ---------- founder history (prior executive experience) ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12">
        <Reveal className="mb-8 flex items-center gap-4">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            {FOUNDER_HISTORY.kicker}
          </span>
          <GoldRule className="flex-1" />
        </Reveal>
        <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 lg:p-9">
          <h2
            className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {FOUNDER_HISTORY.heading}
          </h2>
          <dl className="mt-7 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {FOUNDER_HISTORY.rows.map((r) => (
              <div key={r.label}>
                <dt
                  className="text-[11px] uppercase tracking-[0.22em] text-white/40"
                  style={{ fontFamily: mono }}
                >
                  {r.label}
                </dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-white/65">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 border-t border-white/10 pt-6 text-[0.95rem] leading-relaxed text-white/50">
            {FOUNDER_HISTORY.note} Read more about{" "}
            <RichText text="[our experience](/company/about) and the [measurement approach](/#performance)" />{" "}
            behind every engagement.
          </p>
        </Reveal>
      </section>

      <CtaBand
        headline="Discuss how we would measure your engagement"
        body="Tell us where growth is getting stuck and what your leadership team needs to see. We will walk through the conversion definitions, data sources, and reporting cadence we would propose, and how results would be recorded before anything is published."
        ctaText="Request a strategy call"
        ctaLink="/company/contact"
        secondaryCta={{ text: "Email Us", link: "mailto:info@marketingpowered.ai" }}
      />
    </PageShell>
  );
}
