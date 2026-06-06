import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import { getPage, pageMetadata } from "@/lib/pages";
import { serif, mono } from "@/components/site/theme";
import { RichText, PrimaryCta, GhostCta, GoldRule } from "@/components/site/ui";

const FILE = "get-started/thanks.md";
export const metadata = pageMetadata(FILE);

export default function Page() {
  const page = getPage(FILE);

  return (
    <PageShell>
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center lg:px-12">
        <Reveal variant="blur">
          <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-[#0090F0]/40 bg-[#0090F0]/10 text-2xl text-[#7FCBFF]">
            ✓
          </div>
          <p
            className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
            style={{ fontFamily: mono }}
          >
            Request Received
          </p>
          <h1
            className="text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[1.04]"
            style={{ fontFamily: serif, fontWeight: 400 }}
          >
            {page.h1}
          </h1>
          {page.lead && (
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/55">{page.lead}</p>
          )}
        </Reveal>

        <div className="mx-auto my-12 max-w-xs">
          <GoldRule />
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 text-left sm:grid-cols-2">
          {page.sections.slice(0, 4).map((sec, i) => {
            const para = sec.nodes.find((n) => n.type === "paragraph");
            if (!sec.heading || !para || para.type !== "paragraph") return null;
            return (
              <Reveal
                key={i}
                delay={i * 80}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <h2
                  className="text-[1.05rem] text-[#7FCBFF]"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  {sec.heading}
                </h2>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/50">
                  <RichText text={para.text} />
                </p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta href="/services/">Explore Our Services</PrimaryCta>
          <GhostCta href="/">Back to Home</GhostCta>
        </div>
      </section>
    </PageShell>
  );
}
