/** Roof area and materials (pure, feet). Same pitch on every plane. */
export type RoofType = "gable" | "hip" | "shed" | "flat";
export type RoofInput = { length: number; width: number; overhang: number; pitch: number; type: RoofType; wastePct: number; bundlesPerSq: number };

/** Slope factor for a rise of `pitch` inches per 12 inches of run. */
export const pitchFactor = (pitch: number) => Math.sqrt(1 + (pitch / 12) ** 2);
/** Roof angle in degrees. */
export const pitchAngle = (pitch: number) => (Math.atan(pitch / 12) * 180) / Math.PI;

export function roof(o: RoofInput) {
  const L = o.length + 2 * o.overhang, W = o.width + 2 * o.overhang;
  const flat = o.type === "flat";
  const f = flat ? 1 : pitchFactor(o.pitch);
  const footprint = L * W, area = footprint * f;
  const squares = area / 100, withWaste = squares * (1 + o.wastePct / 100);
  const run = o.type === "shed" ? W : W / 2; // horizontal distance from eave to ridge
  const rafter = run * f;
  let ridge = 0, hips = 0, eaves = 0, rakes = 0;
  if (o.type === "gable") { ridge = L; eaves = 2 * L; rakes = 4 * rafter; }
  else if (o.type === "hip") {
    const long = Math.max(L, W), short = Math.min(L, W), r = short / 2;
    ridge = long - short; hips = 4 * r * Math.sqrt(2 + (o.pitch / 12) ** 2); eaves = 2 * (L + W);
  } else if (o.type === "shed") { eaves = 2 * L; rakes = 2 * rafter; }
  else { eaves = 2 * (L + W); }
  return {
    L, W, factor: f, footprint, area, squares, withWaste,
    bundles: Math.ceil(withWaste * o.bundlesPerSq - 1e-9),
    rafter, ridge, hips, ridgeCap: ridge + hips, eaves, rakes, dripEdge: eaves + rakes,
    rise: flat ? 0 : (run * o.pitch) / 12,
  };
}
