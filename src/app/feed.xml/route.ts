import { renderRss } from "@/lib/feed";

/* RSS 2.0 feed of the resources library, prerendered at build. */
export const dynamic = "force-static";

export function GET() {
  return new Response(renderRss(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
