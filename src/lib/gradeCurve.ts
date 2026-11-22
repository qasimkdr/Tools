/** Grade-curving methods on percentage scores (0–100). Pure. */
export type CurveMethod = "flat" | "mean" | "scale" | "sqrt" | "bell";
export function curve(scores: number[], method: CurveMethod, opt: { top: number; mean: number; sd: number; points: number; cap: boolean }) {
  const n = scores.length;
  if (!n) return null;
  const mean = scores.reduce((a, b) => a + b, 0) / n, max = Math.max(...scores);
  const sd = Math.sqrt(scores.reduce((a, x) => a + (x - mean) ** 2, 0) / n); // population SD of the class
  let f: (x: number) => number, note: string;
  switch (method) {
    case "flat": { const k = opt.points > 0 ? opt.points : opt.top - max; f = (x) => x + k; note = `Add ${+k.toFixed(2)} points to every score`; break; }
    case "mean": { const k = opt.mean - mean; f = (x) => x + k; note = `Add ${+k.toFixed(2)} points so the average becomes ${opt.mean}`; break; }
    case "scale": { const m = max > 0 ? opt.top / max : 1; f = (x) => x * m; note = `Multiply every score by ${opt.top} ÷ ${+max.toFixed(2)} = ${+m.toFixed(4)}`; break; }
    case "sqrt": f = (x) => 10 * Math.sqrt(Math.max(0, x)); note = "New score = 10 × √(old score)"; break;
    case "bell": f = (x) => (sd > 0 ? opt.mean + ((x - mean) / sd) * opt.sd : opt.mean); note = `New = ${opt.mean} + z × ${opt.sd}, where z = (score − ${+mean.toFixed(2)}) ÷ ${+sd.toFixed(2)}`; break;
  }
  const out = scores.map((x) => { const y = f(x); return opt.cap ? Math.min(100, Math.max(0, y)) : y; });
  const newMean = out.reduce((a, b) => a + b, 0) / n;
  return { mean, max, min: Math.min(...scores), sd, out, newMean, note };
}
export const letter = (p: number) => (p >= 90 ? "A" : p >= 80 ? "B" : p >= 70 ? "C" : p >= 60 ? "D" : "F");
