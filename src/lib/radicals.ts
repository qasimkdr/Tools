/** Simplify c · ⁿ√r for integers (exact, trial division; fine for r up to ~1e12). Pure. */
export function primeFactors(n: number): [number, number][] {
  const out: [number, number][] = [];
  let x = n;
  for (let p = 2; p * p <= x; p += p === 2 ? 1 : 2) {
    let e = 0;
    while (x % p === 0) { x /= p; e++; }
    if (e) out.push([p, e]);
  }
  if (x > 1) out.push([x, 1]);
  return out;
}

export function simplifyRadical(radicand: number, index: number, coef = 1) {
  if (!Number.isInteger(radicand) || !Number.isInteger(index) || index < 2) return null;
  if (radicand < 0 && index % 2 === 0) return null; // not real
  const neg = radicand < 0, r = Math.abs(radicand);
  if (r === 0) return { outside: 0, inside: 0, index, factors: [] as [number, number][], neg: false };
  const factors = primeFactors(r);
  let outside = coef * (neg ? -1 : 1), inside = 1;
  for (const [p, e] of factors) { outside *= p ** Math.floor(e / index); inside *= p ** (e % index); }
  return { outside, inside, index, factors, neg };
}

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const rootSym = (index: number) => (index === 2 ? "√" : index === 3 ? "∛" : index === 4 ? "∜" : `${String(index).split("").map((c) => SUP[c]).join("")}√`);
export function format(outside: number, inside: number, index: number) {
  if (inside === 0 || outside === 0) return "0";
  if (inside === 1) return String(outside).replace("-", "−");
  const o = outside === 1 ? "" : outside === -1 ? "−" : String(outside).replace("-", "−");
  return `${o}${rootSym(index)}${inside}`;
}
