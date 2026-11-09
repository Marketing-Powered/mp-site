/* Pure model for the local-rank timelapse: snapshots, the rank function and
   the summary numbers. Shared by the static server render and the client
   widget so both draw the same grid. ILLUSTRATIVE: a worked example of how
   a local pack position spreads as review count grows, not a measured
   client result; the figure caption says so on the page. */

export const GRID = 7;
export const CENTER = (GRID - 1) / 2;

export const snapshots = [
  { label: "Day 1", caption: "Before Powered Cards", reviews: 18, greenRadius: 0.4 },
  { label: "Month 1", caption: "Cards on the counter", reviews: 41, greenRadius: 1.2 },
  { label: "Month 2", caption: "Every staff member tapping", reviews: 73, greenRadius: 2.1 },
  { label: "Month 3", caption: "Steady weekly reviews", reviews: 112, greenRadius: 3 },
  { label: "Month 4", caption: "Owning the map", reviews: 156, greenRadius: 4.3 },
];

/* Badge colors with text that clears WCAG AA at 12px bold: dark text on
   the three lighter fills, white on a red deep enough to carry it. */
export const RANK_STYLES = {
  top: { bg: "#1FA463", fg: "#041B10" },
  mid: { bg: "#E8B521", fg: "#1F1700" },
  low: { bg: "#EF7D2D", fg: "#2A1200" },
  none: { bg: "#C9362B", fg: "#FFFFFF" },
};

export const legend = [
  { label: "Top 3", color: RANK_STYLES.top.bg },
  { label: "4-10", color: RANK_STYLES.mid.bg },
  { label: "11-15", color: RANK_STYLES.low.bg },
  { label: "16-20+", color: RANK_STYLES.none.bg },
];

const jitter = (row: number, col: number) => (((row * 7 + col * 13) % 5) - 2) * 0.12;

export const rankFor = (row: number, col: number, greenRadius: number) => {
  const distance = Math.hypot(row - CENTER, col - CENTER) + jitter(row, col);
  const gap = distance - greenRadius;
  if (gap <= 0) return Math.max(1, Math.min(3, Math.round(1 + distance / 2)));
  if (gap <= 1) return 4 + Math.round(gap * 6);
  if (gap <= 2) return 11 + Math.round((gap - 1) * 4);
  return 20;
};

export const rankStyle = (rank: number) => {
  if (rank <= 3) return RANK_STYLES.top;
  if (rank <= 10) return RANK_STYLES.mid;
  if (rank <= 15) return RANK_STYLES.low;
  return RANK_STYLES.none;
};

export const cells = Array.from({ length: GRID * GRID }, (_, i) => ({
  row: Math.floor(i / GRID),
  col: i % GRID,
}));

export const summarize = (shot: number) => {
  const { greenRadius } = snapshots[shot];
  const ranks = cells.map(({ row, col }) => rankFor(row, col, greenRadius));
  const average = ranks.reduce((sum, r) => sum + r, 0) / ranks.length;
  const topThree = ranks.filter((r) => r <= 3).length;
  return { ranks, average, topThree };
};
