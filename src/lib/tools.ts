import { cyclicNeighbors } from "./related";

/* The free tools are interactive pages with no markdown content files, so
   their card copy lives here: shared by the /tools hub grid and the
   "More Free Tools" row on each tool page. */
export const TOOLS: { href: string; title: string; description: string }[] = [
  {
    href: "/tools/cpa-benchmark-calculator",
    title: "CPA Benchmark Calculator",
    description:
      "Divide spend by conversions and compare your cost per acquisition against vertical benchmarks.",
  },
  {
    href: "/tools/llm-visibility-check",
    title: "LLM Visibility Check",
    description:
      "Estimate how often AI assistants cite your brand, with a platform-by-platform breakdown and priorities.",
  },
  {
    href: "/tools/paid-media-readiness-assessment",
    title: "Paid Media Readiness Assessment",
    description:
      "Score your paid media maturity across attribution, compliance, channel mix, creative, and budget.",
  },
  {
    href: "/tools/attribution-tracking-audit",
    title: "Attribution Tracking Audit",
    description:
      "Find where conversions leak across tracking coverage, attribution models, and offline admissions.",
  },
  {
    href: "/tools/meta-ads-readiness-score",
    title: "Meta Ads Readiness Score",
    description:
      "Check your Meta Ads setup against health-vertical compliance, tracking, and landing-page requirements.",
  },
  {
    href: "/tools/intake-funnel-health-check",
    title: "Intake Funnel Health Check",
    description:
      "Pinpoint where your intake process loses qualified admissions, ranked by estimated impact.",
  },
];

/** The next three tools after `href` (cyclic), for a tool page's related row. */
export function relatedTools(href: string) {
  return cyclicNeighbors(TOOLS, TOOLS.findIndex((t) => t.href === href));
}
