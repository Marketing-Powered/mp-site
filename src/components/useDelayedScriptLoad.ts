"use client";

import { useEffect, useState } from "react";

export default function useDelayedScriptLoad(delayMs: number) {
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
        idleId = window.requestIdleCallback(load, { timeout: 3000 });
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
  }, [delayMs, shouldLoad]);

  return shouldLoad;
}
