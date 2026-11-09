"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

/* Defers an interactive widget until the visitor scrolls near it.

   The server renders a static version of the same UI (the children), so
   the page is complete without JavaScript and the initial bundle carries
   none of the widget's code. Once the slot is within 800px of the viewport
   the widget's chunk loads and takes over; the static markup stays on
   screen as the Suspense fallback until the widget is ready, so nothing
   flashes or shifts. Widgets are named, not passed as functions, because a
   server component cannot hand a client component a function prop. */

const WIDGETS = {
  heatmap: lazy(() => import("./HeatmapWidget")),
  calculator: lazy(() => import("./KitCalculatorWidget")),
};

export default function LazyMount({
  widget,
  children,
}: {
  widget: keyof typeof WIDGETS;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Browsers without IntersectionObserver get the widget on the next tick.
    if (typeof IntersectionObserver === "undefined") {
      const t = window.setTimeout(() => setReady(true), 0);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Widget = WIDGETS[widget];

  return (
    <div ref={ref}>
      {ready ? (
        <Suspense fallback={children}>
          <Widget />
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}
