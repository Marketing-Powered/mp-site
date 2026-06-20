import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "research/index.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <HubPage file={FILE} kicker="Research" cardKicker="Browse" />;
}
