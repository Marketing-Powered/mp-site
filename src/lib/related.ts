/** The next `count` items after `idx`, wrapping around (cyclic neighbors).
    Linking each page to its next few siblings gives every page in the list
    the same number of incoming sibling links. Capped at the list's other
    members, so a short list links to all of its siblings. */
export function cyclicNeighbors<T>(list: T[], idx: number, count = 3): T[] {
  if (idx < 0) return [];
  const n = Math.min(count, list.length - 1);
  return Array.from({ length: n }, (_, o) => list[(idx + o + 1) % list.length]);
}
