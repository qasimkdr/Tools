/** Binomial distribution (pure), computed in log space so large n stays accurate. */
const lf: number[] = [0];
function lnFact(n: number) { for (let i = lf.length; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i); return lf[n]; }
export const lnChoose = (n: number, k: number) => lnFact(n) - lnFact(k) - lnFact(n - k);
export const choose = (n: number, k: number) => Math.round(Math.exp(lnChoose(n, k)));

export function pmf(n: number, p: number, k: number) {
  if (k < 0 || k > n) return 0;
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return Math.exp(lnChoose(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
/** P(a ≤ X ≤ b). */
export function range(n: number, p: number, a: number, b: number) {
  let s = 0;
  for (let k = Math.max(0, a); k <= Math.min(n, b); k++) s += pmf(n, p, k);
  return Math.min(1, s);
}
export function stats(n: number, p: number) {
  const mean = n * p, variance = n * p * (1 - p);
  return { mean, variance, sd: Math.sqrt(variance), mode: Math.floor((n + 1) * p) > n ? n : Math.floor((n + 1) * p) };
}
