"use client";

import { useEffect, useState } from "react";

/* Gate for third-party scripts: returns false until `delayMs` has passed (or
   the visitor interacts, whichever comes first), then true.

   `idleTimeoutMs` bounds the requestIdleCallback that follows the delay, so a
   busy main thread can only push the load that much further out. Keep it small
   for scripts whose UI the visitor is meant to see early. */
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

    const timeoutId = window.setTimeout(loadWhenIdle, delayMs);

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
