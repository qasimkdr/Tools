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

/** Simplify √[n]{x} for positive integers: returns { outside, inside } with x = outside^n × inside. */
export function simplifyRoot(x: number, n: number) {
  if (!Number.isInteger(x) || x <= 0 || !Number.isInteger(n) || n < 2) return null;
  let outside = 1, inside = x;
  for (let p = 2; Math.pow(p, n) <= inside; p++) {
    const pn = Math.pow(p, n);
    while (inside % pn === 0) { inside /= pn; outside *= p; }
  }
  return { outside, inside };
}

/** Prime factorization as [prime, exponent] pairs. */
export function primeFactors(x: number): [number, number][] {
  const out: [number, number][] = []; let v = x;
  for (let p = 2; p * p <= v; p++) { let e = 0; while (v % p === 0) { v /= p; e++; } if (e) out.push([p, e]); }
  if (v > 1) out.push([v, 1]);
  return out;
}

/** Fraction arithmetic with sign normalisation and reduction. */
export type Frac = { n: number; d: number };
export const reduce = ({ n, d }: Frac): Frac => { if (d === 0) return { n: NaN, d: 1 }; const g = gcd(n, d) || 1; const s = d < 0 ? -1 : 1; return { n: (s * n) / g, d: (s * d) / g }; };
export const fracOp = (a: Frac, b: Frac, op: "+" | "-" | "×" | "÷"): Frac =>
  reduce(op === "+" ? { n: a.n * b.d + b.n * a.d, d: a.d * b.d } : op === "-" ? { n: a.n * b.d - b.n * a.d, d: a.d * b.d } : op === "×" ? { n: a.n * b.n, d: a.d * b.d } : { n: a.n * b.d, d: a.d * b.n });
/** Mixed number (whole, numerator, denominator) → improper fraction. Sign taken from the whole part. */
export const fromMixed = (w: number, n: number, d: number): Frac => { const s = w < 0 ? -1 : 1; return { n: s * (Math.abs(w) * d + n), d }; };
export const toMixed = (f: Frac) => { const s = f.n < 0 ? -1 : 1, a = Math.abs(f.n); return { sign: s, whole: Math.floor(a / f.d), n: a % f.d, d: f.d }; };
