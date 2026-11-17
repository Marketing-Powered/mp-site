import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "resources/in-house-vs-agency-behavioral-health.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} kicker="Resources" />;
}
