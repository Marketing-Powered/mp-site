/* Submit the site's indexable URLs to IndexNow (Bing, Yandex, and other
   participating engines) so new or changed pages get crawled promptly.

   IndexNow has no account or signup — the key below is self-generated and
   verified by the matching /de7f…d67.txt file served from the site root.

   Usage:
     node scripts/indexnow-ping.mjs             # submit every sitemap URL
     node scripts/indexnow-ping.mjs /services   # submit specific path(s)
*/

const SITE_URL = "https://marketingpowered.ai";
const KEY = "de7f3a1c9b6e42d1a805f4c3b2e91d67";

async function urlsFromSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p}`))
  : await urlsFromSitemap();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`Submitted ${urlList.length} URL(s) — HTTP ${res.status} ${res.statusText}`);
if (!res.ok) process.exit(1);
