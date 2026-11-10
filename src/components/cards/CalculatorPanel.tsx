import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { cn } from "@/lib/cn";
import { PILL_PRIMARY } from "./ui";
import {
  NFC_FLOOR_PRICE,
  NFC_FLOOR_QTY,
  NFC_MAX_CARDS,
  NFC_MIN_CARDS,
  STAND_PRICE,
  nfcTotal,
  nfcUnitPrice,
  perCard,
  plans,
  setupFrom,
  usd,
} from "@/lib/cards/pricing";

/* Presentational plan calculator. The server renders it once with the
   default selection; KitCalculatorWidget renders the same markup with live
   state once LazyMount loads it. Handlers are optional so the static render
   is inert rather than broken. "Start the plan" carries the plan and any
   add-ons into the order request form on /cards/order. */

export const MAX_STANDS = 25;
export const NFC_STEP = 10;

export type CalculatorState = { planIndex: number; stands: number; nfcCards: number };

export const DEFAULT_CALCULATOR_STATE: CalculatorState = { planIndex: 1, stands: 0, nfcCards: 0 };

export const clampStands = (value: number) =>
  Math.min(MAX_STANDS, Math.max(0, Math.round(value) || 0));

export const clampNfc = (value: number) => {
  const rounded = Math.round(value) || 0;
  if (rounded <= 0) return 0;
  return Math.min(NFC_MAX_CARDS, Math.max(NFC_MIN_CARDS, rounded));
};

const included = [
  "One approved design in your branding",
  "One destination: Google reviews, booking or any link",
  "Monthly shipment with reorder reminders",
  "Review-request emails to your customers",
  "Ongoing brand and positioning monitoring",
];

const stepButton = `flex size-8 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] transition-colors hover:bg-white/10 disabled:opacity-40 ${FOCUS_RING}`;

type StepperProps = {
  id: string;
  label: string;
  itemName: string;
  value: number;
  max: number;
  hint: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChange?: (value: number) => void;
};

function QuantityStepper({
  id,
  label,
  itemName,
  value,
  max,
  hint,
  onIncrement,
  onDecrement,
  onChange,
}: StepperProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
        value > 0 ? "border-[#0090F0]/60 bg-[#0090F0]/5" : "border-white/10 bg-white/[0.02]",
      )}
    >
      <div className="flex min-w-0 flex-col">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <span className="text-xs text-muted-foreground tabular-nums">{hint}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value === 0}
          aria-label={`Remove ${itemName}`}
          className={stepButton}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          value={value}
          readOnly={!onChange}
          onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
          className="h-8 w-14 rounded-md border border-white/15 bg-white/[0.03] text-center font-semibold tabular-nums outline-none [appearance:textfield] focus:border-[#0090F0]/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={onIncrement}
          disabled={value === max}
          aria-label={`Add ${itemName}`}
          className={stepButton}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export type CalculatorPanelProps = CalculatorState & {
  onPlan?: (index: number) => void;
  onStands?: (value: number) => void;
  onNfc?: (value: number) => void;
};

export default function CalculatorPanel({
  planIndex,
  stands,
  nfcCards,
  onPlan,
  onStands,
  onNfc,
}: CalculatorPanelProps) {
  const plan = plans[planIndex];
  const standsTotal = stands * STAND_PRICE;
  const nfcCardsTotal = nfcCards > 0 ? nfcTotal(nfcCards) : 0;
  const nfcEach = nfcUnitPrice(Math.max(nfcCards, NFC_MIN_CARDS));
  const firstPayment = plan.price + standsTotal + nfcCardsTotal;

  const nfcHint =
    nfcCards >= NFC_FLOOR_QTY
      ? `${usd(nfcEach)} each, our lowest price`
      : `${usd(nfcEach)} each, ${usd(NFC_FLOOR_PRICE)} at ${NFC_FLOOR_QTY}+ (min. ${NFC_MIN_CARDS})`;

  const orderHref = `/cards/order?item=plan-${plan.id}${stands > 0 ? `&stands=${stands}` : ""}${
    nfcCards > 0 ? `&nfc=${nfcCards}` : ""
  }`;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-8 rounded-[24px] border border-white/10 bg-white/[0.02] p-5 md:p-8 lg:col-span-3">
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            Cards per month
          </legend>
          <div
            role="radiogroup"
            aria-label="Plan"
            className="grid grid-cols-5 gap-1 rounded-xl border border-white/10 bg-card p-1"
          >
            {plans.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={i === planIndex}
                onClick={onPlan ? () => onPlan(i) : undefined}
                className={cn(
                  "flex flex-col items-center rounded-lg px-1 py-2 text-sm transition-colors",
                  FOCUS_RING,
                  i === planIndex
                    ? "bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white",
                )}
              >
                <span className="font-semibold tabular-nums">{p.cards.toLocaleString("en-US")}</span>
                <span className="hidden text-xs sm:block">{p.name}</span>
              </button>
            ))}
          </div>
          <label htmlFor="cards-plan-size" className="sr-only">
            Plan size
          </label>
          <input
            id="cards-plan-size"
            type="range"
            min={0}
            max={plans.length - 1}
            step={1}
            value={planIndex}
            readOnly={!onPlan}
            onChange={onPlan ? (e) => onPlan(Number(e.target.value)) : undefined}
            aria-valuetext={`${plan.name}: ${plan.cards} cards for ${usd(plan.price)} a month`}
            className="w-full accent-brand"
          />
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            Add permanent tap points (one-time, optional)
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            <QuantityStepper
              id="cards-stands"
              label="Google Review Stand"
              itemName="one review stand"
              value={stands}
              max={MAX_STANDS}
              hint={`${usd(STAND_PRICE)} each`}
              onDecrement={onStands ? () => onStands(clampStands(stands - 1)) : undefined}
              onIncrement={onStands ? () => onStands(clampStands(stands + 1)) : undefined}
              onChange={onStands ? (v) => onStands(clampStands(v)) : undefined}
            />
            <QuantityStepper
              id="cards-nfc"
              label="Google review tap cards"
              itemName={`${NFC_STEP} Google review tap cards`}
              value={nfcCards}
              max={NFC_MAX_CARDS}
              hint={nfcHint}
              onDecrement={
                onNfc
                  ? () => onNfc(nfcCards <= NFC_MIN_CARDS ? 0 : clampNfc(nfcCards - NFC_STEP))
                  : undefined
              }
              onIncrement={onNfc ? () => onNfc(clampNfc(nfcCards + NFC_STEP)) : undefined}
              onChange={onNfc ? (v) => onNfc(clampNfc(v)) : undefined}
            />
          </div>
        </fieldset>

        <ul className="grid gap-2 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-white/75">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <aside
        aria-live="polite"
        className="flex flex-col gap-6 rounded-[24px] border border-white/10 p-5 md:p-8 lg:col-span-2"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.12), transparent 55%), #0A1322",
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
            {plan.name} plan
          </p>
          <p className="text-sm text-white/60">{plan.bestFor}</p>
        </div>
        <p className="flex items-baseline gap-1">
          <span className="font-serif text-5xl font-medium tabular-nums">{usd(plan.price)}</span>
          <span className="text-white/60">/month</span>
        </p>
        <dl className="flex flex-col gap-3 border-t border-white/10 pt-6 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Cards each month</dt>
            <dd className="font-semibold tabular-nums">{plan.cards.toLocaleString("en-US")}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Price per card</dt>
            <dd className="font-semibold tabular-nums">{usd(perCard(plan))}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">
              Review stands <span className="tabular-nums">{`(x${stands})`}</span>
            </dt>
            <dd className="font-semibold tabular-nums">{usd(standsTotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">
              Google review tap cards{" "}
              <span className="tabular-nums">
                {nfcCards > 0 ? `(x${nfcCards} at ${usd(nfcEach)})` : "(x0)"}
              </span>
            </dt>
            <dd className="font-semibold tabular-nums">{usd(nfcCardsTotal)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/10 pt-3 text-base">
            <dt>First payment</dt>
            <dd className="font-semibold tabular-nums">{usd(firstPayment)}</dd>
          </div>
        </dl>
        <p className="text-xs leading-relaxed text-white/55">
          Plus a one-time design setup from {usd(setupFrom)}, quoted before you pay. Extra designs,
          variable codes, special finishes and rush orders are quoted separately.
        </p>
        <Link href={orderHref} prefetch={false} className={`${PILL_PRIMARY} mt-auto w-full`}>
          Start the {plan.name} plan
        </Link>
      </aside>
    </div>
  );
}
