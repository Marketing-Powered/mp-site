"use client";

import { useEffect, useState } from "react";

/* Gate for third-party scripts (Google tag, chat widget, ad pixels). Returns
   false until one of two things happens, then true:

     - the visitor does something: touches, scrolls, moves the pointer, or
       presses a key; or
     - the page has finished loading and then sat for `quietMs`.

   None of these scripts is needed to render or use the page, and together they
   outweigh the site's own JavaScript. Started any earlier, they compete with
   the hero image and the hydration bundle for a slow connection and a slow
   CPU, and lab tools (Lighthouse, PageSpeed Insights) bill every byte that
   lands before the largest paint to LCP. A visitor who interacts gets them
   straight away; one who only reads gets them a few seconds after the page
   has settled.

   `quietMs` runs from the window `load` event, not from navigation start, so
   a slow connection can't have the timer expire while the page is still
   loading.

   `settleMs` is an extra wait after an interaction trigger. Every consumer
   hears the same first touch, so without it they would all start at once, in
   the middle of the visitor's first scroll. The quiet timers are already
   spaced apart by their own `quietMs`.

   `idleTimeoutMs` bounds the requestIdleCallback that follows either trigger,
   so a busy main thread can only push the load that much further out. Keep it
   small for scripts that should follow the trigger closely. */

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "wheel",
  "scroll",
  "keydown",
] as const;

export default function useDelayedScriptLoad(
  quietMs: number,
  { settleMs = 0, idleTimeoutMs = 3000 }: { settleMs?: number; idleTimeoutMs?: number } = {},
) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;

    let timeoutId: number | undefined;
    let idleId: number | undefined;
    let triggered = false;
    let loaded = false;

    const stopListening = () => {
      for (const type of INTERACTION_EVENTS) window.removeEventListener(type, onInteraction);
      window.removeEventListener("load", startQuietTimer);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    const load = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
    };

    /* Either trigger hands off to an idle callback, so the script never starts
       in the middle of the frame that is handling the visitor's gesture. */
    const loadWhenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(load, { timeout: idleTimeoutMs });
      } else {
        load();
      }
    };

    function onQuiet() {
      if (triggered) return;
      triggered = true;
      stopListening();
      loadWhenIdle();
    }

    function onInteraction() {
      if (triggered) return;
      triggered = true;
      stopListening();
      if (settleMs > 0) timeoutId = window.setTimeout(loadWhenIdle, settleMs);
      else loadWhenIdle();
    }

    function startQuietTimer() {
      timeoutId = window.setTimeout(onQuiet, quietMs);
    }

    for (const type of INTERACTION_EVENTS) {
      window.addEventListener(type, onInteraction, { passive: true });
    }
    if (document.readyState === "complete") startQuietTimer();
    else window.addEventListener("load", startQuietTimer);

    return () => {
      stopListening();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [quietMs, settleMs, idleTimeoutMs, shouldLoad]);

  return shouldLoad;
}
