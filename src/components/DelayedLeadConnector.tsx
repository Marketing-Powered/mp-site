"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";
import ChatWidgetPlacement from "@/components/ChatWidgetPlacement";

/* GoHighLevel LeadConnector chat widget.

   Chats opened here land in the GHL Conversations inbox tied to this widget
   id — that inbox is what the team's LeadConnector phone apps notify on.
   Routing (which users/group get the conversation) and the widget's reply
   mode are configured GHL-side against the id below; nothing about that
   lives in this repo, so the id is the whole integration contract.

   Deferred 4s — or until the visitor's first pointer/key interaction,
   whichever comes first — so a third-party script never competes with first
   paint while still putting the launcher on screen inside the first ten
   seconds, when visitors are still deciding whether to reach out. The gate
   below is what defers the load, so the tag itself is afterInteractive:
   lazyOnload would queue a second, unbounded idle wait on top of it. */

const CHAT_DELAY_MS = 4000;
// Bound the idle wait that follows the delay so a busy main thread can't push
// the launcher past the ten-second mark.
const CHAT_IDLE_TIMEOUT_MS = 1000;

// "MP Live Chat v1" (GHL chat type: Live chat). Real-time human chat that lands
// in Conversations and pushes to both operators' LeadConnector phone apps.
// Replaced the SMS/Email-type "A2P Compliance Chat Widget Marketing"
// (69eafedccbb9f443ce9942a0), which only collected a callback form. Changing
// this id re-points the chat at a different GHL widget.
const WIDGET_ID = "6aa8b75df095905710ea77b4";

export default function DelayedLeadConnector() {
  const shouldLoad = useDelayedScriptLoad(CHAT_DELAY_MS, CHAT_IDLE_TIMEOUT_MS);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={WIDGET_ID}
        strategy="afterInteractive"
      />
      <ChatWidgetPlacement />
    </>
  );
}
