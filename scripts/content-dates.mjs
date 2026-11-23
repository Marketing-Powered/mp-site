#!/usr/bin/env node
/* Writes content/dates.json: first-commit (published) and last-commit
   (updated) timestamps for every content brief, read from git history.
   The RSS feed (src/lib/feed.ts) reads this file, because the briefs carry
   no dates in frontmatter and the deploy build runs on a shallow clone
   where git history is not available.

   Run after adding or editing briefs:  npm run content:dates
   Needs full history: `git fetch --unshallow` on a shallow clone first. */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content", "pages");
const OUT = path.join(ROOT, "content", "dates.json");

if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: ROOT }).toString().trim() === "true") {
  console.error("content-dates: shallow clone; run `git fetch --unshallow` first so dates are real.");
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith(".md")) files.push(path.relative(CONTENT, full));
  }
})(CONTENT);
files.sort();

function gitDates(rel) {
  const abs = path.join("content", "pages", rel);
  // Oldest and newest commit touching the file; --follow keeps renames.
  const log = execFileSync("git", ["log", "--follow", "--format=%cI", "--", abs], { cwd: ROOT })
    .toString()
    .trim()
    .split("\n")
    .filter(Boolean);
  if (!log.length) return null;
  return { published: log[log.length - 1], updated: log[0] };
}

const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")).pages || {} : {};
const pages = {};
let missing = 0;
for (const rel of files) {
  const d = gitDates(rel);
  if (d) pages[rel] = d;
  else if (previous[rel]) pages[rel] = previous[rel];
  else missing++;
}

const out = { generatedAt: new Date().toISOString(), pages };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`content-dates: ${Object.keys(pages).length} pages dated, ${missing} uncommitted (no date yet) → content/dates.json`);
