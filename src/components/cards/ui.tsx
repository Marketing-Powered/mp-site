import { FOCUS_RING } from "@/components/site/ui";

/* Shared pieces for the Powered Cards pages: pill button classes that match
   PrimaryCta / GhostCta / CallCta from the site kit (for buttons and links
   those components cannot render), and the section scaffolding every band
   on /cards uses. */

export const PILL_PRIMARY = `group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] transition hover:brightness-110 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 ${FOCUS_RING}`;

export const PILL_SOLID = `inline-flex items-center justify-center gap-2 rounded-full bg-[#0090F0] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-14px_rgba(0,144,240,0.6)] transition hover:brightness-110 active:translate-y-px ${FOCUS_RING}`;

export const PILL_OUTLINE = `inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white/40 hover:text-white ${FOCUS_RING}`;

/* Full-width band. `tone="band"` is the alternating tinted stripe. */
export function CardsSection({
  id,
  tone = "plain",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: "plain" | "band";
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative z-10 scroll-mt-24 ${
        tone === "band" ? "border-y border-white/8 bg-secondary/70" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-12">{children}</div>
    </section>
  );
}

/* Kicker + serif heading + lead for the top of a band. */
export function SectionIntro({
  id,
  kicker,
  title,
  body,
  className = "max-w-2xl",
}: {
  id?: string;
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {kicker && (
        <p className="mb-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#0090F0]">
          <span className="inline-block h-px w-8 bg-[#0090F0]" />
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className="font-serif text-[clamp(1.7rem,3vw,2.6rem)] font-normal leading-[1.08] tracking-tight text-balance"
      >
        {title}
      </h2>
      {body && <p className="leading-relaxed text-muted-foreground text-pretty">{body}</p>}
    </div>
  );
}
