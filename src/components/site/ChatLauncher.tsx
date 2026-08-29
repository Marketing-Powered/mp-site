"use client";

import { useEffect, useState } from "react";
import { useLeadModal } from "./LeadModal";

/* Floating chat-style launcher, bottom-right where the GoHighLevel
   LeadConnector chat bubble used to sit. That widget was SMS-based and
   dead-ended without approved A2P 10DLC registration, so it's replaced with
   this native launcher: clicking opens the "chat" lead form, which posts to
   /api/contact like every other form (email + GHL contact/opportunity).
   Appears after a short delay so it never competes with first paint. */

const SHOW_DELAY_MS = 4000;

export default function ChatLauncher() {
  const modal = useLeadModal();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!modal) return null;

  return (
    <button
      type="button"
      onClick={() => modal.open("chat")}
      aria-label="Message our team"
      aria-haspopup="dialog"
      className={`fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] py-3.5 pl-4 pr-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-black shadow-[0_10px_40px_-10px_rgba(0,144,240,0.7)] transition-all duration-500 hover:scale-105 sm:pr-5 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <span className="hidden sm:inline">Chat with us</span>
    </button>
  );
}
