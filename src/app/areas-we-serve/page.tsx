import HubPage from "@/components/site/HubPage";
import { pageMetadata } from "@/lib/pages";

const FILE = "areas-we-serve.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  /* All six copy sections, not the hub default of four: the last two carry
     the founder's background and the strategy-call close with the phone
     number, and were being cut off. */
  return (
    <HubPage file={FILE} kicker="Areas We Serve" cardKicker="Locations" maxSections={Infinity} />
  );
}
