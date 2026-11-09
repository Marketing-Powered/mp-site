"use server";

import { randomUUID } from "node:crypto";
import { getStripe } from "@/lib/cards/stripe";
import { findOrderItem, hasQuantity, isValidQuantity } from "@/lib/cards/orderItems";

export type CheckoutResult = { clientSecret: string } | { error: string };

/* Creates an embedded Stripe Checkout session for one catalog item. Prices
   come from the server-side catalog, never from the client, so the browser
   can only choose what to buy and how many. Errors come back as values:
   thrown server-action errors are redacted in production, so the form
   could not tell the visitor what went wrong. */
export async function startCheckoutSession(
  itemId: string,
  requestedQuantity: number,
): Promise<CheckoutResult> {
  const item = findOrderItem(itemId);
  if (!item) return { error: "That product is not available." };

  const quantity = hasQuantity(item) ? requestedQuantity : 1;
  if (!isValidQuantity(item, quantity)) {
    return {
      error: `Quantity must be between ${item.minQuantity} and ${item.maxQuantity}, in steps of ${item.quantityStep}.`,
    };
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error("[cards] STRIPE_SECRET_KEY is not set; checkout unavailable");
    return { error: "Online checkout is not available right now." };
  }

  const isMonthly = item.billing === "monthly";

  try {
    const session = await stripe.checkout.sessions.create(
      {
        ui_mode: "embedded_page",
        redirect_on_completion: "never",
        mode: isMonthly ? "subscription" : "payment",
        billing_address_collection: "required",
        ...(isMonthly ? {} : { shipping_address_collection: { allowed_countries: ["US"] } }),
        line_items: [
          {
            quantity,
            price_data: {
              currency: "usd",
              unit_amount: item.priceInCents,
              product_data: { name: item.name, description: item.description },
              ...(isMonthly ? { recurring: { interval: "month" as const } } : {}),
            },
          },
        ],
        metadata: { itemId: item.id, quantity: String(quantity) },
      },
      { idempotencyKey: randomUUID() },
    );

    if (!session.client_secret) return { error: "Could not start checkout." };
    return { clientSecret: session.client_secret };
  } catch (err) {
    console.error("[cards] Stripe checkout session failed:", err);
    return { error: "Could not start checkout. Please try again." };
  }
}
