/**
 * Implicit differentiation dy/dx for an equation F_L(x, y) = F_R(x, y), using mathjs for symbolic
 * derivatives and simplification. dy/dx = (R_x − L_x) / (L_y − R_y), i.e. −F_x / F_y with F = L − R.
 * Loaded lazily by the calculator (mathjs is only fetched on that page).
 */
import { parse, derivative, simplify, rationalize, type MathNode } from "mathjs";

const FUNCS = ["asinh", "acosh", "atanh", "arcsin", "arccos", "arctan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "sin", "cos", "tan", "sec", "csc", "cot", "sqrt", "cbrt", "exp", "abs", "log", "ln"];
const MAP: Record<string, string> = { ln: "log", log: "log10", arcsin: "asin", arccos: "acos", arctan: "atan" };
const ATOMS = [...FUNCS, "pi", "x", "y", "e"].sort((a, b) => b.length - a.length);
const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };

/** Turn friendly input (2xy, sin x… no; x², −, π) into a mathjs expression string. */
export function normalize(src: string): string {
  let s = src.replace(/[−–]/g, "-").replace(/[×·]/g, "*").replace(/÷/g, "/").replace(/π/g, "pi").replace(/\*\*/g, "^").replace(/√/g, "sqrt");
  s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => "^" + [...m].map((c) => SUP[c]).join(""));
  type T = { k: "num" | "var" | "fn" | "op"; v: string };
  const out: T[] = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; out.push({ k: "num", v: s.slice(i, j) }); i = j; continue; }
    if (/[a-zA-Z]/.test(c)) {
      let j = i; while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      const word = s.slice(i, j).toLowerCase();
      for (let p = 0; p < word.length;) {
        const atom = ATOMS.find((a) => word.startsWith(a, p));
        if (!atom) throw new Error(`Unknown name “${word}”. Use x and y, numbers, e, π and functions like sin, cos, ln, sqrt.`);
        out.push(FUNCS.includes(atom) ? { k: "fn", v: MAP[atom] ?? atom } : { k: "var", v: atom });
        p += atom.length;
      }
      i = j; continue;
    }
    if ("+-*/^(),".includes(c)) { out.push({ k: "op", v: c }); i++; continue; }
    if (c === "[" || c === "{") { out.push({ k: "op", v: "(" }); i++; continue; }
    if (c === "]" || c === "}") { out.push({ k: "op", v: ")" }); i++; continue; }
    throw new Error(`Unexpected “${c}”.`);
  }
  let r = "";
  out.forEach((t, idx) => {
    const prev = out[idx - 1];
    const prevEnds = prev && (prev.k === "num" || prev.k === "var" || (prev.k === "op" && prev.v === ")"));
    const starts = t.k === "num" || t.k === "var" || t.k === "fn" || (t.k === "op" && t.v === "(");
    if (prevEnds && starts && !(prev.k === "num" && t.k === "num")) r += "*";
    if (t.k === "fn") { const nx = out[idx + 1]; if (!nx || nx.v !== "(") throw new Error(`Put the argument of ${t.v === "log" ? "ln" : t.v} in brackets, e.g. ${t.v === "log" ? "ln" : t.v}(x).`); }
    r += t.v;
  });
  return r;
}

const SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Human-friendly rendering of a mathjs expression string. */
export function pretty(e: string): string {
  let s = e.replace(/\blog\(/g, "ln(").replace(/\blog10\(/g, "log(").replace(/\bpi\b/g, "π");
  s = s.replace(/\s*\^\s*(\d+)(?![\d.])/g, (_, d: string) => d.split("").map((c) => SUPS[+c]).join(""));
  s = s.replace(/(\d) \* ([a-zπ(])/g, "$1$2");
  s = s.replace(/([xyπ)⁰¹²³⁴⁵⁶⁷⁸⁹]) \* ([xyπ])/g, "$1$2");
  s = s.replace(/ \* /g, "·").replace(/ \^ /g, "^");
  s = s.replace(/-\(([^()\s]+) \/ ([^()\s]+)\)/g, "-$1 / $2").replace(/ \/ /g, " / ").replace(/-/g, "−");
  return s;
}

type Term = { coef: number; node: MathNode };
function terms(n: MathNode, sign = 1): Term[] {
  const node = n as MathNode & { op?: string; fn?: string; args?: MathNode[]; content?: MathNode; value?: number };
  if (node.type === "ParenthesisNode" && node.content) return terms(node.content, sign);
  if (node.type === "OperatorNode" && node.op === "+" && node.args!.length === 2) return [...terms(node.args![0], sign), ...terms(node.args![1], sign)];
  if (node.type === "OperatorNode" && node.op === "-" && node.args!.length === 2) return [...terms(node.args![0], sign), ...terms(node.args![1], -sign)];
  if (node.type === "OperatorNode" && node.fn === "unaryMinus") return terms(node.args![0], -sign);
  return [{ coef: sign * coefOf(node), node }];
}
function coefOf(n: MathNode): number {
  const node = n as MathNode & { op?: string; fn?: string; args?: MathNode[]; value?: number };
  if (node.type === "ConstantNode") return Number(node.value);
  if (node.type === "OperatorNode" && node.op === "*") return node.args!.reduce((p, a) => p * coefOf(a), 1);
  if (node.type === "OperatorNode" && node.fn === "unaryMinus") return -coefOf(node.args![0]);
  return 1;
}
const igcd = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

function toFrac(x: number): [number, number] | null {
  for (let d = 1; d <= 1000; d++) { const n = Math.round(x * d); if (Math.abs(x * d - n) < 1e-9) return [n, d]; }
  return null;
}
type PolyT = { k: number; mono: string }[];
function polyTerms(n: MathNode): PolyT | null {
  const out: { c: [number, number]; mono: string }[] = [];
  for (const t of terms(n)) {
    const f = toFrac(t.coef); if (!f) return null;
    const mono = t.coef === 0 ? "0" : simplify(`(${t.node.toString()}) / (${Math.abs(coefOf(t.node)) === 0 ? 1 : coefOf(t.node)})`).toString();
    out.push({ c: f, mono });
  }
  const L = out.reduce((p, t) => (p * t.c[1]) / igcd(p, t.c[1]), 1);
  return out.map((t) => ({ k: (t.c[0] * L) / t.c[1], mono: t.mono }));
}
function polyStr(p: PolyT): string {
  return p.map((t, i) => {
    const a = Math.abs(t.k), m = t.mono === "1" ? String(a) : a === 1 ? t.mono : `${a} * ${t.mono}`;
    return (i === 0 ? (t.k < 0 ? "-" : "") : t.k < 0 ? " - " : " + ") + m;
  }).join("");
}
/** Rewrite a polynomial fraction with integer coefficients, common factors cancelled and a positive leading denominator. */
function tidy(expr: MathNode): string {
  try {
    const r = rationalize(expr, {}, true) as unknown as { numerator: MathNode; denominator: MathNode };
    let N = polyTerms(r.numerator), D = polyTerms(r.denominator);
    if (!N || !D) return expr.toString();
    // bring both to integers with the same scale
    const ln = terms(r.numerator).map((t) => toFrac(t.coef)![1]).reduce((p, d) => (p * d) / igcd(p, d), 1);
    const ld = terms(r.denominator).map((t) => toFrac(t.coef)![1]).reduce((p, d) => (p * d) / igcd(p, d), 1);
    // N currently = ln × numerator, D = ld × denominator → value = (N/ln)/(D/ld) = (N·ld)/(D·ln)
    N = N.map((t) => ({ ...t, k: t.k * ld })); D = D.map((t) => ({ ...t, k: t.k * ln }));
    let g = [...N, ...D].reduce((p, t) => igcd(p, t.k), 0) || 1;
    if (D[0].k < 0) g = -g;
    N = N.map((t) => ({ ...t, k: t.k / g })); D = D.map((t) => ({ ...t, k: t.k / g }));
    const ns = polyStr(N), ds = polyStr(D);
    if (ds === "1") return ns;
    const wrapN = N.length > 1 ? `(${ns})` : ns, wrapD = D.length > 1 || /[*/]/.test(ds) ? `(${ds})` : ds;
    if (N.length === 1 && N[0].k < 0) return `-${polyStr([{ ...N[0], k: -N[0].k }])} / ${wrapD}`;
    return `${wrapN} / ${wrapD}`;
  } catch { return expr.toString(); }
}

export type ImplicitResult = {
  left: string; right: string;
  Lx: string; Ly: string; Rx: string; Ry: string;
  dydx: string;            // pretty
  dydxRaw: string;         // mathjs string (for evaluation)
  at?: { x: number; y: number; slope: number; second: number; onCurve: boolean; residual: number; tangent: string; normal: string };
};

const fmt = (v: number) => (Number.isFinite(v) ? (Math.abs(v) < 1e-12 ? "0" : String(Number(v.toPrecision(6)))) : "undefined");

export function implicitDerivative(eq: string, px?: number, py?: number): ImplicitResult {
  const parts = eq.split("=");
  if (parts.length > 2) throw new Error("Use a single “=” sign.");
  const left = normalize(parts[0]), right = parts.length === 2 ? normalize(parts[1]) : "0";
  if (!left.trim() || !right.trim()) throw new Error("Enter both sides of the equation.");
  const L = parse(left), R = parse(right);
  const vars = new Set<string>();
  [L, R].forEach((n) => n.traverse((c) => { if (c.type === "SymbolNode" && !(c as unknown as { name: string }).name.match(/^(e|pi)$/)) vars.add((c as unknown as { name: string }).name); }));
  const fnNames = new Set(FUNCS.map((f) => MAP[f] ?? f));
  for (const v of vars) if (!fnNames.has(v) && v !== "x" && v !== "y") throw new Error(`Unknown symbol ${v}.`);
  if (!vars.has("y")) throw new Error("The equation must contain y.");
  const d = (n: MathNode, v: string) => simplify(derivative(n, v));
  const Lx = d(L, "x"), Ly = d(L, "y"), Rx = d(R, "x"), Ry = d(R, "y");
  const num = simplify(`(${Rx}) - (${Lx})`), den = simplify(`(${Ly}) - (${Ry})`);
  if (den.toString() === "0") throw new Error("∂F/∂y is 0 everywhere, so y is not defined implicitly by this equation.");
  const raw = tidy(simplify(`(${num}) / (${den})`));
  const g = parse(raw);
  const res: ImplicitResult = { left: pretty(left), right: pretty(right), Lx: pretty(Lx.toString()), Ly: pretty(Ly.toString()), Rx: pretty(Rx.toString()), Ry: pretty(Ry.toString()), dydx: pretty(raw), dydxRaw: raw };
  if (px !== undefined && py !== undefined && Number.isFinite(px) && Number.isFinite(py)) {
    const scope = { x: px, y: py };
    const slope = Number(g.evaluate(scope));
    const gx = derivative(g, "x"), gy = derivative(g, "y");
    const second = Number(gx.evaluate(scope)) + Number(gy.evaluate(scope)) * slope;
    const lv = Number(L.evaluate(scope)), rv = Number(R.evaluate(scope)), residual = lv - rv;
    const onCurve = Math.abs(residual) <= 1e-6 * Math.max(1, Math.abs(lv), Math.abs(rv));
    const b = py - slope * px;
    const line = (m: number, c: number) => {
      if (!Number.isFinite(m)) return `x = ${fmt(px)}`;
      if (Math.abs(m) < 1e-12) return `y = ${fmt(c)}`.replace(/-/g, "−");
      const ms = fmt(m) === "1" ? "" : fmt(m) === "-1" ? "-" : fmt(m);
      const cs = Math.abs(c) < 1e-12 ? "" : ` ${c < 0 ? "-" : "+"} ${fmt(Math.abs(c))}`;
      return `y = ${ms}x${cs}`.replace(/-/g, "−");
    };
    const nm = slope === 0 ? Infinity : -1 / slope;
    res.at = { x: px, y: py, slope, second, onCurve, residual, tangent: line(slope, b), normal: Number.isFinite(nm) ? line(nm, py - nm * px) : `x = ${fmt(px)}` };
  }
  return res;
}
export { fmt as fmtNum };
