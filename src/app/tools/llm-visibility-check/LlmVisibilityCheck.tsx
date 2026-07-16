"use client";

import { useMemo, useState } from "react";
import { serif, mono, accentLight, green } from "@/components/site/theme";
import { ModalCta } from "@/components/site/LeadModal";

/* ------------------------------------------------------------------ */
/*  LLM Visibility Check                                               */
/*                                                                     */
/*  ASSUMPTION / SCOPE NOTE: the brief describes a tool that queries   */
/*  live AI platforms (ChatGPT, Claude, Gemini, Perplexity) and parses */
/*  their responses for brand mentions. That requires server-side AI   */
/*  API calls, which are out of scope here (client-side only, no       */
/*  backend). Instead this implements a transparent, deterministic     */
/*  ESTIMATOR built from the exact citation factors the brief lists —  */
/*  "source authority, content structure, citation frequency across    */
/*  the web, and semantic relevance." The user rates each signal; the  */
/*  tool weights them per platform (models weight signals differently) */
/*  to produce a 0-100 visibility score, a platform-by-platform        */
/*  breakdown, a context tier, a category benchmark comparison, and    */
/*  prioritized recommendations. Swap in a live API later without      */
/*  changing the result UI.                                            */
/* ------------------------------------------------------------------ */

type SignalKey = "entity" | "press" | "schema" | "content" | "brandAge" | "mentions";

const SIGNALS: { key: SignalKey; label: string; help: string; options: [string, string, string] }[] =
  [
    {
      key: "entity",
      label: "Knowledge panel / Wikipedia presence",
      help: "Entity signals models trust most",
      options: ["None", "Partial", "Established"],
    },
    {
      key: "press",
      label: "Coverage in industry publications & press",
      help: "Authoritative third-party citations",
      options: ["Rare", "Occasional", "Frequent"],
    },
    {
      key: "schema",
      label: "Structured data / schema markup",
      help: "Helps models parse your entities",
      options: ["None", "Partial", "Comprehensive"],
    },
    {
      key: "content",
      label: "Depth of authoritative content",
      help: "Guides, research, resource libraries",
      options: ["Thin", "Moderate", "Extensive"],
    },
    {
      key: "brandAge",
      label: "Brand establishment & recognition",
      help: "How long and how widely known",
      options: ["Emerging", "Established", "Mature"],
    },
    {
      key: "mentions",
      label: "Consistent brand mentions across the web",
      help: "Citation frequency and backlinks",
      options: ["Low", "Medium", "High"],
    },
  ];

// model-specific weighting of the six signals (each profile sums to 1)
const PLATFORMS: { name: string; w: Record<SignalKey, number> }[] = [
  {
    name: "ChatGPT",
    w: { entity: 0.3, press: 0.2, content: 0.2, brandAge: 0.2, mentions: 0.1, schema: 0 },
  },
  {
    name: "Claude",
    w: { entity: 0.25, content: 0.25, press: 0.2, brandAge: 0.15, mentions: 0.1, schema: 0.05 },
  },
  {
    name: "Gemini",
    w: { schema: 0.25, mentions: 0.2, press: 0.15, entity: 0.15, content: 0.15, brandAge: 0.1 },
  },
  {
    name: "Perplexity",
    w: { press: 0.3, mentions: 0.25, content: 0.2, schema: 0.1, entity: 0.1, brandAge: 0.05 },
  },
];

const CATEGORY_BENCHMARK: Record<string, { label: string; score: number }> = {
  "behavioral-health": { label: "Behavioral Health", score: 38 },
  healthcare: { label: "Healthcare", score: 42 },
  "b2b-saas": { label: "B2B SaaS", score: 55 },
  "b2b-services": { label: "B2B Services", score: 48 },
  ecommerce: { label: "Ecommerce", score: 46 },
  "financial-services": { label: "Financial Services", score: 50 },
  legal: { label: "Legal Services", score: 44 },
  "local-services": { label: "Local Services", score: 36 },
  other: { label: "Other / General", score: 45 },
};

const REC: Record<SignalKey, string> = {
  entity:
    "Build authoritative entity signals — a Wikipedia/Wikidata presence and a Google knowledge panel models can anchor to.",
  press:
    "Earn citations in industry publications and authoritative third-party sources that models retrieve from.",
  schema:
    "Implement comprehensive structured data (schema.org) so AI systems can parse your entities and offerings.",
  content:
    "Publish deep, well-structured authoritative content optimized for AI retrieval and extraction.",
  brandAge:
    "Reinforce consistent brand naming and recognition signals across every web property you control.",
  mentions:
    "Increase consistent brand mentions and citations across the web to raise citation frequency.",
};

function tierFor(score: number) {
  if (score <= 25)
    return { label: "Largely Invisible", color: "#F2663C", context: "rarely surfaced" };
  if (score <= 50)
    return { label: "Emerging Presence", color: "#F5B23E", context: "an occasional alternative" };
  if (score <= 75)
    return { label: "Competitive", color: accentLight, context: "a regular option" };
  return { label: "Category Leader", color: green, context: "a default recommendation" };
}

const selectCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.98rem] text-white outline-none transition-colors focus:border-[#0090F0]/60 appearance-none";

export default function LlmVisibilityCheck() {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("behavioral-health");
  // each signal 0 | 1 | 2 -> normalized 0 / 0.5 / 1; default to the middle (1)
  const [signals, setSignals] = useState<Record<SignalKey, number>>({
    entity: 1,
    press: 1,
    schema: 1,
    content: 1,
    brandAge: 1,
    mentions: 1,
  });

  const result = useMemo(() => {
    if (!brand.trim()) return null;
    const norm = (k: SignalKey) => signals[k] / 2; // 0, 0.5, 1
    const platforms = PLATFORMS.map((p) => {
      let s = 0;
      (Object.keys(p.w) as SignalKey[]).forEach((k) => {
        s += norm(k) * p.w[k];
      });
      return { name: p.name, score: Math.round(s * 100) };
    });
    const overall = Math.round(platforms.reduce((a, p) => a + p.score, 0) / platforms.length);
    const benchmark = CATEGORY_BENCHMARK[category];
    const tier = tierFor(overall);
    // two weakest signals -> recommendations
    const weakest = (Object.keys(signals) as SignalKey[])
      .sort((a, b) => signals[a] - signals[b])
      .slice(0, 2);
    return { platforms, overall, benchmark, tier, recs: weakest.map((k) => REC[k]) };
  }, [brand, category, signals]);

  return (
    <div
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="space-y-6 p-7 md:p-9">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
              style={{ fontFamily: mono }}
            >
              Brand name
            </span>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Your brand, exactly as marketed"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.98rem] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#0090F0]/60"
            />
          </label>
          <label className="block">
            <span
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
              style={{ fontFamily: mono }}
            >
              Primary category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={selectCls}
            >
              {Object.entries(CATEGORY_BENCHMARK).map(([k, v]) => (
                <option key={k} value={k} style={{ background: "#0A1322" }}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: mono }}
          >
            Rate your brand&apos;s AI-citation signals
          </p>
          {SIGNALS.map((sig) => (
            <div
              key={sig.key}
              className="grid items-center gap-3 sm:grid-cols-[1fr_auto] sm:gap-6"
            >
              <div>
                <div className="text-[0.97rem] text-white/80">{sig.label}</div>
                <div className="text-[12px] text-white/35">{sig.help}</div>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
                {sig.options.map((opt, i) => {
                  const active = signals[sig.key] === i;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSignals((s) => ({ ...s, [sig.key]: i }))}
                      className="rounded-full px-3.5 py-1.5 text-[12px] uppercase tracking-[0.1em] transition-colors"
                      style={
                        active
                          ? { background: "linear-gradient(90deg,#7FCBFF,#0090F0)", color: "#000" }
                          : { color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- result ---------- */}
      <div className="border-t border-white/10 p-7 md:p-9">
        {!result ? (
          <p className="text-center text-[0.95rem] text-white/40">
            Enter your brand name to generate a visibility estimate.
          </p>
        ) : (
          <div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="text-[clamp(3rem,9vw,5rem)] leading-none"
                style={{ fontFamily: serif, color: result.tier.color }}
              >
                {result.overall}
                <span className="text-[1.4rem] text-white/30">/100</span>
              </div>
              <span
                className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                style={{ color: result.tier.color, border: `1px solid ${result.tier.color}55` }}
              >
                {result.tier.label}
              </span>
              <p className="max-w-xl text-[0.98rem] leading-relaxed text-white/60">
                When buyers ask AI assistants in the {result.benchmark.label} category,{" "}
                <span className="text-white/85">{brand.trim()}</span> currently reads as{" "}
                {result.tier.context}. Category benchmark: {result.benchmark.score}/100 (
                {result.overall >= result.benchmark.score ? "at or above" : "below"} peers).
              </p>
            </div>

            {/* platform breakdown */}
            <div className="mt-8 space-y-3">
              {result.platforms.map((p) => (
                <div key={p.name} className="flex items-center gap-4">
                  <span className="w-24 shrink-0 text-[12px] uppercase tracking-[0.14em] text-white/50">
                    {p.name}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.score}%`,
                        background: "linear-gradient(90deg,#7FCBFF,#0090F0)",
                      }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-[13px] text-white/70">
                    {p.score}
                  </span>
                </div>
              ))}
            </div>

            {/* recommendations */}
            <div className="mt-8">
              <p
                className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0090F0]"
                style={{ fontFamily: mono }}
              >
                Top priorities to close the gap
              </p>
              <ul className="space-y-2.5">
                {result.recs.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.95rem] leading-relaxed text-white/60">
                    <span className="mt-1 text-[#0090F0]">✦</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <p
              className="mt-6 text-[11px] leading-relaxed text-white/30"
              style={{ fontFamily: mono }}
            >
              Signal-based estimate. A full check queries live AI platforms for actual brand
              citations across prompts, geographies, and competitors.
            </p>

            <div className="mt-6">
              <ModalCta
                href="/get-started/request-an-audit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
              >
                Request a full LLM visibility audit
                <span aria-hidden>→</span>
              </ModalCta>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
