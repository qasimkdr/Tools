/**
 * Block spheres, ellipsoids and domes (pure). A block is solid when its centre lies inside the ellipsoid
 * ((x+0.5−w/2)/(w/2))² + ((y+0.5−h/2)/(h/2))² + ((z+0.5−d/2)/(d/2))² ≤ 1. A hollow shell keeps solid blocks
 * with an empty neighbour (6 faces = thin, all 26 = thick, which has no diagonal gaps).
 */
export type Shell = "thin" | "thick" | "filled";

export function makeInside(w: number, h: number, d: number) {
  return (x: number, y: number, z: number) => {
    if (x < 0 || y < 0 || z < 0 || x >= w || y >= h || z >= d) return false;
    const a = (x + 0.5 - w / 2) / (w / 2), b = (y + 0.5 - h / 2) / (h / 2), c = (z + 0.5 - d / 2) / (d / 2);
    return a * a + b * b + c * c <= 1 + 1e-9;
  };
}

/** One horizontal layer (y from the bottom, 0-based) as rows of booleans [z][x]. */
export function layer(w: number, h: number, d: number, y: number, shell: Shell): boolean[][] {
  const inside = makeInside(w, h, d);
  const rows: boolean[][] = [];
  for (let z = 0; z < d; z++) {
    const row: boolean[] = [];
    for (let x = 0; x < w; x++) row.push(isBlock(inside, x, y, z, shell));
    rows.push(row);
  }
  return rows;
}

function isBlock(inside: (x: number, y: number, z: number) => boolean, x: number, y: number, z: number, shell: Shell) {
  if (!inside(x, y, z)) return false;
  if (shell === "filled") return true;
  if (!inside(x - 1, y, z) || !inside(x + 1, y, z) || !inside(x, y - 1, z) || !inside(x, y + 1, z) || !inside(x, y, z - 1) || !inside(x, y, z + 1)) return true;
  if (shell === "thin") return false;
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) if (!inside(x + dx, y + dy, z + dz)) return true;
  return false;
}

/** Block counts per layer (index 0 = bottom). */
export function layerCounts(w: number, h: number, d: number, shell: Shell): number[] {
  const inside = makeInside(w, h, d);
  const out: number[] = [];
  for (let y = 0; y < h; y++) {
    let c = 0;
    for (let z = 0; z < d; z++) for (let x = 0; x < w; x++) if (isBlock(inside, x, y, z, shell)) c++;
    out.push(c);
  }
  return out;
}

/** Stacks of 64 and shulker boxes (27 stacks). */
export const stacks = (n: number) => ({ stacks: Math.floor(n / 64), rest: n % 64, shulkers: n / (64 * 27) });
