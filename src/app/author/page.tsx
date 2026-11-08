import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import CtaBand from "@/components/site/CtaBand";
import { serif, mono } from "@/components/site/theme";
import { Kicker, FOCUS_RING } from "@/components/site/ui";
import { author } from "@/lib/author";

/* /author — index of bylined contributors. One profile today; the list
   is the breadcrumb parent every author link routes through. */

export const metadata: Metadata = {
  title: "Authors | Marketing Powered",
  description:
    "The people who write for Marketing Powered. Each author profile explains who they are, what they have done, and where readers can verify it.",
  alternates: { canonical: "/author" },
  openGraph: {
    type: "website",
    title: "Authors | Marketing Powered",
    description:
      "The people who write for Marketing Powered. Each author profile explains who they are, what they have done, and where readers can verify it.",
    url: "/author",
  },
};

const AUTHORS = [author];

export default function AuthorsPage() {
  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url="/author/" current="Authors" />
        <div className="mt-8 max-w-3xl">
          <Kicker>Authors</Kicker>
          <h1
            className="text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.0]"
            style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Who writes for Marketing Powered
          </h1>
          <p className="mt-7 max-w-2xl text-[clamp(1rem,1.3vw,1.18rem)] leading-relaxed text-white/55">
            Every bylined article on this site links to a single author profile. A profile should answer three
            questions: who is this person, what have they actually done, and where can you verify it.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-10 lg:px-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {AUTHORS.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 70}>
              <Link
                href={a.path}
                prefetch={false}
                className={`group flex h-full gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-[#0090F0]/40 ${FOCUS_RING}`}
              >
                <span className="relative block h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="96px"
                    quality={72}
                    className="object-cover"
                    style={{ objectPosition: "50% 15%" }}
                  />
                </span>
                <span className="min-w-0">
                  <span
                    className="block text-[1.35rem] leading-snug text-[#7FCBFF]"
                    style={{ fontFamily: serif, fontWeight: 500 }}
                  >
                    {a.displayName}
                  </span>
                  <span
                    className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-white/45"
                    style={{ fontFamily: mono }}
                  >
                    {a.roleLine}
                  </span>
                  <span className="mt-3 block text-[0.95rem] leading-relaxed text-white/55">{a.lead}</span>
                  <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/45 transition-colors group-hover:text-[#7FCBFF]">
                    View profile
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand
        headline="Want our perspective on your marketing?"
        body="Request a free audit of your paid media, landing pages, attribution, and measurement setup, or send the business problem and we will start there."
      />
    </PageShell>
  );
}
