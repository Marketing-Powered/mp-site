import Link from "next/link";
import { Fragment } from "react";
import { serif, mono } from "./theme";
import { resolveLink } from "@/lib/links";
import { ModalCta } from "./LeadModal";

/* The focus ring and the tap-to-call pieces live in ./call, a module with no
   dependency on the link map below, so the client components that need only
   those (nav, sticky bars) don't ship it. Re-exported for existing imports. */
export { FOCUS_RING, PhoneIcon, CallCta } from "./call";

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

/* Renders body text with inline [label](href) markdown links.
   Internal links (/…) use next/link; external links open in a new tab. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  // the label may itself be a bracketed citation marker: [[1]](https://…)
  const re = /\[(\[[^\]]+\]|[^\]]+)\]\(([^)]+)\)/g;
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
