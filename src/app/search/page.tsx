import type { Metadata } from "next";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBand from "@/components/site/CtaBand";
import { Kicker, GoldRule } from "@/components/site/ui";
import { serif } from "@/components/site/theme";
import { SITE_URL } from "@/lib/site";
import SiteSearch from "./SiteSearch";

const URL = "/search/";

export const metadata: Metadata = {
  title: "Functional Site Search - Marketing Powered",
  description: "Quickly search Marketing Powered's site for services, resources, and more.",
  alternates: { canonical: URL },
  robots: { index: false, follow: true },
};

const FAQ = [
  {
    q: "How do I search for specific services?",
    a: "Enter the service name or a related keyword in the search field. Terms like \"paid media,\" \"SEO,\" or \"web development\" will return the relevant service pages. You can also search by outcome, such as \"lead generation\" or \"attribution,\" to find services that address that goal.",
  },
  {
    q: "What if the search tool doesn't find what I'm looking for?",
    a: "Try simplifying your search to one or two keywords, checking spelling, or using a synonym. If you still cannot find what you need, reach out through our contact page. Our team can point you to the right resource or answer your question directly.",
  },
  {
    q: "Can I use the search tool on mobile devices?",
    a: "Yes. The search tool works on mobile browsers the same way it works on desktop. Tap the search field, enter your term, and review results. The interface adapts to your screen size for easy reading and navigation.",
  },
  {
    q: "Why is a search tool important for a website?",
    a: "Search tools let visitors find specific information without navigating through multiple menus. For a site with services, resources, case studies, and educational content, search provides a faster path to the exact page a user needs, improving the overall experience.",
  },
];

function Prose({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="relative z-10 mx-auto max-w-3xl px-6 py-10 lg:px-12">
      <h2
        className="text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.1]"
        style={{ fontFamily: serif, fontWeight: 400 }}
      >
        {heading}
      </h2>
      <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-white/60">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Marketing Powered",
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/search/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={URL} current="Search" />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Site Search</Kicker>
          </div>
          <h1
            className="text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Search Our Site for Resources and Services
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Find the information you need across our services, resources, and insights.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-12">
        <SiteSearch />
      </section>

      <div className="mx-auto max-w-3xl px-6 py-8 lg:px-12">
        <GoldRule />
      </div>

      <Prose heading="How to Use Our Search Tool">
        <p>
          Enter your search term in the field above. The tool scans page titles and sections across
          the entire Marketing Powered site to surface relevant results. For best results, use
          specific terms related to what you need — searching for &ldquo;paid media&rdquo; returns our
          services pages, while &ldquo;case studies&rdquo; surfaces our results and client work.
        </p>
        <p>
          You can also search by service type, industry vertical, or specific marketing challenge.
          The more precise your search term, the more targeted your results will be.
        </p>
      </Prose>

      <Prose heading="Troubleshooting Common Issues">
        <p>
          If your search returns no results, try simplifying your query. Use one or two keywords
          instead of a full phrase — search &ldquo;web&rdquo; instead of &ldquo;web development
          services&rdquo; to broaden your results, then refine from there. Check your spelling if the
          results seem off, since the tool matches on terms in page titles and paths.
        </p>
        <p>
          If you are searching for a very specific topic and not finding it, the content may live
          under a different term than you expect. Try synonyms or related phrases, or browse the main
          services and resources sections directly. Still not finding what you need? Our team is happy
          to point you in the right direction.
        </p>
      </Prose>

      <FaqAccordion items={FAQ} />

      <CtaBand
        headline="Need help finding something specific?"
        body="Some questions are better answered by a person than a search bar. Book a call to speak with someone who understands behavioral health and mental health marketing, explore services, or get pointed in the right direction."
        ctaText="Book a Call"
        ctaLink="/get-started/book-a-call/"
        secondaryCta={{ text: "Contact Us", link: "/company/contact/" }}
      />
    </PageShell>
  );
}
