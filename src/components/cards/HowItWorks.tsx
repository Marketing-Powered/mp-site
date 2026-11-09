import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CardsSection } from "./ui";

const steps = [
  {
    title: "Try 10 cards with your brand",
    body: "Qualified businesses get 10 free branded samples so you can see the design, scan the code and test it with real customers.",
  },
  {
    title: "Approve your proof",
    body: "Pick a plan, share your logo and destination, and approve a versioned proof. Nothing prints until you sign off.",
  },
  {
    title: "First box ships from the U.S.",
    body: "Your first order is produced domestically for fast delivery, tested on real phones before it leaves.",
  },
  {
    title: "Replenished every month",
    body: "Before each renewal we check how many you used and adjust the quantity, so you never pay for cards sitting in a drawer.",
  },
];

export default function HowItWorks() {
  return (
    <CardsSection id="how" tone="band" labelledBy="how-title">
      <div className="flex flex-col gap-12">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#0090F0]">
              <span className="inline-block h-px w-8 bg-[#0090F0]" />
              How it works
            </p>
            <h2
              id="how-title"
              className="max-w-xl font-serif text-[clamp(2rem,4vw,3.4rem)] font-normal leading-[1.04] text-balance"
              style={{ letterSpacing: "-0.015em" }}
            >
              From first sample to steady supply.
            </h2>
          </Reveal>
          <Reveal variant="blur">
            <div
              className="overflow-hidden rounded-2xl border border-white/10"
              style={{ boxShadow: "0 24px 60px -32px rgba(0,24,72,0.55)" }}
            >
              <Image
                src="/images/pages/cards/pvc-cards-fanned.jpg"
                alt="Ten white Marketing Powered PVC review cards fanned out, each with the Google logo, gold stars and a QR code"
                width={1312}
                height={816}
                quality={72}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-56 w-full object-cover md:h-72"
              />
            </div>
          </Reveal>
        </div>
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 80}>
              <div className="flex flex-col gap-3 border-t border-[#0090F0] pt-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand tabular-nums">
                  Step {i + 1}
                </span>
                <h3 className="font-serif text-lg font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </CardsSection>
  );
}
