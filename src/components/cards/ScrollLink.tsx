"use client";

import { PILL_PRIMARY } from "./ui";

/* In-page jump styled like PrimaryCta. A plain href="#plans" anchor leaves
   the fragment in the URL, and Safari then restores that position on every
   reload (the compact iOS address bar hides the fragment, so it looks like
   the page scrolls on its own). This scrolls to the target and keeps the
   URL clean; with JavaScript off the href still works as a normal anchor. */
export default function ScrollLink({
  targetId,
  children,
  className = "",
}: {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={`${PILL_PRIMARY} ${className}`}
      onClick={(e) => {
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.location.hash) history.replaceState(null, "", window.location.pathname);
      }}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </a>
  );
}
