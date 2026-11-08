import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageShell from "@/components/site/PageShell";
import Breadcrumbs from "@/components/site/Breadcrumbs";
import StickyMobileCta from "@/components/site/StickyMobileCta";
import { serif, mono } from "@/components/site/theme";
import { Kicker, GoldRule, RichText, FOCUS_RING } from "@/components/site/ui";
import { author } from "@/lib/author";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/site";

/* ================================================================== */
/* /author/mike-hulick — the one canonical author profile.             */
/*                                                                      */
/* Order follows the production brief: name, role, author value        */
/* proposition, headshot and two links above the fold; the four-metric */
/* history strip with its disclaimer; three featured pieces; the full  */
/* biography with a sticky section index; the complete writing list;  */
/* then connect and disclosures. No carousels: credentials and          */
/* publications stay in static, readable rows on every viewport.       */
/* ================================================================== */

const URL_PATH = author.path;

export const metadata: Metadata = {
  title: author.seo.title,
  description: author.seo.description,
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: "profile",
    title: author.seo.title,
    description: author.seo.description,
    url: URL_PATH,
    siteName: SITE_NAME,
    firstName: author.givenName,
    lastName: author.familyName,
    images: [{ url: author.shareImage, width: 1200, height: 630, alt: author.imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: author.seo.title,
    description: author.seo.description,
    images: [author.shareImage],
  },
};

const PRIMARY = `group inline-flex min-h-[44px] items-center gap-3 rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.6)] transition hover:brightness-110 ${FOCUS_RING}`;
const GHOST = `group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[12px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-[#7FCBFF]/60 hover:text-[#7FCBFF] ${FOCUS_RING}`;
const LINK = `text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF] ${FOCUS_RING}`;

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/* ProfilePage + Person. The Person name matches the visible H1 form;
   sameAs points only at the author's real public profiles; worksFor is
   stated visually in the role line, so it is safe to publish here. The
   Organization node is the site-wide entity declared on the homepage. */
function AuthorJsonLd() {
  const personId = `${SITE_URL}${URL_PATH}#person`;
  const orgId = `${SITE_URL}/#organization`;
  const graph = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${URL_PATH}#profilepage`,
    url: absoluteUrl(URL_PATH),
    name: author.seo.title,
    description: author.seo.description,
    dateModified: author.updated,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@id": orgId },
    mainEntity: {
      "@type": "Person",
      "@id": personId,
      name: author.name,
      alternateName: [author.bylineName, "Michael Hulick"],
      givenName: author.givenName,
      familyName: author.familyName,
      jobTitle: author.jobTitle,
      description: author.lead,
      url: absoluteUrl(URL_PATH),
      image: {
        "@type": "ImageObject",
        url: absoluteUrl(author.image),
        width: author.imageWidth,
        height: author.imageHeight,
      },
      sameAs: [author.links.linkedin, author.links.medium],
      worksFor: { "@type": "Organization", "@id": orgId, name: SITE_NAME, url: SITE_URL },
      knowsAbout: [...author.knowsAbout],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.1]"
      style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.01em" }}
    >
      {children}
    </h2>
  );
}

function OutletTag({ outlet, kind }: { outlet: string; kind: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#0090F0]"
      style={{ fontFamily: mono }}
    >
      {outlet}
      <span className="text-white/25">/</span>
      <span className="text-white/45">{kind}</span>
    </span>
  );
}

function WritingLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={false} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export default function AuthorPage() {
  const featured = author.writing.filter((w) => w.featured);

  return (
    <PageShell>
      <AuthorJsonLd />

      {/* ---------- HERO ---------- */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-14 pt-12 lg:px-12 lg:pt-16">
        <Breadcrumbs url={`${URL_PATH}/`} current="Michael Hulick" />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Kicker>Author profile</Kicker>
            <h1
              className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.0]"
              style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
            >
              {author.displayName}
            </h1>
            <p
              className="mt-5 text-[13px] uppercase tracking-[0.2em] text-[#7FCBFF]"
              style={{ fontFamily: mono }}
            >
              {author.roleLine}
            </p>
            <p className="mt-6 max-w-xl text-[clamp(1.02rem,1.3vw,1.18rem)] leading-relaxed text-white/60">
              {author.lead}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Areas of focus">
              {author.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/65"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer me" className={PRIMARY}>
                <span>Connect on LinkedIn</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link href="/company/about" prefetch={false} className={GHOST}>
                Explore Marketing Powered
              </Link>
            </div>
          </div>

          {/* Portrait: approved professional headshot, framed in the brand gradient. */}
          <Reveal variant="blur" className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-[2px] rounded-[30px] opacity-90"
              style={{ background: "linear-gradient(140deg,#0090F0,#00A8D8 50%,#08AE67)" }}
            />
            <figure className="relative overflow-hidden rounded-[28px] bg-[#0A1322]" style={{ aspectRatio: "4 / 4.4" }}>
              <Image
                src={author.image}
                alt={author.imageAlt}
                fill
                preload
                quality={80}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 42vw"
                className="object-cover"
                style={{ objectPosition: "50% 12%" }}
              />
              <figcaption
                className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-[#050B16]/90 to-transparent px-6 pb-5 pt-14 text-[11px] uppercase tracking-[0.2em] text-white/70"
                style={{ fontFamily: mono }}
              >
                <span>{author.bylineName}</span>
                <span className="text-[#7FCBFF]">{author.jobTitle}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- HISTORY STRIP ---------- */}
      <section
        aria-labelledby="history-heading"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12"
      >
        <GoldRule />
        <h2 id="history-heading" className="sr-only">
          Selected operating history
        </h2>
        <Reveal className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: "2.5rem" }}>
          {author.metrics.map((m) => (
            <div key={m.label} className="bg-[#050B16] px-7 py-8">
              <p
                className="text-[clamp(1.6rem,2.2vw,2.15rem)] leading-none text-white"
                style={{ fontFamily: serif, fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {m.value}
              </p>
              <p
                className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#0090F0]"
                style={{ fontFamily: mono }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </Reveal>
        <p className="mt-4 text-[13px] leading-relaxed text-white/40">{author.metricsNote}</p>
      </section>

      {/* ---------- FEATURED WRITING ---------- */}
      <section aria-labelledby="featured-heading" className="relative z-10 mx-auto max-w-7xl px-6 pt-20 lg:px-12">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <Kicker>Featured writing</Kicker>
            <H2 id="featured-heading">Recent essays and analysis</H2>
          </div>
          <a href="#selected-writing" className={`hidden text-[12px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#7FCBFF] sm:inline ${FOCUS_RING}`}>
            All writing ↓
          </a>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <WritingLink
                href={w.href}
                className={`group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-[#0090F0]/50 ${FOCUS_RING}`}
              >
                <OutletTag outlet={w.outlet} kind={w.kind} />
                <h3
                  className="mt-5 text-[1.25rem] leading-snug text-[#7FCBFF]"
                  style={{ fontFamily: serif, fontWeight: 500 }}
                >
                  {w.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-white/55">{w.blurb}</p>
                <p className="mt-6 flex items-center justify-between text-[12px] uppercase tracking-[0.18em] text-white/45" style={{ fontFamily: mono }}>
                  <time dateTime={w.iso}>{w.date}</time>
                  <span className="transition-colors group-hover:text-[#7FCBFF]">
                    Read <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </p>
              </WritingLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- BIOGRAPHY ---------- */}
      <section aria-labelledby="bio-heading" className="relative z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Kicker>Biography</Kicker>
            <h2 id="bio-heading" className="text-[1.5rem] leading-tight" style={{ fontFamily: serif, fontWeight: 400 }}>
              Who he is and what he has done
            </h2>
            <nav aria-label="On this page" className="mt-7 hidden lg:block">
              <ol className="space-y-3 border-l border-white/10">
                {author.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l border-transparent pl-4 text-[13px] leading-snug text-white/50 transition-colors hover:border-[#7FCBFF] hover:text-[#7FCBFF] ${FOCUS_RING}`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#selected-writing"
                    className={`-ml-px block border-l border-transparent pl-4 text-[13px] leading-snug text-white/50 transition-colors hover:border-[#7FCBFF] hover:text-[#7FCBFF] ${FOCUS_RING}`}
                  >
                    Selected writing
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          <div className="max-w-3xl">
            {author.sections.map((s, i) => (
              <Reveal key={s.id} className={i === 0 ? "" : "mt-14 border-t border-white/8 pt-12"}>
                <H2 id={s.id}>{s.heading}</H2>
                <div className="mt-6 space-y-5">
                  {s.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className={
                        i === 0 && j === 0
                          ? "text-[1.08rem] leading-relaxed text-white/75"
                          : "text-[1.02rem] leading-relaxed text-white/65"
                      }
                    >
                      <RichText text={p} />
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SELECTED WRITING ---------- */}
      <section
        id="selected-writing"
        aria-labelledby="writing-heading"
        className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 pt-24 lg:px-12"
      >
        <Reveal>
          <Kicker>Selected writing</Kicker>
          <H2 id="writing-heading">Articles, essays, and appearances by Mike Hulick</H2>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-white/55">
            Published work in reverse chronological order. Pieces hosted on LinkedIn and Medium open on
            those platforms; dated opinions are left as published rather than silently rewritten.
          </p>
        </Reveal>
        <ol className="mt-10 border-t border-white/10">
          {author.writing.map((w, i) => (
            <Reveal as="li" key={w.title} delay={Math.min(i, 5) * 50} className="border-b border-white/10">
              <WritingLink
                href={w.href}
                className={`group grid gap-3 py-7 transition-colors md:grid-cols-[150px_1fr_auto] md:gap-8 ${FOCUS_RING}`}
              >
                <time
                  dateTime={w.iso}
                  className="text-[12px] uppercase tracking-[0.18em] text-white/40"
                  style={{ fontFamily: mono }}
                >
                  {w.date}
                </time>
                <div>
                  <OutletTag outlet={w.outlet} kind={w.kind} />
                  <h3
                    className="mt-2 text-[1.2rem] leading-snug text-white transition-colors group-hover:text-[#7FCBFF]"
                    style={{ fontFamily: serif, fontWeight: 500 }}
                  >
                    {w.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-white/55">{w.blurb}</p>
                </div>
                <span
                  className="self-center text-[12px] uppercase tracking-[0.18em] text-white/40 transition-colors group-hover:text-[#7FCBFF]"
                  style={{ fontFamily: mono }}
                >
                  {isExternal(w.href) ? "Open ↗" : "Read →"}
                </span>
              </WritingLink>
            </Reveal>
          ))}
        </ol>
        <p className="mt-5 text-[13px] leading-relaxed text-white/40">
          Profiles:{" "}
          <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer me" className={LINK}>
            LinkedIn
          </a>
          <span className="mx-2 text-[#0090F0]/50">·</span>
          <a href={author.links.medium} target="_blank" rel="noopener noreferrer me" className={LINK}>
            Medium
          </a>
          <span className="mx-2 text-[#0090F0]/50">·</span>
          <Link href="/resources" prefetch={false} className={LINK}>
            Marketing Powered resources
          </Link>
        </p>
      </section>

      {/* ---------- CONNECT ---------- */}
      <section aria-labelledby="connect-heading" className="relative z-10 px-6 pt-24 lg:px-12">
        <Reveal
          variant="blur"
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10"
          style={{
            background:
              "radial-gradient(130% 150% at 50% 0%, rgba(0,144,240,0.22), transparent 55%), radial-gradient(100% 120% at 100% 100%, rgba(8,174,103,0.16), transparent 55%), #071226",
          }}
        >
          <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
            <h2
              id="connect-heading"
              className="mx-auto max-w-3xl text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.06]"
              style={{ fontFamily: serif, fontWeight: 400 }}
            >
              {author.connect.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/60">{author.connect.body}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer me" className={PRIMARY}>
                <span>Connect on LinkedIn</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link href="/company/contact" prefetch={false} className={GHOST}>
                Request a strategic conversation
              </Link>
            </div>
            <p className="mt-6 text-[14px] text-white/45">
              Media and speaking requests:{" "}
              <Link href="/media/pitch-guidelines" prefetch={false} className={LINK}>
                pitch guidelines
              </Link>
              <span className="mx-2 text-[#0090F0]/50">·</span>
              <Link href="/media/podcast-appearances" prefetch={false} className={LINK}>
                podcast appearances
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- DISCLOSURES ---------- */}
      <section aria-labelledby="disclosures-heading" className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-14 lg:px-12">
        <h2
          id="disclosures-heading"
          className="text-[11px] uppercase tracking-[0.3em] text-white/40"
          style={{ fontFamily: mono }}
        >
          Editorial disclosures
        </h2>
        <ul className="mt-4 max-w-3xl space-y-2 text-[13px] leading-relaxed text-white/45">
          {author.disclosures.map((d) => (
            <li key={d}>{d}</li>
          ))}
          <li>
            See also the{" "}
            <Link href="/legal/advertising-disclaimer" prefetch={false} className={LINK}>
              advertising disclaimer
            </Link>{" "}
            and{" "}
            <Link href="/company/ai-systems-policy" prefetch={false} className={LINK}>
              AI systems policy
            </Link>
            . Profile reviewed {author.updated}.
          </li>
        </ul>
      </section>

      <StickyMobileCta href="/company/contact" label="Strategy call" />
    </PageShell>
  );
}
