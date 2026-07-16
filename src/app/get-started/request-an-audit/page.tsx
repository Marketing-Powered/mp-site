import MarkdownPage from "@/components/site/MarkdownPage";
import { LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";
import { LEAD_FORMS } from "@/lib/leadForms";

const FILE = "get-started/request-an-audit.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Get Started" hideCta>
      {/* shared with the popup lead modal — see src/lib/leadForms.ts */}
      <LeadForm {...LEAD_FORMS.audit} />
    </MarkdownPage>
  );
}
