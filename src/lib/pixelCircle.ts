/**
 * Pixel (block) circles and ovals. A block is part of the shape when its centre lies inside the ellipse
 * ((x + 0.5 − w/2) / (w/2))² + ((y + 0.5 − h/2) / (h/2))² ≤ 1. Outlines keep the filled blocks that touch the outside.
 */
export type CircleStyle = "thin" | "thick" | "filled";

export function pixelEllipse(w: number, h: number, style: CircleStyle): boolean[][] {
  const inside = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return false;
    const dx = (x + 0.5 - w / 2) / (w / 2), dy = (y + 0.5 - h / 2) / (h / 2);
    return dx * dx + dy * dy <= 1 + 1e-9;
  };
  const grid: boolean[][] = [];
  for (let y = 0; y < h; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < w; x++) {
      if (!inside(x, y)) { row.push(false); continue; }
      if (style === "filled") { row.push(true); continue; }
      const n4 = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
      const n8 = n4 || !inside(x - 1, y - 1) || !inside(x + 1, y - 1) || !inside(x - 1, y + 1) || !inside(x + 1, y + 1);
      row.push(style === "thin" ? n4 : n8);
    }
    grid.push(row);
  }
  return grid;
}

/** Runs of consecutive blocks in a row, as 1-based [start, end] column pairs. */
export function rowRuns(row: boolean[]): [number, number][] {
  const out: [number, number][] = [];
  let start = -1;
  row.forEach((on, i) => {
    if (on && start < 0) start = i;
    if (!on && start >= 0) { out.push([start + 1, i]); start = -1; }
  });
  if (start >= 0) out.push([start + 1, row.length]);
  return out;
}

export const countBlocks = (g: boolean[][]) => g.reduce((a, r) => a + r.filter(Boolean).length, 0);
