/**
 * Partial fraction decomposition over the rationals, exact arithmetic (BigInt fractions), no dependencies.
 * Handles: improper fractions (long division first), distinct and repeated linear factors, distinct and
 * repeated irreducible quadratic factors. Denominators are factored with the rational root theorem,
 * square-free splitting and a search for rational quadratic factors.
 */

// ---------- exact rationals ----------
export type Q = { n: bigint; d: bigint };
const babs = (a: bigint) => (a < 0n ? -a : a);
export const gcd = (a: bigint, b: bigint): bigint => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
export const q = (n: bigint | number, d: bigint | number = 1n): Q => {
  let N = BigInt(n), D = BigInt(d);
  if (D === 0n) throw new Error("Division by zero.");
  if (D < 0n) { N = -N; D = -D; }
  const g = gcd(N, D) || 1n;
  return { n: N / g, d: D / g };
};
const Z = q(0), ONE = q(1);
const add = (a: Q, b: Q) => q(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a: Q, b: Q) => q(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: Q, b: Q) => q(a.n * b.n, a.d * b.d);
const div = (a: Q, b: Q) => q(a.n * b.d, a.d * b.n);
const isZ = (a: Q) => a.n === 0n;
const qeq = (a: Q, b: Q) => a.n === b.n && a.d === b.d;
export const qstr = (a: Q) => (a.d === 1n ? `${a.n}` : `${a.n}/${a.d}`);
const qnum = (a: Q) => Number(a.n) / Number(a.d);

// ---------- polynomials (coefficients low → high) ----------
export type Poly = Q[];
const trim = (p: Poly): Poly => { const r = p.slice(); while (r.length > 1 && isZ(r[r.length - 1])) r.pop(); return r.length ? r : [Z]; };
export const deg = (p: Poly) => { const t = trim(p); return t.length === 1 && isZ(t[0]) ? -Infinity : t.length - 1; };
const padd = (a: Poly, b: Poly): Poly => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => add(a[i] ?? Z, b[i] ?? Z)));
const pscale = (a: Poly, k: Q): Poly => trim(a.map((c) => mul(c, k)));
const pmul = (a: Poly, b: Poly): Poly => {
  const r: Poly = Array.from({ length: a.length + b.length - 1 }, () => Z);
  a.forEach((x, i) => b.forEach((y, j) => { r[i + j] = add(r[i + j], mul(x, y)); }));
  return trim(r);
};
const ppow = (a: Poly, k: number): Poly => { let r: Poly = [ONE]; for (let i = 0; i < k; i++) r = pmul(r, a); return r; };
export function pdivmod(a: Poly, b: Poly): { quo: Poly; rem: Poly } {
  const B = trim(b), db = deg(B);
  if (db === -Infinity) throw new Error("Division by zero polynomial.");
  let r = trim(a); const quo: Poly = Array.from({ length: Math.max(1, r.length - B.length + 1) }, () => Z);
  while (deg(r) >= db && deg(r) !== -Infinity) {
    const k = deg(r) - db, c = div(r[r.length - 1], B[B.length - 1]);
    quo[k] = c;
    r = padd(r, pscale([...Array(k).fill(Z), ...B], q(-c.n, c.d)));
  }
  return { quo: trim(quo), rem: r };
}
const pgcd = (a: Poly, b: Poly): Poly => {
  let x = trim(a), y = trim(b);
  while (deg(y) !== -Infinity) { const r = pdivmod(x, y).rem; x = y; y = r; }
  const lc = x[x.length - 1];
  return pscale(x, div(ONE, lc));
};
const pderiv = (a: Poly): Poly => trim(a.slice(1).map((c, i) => mul(c, q(i + 1))));
const peval = (p: Poly, x: Q) => p.reduceRight((acc, c) => add(mul(acc, x), c), Z);
/** Scale to integer coefficients with gcd 1 and positive leading coefficient. */
function primitive(p: Poly): bigint[] {
  const t = trim(p); let L = 1n;
  for (const c of t) L = (L * c.d) / gcd(L, c.d);
  let ints = t.map((c) => (c.n * L) / c.d);
  let g = 0n; for (const c of ints) g = gcd(g, c);
  if (g === 0n) g = 1n;
  ints = ints.map((c) => c / g);
  if (ints[ints.length - 1] < 0n) ints = ints.map((c) => -c);
  return ints;
}
const fromInts = (a: bigint[]): Poly => a.map((c) => q(c));

// ---------- parsing ----------
type Tok = { t: "num"; v: Q } | { t: "var" } | { t: "op"; v: string };
const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
function decToQ(s: string): Q { const [i, f = ""] = s.split("."); return q(BigInt((i || "0") + f), 10n ** BigInt(f.length)); }

/** Parse a polynomial in one variable. Returns the polynomial and the variable letter found. */
export function parsePoly(src: string, prefer?: string): { poly: Poly; v: string | null } {
  let s = src.replace(/[−–]/g, "-").replace(/[×·]/g, "*").replace(/÷/g, "/").replace(/\*\*/g, "^");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => "^" + [...m].map((c) => SUP[c]).join(""));
  const letters = new Set((s.match(/[a-zA-Z]/g) ?? []).map((c) => c));
  if (letters.size > 1) throw new Error(`Use one variable only (found ${[...letters].join(", ")}).`);
  const v = letters.size ? [...letters][0] : prefer ?? null;
  const toks: Tok[] = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; const lit = s.slice(i, j); if (!/^\d*\.?\d*$/.test(lit) || lit === ".") throw new Error(`Bad number “${lit}”.`); toks.push({ t: "num", v: decToQ(lit) }); i = j; continue; }
    if (/[a-zA-Z]/.test(c)) { toks.push({ t: "var" }); i++; continue; }
    if ("+-*/^()".includes(c)) { toks.push({ t: "op", v: c === "[" ? "(" : c }); i++; continue; }
    if (c === "[" || c === "{") { toks.push({ t: "op", v: "(" }); i++; continue; }
    if (c === "]" || c === "}") { toks.push({ t: "op", v: ")" }); i++; continue; }
    throw new Error(`Unexpected “${c}”.`);
  }
  let k = 0;
  const peek = () => toks[k];
  const isOp = (o: string) => { const t = toks[k]; return !!t && t.t === "op" && t.v === o; };
  const startsFactor = () => { const t = toks[k]; return !!t && (t.t === "num" || t.t === "var" || (t.t === "op" && t.v === "(")); };
  function expr(): Poly {
    let r = term();
    while (isOp("+") || isOp("-")) { const o = (toks[k++] as { v: string }).v; const b = term(); r = padd(r, o === "+" ? b : pscale(b, q(-1))); }
    return r;
  }
  function term(): Poly {
    let r = unary();
    for (;;) {
      if (isOp("*")) { k++; r = pmul(r, unary()); }
      else if (isOp("/")) { k++; const b = unary(); if (deg(b) > 0) throw new Error("Write the expression as numerator and denominator; only divide by numbers inside a box."); if (deg(b) === -Infinity) throw new Error("Division by zero."); r = pscale(r, div(ONE, b[0])); }
      else if (startsFactor()) r = pmul(r, power());
      else return r;
    }
  }
  function unary(): Poly { if (isOp("-")) { k++; return pscale(unary(), q(-1)); } if (isOp("+")) { k++; return unary(); } return power(); }
  function power(): Poly {
    const b = primary();
    if (isOp("^")) {
      k++; let neg = false; if (isOp("-")) { neg = true; k++; }
      const t = peek(); if (!t || t.t !== "num" || t.v.d !== 1n || neg) throw new Error("Exponents must be whole numbers ≥ 0.");
      k++; const e = Number(t.v.n); if (e > 40) throw new Error("Exponent too large.");
      return ppow(b, e);
    }
    return b;
  }
  function primary(): Poly {
    const t = peek();
    if (!t) throw new Error("The expression ends too early.");
    if (t.t === "num") { k++; return [t.v]; }
    if (t.t === "var") { k++; return [Z, ONE]; }
    if (t.v === "(") { k++; const r = expr(); if (!isOp(")")) throw new Error("Missing “)”."); k++; return r; }
    throw new Error(`Unexpected “${t.v}”.`);
  }
  if (!toks.length) throw new Error("Enter an expression.");
  const poly = expr();
  if (k < toks.length) throw new Error("Could not read the whole expression; check the brackets and operators.");
  return { poly, v };
}

// ---------- factoring over Q ----------
export type Factor = { p: Poly; mult: number }; // p is linear or quadratic, integer coefficients, positive leading coef
const divisors = (n: bigint): bigint[] => {
  n = babs(n); if (n === 0n) return [1n];
  const r: bigint[] = []; for (let i = 1n; i * i <= n && i < 100000n; i++) if (n % i === 0n) { r.push(i); if (i * i !== n) r.push(n / i); }
  return r;
};
function exactDiv(a: Poly, b: Poly): Poly | null { const { quo, rem } = pdivmod(a, b); return deg(rem) === -Infinity ? quo : null; }

/** Split a square-free integer polynomial (no rational roots) into irreducible quadratics; null if impossible. */
function quadSplit(p: Poly): Poly[] | null {
  if (deg(p) <= 0) return [];
  if (deg(p) === 2) return [p];
  if (deg(p) < 2 || deg(p) % 1) return null;
  const ints = primitive(p), lead = ints[ints.length - 1], c0 = ints[0];
  const B = Math.min(400, 2 * Number(ints.reduce((s, c) => s + babs(c), 0n)));
  for (const a of divisors(lead)) for (const cAbs of divisors(c0)) for (const c of [cAbs, -cAbs]) for (let b = -B; b <= B; b++) {
    const f = fromInts([c, BigInt(b), a]);
    const qq = exactDiv(fromInts(ints), f);
    if (qq) { const rest = quadSplit(qq); if (rest) return [f, ...rest]; }
  }
  return null;
}

export function factorQ(den: Poly): { lead: Q; factors: Factor[] } {
  let p = trim(den);
  if (deg(p) < 1) throw new Error("The denominator must contain the variable.");
  const ints = primitive(p);
  const lead = div(p[p.length - 1], q(ints[ints.length - 1]));
  p = fromInts(ints);
  const found: Factor[] = [];
  // pull out x^k
  let m = 0; while (deg(p) > 0 && isZ(p[0])) { p = p.slice(1); m++; }
  if (m) found.push({ p: [Z, ONE], mult: m });
  // rational roots p/q → (q x − p)
  const tryRoots = () => {
    const I = primitive(p); const cands = new Set<string>();
    for (const a of divisors(I[0])) for (const b of divisors(I[I.length - 1])) for (const s of [1n, -1n]) cands.add(qstr(q(s * a, b)));
    for (const cs of cands) {
      const [a, b = "1"] = cs.split("/"); const r = q(BigInt(a), BigInt(b));
      if (isZ(peval(p, r))) {
        const f = fromInts([-r.n, r.d]); let mult = 0, nx: Poly | null;
        while (deg(p) > 0 && (nx = exactDiv(p, f))) { p = nx; mult++; }
        found.push({ p: f, mult });
      }
    }
  };
  tryRoots();
  // remaining part: square-free decomposition, then quadratics
  if (deg(p) > 0) {
    let rest = fromInts(primitive(p)); let level = 1;
    const parts: { p: Poly; mult: number }[] = [];
    // Yun's algorithm
    let a = rest, b = pderiv(a), c = pgcd(a, b);
    let w = exactDiv(a, c)!;
    while (deg(w) > 0) {
      const y = pgcd(w, c); const z = exactDiv(w, y)!;
      if (deg(z) > 0) parts.push({ p: z, mult: level });
      level++; w = y; c = exactDiv(c, y)!;
    }
    for (const part of parts) {
      const qs = quadSplit(fromInts(primitive(part.p)));
      if (!qs) throw new Error("The denominator has a factor that can't be split into linear or quadratic factors with rational coefficients (for example x³ − 2). This calculator works over the rationals.");
      for (const f of qs) found.push({ p: fromInts(primitive(f)), mult: part.mult });
    }
    void rest;
  }
  found.sort((x, y) => deg(x.p) - deg(y.p) || x.mult - y.mult);
  return { lead, factors: found };
}

// ---------- linear algebra ----------
function solve(A: Q[][], bv: Q[]): Q[] {
  const n = bv.length, M = A.map((r, i) => [...r, bv[i]]);
  for (let col = 0; col < n; col++) {
    const piv = M.findIndex((r, i) => i >= col && !isZ(r[col]));
    if (piv < 0) throw new Error("The system has no unique solution.");
    [M[col], M[piv]] = [M[piv], M[col]];
    const pv = M[col][col];
    M[col] = M[col].map((x) => div(x, pv));
    for (let i = 0; i < n; i++) if (i !== col && !isZ(M[i][col])) { const f = M[i][col]; M[i] = M[i].map((x, j) => sub(x, mul(f, M[col][j]))); }
  }
  return M.map((r) => r[n]);
}

// ---------- formatting ----------
const SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).split("").map((d) => SUPS[+d]).join("");
export function polyStr(p: Poly, v = "x"): string {
  const t = trim(p); const parts: string[] = [];
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i]; if (isZ(c)) continue;
    const neg = c.n < 0n, a = q(babs(c.n), c.d);
    const coef = i === 0 ? qstr(a) : qeq(a, ONE) ? "" : a.d === 1n ? qstr(a) : `(${qstr(a)})`;
    const mono = i === 0 ? "" : i === 1 ? v : v + sup(i);
    parts.push((parts.length ? (neg ? " − " : " + ") : neg ? "−" : "") + coef + mono);
  }
  return parts.length ? parts.join("") : "0";
}
const wrap = (s: string) => (/[ +−]/.test(s.replace(/^−/, "")) ? `(${s})` : s);
export function factorStr(f: Factor, v = "x"): string {
  const s = polyStr(f.p, v);
  const base = deg(f.p) === 1 && f.p[1] && qeq(f.p[1], ONE) && isZ(f.p[0]) ? v : `(${s})`;
  return f.mult > 1 ? `${base}${sup(f.mult)}` : base;
}

export type Term = { num: Poly; factor: Poly; power: number; labels: string[] };
export type PFResult = {
  v: string;
  quotient: Poly | null;
  remainder: Poly;
  lead: Q;
  factors: Factor[];
  terms: Term[];
  setup: string;           // A/(x−1) + B/(x+2) + …
  equations: string[];     // coefficient equations
  unknowns: { label: string; value: Q }[];
  result: string;          // final decomposition
  denominatorFactored: string;
};

const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function decompose(numSrc: string, denSrc: string): PFResult {
  const D = parsePoly(denSrc); const N = parsePoly(numSrc, D.v ?? undefined);
  if (N.v && D.v && N.v !== D.v) throw new Error(`Numerator uses ${N.v} but the denominator uses ${D.v}.`);
  const v = D.v ?? N.v ?? "x";
  let num = N.poly; const den = D.poly;
  if (deg(den) < 1) throw new Error("The denominator must contain the variable (degree 1 or more).");
  if (deg(den) > 12) throw new Error("Keep the denominator to degree 12 or less.");
  let quotient: Poly | null = null;
  if (deg(num) >= deg(den)) { const r = pdivmod(num, den); quotient = r.quo; num = r.rem; }
  const { lead, factors } = factorQ(den);
  // cancel common factors between remainder and denominator is unnecessary: the linear system handles it (coefficients become 0).
  // Build terms: for factor f^m: unknown(s)/f^j, j = 1..m
  const terms: Term[] = []; let li = 0;
  for (const f of factors) for (let j = 1; j <= f.mult; j++) {
    const labels = deg(f.p) === 1 ? [LABELS[li++] ?? `C${li}`] : [LABELS[li++] ?? `C${li}`, LABELS[li++] ?? `C${li}`];
    terms.push({ num: [], factor: f.p, power: j, labels });
  }
  const n = deg(den) as number;
  // den = lead × Π f^m. Remainder/den = Σ terms ⇒ remainder/lead = Σ U_t × (Πf^m / f^j)
  const full = factors.reduce<Poly>((acc, f) => pmul(acc, ppow(f.p, f.mult)), [ONE]);
  const cols: Poly[] = []; // polynomial multiplying each unknown
  for (const t of terms) {
    const cof = exactDiv(full, ppow(t.factor, t.power))!;
    if (t.labels.length === 1) cols.push(cof);
    else { cols.push(pmul(cof, [Z, ONE])); cols.push(cof); } // (Bx + C)
  }
  const target = pscale(num, div(ONE, lead));
  const A: Q[][] = Array.from({ length: n }, (_, i) => cols.map((c) => c[i] ?? Z));
  const bv: Q[] = Array.from({ length: n }, (_, i) => target[i] ?? Z);
  const sol = solve(A, bv);
  const allLabels = terms.flatMap((t) => t.labels);
  const unknowns = allLabels.map((label, i) => ({ label, value: sol[i] }));
  // equations text (highest power first)
  const equations: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const lhs = cols.map((c, j) => ({ c: c[i] ?? Z, l: allLabels[j] })).filter((x) => !isZ(x.c))
      .map((x, k) => { const neg = x.c.n < 0n, a = q(babs(x.c.n), x.c.d); return (k ? (neg ? " − " : " + ") : neg ? "−" : "") + (qeq(a, ONE) ? "" : qstr(a)) + x.l; }).join("");
    equations.push(`${i === 0 ? "constant" : i === 1 ? v : v + sup(i)}: ${lhs || "0"} = ${qstr(bv[i])}`);
  }
  // final terms
  let k = 0; const pieces: string[] = [];
  for (const t of terms) {
    const den = factorStr({ p: t.factor, mult: t.power }, v);
    let numP: Poly;
    if (t.labels.length === 1) numP = [sol[k++]];
    else { const B = sol[k++], C = sol[k++]; numP = [C, B]; }
    t.num = numP;
    if (deg(numP) === -Infinity) continue;
    pieces.push(fracStr(numP, den, v));
  }
  const setup = terms.map((t) => `${t.labels.length === 1 ? t.labels[0] : `(${t.labels[0]}${v} + ${t.labels[1]})`}/${factorStr({ p: t.factor, mult: t.power }, v)}`).join(" + ");
  const qPart = quotient && deg(quotient) !== -Infinity ? polyStr(quotient, v) : "";
  const joined = joinSigned([...(qPart ? [qPart] : []), ...pieces]);
  const leadStr = qeq(lead, ONE) ? "" : qeq(lead, q(-1)) ? "−" : qstr(lead);
  return {
    v, quotient, remainder: num, lead, factors, terms, setup, equations, unknowns,
    result: joined || "0",
    denominatorFactored: leadStr + factors.map((f) => factorStr(f, v)).join(""),
  };
}

function fracStr(numP: Poly, den: string, v: string): string {
  const t = trim(numP); const allNeg = t.every((c) => c.n <= 0n) && t.some((c) => c.n < 0n);
  let p = allNeg ? t.map((c) => q(-c.n, c.d)) : t;
  let L = 1n; for (const c of p) L = (L * c.d) / gcd(L, c.d);
  if (L > 1n) p = p.map((c) => mul(c, q(L)));
  const top = deg(p) === 0 ? polyStr(p, v) : wrap(polyStr(p, v));
  return (allNeg ? "−" : "") + (L > 1n ? `${top}/(${L}${den})` : `${top}/${den}`);
}
function joinSigned(parts: string[]): string {
  return parts.map((p, i) => (i === 0 ? p : p.startsWith("−") ? ` − ${p.slice(1)}` : ` + ${p}`)).join("");
}

/** Numerically check a decomposition by evaluating both sides at a few points. */
export function verify(numSrc: string, denSrc: string, r: PFResult): boolean {
  const N = parsePoly(numSrc, r.v).poly, D = parsePoly(denSrc, r.v).poly;
  for (const x0 of [q(7, 3), q(-11, 5), q(13, 4)]) {
    if (isZ(peval(D, x0))) continue;
    const lhs = div(peval(N, x0), peval(D, x0));
    let rhs = r.quotient ? peval(r.quotient, x0) : Z;
    for (const t of r.terms) { if (deg(t.num) === -Infinity) continue; rhs = add(rhs, div(peval(t.num, x0), peval(ppow(t.factor, t.power), x0))); }
    if (!qeq(lhs, rhs)) return false;
  }
  return true;
}
export const _num = qnum;
