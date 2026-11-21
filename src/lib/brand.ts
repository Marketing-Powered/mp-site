/* Brand contact details.

   Kept in their own module, apart from the page copy in content.ts, so that
   client components (the nav, the call buttons, the mobile CTA bar) can import
   them without pulling the whole site copy deck into the browser bundle. */
export const BRAND = {
  name: "Marketing Powered",
  /** Display form. The Google Business Profile number — keep these three in
      step: `phone` is what visitors read, `phoneE164` is what they dial and
      what the LocalBusiness/Organization schema publishes. */
  phone: "(561) 560-6804",
  phoneE164: "+15615606804",
  email: "info@marketingpowered.ai",
  address: "9494 Osprey Isles Blvd, Palm Beach Gardens, FL 33412",
  tagline: "AI Marketing Agency for Behavioral Health",
};
