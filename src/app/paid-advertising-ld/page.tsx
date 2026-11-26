import type { Metadata } from "next";
import { Suspense } from "react";
import PaidAdsLanding from "./PaidAdsLanding";

/* Locked paid-traffic landing page: no site nav, no outbound links, one
   conversion goal. Every CTA opens the contact form (the site-wide lead
   modal) instead of navigating. Kept out of the sitemap and marked
   noindex/follow — it is a destination for paid clicks, not for search. */

export const metadata: Metadata = {
  title: "Paid Ads Management & Local SEO | Marketing Powered",
  description:
    "Operator-led Google Ads, Meta Ads, Microsoft Ads and local SEO. ChatGPT Ads readiness for eligible advertisers. Request a Marketing Powered audit.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/paid-advertising-ld" },
  other: { "theme-color": "#071424" },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaidAdsLanding />
    </Suspense>
  );
}
