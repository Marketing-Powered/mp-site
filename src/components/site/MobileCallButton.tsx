"use client";

import { useEffect, useState } from "react";
import { siteContent as s } from "@/lib/content";
import { FOCUS_RING, PhoneIcon } from "./ui";

/* Icon-only tap-to-call button for phones.

   The nav's number only renders from md up, so on a phone there was nothing to
   call from anywhere near the top of the page. `MobileCallButton` sits in the
   header beside the menu toggle; `FloatingCallButton` re-pins the same button
   to the top-right corner once the header has scrolled away, so the number
   follows the visitor down the page instead of disappearing after the fold. */

const SHOW_AFTER_PX = 120;

export function MobileCallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${s.brand.phoneE164}`}
      aria-label={`Call Marketing Powered at ${s.brand.phone}`}
      data-cta="call"
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0090F0] text-black shadow-[0_8px_26px_-10px_rgba(0,144,240,0.95)] transition hover:brightness-110 active:translate-y-px active:brightness-95 ${FOCUS_RING} ${className}`}
    >
      <PhoneIcon className="h-[17px] w-[17px]" />
    </a>
  );
}

export function FloatingCallButton({ suppressed = false }: { suppressed?: boolean }) {
  const [pastHeader, setPastHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHeader(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // `suppressed` is the open mobile drawer: the drawer hangs off the header, so
  // a pinned button would sit on top of its links.
  const visible = pastHeader && !suppressed;

  return (
    /* `invisible` rather than opacity alone: a transparent link is still in the
       tab order, and focus would land on nothing a sighted keyboard user can
       see. visibility still animates. */
    <div
      className={`fixed right-4 z-50 transition-all duration-300 md:hidden ${
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none -translate-y-3 opacity-0"
      }`}
      style={{ top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
    >
      {/* Soft scrim so running text fades out beneath the button rather than
          colliding with its edge — at phone widths the content column reaches
          almost to the button. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(5,11,22,0.94) 42%, rgba(5,11,22,0) 74%)",
        }}
      />
      <MobileCallButton className="h-11 w-11 ring-1 ring-white/30" />
    </div>
  );
}
