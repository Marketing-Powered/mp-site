"use client";

import { useEffect, useRef, useState } from "react";
import HeatmapFigure from "./HeatmapFigure";
import { snapshots } from "./heatmapModel";

/* Interactive timelapse: autoplays once the map is half in view (unless the
   visitor prefers reduced motion), loops with a longer hold on the last
   frame, and lets the tabs or the play button take over. Loaded on demand
   by LazyMount. */

const SHOT_INTERVAL_MS = 2000;
const FINAL_HOLD_MS = 3500;

export default function HeatmapWidget() {
  const [shot, setShot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reducedMotion) {
          setShot(0);
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const isLast = shot === snapshots.length - 1;
    const timer = window.setTimeout(
      () => setShot((s) => (s + 1) % snapshots.length),
      isLast ? FINAL_HOLD_MS : SHOT_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, shot]);

  return (
    <HeatmapFigure
      shot={shot}
      playing={playing}
      mapRef={mapRef}
      onToggle={() => setPlaying((p) => !p)}
      onSelect={(i) => {
        setShot(i);
        setPlaying(false);
      }}
    />
  );
}
