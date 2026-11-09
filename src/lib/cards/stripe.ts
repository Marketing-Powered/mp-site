import "server-only";
import Stripe from "stripe";

/* Server-side Stripe client for Powered Cards checkout. Created on first use
   so a deploy without STRIPE_SECRET_KEY still builds and serves every page;
   the order form shows its "checkout not available" fallback instead. */

let client: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}
