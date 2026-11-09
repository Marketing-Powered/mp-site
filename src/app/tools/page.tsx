import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";
import { TOOLS } from "@/lib/tools";

const FILE = "tools/index.md";
export const metadata = pageMetadata(FILE);

/* The tools are interactive pages (no markdown content files), so we pass the
   cards explicitly rather than via HUB_CHILDREN (which reads child .md files). */
export default function Page() {
  return <HubPage file={FILE} kicker="Tools" cardKicker="Free Tools" cards={TOOLS} />;
}
