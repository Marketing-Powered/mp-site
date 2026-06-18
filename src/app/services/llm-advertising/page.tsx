import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "services/llm-advertising/index.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <HubPage file={FILE} kicker="LLM Advertising" cardKicker="Channels" />;
}
