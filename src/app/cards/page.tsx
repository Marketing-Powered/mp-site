import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBand from "@/components/site/CtaBand";
import Hero from "@/components/cards/Hero";
import ProductLineup from "@/components/cards/ProductLineup";
import LocalSeoHeatmap from "@/components/cards/LocalSeoHeatmap";
import KitCalculator from "@/components/cards/KitCalculator";
import PriceComparison from "@/components/cards/PriceComparison";
import WhoItsFor from "@/components/cards/WhoItsFor";
import PoweredSystem from "@/components/cards/PoweredSystem";
import HowItWorks from "@/components/cards/HowItWorks";
import Compliance from "@/components/cards/Compliance";
import { CARDS_FAQ } from "@/components/cards/faq";
import { absoluteUrl } from "@/lib/site";

/* ================================================================== */
/*  Powered Cards: product page.                                        */
/*  Branded PVC QR card subscriptions, one-time NFC review cards and    */
/*  tap-or-scan stands, sold to local businesses. Pricing and copy      */
/*  live in lib/cards/pricing.ts and the components under               */
/*  components/cards; the order flow is /cards/order.                   */
/* ================================================================== */

const URL = "/cards";
const TITLE = "Powered Cards | NFC Review Cards, Stands & Monthly Branded QR Cards";
const DESCRIPTION =
  "Custom NFC review cards from 10 at $10 each (down to $7 at 50+), tap-or-scan stands $40, and monthly branded PVC QR cards from $1.50 a card (min. 100). 10 free samples for qualified businesses.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    images: [
      {
        url: "/images/pages/cards/powered-cards-hero-white.jpg",
        width: 1376,
        height: 768,
        alt: "Powered Cards: white PVC review cards, a Powered Review Stand and an NFC card tapped by a phone",
      },
    ],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CARDS_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Powered Cards",
    description: DESCRIPTION,
    image: absoluteUrl("/images/pages/cards/powered-cards-hero-white.jpg"),
    brand: { "@type": "Brand", name: "Marketing Powered" },
    url: absoluteUrl(URL),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "1.10",
      highPrice: "2750",
      offerCount: 13,
      url: absoluteUrl("/cards/order"),
    },
  },
];

export default function Page() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={`${URL}/`} current="Powered Cards" />
        <Hero />
      </section>

      <ProductLineup />
      <LocalSeoHeatmap />
      <KitCalculator />
      <PriceComparison />
      <WhoItsFor />
      <PoweredSystem />
      <HowItWorks />
      <Compliance />
      <FaqAccordion items={CARDS_FAQ} />

      <CtaBand
        headline="See your brand on a Powered Card first."
        body="Tell us how you hand things to customers today. We will send 10 branded samples to qualified businesses."
        ctaText="Request 10 free samples"
        ctaLink="/cards/order?item=samples"
        secondaryCta={{ text: "Start an order", link: "/cards/order" }}
      />
    </PageShell>
  );
}
