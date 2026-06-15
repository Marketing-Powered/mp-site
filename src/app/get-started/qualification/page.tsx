import MarkdownPage from "@/components/site/MarkdownPage";
import { LeadForm } from "@/components/site/Forms";
import { pageMetadata } from "@/lib/pages";

const FILE = "get-started/qualification.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  return (
    <MarkdownPage file={FILE} kicker="Get Started" hideCta>
      <LeadForm
        title="See if we're the right fit"
        intro="A few quick questions help us route you to the right next step. We work best with behavioral health and mental health providers ready to scale compliant patient acquisition."
        submitLabel="Check My Fit"
        source="Qualification"
        fields={[
          { name: "name", label: "Full Name", required: true },
          { name: "org", label: "Organization", required: true },
          { name: "email", label: "Work Email", type: "email", required: true, full: true },
          {
            name: "vertical",
            label: "Primary Vertical",
            type: "select",
            options: ["Behavioral Health", "Mental Health", "Both", "Other"],
          },
          {
            name: "locations",
            label: "Number of Locations",
            type: "select",
            options: ["1", "2–5", "6–15", "16+"],
          },
          {
            name: "spend",
            label: "Current Monthly Ad Spend",
            type: "select",
            options: ["Not running paid yet", "Under $25k", "$25k–$100k", "$100k–$500k", "$500k+"],
          },
          {
            name: "timeline",
            label: "Timeline to Start",
            type: "select",
            options: ["Immediately", "This quarter", "Exploring options"],
          },
          { name: "notes", label: "Anything else we should know?", type: "textarea" },
        ]}
      />
    </MarkdownPage>
  );
}
