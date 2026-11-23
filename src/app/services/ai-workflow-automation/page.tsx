import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "services/ai-workflow-automation.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} />;
}
