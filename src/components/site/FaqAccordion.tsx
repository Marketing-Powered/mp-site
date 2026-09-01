"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { serif } from "./theme";
import { RichText } from "./ui";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;

  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 lg:px-12">
      <Reveal>
        <h2
          className="mb-12 text-center text-[clamp(1.9rem,3.4vw,2.8rem)]"
          style={{ fontFamily: serif, fontWeight: 400 }}
        >
          Questions, Answered.
        </h2>
      </Reveal>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className="text-[1.05rem] leading-snug transition-colors"
                  style={{ fontFamily: serif, color: isOpen ? "#7FCBFF" : "#EDEAE3" }}
                >
                  {f.q}
                </span>
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-[#0090F0] transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-all duration-500 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-12 text-[0.97rem] leading-relaxed text-white/50">
                    <RichText text={f.a} />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
