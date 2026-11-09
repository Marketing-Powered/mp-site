"use client";

import { useCallback, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { startCheckoutSession } from "@/app/cards/order/actions";
import { CheckoutFallback } from "./checkoutStatus";

/* Embedded Stripe Checkout. This module is loaded on demand by OrderForm
   when the visitor reaches the payment step, so Stripe.js (and its cookies)
   never load while someone is only browsing the catalog. */

let stripePromise: Promise<Stripe | null> | null = null;

function getStripePromise() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  stripePromise ??= loadStripe(key);
  return stripePromise;
}

export default function Checkout({
  itemId,
  quantity,
  onComplete,
}: {
  itemId: string;
  quantity: number;
  onComplete: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [stripe] = useState(getStripePromise);

  const fetchClientSecret = useCallback(async () => {
    const result = await startCheckoutSession(itemId, quantity);
    if ("error" in result) {
      setError(result.error);
      throw new Error(result.error);
    }
    return result.clientSecret;
  }, [itemId, quantity]);

  if (!stripe) return <CheckoutFallback />;
  if (error) return <CheckoutFallback message={error} />;

  return (
    <div id="checkout" className="overflow-hidden rounded-2xl bg-white p-2">
      <EmbeddedCheckoutProvider stripe={stripe} options={{ fetchClientSecret, onComplete }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
