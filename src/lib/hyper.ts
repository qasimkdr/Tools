/** Hypergeometric distribution (pure). Population N, K successes in it, sample n without replacement, X = successes drawn. */
function lnGamma(z: number): number {
  const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1; let x = c[0]; for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
const lnChoose = (n: number, k: number) => (k < 0 || k > n ? -Infinity : lnGamma(n + 1) - lnGamma(k + 1) - lnGamma(n - k + 1));
export const support = (N: number, K: number, n: number) => [Math.max(0, n - (N - K)), Math.min(n, K)] as const;
export const pmf = (N: number, K: number, n: number, k: number) => { const [lo, hi] = support(N, K, n); return k < lo || k > hi ? 0 : Math.exp(lnChoose(K, k) + lnChoose(N - K, n - k) - lnChoose(N, n)); };
export function cdf(N: number, K: number, n: number, k: number) { const [lo, hi] = support(N, K, n); let s = 0; for (let i = lo; i <= Math.min(k, hi); i++) s += pmf(N, K, n, i); return Math.min(1, s); }
export const mean = (N: number, K: number, n: number) => (n * K) / N;
export const variance = (N: number, K: number, n: number) => (N > 1 ? (n * K * (N - K) * (N - n)) / (N * N * (N - 1)) : 0);
