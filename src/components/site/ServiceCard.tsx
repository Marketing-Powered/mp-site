import Link from "next/link";
import Reveal from "@/components/Reveal";
import { serif } from "./theme";

export default function ServiceCard({
  index,
  title,
  description,
  href,
}: {
  index: number;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Reveal delay={index * 70}>
      <Link
        href={href}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-[#0090F0]/40"
      >
        <span
          className="absolute right-6 top-5 text-5xl text-white/5 transition-colors group-hover:text-[#0090F0]/20"
          style={{ fontFamily: serif }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="max-w-[85%] text-[1.3rem] leading-snug transition-colors group-hover:translate-x-0.5"
          style={{ fontFamily: serif, fontWeight: 500, color: "#7FCBFF" }}
        >
          {title}
        </h3>
        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-white/50">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-white/45 transition-colors group-hover:text-[#7FCBFF]">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </Reveal>
  );
}
