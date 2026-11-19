/* Mobile paragraph splitting (client-safe: no fs imports, so the FAQ
   accordion can use it too).

   Most visits are on a phone, where a 150-word paragraph fills the whole
   screen. Paragraphs longer than SPLIT_OVER words are broken at sentence
   boundaries into evenly sized chunks of about CHUNK_TARGET words. The copy
   itself is unchanged; only where paragraphs break. */

const SPLIT_OVER = 80;
const CHUNK_TARGET = 60;
const ABBREV =
  /(?:\b(?:e\.g|i\.e|vs|etc|Dr|Mr|Mrs|Ms|No|St|Inc|Ltd|Co|U\.S|approx|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.)$/;

const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

function splitSentences(text: string): string[] {
  const parts = text.split(/(?<=[.!?][”"')\]]?)\s+(?=[“"(]?[A-Z0-9$])/);
  const out: string[] = [];
  for (const part of parts) {
    const prev = out[out.length - 1];
    // rejoin after abbreviations and inside an unclosed [link](…) or (…)
    const open = prev
      ? (prev.match(/[[(]/g) || []).length - (prev.match(/[\])]/g) || []).length
      : 0;
    if (prev && (ABBREV.test(prev) || open > 0)) out[out.length - 1] = `${prev} ${part}`;
    else out.push(part);
  }
  return out;
}

export function splitLongParagraph(text: string): string[] {
  const total = wordCount(text);
  if (total <= SPLIT_OVER) return [text];
  const sentences = splitSentences(text);
  if (sentences.length < 2) return [text];
  // aim for evenly sized chunks rather than a full chunk plus a stub
  const target = total / Math.ceil(total / CHUNK_TARGET);
  const chunks: string[] = [];
  let cur: string[] = [];
  let curWords = 0;
  sentences.forEach((s, i) => {
    const w = wordCount(s);
    const remaining = sentences.slice(i).reduce((n, x) => n + wordCount(x), 0);
    if (cur.length && curWords + w > target * 1.15 && curWords >= target * 0.5 && remaining >= 15) {
      chunks.push(cur.join(" "));
      cur = [];
      curWords = 0;
    }
    cur.push(s);
    curWords += w;
  });
  if (cur.length) chunks.push(cur.join(" "));
  return chunks;
}
