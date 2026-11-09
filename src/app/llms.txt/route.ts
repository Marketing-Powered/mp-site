import { indexableRoutes } from "@/lib/links";
import { SITE_URL } from "@/lib/site";
import { siteContent as s } from "@/lib/content";

export const dynamic = "force-static";

/* llms.txt (https://llmstxt.org): a markdown map of the site for AI systems.
   Generated from the same canonical route registry as the sitemap so the two
   never drift. */

const SECTION_LABELS: [string, string][] = [
  ["services", "Services"],
  ["cards", "Powered Cards"],
  ["ai-edge", "AI Edge"],
  ["who-we-help", "Who We Help"],
  ["resources", "Resources & Guides"],
  ["research", "Research"],
  ["tools", "Free Tools"],
  ["problems", "Problems We Solve"],
  ["results", "Results"],
  ["media", "Media"],
  ["company", "Company"],
  ["get-started", "Get Started"],
  ["legal", "Legal"],
];

function titleize(route: string): string {
  const seg = route.split("/").filter(Boolean).pop() || "Home";
  return seg
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAi\b/g, "AI")
    .replace(/\bSeo\b/g, "SEO")
    .replace(/\bLlm\b/g, "LLM")
    .replace(/\bPpc\b/g, "PPC")
    .replace(/\bCro\b/g, "CRO")
    .replace(/\bB2b\b/g, "B2B")
    .replace(/\bHipaa\b/g, "HIPAA")
    .replace(/\bIop Php\b/g, "IOP/PHP")
    .replace(/\bCpa\b/g, "CPA")
    .replace(/\bRoi\b/g, "ROI");
}

export function GET() {
  const routes = indexableRoutes();
  const lines: string[] = [
    `# ${s.brand.name}`,
    "",
    `> ${s.brand.tagline}. ${s.seo.description}`,
    "",
    `- [Home](${SITE_URL}/)`,
  ];
  for (const [seg, label] of SECTION_LABELS) {
    const group = routes
      .filter((r) => r === `/${seg}` || r.startsWith(`/${seg}/`))
      .sort();
    if (!group.length) continue;
    lines.push("", `## ${label}`, "");
    for (const r of group) lines.push(`- [${titleize(r)}](${SITE_URL}${r})`);
  }
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
