import { BRAND } from "@/lib/brand";

/* Focus ring and tap-to-call controls.

   Split out of ./ui so they carry no dependency on the site's link map: these
   are the pieces the client-side chrome (nav, sticky bars, mobile call button)
   imports, and everything a client component imports ships to the browser. */

/* Keyboard focus ring. The site otherwise leans on the UA default, which is a
   blue halo — all but invisible on the brand's blue fills in some browsers. */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* Phone handset glyph, sized to sit on the text baseline of a pill button. */
export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

/* Tap-to-call CTA for the Google Business Profile number.

   Dials BRAND.phoneE164 and shows BRAND.phone, so the number a visitor
   reads and the number they reach can't drift apart. A phone call is the one
   conversion path that doesn't depend on form delivery, so this is worth
   carrying everywhere the audit CTA goes.

   `solid` is filled in flat brand blue — the dark end of the same gradient the
   form-fill buttons use — at the same size as PrimaryCta. Calling and
   submitting the audit form are both primary conversion paths, so an outlined
   pill beside a filled one read as the lesser option; two identical gradient
   pills, on the other hand, left the row with no primary at all. Flat blue
   gives the phone equal weight while keeping the pair legible: gradient means
   form, flat blue means phone. `bare` is an unboxed icon+number for places
   where a second pill would flatten the hierarchy (the nav bar, the footer
   contact block). */
export function CallCta({
  variant = "solid",
  showNumber = true,
  compact = false,
  className = "",
}: {
  variant?: "solid" | "bare";
  showNumber?: boolean;
  /** Tighter padding and tracking, for the sticky bar where two pills share a
      320px row and the neighbouring label would otherwise wrap. */
  compact?: boolean;
  className?: string;
}) {
  const base = `inline-flex items-center rounded-full text-[12px] uppercase transition ${
    compact ? "tracking-[0.1em]" : "tracking-[0.18em]"
  } ${FOCUS_RING}`;
  const skin =
    variant === "bare"
      ? "gap-2 text-white/70 hover:text-[#7FCBFF]"
      : `gap-2.5 bg-[#0090F0] ${
          compact ? "px-4 py-3.5" : "px-8 py-4"
        } font-semibold text-black shadow-[0_10px_40px_-14px_rgba(0,144,240,0.6)] hover:brightness-110 active:translate-y-px active:brightness-95`;

  // Voice control activates a control by its visible text, so when the label
  // reads "Call Us" the accessible name has to start with those same words.
  const label = showNumber
    ? `Call Marketing Powered at ${BRAND.phone}`
    : `Call Us: Marketing Powered at ${BRAND.phone}`;

  return (
    <a
      href={`tel:${BRAND.phoneE164}`}
      className={`${base} ${skin} ${className}`}
      aria-label={label}
      data-cta="call"
    >
      <PhoneIcon className="shrink-0" />
      <span className="whitespace-nowrap">{showNumber ? BRAND.phone : "Call Us"}</span>
    </a>
  );
}
