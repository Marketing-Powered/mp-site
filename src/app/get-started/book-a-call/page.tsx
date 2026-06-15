import MarkdownPage from "@/components/site/MarkdownPage";
import { BookingBlock, LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";

const FILE = "get-started/book-a-call.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Get Started" hideCta>
      <BookingBlock />
      <LeadForm
        title="Prefer we reach out?"
        intro="Share a few details and a strategist who has operated at scale in behavioral health will follow up within one business day."
        submitLabel="Request My Call"
        source="Book a Call"
        fields={[
          { name: "name", label: "Full Name", required: true },
          { name: "org", label: "Organization", required: true },
          { name: "email", label: "Work Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel" },
          { name: "notes", label: "What would you like to cover?", type: "textarea" },
        ]}
      />
    </MarkdownPage>
  );
}
