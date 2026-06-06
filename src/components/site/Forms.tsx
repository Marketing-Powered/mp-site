"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "@/components/Reveal";
import { serif, mono } from "./theme";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
};

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#0090F0]/60 focus:bg-white/[0.05]";

export function LeadForm({
  title,
  intro,
  fields,
  submitLabel = "Submit Request",
}: {
  title: string;
  intro?: string;
  fields: Field[];
  submitLabel?: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // No backend wired yet — route to the confirmation page.
    setTimeout(() => router.push("/get-started/thanks/"), 350);
  }

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
          Request Form
        </p>
        <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-tight" style={{ fontFamily: serif }}>
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-xl leading-relaxed text-white/55">{intro}</p>}

        <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
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

/* Calendar / booking placeholder block for the book-a-call page */
export function BookingBlock() {
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
        <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 px-8 py-16 text-center">
          <span className="text-2xl text-[#0090F0]/70">✦</span>
          <p className="text-[1.05rem] text-white/70" style={{ fontFamily: serif }}>
            Calendar embed goes here
          </p>
          <p className="max-w-md text-[13px] leading-relaxed text-white/40">
            Drop in your Calendly / SavvyCal / HubSpot meetings embed to let prospects book a
            discovery call directly. Until then, requests route through the form.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
