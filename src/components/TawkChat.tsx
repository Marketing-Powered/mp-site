"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

/* Tawk.to live chat widget — loaded site-wide from the root layout, so it
   appears on every page. Property/widget ids are public embed values.

   The widget is several hundred KB of script that no page needs in order to
   render, so it waits for the visitor's first interaction, or for the page to
   have been loaded and quiet for a few seconds, whichever comes first. Loaded
   straight after hydration it competed with the hero image on slow
   connections and was counted against LCP and blocking time. */
const TAWK_SRC = "https://embed.tawk.to/6af5e9600c67493c4d3a79d0/1k789f82h";

/* After window load. Later than the Google tag, so the two don't land in the
   same burst. */
const CHAT_QUIET_MS = 6000;
/* After a first interaction: just behind the Google tag, but close enough
   that the launcher is there by the time the visitor looks for it. */
const CHAT_SETTLE_MS = 1200;
const CHAT_IDLE_TIMEOUT_MS = 1500;

export default function TawkChat() {
  const shouldLoad = useDelayedScriptLoad(CHAT_QUIET_MS, {
    settleMs: CHAT_SETTLE_MS,
    idleTimeoutMs: CHAT_IDLE_TIMEOUT_MS,
  });

  if (!shouldLoad) return null;

  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='${TAWK_SRC}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
    </Script>
  );
}
