"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Lock, Minus, Plus } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { cn } from "@/lib/cn";
import Checkout, { CheckoutFallback, checkoutConfigured } from "./Checkout";
import { PILL_OUTLINE, PILL_PRIMARY } from "./ui";
import {
  ORDER_ITEMS,
  clampQuantity,
  findOrderItem,
  hasQuantity,
  type OrderGroup,
} from "@/lib/cards/orderItems";
import { CONTACT_EMAIL, usd } from "@/lib/cards/pricing";

type PackageType = Exclude<OrderGroup, "one_time">;

const packageTabs: { id: PackageType; label: string; legend: string; hint: string }[] = [
  {
    id: "pvc",
    label: "PVC QR cards",
    legend: "Monthly branded PVC QR cards",
    hint: "Branded QR cards customers take home, delivered every month. Cancel anytime.",
  },
  {
    id: "nfc",
    label: "NFC review cards",
    legend: "Custom NFC review card packs",
    hint: "Tap-or-scan NFC cards in your branding. One-time purchase, lower price per card on bigger packs.",
  },
];

const stepButton = `flex size-9 items-center justify-center rounded-md border border-white/15 transition-colors hover:bg-white/10 disabled:opacity-40 ${FOCUS_RING}`;

export default function OrderForm({ initialItemId }: { initialItemId: string }) {
  const [itemId, setItemId] = useState(initialItemId);
  const [packageType, setPackageType] = useState<PackageType>(() =>
    findOrderItem(initialItemId)?.group === "nfc" ? "nfc" : "pvc",
  );
  const [quantity, setQuantity] = useState(
    () => (findOrderItem(initialItemId) ?? ORDER_ITEMS[0]).minQuantity,
  );
  const [quantityDraft, setQuantityDraft] = useState(String(quantity));
  const [step, setStep] = useState<"select" | "pay" | "done">("select");

  const item = findOrderItem(itemId) ?? ORDER_ITEMS[0];
  const showQuantity = hasQuantity(item);
  const effectiveQuantity = showQuantity ? quantity : 1;

  const updateQuantity = (value: number) => {
    const next = clampQuantity(item, value);
    setQuantity(next);
    setQuantityDraft(String(next));
  };
  const total = (item.priceInCents * effectiveQuantity) / 100;
  const isMonthly = item.billing === "monthly";

  /* With no Stripe key the order goes by email instead, prefilled with the
     same selection so nothing is lost. */
  const orderMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Powered Cards order: ${item.name}`,
  )}&body=${encodeURIComponent(
    `Item: ${item.name}\nQuantity: ${effectiveQuantity}\nTotal: ${usd(total)}${
      isMonthly ? "/month" : ""
    }\n\nBusiness name:\nWhere customers should land:\n`,
  )}`;

  if (step === "done") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[24px] border border-white/10 bg-card p-8">
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="font-serif text-2xl font-medium">Thank you, your order is in.</h2>
        <p className="max-w-prose leading-relaxed text-muted-foreground">
          A receipt is on its way to your email. Our design team will reach out within one
          business day to collect your logo, colors and the link your cards should point to.
        </p>
        <Link href="/cards" prefetch={false} className={PILL_OUTLINE}>
          Back to Powered Cards
        </Link>
      </div>
    );
  }

  if (step === "pay") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-card p-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">
              {effectiveQuantity > 1 ? `${effectiveQuantity} × ` : ""}
              {item.name}
            </p>
            <p className="font-semibold">
              {usd(total)}
              {isMonthly ? "/month" : ""}
            </p>
          </div>
          <button type="button" onClick={() => setStep("select")} className={PILL_OUTLINE}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Change order
          </button>
        </div>
        <Checkout
          key={`${item.id}-${effectiveQuantity}`}
          itemId={item.id}
          quantity={effectiveQuantity}
          onComplete={() => setStep("done")}
        />
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 lg:grid-cols-5"
      onSubmit={(event) => {
        event.preventDefault();
        updateQuantity(Number(quantityDraft));
        setStep("pay");
      }}
    >
      <div className="flex flex-col gap-8 lg:col-span-3">
        {(["one_time", packageType] as const).map((groupId) => (
          <fieldset key={groupId} className="flex flex-col gap-3">
            {groupId === "one_time" ? (
              <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                One-time
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
                        {usd((option.priceInCents * option.minQuantity) / 100)}
                        {option.billing === "monthly" ? (
                          <span className="text-sm font-normal text-muted-foreground">/month</span>
                        ) : null}
                        {option.minQuantity > 1 ? (
                          <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            for {option.minQuantity}
                          </span>
                        ) : hasQuantity(option) ? (
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

      <aside className="lg:col-span-2">
        <div
          className="flex flex-col gap-5 rounded-[24px] border border-white/10 p-6 lg:sticky lg:top-24"
          style={{
            background:
              "radial-gradient(120% 100% at 0% 0%, rgba(0,144,240,0.12), transparent 55%), #0A1322",
          }}
        >
          <h2 className="font-serif text-xl font-medium">Order summary</h2>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
          </div>

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
              {item.minQuantity > 1 ? (
                <p className="text-xs text-white/60">
                  {usd(item.priceInCents / 100)} each. Minimum order {item.minQuantity}, in steps of{" "}
                  {item.quantityStep}.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
            <span className="text-sm">{isMonthly ? "Billed monthly" : "Total"}</span>
            <span className="text-2xl font-semibold">
              {usd(total)}
              {isMonthly ? <span className="text-sm font-normal text-white/60">/month</span> : null}
            </span>
          </div>

          {checkoutConfigured ? (
            <>
              <button type="submit" className={`${PILL_PRIMARY} w-full`}>
                Continue to secure checkout
              </button>
              <p className="flex items-center gap-2 text-xs text-white/60">
                <Lock className="size-3.5 shrink-0" aria-hidden="true" />
                Payments processed by Stripe.{isMonthly ? " Cancel your plan anytime." : ""}
              </p>
            </>
          ) : (
            <>
              <a href={orderMailto} className={`${PILL_PRIMARY} w-full`}>
                Email this order
              </a>
              <CheckoutFallback message="Online card payment is being set up. Send the order by email and we will confirm the design, destination and payment with you." />
            </>
          )}
        </div>
      </aside>
    </form>
  );
}
