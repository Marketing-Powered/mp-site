import Reveal from "@/components/Reveal";
import { serif } from "./theme";
import { PrimaryCta, GhostCta } from "./ui";
import { siteContent as s } from "@/lib/content";

export default function CtaBand({
  headline = "Ready to see what AI-native marketing can do for your treatment center?",
  body = "Request a free audit of your paid media, landing pages, attribution, and compliance posture. You'll get a straight assessment of where the opportunities are.",
  ctaText = "Request a Free Audit",
  ctaLink = "/get-started/request-an-audit",
  secondaryCta,
  emailLink = true,
}: {
  headline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCta?: { text: string; link: string };
  emailLink?: boolean;
}) {
  return (
    <section className="relative z-10 px-6 pb-28 pt-4 lg:px-12">
      <Reveal
        variant="blur"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10"
        style={{
          background:
            "radial-gradient(130% 150% at 50% 0%, rgba(0,144,240,0.22), transparent 55%), radial-gradient(100% 120% at 100% 100%, rgba(8,174,103,0.16), transparent 55%), #071226",
        }}
      >
        <div className="relative px-8 py-20 text-center md:px-16 md:py-24">
          <h2
            className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {headline}
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-white/55">{body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PrimaryCta href={ctaLink}>{ctaText}</PrimaryCta>
            {secondaryCta && <GhostCta href={secondaryCta.link}>{secondaryCta.text}</GhostCta>}
          </div>
          {emailLink && (
            <p className="mt-6 text-[14px] text-white/45">
              or email us at{" "}
              <a
                href={`mailto:${s.brand.email}`}
                className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF]"
              >
                {s.brand.email}
              </a>
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
