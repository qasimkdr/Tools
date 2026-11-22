/** Exact rational arithmetic with BigInt (pure). */
export type Q = { n: bigint; d: bigint };
const gcd = (a: bigint, b: bigint): bigint => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a || 1n; };
export const q = (n: bigint, d = 1n): Q => { if (d === 0n) throw new Error("division by zero"); if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d); return { n: n / g, d: d / g }; };
export const ZERO = q(0n), ONE = q(1n);
export const add = (a: Q, b: Q) => q(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a: Q, b: Q) => q(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a: Q, b: Q) => q(a.n * b.n, a.d * b.d);
export const div = (a: Q, b: Q) => q(a.n * b.d, a.d * b.n);
export const isZero = (a: Q) => a.n === 0n;
export const toStr = (a: Q) => (a.d === 1n ? a.n.toString() : `${a.n}/${a.d}`);
export const toNum = (a: Q) => Number(a.n) / Number(a.d);
/** Parse "3", "-2.5", "1/3", "-7/4", "1e-3". */
export function parseQ(s: string): Q | null {
  const t = s.trim().replace(/−/g, "-");
  let m = t.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (m) return BigInt(m[2]) === 0n ? null : q(BigInt(m[1]), BigInt(m[2]));
  m = t.match(/^(-?)(\d*)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!m || (!m[2] && !m[3])) return null;
  const frac = m[3] ?? "", e = Number(m[4] ?? 0);
  let n = BigInt((m[2] || "0") + frac), d = 10n ** BigInt(frac.length);
  if (e > 0) n *= 10n ** BigInt(e); else if (e < 0) d *= 10n ** BigInt(-e);
  return q(m[1] ? -n : n, d);
}

/** Gauss–Jordan inverse with exact fractions. Returns inverse, determinant and a readable list of row operations. */
export function invert(A: Q[][]) {
  const n = A.length, M = A.map((row, i) => [...row, ...A.map((_, j) => (i === j ? ONE : ZERO))]);
  let det = ONE; const steps: string[] = [];
  for (let c = 0; c < n; c++) {
    let p = c; while (p < n && isZero(M[p][c])) p++;
    if (p === n) return { inverse: null, det: ZERO, steps };
    if (p !== c) { [M[p], M[c]] = [M[c], M[p]]; det = sub(ZERO, det); steps.push(`Swap R${c + 1} and R${p + 1}`); }
    const piv = M[c][c]; det = mul(det, piv);
    if (!(piv.n === 1n && piv.d === 1n)) { M[c] = M[c].map((x) => div(x, piv)); steps.push(`R${c + 1} ÷ ${toStr(piv)}`); }
    for (let r = 0; r < n; r++) {
      if (r === c || isZero(M[r][c])) continue;
      const f = M[r][c]; M[r] = M[r].map((x, k) => sub(x, mul(f, M[c][k])));
      steps.push(`R${r + 1} − ${toStr(f)} × R${c + 1}`);
    }
  }
  return { inverse: M.map((row) => row.slice(n)), det, steps };
}
export const matMul = (A: Q[][], B: Q[][]) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), ZERO)));
