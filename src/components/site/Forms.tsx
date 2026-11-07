"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { serif, mono } from "./theme";
import { handleInput, handleInvalid } from "./formValidation";
import {
  DEFAULT_FORM_ERROR,
  DEFAULT_FORM_HELPER,
  type LeadField as Field,
} from "@/lib/leadForms";

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-white/90 sm:text-[15px] outline-none transition-colors placeholder:text-white/25 focus:border-[#0090F0]/60 focus:bg-white/[0.05]";

export function LeadForm({
  title,
  intro,
  fields,
  submitLabel = "Submit Request",
  source = "Website form",
  formId = "lead-form",
  helper = DEFAULT_FORM_HELPER,
  pendingLabel = "Sending…",
  errorMessage = DEFAULT_FORM_ERROR,
}: {
  title: string;
  intro?: string;
  fields: Field[];
  submitLabel?: string;
  /** Identifies which form the lead came from, included in the email. */
  source?: string;
  formId?: string;
  /** Small print under the submit button. */
  helper?: string;
  /** Button label while the request is in flight. */
  pendingLabel?: string;
  /** Shown when the server did not accept the request. */
  errorMessage?: string;
  /* Accepted so a LeadFormConfig can be spread straight in; the full-page
     form confirms on /get-started/thanks rather than inline. */
  successTitle?: string;
  successBody?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFailed(false);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Lead request rejected: ${res.status}`);
      // Confirmation page only once the server has accepted the request.
      router.push("/get-started/thanks");
    } catch {
      // Keep the form (and its values) on screen and say the request did not
      // go through, rather than confirming a submission the server never took.
      setFailed(true);
      setSubmitting(false);
    }
  }

  return (
    <section id={formId} className="relative z-10 mx-auto max-w-3xl scroll-mt-24 px-6 py-12 lg:px-12">
      <Reveal
        variant="blur"
        className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-8 md:p-12"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.10), transparent 55%), rgba(255,255,255,0.02)",
        }}
      >
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
          style={{ fontFamily: mono }}
        >
          Request Form
        </p>
        <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight" style={{ fontFamily: serif }}>
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-xl leading-relaxed text-white/55">{intro}</p>}

        <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
          <input type="hidden" name="source" value={source} />
          {fields.map((f) => {
            const id = `${formId}-${f.name}`;
            return (
            <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label
                htmlFor={id}
                className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45"
                style={{ fontFamily: mono }}
              >
                {f.label}
                {f.required && <span className="text-[#0090F0]"> *</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  id={id}
                  name={f.name}
                  required={f.required}
                  rows={4}
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              ) : f.type === "select" ? (
                <select
                  id={id}
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
                  id={id}
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
            );
          })}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] disabled:opacity-60"
            >
              <span className="relative z-10">{submitting ? pendingLabel : submitLabel}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            {failed && (
              <p role="alert" className="mt-4 text-[13px] leading-relaxed text-[#FFB4A8]">
                {errorMessage}
              </p>
            )}
            <p className="mt-4 text-[12px] text-white/35">{helper}</p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

/* Booking embed for the book-a-call page.
   Reads NEXT_PUBLIC_BOOKING_URL (Calendly / SavvyCal / HubSpot scheduling
   link). When set we embed the scheduler inline; when unset we render
   nothing and the page falls back cleanly to the lead form below. */
export function BookingBlock() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  // No scheduler configured: render nothing. The page lays the call-request
  // form out directly under the hero, so a placeholder card here would only
  // push it down.
  if (!url) return null;

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
      <Reveal
        variant="blur"
        className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
      >
        <div className="border-b border-white/8 px-8 py-5">
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            Schedule
          </p>
        </div>
        <iframe
          src={url}
          title="Book a discovery call"
          loading="lazy"
          className="block h-[680px] w-full border-0 bg-white"
        />
      </Reveal>
    </section>
  );
}
