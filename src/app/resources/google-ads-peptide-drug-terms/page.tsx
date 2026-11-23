import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "resources/google-ads-peptide-drug-terms.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} kicker="Resources" />;
}
