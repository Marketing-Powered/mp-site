import MarkdownPage from "@/components/site/MarkdownPage";
import { LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";

const FILE = "get-started/request-an-audit.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Get Started" hideCta>
      <LeadForm
        title="Request your free marketing audit"
        intro="Tell us about your center and we'll review your paid media, landing pages, attribution, and compliance posture. You'll get a straight assessment of where the opportunities are."
        submitLabel="Request My Audit"
        fields={[
          { name: "name", label: "Full Name", required: true },
          { name: "role", label: "Role / Title" },
          { name: "org", label: "Organization", required: true, full: true },
          { name: "email", label: "Work Email", type: "email", required: true },
          { name: "phone", label: "Phone", type: "tel" },
          {
            name: "facility",
            label: "Facility Type",
            type: "select",
            options: ["Detox", "Residential", "IOP / PHP", "Outpatient", "Telehealth", "Multi-site network"],
          },
          {
            name: "spend",
            label: "Monthly Ad Spend",
            type: "select",
            options: ["Under $25k", "$25k–$100k", "$100k–$500k", "$500k+"],
          },
          { name: "goals", label: "What are your growth goals?", type: "textarea" },
        ]}
      />
    </MarkdownPage>
  );
}
