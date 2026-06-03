"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteContent as s } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { brand } from "@/components/brand";

/* ================================================================== */
/*  DESIGN 6 — "Console"                                              */
/*  The agency rendered as its own AI-native command line. A booting   */
/*  terminal types its way through the pitch: commands, streaming      */
/*  logs, file dumps, status checks. Monospace, CRT glow, brand        */
/*  blue/green/cyan on near-black. Leans into "we build the systems."  */
/* ================================================================== */

const mono = "'Space Mono', ui-monospace, monospace";
const BG = "#05080E";
const GREEN = brand.green;
const BLUE = brand.blue;
const CYAN = brand.cyan;

const PROMPT = "mp@marketingpowered";

function Prompt() {
  return (
    <span className="select-none">
      <span style={{ color: GREEN }}>{PROMPT}</span>
      <span className="text-white/35">:~$ </span>
    </span>
  );
}

/* one-shot typewriter for the hero command */
function TypeLine({ text, onDone }: { text: string; onDone?: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setN(n + 1), 34);
    return () => clearTimeout(t);
  }, [n, text, onDone]);
  return (
    <span className="text-white">
      {text.slice(0, n)}
      {n < text.length && <span className="mp-caret">▋</span>}
    </span>
  );
}

export default function Design6() {
  const [booted, setBooted] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      style={{ background: BG, color: "#C9D6E5", fontFamily: mono }}
      className="relative min-h-screen overflow-hidden text-[14px]"
    >
      <style>{`
        .mp-caret { animation: mp-blink 1s steps(1) infinite; color:${BLUE}; }
        @keyframes mp-blink { 50% { opacity: 0; } }
        .mp-scan::before{
          content:""; position:fixed; inset:0; pointer-events:none; z-index:40;
          background:repeating-linear-gradient(to bottom, rgba(0,144,240,0.035) 0 1px, transparent 1px 3px);
          mix-blend-mode:screen;
        }
      `}</style>
      <div className="mp-scan" />
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(0,144,240,0.10), transparent 60%), radial-gradient(60% 50% at 90% 100%, rgba(0,168,96,0.08), transparent 60%)",
        }}
      />

      {/* ---------- TOP STATUS BAR ---------- */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/10 px-5 py-2.5 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: GREEN }} />
          <span className="ml-3 text-white/40">— marketing-powered — zsh — 120×40</span>
        </div>
        <div className="hidden items-center gap-4 text-white/40 sm:flex">
          <span style={{ color: GREEN }}>● ai-native</span>
          <span>v2.26.0</span>
          <Link href={s.hero.ctaLink} className="text-white/70 hover:text-white">
            [ book-call ]
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8">
        {/* ---------- HERO / BOOT ---------- */}
        <section>
          <div className="leading-7">
            <Prompt />
            <TypeLine
              text="mp init --vertical behavioral-health --mode ai-native"
              onDone={() => setBooted(true)}
            />
          </div>

          {booted && (
            <div style={{ animation: "mp-fade-in 0.5s ease both" }} className="mt-4">
              {/* ascii brand */}
              <pre
                className="overflow-x-auto text-[11px] leading-[1.15] sm:text-[13px]"
                style={{ color: BLUE }}
              >
{`  __  __ ___    ___                            _
 |  \\/  | _ \\  | _ \\_____ __ _____ _ _ ___ __| |
 | |\\/| |  _/  |  _/ _ \\ V  V / -_) '_/ -_) _\` |
 |_|  |_|_|    |_| \\___/\\_/\\_/\\___|_| \\___\\__,_|`}
              </pre>

              <div className="mt-4 space-y-1 text-[13px] text-white/55">
                <Boot label="loading proprietary inference cluster (Mac Studio M3 Ultra)" />
                <Boot label="mounting HIPAA-conscious data sovereignty layer" />
                <Boot label="calibrating $50M+ managed-spend models" />
                <Boot label="verifying LegitScript compliance" />
              </div>

              <h1 className="mt-8 text-[clamp(1.6rem,4.2vw,2.9rem)] font-bold leading-[1.15] text-white">
                Partner with an AI agency that{" "}
                <span style={{ color: GREEN }}>knows</span>{" "}
                <span style={{ color: BLUE }}>behavioral health</span>.
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/55">
                <span style={{ color: CYAN }}># </span>
                {s.hero.subheadline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={s.hero.ctaLink}
                  className="group inline-flex items-center gap-2 border px-5 py-2.5 font-bold transition-colors"
                  style={{ borderColor: BLUE, color: BLUE }}
                >
                  <span className="transition-colors group-hover:text-white">
                    ▸ ./book-discovery-call.sh
                  </span>
                </Link>
                <span className="text-white/35">
                  exit code <span style={{ color: GREEN }}>0</span> · {s.socialProof}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ---------- EXPERTS: cat about ---------- */}
        <Block cmd="cat ./about/founder.md">
          <Reveal className="border-l-2 pl-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <p className="text-[15px] font-bold text-white">{s.growth.headline}</p>
            <p className="mt-3 leading-relaxed text-white/60">{s.growth.body}</p>
            <p className="mt-3 leading-relaxed text-white/45">{s.growth.body2}</p>
          </Reveal>
        </Block>

        {/* ---------- STATS: mp stats --all ---------- */}
        <Block cmd="mp stats --all --format table">
          <Reveal className="overflow-x-auto">
            <div className="min-w-[520px] border border-white/12">
              <div className="grid grid-cols-[120px_1fr] border-b border-white/12 bg-white/[0.03] px-4 py-2 text-[12px] uppercase tracking-wider text-white/40">
                <span>metric</span>
                <span>value</span>
              </div>
              {s.stats.map((stat, i) => (
                <div
                  key={stat.value}
                  className={`grid grid-cols-[120px_1fr] items-center px-4 py-3 ${
                    i < s.stats.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <span
                    className="text-[1.4rem] font-bold"
                    style={{ color: i % 2 ? GREEN : BLUE }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[13px] leading-snug text-white/55">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Block>

        {/* ---------- SERVICES: ls modules ---------- */}
        <Block cmd="ls -la ./modules/">
          <Reveal>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {s.services.map((svc, i) => (
                <div key={svc.title} className="flex gap-3">
                  <span className="select-none pt-0.5" style={{ color: CYAN }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="font-bold text-white">
                      {svc.title.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                    <span className="text-white/30"> /</span>
                    <p className="mt-1 leading-relaxed text-white/50">
                      {svc.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Block>

        {/* ---------- SPECIALIZED: compliance check ---------- */}
        <Block cmd="mp compliance check --vertical behavioral-health">
          <Reveal>
            <div className="space-y-1.5">
              {[
                "google ads sensitive-vertical policy",
                "no-retargeting strategy enforced",
                "legitscript certification",
                "meta special-ad-category handling",
                "click-to-admission attribution",
              ].map((c) => (
                <div key={c} className="flex items-center gap-3">
                  <span style={{ color: GREEN }}>✓ PASS</span>
                  <span className="text-white/55">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/55">
              <span style={{ color: CYAN }}># </span>
              {s.specializedMarketing.body}
            </p>
          </Reveal>
        </Block>

        {/* ---------- RESULTS: open infographic ---------- */}
        <Block cmd="open ./results/haven-health-process.png">
          <Reveal variant="blur">
            <div className="border border-white/12 bg-white">
              <div className="flex items-center gap-2 border-b border-black/10 bg-[#0b1830] px-4 py-2 text-[12px] text-white/60">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} />
                <span className="ml-2">haven-health-process.png</span>
              </div>
              <div className="relative w-full bg-white" style={{ aspectRatio: "16 / 8.5" }}>
                <Image
                  src={s.bookAudit.image}
                  alt={s.bookAudit.imageAlt}
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-contain p-3"
                />
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {s.whyChoose.cards.map((card, i) => (
                <div key={card.title} className="border border-white/10 p-4">
                  <p className="font-bold text-white">
                    <span style={{ color: i % 2 ? GREEN : BLUE }}>›</span> {card.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-white/50">{card.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Block>

        {/* ---------- FAQ: man pages ---------- */}
        <Block cmd="man mp-faq">
          <Reveal>
            <div className="border border-white/12">
              {s.faq.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.question} className={i < s.faq.length - 1 ? "border-b border-white/8" : ""}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    >
                      <span style={{ color: isOpen ? GREEN : CYAN }}>
                        {isOpen ? "▾" : "▸"}
                      </span>
                      <span className="font-bold text-white/90">{f.question}</span>
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 pl-10 leading-relaxed text-white/55">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Block>

        {/* ---------- CTA ---------- */}
        <section className="mt-16">
          <Reveal
            className="border p-8 sm:p-10"
            style={{
              borderColor: "rgba(0,144,240,0.4)",
              background:
                "linear-gradient(120deg, rgba(0,144,240,0.08), rgba(0,168,96,0.06))",
            }}
          >
            <div className="leading-7">
              <Prompt />
              <span className="text-white">mp deploy --your-treatment-center</span>
            </div>
            <h2 className="mt-5 text-[clamp(1.4rem,3vw,2.2rem)] font-bold leading-snug text-white">
              {s.cta.headline}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
              {s.cta.body}
            </p>
            <Link
              href={s.cta.ctaLink}
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 font-bold text-black"
              style={{ background: BLUE }}
            >
              ▸ {s.cta.ctaText}
            </Link>
          </Reveal>
        </section>
      </main>

      {/* ---------- FOOTER STATUS LINE ---------- */}
      <footer className="relative z-10 mt-10 border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-[12px] text-white/40 sm:px-8">
          <span>
            <span style={{ color: GREEN }}>●</span> {PROMPT} · {s.brand.phone}
          </span>
          <span className="hidden sm:block">{s.footer.tagline}</span>
          <span>{s.footer.copyright}</span>
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-5 left-5 z-50 border border-white/20 bg-black/70 px-4 py-2 text-[12px] text-white/70 backdrop-blur transition-colors hover:text-white"
      >
        cd ../gallery
      </Link>
    </div>
  );
}

function Boot({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span style={{ color: GREEN }}>[ ok ]</span>
      <span>{label}</span>
    </div>
  );
}

function Block({ cmd, children }: { cmd: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <div className="leading-7">
        <Prompt />
        <span className="text-white">{cmd}</span>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
