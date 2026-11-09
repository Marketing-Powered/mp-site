import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import { Kicker } from "@/components/site/ui";
import OrderForm from "@/components/cards/OrderForm";
import { DEFAULT_ORDER_ITEM, findOrderItem } from "@/lib/cards/orderItems";

/* Powered Cards order page: pick an item, then pay through embedded Stripe
   Checkout. Transactional, so it stays out of the index like the other
   utility pages (robots in lib/links NOINDEX + the metadata below).

   Rendered on the server per request so the preselected item (?item= from
   the product tiles) is already chosen in the HTML: a visitor on a slow
   phone sees the right selection at first paint instead of a skeleton. */

const URL = "/cards/order";
const TITLE = "Order Powered Cards | Marketing Powered";
const DESCRIPTION =
  "Order custom NFC review cards, tap-or-scan stands, the $250 starter bundle or a monthly branded PVC QR card plan.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item } = await searchParams;
  const initialItemId = findOrderItem(item)?.id ?? DEFAULT_ORDER_ITEM;

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
            Place your order
          </h1>
          <p className="max-w-prose leading-relaxed text-white/55 text-pretty">
            Pick what you need, then check out securely. After payment our team contacts you to
            finalize your design and review link before anything is printed.
          </p>
        </div>
        <div className="mt-10">
          <OrderForm initialItemId={initialItemId} />
        </div>
      </section>
    </PageShell>
  );
}
