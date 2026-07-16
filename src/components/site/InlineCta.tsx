import Reveal from "@/components/Reveal";
import { serif, mono } from "./theme";
import { ModalCta } from "./LeadModal";

/* Compact, lighter-weight CTA that sits between content sections.
   Slim banner: left-aligned copy, right-aligned button. Uses the
   gradient accent at lower opacity than the full CtaBand so it nudges
   without breaking the reading flow. */

type Variant = "primary" | "secondary" | "email";

const LABELS: Record<Variant, string> = {
  primary: "Free Audit",
  secondary: "Strategy",
  email: "Email Us",
};

export default function InlineCta({
  headline,
  body,
  ctaText,
  ctaLink,
  variant = "primary",
}: {
  headline: string;
  body?: string;
  ctaText: string;
  ctaLink: string;
  variant?: Variant;
}) {
  const buttonCls =
    variant === "secondary"
      ? "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/20 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-black"
      : "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-14px_rgba(0,144,240,0.6)]";

  const inner = (
    <>
      <span className="relative z-10">{ctaText}</span>
      {variant === "secondary" && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] transition-transform duration-300 group-hover:translate-y-0" />
      )}
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        {variant === "email" ? "✉" : "→"}
      </span>
    </>
  );

  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-8 lg:px-12">
      <Reveal
        variant="blur"
        className="relative overflow-hidden rounded-[24px] border border-white/10 px-7 py-7 md:px-9"
        style={{
          background:
            "radial-gradient(120% 140% at 0% 0%, rgba(0,144,240,0.12), transparent 60%), radial-gradient(120% 140% at 100% 100%, rgba(8,174,103,0.08), transparent 60%), rgba(255,255,255,0.015)",
        }}
      >
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="md:max-w-md">
            <p
              className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#0090F0]"
              style={{ fontFamily: mono }}
            >
              {LABELS[variant]}
            </p>
            <p
              className="text-[1.15rem] leading-snug text-white/90 md:text-[1.3rem]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {headline}
            </p>
            {body && (
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/50">{body}</p>
            )}
          </div>
          <div className="shrink-0">
            {/* pops the lead form for lead-gen hrefs; plain link otherwise */}
            <ModalCta href={ctaLink} className={buttonCls}>
              {inner}
            </ModalCta>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
