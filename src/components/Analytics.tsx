import DelayedAdPixels from "@/components/DelayedAdPixels";
import DelayedGoogleTag from "@/components/DelayedGoogleTag";

/* Analytics / tracking pixels.

   Google Tag stack (GT container + GA4 + Google Ads) loads site-wide via a
   single gtag.js. These are public measurement IDs (not secrets), so they're
   hardcoded to work in production without env setup. GA4 can still be overridden
   via NEXT_PUBLIC_GA4_ID, but defaults to the live property — and is configured
   inside this one gtag init so GA4 is never loaded twice.

   Nothing here loads with the page. Every script waits behind the shared gate
   in useDelayedScriptLoad (first interaction, or a few quiet seconds after
   window load), staggered so they don't arrive in one burst: Google tag first,
   then chat (TawkChat), then the ad pixels.

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
      <DelayedGoogleTag
        tagId={GOOGLE_TAG_ID}
        configIds={[GOOGLE_TAG_ID, GA4_ID, GOOGLE_ADS_ID]}
      />

      {/* No LinkedIn <noscript> image fallback: px.ads.linkedin.com is
          disallowed by LinkedIn's robots.txt, so every page was flagged by
          site audits for a blocked external resource. The JS Insight Tag in
          DelayedAdPixels still fires for real visitors. */}
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
