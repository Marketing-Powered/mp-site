import Image from "next/image";
import { Check } from "lucide-react";
import { GhostCta } from "@/components/site/ui";
import ScrollLink from "./ScrollLink";
import { highestPlan, lowestPlan, perCard, usd } from "@/lib/cards/pricing";

const proofPoints = [
  `As low as ${usd(perCard(highestPlan))} a card`,
  "Your brand on the front, not ours",
  "10 free sample cards for qualified businesses",
];

export default function Hero() {
  return (
    /* Phones: headline, then the product image, then the lead copy and
       actions. Desktop: text column beside the image. The text wrapper is
       display:contents below lg so its two halves order around the image. */
    <div className="grid items-center gap-8 pb-6 pt-8 lg:grid-cols-2 lg:gap-14 lg:pt-10">
      <div className="contents lg:flex lg:flex-col lg:gap-6">
        <div className="order-1 flex flex-col gap-6 lg:order-none">
          {/* Product name, set large so the brand reads before the headline. */}
          <p className="flex items-center gap-4 text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tracking-[-0.02em]">
            <span className="inline-block h-[3px] w-10 shrink-0 rounded-full bg-[#0090F0] sm:w-14" aria-hidden="true" />
            <span className="bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] bg-clip-text text-transparent">
              Powered Cards
            </span>
          </p>
          <h1
            className="font-serif text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.02] text-balance"
            style={{ letterSpacing: "-0.02em" }}
          >
            Branded cards that turn every handoff into{" "}
            <span className="relative whitespace-nowrap">
              more business
              <span
                className="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] opacity-80"
                aria-hidden="true"
              />
            </span>
            .
          </h1>
        </div>
        <div className="order-3 flex flex-col gap-6 lg:order-none">
          <p className="max-w-xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55 text-pretty">
            A monthly supply of your own branded QR cards, shipped before you run out. Customers scan
            to book, return, contact you or leave honest feedback. Add an NFC tap stand or premium
            card once, never on a subscription.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ScrollLink targetId="plans">See plans from {usd(lowestPlan.price)}/mo</ScrollLink>
            <GhostCta href="/cards/order?item=samples">Request 10 free samples</GhostCta>
          </div>
          <ul className="flex flex-col gap-2 pt-2">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="size-4 text-success" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative order-2 mb-6 lg:order-none lg:mb-0">
        <div
          className="overflow-hidden rounded-2xl border border-white/10 bg-card"
          style={{ boxShadow: "0 24px 60px -32px rgba(0,24,72,0.55)" }}
        >
          <Image
            src="/images/pages/cards/powered-cards-hero-white.jpg"
            alt="Powered Cards by Marketing Powered: a fanned stack of white PVC review cards with the Google G logo and five gold stars, a matching Powered Review Stand, and a white NFC card tapped by a phone"
            width={1376}
            height={768}
            priority
            fetchPriority="high"
            quality={72}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
        <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#070E1C] px-4 py-3 shadow-lg md:left-6">
          <span className="text-2xl font-semibold tabular-nums">{usd(perCard(highestPlan))}</span>
          <span className="text-xs leading-snug text-muted-foreground">
            per branded card
            <br />
            on the {highestPlan.cards.toLocaleString("en-US")}-card plan
          </span>
        </div>
      </div>
    </div>
  );
}
