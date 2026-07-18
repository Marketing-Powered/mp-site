"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

const CHAT_DELAY_MS = 12000;

/* "Jessica" — the DIAL3D AI chat assistant (same brain as the phone agent).
   Replaces the old LeadConnector chat widget. */
export default function DelayedDial3dChat() {
  const shouldLoad = useDelayedScriptLoad(CHAT_DELAY_MS);

  if (!shouldLoad) return null;

  return (
    <Script
      src="https://chat.dial3d.ai/marketing-powered/embed.js"
      strategy="lazyOnload"
    />
  );
}
