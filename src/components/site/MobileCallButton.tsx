"use client";

import Link from "next/link";
import { Bolt, brand } from "@/components/brand";
import { BRAND } from "@/lib/brand";
import { FOCUS_RING, PhoneIcon } from "./call";

/* Tap-to-call for phones.

   The nav's number only renders from md up, so below that there was nothing to
   call from anywhere near the top of the page. `MobileCallButton` is the glyph
   itself, which sits in the header beside the menu toggle. `StickyCallBar` is
   a condensed copy of the header that slides in once the real one has scrolled
   away, so the number follows the visitor down the page.

   The bar is deliberately a full-width opaque strip rather than a floating
   button. A 44px circle pinned over the content column steals taps from
   whatever sits beneath it — measured against FAQ toggles, card links and
   headings on most routes — whereas a solid bar is unambiguous chrome that
   content scrolls under. */

export function MobileCallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${BRAND.phoneE164}`}
      aria-label={`Call Marketing Powered at ${BRAND.phone}`}
      data-cta="call"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0090F0] text-black shadow-[0_8px_26px_-10px_rgba(0,144,240,0.95)] transition hover:brightness-110 active:translate-y-px active:brightness-95 ${FOCUS_RING} ${className}`}
    >
      <PhoneIcon className="h-[18px] w-[18px]" />
    </a>
  );
}

/* Scroll position is tracked by the owning Nav, which also needs it to decide
   where the menu drawer opens; this component only renders the bar. */
export function StickyCallBar({
  visible,
  menuButton,
  children,
}: {
  visible: boolean;
  /** The menu toggle, so the hamburger stays reachable once scrolled. */
  menuButton?: React.ReactNode;
  /** Content rendered below the bar (the menu drawer when opened from here). */
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 border-b border-white/10 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        background: "rgba(5,11,22,0.94)",
        paddingTop: "env(safe-area-inset-top, 0px)",
      }}
      /* While it's off-screen nothing inside should be tabbable or announced. */
      inert={!visible}
    >
      <div className="flex items-center justify-between px-5 py-2">
        <Link
          href="/"
          prefetch={false}
          aria-label="Marketing Powered home"
          className={`inline-flex items-center gap-2 rounded-full ${FOCUS_RING}`}
        >
          <Bolt className="h-5 w-5" />
          <span className="text-[13px] font-bold leading-none tracking-tight text-white">
            marketing <span style={{ color: brand.blue }}>powered</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <MobileCallButton />
          {menuButton}
        </div>
      </div>
      {children}
    </div>
  );
}
