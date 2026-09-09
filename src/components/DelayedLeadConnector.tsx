"use client";

import Script from "next/script";
import useDelayedScriptLoad from "@/components/useDelayedScriptLoad";

/* GoHighLevel LeadConnector chat widget.

   Chats opened here land in the GHL Conversations inbox tied to this widget
   id — that inbox is what the team's LeadConnector phone apps notify on.
   Routing (which users/group get the conversation) and the widget's reply
   mode are configured GHL-side against the id below; nothing about that
   lives in this repo, so the id is the whole integration contract.

   Deferred 12s — or until the visitor's first pointer/key interaction,
   whichever comes first — so a third-party script never competes with first
   paint. */

const CHAT_DELAY_MS = 12000;

// Same widget id this site has always used; changing it re-points the chat at
// a different GHL inbox.
const WIDGET_ID = "69eafedccbb9f443ce9942a0";

export default function DelayedLeadConnector() {
  const shouldLoad = useDelayedScriptLoad(CHAT_DELAY_MS);

  if (!shouldLoad) return null;

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id={WIDGET_ID}
      strategy="lazyOnload"
    />
  );
}
