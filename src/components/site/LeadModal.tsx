"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { serif, mono } from "./theme";
import { handleInput, handleInvalid } from "./formValidation";
import {
  DEFAULT_FORM_ERROR,
  DEFAULT_FORM_HELPER,
  LEAD_FORMS,
  leadFormKeyForHref,
  type LeadFormKey,
} from "@/lib/leadForms";

/* Popup lead form. CTA buttons across the site open this modal instead of
   navigating away; the form posts to /api/contact, which delivers the lead
   to GoHighLevel (contact + opportunity) and email. The underlying href is
   kept on every trigger so middle-click, new-tab, and no-JS visitors still
   reach the full-page form. */

type LeadModalContextValue = {
  open: (key: LeadFormKey, href?: string) => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#0090F0]/60 focus:bg-white/[0.05]";

type Status = "idle" | "sending" | "sent" | "error";

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<{ key: LeadFormKey; href?: string } | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((key: LeadFormKey, href?: string) => {
    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setStatus("idle");
    setActive({ key, href });
  }, []);

  const close = useCallback(() => {
    setActive(null);
    restoreFocusRef.current?.focus?.();
  }, []);

  // Escape closes; body scroll locks while open; first field gets focus.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("input, select, textarea")
        ?.focus();
    }, 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [active, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Lead request rejected: ${res.status}`);
      // Confirmed only once the server has accepted the request.
      setStatus("sent");
    } catch {
      // The server did not accept the request (or it never arrived). Keep the
      // form and its values on screen and say so, instead of reporting a
      // request as received that may never have been delivered.
      setStatus("error");
    }
  }

  const form = active ? LEAD_FORMS[active.key] : null;

  return (
    <LeadModalContext.Provider value={{ open }}>
      {children}
      {active && form && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-8 sm:py-14"
          role="dialog"
          aria-modal="true"
          aria-label={form.title}
        >
          {/* backdrop */}
          <button
            aria-label="Close form"
            onClick={close}
            className="fixed inset-0 cursor-default bg-[#02060D]/80 backdrop-blur-sm"
          />
          <div
            ref={dialogRef}
            className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 text-[#EDEAE3]"
            style={{
              background:
                "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.12), transparent 55%), #070E1C",
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              ✕
            </button>

            {status === "sent" ? (
              <div className="px-8 py-16 text-center md:px-12" role="status">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-xl text-black">
                  ✓
                </span>
                <h2
                  className="mt-6 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight"
                  style={{ fontFamily: serif }}
                >
                  {form.successTitle ?? "Request received"}
                </h2>
                <p className="mx-auto mt-4 max-w-sm leading-relaxed text-white/55">
                  {form.successBody ??
                    "Thank you — our team will get back to you within one business day."}
                </p>
                <button
                  onClick={close}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-7 md:p-10">
                <p
                  className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
                  style={{ fontFamily: mono }}
                >
                  Request Form
                </p>
                <h2
                  className="pr-10 text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight"
                  style={{ fontFamily: serif }}
                >
                  {form.title}
                </h2>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">{form.intro}</p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
                  <input type="hidden" name="source" value={form.source} />
                  {/* page the visitor converted on — passed through to GHL */}
                  <input
                    type="hidden"
                    name="page"
                    value={typeof window !== "undefined" ? window.location.pathname : ""}
                  />
                  {form.fields.map((f) => (
                    <div
                      key={f.name}
                      className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}
                    >
                      <label
                        className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45"
                        style={{ fontFamily: mono }}
                      >
                        {f.label}
                        {f.required && <span className="text-[#0090F0]"> *</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          name={f.name}
                          required={f.required}
                          rows={3}
                          className={inputCls}
                          onInvalid={handleInvalid}
                          onInput={handleInput}
                        />
                      ) : f.type === "select" ? (
                        <select
                          name={f.name}
                          required={f.required}
                          defaultValue=""
                          className={inputCls}
                          onInvalid={handleInvalid}
                          onInput={handleInput}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {f.options?.map((o) => (
                            <option key={o} value={o} className="bg-[#070E1C]">
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={f.name}
                          type={f.type || "text"}
                          required={f.required}
                          autoComplete={f.autocomplete}
                          className={inputCls}
                          onInvalid={handleInvalid}
                          onInput={handleInput}
                        />
                      )}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] disabled:opacity-60 sm:w-auto"
                    >
                      <span className="relative z-10">
                        {status === "sending" ? (form.pendingLabel ?? "Sending…") : form.submitLabel}
                      </span>
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                    {status === "error" && (
                      <p role="alert" className="mt-4 text-[13px] leading-relaxed text-[#FFB4A8]">
                        {form.errorMessage ?? DEFAULT_FORM_ERROR}
                      </p>
                    )}
                    <p className="mt-4 text-[12px] text-white/35">
                      {form.helper ?? DEFAULT_FORM_HELPER}
                      {active.href && (
                        <>
                          {" "}
                          <Link
                            href={active.href}
                            prefetch={false}
                            onClick={close}
                            className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 hover:decoration-[#7FCBFF]"
                          >
                            Prefer the full page?
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

/* CTA link that pops the lead form for lead-gen destinations and behaves as
   a normal link everywhere else. Renders a real anchor either way, so SEO,
   middle-click, cmd-click, and no-JS all keep the full-page fallback. */
export function ModalCta({
  href,
  className = "",
  children,
  onClick,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ctx = useContext(LeadModalContext);
  const formKey = leadFormKeyForHref(href);
  const isExternal =
    href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    // Only intercept plain left-clicks; modified clicks keep native behavior.
    if (
      formKey &&
      ctx &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      ctx.open(formKey, href);
    }
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      onClick={handleClick}
      aria-haspopup={formKey ? "dialog" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
