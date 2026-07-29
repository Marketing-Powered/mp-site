"use client";

import { trackCtaClick, ctaLabelFromElement } from "@/lib/metaEvents";

/* Plain anchor that reports its click to the Meta Pixel — used for the
   tel:/mailto: contact links that live in server components and so can't
   attach an onClick themselves. Renders a normal <a>; tracking never
   blocks the OS handoff to the dialer / mail client. */
export default function TrackedLink({
  href,
  location,
  className,
  style,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={(e) =>
        trackCtaClick({
          href,
          label: ctaLabelFromElement(e.currentTarget),
          location,
        })
      }
    >
      {children}
    </a>
  );
}
