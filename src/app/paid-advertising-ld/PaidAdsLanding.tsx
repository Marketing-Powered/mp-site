"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ModalCta } from "@/components/site/LeadModal";

/* ================================================================== */
/*  /paid-advertising-ld — locked paid-traffic landing page           */
/*                                                                    */
/*  Built from the "Paid Ads & Local SEO" design handoff. Locked:     */
/*  no site navigation, no logo link, no secondary offers. Every CTA  */
/*  opens the site's contact form (the shared lead modal) rather than */
/*  navigating away.                                                  */
/*                                                                    */
/*  Type is the site's own: Manrope for body, Fraunces for display,   */
/*  Space Mono for the small technical labels, in place of the        */
/*  reference file's system-ui / Georgia / ui-monospace stacks.       */
/* ================================================================== */

/* The contact form the CTAs open. The href is kept real so middle-click,
   new-tab and no-JS visitors still reach the full-page form; ModalCta
   intercepts the plain left-click and pops the modal instead. */
const CTA_HREF = "/company/contact";

/* Campaign attribution carried from the landing URL onto the CTA href, so
   paid click IDs survive the hop for anyone who lands on the full page
   instead of the modal. */
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

function useCtaHref() {
  const params = useSearchParams();
  const carried = new URLSearchParams();
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) carried.set(key, value);
  }
  const qs = carried.toString();
  return qs ? `${CTA_HREF}?${qs}` : CTA_HREF;
}

function Cta({ outline = false, href }: { outline?: boolean; href: string }) {
  return (
    <ModalCta href={href} className={outline ? "pald-btn pald-btn-outline" : "pald-btn"}>
      Schedule a consult today{" "}
      <span className="pald-arrow" aria-hidden="true">
        ↗
      </span>
    </ModalCta>
  );
}

/* ---------------------------------------------------------------- */
/*  Brand marks (15×15, decorative)                                  */
/* ---------------------------------------------------------------- */

function PinMark() {
  return (
    <svg className="pald-logo" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#EA4335" }}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg className="pald-logo" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#4285F4" }}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  );
}

function MetaMark() {
  return (
    <svg className="pald-logo" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#0866FF" }}>
      <path
        fill="currentColor"
        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
      />
    </svg>
  );
}

function MicrosoftMark() {
  return (
    <svg className="pald-logo" viewBox="0 0 21 21" aria-hidden="true">
      <rect width="10" height="10" fill="#F25022" />
      <rect x="11" width="10" height="10" fill="#7FBA00" />
      <rect y="11" width="10" height="10" fill="#00A4EF" />
      <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function OpenAiMark() {
  return (
    <svg className="pald-logo" viewBox="0 0 24 24" aria-hidden="true" style={{ color: "#fff" }}>
      <path
        fill="currentColor"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Heatmap video — ambient, infinite, no controls                   */
/* ---------------------------------------------------------------- */

function HeatmapVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);

  // Mobile browsers routinely refuse a cold autoplay. Force the properties
  // (not just the attributes), retry on the readiness events, restart if the
  // native loop point is ever missed, and unlock on the first interaction.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.autoplay = true;

    const play = () => {
      if (document.hidden) return;
      void v.play().catch(() => {});
    };
    const onEnded = () => {
      v.currentTime = 0;
      play();
    };
    const onVisibility = () => {
      if (!document.hidden) play();
    };

    v.addEventListener("ended", onEnded);
    v.addEventListener("canplay", play);
    v.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", onVisibility);
    const unlockEvents = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    unlockEvents.forEach((ev) => window.addEventListener(ev, play, { once: true, passive: true }));
    if (v.readyState >= 2) play();

    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("canplay", play);
      v.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVisibility);
      unlockEvents.forEach((ev) => window.removeEventListener(ev, play));
    };
  }, []);

  return (
    <video
      ref={ref}
      className="pald-heat"
      width={1082}
      height={966}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      preload="auto"
      poster="/media/paid-advertising-ld/local-rank-heatmap-poster.jpg"
      src="/media/paid-advertising-ld/local-rank-heatmap.mp4"
      aria-label="Local rank-tracking heatmap improving from December 1 to December 13, 2023"
    />
  );
}

/* ---------------------------------------------------------------- */

const CHANNELS = [
  {
    cls: "pald-c-google",
    title: "Google Ads",
    body: "Put your offer in front of people already searching for your services. Manage search terms, bids, and landing pages around qualified inquiries.",
  },
  {
    cls: "pald-c-meta",
    title: "Meta Ads",
    body: "Test offers and creative on Facebook and Instagram. Judge each test by inquiry quality, using targeting and measurement the platform permits.",
  },
  {
    cls: "pald-c-ms",
    title: "Microsoft Ads",
    body: "Test Microsoft search separately so you can see whether it adds qualified inquiries at a cost that makes sense.",
  },
  {
    cls: "pald-c-local",
    title: "Local SEO",
    body: "Improve Google Business Profiles, listings, reviews, and location pages. Report Maps visibility separately from organic website performance.",
  },
  {
    cls: "pald-c-openai",
    title: "ChatGPT Ads by OpenAI",
    body: "Assess category, market, and advertiser eligibility. Plan a measured pilot only where permitted and approved. Healthcare advertising is restricted.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Inspect your ad accounts",
    body: "Google, Meta, and Microsoft: campaign structure, spend, search terms, and policy exposure.",
  },
  {
    num: "02",
    title: "Follow the spend to the landing page",
    body: "Check ad-to-page relevance, conversion friction, and where paid inquiries stall.",
  },
  {
    num: "03",
    title: "Test what happens after the click",
    body: "Check calls, forms, and booking paths. Get three prioritized actions in writing.",
  },
];

const FAQS = [
  {
    q: "Do we need all five services?",
    a: "No. Start with the service, location, and business goal. If a channel can’t answer a clear business question, it doesn’t need a budget yet.",
  },
  {
    q: "Can you report beyond clicks and form fills?",
    a: "Where authorized records support it, we connect acquisition to qualified calls, bookings, or admissions. If the data stops at the inquiry, we tell you instead of treating an estimate as a result.",
  },
  {
    q: "Can every business run ChatGPT Ads?",
    a: "No. Eligibility varies by advertiser, category, and market. OpenAI restricts healthcare advertising and may allow select US healthcare advertisers on a case-by-case basis. We check fit before proposing a campaign.",
  },
  {
    q: "Is the first review a full ad-account audit?",
    a: "No. The starting offer is a paid ads and acquisition audit — your ad accounts and the paths your paid traffic reaches. Deeper tracking or intake work is scoped separately based on what your team needs.",
  },
];

export default function PaidAdsLanding() {
  const ctaHref = useCtaHref();

  return (
    <div className="pald">
      <style>{PALD_CSS}</style>

      <a className="pald-skip" href="#main">
        Skip to content
      </a>

      <header className="pald-top">
        <div className="pald-wrap">
          {/* Locked page: the logo is presence, not a link home. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pald-brand-logo"
            src="/brand/marketing-powered-logo-reverse.svg"
            alt="Marketing Powered"
            width={1920}
            height={625}
          />
          <Cta outline href={ctaHref} />
        </div>
      </header>

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className="pald-hero" aria-labelledby="pald-headline">
          <div className="pald-wrap pald-hero-grid">
            <div>
              <p className="pald-eyebrow">Paid ads management + local SEO</p>
              <h1 id="pald-headline">
                {/* The space before each break keeps the words apart in the
                    mid-width band where the break itself is suppressed. */}
                Maximize your paid{" "}
                <br />
                ads and free SEO{" "}
                <br />
                leads, <em>FAST.</em>
              </h1>
              <p className="pald-lede">
                We run Google Ads, Meta Ads, Microsoft Ads, and local SEO as one system built to
                fill your calendar — and to prove it. We assess OpenAI’s ChatGPT Ads for fit before
                recommending a test.
              </p>
              <div className="pald-hero-actions">
                <Cta href={ctaHref} />
                <p className="pald-hint">
                  For healthcare, professional services, and multi-location businesses.
                </p>
              </div>
            </div>

            <figure className="pald-signal">
              <figcaption>
                <strong>The acquisition path</strong>
                <span>From channel to outcome</span>
              </figcaption>

              <p className="pald-trace-label">Where demand starts</p>
              <div className="pald-localseo">
                <div className="pald-source pald-seo">
                  <PinMark />
                  Local SEO &amp; Maps
                </div>
                <HeatmapVideo />
              </div>

              <p className="pald-trace-label">Paid channels</p>
              <div className="pald-sources">
                <div className="pald-source">
                  <GoogleMark />
                  Google Ads
                </div>
                <div className="pald-source">
                  <MetaMark />
                  Meta Ads
                </div>
                <div className="pald-source">
                  <MicrosoftMark />
                  Microsoft Ads
                </div>
                <div className="pald-source">
                  <OpenAiMark />
                  ChatGPT Ads*
                </div>
              </div>

              <div className="pald-close">
                <span className="pald-close-kicker">The only outcome that counts</span>
                <strong>Close the lead</strong>
                <small>Calls answered · Forms worked · Intake booked</small>
              </div>

              <p className="pald-signal-note">
                *Subject to eligibility and approval. Lead tracking depends on authorized, available
                data.
              </p>
            </figure>
          </div>
        </section>

        {/* ---------------- Proof bar ---------------- */}
        <aside className="pald-proof" aria-label="Founder experience">
          <div className="pald-wrap">
            <div className="pald-proof-intro">
              <div className="pald-eyebrow">Experience in the CMO seat</div>
              <p>
                Mike Hulick’s tenure as CMO of Haven Health Management — not agency client results.
              </p>
            </div>
            <div className="pald-stat">
              <strong>$1.5M–$2M</strong>
              <span>in monthly paid-media investment directed</span>
            </div>
            <div className="pald-stat">
              <strong>3 → 24</strong>
              <span>facilities across 9 states in 4.5 years</span>
            </div>
            <div className="pald-stat">
              <strong>$30M → $140M</strong>
              <span>enterprise ARR over the same tenure</span>
            </div>
          </div>
        </aside>

        {/* ---------------- Channels & services ---------------- */}
        <section className="pald-light pald-block" aria-labelledby="pald-channels">
          <div className="pald-wrap">
            <div className="pald-section-head">
              <div>
                <p className="pald-eyebrow">Channels &amp; services</p>
                <h2 id="pald-channels">
                  Beat the competition, on <em className="pald-emphasis">EVERY</em> channel.
                </h2>
              </div>
              <p>
                Start with the locations and services that can take on more business, then fund the
                channels where you can win the click and the call.
              </p>
            </div>
            <div className="pald-channels">
              {CHANNELS.map((c) => (
                <article key={c.title} className={`pald-channel ${c.cls}`}>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Audit offer ---------------- */}
        <section className="pald-audit pald-block" aria-labelledby="pald-audit">
          <div className="pald-wrap pald-audit-grid">
            <div>
              <p className="pald-eyebrow">Where we start</p>
              <h2 id="pald-audit">Before you spend more on ads, find what’s costing you.</h2>
              <p className="pald-lede pald-audit-lede">
                Start with a paid ads and acquisition audit. We inspect your Google Ads, Meta Ads,
                and Microsoft Ads accounts — structure, spend, search terms, and policy exposure —
                then trace what your paid traffic actually reaches.
              </p>
              <Cta href={ctaHref} />
              <p className="pald-hint">Opens the Marketing Powered contact form.</p>
            </div>
            <ol className="pald-steps">
              {STEPS.map((s) => (
                <li key={s.num}>
                  <span className="pald-num" aria-hidden="true">
                    {s.num}
                  </span>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="pald-light pald-block pald-faq" aria-labelledby="pald-questions">
          <div className="pald-wrap">
            <p className="pald-eyebrow">Before you start</p>
            <h2 id="pald-questions">Straight answers.</h2>
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------- Closing CTA ---------------- */}
        <section className="pald-closing pald-block" aria-labelledby="pald-closing">
          <div className="pald-wrap">
            <p className="pald-eyebrow">Your next budget decision</p>
            <h2 id="pald-closing">Find out what to fix first.</h2>
            <p>
              Bring us one priority service and one market. We’ll start with what customers see and
              how they reach you.
            </p>
            <Cta href={ctaHref} />
          </div>
        </section>
      </main>

      <footer className="pald-foot">
        <div className="pald-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pald-brand-logo"
            src="/brand/marketing-powered-logo-reverse.svg"
            alt="Marketing Powered"
            width={1920}
            height={625}
          />
          <p>Marketing Powered is an independent agency.</p>
        </div>
      </footer>
    </div>
  );
}

/* Scoped to .pald — the page is a self-contained dark surface that shares
   nothing with the site chrome, so its literal values live here rather than
   becoming site-wide tokens. */
const PALD_CSS = `
body:has(.pald){background:#071424}
.pald{
  --navy:#071424;--panel:#0c1e30;--line:#253b50;--white:#f4f8fc;--mist:#b7c8d9;
  --cyan:#59cffb;--ink:#102339;--paper:#f0f6fb;
  --body:var(--font-manrope),system-ui,-apple-system,"Segoe UI",sans-serif;
  --display:var(--font-fraunces),Georgia,"Times New Roman",serif;
  --mono:var(--font-space-mono),ui-monospace,monospace;
  background:var(--navy);color:var(--white);font:16px/1.63 var(--body);
}
.pald h1,.pald h2,.pald h3,.pald p,.pald figure{margin:0}
.pald a{color:inherit}
.pald svg{display:block}
.pald-wrap{max-width:1248px;margin:auto;padding:0 40px}
.pald-skip{position:fixed;top:10px;left:10px;transform:translateY(-200%);z-index:10;background:var(--white);color:var(--ink);padding:12px;text-decoration:none}
.pald-skip:focus{transform:none}
.pald :focus-visible{outline:3px solid #1a91cc;outline-offset:5px}
.pald-top{border-bottom:1px solid var(--line)}
.pald-top .pald-wrap,.pald-foot .pald-wrap{display:flex;align-items:center;justify-content:space-between;gap:20px}
.pald-top .pald-wrap{min-height:88px}
.pald-brand-logo{height:38px;width:auto;aspect-ratio:1920/625;display:block}
.pald-btn{display:inline-flex;align-items:center;justify-content:center;gap:14px;background:var(--cyan);color:#051b2a;border:1px solid var(--cyan);border-radius:999px;text-decoration:none;font-size:15px;font-weight:750;padding:14px 23px;line-height:1.35;min-height:50px;transition:background .18s,border-color .18s;white-space:nowrap;cursor:pointer}
.pald-btn:hover{background:#aeebff;border-color:#aeebff}
.pald-btn-outline{background:transparent;border-color:#567388;color:var(--white);padding:11px 19px;min-height:44px;font-size:13px}
.pald-btn-outline:hover{background:var(--panel);border-color:var(--cyan)}
.pald-arrow{font-size:18px;line-height:1}
.pald-hero{background:radial-gradient(ellipse at 88% 14%,#112e47 0%,var(--navy) 61%)}
.pald-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding-top:75px;padding-bottom:75px}
.pald-eyebrow{color:var(--cyan);font-size:11px;line-height:1.35;font-weight:800;letter-spacing:.15em;text-transform:uppercase}
.pald-hero .pald-eyebrow{display:flex;align-items:center;gap:10px}
.pald-hero .pald-eyebrow::before{content:"";width:22px;height:2px;background:var(--cyan)}
.pald h1,.pald h2{font-family:var(--display);font-weight:400;line-height:1.04;letter-spacing:-.047em}
.pald h1{font-size:clamp(46px,4.6vw,68px);margin:20px 0}
.pald h1 em{font-style:normal;color:var(--cyan)}
.pald h2{font-size:clamp(36px,4.15vw,61px)}
.pald-lede{color:var(--mist);font-size:18px;max-width:52ch}
.pald-hero-actions{margin-top:29px}
.pald-hint{font-size:13px;color:var(--mist);margin-top:12px}
.pald-signal{padding:24px;border:1px solid #36556e;border-radius:24px;background:linear-gradient(150deg,#142d44,#0b1b2b 75%);box-shadow:0 24px 65px #02091355}
.pald-signal figcaption{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-bottom:16px;border-bottom:1px solid #375067}
.pald-signal figcaption strong{font-size:14px}
.pald-signal figcaption span{color:#c0d4e4;font:10px/1.35 var(--mono);text-align:right;letter-spacing:.1em;text-transform:uppercase}
.pald-trace-label{text-transform:uppercase;color:#b1cee2;font-size:10px;letter-spacing:.13em;font-weight:750;margin:17px 0 10px}
.pald-localseo{display:grid;gap:8px}
.pald-heat{width:100%;height:auto;border-radius:10px;border:1px solid #334d64;display:block}
.pald-sources{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.pald-source{min-width:0;border:1px solid #334d64;border-radius:8px;padding:8px 9px;font-size:12px;font-weight:700;display:flex;align-items:center;gap:7px;background:#13293e}
.pald-source.pald-seo{grid-column:1/-1;padding-block:10px}
.pald-logo{width:15px;height:15px;flex:none}
.pald-close{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:7px;padding:26px 18px 24px;border-radius:14px;border:1px solid #7ee0ff;background:radial-gradient(ellipse at 50% 118%,#2ba7d9 0%,#13445f 52%,#0a1d2e 100%);box-shadow:0 0 0 1px #59cffb33,0 0 34px #59cffb3d,0 18px 40px #02091380;margin-top:17px}
.pald-close::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 8%,#bdf0ff3d,transparent 62%);pointer-events:none}
.pald-close::after{content:"";position:absolute;left:24%;right:24%;top:0;height:2px;background:linear-gradient(90deg,#59cffb00,#bdf0ff,#59cffb00)}
.pald-close-kicker{position:relative;text-transform:uppercase;font-size:9px;letter-spacing:.2em;color:#a9e6ff;font-weight:800}
.pald-close strong{position:relative;font-family:var(--display);font-weight:400;font-size:34px;line-height:.98;letter-spacing:-.045em;color:#fff;text-shadow:0 2px 22px #59cffb66}
.pald-close small{position:relative;font-size:11px;font-weight:600;color:#cbe6f5;letter-spacing:.015em}
.pald-signal-note{color:var(--mist);font-size:11px;margin-top:14px}
.pald-proof{border-block:1px solid var(--line);background:#0b1a2a}
.pald-proof .pald-wrap{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;align-items:stretch}
.pald-proof-intro,.pald-stat{padding:23px 22px}
.pald-proof-intro{padding-left:0;align-self:center}
.pald-proof-intro p{font-size:12px;color:var(--mist);margin-top:5px}
.pald-stat{border-left:1px solid var(--line)}
.pald-stat strong{display:block;font-family:var(--display);letter-spacing:-.04em;font-weight:400;line-height:1.05;font-size:clamp(29px,3vw,44px)}
.pald-stat span{display:block;margin-top:8px;color:var(--mist);font-size:13px;line-height:1.4}
.pald-light{background:var(--paper);color:var(--ink)}
.pald-block{padding:83px 0}
.pald-light .pald-eyebrow{color:#175c81}
.pald-emphasis{font-style:normal;letter-spacing:-.06em;color:#0f7fb5}
.pald-section-head{display:grid;grid-template-columns:1.2fr .8fr;gap:44px;align-items:end;margin-bottom:34px}
.pald-section-head h2,.pald-audit h2{margin-top:12px}
.pald-section-head>p{color:#425871;max-width:45ch}
.pald-channels{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:13px}
.pald-channel{grid-column:span 2;background:#fff;border:1px solid #d5e2ed;border-radius:16px;padding:22px;display:flex;flex-direction:column;align-items:flex-start;position:relative;overflow:hidden}
.pald-channel:nth-last-child(-n+2){grid-column:span 3}
.pald-channel::before{content:"";position:absolute;inset:0;width:58%;height:54%;margin:auto;background:var(--logo-bg) center/contain no-repeat;opacity:.26;pointer-events:none}
.pald-channel h3{font-size:22px;line-height:1.2;letter-spacing:-.033em;margin:12px 0 9px;position:relative}
.pald-channel p{font-size:14px;color:#3d5470;position:relative}
.pald-c-google{--logo-bg:url('/media/paid-advertising-ld/marks/google.svg')}
.pald-c-meta{--logo-bg:url('/media/paid-advertising-ld/marks/meta.svg')}
.pald-c-ms{--logo-bg:url('/media/paid-advertising-ld/marks/microsoft.svg')}
.pald-c-local{--logo-bg:url('/media/paid-advertising-ld/marks/local.svg')}
.pald-c-openai{--logo-bg:url('/media/paid-advertising-ld/marks/openai.svg')}
.pald-audit{background:#0e2134;border-block:1px solid var(--line)}
.pald-audit-grid{display:grid;grid-template-columns:1fr .95fr;gap:60px;align-items:center}
.pald-audit-lede{margin:17px 0 23px}
.pald-steps{list-style:none;padding:0;margin:0;border-top:1px solid #3b536b}
.pald-steps li{display:grid;grid-template-columns:30px 1fr;gap:11px;padding:14px 0;border-bottom:1px solid #3b536b}
.pald-num{color:var(--cyan);font:12px/1.7 var(--mono);padding-top:2px}
.pald-steps strong{display:block;font-size:15px}
.pald-steps p{color:var(--mist);font-size:13px;margin-top:3px}
.pald-faq .pald-wrap{max-width:920px}
.pald-faq h2{margin:12px 0 24px}
.pald details{border-top:1px solid #cad9e7;padding:0}
.pald details:last-of-type{border-bottom:1px solid #cad9e7}
.pald summary{min-height:58px;cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px;font-weight:750;padding:12px 0}
.pald summary::-webkit-details-marker{display:none}
.pald summary::after{content:"+";color:#175c81;font-size:23px;font-weight:400}
.pald details[open] summary::after{content:"−"}
.pald details p{color:#425871;padding-bottom:16px;max-width:70ch}
.pald-closing{text-align:center;background:radial-gradient(ellipse at bottom,#16354b 0%,var(--navy) 72%)}
.pald-closing h2{margin:12px 0 14px}
.pald-closing p:not(.pald-eyebrow){color:var(--mist);margin:0 auto 23px;max-width:49ch}
.pald-closing .pald-eyebrow{justify-content:center}
.pald-foot{border-top:1px solid var(--line);padding:28px 0}
.pald-foot p{font-size:12px;color:var(--mist);text-align:right}
.pald-foot .pald-brand-logo{height:26px}
@media(max-width:920px){
  .pald-wrap{padding-inline:28px}
  .pald-hero-grid{gap:30px;padding-block:58px}
  .pald-signal{padding:17px}
  .pald-section-head,.pald-audit-grid{gap:30px}
  .pald-channel{padding:18px}
}
/* Fraunces is wider than the reference's Georgia, so the headline's hard
   breaks over-wrap in the band where the hero is still two columns but the
   copy column has narrowed. Let the headline flow there instead. */
@media(min-width:721px) and (max-width:980px){
  .pald h1 br{display:none}
}
@media(max-width:720px){
  .pald-wrap{padding-inline:20px}
  .pald-top .pald-wrap{min-height:68px}
  .pald-hero-grid,.pald-section-head,.pald-audit-grid{grid-template-columns:1fr}
  .pald-hero-grid{gap:32px;padding-block:43px}
  .pald-section-head{gap:14px;margin-bottom:23px}
  .pald-signal{max-width:500px;width:100%;justify-self:center}
  .pald-proof .pald-wrap{grid-template-columns:1.05fr 1fr}
  .pald-proof-intro,.pald-stat{padding:15px 12px}
  .pald-proof-intro,.pald-stat:nth-child(3){padding-left:0;border-left:0}
  .pald-stat:nth-child(n+3){border-top:1px solid var(--line)}
  .pald-block{padding:55px 0}
  .pald-channels{grid-template-columns:1fr 1fr;gap:10px}
  .pald-channel,.pald-channel:nth-last-child(-n+2){grid-column:auto}
  .pald-channel:last-child{grid-column:1/-1}
}
@media(max-width:430px){
  .pald h1{font-size:clamp(40px,11vw,49px)}
  .pald-lede{font-size:16px}
  .pald-top .pald-btn{padding-inline:11px;font-size:12px}
  .pald-top .pald-btn .pald-arrow{display:none}
  .pald-channels{grid-template-columns:1fr}
  .pald-foot .pald-wrap{align-items:flex-start}
  .pald-foot p{max-width:21ch}
}
@media(prefers-reduced-motion:reduce){
  .pald *,.pald *::before,.pald *::after{transition:none!important}
}
`;
