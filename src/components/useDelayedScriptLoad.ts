"use client";

import { useEffect, useState } from "react";

/* Gate for third-party scripts: returns false until `delayMs` has passed (or
   the visitor interacts, whichever comes first), then true.

   `delayMs` is measured from navigation start, not from when this effect runs.
   Hydration is already 0.2-0.9s in on a fast connection and 2.6s in on slow
   4G, and charging that to the budget twice pushed the launcher past ten
   seconds on weak connections.

   `idleTimeoutMs` bounds the requestIdleCallback that follows the delay, so a
   busy main thread can only push the load that much further out. Keep it small
   for scripts whose UI the visitor is meant to see early. */

/* Floor on the remaining wait, so a slow hydration never fires the load in the
   same frame it finishes. */
const MIN_REMAINING_MS = 500;
export default function useDelayedScriptLoad(delayMs: number, idleTimeoutMs = 3000) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return undefined;

    let idleId: number | undefined;
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      setShouldLoad(true);
    };

    const loadWhenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(load, { timeout: idleTimeoutMs });
      } else {
        load();
      }
    };

    const elapsed = typeof performance !== "undefined" ? performance.now() : 0;
    const timeoutId = window.setTimeout(loadWhenIdle, Math.max(MIN_REMAINING_MS, delayMs - elapsed));

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
    };
  }, [delayMs, idleTimeoutMs, shouldLoad]);

  return shouldLoad;
}
