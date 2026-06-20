import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "tools/index.md";
export const metadata = pageMetadata(FILE);

/* The tools are interactive pages (no markdown content files), so we pass the
   cards explicitly rather than via HUB_CHILDREN (which reads child .md files). */
const TOOL_CARDS = [
  {
    href: "/tools/cpa-benchmark-calculator/",
    title: "CPA Benchmark Calculator",
    description:
      "Divide spend by conversions and compare your cost per acquisition against vertical benchmarks.",
  },
  {
    href: "/tools/llm-visibility-check/",
    title: "LLM Visibility Check",
    description:
      "Estimate how often AI assistants cite your brand, with a platform-by-platform breakdown and priorities.",
  },
  {
    href: "/tools/paid-media-readiness-assessment/",
    title: "Paid Media Readiness Assessment",
    description:
      "Score your paid media maturity across attribution, compliance, channel mix, creative, and budget.",
  },
  {
    href: "/tools/attribution-tracking-audit/",
    title: "Attribution Tracking Audit",
    description:
      "Find where conversions leak across tracking coverage, attribution models, and offline admissions.",
  },
  {
    href: "/tools/meta-ads-readiness-score/",
    title: "Meta Ads Readiness Score",
    description:
      "Check your Meta Ads setup against health-vertical compliance, tracking, and landing-page requirements.",
  },
  {
    href: "/tools/intake-funnel-health-check/",
    title: "Intake Funnel Health Check",
    description:
      "Pinpoint where your intake process loses qualified admissions, ranked by estimated impact.",
  },
];

export default function Page() {
  return <HubPage file={FILE} kicker="Tools" cardKicker="Free Tools" cards={TOOL_CARDS} />;
}
