/* Meta Pixel custom events for TOFU button clicks.

   Every CTA button click fires a generic TOFU_CTA_Click, plus one
   intent-specific event when the destination maps to a lead form
   (src/lib/leadForms.ts) or is a tel:/mailto: contact link. Each event
   name below can be turned into its own Custom Conversion in Meta
   Events Manager (Data sources → pixel → Custom conversions):

     TOFU_CTA_Click            any CTA button, params carry the detail
     TOFU_AuditRequest_Click   buttons pointing at the audit form
     TOFU_BookCall_Click       buttons pointing at the discovery-call form
     TOFU_Contact_Click        buttons pointing at the contact form
     TOFU_Qualification_Click  buttons pointing at the qualification form
     TOFU_Phone_Click          tel: links
     TOFU_Email_Click          mailto: links / Email Us buttons

   Params on every event: cta_destination, cta_location (nav, hero,
   cta_band, sticky_mobile, …), page_path, and cta_label when known.

   The pixel itself loads late — DelayedAdPixels waits for first
   interaction or ~7s — so the very click that triggers the pixel load
   lands before window.fbq exists. Events fired before then queue on
   window.__mpMetaEvents; DelayedAdPixels drains the queue right after
   fbq('init', …). */

import { leadFormKeyForHref, type LeadFormKey } from "@/lib/leadForms";

type MetaEventParams = Record<string, string>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __mpMetaEvents?: Array<[string, MetaEventParams]>;
  }
}

const INTENT_EVENTS: Record<LeadFormKey, string> = {
  audit: "TOFU_AuditRequest_Click",
  call: "TOFU_BookCall_Click",
  contact: "TOFU_Contact_Click",
  qualification: "TOFU_Qualification_Click",
};

export function trackMetaCustom(event: string, params: MetaEventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  } else {
    (window.__mpMetaEvents ??= []).push([event, params]);
  }
}

/** Report a CTA click pointing at `href`. Safe to call from any client
    component; never throws and never blocks navigation. */
export function trackCtaClick({
  href,
  label,
  location,
}: {
  href: string;
  label?: string;
  location?: string;
}) {
  if (typeof window === "undefined") return;
  const params: MetaEventParams = {
    cta_destination: href,
    cta_location: location || "body",
    page_path: window.location.pathname,
  };
  if (label) params.cta_label = label;

  // Contact links get their own event and skip the generic button event —
  // most of them are text links, and keeping them separate lets each become
  // (or be excluded from) a Custom Conversion on its own.
  if (href.startsWith("tel:")) {
    trackMetaCustom("TOFU_Phone_Click", params);
    return;
  }
  if (href.startsWith("mailto:")) {
    trackMetaCustom("TOFU_Email_Click", params);
    return;
  }

  trackMetaCustom("TOFU_CTA_Click", params);
  const intent = leadFormKeyForHref(href);
  if (intent) trackMetaCustom(INTENT_EVENTS[intent], params);
}

/** Visible text of a clicked CTA, minus decorative glyphs. */
export function ctaLabelFromElement(el: HTMLElement): string {
  return (el.textContent || "").replace(/[→✉✓]/g, "").trim();
}
