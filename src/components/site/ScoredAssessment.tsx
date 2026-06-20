"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { serif, mono, green } from "./theme";

/* ------------------------------------------------------------------ */
/*  Reusable scored questionnaire for tool/assessment pages.           */
/*  Each dimension asks one question with 4 ranked options (index 0-3).*/
/*  Per-dimension score = idx/3*100; overall = average. Findings are   */
/*  grouped into Risks (worst answer), Gaps, and Strengths (best),     */
/*  with prioritized recommendations — the structure the briefs        */
/*  specify ("strengths to maintain, gaps to address, risks requiring  */
/*  immediate attention; focus first on risks").                       */
/* ------------------------------------------------------------------ */

export type AssessmentOption = { label: string; hint?: string };
export type AssessmentDimension = {
  key: string;
  name: string;
  question: string;
  options: [string, string, string, string]; // ranked worst -> best (index 0-3)
  rec: string; // shown when this dimension is a risk or gap
};
export type AssessmentTier = { max: number; label: string; color: string; msg: string };

const AMBER = "#F5B23E";
const RED = "#F2663C";

export default function ScoredAssessment({
  dimensions,
  tiers,
  scoreLabel = "Readiness Score",
  contextSelect,
  leakage,
  ctaText,
  ctaLink,
}: {
  dimensions: AssessmentDimension[];
  tiers: AssessmentTier[];
  scoreLabel?: string;
  contextSelect?: { label: string; options: { value: string; label: string }[] };
  /** when set, shows an estimated loss/leakage %: max at score 0, min at score 100 */
  leakage?: { max: number; min: number; label: string };
  ctaText: string;
  ctaLink: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(() =>
    Object.fromEntries(dimensions.map((d) => [d.key, 1])),
  );
  const [context, setContext] = useState(contextSelect?.options[0]?.value ?? "");

  const result = useMemo(() => {
    const scored = dimensions.map((d) => {
      const idx = answers[d.key] ?? 0;
      const score = Math.round((idx / 3) * 100);
      const band = idx === 0 ? "risk" : idx === 3 ? "strength" : "gap";
      return { ...d, idx, score, band };
    });
    const overall = Math.round(scored.reduce((a, s) => a + s.score, 0) / scored.length);
    const tier = tiers.find((t) => overall <= t.max) ?? tiers[tiers.length - 1];
    const risks = scored.filter((s) => s.band === "risk");
    const gaps = scored.filter((s) => s.band === "gap");
    const strengths = scored.filter((s) => s.band === "strength");
    const leakagePct = leakage
      ? Math.round(leakage.max - (overall / 100) * (leakage.max - leakage.min))
      : null;
    return { scored, overall, tier, risks, gaps, strengths, leakagePct };
  }, [answers, dimensions, tiers, leakage]);

  return (
    <div
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="space-y-6 p-7 md:p-9">
        {contextSelect && (
          <label className="block">
            <span
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/45"
              style={{ fontFamily: mono }}
            >
              {contextSelect.label}
            </span>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.98rem] text-white outline-none transition-colors focus:border-[#0090F0]/60 appearance-none"
            >
              {contextSelect.options.map((o) => (
                <option key={o.value} value={o.value} style={{ background: "#0A1322" }}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}

        {dimensions.map((d) => (
          <div key={d.key}>
            <div className="text-[0.97rem] text-white/80">{d.question}</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.options.map((opt, i) => {
                const active = answers[d.key] === i;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [d.key]: i }))}
                    className="rounded-xl border px-4 py-3 text-left text-[0.9rem] transition-colors"
                    style={
                      active
                        ? { borderColor: "#0090F0", background: "rgba(0,144,240,0.12)", color: "#EDEAE3" }
                        : { borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }
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

      {/* ---------- result ---------- */}
      <div className="border-t border-white/10 p-7 md:p-9">
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
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-white/60">{result.tier.msg}</p>
          {result.leakagePct !== null && leakage && (
            <p className="mt-1 text-[0.95rem] text-white/50">
              Estimated{" "}
              <span className="text-white/85" style={{ fontFamily: serif }}>
                ~{result.leakagePct}%
              </span>{" "}
              {leakage.label}
            </p>
          )}
        </div>

        {/* per-dimension bars */}
        <div className="mt-8 space-y-3">
          {result.scored.map((s) => (
            <div key={s.key} className="flex items-center gap-4">
              <span className="w-40 shrink-0 text-[12px] uppercase tracking-[0.1em] text-white/50">
                {s.name}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(s.score, 4)}%`,
                    background:
                      s.band === "risk"
                        ? RED
                        : s.band === "gap"
                          ? AMBER
                          : "linear-gradient(90deg,#7FCBFF,#08AE67)",
                  }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-[13px] text-white/70">{s.score}</span>
            </div>
          ))}
        </div>

        {/* grouped findings */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <FindingGroup title="Risks" color={RED} items={result.risks.map((r) => r.name)} />
          <FindingGroup title="Gaps" color={AMBER} items={result.gaps.map((g) => g.name)} />
          <FindingGroup title="Strengths" color={green} items={result.strengths.map((s) => s.name)} />
        </div>

        {/* prioritized recommendations (risks first, then gaps) */}
        {(result.risks.length > 0 || result.gaps.length > 0) && (
          <div className="mt-8">
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0090F0]"
              style={{ fontFamily: mono }}
            >
              Prioritized recommendations
            </p>
            <ul className="space-y-2.5">
              {[...result.risks, ...result.gaps].map((d) => (
                <li key={d.key} className="flex gap-3 text-[0.95rem] leading-relaxed text-white/60">
                  <span className="mt-1" style={{ color: d.band === "risk" ? RED : AMBER }}>
                    {d.band === "risk" ? "▲" : "✦"}
                  </span>
                  {d.rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-[11px] leading-relaxed text-white/30" style={{ fontFamily: mono }}>
          Self-assessment estimate. A full audit validates each finding against your live tracking,
          spend, and compliance setup.
        </p>

        <div className="mt-6">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black"
          >
            {ctaText}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FindingGroup({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color }}>
        {title}
        <span className="ml-2 text-white/30">{items.length}</span>
      </p>
      <ul className="mt-3 space-y-1.5">
        {items.length === 0 ? (
          <li className="text-[0.85rem] text-white/25">—</li>
        ) : (
          items.map((it) => (
            <li key={it} className="text-[0.85rem] leading-snug text-white/55">
              {it}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
