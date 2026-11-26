/** Drywall estimate (pure, feet / square feet). Finishing rates from USG: ~370 ft of tape and ~9–10 gal of ready-mix per 1,000 sq ft. */
export const TAPE_FT_PER_SQFT = 0.37;
export const MUD_GAL_PER_SQFT = 0.0095; // midpoint of 9–10 gal per 1,000 sq ft

export type DrywallInput = { length: number; width: number; height: number; ceiling: boolean; doors: number; doorArea: number; windows: number; windowArea: number; sheetArea: number; wastePct: number };

export function drywall(o: DrywallInput) {
  const walls = 2 * (o.length + o.width) * o.height;
  const ceil = o.ceiling ? o.length * o.width : 0;
  const openings = o.doors * o.doorArea + o.windows * o.windowArea;
  const net = Math.max(0, walls + ceil - openings);
  return sheetsFor(net, o.sheetArea, o.wastePct, { walls, ceil, openings });
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
