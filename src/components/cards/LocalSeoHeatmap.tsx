import { CardsSection } from "./ui";
import LazyMount from "./LazyMount";
import HeatmapFigure from "./HeatmapFigure";

/* Server component: the copy ships as plain HTML, and the figure is the
   static first frame until LazyMount swaps in the interactive widget. */

export default function LocalSeoHeatmap() {
  return (
    <CardsSection id="local-seo" labelledBy="local-seo-title">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
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

        <LazyMount widget="heatmap">
          <HeatmapFigure shot={0} playing={false} />
        </LazyMount>
      </div>
    </CardsSection>
  );
}
