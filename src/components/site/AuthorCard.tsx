import Image from "next/image";
import Link from "next/link";
import { author } from "@/lib/author";
import { mono, serif } from "./theme";
import { FOCUS_RING } from "./ui";

const LINK = `text-[#7FCBFF] underline decoration-[#0090F0]/40 underline-offset-4 transition-colors hover:decoration-[#7FCBFF] ${FOCUS_RING}`;

/* Article byline. The visible name matches the Person entity's byline
   form and links to the one canonical author profile. */
export function Byline({
  published,
  updated,
  className = "",
}: {
  published?: { iso: string; label: string };
  updated?: { iso: string; label: string };
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-white/45 ${className}`}
      style={{ fontFamily: mono }}
    >
      <Link
        href={author.path}
        prefetch={false}
        rel="author"
        className={`inline-flex items-center gap-2.5 normal-case tracking-normal ${FOCUS_RING}`}
      >
        <span className="relative h-8 w-8 overflow-hidden rounded-full border border-white/15">
          <Image src={author.image} alt="" fill sizes="32px" quality={70} className="object-cover" style={{ objectPosition: "50% 20%" }} />
        </span>
        <span className="text-[14px] text-white/80 transition-colors hover:text-[#7FCBFF]">
          By {author.bylineName}
        </span>
      </Link>
      <span className="text-[#0090F0]/50">·</span>
      <span>{author.role}</span>
      {published && (
        <>
          <span className="text-[#0090F0]/50">·</span>
          <time dateTime={published.iso}>{published.label}</time>
        </>
      )}
      {updated && (
        <>
          <span className="text-[#0090F0]/50">·</span>
          <span>
            Updated <time dateTime={updated.iso}>{updated.label}</time>
          </span>
        </>
      )}
    </div>
  );
}

/* Short author card for the foot of an article. Deliberately brief: the
   full biography lives on the profile, not duplicated under every post. */
export default function AuthorCard() {
  return (
    <section
      aria-labelledby="author-card-heading"
      className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-12"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8">
        <p
          id="author-card-heading"
          className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#0090F0]"
          style={{ fontFamily: mono }}
        >
          About the author
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Link
            href={author.path}
            prefetch={false}
            className={`relative block h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 ${FOCUS_RING}`}
            aria-label={`${author.bylineName}, author profile`}
          >
            <Image
              src={author.image}
              alt={author.imageAlt}
              fill
              sizes="96px"
              quality={72}
              className="object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
          </Link>
          <div className="min-w-0">
            <h2 className="text-[1.35rem] leading-snug" style={{ fontFamily: serif, fontWeight: 500 }}>
              <Link href={author.path} prefetch={false} rel="author" className={`text-white transition-colors hover:text-[#7FCBFF] ${FOCUS_RING}`}>
                {author.bylineName}
              </Link>
            </h2>
            <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#7FCBFF]" style={{ fontFamily: mono }}>
              {author.roleLine}
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-white/60">{author.lead}</p>
            <p className="mt-4 text-[14px] text-white/55">
              <Link href={author.path} prefetch={false} className={LINK}>
                Read the full profile and selected writing
              </Link>
              <span className="mx-2 text-[#0090F0]/50">·</span>
              <a href={author.links.linkedin} target="_blank" rel="noopener noreferrer me" className={LINK}>
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
