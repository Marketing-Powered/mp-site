import Reveal from "@/components/Reveal";
import { serif } from "./theme";
import { PrimaryCta } from "./ui";

export default function CtaBand({
  headline = "Ready to see what AI-native marketing can do for your treatment center?",
  body = "Schedule a discovery call to discuss your current performance, compliance posture, and growth objectives. We will give you an honest assessment of where the opportunities are.",
  ctaText = "Book a Discovery Call",
  ctaLink = "/get-started/",
}: {
  headline?: string;
  body?: string;
  ctaText?: string;
  ctaLink?: string;
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
          <div className="mt-10 flex justify-center">
            <PrimaryCta href={ctaLink}>{ctaText}</PrimaryCta>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
