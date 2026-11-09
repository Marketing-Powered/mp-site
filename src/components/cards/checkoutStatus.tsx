import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL } from "@/lib/cards/pricing";

/* Checkout availability and the no-checkout fallback, kept apart from
   Checkout.tsx so the order form can read them without pulling Stripe into
   its bundle. The publishable key is inlined at build time. */

export const checkoutConfigured = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const linkCls =
  "text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 hover:decoration-[#7FCBFF]";

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
          className={linkCls}
        >
          {CONTACT_EMAIL}
        </a>{" "}
        or call{" "}
        <a href={`tel:${CONTACT_TEL}`} className={linkCls}>
          {CONTACT_PHONE}
        </a>{" "}
        and we will take the order by hand.
      </p>
    </div>
  );
}
