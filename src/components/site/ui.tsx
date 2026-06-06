import Link from "next/link";
import { Fragment } from "react";
import { serif, mono } from "./theme";

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
  return (
    <Link
      href={href || "/get-started/"}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
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
  return (
    <Link
      href={href || "/get-started/"}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-black ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
    </Link>
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
    const href = m[2];
    if (href.startsWith("/")) {
      parts.push(
        <Link
          key={key++}
          href={href}
          className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
        >
          {label}
        </Link>,
      );
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
