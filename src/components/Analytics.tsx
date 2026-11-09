import Script from "next/script";
import DelayedAdPixels from "@/components/DelayedAdPixels";

/* Analytics / tracking pixels.

   Google Tag stack (GT container + GA4 + Google Ads) loads site-wide via a
   single gtag.js. These are public measurement IDs (not secrets), so they're
   hardcoded to work in production without env setup. GA4 can still be overridden
   via NEXT_PUBLIC_GA4_ID, but defaults to the live property — and is configured
   inside this one gtag init so GA4 is never loaded twice.

   Meta Pixel loads site-wide too — hardcoded to the live pixel so it fires in
   production without env setup, with NEXT_PUBLIC_META_PIXEL_ID as an optional
   override:
     - NEXT_PUBLIC_META_PIXEL_ID  e.g. 123456789012345 (Meta / Facebook Pixel)
   NEXT_PUBLIC_* values are inlined at build time. */

// Bootstrap id for the single gtag.js load (the Google Tag / GT container).
const GOOGLE_TAG_ID = "GT-NCLQZNDM";
// Configured through the same gtag init (no second loader).
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-ECRV2LCTGQ";
const GOOGLE_ADS_ID = "AW-17466787352";
// LinkedIn Insight Tag partner id.
const LINKEDIN_PARTNER_ID = "7399266";
// Meta / Facebook Pixel — defaults to the live pixel; env can override.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1517109923157500";

export default function Analytics() {
  return (
    <>
      {/* Google Tag — one gtag.js load, then config for the GT container, GA4,
          and Google Ads. Loading the GT id bootstraps the stack; GA4 is folded
          into this init rather than a second loader. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');
gtag('config', '${GA4_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
        />
      </noscript>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>

      <DelayedAdPixels
        linkedInPartnerId={LINKEDIN_PARTNER_ID}
        metaPixelId={META_PIXEL_ID}
      />
    </>
  );
}
