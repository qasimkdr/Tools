/**
 * Boolean algebra (pure): parse an expression, build its truth table, and minimise it with Quine–McCluskey
 * plus an exact prime-implicant cover. Variables are single letters (A–Z, case-insensitive), so "AB" means A AND B.
 * Operators: NOT (! ~ ¬ prefix, ' postfix, NOT), AND (& * · ∧ . AND, or juxtaposition), NAND, XOR (^ ⊕ XOR), OR (+ | ∨ OR), NOR, constants 0 1.
 * Precedence: NOT > AND/NAND > XOR > OR/NOR.
 */
export type Node =
  | { t: "var"; v: string } | { t: "const"; v: boolean } | { t: "not"; a: Node }
  | { t: "and" | "or" | "xor" | "nand" | "nor"; a: Node; b: Node };

type Tok = { k: "var"; v: string } | { k: "const"; v: boolean } | { k: "op"; v: string } | { k: "(" } | { k: ")" } | { k: "'" };
const KW: Record<string, string> = { AND: "and", OR: "or", NOT: "not", XOR: "xor", NAND: "nand", NOR: "nor" };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[A-Za-z]/.test(c)) {
      let j = i; while (j < src.length && /[A-Za-z]/.test(src[j])) j++;
      const word = src.slice(i, j).toUpperCase();
      if (KW[word]) out.push({ k: "op", v: KW[word] }); else for (const ch of word) out.push({ k: "var", v: ch });
      i = j; continue;
    }
    if (c === "0" || c === "1") { out.push({ k: "const", v: c === "1" }); i++; continue; }
    if (c === "(" || c === "[") { out.push({ k: "(" }); i++; continue; }
    if (c === ")" || c === "]") { out.push({ k: ")" }); i++; continue; }
    if (c === "'" || c === "’" || c === "′") { out.push({ k: "'" }); i++; continue; }
    if ("!~¬".includes(c)) { out.push({ k: "op", v: "not" }); i++; continue; }
    if ("&*·∧.".includes(c)) { out.push({ k: "op", v: "and" }); if (src[i + 1] === "&" && c === "&") i++; i++; continue; }
    if ("+|∨".includes(c)) { out.push({ k: "op", v: "or" }); if (src[i + 1] === "|" && c === "|") i++; i++; continue; }
    if ("^⊕".includes(c)) { out.push({ k: "op", v: "xor" }); i++; continue; }
    throw new Error(`Unexpected character "${c}"`);
  }
  return out;
}

export function parse(src: string): Node {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const startsOperand = (t?: Tok) => !!t && (t.k === "var" || t.k === "const" || t.k === "(" || (t.k === "op" && t.v === "not"));
  function primary(): Node {
    const t = toks[p];
    if (!t) throw new Error("The expression ends too early");
    if (t.k === "op" && t.v === "not") { p++; return postfix({ t: "not", a: primaryNoPost() }); }
    return postfix(primaryNoPost());
  }
  function primaryNoPost(): Node {
    const t = toks[p++];
    if (!t) throw new Error("The expression ends too early");
    if (t.k === "var") return { t: "var", v: t.v };
    if (t.k === "const") return { t: "const", v: t.v };
    if (t.k === "op" && t.v === "not") return { t: "not", a: primaryNoPost() };
    if (t.k === "(") { const e = orExpr(); if (toks[p]?.k !== ")") throw new Error("Missing closing parenthesis"); p++; return e; }
    throw new Error(t.k === ")" ? "Unexpected closing parenthesis" : "Missing a value before an operator");
  }
  function postfix(n: Node): Node { while (peek()?.k === "'") { p++; n = { t: "not", a: n }; } return n; }
  function andExpr(): Node {
    let n = primary();
    for (;;) {
      const t = peek();
      if (t?.k === "op" && (t.v === "and" || t.v === "nand")) { p++; n = { t: t.v, a: n, b: primary() }; }
      else if (startsOperand(t)) n = { t: "and", a: n, b: primary() };
      else return n;
    }
  }
  function xorExpr(): Node { let n = andExpr(); while (peek()?.k === "op" && (peek() as { v: string }).v === "xor") { p++; n = { t: "xor", a: n, b: andExpr() }; } return n; }
  function orExpr(): Node {
    let n = xorExpr();
    for (;;) { const t = peek(); if (t?.k === "op" && (t.v === "or" || t.v === "nor")) { p++; n = { t: t.v, a: n, b: xorExpr() }; } else return n; }
  }
  if (!toks.length) throw new Error("Enter an expression");
  const n = orExpr();
  if (p < toks.length) throw new Error(toks[p].k === ")" ? "Unexpected closing parenthesis" : "Unexpected symbol near the end");
  return n;
}

export function variables(n: Node, acc = new Set<string>()): string[] {
  if (n.t === "var") acc.add(n.v); else if (n.t === "not") variables(n.a, acc); else if (n.t !== "const") { variables(n.a, acc); variables(n.b, acc); }
  return [...acc].sort();
}

export function evaluate(n: Node, env: Record<string, boolean>): boolean {
  switch (n.t) {
    case "var": return env[n.v];
    case "const": return n.v;
    case "not": return !evaluate(n.a, env);
    case "and": return evaluate(n.a, env) && evaluate(n.b, env);
    case "or": return evaluate(n.a, env) || evaluate(n.b, env);
    case "xor": return evaluate(n.a, env) !== evaluate(n.b, env);
    case "nand": return !(evaluate(n.a, env) && evaluate(n.b, env));
    case "nor": return !(evaluate(n.a, env) || evaluate(n.b, env));
  }
}

/** Output column of the truth table; row index bits follow `vars` with the first variable as the most significant bit. */
export function truthTable(n: Node, vars: string[]): boolean[] {
  const rows: boolean[] = [];
  for (let m = 0; m < 1 << vars.length; m++) {
    const env: Record<string, boolean> = {};
    vars.forEach((v, i) => { env[v] = ((m >> (vars.length - 1 - i)) & 1) === 1; });
    rows.push(evaluate(n, env));
  }
  return rows;
}

export type Implicant = { bits: number; mask: number }; // mask bit 1 = variable eliminated

const popcount = (x: number) => { let c = 0; while (x) { x &= x - 1; c++; } return c; };

export function primeImplicants(terms: number[]): Implicant[] {
  let cur: Implicant[] = terms.map((t) => ({ bits: t, mask: 0 }));
  const primes: Implicant[] = [];
  const key = (i: Implicant) => `${i.bits}/${i.mask}`;
  while (cur.length) {
    const used = new Set<string>(), next = new Map<string, Implicant>();
    for (let i = 0; i < cur.length; i++) for (let j = i + 1; j < cur.length; j++) {
      const a = cur[i], b = cur[j];
      if (a.mask !== b.mask) continue;
      const d = a.bits ^ b.bits;
      if (popcount(d) !== 1) continue;
      const c = { bits: a.bits & ~d, mask: a.mask | d };
      next.set(key(c), c); used.add(key(a)); used.add(key(b));
    }
    const seen = new Set<string>();
    for (const c of cur) if (!used.has(key(c)) && !seen.has(key(c))) { primes.push(c); seen.add(key(c)); }
    cur = [...next.values()];
  }
  return primes;
}

const covers = (i: Implicant, m: number) => (m & ~i.mask) === i.bits;

/** Smallest set of prime implicants covering all terms (fewest terms, then fewest literals). Exact search. */
export function minimalCover(primes: Implicant[], terms: number[], nVars: number): Implicant[] {
  const lits = (i: Implicant) => nVars - popcount(i.mask);
  let best: Implicant[] | null = null, bestCost = [Infinity, Infinity];
  const cost = (s: Implicant[]) => [s.length, s.reduce((a, i) => a + lits(i), 0)];
  function go(left: number[], chosen: Implicant[], avail: Implicant[]) {
    if (!left.length) { const c = cost(chosen); if (c[0] < bestCost[0] || (c[0] === bestCost[0] && c[1] < bestCost[1])) { best = [...chosen]; bestCost = c; } return; }
    if (chosen.length + 1 > bestCost[0]) return;
    // branch on the term with the fewest covering implicants
    let pick = left[0], opts = avail.filter((i) => covers(i, pick));
    for (const m of left) { const o = avail.filter((i) => covers(i, m)); if (o.length < opts.length) { pick = m; opts = o; } }
    opts.sort((a, b) => left.filter((m) => covers(b, m)).length - left.filter((m) => covers(a, m)).length || lits(a) - lits(b));
    for (const o of opts) go(left.filter((m) => !covers(o, m)), [...chosen, o], avail.filter((i) => i !== o));
  }
  go([...terms], [], primes);
  return best ?? [];
}

export function sopTerm(i: Implicant, vars: string[]) {
  const n = vars.length;
  const parts = vars.map((v, k) => { const bit = 1 << (n - 1 - k); return i.mask & bit ? "" : i.bits & bit ? v : `${v}'`; }).filter(Boolean);
  return parts.length ? parts.join("") : "1";
}
/** Sum term from an implicant of the zeros: a variable that is 1 there appears complemented. */
export function posTerm(i: Implicant, vars: string[]) {
  const n = vars.length;
  const parts = vars.map((v, k) => { const bit = 1 << (n - 1 - k); return i.mask & bit ? "" : i.bits & bit ? `${v}'` : v; }).filter(Boolean);
  return parts.length > 1 ? `(${parts.join(" + ")})` : parts[0] ?? "0";
}

export function analyze(src: string) {
  const ast = parse(src);
  const vars = variables(ast);
  if (vars.length > 8) throw new Error("Use at most 8 variables");
  const table = truthTable(ast, vars);
  const ones = table.flatMap((v, i) => (v ? [i] : [])), zeros = table.flatMap((v, i) => (v ? [] : [i]));
  const sop = ones.length === 0 ? "0" : zeros.length === 0 ? "1" : minimalCover(primeImplicants(ones), ones, vars.length).map((i) => sopTerm(i, vars)).sort((a, b) => a.replace(/'/g, "").localeCompare(b.replace(/'/g, "")) || a.length - b.length).join(" + ");
  const pos = zeros.length === 0 ? "1" : ones.length === 0 ? "0" : minimalCover(primeImplicants(zeros), zeros, vars.length).map((i) => posTerm(i, vars)).sort((a, b) => a.length - b.length || a.localeCompare(b)).join("");
  return { ast, vars, table, ones, zeros, sop, pos, kind: ones.length === 0 ? "contradiction" : zeros.length === 0 ? "tautology" : "contingent" as const };
}
