"use client";

import { useState } from "react";
import Image from "next/image";

/* Click-to-play YouTube facade. The page ships only the poster image (served
   through next/image) until the viewer presses play, so the YouTube player
   script never loads on first paint and the video does not affect LCP. The
   iframe uses the privacy-enhanced youtube-nocookie.com host. */
export default function YouTubeEmbed({
  videoId,
  title,
  poster,
  className = "",
}: {
  videoId: string;
  title: string;
  /** Poster URL; defaults to the video's maxres thumbnail. */
  poster?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const src = poster ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className={`relative overflow-hidden rounded-[26px] bg-[#0A1322] ${className}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <Image
            src={src}
            alt={`Video thumbnail: ${title}`}
            fill
            quality={75}
            sizes="(max-width: 1024px) 92vw, 896px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#050B16]/70 via-transparent to-transparent"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-r from-[#7FCBFF] to-[#0090F0] text-black shadow-[0_10px_40px_-12px_rgba(0,144,240,0.8)] transition-transform duration-300 group-hover:scale-105"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span
            aria-hidden
            className="absolute bottom-5 left-6 right-6 text-left text-[12px] uppercase tracking-[0.18em] text-white/80"
            style={{ fontFamily: "var(--font-space-mono), ui-monospace, monospace" }}
          >
            Watch on YouTube · {title}
          </span>
        </button>
      )}
    </div>
  );
}
