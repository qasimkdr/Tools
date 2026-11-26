/** Drywall estimate (pure, feet / square feet). Finishing rates from USG: ~370 ft of tape and ~9–10 gal of ready-mix per 1,000 sq ft. */
export const TAPE_FT_PER_SQFT = 0.37;
export const MUD_GAL_PER_SQFT = 0.0095; // midpoint of 9–10 gal per 1,000 sq ft

export type DrywallInput = {
  length: number; width: number; height: number; ceiling: boolean; doors: number; doorArea: number; windows: number; windowArea: number; sheetArea: number; wastePct: number;
  /** Triangular gable-end walls above the wall height: count, base width and peak height (ft). */
  gables?: number; gableBase?: number; gableRise?: number;
  /** Ceiling slope in inches of rise per 12 in (0 = flat); a sloped (cathedral) ceiling has more area than the floor. */
  ceilingPitch?: number;
};

export function drywall(o: DrywallInput) {
  const gable = (o.gables ?? 0) * 0.5 * (o.gableBase ?? 0) * (o.gableRise ?? 0);
  const walls = 2 * (o.length + o.width) * o.height + gable;
  const slope = Math.sqrt(1 + ((o.ceilingPitch ?? 0) / 12) ** 2);
  const ceil = o.ceiling ? o.length * o.width * slope : 0;
  const openings = o.doors * o.doorArea + o.windows * o.windowArea;
  const net = Math.max(0, walls + ceil - openings);
  return { ...sheetsFor(net, o.sheetArea, o.wastePct, { walls, ceil, openings }), gable };
}

export function sheetsFor(net: number, sheetArea: number, wastePct: number, parts = { walls: net, ceil: 0, openings: 0 }) {
  const withWaste = net * (1 + wastePct / 100);
  const tape = net * TAPE_FT_PER_SQFT, mud = net * MUD_GAL_PER_SQFT;
  return {
    ...parts, net, withWaste,
    sheets: Math.ceil(withWaste / sheetArea - 1e-9),
    tape, tapeRolls250: Math.ceil(tape / 250 - 1e-9),
    mud, pails: Math.ceil(mud / 4.5 - 1e-9),
  };
}
