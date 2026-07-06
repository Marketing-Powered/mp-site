"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { serif, mono, accent, accentLight, green } from "@/components/site/theme";

/* ------------------------------------------------------------------ */
/*  CPA Benchmark Calculator                                           */
/*  Inputs: total ad spend, conversions, industry vertical.            */
/*  Output: CPA (spend / conversions), the vertical benchmark, and the */
/*  variance %, with a tiered verdict — exactly the three outputs the  */
/*  brief specifies ("your current CPA, the relevant industry          */
/*  benchmark, and the percentage variance between the two").          */
/*                                                                     */
/*  ASSUMPTION: the brief names the powering verticals (behavioral     */
/*  health, B2B services, ecommerce, local services) and one explicit  */
/*  figure (B2B SaaS $150) but does not publish the full benchmark     */
/*  table. The values below are reasonable aggregated CPA averages per */
/*  vertical, labeled illustrative in the UI. Swap in real benchmark   */
/*  data when available — the logic is unchanged.                      */
/* ------------------------------------------------------------------ */

type Vertical = {
  label: string;
  cpa: number; // illustrative aggregated average CPA, USD
};

const BENCHMARKS: Record<string, Vertical> = {
  "behavioral-health": { label: "Behavioral Health", cpa: 115 },
  "b2b-services": { label: "B2B Services", cpa: 116 },
  "b2b-saas": { label: "B2B SaaS", cpa: 150 },
  ecommerce: { label: "Ecommerce", cpa: 45 },
  "local-services": { label: "Local Services", cpa: 60 },
  legal: { label: "Legal Services", cpa: 135 },
  "financial-services": { label: "Financial Services", cpa: 90 },
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function tierFor(variancePct: number) {
  if (variancePct <= -15)
    return {
      label: "Outperforming",
      color: green,
      msg: "Your CPA sits well below the benchmark — strong efficiency, and likely room to scale spend.",
    };
  if (variancePct <= 15)
    return {
      label: "On Benchmark",
      color: accentLight,
      msg: "Your CPA is in line with the benchmark for this vertical. Channel-level analysis is where further gains hide.",
    };
  if (variancePct <= 50)
    return {
      label: "Above Benchmark",
      color: "#F5B23E",
      msg: "Your CPA runs above the benchmark — there is room to bring it down through targeting, creative, or budget reallocation.",
    };
  return {
    label: "Well Above Benchmark",
    color: "#F2663C",
    msg: "Your CPA is significantly above the benchmark. A channel-by-channel breakdown usually reveals where the spend is leaking.",
  };
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[1.05rem] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#0090F0]/60";

export default function CpaCalculator() {
  const [spend, setSpend] = useState("");
  const [conversions, setConversions] = useState("");
  const [vertical, setVertical] = useState("behavioral-health");

  const result = useMemo(() => {
    const s = parseFloat(spend);
    const c = parseFloat(conversions);
    if (!isFinite(s) || !isFinite(c) || s <= 0 || c <= 0) return null;
    const cpa = s / c;
    const benchmark = BENCHMARKS[vertical].cpa;
    const variancePct = ((cpa - benchmark) / benchmark) * 100;
    return { cpa, benchmark, variancePct, tier: tierFor(variancePct) };
  }, [spend, conversions, vertical]);

  return (
    <div
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="grid gap-6 p-7 md:grid-cols-2 md:p-9">
        <label className="block">
          <span
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: mono }}
          >
            Total ad spend
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              placeholder="25,000"
              className={inputCls + " pl-8"}
            />
          </div>
        </label>

        <label className="block">
          <span
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: mono }}
          >
            Conversions (leads / sales / admissions)
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={conversions}
            onChange={(e) => setConversions(e.target.value)}
            placeholder="180"
            className={inputCls}
          />
        </label>

        <label className="block md:col-span-2">
          <span
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: mono }}
          >
            Industry vertical
          </span>
          <select
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
            className={inputCls + " appearance-none"}
          >
            {Object.entries(BENCHMARKS).map(([k, v]) => (
              <option key={k} value={k} style={{ background: "#0A1322" }}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* ---------- result ---------- */}
      <div className="border-t border-white/10 p-7 md:p-9">
        {!result ? (
          <p className="text-center text-[0.95rem] text-white/40">
            Enter your spend and conversions above to see your CPA against the{" "}
            {BENCHMARKS[vertical].label} benchmark.
          </p>
        ) : (
          <div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-3">
              <div className="bg-[#050B16] p-6 text-center">
                <div
                  className="text-[clamp(1.8rem,4vw,2.6rem)] leading-none"
                  style={{
                    fontFamily: serif,
                    background: "linear-gradient(180deg,#7FCBFF,#0090F0)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {usd(result.cpa)}
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Your CPA
                </p>
              </div>
              <div className="bg-[#050B16] p-6 text-center">
                <div
                  className="text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-white/85"
                  style={{ fontFamily: serif }}
                >
                  {usd(result.benchmark)}
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  {BENCHMARKS[vertical].label} benchmark
                </p>
              </div>
              <div className="bg-[#050B16] p-6 text-center">
                <div
                  className="text-[clamp(1.8rem,4vw,2.6rem)] leading-none"
                  style={{ fontFamily: serif, color: result.tier.color }}
                >
                  {result.variancePct > 0 ? "+" : ""}
                  {result.variancePct.toFixed(0)}%
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Variance vs benchmark
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-2">
              <span
                className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                style={{ color: result.tier.color, border: `1px solid ${result.tier.color}55` }}
              >
                {result.tier.label}
              </span>
              <p className="text-[0.98rem] leading-relaxed text-white/60">{result.tier.msg}</p>
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-white/30" style={{ fontFamily: mono }}>
              Benchmarks are illustrative aggregated averages and vary by channel, geography, and
              compliance constraints.
            </p>

            <div className="mt-7">
              <Link
                href="/get-started/request-an-audit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
              >
                Get a channel-level CPA audit
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
