/** Pure ratio/proportion helpers. Works with decimals by scaling to integers before simplifying. */

export const gcd = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

const decimals = (x: number) => { const s = String(x); return s.includes("e-") ? Number(s.split("e-")[1]) : (s.split(".")[1] || "").length; };

/** Simplify a ratio of 2+ terms (decimals allowed): 10:5 → 2:1, 1.5:2.5 → 3:5. */
export function simplify(terms: number[]): number[] {
  if (terms.some((t) => !Number.isFinite(t)) || terms.every((t) => t === 0)) return terms;
  const scale = Math.pow(10, Math.min(6, Math.max(...terms.map(decimals))));
  const ints = terms.map((t) => Math.round(t * scale));
  const g = ints.reduce((acc, t) => gcd(acc, t), 0) || 1;
  return ints.map((t) => t / g);
}

/** Solve A:B = C:D (A/B = C/D) for the single missing value (null). Direct or inverse proportion. */
export function solveProportion(v: { a: number | null; b: number | null; c: number | null; d: number | null }, inverse = false) {
  const { a, b, c, d } = v;
  const missing = (["a", "b", "c", "d"] as const).filter((k) => v[k] === null);
  if (missing.length !== 1) return null;
  const k = missing[0];
  // Direct: a·d = b·c.  Inverse: a·b = c·d (a/c = d/b).
  let x: number;
  if (!inverse) x = k === "a" ? (b! * c!) / d! : k === "b" ? (a! * d!) / c! : k === "c" ? (a! * d!) / b! : (b! * c!) / a!;
  else x = k === "a" ? (c! * d!) / b! : k === "b" ? (c! * d!) / a! : k === "c" ? (a! * b!) / d! : (a! * b!) / c!;
  return Number.isFinite(x) ? { key: k, value: x } : null;
}

/** Split a total into parts by ratio: 100 in 2:3 → [40, 60]. */
export const splitTotal = (total: number, terms: number[]) => {
  const sum = terms.reduce((s, t) => s + t, 0);
  return sum ? terms.map((t) => (total * t) / sum) : terms.map(() => NaN);
};

/** Format without float noise: 6.000000001 → "6". */
export const num = (x: number, max = 6) => (Number.isFinite(x) ? Number(x.toFixed(max)).toLocaleString("en-US", { maximumFractionDigits: max }) : "—");
