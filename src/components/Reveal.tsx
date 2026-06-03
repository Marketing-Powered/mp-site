"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-reveal wrapper built on IntersectionObserver.
 * No animation library required — pairs with the `[data-reveal]` rules
 * in globals.css. Children fade/slide (optionally blur) into view once.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
  threshold = 0.18,
  once = true,
  style,
}: {
  children: React.ReactNode;
  variant?: "up" | "blur";
  delay?: number;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant === "blur" ? "blur" : ""}
      className={className}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
