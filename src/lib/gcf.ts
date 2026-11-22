/** Greatest common factor helpers (pure, BigInt so any size works). */
export const gcd2 = (a: bigint, b: bigint): bigint => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
export const gcdAll = (xs: bigint[]) => xs.reduce((g, x) => gcd2(g, x), 0n);

/** Euclidean algorithm steps for two numbers: a = q × b + r. */
export function euclidSteps(a: bigint, b: bigint, max = 30) {
  const steps: { a: bigint; b: bigint; q: bigint; r: bigint }[] = [];
  a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  if (a < b) [a, b] = [b, a];
  while (b && steps.length < max) { const q = a / b, r = a % b; steps.push({ a, b, q, r }); [a, b] = [b, r]; }
  return steps;
}

/** Prime factorization by trial division; null if a factor search would exceed the limit (very large primes). */
export function factorize(n: bigint, limit = 10_000_000n): [bigint, number][] | null {
  let v = n < 0n ? -n : n; const out: [bigint, number][] = [];
  if (v < 2n) return out;
  for (let p = 2n; p * p <= v; p += p === 2n ? 1n : 2n) {
    if (p > limit) return null;
    let e = 0; while (v % p === 0n) { v /= p; e++; }
    if (e) out.push([p, e]);
  }
  if (v > 1n) out.push([v, 1]);
  return out;
}

/** All divisors of n (from its factorization), sorted; capped to avoid huge lists. */
export function divisors(n: bigint, cap = 500) {
  const f = factorize(n);
  if (!f) return null;
  let ds: bigint[] = [1n];
  for (const [p, e] of f) { const next: bigint[] = []; for (const d of ds) { let m = 1n; for (let i = 0; i <= e; i++) { next.push(d * m); m *= p; } } ds = next; if (ds.length > cap * 4) return null; }
  return ds.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
}
