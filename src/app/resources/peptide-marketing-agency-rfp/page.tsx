import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "resources/peptide-marketing-agency-rfp.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} kicker="Resources" />;
}
