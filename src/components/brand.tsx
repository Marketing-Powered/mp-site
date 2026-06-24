import Image from "next/image";

/* ================================================================== */
/*  Shared Marketing Powered brand kit.                               */
/*  Palette sampled from the official brand graphics:                  */
/*  bright blue · cyan · green · deep navy.                            */
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

/* ---- Lightning-bolt + wordmark lockup -------------------------- */
export function Logo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const word = tone === "light" ? "#FFFFFF" : "#0A1322";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Bolt className="h-6 w-6" />
      <span
        className="text-[1.05rem] font-bold leading-none tracking-tight"
        style={{ color: word }}
      >
marketing <span style={{ color: brand.blue }}>powered</span>
      </span>
    </span>
  );
}

export function Bolt({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="mp-bolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0090F0" />
          <stop offset="55%" stopColor="#00A8D8" />
          <stop offset="100%" stopColor="#00A860" />
        </linearGradient>
      </defs>
      <path
        d="M18.5 2 6 18h7.2L12 30 26 12h-8.1L18.5 2Z"
        fill="url(#mp-bolt)"
      />
    </svg>
  );
}

/* ---- Figure: renders the white-background brand graphics without   */
/*      cropping. The art sits on a clean white "artboard" so nothing */
/*      is cut off and it reads as intentional on light OR dark.      */
export function Figure({
  src,
  alt,
  ratio = "16 / 9",
  className = "",
  rounded = "1.5rem",
  caption,
  priority = false,
  quality = 70,
  shadow = true,
  fit = "contain",
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  caption?: React.ReactNode;
  priority?: boolean;
  quality?: number;
  shadow?: boolean;
  fit?: "contain" | "cover";
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
          quality={quality}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 48vw"
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
