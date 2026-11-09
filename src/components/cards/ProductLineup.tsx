import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FOCUS_RING } from "@/components/site/ui";
import { CardsSection, SectionIntro } from "./ui";
import {
  highestPlan,
  lowestPlan,
  NFC_FLOOR_PRICE,
  NFC_FLOOR_QTY,
  oneTimeProducts,
  packPrice,
  perCard,
  starterBundle,
  usd,
} from "@/lib/cards/pricing";

const orderHref = (item: string) => `/cards/order?item=${item}`;
const cardLink = `group rounded-2xl transition ${FOCUS_RING}`;

export default function ProductLineup() {
  return (
    <CardsSection id="products" tone="band" labelledBy="products-title">
      <div className="flex flex-col gap-10">
        <SectionIntro
          id="products-title"
          kicker="The lineup"
          title="Win the review with a tap. Keep it coming with cards they take home."
          body="Buy the tap card and stand once, at prices below the big online sellers. Subscribe only to the branded cards that actually leave your business with customers."
        />

        <div className="grid gap-4 lg:grid-cols-5">
          <Link
            href={orderHref("plan-starter")}
            prefetch={false}
            className={`${cardLink} flex flex-col overflow-hidden border border-white/10 bg-card hover:border-[#0090F0]/60 lg:col-span-3`}
          >
            <Image
              src="/images/pages/cards/pvc-handouts.jpg"
              alt="An open shipping box of banded, auto-detailing-branded QR handout cards with a monthly replenishment packing slip"
              width={1408}
              height={768}
              quality={72}
              className="aspect-[16/9] w-full object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
            <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#0090F0]">
                Monthly subscription
              </p>
              <h3 className="font-serif text-2xl font-medium">Branded PVC QR cards</h3>
              <p className="leading-relaxed text-white/65">
                Durable wallet-size cards designed around your logo and colors, pointed at your
                Google review page or any link you choose, and refilled every month from{" "}
                {lowestPlan.cards} to {highestPlan.cards.toLocaleString("en-US")} cards. The more
                you order, the less each card costs.
              </p>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                <p className="flex flex-col">
                  <span>
                    <span className="text-3xl font-semibold">{usd(perCard(lowestPlan))}</span>
                    <span className="text-white/60"> a card</span>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Min. {lowestPlan.cards} a month, down to {usd(perCard(highestPlan))} at{" "}
                    {highestPlan.cards.toLocaleString("en-US")}
                  </span>
                </p>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0090F0] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition group-hover:brightness-110">
                  Choose a plan
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {oneTimeProducts.map((product) => (
              <Link
                key={product.id}
                href={orderHref(product.id)}
                prefetch={false}
                className={`${cardLink} flex flex-1 gap-4 border border-white/10 bg-card p-4 hover:border-[#0090F0]/60`}
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={256}
                  height={256}
                  quality={72}
                  className="size-28 shrink-0 rounded-xl object-cover md:size-32"
                  sizes="128px"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                    One-time
                  </p>
                  <h3 className="font-serif text-lg font-medium">{product.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-1">
                    {product.minQuantity > 1 ? (
                      <p className="flex flex-col">
                        <span className="text-xl font-semibold">
                          {usd(packPrice(product))}
                          <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            for {product.minQuantity} cards
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {usd(product.price)} a card, down to {usd(NFC_FLOOR_PRICE)} at{" "}
                          {NFC_FLOOR_QTY}+
                        </span>
                      </p>
                    ) : (
                      <p className="text-xl font-semibold">{usd(product.price)}</p>
                    )}
                    <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                      Order
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <Link
              href={orderHref("bundle")}
              prefetch={false}
              className={`${cardLink} flex flex-col gap-3 border border-[#0090F0]/60 bg-card p-5 hover:bg-[#0090F0]/5`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-lg font-medium">{starterBundle.name}</h3>
                <p className="text-xl font-semibold">{usd(starterBundle.price)}</p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {starterBundle.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-white/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs leading-relaxed text-muted-foreground">{starterBundle.note}</p>
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0090F0] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition group-hover:brightness-110">
                Order the starter bundle
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </CardsSection>
  );
}
