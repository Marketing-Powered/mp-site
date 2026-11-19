"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Minus, Plus, X } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { handleInput, handleInvalid } from "@/components/site/formValidation";
import { cn } from "@/lib/cn";
import { trackFormSubmit } from "@/lib/analytics";
import { PILL_OUTLINE, PILL_PRIMARY } from "./ui";
import {
  ORDER_ITEMS,
  SAMPLES_ITEM_ID,
  addonLines,
  addonsTotal,
  clampQuantity,
  findOrderItem,
  hasQuantity,
  type OrderAddons,
  type OrderGroup,
} from "@/lib/cards/orderItems";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL, usd } from "@/lib/cards/pricing";

/* Powered Cards order request. Two steps: pick what you need, then tell us
   about the business and where the cards go. No payment is taken: the
   request posts to /api/contact, which files it on the Orders tab of the
   leads sheet and emails it, and a person follows up within one business
   day to confirm design, destination and pricing before anything prints.
   Every order action on /cards lands here (product tiles, the plan
   calculator with its add-ons, and the free-sample requests). */

const SOURCE = "Powered Cards Order";

type PackageType = Exclude<OrderGroup, "one_time">;
type Step = "select" | "details" | "done";

const packageTabs: { id: PackageType; label: string; legend: string; hint: string }[] = [
  {
    id: "pvc",
    label: "PVC QR cards",
    legend: "Monthly branded PVC QR cards",
    hint: "Branded QR cards customers take home, delivered every month. Pause or cancel anytime.",
  },
  {
    id: "nfc",
    label: "Google review tap cards",
    legend: "Google review tap card packs (custom NFC)",
    hint: "Tap-or-scan NFC cards in your branding. One-time purchase, lower price per card on bigger packs.",
  },
];

const BUSINESS_TYPES = [
  "Salon or personal services",
  "Auto services or detailing",
  "Home services",
  "Fitness or local retail",
  "Hospitality or events",
  "Healthcare or professional practice",
  "Agency or multi-location group",
  "Other",
];

const LOCATIONS = ["1", "2-5", "6-15", "16+"];

const DESTINATIONS = [
  "Google review page",
  "Booking or appointment page",
  "Website or landing page",
  "Social profile",
  "Not sure yet, help me choose",
];

const LOGO_OPTIONS = [
  "Yes, vector files (AI, SVG, EPS or PDF)",
  "Yes, PNG or JPG only",
  "No, I need help with the design",
];

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-base text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#0090F0]/60 focus:bg-white/[0.05] sm:text-[15px]";
const labelCls = "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-white/55";
const stepButton = `flex size-9 items-center justify-center rounded-md border border-white/15 transition-colors hover:bg-white/10 disabled:opacity-40 ${FOCUS_RING}`;

function Field({
  id,
  label,
  required,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="text-[#0090F0]"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  name,
  options,
  required,
}: {
  id: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <select
      id={id}
      name={name}
      required={required}
      defaultValue=""
      className={inputCls}
      onInvalid={handleInvalid}
      onInput={handleInput}
    >
      <option value="" disabled>
        Select…
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#070E1C]">
          {o}
        </option>
      ))}
    </select>
  );
}

export default function OrderForm({
  initialItemId,
  initialAddons,
}: {
  initialItemId: string;
  initialAddons: OrderAddons;
}) {
  const [itemId, setItemId] = useState(initialItemId);
  const [packageType, setPackageType] = useState<PackageType>(() =>
    findOrderItem(initialItemId)?.group === "nfc" ? "nfc" : "pvc",
  );
  const [quantity, setQuantity] = useState(
    () => (findOrderItem(initialItemId) ?? ORDER_ITEMS[0]).minQuantity,
  );
  const [quantityDraft, setQuantityDraft] = useState(String(quantity));
  const [addons, setAddons] = useState<OrderAddons>(initialAddons);
  const [step, setStep] = useState<Step>("select");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const topRef = useRef<HTMLElement>(null);

  const item = findOrderItem(itemId) ?? ORDER_ITEMS[0];
  const isSamples = item.id === SAMPLES_ITEM_ID;
  const showQuantity = hasQuantity(item);
  const effectiveQuantity = showQuantity ? quantity : 1;
  const isMonthly = item.billing === "monthly";
  const itemTotal = (item.priceInCents * effectiveQuantity) / 100;
  const extras = addonsTotal(addons);
  const extraLines = addonLines(addons);

  const updateQuantity = (value: number) => {
    const next = clampQuantity(item, value);
    setQuantity(next);
    setQuantityDraft(String(next));
  };

  const goTo = (next: Step) => {
    setStep(next);
    window.requestAnimationFrame(() =>
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  /* Phones: the summary sits below the whole catalog, so a bottom bar carries
     the total and the Continue action while the summary is off screen. */
  const summaryRef = useRef<HTMLElement>(null);
  const [summaryInView, setSummaryInView] = useState(true);
  useEffect(() => {
    const el = summaryRef.current;
    if (!el || step !== "select") return;
    const io = new IntersectionObserver(([entry]) => setSummaryInView(entry.isIntersecting), {
      rootMargin: "0px 0px -72px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [step]);

  /* Human-readable totals, written into the sheet as sent. */
  const totalLabel = isSamples
    ? extras > 0
      ? `Free samples + ${usd(extras)} one-time`
      : "Free"
    : isMonthly
      ? `${usd(itemTotal)}/month${extras > 0 ? ` + ${usd(extras)} one-time` : ""}`
      : usd(itemTotal + extras);

  async function submitDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setFailed(false);
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const payload = {
      ...form,
      source: SOURCE,
      page: window.location.pathname,
      item: showQuantity ? `${effectiveQuantity} x ${item.name}` : item.name,
      quantity: String(effectiveQuantity),
      addons: extraLines.join("; "),
      billing: isSamples ? "Free samples" : isMonthly ? "Monthly subscription" : "One-time",
      total: totalLabel,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Order request rejected: ${res.status}`);
      trackFormSubmit("cards-order-form", SOURCE);
      goTo("done");
    } catch {
      setFailed(true);
      setSending(false);
    }
  }

  const summaryBlock = (
    <>
      <div className="flex flex-col gap-1">
        <p className="font-medium">
          {showQuantity && effectiveQuantity > 1 ? `${effectiveQuantity} × ` : ""}
          {item.name}
        </p>
        <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
      </div>
      {extraLines.length > 0 && (
        <ul className="flex flex-col gap-2 border-t border-white/10 pt-4 text-sm">
          {extraLines.map((line, i) => (
            <li key={line} className="flex items-start justify-between gap-3">
              <span className="text-white/80">{line}</span>
              {step === "select" && (
                <button
                  type="button"
                  aria-label={`Remove ${i === 0 && addons.stands > 0 ? "Google review stands" : "Google review tap cards"}`}
                  onClick={() =>
                    setAddons((a) =>
                      i === 0 && a.stands > 0 ? { ...a, stands: 0 } : { ...a, nfcCards: 0 },
                    )
                  }
                  className={`flex size-6 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/60 hover:bg-white/10 hover:text-white ${FOCUS_RING}`}
                >
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
        <span className="text-sm">Estimated total</span>
        <span className="text-right text-xl font-semibold leading-tight">{totalLabel}</span>
      </div>
      <p className="text-xs leading-relaxed text-white/55">
        No payment today. We confirm the design, destination and final pricing with you first;
        design setup, if any, is quoted before you pay.
      </p>
    </>
  );

  if (step === "done") {
    return (
      <div
        ref={topRef as React.RefObject<HTMLDivElement | null>}
        className="flex scroll-mt-28 flex-col items-start gap-4 rounded-[24px] border border-white/10 bg-card p-8"
        role="status"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-2xl font-medium">Order request received.</h2>
        <p className="max-w-prose leading-relaxed text-muted-foreground">
          Thank you. We will reach out within one business day to confirm your design, where the
          cards should point and the final pricing. Nothing is printed, and nothing is charged,
          until you approve a proof.
        </p>
        <p className="max-w-prose text-sm leading-relaxed text-white/55">
          Need it sooner? Call{" "}
          <a href={`tel:${CONTACT_TEL}`} className="text-[#7FCBFF] underline underline-offset-4">
            {CONTACT_PHONE}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#7FCBFF] underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <Link href="/cards" prefetch={false} className={PILL_OUTLINE}>
          Back to Powered Cards
        </Link>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div
        ref={topRef as React.RefObject<HTMLDivElement | null>}
        className="grid scroll-mt-28 gap-6 lg:grid-cols-5"
      >
        <form onSubmit={submitDetails} className="lg:col-span-3">
          <div className="flex flex-col gap-6 rounded-[24px] border border-white/10 bg-white/[0.02] p-5 md:p-8">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#0090F0]">
                Step 2 of 2
              </p>
              <h2 className="font-serif text-2xl font-medium">Tell us about your business</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This is what we need to draft your proof. A person reviews every request.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="order-business" label="Business name" required full>
                <input
                  id="order-business"
                  name="business"
                  required
                  autoComplete="organization"
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              </Field>
              <Field id="order-name" label="Your name" required>
                <input
                  id="order-name"
                  name="name"
                  required
                  autoComplete="name"
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              </Field>
              <Field id="order-phone" label="Phone" required>
                <input
                  id="order-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              </Field>
              <Field id="order-email" label="Email" required full>
                <input
                  id="order-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              </Field>
              <Field id="order-type" label="Type of business" required>
                <Select id="order-type" name="businessType" options={BUSINESS_TYPES} required />
              </Field>
              <Field id="order-locations" label="Number of locations">
                <Select id="order-locations" name="locations" options={LOCATIONS} />
              </Field>
              <Field id="order-website" label="Website or Google Business Profile link" full>
                <input
                  id="order-website"
                  name="website"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  autoComplete="url"
                  className={inputCls}
                />
              </Field>
              <Field id="order-destination" label="Where should the cards send people?" required>
                <Select id="order-destination" name="destination" options={DESTINATIONS} required />
              </Field>
              <Field id="order-destination-link" label="Destination link, if you have it">
                <input
                  id="order-destination-link"
                  name="destinationLink"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  className={inputCls}
                />
              </Field>
              <Field id="order-logo" label="Do you have logo files?" required full>
                <Select id="order-logo" name="logo" options={LOGO_OPTIONS} required />
              </Field>
              <Field id="order-shipping" label="Shipping address" required full>
                <textarea
                  id="order-shipping"
                  name="shipping"
                  required
                  rows={3}
                  autoComplete="street-address"
                  placeholder="Street, city, state, ZIP"
                  className={inputCls}
                  onInvalid={handleInvalid}
                  onInput={handleInput}
                />
              </Field>
              <Field id="order-notes" label="Anything else we should know?" full>
                <textarea
                  id="order-notes"
                  name="notes"
                  rows={3}
                  placeholder="Colors to match, a tagline for the card, timing, questions"
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => goTo("select")} className={PILL_OUTLINE}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                Change selection
              </button>
              <button type="submit" disabled={sending} className={PILL_PRIMARY}>
                {sending ? "Sending…" : "Send order request"}
              </button>
            </div>
            {failed && (
              <p role="alert" className="text-[13px] leading-relaxed text-[#FFB4A8]">
                We could not send your request. Please try again, call {CONTACT_PHONE} or email{" "}
                {CONTACT_EMAIL}.
              </p>
            )}
            <p className="text-xs text-white/40">
              We use these details only to prepare your order and proof. No payment is collected on
              this page.
            </p>
          </div>
        </form>

        <aside className="lg:col-span-2">
          <div
            className="flex flex-col gap-5 rounded-[24px] border border-white/10 p-6 lg:sticky lg:top-24"
            style={{
              background:
                "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.12), transparent 55%), #0A1322",
            }}
          >
            <h2 className="font-serif text-xl font-medium">Your request</h2>
            {summaryBlock}
          </div>
        </aside>
      </div>
    );
  }

  return (
    <form
      ref={topRef as React.RefObject<HTMLFormElement | null>}
      className="grid scroll-mt-28 gap-6 pb-20 lg:grid-cols-5 lg:pb-0"
      onSubmit={(event) => {
        event.preventDefault();
        updateQuantity(Number(quantityDraft));
        goTo("details");
      }}
    >
      <div className="flex flex-col gap-8 lg:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#0090F0]">
          Step 1 of 2: pick what you need
        </p>
        {(["one_time", packageType] as const).map((groupId) => (
          <fieldset key={groupId} className="flex flex-col gap-3">
            {groupId === "one_time" ? (
              <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                Samples and one-time
              </legend>
            ) : (
              <>
                <legend className="sr-only">
                  {packageTabs.find((tab) => tab.id === groupId)?.legend}
                </legend>
                <div className="mb-3 flex flex-col gap-3">
                  <div
                    role="group"
                    aria-label="Card package type"
                    className="flex w-full rounded-full border border-white/10 bg-card p-1 sm:w-fit"
                  >
                    {packageTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        aria-pressed={packageType === tab.id}
                        onClick={() => setPackageType(tab.id)}
                        className={cn(
                          "flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:flex-none",
                          FOCUS_RING,
                          packageType === tab.id
                            ? "bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black"
                            : "text-muted-foreground hover:text-white",
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {packageTabs.find((tab) => tab.id === groupId)?.hint}
                  </p>
                </div>
              </>
            )}
            {ORDER_ITEMS.filter((option) => option.group === groupId).map((option) => {
              const selected = option.id === item.id;
              const free = option.priceInCents === 0;
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-[#0090F0]/60 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-white",
                    selected ? "border-[#0090F0]" : "border-white/10",
                  )}
                >
                  <input
                    type="radio"
                    name="item"
                    value={option.id}
                    checked={selected}
                    onChange={() => {
                      setItemId(option.id);
                      setQuantity(option.minQuantity);
                      setQuantityDraft(String(option.minQuantity));
                    }}
                    className="mt-1 size-4 shrink-0 accent-brand"
                  />
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <span className="font-serif font-medium">{option.name}</span>
                      <span className="font-semibold">
                        {free ? (
                          <span className="text-success">Free</span>
                        ) : (
                          usd((option.priceInCents * option.minQuantity) / 100)
                        )}
                        {option.billing === "monthly" ? (
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        ) : null}
                        {!free && option.minQuantity > 1 ? (
                          <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            for {option.minQuantity}
                          </span>
                        ) : !free && hasQuantity(option) ? (
                          <span className="text-sm font-normal text-muted-foreground"> each</span>
                        ) : null}
                      </span>
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {option.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>

      <aside ref={summaryRef} className="lg:col-span-2">
        <div
          className="flex flex-col gap-5 rounded-[24px] border border-white/10 p-6 lg:sticky lg:top-24"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.12), transparent 55%), #0A1322",
          }}
        >
          <h2 className="font-serif text-xl font-medium">Your request</h2>

          {showQuantity ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="quantity" className="text-sm">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease quantity by ${item.quantityStep}`}
                    disabled={quantity <= item.minQuantity}
                    onClick={() => updateQuantity(quantity - item.quantityStep)}
                    className={stepButton}
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    inputMode="numeric"
                    min={item.minQuantity}
                    max={item.maxQuantity}
                    step={item.quantityStep}
                    value={quantityDraft}
                    onChange={(e) => setQuantityDraft(e.target.value)}
                    onBlur={() => updateQuantity(Number(quantityDraft))}
                    className="h-9 w-20 rounded-md border border-white/15 bg-transparent text-center font-semibold tabular-nums outline-none [appearance:textfield] focus:border-[#0090F0]/60 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    aria-label={`Increase quantity by ${item.quantityStep}`}
                    disabled={quantity >= item.maxQuantity}
                    onClick={() => updateQuantity(quantity + item.quantityStep)}
                    className={stepButton}
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {summaryBlock}

          <button type="submit" className={`${PILL_PRIMARY} w-full`}>
            Continue
          </button>
        </div>
      </aside>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] pt-3 transition-transform duration-300 lg:hidden",
          summaryInView ? "translate-y-[140%]" : "translate-y-0",
        )}
        style={{ background: "rgba(5,11,22,0.96)", backdropFilter: "blur(12px)" }}
        inert={summaryInView}
      >
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs text-white/60">{item.name}</p>
            <p className="truncate font-semibold tabular-nums">{totalLabel}</p>
          </div>
          <button type="submit" className={`${PILL_PRIMARY} shrink-0 px-5 py-3`}>
            Continue
          </button>
        </div>
      </div>
    </form>
  );
}
