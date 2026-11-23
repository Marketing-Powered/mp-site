import MarkdownPage from "@/components/site/MarkdownPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "who-we-help/research-peptide-suppliers.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <MarkdownPage file={FILE} />;
}
