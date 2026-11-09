/* Everything that can be requested on /cards/order, derived from the pricing
   catalog so the form never quotes a price the page does not show. The page
   takes no payment: a request lands on the Orders tab of the leads sheet and
   a person confirms design, destination and pricing before anything prints. */

import {
  NFC_MAX_CARDS,
  NFC_MIN_CARDS,
  STAND_PRICE,
  nfcPacks,
  nfcTotal,
  nfcUnitPrice,
  oneTimeProducts,
  plans,
  starterBundle,
  usd,
} from "@/lib/cards/pricing";

export type OrderGroup = "one_time" | "pvc" | "nfc";

export type OrderItem = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  billing: "one_time" | "monthly";
  group: OrderGroup;
  minQuantity: number;
  maxQuantity: number;
  quantityStep: number;
};

const fixedQuantity = { minQuantity: 1, maxQuantity: 1, quantityStep: 1 };
const count = (value: number) => value.toLocaleString("en-US");

export const SAMPLES_ITEM_ID = "samples";

export const ORDER_ITEMS: OrderItem[] = [
  {
    id: SAMPLES_ITEM_ID,
    name: "10 free sample cards",
    description:
      "Ten branded PVC QR cards in your real design, free for qualified businesses that hand out cards regularly and have a destination ready.",
    priceInCents: 0,
    billing: "one_time",
    group: "one_time",
    ...fixedQuantity,
  },
  {
    id: "bundle",
    name: starterBundle.name,
    description: starterBundle.includes.join(", "),
    priceInCents: Math.round(starterBundle.price * 100),
    billing: "one_time",
    group: "one_time",
    ...fixedQuantity,
  },
  ...oneTimeProducts
    .filter((product) => product.id !== "card")
    .map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      priceInCents: Math.round(product.price * 100),
      billing: "one_time" as const,
      group: "one_time" as const,
      minQuantity: product.minQuantity,
      maxQuantity: product.maxQuantity,
      quantityStep: product.quantityStep,
    })),
  ...plans.map((plan) => ({
    id: `plan-${plan.id}`,
    name: `${plan.name} plan: ${count(plan.cards)} branded PVC QR cards`,
    description: `${count(plan.cards)} branded PVC QR cards delivered every month. ${plan.bestFor}.`,
    priceInCents: Math.round(plan.price * 100),
    billing: "monthly" as const,
    group: "pvc" as const,
    ...fixedQuantity,
  })),
  ...nfcPacks.map((pack) => ({
    id: pack.id,
    name: `${pack.name} pack: ${count(pack.cards)} custom NFC review cards`,
    description: `${count(pack.cards)} tap-or-scan NFC cards in your branding, ${usd(
      pack.price / pack.cards,
    )} a card. ${pack.bestFor}.`,
    priceInCents: Math.round(pack.price * 100),
    billing: "one_time" as const,
    group: "nfc" as const,
    ...fixedQuantity,
  })),
];

export const DEFAULT_ORDER_ITEM = "bundle";

/* The product page links the NFC card tile with ?item=card; the Team pack is
   the pack that card is priced on. */
const ITEM_ALIASES: Record<string, string> = { card: "nfc-50" };

export const findOrderItem = (id: string | undefined) => {
  const resolved = id ? (ITEM_ALIASES[id] ?? id) : id;
  return ORDER_ITEMS.find((item) => item.id === resolved);
};

export const hasQuantity = (item: OrderItem) => item.maxQuantity > 1;

export const isValidQuantity = (item: OrderItem, quantity: number) =>
  Number.isInteger(quantity) &&
  quantity >= item.minQuantity &&
  quantity <= item.maxQuantity &&
  quantity % item.quantityStep === 0;

export const clampQuantity = (item: OrderItem, value: number) => {
  if (!Number.isFinite(value)) return item.minQuantity;
  const stepped = Math.round(value / item.quantityStep) * item.quantityStep;
  return Math.min(item.maxQuantity, Math.max(item.minQuantity, stepped));
};

/* One-time add-ons the plan calculator can attach to a plan request. */
export type OrderAddons = { stands: number; nfcCards: number };

export const NO_ADDONS: OrderAddons = { stands: 0, nfcCards: 0 };

export const MAX_ADDON_STANDS = 25;

export const clampAddons = (stands: number, nfcCards: number): OrderAddons => {
  const s = Number.isFinite(stands) ? Math.min(MAX_ADDON_STANDS, Math.max(0, Math.round(stands))) : 0;
  let n = Number.isFinite(nfcCards) ? Math.round(nfcCards) : 0;
  n = n <= 0 ? 0 : Math.min(NFC_MAX_CARDS, Math.max(NFC_MIN_CARDS, n));
  return { stands: s, nfcCards: n };
};

export const addonsTotal = (a: OrderAddons) =>
  a.stands * STAND_PRICE + (a.nfcCards > 0 ? nfcTotal(a.nfcCards) : 0);

export const addonLines = (a: OrderAddons): string[] =>
  [
    a.stands > 0 && `${a.stands} x Powered Review Stand (${usd(a.stands * STAND_PRICE)})`,
    a.nfcCards > 0 &&
      `${a.nfcCards} x NFC review card at ${usd(nfcUnitPrice(a.nfcCards))} (${usd(nfcTotal(a.nfcCards))})`,
  ].filter((line): line is string => Boolean(line));
