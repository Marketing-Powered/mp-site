import LegalPage from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "legal/terms.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <LegalPage file={FILE} />;
}
