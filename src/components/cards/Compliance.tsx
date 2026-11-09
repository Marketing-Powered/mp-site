import { ShieldCheck } from "lucide-react";
import { CardsSection } from "./ui";

const rules = [
  "Every customer who scans can leave any rating. We never filter out unhappy customers.",
  "No discounts, gifts or free cards in exchange for a review.",
  "Free samples go to your business to evaluate, never to your customers as a reward.",
  "We report scans honestly. A scan means someone opened the page, not that they left a review.",
];

export default function Compliance() {
  return (
    <CardsSection id="review-safe" labelledBy="review-safe-title">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <ShieldCheck className="size-8 text-success" aria-hidden="true" />
          <h2
            id="review-safe-title"
            className="font-serif text-[clamp(1.7rem,3vw,2.6rem)] font-normal leading-[1.08] text-balance"
          >
            Review-safe by design.
          </h2>
          <p className="leading-relaxed text-muted-foreground text-pretty">
            Fake or incentivized reviews can get a Google profile penalized and violate FTC rules.
            Powered Cards invite honest feedback and nothing more.
          </p>
        </div>
        <div>
          <ul className="flex flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-3 p-5 text-sm leading-relaxed text-white/75">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-success" aria-hidden="true" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardsSection>
  );
}
