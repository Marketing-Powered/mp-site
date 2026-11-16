import Image from "next/image";
import Reveal from "@/components/Reveal";
import { mono } from "./theme";

/* Image frame for the brand graphics (2-3 per page).
   When `src` is supplied it renders the real image; the brand art lives on
   white backgrounds, so `contain` sits it on a clean white artboard (no
   cropping of the wordmark). With no `src` it falls back to an intentional
   dashed placeholder so any slot we don't have art for still reads as
   deliberate rather than broken. */
export default function ImageSlot({
  label,
  ratio = "16 / 9",
  className = "",
  src,
  alt,
  fit = "contain",
  priority = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 60vw",
}: {
  label: string;
  ratio?: string;
  className?: string;
  src?: string;
  alt?: string;
  fit?: "contain" | "cover";
  /** Hero slot only: preloads the image and marks it fetchpriority=high so
      it is the LCP candidate instead of a lazy request discovered late. */
  priority?: boolean;
  /** Width the frame is actually shown at, so the browser downloads a copy that is sharp, not one sized for 60vw. */
  sizes?: string;
}) {
  if (src) {
    const frame = (
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: ratio,
          background: fit === "contain" ? "#ffffff" : "#0A1322",
          boxShadow: "0 24px 60px -32px rgba(0,24,72,0.55)",
        }}
      >
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          quality={72}
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={
            fit === "contain"
              ? { padding: "clamp(4px,1vw,14px)", objectPosition: "center" }
              : { objectPosition: "center" }
          }
        />
      </div>
    );
    // The hero is the LCP element. Reveal keeps it at opacity 0 until the
    // client bundle hydrates and the IntersectionObserver fires, which on a
    // throttled phone pushed LCP to ~10s even with the image preloaded. So the
    // priority slot paints immediately; the fade-in stays for the in-body slots.
    if (priority) return <div className={className}>{frame}</div>;
    return (
      <Reveal variant="blur" className={className}>
        {frame}
      </Reveal>
    );
  }

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
