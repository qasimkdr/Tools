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
