import Image from "next/image";
import { MapPin, Pause, Play } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { cn } from "@/lib/cn";
import { CENTER, GRID, cells, legend, rankStyle, snapshots, summarize } from "./heatmapModel";

/* Presentational timelapse figure. Rendered on the server for the first
   snapshot and again by HeatmapWidget once it hydrates, so the markup is
   identical in both and the swap is invisible. The handlers are optional:
   without them the controls are inert, which is what the static render
   wants. */

export type HeatmapFigureProps = {
  shot: number;
  playing: boolean;
  mapRef?: React.Ref<HTMLDivElement>;
  onToggle?: () => void;
  onSelect?: (index: number) => void;
};

export default function HeatmapFigure({ shot, playing, mapRef, onToggle, onSelect }: HeatmapFigureProps) {
  const current = snapshots[shot];
  const { ranks, average, topThree } = summarize(shot);

  return (
    <figure className="flex flex-col gap-4">
      <dl className="grid grid-cols-3 gap-3" aria-live="polite">
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
              const style = rankStyle(rank);
              const isCenter = row === CENTER && col === CENTER;
              return (
                <div key={i} className="flex items-center justify-center">
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-xs font-bold shadow-md ring-2 transition-colors duration-700 sm:size-9 sm:text-sm",
                      isCenter ? "ring-[#7FCBFF]" : "ring-[#050B16]/80",
                    )}
                    style={{ backgroundColor: style.bg, color: style.fg }}
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
            onClick={onToggle}
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
            onClick={onSelect ? () => onSelect(i) : undefined}
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
  );
}
