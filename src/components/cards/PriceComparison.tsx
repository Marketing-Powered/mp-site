import { Check, Minus } from "lucide-react";
import { CardsSection, SectionIntro } from "./ui";
import {
  NFC_FLOOR_PRICE,
  NFC_FLOOR_QTY,
  NFC_MIN_CARDS,
  NFC_START_PRICE,
  STAND_PRICE,
  competitorPrices,
  highestPlan,
  lowestPlan,
  perCard,
  starterBundle,
  usd,
} from "@/lib/cards/pricing";

type Value = string | boolean;
type Row = { label: string; tapTag: Value; shmo: Value; powered: Value };

const rows: Row[] = [
  {
    label: "Google review tap card (custom NFC)",
    tapTag: `From ${competitorPrices.nfcCard} each`,
    shmo: `From ${competitorPrices.nfcCard} each`,
    powered: `${usd(NFC_START_PRICE)} a card (min. ${NFC_MIN_CARDS}), down to ${usd(
      NFC_FLOOR_PRICE,
    )} at ${NFC_FLOOR_QTY}+`,
  },
  {
    label: "Google review stand (tap or scan)",
    tapTag: competitorPrices.stand,
    shmo: "Price not listed",
    powered: usd(STAND_PRICE),
  },
  {
    label: "Starter bundle",
    tapTag: "From $99, one card, no handouts",
    shmo: false,
    powered: `${usd(starterBundle.price)}: ${starterBundle.includes.join(", ")}`,
  },
  {
    label: "Branded cards to hand out",
    tapTag: false,
    shmo: "Paper only",
    powered: `Durable PVC from ${usd(perCard(lowestPlan))} down to ${usd(perCard(highestPlan))} a card`,
  },
  { label: "Refilled every month", tapTag: false, shmo: false, powered: true },
  { label: "Review-request emails to your customers", tapTag: false, shmo: false, powered: true },
  { label: "Local rep with a demo in hand", tapTag: false, shmo: false, powered: true },
  { label: "Marketing agency behind it", tapTag: false, shmo: false, powered: true },
];

function Cell({ value, strong }: { value: Value; strong?: boolean }) {
  if (value === true) {
    return (
      <>
        <Check className="size-5 text-success" aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="size-5 text-white/35" aria-hidden="true" />
        <span className="sr-only">No</span>
      </>
    );
  }
  return <span className={strong ? "font-semibold text-white/90" : "text-muted-foreground"}>{value}</span>;
}

export default function PriceComparison() {
  return (
    <CardsSection id="compare" tone="band" labelledBy="compare-title">
      <div className="flex flex-col gap-10">
        <SectionIntro
          id="compare-title"
          kicker="Compared"
          title="They sell you a gadget once. We keep reviews coming every month."
          body="Our Google review tap cards cost a fraction of theirs, and our stand is priced right in line. And nobody else sends you branded PVC review cards to hand out every month."
        />

        {/* Phones: one card per feature so the Powered Cards column is never
            off screen. Tablets and up: the side-by-side table. */}
        <ul className="flex flex-col gap-3 md:hidden">
          {rows.map((row) => (
            <li key={row.label} className="rounded-2xl border border-white/10 bg-card p-4">
              <h3 className="font-medium text-white/90">{row.label}</h3>
              <dl className="mt-3 grid gap-2 text-sm">
                <div className="flex flex-col gap-1 rounded-lg bg-brand/10 px-3 py-2">
                  <dt className="font-semibold text-brand">Powered Cards</dt>
                  <dd className="flex items-center leading-relaxed">
                    <Cell value={row.powered} strong />
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 px-3 py-1">
                  <dt className="shrink-0 text-white/60">Tap Tag</dt>
                  <dd className="flex items-center justify-end text-right">
                    <Cell value={row.tapTag} />
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 px-3 py-1">
                  <dt className="shrink-0 text-white/60">Shmo</dt>
                  <dd className="flex items-center justify-end text-right">
                    <Cell value={row.shmo} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-card md:block">
          <table className="w-full min-w-[680px] text-left text-sm">
              <caption className="sr-only">Tap Tag and Shmo compared with Powered Cards</caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="p-4 md:p-5">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="p-4 font-semibold text-white/80 md:p-5">
                    Tap Tag
                  </th>
                  <th scope="col" className="p-4 font-semibold text-white/80 md:p-5">
                    Shmo
                  </th>
                  <th scope="col" className="bg-brand/10 p-4 font-semibold text-brand md:p-5">
                    Powered Cards
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-white/10 last:border-0">
                    <th scope="row" className="p-4 font-medium text-white/85 md:p-5">
                      {row.label}
                    </th>
                    <td className="p-4 md:p-5">
                      <Cell value={row.tapTag} />
                    </td>
                    <td className="p-4 md:p-5">
                      <Cell value={row.shmo} />
                    </td>
                    <td className="bg-brand/10 p-4 md:p-5">
                      <Cell value={row.powered} strong />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Competitor details from public product pages at taptag.shop and shmocard.com, checked{" "}
          {competitorPrices.checked}. Prices vary by option and promotion.
        </p>
      </div>
    </CardsSection>
  );
}
