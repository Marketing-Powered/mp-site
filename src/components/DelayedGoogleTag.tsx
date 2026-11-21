"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

/* Google tag (GT container + GA4 + Google Ads) behind the shared third-party
   gate: it loads on the visitor's first interaction, or once the page has been
   loaded and quiet for a few seconds.

   gtag.js fetches one container per configured id, roughly 350 KB of script in
   all. Started at window `load` it ran while the page was still settling and
   was charged to blocking time (and, on a slow test machine, to LCP).

   The trade-off: a session that ends without a single touch, scroll, pointer
   move, or key press inside the quiet window is never measured. Any of those
   starts the tag at once, which is also what keeps it ahead of a first click
   on an internal link (the tag reads click ids such as gclid from the URL it
   runs on). */

/* After window load. The first of the third-party scripts to go. */
const TAG_QUIET_MS = 4000;
/* Measurement should follow the trigger almost immediately. */
const TAG_IDLE_TIMEOUT_MS = 300;

export default function DelayedGoogleTag({
  tagId,
  configIds,
}: {
  /** Bootstrap id for the single gtag.js load. */
  tagId: string;
  /** Every id to `config`, the bootstrap id included. */
  configIds: string[];
}) {
  const shouldLoad = useDelayedScriptLoad(TAG_QUIET_MS, {
    idleTimeoutMs: TAG_IDLE_TIMEOUT_MS,
  });

  if (!shouldLoad) return null;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configIds.map((id) => `gtag('config', '${id}');`).join("\n")}`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
