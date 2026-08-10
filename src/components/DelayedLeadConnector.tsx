"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

const CHAT_DELAY_MS = 12000;

export default function DelayedLeadConnector() {
  const shouldLoad = useDelayedScriptLoad(CHAT_DELAY_MS);

  if (!shouldLoad) return null;

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="69eafedccbb9f443ce9942a0"
      strategy="lazyOnload"
    />
  );
}
