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
        intro="Tell us about your center and we'll review your paid media, landing pages, attribution, and compliance posture. You'll get a written assessment of where the opportunities are, straight to your inbox."
        submitLabel="Request My Audit"
        source="Request an Audit"
        fields={[
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "company", label: "Company / Practice Name", type: "text", required: true },
          { name: "website", label: "Website URL", type: "text" },
          {
            name: "spend",
            label: "Monthly Ad Spend",
            type: "select",
            options: ["Under $5K", "$5K-$15K", "$15K-$50K", "$50K-$100K", "$100K+"],
          },
          {
            name: "challenge",
            label: "Biggest Marketing Challenge",
            type: "textarea",
            required: true,
          },
        ]}
      />
    </MarkdownPage>
  );
}
