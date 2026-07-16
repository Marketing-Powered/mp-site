import MarkdownPage from "@/components/site/MarkdownPage";
import { BookingBlock, LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";
import { LEAD_FORMS } from "@/lib/leadForms";

const FILE = "get-started/book-a-call.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Get Started" hideCta>
      <BookingBlock />
      {/* shared with the popup lead modal — see src/lib/leadForms.ts */}
      <LeadForm {...LEAD_FORMS.call} title="Prefer we reach out?" formId="call-request-form" />
    </MarkdownPage>
  );
}
