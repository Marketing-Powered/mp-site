/* ================================================================== */
/*  Powered Cards pricing and product catalog.                         */
/*  One source of truth for the /cards product page, the kit           */
/*  calculator, the comparison table, and the /cards/order request form. */
/*  Prices are in USD. Change them here and every surface follows.     */
/* ================================================================== */

import { siteContent } from "@/lib/content";

export type Plan = {
  id: string;
  name: string;
  cards: number;
  price: number;
  bestFor: string;
};

/* Monthly branded PVC QR card plans (subscription). */
export const PVC_MIN_CARDS = 100;

export const plans: Plan[] = [
  { id: "starter", name: "Starter", cards: 100, price: 150, bestFor: "Solo operators and small studios" },
  { id: "essential", name: "Essential", cards: 250, price: 350, bestFor: "Salons, auto and home services" },
  { id: "growth", name: "Growth", cards: 500, price: 650, bestFor: "Busy storefronts and service teams" },
  { id: "business", name: "Business", cards: 1000, price: 1200, bestFor: "Hospitality, events and high traffic" },
  { id: "enterprise", name: "Enterprise", cards: 2500, price: 2750, bestFor: "Agencies and multi-location groups" },
];

export type OneTimeProduct = {
  id: string;
  name: string;
  price: number;
  minQuantity: number;
  maxQuantity: number;
  quantityStep: number;
  description: string;
  image: string;
  imageAlt: string;
};

/* Custom NFC review cards: volume pricing from $10 a card down to $7. */
export const NFC_MIN_CARDS = 10;
export const NFC_MAX_CARDS = 2000;
export const NFC_START_PRICE = 10;
export const NFC_FLOOR_PRICE = 7;
export const NFC_FLOOR_QTY = 50;
export const STAND_PRICE = 40;

export const nfcTiers = [
  { min: 10, max: 19, price: 10 },
  { min: 20, max: 29, price: 9.25 },
  { min: 30, max: 39, price: 8.5 },
  { min: 40, max: 49, price: 7.75 },
  { min: NFC_FLOOR_QTY, max: null, price: NFC_FLOOR_PRICE },
] as const;

export const nfcUnitPrice = (quantity: number) => {
  const tier = [...nfcTiers].reverse().find((t) => quantity >= t.min) ?? nfcTiers[0];
  return Math.max(NFC_FLOOR_PRICE, tier.price);
};

export const nfcTotal = (quantity: number) =>
  Math.round(nfcUnitPrice(quantity) * quantity * 100) / 100;

export const oneTimeProducts: OneTimeProduct[] = [
  {
    id: "card",
    name: "Custom NFC review card",
    price: NFC_START_PRICE,
    minQuantity: NFC_MIN_CARDS,
    maxQuantity: NFC_MAX_CARDS,
    quantityStep: 10,
    description: "Tap-or-scan PVC review cards in your branding for owners, staff and the front desk.",
    image: "/images/pages/cards/business-card.jpg",
    imageAlt: "Custom tap-and-scan NFC review card held in hand",
  },
  {
    id: "stand",
    name: "Powered Review Stand",
    price: STAND_PRICE,
    minQuantity: 1,
    maxQuantity: 25,
    quantityStep: 1,
    description: "A permanent countertop spot where customers tap or scan to leave a review.",
    image: "/images/pages/cards/counter-stand.jpg",
    imageAlt: "Branded tap-or-scan review stand with a QR code on a checkout counter",
  },
];

export const packPrice = (product: OneTimeProduct) =>
  product.id === "card" ? nfcTotal(product.minQuantity) : product.price * product.minQuantity;

export type NfcPack = {
  id: string;
  name: string;
  cards: number;
  price: number;
  bestFor: string;
};

const nfcPackSizes = [
  { id: "nfc-10", name: "Trial", cards: 10, bestFor: "Owners and a key front-desk spot" },
  { id: "nfc-25", name: "Starter", cards: 25, bestFor: "A small front-desk team" },
  { id: "nfc-50", name: "Team", cards: 50, bestFor: "Every staff member gets their own card" },
  { id: "nfc-100", name: "Growth", cards: 100, bestFor: "Multi-chair salons, shops and crews" },
  { id: "nfc-250", name: "Business", cards: 250, bestFor: "Multi-location and franchise teams" },
  { id: "nfc-500", name: "Enterprise", cards: 500, bestFor: "Agencies and large field teams" },
];

export const nfcPacks: NfcPack[] = nfcPackSizes.map((pack) => ({
  ...pack,
  price: nfcTotal(pack.cards),
}));

export const starterBundle = {
  name: "Starter bundle",
  price: 250,
  includes: [
    "10 custom NFC review cards",
    "Powered Review Stand",
    "50 branded PVC QR cards",
    "Ongoing brand and positioning monitoring",
  ],
  note: "Below our usual minimums, so you can try every product in one order.",
};

/* Public list prices from competitor product pages, for the comparison
   table. `checked` is shown next to the table so the date is never stale
   without saying so. */
export const competitorPrices = {
  nfcCard: "$29.95",
  stand: "$29.95–$49.95",
  checked: "November 2026",
};

export const setupFrom = 49;

export const usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });

export const perCard = (plan: Plan) => Math.round((plan.price / plan.cards) * 100) / 100;

export const lowestPlan = plans[0];
export const highestPlan = plans[plans.length - 1];

/* Contact details come from the shared brand block so the number and
   inbox on the cards pages never drift from the rest of the site. */
export const CONTACT_EMAIL = siteContent.brand.email;
export const CONTACT_PHONE = siteContent.brand.phone;
export const CONTACT_TEL = siteContent.brand.phoneE164;
