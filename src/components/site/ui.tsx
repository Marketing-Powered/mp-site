import Link from "next/link";
import { Fragment } from "react";
import { serif, mono } from "./theme";
import { resolveLink } from "@/lib/links";
import { siteContent as s } from "@/lib/content";
import { ModalCta } from "./LeadModal";

/* Keyboard focus ring. The site otherwise leans on the UA default, which is a
   blue halo — all but invisible on the brand's blue fills in some browsers. */
export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* Gradient hairline rule used throughout the design system */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-px w-full origin-left ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent, #0090F0 18%, #7FCBFF 50%, #0090F0 82%, transparent)",
      }}
    />
  );
}

/* Mono eyebrow / kicker label */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
      style={{ fontFamily: mono }}
    >
      <span className="inline-block h-px w-8 bg-[#0090F0]" />
      {children}
    </p>
  );
}

/* Primary gradient pill button */
export function PrimaryCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const raw = href || "/get-started/request-an-audit";
  const isExternal = raw.startsWith("mailto:") || raw.startsWith("tel:") || /^https?:\/\//.test(raw);
  // internal paths serve without a trailing slash; strip it to avoid a 308 hop
  const target = isExternal ? raw : raw.replace(/\/+$/, "") || "/";
  const buttonClass = `group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  // ModalCta pops the lead form for lead-gen destinations (audit, call,
  // contact, qualification) and renders a normal link everywhere else.
  return (
    <ModalCta href={target} className={buttonClass}>
      {inner}
    </ModalCta>
  );
}

/* Outline pill button */
export function GhostCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const raw = href || "/get-started/request-an-audit";
  const isExternal = raw.startsWith("mailto:") || raw.startsWith("tel:") || /^https?:\/\//.test(raw);
  // internal paths serve without a trailing slash; strip it to avoid a 308 hop
  const target = isExternal ? raw : raw.replace(/\/+$/, "") || "/";
  const buttonClass = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
    </>
  );

  return (
    <ModalCta href={target} className={buttonClass}>
      {inner}
    </ModalCta>
  );
}

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

   Dials s.brand.phoneE164 and shows s.brand.phone, so the number a visitor
   reads and the number they reach can't drift apart. A phone call is the one
   conversion path that doesn't depend on form delivery, so this is worth
   carrying everywhere the audit CTA goes.

   `solid` is filled in the same gradient as the form-fill buttons: calling and
   submitting the audit form are both primary conversion paths, and an outlined
   pill next to a filled one reads as the lesser option. `bare` is an unboxed
   icon+number for places where a second pill would flatten the hierarchy (the
   nav bar, the footer contact block). */
export function CallCta({
  variant = "solid",
  showNumber = true,
  className = "",
}: {
  variant?: "solid" | "bare";
  showNumber?: boolean;
  className?: string;
}) {
  const base = `inline-flex items-center rounded-full text-[12px] uppercase tracking-[0.18em] transition ${FOCUS_RING}`;
  const skin =
    variant === "bare"
      ? "gap-2 text-white/70 hover:text-[#7FCBFF]"
      : "gap-2.5 bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 font-semibold text-black shadow-[0_10px_40px_-14px_rgba(0,144,240,0.6)] hover:brightness-110 active:translate-y-px active:brightness-95";

  // Voice control activates a control by its visible text, so when the label
  // reads "Call Us" the accessible name has to start with those same words.
  const label = showNumber
    ? `Call Marketing Powered at ${s.brand.phone}`
    : `Call Us: Marketing Powered at ${s.brand.phone}`;

  return (
    <a
      href={`tel:${s.brand.phoneE164}`}
      className={`${base} ${skin} ${className}`}
      aria-label={label}
      data-cta="call"
    >
      <PhoneIcon className="shrink-0" />
      <span className="whitespace-nowrap">{showNumber ? s.brand.phone : "Call Us"}</span>
    </a>
  );
}

/* Renders body text with inline [label](href) markdown links.
   Internal links (/…) use next/link; external links open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    const label = m[1];
    // content briefs occasionally carry zero-width characters or absolute
    // site URLs; normalize both so these resolve as internal links instead
    // of rendering as raw (often broken) anchors
    const href =
      m[2]
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/^https?:\/\/(www\.)?marketingpowered\.ai(?=\/|$)/, "")
        .trim() || "/";
    if (href.startsWith("/")) {
      const resolved = resolveLink(href);
      if (resolved) {
        parts.push(
          <Link
            key={key++}
            href={resolved}
            prefetch={false}
            className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
          >
            {label}
          </Link>,
        );
      } else {
        // no valid destination — render the anchor text as plain copy
        parts.push(<Fragment key={key++}>{label}</Fragment>);
      }
    } else {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
        >
          {label}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}

/* Section heading in the editorial serif */
export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.08] ${className}`}
      style={{ fontFamily: serif, fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}
