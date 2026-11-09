import { ArrowUpRight, Check, Minus } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { CardsSection, SectionIntro } from "./ui";
import {
  NFC_FLOOR_PRICE,
  NFC_FLOOR_QTY,
  NFC_MIN_CARDS,
  NFC_START_PRICE,
  STAND_PRICE,
  competitors,
  competitorsChecked,
  highestPlan,
  lowestPlan,
  nfcCostAt,
  perCard,
  starterBundle,
  usd,
} from "@/lib/cards/pricing";

const { tapTag, shmo } = competitors;

/* A competitor cell is either a yes/no, or a figure linked to the product
   page it came from so a visitor can check it themselves. */
type Sourced = { text: string; href: string };
type Value = boolean | string | Sourced;
type Row = { label: string; tapTag: Value; shmo: Value; powered: Value };

const rows: Row[] = [
  {
    label: "Custom NFC review card",
    tapTag: { text: `${usd(tapTag.nfcCard.unit)} each, no bulk price`, href: tapTag.nfcCard.url },
    shmo: {
      text: `${usd(shmo.nfcCard.unit)} each, ${usd(shmo.nfcCard.tenPack / 10)} in a 10-pack`,
      href: shmo.nfcCard.url,
    },
    powered: `${usd(NFC_START_PRICE)} a card (min. ${NFC_MIN_CARDS}), down to ${usd(
      NFC_FLOOR_PRICE,
    )} at ${NFC_FLOOR_QTY}+`,
  },
  {
    label: "Tap-or-scan review stand",
    tapTag: { text: `${usd(tapTag.stand.from)}–${usd(tapTag.stand.to)}`, href: tapTag.stand.url },
    shmo: { text: `From ${usd(shmo.stand.from)}`, href: shmo.stand.url },
    powered: `${usd(STAND_PRICE)}, and it comes in the starter bundle`,
  },
  {
    label: "Starter bundle",
    tapTag: { text: `${usd(tapTag.bundle.price)}: ${tapTag.bundle.contents}`, href: tapTag.bundle.url },
    shmo: { text: `${usd(shmo.bundle.price)}: ${shmo.bundle.contents}`, href: shmo.bundle.url },
    powered: `${usd(starterBundle.price)}: ${starterBundle.includes.join(", ")}`,
  },
  {
    label: "Branded cards to hand out",
    tapTag: {
      text: `Paper only, ${usd(tapTag.handouts.price)} per ${tapTag.handouts.per}`,
      href: tapTag.handouts.url,
    },
    shmo: false,
    powered: `Durable PVC from ${usd(perCard(lowestPlan))} down to ${usd(perCard(highestPlan))} a card`,
  },
  { label: "Refilled every month", tapTag: false, shmo: false, powered: true },
  { label: "Review-request emails to your customers", tapTag: false, shmo: false, powered: true },
  { label: "Local rep with a demo in hand", tapTag: false, shmo: false, powered: true },
  { label: "Marketing agency behind it", tapTag: false, shmo: false, powered: true },
];

/* The headline proof: the same order of custom NFC cards at list price. */
const PROOF_QTY = NFC_FLOOR_QTY;
const cost = nfcCostAt(PROOF_QTY);
const priciest = Math.max(cost.tapTag, cost.shmo);
const proofBars = [
  { name: tapTag.name, href: tapTag.nfcCard.url, total: cost.tapTag },
  { name: shmo.name, href: shmo.nfcCard.url, total: cost.shmo },
];
const savingsVsCheapest = Math.min(cost.tapTag, cost.shmo) - cost.powered;
const pctLessUpTo = Math.round((1 - cost.powered / priciest) * 100);
const cardsPerTheirOne = Math.floor(tapTag.nfcCard.unit / NFC_FLOOR_PRICE);
const featuresOnlyUs = rows.filter((r) => r.powered === true && !r.tapTag && !r.shmo).length;

const LINK = `inline-flex items-baseline gap-1 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70 ${FOCUS_RING}`;

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className={`${LINK} ${className}`}>
      {children}
      <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5 opacity-70" aria-hidden="true" />
      <span className="sr-only"> (opens their product page in a new tab)</span>
    </a>
  );
}

function Cell({ value, strong }: { value: Value; strong?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 font-semibold text-white">
        <span className="grid size-6 place-items-center rounded-full bg-success/20">
          <Check className="size-4 text-success" strokeWidth={3} aria-hidden="true" />
        </span>
        Included
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-white/40">
        <Minus className="size-5" aria-hidden="true" />
        Not offered
      </span>
    );
  }
  if (typeof value === "string") {
    return <span className={strong ? "font-semibold text-white" : "text-muted-foreground"}>{value}</span>;
  }
  return (
    <ExternalLink href={value.href} className="text-muted-foreground">
      {value.text}
    </ExternalLink>
  );
}

function CompetitorName({ name, href, className = "" }: { name: string; href: string; className?: string }) {
  return (
    <ExternalLink href={href} className={className}>
      {name}
    </ExternalLink>
  );
}

function ProofPanel() {
  return (
    <div className="grid gap-8 rounded-3xl border border-brand/40 bg-gradient-to-br from-brand/15 via-card to-card p-6 shadow-[0_30px_80px_-40px_rgba(0,144,240,0.7)] md:grid-cols-[1.15fr_1fr] md:p-10">
      <div className="flex flex-col gap-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">
          Same order, list price: {PROOF_QTY} custom NFC review cards
        </p>
        <ul className="flex flex-col gap-4">
          {proofBars.map((bar) => (
            <li key={bar.name} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <CompetitorName name={bar.name} href={bar.href} className="font-medium text-white/80" />
                <span className="font-semibold tabular-nums text-white/80 line-through decoration-white/40">
                  {usd(bar.total)}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-white/25"
                  style={{ width: `${(bar.total / priciest) * 100}%` }}
                />
              </div>
            </li>
          ))}
          <li className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold text-brand">Powered Cards</span>
              <span className="text-2xl font-bold tabular-nums text-white">{usd(cost.powered)}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0]"
                style={{ width: `${(cost.powered / priciest) * 100}%` }}
              />
            </div>
          </li>
        </ul>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-6 self-center md:grid-cols-1 lg:grid-cols-2">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <dt className="text-sm text-muted-foreground">You keep, versus the cheaper of the two</dt>
          <dd className="font-serif text-[clamp(2.6rem,6vw,4rem)] leading-none tracking-tight text-white">
            {usd(savingsVsCheapest)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Less per card</dt>
          <dd className="text-2xl font-bold whitespace-nowrap text-brand sm:text-3xl">Up to {pctLessUpTo}%</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Our cards for the price of one of theirs</dt>
          <dd className="text-2xl font-bold text-brand sm:text-3xl">{cardsPerTheirOne}</dd>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <dt className="text-sm text-muted-foreground">Things only we do</dt>
          <dd className="text-lg font-semibold text-white">
            {featuresOnlyUs} of {rows.length}, including monthly PVC handouts and review-request emails
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default function PriceComparison() {
  return (
    <CardsSection id="compare" tone="band" labelledBy="compare-title">
      <div className="flex flex-col gap-10">
        <SectionIntro
          id="compare-title"
          kicker="Powered Cards vs. Tap Tag vs. Shmo"
          className="max-w-3xl"
          title={
            <>
              Same tap-to-review card.{" "}
              <span className="bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] bg-clip-text text-transparent">
                A fraction of the price.
              </span>
            </>
          }
          body={
            <>
              They sell you a gadget once. We keep reviews coming every month. Check every number
              yourself: each competitor price below links straight to their own product page.
            </>
          }
        />

        <ProofPanel />

        {/* Phones: one card per feature so the Powered Cards column is never
            off screen. Tablets and up: the side-by-side table. */}
        <ul className="flex flex-col gap-3 md:hidden">
          {rows.map((row) => (
            <li key={row.label} className="rounded-2xl border border-white/10 bg-card p-4">
              <h3 className="font-semibold text-white">{row.label}</h3>
              <dl className="mt-3 grid gap-2 text-sm">
                <div className="flex flex-col gap-1 rounded-lg border border-brand/40 bg-brand/15 px-3 py-2.5">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Powered Cards</dt>
                  <dd className="flex items-center text-base leading-relaxed">
                    <Cell value={row.powered} strong />
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 px-3 py-1">
                  <dt className="shrink-0 text-white/60">
                    <CompetitorName name={tapTag.name} href={tapTag.site} />
                  </dt>
                  <dd className="text-right">
                    <Cell value={row.tapTag} />
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 px-3 py-1">
                  <dt className="shrink-0 text-white/60">
                    <CompetitorName name={shmo.name} href={shmo.site} />
                  </dt>
                  <dd className="text-right">
                    <Cell value={row.shmo} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-card md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="sr-only">Tap Tag and Shmo compared with Powered Cards</caption>
            <thead>
              <tr className="border-b border-white/10">
                <th scope="col" className="p-5">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="p-5 font-semibold text-white/80">
                  <CompetitorName name={tapTag.name} href={tapTag.site} />
                </th>
                <th scope="col" className="p-5 font-semibold text-white/80">
                  <CompetitorName name={shmo.name} href={shmo.site} />
                </th>
                <th
                  scope="col"
                  className="border-x-2 border-t-2 border-brand/60 bg-brand/15 p-5 text-base font-bold text-white"
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                    Best value
                  </span>
                  Powered Cards
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className="border-b border-white/10 last:border-0">
                  <th scope="row" className="p-5 font-semibold text-white">
                    {row.label}
                  </th>
                  <td className="p-5">
                    <Cell value={row.tapTag} />
                  </td>
                  <td className="p-5">
                    <Cell value={row.shmo} />
                  </td>
                  <td
                    className={`border-x-2 border-brand/60 bg-brand/15 p-5 text-[15px] ${
                      i === rows.length - 1 ? "border-b-2" : ""
                    }`}
                  >
                    <Cell value={row.powered} strong />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Competitor prices are list prices from their public product pages (linked above), checked{" "}
          {competitorsChecked}, before shipping, tax or promotions. Totals for {PROOF_QTY} cards use
          {" "}
          {tapTag.name}&apos;s single-card price and {shmo.name}&apos;s 10-pack price.
        </p>
      </div>
    </CardsSection>
  );
}
