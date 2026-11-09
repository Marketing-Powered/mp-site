"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Pause, Play } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { cn } from "@/lib/cn";
import { CardsSection } from "./ui";

/* Animated geo-grid rank scan. ILLUSTRATIVE: the snapshots are a worked
   example of how a local pack position spreads as review count grows, not a
   measured client result, and the caption says so on the page. */

const GRID = 7;
const CENTER = (GRID - 1) / 2;
const SHOT_INTERVAL_MS = 2000;
const FINAL_HOLD_MS = 3500;

const snapshots = [
  { label: "Day 1", caption: "Before Powered Cards", reviews: 18, greenRadius: 0.4 },
  { label: "Month 1", caption: "Cards on the counter", reviews: 41, greenRadius: 1.2 },
  { label: "Month 2", caption: "Every staff member tapping", reviews: 73, greenRadius: 2.1 },
  { label: "Month 3", caption: "Steady weekly reviews", reviews: 112, greenRadius: 3 },
  { label: "Month 4", caption: "Owning the map", reviews: 156, greenRadius: 4.3 },
];

const RANK_COLORS = {
  top: "#1FA463",
  mid: "#E8B521",
  low: "#EF7D2D",
  none: "#E0453A",
};

const jitter = (row: number, col: number) => (((row * 7 + col * 13) % 5) - 2) * 0.12;

const rankFor = (row: number, col: number, greenRadius: number) => {
  const distance = Math.hypot(row - CENTER, col - CENTER) + jitter(row, col);
  const gap = distance - greenRadius;
  if (gap <= 0) return Math.max(1, Math.min(3, Math.round(1 + distance / 2)));
  if (gap <= 1) return 4 + Math.round(gap * 6);
  if (gap <= 2) return 11 + Math.round((gap - 1) * 4);
  return 20;
};

const rankColor = (rank: number) => {
  if (rank <= 3) return RANK_COLORS.top;
  if (rank <= 10) return RANK_COLORS.mid;
  if (rank <= 15) return RANK_COLORS.low;
  return RANK_COLORS.none;
};

const cells = Array.from({ length: GRID * GRID }, (_, i) => ({
  row: Math.floor(i / GRID),
  col: i % GRID,
}));

const summarize = (greenRadius: number) => {
  const ranks = cells.map(({ row, col }) => rankFor(row, col, greenRadius));
  const average = ranks.reduce((sum, r) => sum + r, 0) / ranks.length;
  const topThree = ranks.filter((r) => r <= 3).length;
  return { ranks, average, topThree };
};

const legend = [
  { label: "Top 3", color: RANK_COLORS.top },
  { label: "4-10", color: RANK_COLORS.mid },
  { label: "11-15", color: RANK_COLORS.low },
  { label: "16-20+", color: RANK_COLORS.none },
];

export default function LocalSeoHeatmap() {
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

  const current = snapshots[shot];
  const { ranks, average, topThree } = summarize(current.greenRadius);

  return (
    <CardsSection id="local-seo" labelledBy="local-seo-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="mb-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#0090F0]">
              <span className="inline-block h-px w-8 bg-[#0090F0]" />
              Local SEO
            </p>
            <h2
              id="local-seo-title"
              className="font-serif text-[clamp(1.7rem,3vw,2.6rem)] font-normal leading-[1.08] text-balance"
            >
              More reviews push your business up the map, one block at a time.
            </h2>
            <p className="leading-relaxed text-muted-foreground text-pretty">
              Google ranks local businesses on review count, recency and rating. Powered Cards turn
              every happy customer into a fresh 5-star review in seconds, so your green zone, the
              area where you show up in the top 3, spreads out from your front door.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-card p-4">
              <dt className="text-xs text-muted-foreground">Google reviews</dt>
              <dd className="text-2xl font-semibold tabular-nums">{current.reviews}</dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-card p-4">
              <dt className="text-xs text-muted-foreground">Avg. map rank</dt>
              <dd className="text-2xl font-semibold tabular-nums">{average.toFixed(1)}</dd>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-card p-4">
              <dt className="text-xs text-muted-foreground">Top 3 points</dt>
              <dd className="text-2xl font-semibold tabular-nums">
                {topThree}
                <span className="text-sm font-normal text-muted-foreground">/{cells.length}</span>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 border-l-2 border-[#0090F0] pl-5">
            <p className="leading-relaxed text-white/60 text-pretty">
              Most happy customers mean to leave a review and simply forget. A card in their hand,
              or a stand at the counter, gets the review done while they are still standing in
              front of you.
            </p>
            <p className="leading-relaxed text-white/60 text-pretty">
              A steady flow of reviews tells Google you are active and trusted nearby. That is what
              moves you from page two into the map pack, first around your shop and then across the
              neighborhoods you serve.
            </p>
          </div>
        </div>

        <figure className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_24px_60px_-32px_rgba(0,24,72,0.55)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{'"auto detailing near me"'}</span>
                <span className="text-xs text-muted-foreground">7 x 7 grid, 0.5 mi spacing</span>
              </div>
              <span className="rounded-full bg-[#0090F0] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-black tabular-nums">
                {current.label}
              </span>
            </div>

            <div ref={mapRef} className="relative aspect-square">
              <Image
                src="/images/pages/cards/local-map.jpg"
                alt=""
                fill
                quality={72}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 grid p-[4%]"
                style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}
                role="img"
                aria-label={`${current.label}: ${topThree} of ${cells.length} map points rank in the top 3, average rank ${average.toFixed(1)}`}
              >
                {cells.map(({ row, col }, i) => {
                  const rank = ranks[i];
                  const isCenter = row === CENTER && col === CENTER;
                  return (
                    <div key={i} className="flex items-center justify-center">
                      <span
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ring-2 transition-colors duration-700 sm:size-9 sm:text-sm",
                          isCenter ? "ring-[#7FCBFF]" : "ring-[#050B16]/80",
                        )}
                        style={{ backgroundColor: rankColor(rank) }}
                      >
                        {rank >= 20 ? "20+" : rank}
                      </span>
                    </div>
                  );
                })}
              </div>
              <MapPin
                className="pointer-events-none absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-[160%] fill-[#7FCBFF] text-[#050B16]"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <ul className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {legend.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause timelapse" : "Play timelapse"}
                className={`flex size-8 items-center justify-center rounded-md border border-white/15 transition-colors hover:bg-white/10 ${FOCUS_RING}`}
              >
                {playing ? (
                  <Pause className="size-4" aria-hidden="true" />
                ) : (
                  <Play className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Timelapse snapshot"
            className="grid grid-cols-5 gap-1 rounded-xl border border-white/10 bg-card p-1"
          >
            {snapshots.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === shot}
                onClick={() => {
                  setShot(i);
                  setPlaying(false);
                }}
                className={cn(
                  "rounded-lg px-1 py-2 text-xs font-medium transition-colors",
                  FOCUS_RING,
                  i === shot
                    ? "bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <figcaption className="text-xs leading-relaxed text-muted-foreground">
            {current.caption}. Illustrative example of a geo-grid rank scan for a single-location
            business. Results vary by market, competition and review volume.
          </figcaption>
        </figure>
      </div>
    </CardsSection>
  );
}
