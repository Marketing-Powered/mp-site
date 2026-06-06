import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "get-started/index.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <HubPage file={FILE} kicker="Get Started" cardKicker="Choose Your Path" />;
}
