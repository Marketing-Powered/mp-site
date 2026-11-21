import Image from "next/image";
import { BRAND_BLUE, ICON_SHAPES, ICON_VIEWBOX, LOGO_SHAPES, LOGO_VIEWBOX, type Shape } from "./brandMarks";

/* ================================================================== */
/* Shared Marketing Powered brand kit.                                */
/* Palette sampled from the official brand graphics:                  */
/* bright blue · cyan · green · deep navy.                            */
/* ================================================================== */

export const brand = {
  blue: "#0090F0",
  blueDeep: "#0066CC",
  cyan: "#00A8D8",
  green: "#00A860",
  navy: "#001848",
  ink: "#0A1322",
};

/* canonical blue→cyan→green sweep used for accents */
export const brandGradient =
  "linear-gradient(110deg, #0090F0 0%, #00A8D8 48%, #00A860 100%)";

/* ---- Official logo lockup (icon + "marketing powered" wordmark) ---- */
function Shapes({ shapes, tone }: { shapes: Shape[]; tone: "light" | "dark" }) {
  const base = tone === "light" ? "#FFFFFF" : "#000000";
  return (
    <>
      {shapes.map((s, i) =>
        s.tag === "path" ? (
          <path key={i} d={s.d} fill={s.blue ? BRAND_BLUE : base} />
        ) : (
          <polygon key={i} points={s.points} fill={s.blue ? BRAND_BLUE : base} />
        ),
      )}
    </>
  );
}

/** The real Marketing Powered logo. `tone="light"` is the reverse lockup for
    dark backgrounds (white + brand blue); `tone="dark"` is the primary
    black + blue lockup for light backgrounds. Height is set by className. */
export function Logo({
  tone = "light",
  className = "h-9 w-auto",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label="Marketing Powered"
    >
      <Shapes shapes={LOGO_SHAPES} tone={tone} />
    </svg>
  );
}

/** The icon mark on its own (two interlocking bolts). */
export function Bolt({
  className = "h-6 w-6",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <svg viewBox={ICON_VIEWBOX} className={className} aria-hidden>
      <Shapes shapes={ICON_SHAPES} tone={tone} />
    </svg>
  );
}

/* ---- Figure: renders the white-background brand graphics without  */
/* cropping. The art sits on a clean white "artboard" so nothing      */
/* is cut off and it reads as intentional on light OR dark.           */
export function Figure({
  src,
  alt,
  ratio = "16 / 9",
  className = "",
  rounded = "1.5rem",
  caption,
  priority = false,
  fetchPriority,
  quality = 70,
  shadow = true,
  fit = "contain",
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 48vw",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  caption?: React.ReactNode;
  priority?: boolean;
  /** Browser fetch priority for the <img>. Set "high" on the one above-the-fold
      image that is the page's LCP candidate; `priority` alone only adds the
      preload link. */
  fetchPriority?: "high" | "low" | "auto";
  quality?: number;
  shadow?: boolean;
  fit?: "contain" | "cover";
  /** Rendered width, for srcset selection. The default suits a figure that is
      near full-bleed on phones and half the container on desktop; pass the
      exact width where a smaller variant would do (the homepage hero). */
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{
          aspectRatio: ratio,
          borderRadius: rounded,
          background: fit === "contain" ? "#ffffff" : "#0A1322",
          boxShadow: shadow ? "0 24px 60px -28px rgba(0,24,72,0.45)" : "none",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload={priority}
          fetchPriority={fetchPriority}
          quality={quality}
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={
            fit === "contain"
              ? { padding: "clamp(4px,0.9vw,12px)", objectPosition: "center" }
              : { objectPosition: "center" }
          }
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[11px] uppercase tracking-[0.16em] opacity-60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
