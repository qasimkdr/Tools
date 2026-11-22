/** Solid-geometry helpers (pure). Lengths in any consistent unit; results in that unit cubed/squared. */
export const cylVolume = (r: number, h: number) => Math.PI * r * r * h;
export const cylLateral = (r: number, h: number) => 2 * Math.PI * r * h;
export const cylTotalArea = (r: number, h: number) => cylLateral(r, h) + 2 * Math.PI * r * r;
/** Hollow cylinder (pipe/tube) material volume. */
export const hollowVolume = (rOuter: number, rInner: number, h: number) => Math.PI * (rOuter ** 2 - rInner ** 2) * h;
/** Liquid volume in a horizontal cylinder of radius r and length L filled to depth d (0 ≤ d ≤ 2r). */
export function horizontalFill(r: number, L: number, d: number) {
  const h = Math.max(0, Math.min(2 * r, d));
  const segment = r * r * Math.acos((r - h) / r) - (r - h) * Math.sqrt(2 * r * h - h * h);
  return segment * L;
}

/** Cubic feet → other volume units. */
export const FT3 = { ft3: 1, in3: 1728, yd3: 1 / 27, m3: 0.0283168466, L: 28.316846592, galUS: 7.48051948 } as const;
