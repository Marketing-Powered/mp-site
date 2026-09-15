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

   Two deliberate choices in the CSS below:
   - `margin-bottom` rather than `bottom`/`transform`. It stacks on whatever
     bottom offset the vendor ships at any breakpoint, and leaves `transform`
     free for the widget's own open/close animation.
   - the lift applies only while the widget is closed. The open panel is sized
     against the viewport and already reaches close to the top edge on a short
     screen, so raising it too would clip the composer off the bottom. */

const LIFT_CSS = `
:host {
  /* ~15% of the viewport, bounded at both ends: the floor clears the mobile
     CTA bar on a short screen, the ceiling stops a tall desktop from parking
     the greeting bubble in the middle of the reading column. */
  --mp-chat-lift: clamp(88px, 15vh, 132px);
}
#lc_text-widget:not(.lc_text-widget--active),
#lc_text-widget--btn:not(.active) {
  margin-bottom: var(--mp-chat-lift) !important;
}
/* The closed wrapper is a 301x150 box whose visible greeting bubble is only
   the top 72px — the rest is transparent but still swallows clicks meant for
   the page underneath. Hand pointer events back to the bubble alone. */
#lc_text-widget:not(.lc_text-widget--active) {
  pointer-events: none !important;
}
#lc_text-widget:not(.lc_text-widget--active) .lc_text-widget--prompt {
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

    // Attaching a shadow root is invisible to an outer MutationObserver, so
    // back the observer with a bounded poll: the widget stamps `hydrated` on
    // the host only once its shadow content exists.
    const observer = new MutationObserver(() => check());
    const poll = window.setInterval(() => check(), 250);
    const giveUp = window.setTimeout(() => stop(), 30000);

    const stop = () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(giveUp);
    };
    const check = () => {
      if (tryApply()) stop();
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
