/** Fence materials (pure, feet/inches). Posts: one per section end plus one extra per gate. */
export type FenceInput = { length: number; spacing: number; height: number; gates: number; gateW: number; rails: number; boardW: number; gap: number; wastePct: number; bury: number };

export function fence(o: FenceInput) {
  const run = Math.max(0, o.length - o.gates * o.gateW);
  const sections = Math.ceil(run / o.spacing - 1e-9);
  const posts = sections + 1 + o.gates;
  const exact = (run * 12) / (o.boardW + o.gap);
  return {
    run, sections, posts, rails: sections * o.rails,
    pickets: Math.ceil(exact * (1 + o.wastePct / 100) - 1e-9), picketsExact: exact,
    postLen: o.height + o.bury, area: run * o.height,
  };
}

/** Shadowbox (board-on-board): boards alternate on both sides of the rails, each side spaced by `gap`. */
export const shadowboxBoards = (run: number, boardW: number, gap: number, wastePct: number) =>
  Math.ceil(((2 * run * 12) / (boardW + gap)) * (1 + wastePct / 100) - 1e-9);

/** Concrete for one round post hole (cu ft): hole volume minus the square post. Inputs in inches / feet. */
export function postConcrete(holeDiaIn: number, depthFt: number, postIn: number) {
  const d = depthFt * 12;
  const cuIn = Math.PI * (holeDiaIn / 2) ** 2 * d - postIn * postIn * d;
  return Math.max(0, cuIn / 1728);
}
