"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/* Sends a GA4 `call_click` event for any tel: link on the site. One delegated
   listener covers the header, footer, sticky call bar and in-page CTAs, so new
   phone links are tracked without extra wiring. This measures intent to call;
   GA4 cannot see whether the call connected. */
export default function CallClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const link = e.target.closest('a[href^="tel:"]');
      if (!link) return;
      trackEvent("call_click", {
        phone_number: (link.getAttribute("href") || "").replace("tel:", ""),
        link_location: link.closest("header")
          ? "header"
          : link.closest("footer")
            ? "footer"
            : "body",
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
