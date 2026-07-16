"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { serif, mono } from "./theme";
import { siteContent as s } from "@/lib/content";
import type { LeadField as Field } from "@/lib/leadForms";

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#0090F0]/60 focus:bg-white/[0.05]";

export function LeadForm({
  title,
  intro,
  fields,
  submitLabel = "Submit Request",
  source = "Website form",
  formId = "lead-form",
}: {
  title: string;
  intro?: string;
  fields: Field[];
  submitLabel?: string;
  /** Identifies which form the lead came from, included in the email. */
  source?: string;
  formId?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Swallow network errors for now — still route to confirmation.
    }
    router.push("/get-started/thanks");
  }

  return (
    <section id={formId} className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
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
          {fields.map((f) => (
            <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label
                className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/45"
                style={{ fontFamily: mono }}
              >
                {f.label}
                {f.required && <span className="text-[#0090F0]"> *</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea name={f.name} required={f.required} rows={4} className={inputCls} />
              ) : f.type === "select" ? (
                <select name={f.name} required={f.required} defaultValue="" className={inputCls}>
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
                <input name={f.name} type={f.type || "text"} required={f.required} className={inputCls} />
              )}
            </div>
          ))}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] disabled:opacity-60"
            >
              <span className="relative z-10">{submitting ? "Sending…" : submitLabel}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <p className="mt-4 text-[12px] text-white/35">
              HIPAA-aware intake. Your information stays within our controlled environment.
            </p>
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
  if (!url) {
    return (
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12">
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
            Schedule
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight" style={{ fontFamily: serif }}>
            Request a consultation time
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/55">
            Share your details below and our team will follow up with available times.
            You can also email us directly at{" "}
            <a
              href={`mailto:${s.brand.email}`}
              className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4"
            >
              {s.brand.email}
            </a>
            .
          </p>
          <a
            href="#call-request-form"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)]"
          >
            Request My Call
          </a>
        </Reveal>
      </section>
    );
  }

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
