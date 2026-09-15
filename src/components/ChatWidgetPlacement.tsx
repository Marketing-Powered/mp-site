"use client";

import { useEffect } from "react";

/* Lifts the LeadConnector chat launcher clear of the page's own bottom-anchored
   UI — the footer's "Request a Free Audit" row on desktop, the sticky call/audit
   bar on mobile.

   The widget renders `<chat-widget>` with an open shadow root holding two
   fixed, bottom-anchored elements: `#lc_text-widget` (the greeting prompt
   bubble, and the chat panel once opened) and `#lc_text-widget--btn` (the round
   launcher). Shadow encapsulation puts both out of reach of globals.css, so the
   offset is adopted onto the shadow root instead.

   Three deliberate choices in the CSS below:
   - `translate` rather than an offset property, so the lift is composited
     instead of relaying out the launcher on every frame of the vendor's
     transition.
   - the lift applies only while the widget is closed. The open panel is sized
     against the viewport and already reaches close to the top edge on a short
     screen, so raising it too would clip the composer off the bottom.
   - the amount comes from --mp-chat-lift-outer on the document rather than
     being fixed here, so it can track the mobile CTA bar. The bubble and the
     launcher have to travel together — the bubble's tail points at the
     launcher — and the pair is 170px tall, so a constant mobile lift puts the
     bubble over the hero's own call button. */

const LIFT_CSS = `
:host {
  /* Set on the document by globals.css, and tracked to the mobile CTA bar by
     StickyMobileCta. The fallback is what a page without that bar gets. */
  --mp-chat-lift: var(--mp-chat-lift-outer, 0px);
}
/* Move with \`translate\`, not an offset property. The vendor ships
   \`transition: all\` on these, so animating margin or bottom re-lays the
   launcher out every frame and registers as layout shift — measured CLS 0.25
   on mobile, where the lift changes as the CTA bar comes and goes. Translation
   is composited and costs nothing. \`translate\` is its own property in CSS, so
   this also leaves \`transform\` free for the widget's own animation.

   Applied to the launcher and the greeting bubble individually, never to
   #lc_text-widget: the launcher is a position:fixed child of that wrapper, so
   transforming the wrapper would make it the launcher's containing block. */
#lc_text-widget:not(.lc_text-widget--active) .lc_text-widget--prompt,
#lc_text-widget--btn:not(.active) {
  translate: 0 calc(-1 * var(--mp-chat-lift)) !important;
}
/* The closed wrapper is a 301x150 box whose visible greeting bubble is only
   the top 72px — the rest is transparent but still swallows clicks meant for
   the page underneath. Hand events back to the two things that want them; the
   launcher needs restoring explicitly because it is nested inside. */
#lc_text-widget:not(.lc_text-widget--active) {
  pointer-events: none !important;
}
#lc_text-widget:not(.lc_text-widget--active) .lc_text-widget--prompt,
#lc_text-widget:not(.lc_text-widget--active) #lc_text-widget--btn {
  pointer-events: auto !important;
}
/* globals.css can't reach past the shadow boundary, so the reduced-motion
   opt-out has to be restated here: the lift rides the vendor's own
   all-property transition and would otherwise animate regardless. */
@media (prefers-reduced-motion: reduce) {
  #lc_text-widget,
  #lc_text-widget--btn {
    transition: none !important;
  }
}
`;

const STYLE_MARKER = "data-mp-chat-placement";

function applyOffset(host: Element) {
  const root = (host as Element & { shadowRoot: ShadowRoot | null }).shadowRoot;
  if (!root) return false;

  // adoptedStyleSheets survives the widget re-rendering its own markup, and is
  // ordered after the shadow root's own sheets so it wins ties.
  if ("adoptedStyleSheets" in root && typeof CSSStyleSheet === "function") {
    try {
      const marked = root.adoptedStyleSheets as (CSSStyleSheet & { [STYLE_MARKER]?: boolean })[];
      if (marked.some((sheet) => sheet[STYLE_MARKER])) return true;
      const sheet = new CSSStyleSheet() as CSSStyleSheet & { [STYLE_MARKER]?: boolean };
      sheet.replaceSync(LIFT_CSS);
      sheet[STYLE_MARKER] = true;
      root.adoptedStyleSheets = [...marked, sheet];
      return true;
    } catch {
      // constructable stylesheets unavailable — fall through to a <style> tag
    }
  }

  if (root.querySelector(`style[${STYLE_MARKER}]`)) return true;
  const style = document.createElement("style");
  style.setAttribute(STYLE_MARKER, "");
  style.textContent = LIFT_CSS;
  root.append(style);
  return true;
}

export default function ChatWidgetPlacement() {
  useEffect(() => {
    // The widget mounts asynchronously and can hydrate its shadow root a tick
    // after the element lands, so keep watching until the offset takes.
    const tryApply = () => {
      const hosts = document.querySelectorAll("chat-widget");
      if (!hosts.length) return false;
      return [...hosts].map(applyOffset).every(Boolean);
    };

    if (tryApply()) return undefined;

    /* Attaching a shadow root is invisible to an outer MutationObserver, so
       back the observer with a poll. It runs every frame at first — the shadow
       root shows up within a few hundred ms of the element and the launcher
       paints right after, so a coarse interval risks the visitor seeing it in
       the wrong place — then drops to a slow tick that keeps re-asserting the
       sheet in case the widget ever replaces its adoptedStyleSheets. */
    const observer = new MutationObserver(() => check());
    let fast: number | undefined = window.setInterval(() => check(), 50);
    let slow: number | undefined;
    const giveUp = window.setTimeout(() => stop(), 30000);

    const stop = () => {
      observer.disconnect();
      window.clearInterval(fast);
      window.clearInterval(slow);
      window.clearTimeout(giveUp);
    };
    const check = () => {
      if (!tryApply()) return;
      // Applied. Stand the expensive watchers down, keep a cheap re-assert.
      observer.disconnect();
      if (fast !== undefined) {
        window.clearInterval(fast);
        fast = undefined;
        slow = window.setInterval(() => tryApply(), 1000);
      }
    };

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return stop;
  }, []);

  return null;
}
