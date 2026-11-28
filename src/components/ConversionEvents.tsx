"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import { gtagEvent, recordPageVisit } from "@/lib/track";

/* GA4 conversion events, captured with document-level listeners so every
   occurrence site-wide is covered without instrumenting each component:

     - form_button_click   any <button> or <input type=submit|button> inside
                           a <form> (lead forms, the lead modal, the cards
                           order form)
     - contact_email_click any mailto: link to the brand contact email
     - contact_email_copy  the contact email copied to the clipboard

   (form_submit_success — the server accepting a submission — is fired from
   the form components themselves, since only they see the response.)

   This component also records every pathname change into the session's page
   journey, which gtagEvent stamps onto all events (see src/lib/track.ts).

   Events go through the standard gtag stub: pushed onto window.dataLayer as
   Arguments objects, which gtag.js drains when it loads. The Google tag only
   loads after the visitor's first interaction (see DelayedGoogleTag) — but a
   click IS that interaction, so anything recorded here is picked up moments
   later and nothing is lost.

   To count these as conversions, mark each event name as a key event in
   GA4 Admin → Events once it has fired (or create it under Key events). */

const CONTACT_EMAIL = BRAND.email.toLowerCase();

export default function ConversionEvents() {
  const pathname = usePathname();

  /* Journey: one entry per page seen this session, in order. */
  useEffect(() => {
    if (pathname) recordPageVisit(pathname);
  }, [pathname]);

  useEffect(() => {
    /* Capture phase, so a component calling stopPropagation can't hide the
       click; keyboard activation (Enter/Space on a button) also dispatches a
       click, so it's covered too. */
    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const mailto = target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (mailto) {
        if (mailto.href.toLowerCase().includes(CONTACT_EMAIL)) {
          gtagEvent("contact_email_click", {
            link_text: (mailto.textContent ?? "").trim().slice(0, 100),
          });
        }
        return;
      }

      const button = target.closest<HTMLElement>(
        'button, input[type="submit"], input[type="button"]',
      );
      if (button && button.closest("form")) {
        const label =
          button instanceof HTMLInputElement
            ? button.value
            : (button.textContent ?? "");
        gtagEvent("form_button_click", {
          button_text: label.trim().slice(0, 100),
          button_type: (button.getAttribute("type") ?? "button").toLowerCase(),
        });
      }
    }

    function onCopy() {
      const selection = document.getSelection()?.toString().toLowerCase() ?? "";
      if (selection.includes(CONTACT_EMAIL)) {
        gtagEvent("contact_email_copy", {});
      }
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("copy", onCopy);
    };
  }, []);

  return null;
}
