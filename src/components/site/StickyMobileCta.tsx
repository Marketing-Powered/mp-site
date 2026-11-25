"use client";

import { useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { ModalCta } from "./LeadModal";
import { CallCta } from "./call";

/* Fixed bottom bar shown only on mobile (hidden on md+). Appears once
   the visitor scrolls past the hero, hides while scrolling down, and
   slides back in on scroll-up — the standard mobile-CTA pattern.

   `href` / `label` let a page carry its own primary action in the bar (the
   homepage uses the strategy-call request); every other page keeps the
   default audit CTA. */
export default function StickyMobileCta({
  href = "/get-started/request-an-audit",
  label = "Free Audit",
}: {
  href?: string;
  label?: string;
} = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const pastHero = y > 520;
      const scrollingUp = y < lastY - 4;
      const scrollingDown = y > lastY + 4;
      if (pastHero && scrollingUp) setVisible(true);
      else if (scrollingDown || !pastHero) setVisible(false);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-[140%]"
      }`}
      style={{
        background:
          "linear-gradient(to top, rgba(5,11,22,0.96) 55%, rgba(5,11,22,0))",
      }}
      /* While the bar is translated off screen it is still in the layout, so
         without this its CTA, call button and email link stay tabbable. */
      inert={!visible}
    >
      {/* Calling is the strongest intent signal on a phone, so it gets equal
          billing here rather than being buried under the form CTA. */}
      <div className="flex items-stretch gap-2.5">
        <CallCta showNumber={false} compact className="flex-1 justify-center" />
        <ModalCta
          href={href}
          className="flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-black shadow-[0_12px_40px_-10px_rgba(0,144,240,0.7)]"
        >
          {label}
          <span>→</span>
        </ModalCta>
      </div>
      <p className="mt-2 text-center text-[12px] text-white/45">
        or{" "}
        <a
          href={`mailto:${BRAND.email}`}
          className="text-[#7FCBFF] underline underline-offset-2"
        >
          email us
        </a>
      </p>
    </div>
  );
}
