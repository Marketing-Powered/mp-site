import Reveal from "@/components/Reveal";
import { mono } from "./theme";

/* Placeholder for imagery Jason will drop in later (2-3 per page).
   Renders an intentional dashed frame with a label + suggested ratio. */
export default function ImageSlot({
  label,
  ratio = "16 / 9",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <Reveal variant="blur" className={className}>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02]"
        style={{ aspectRatio: ratio }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(0,144,240,0.10), transparent 60%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-2 px-6 text-center">
          <span className="text-[#0090F0]/70">✦</span>
          <span
            className="text-[11px] uppercase tracking-[0.22em] text-white/35"
            style={{ fontFamily: mono }}
          >
            Image · {label}
          </span>
        </div>
      </div>
    </Reveal>
  );
}
