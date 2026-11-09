"use client";

import { useCallback, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { startCheckoutSession } from "@/app/cards/order/actions";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL } from "@/lib/cards/pricing";

/* Embedded Stripe Checkout. The publishable key is inlined at build time;
   with none set the form never reaches this component (see OrderForm), but
   the guard stays so a direct render degrades to the contact fallback. */

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export const checkoutConfigured = Boolean(publishableKey);

export function CheckoutFallback({ message }: { message?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-card p-6 text-sm leading-relaxed text-white/70"
    >
      <p>{message ?? "Online checkout is not available right now."}</p>
      <p>
        Email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Powered Cards order")}`}
          className="text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 hover:decoration-[#7FCBFF]"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        or call{" "}
        <a href={`tel:${CONTACT_TEL}`} className="text-[#7FCBFF] hover:underline">
          {CONTACT_PHONE}
        </a>{" "}
        and we will take the order by hand.
      </p>
    </div>
  );
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

  const fetchClientSecret = useCallback(async () => {
    const result = await startCheckoutSession(itemId, quantity);
    if ("error" in result) {
      setError(result.error);
      throw new Error(result.error);
    }
    return result.clientSecret;
  }, [itemId, quantity]);

  if (!stripePromise) return <CheckoutFallback />;
  if (error) return <CheckoutFallback message={error} />;

  return (
    <div id="checkout" className="overflow-hidden rounded-2xl bg-white p-2">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret, onComplete }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
