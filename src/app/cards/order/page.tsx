import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { Kicker } from "@/components/site/ui";
import OrderForm from "@/components/cards/OrderForm";
import { DEFAULT_ORDER_ITEM, clampAddons, findOrderItem } from "@/lib/cards/orderItems";

/* Powered Cards order request page: pick what you need, then tell us about
   the business. No payment is taken; the request lands on the Orders tab of
   the leads sheet and a person follows up. Transactional, so it stays out
   of the index like the other utility pages (lib/links NOINDEX + metadata).

   Rendered on the server per request so the selection carried over from the
   product page (?item=, plus ?stands= and ?nfc= from the plan calculator) is
   already chosen in the HTML. */

const URL = "/cards/order";
const TITLE = "Order Powered Cards | Marketing Powered";
const DESCRIPTION =
  "Request custom NFC review cards, tap-or-scan stands, the $250 starter bundle, a monthly branded PVC QR card plan or 10 free sample cards. No payment until you approve a proof.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ item?: string; stands?: string; nfc?: string }>;
}) {
  const { item, stands, nfc } = await searchParams;
  const initialItemId = findOrderItem(item)?.id ?? DEFAULT_ORDER_ITEM;
  const initialAddons = clampAddons(Number(stands ?? 0), Number(nfc ?? 0));

  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={`${URL}/`} current="Order" />
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/cards#products"
            prefetch={false}
            className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to products
          </Link>
          <Kicker>Powered Cards</Kicker>
          <h1
            className="font-serif text-[clamp(2.1rem,4.4vw,3.6rem)] font-normal leading-[1.02] text-balance"
            style={{ letterSpacing: "-0.02em" }}
          >
            Start your order
          </h1>
          <p className="max-w-prose leading-relaxed text-white/55 text-pretty">
            Pick what you need and tell us where to send it. There is no payment on this page: we
            reach out within one business day to confirm your design, where the cards should point
            and the final pricing. Nothing prints until you approve a proof.
          </p>
        </div>
        <div className="mt-10">
          <OrderForm initialItemId={initialItemId} initialAddons={initialAddons} />
        </div>
      </section>
    </PageShell>
  );
}
