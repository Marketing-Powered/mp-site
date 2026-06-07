import LegalPage from "@/components/site/LegalPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "legal/cookie-policy.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return <LegalPage file={FILE} />;
}
