"use client";
import { Field, ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { num, solveProportion } from "@/lib/ratio";

const DEFAULTS = { a: "3", b: "4", c: "", d: "8", type: "direct" };
const N = (s: string) => (s.trim() === "" ? null : Number(s));

export default function ProportionCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const inverse = s.type === "inverse";
  const v = { a: N(s.a), b: N(s.b), c: N(s.c), d: N(s.d) };
  const blanks = Object.values(v).filter((x) => x === null).length;
  const bad = Object.values(v).some((x) => x !== null && !Number.isFinite(x));
  let error: string | null = null, value = "", steps: string[] = [], label = "";

  if (bad) error = "Enter numbers only.";
  else if (blanks > 1) error = "Leave exactly one box empty: that's the value to solve for. Fill all four to check a proportion.";
  else if (blanks === 1) {
    const r = solveProportion(v, inverse);
    if (!r) error = "That combination divides by zero. Change the zero value to solve.";
    else {
      const k = r.key.toUpperCase(), f = (x: number | null) => (x === null ? "x" : num(x));
      const [A, B, C, D] = [f(v.a), f(v.b), f(v.c), f(v.d)];
      label = `Missing value (${k})`; value = `${k} = ${num(r.value)}`;
      steps = inverse
        ? [`Inverse proportion: ${A} × ${B} = ${C} × ${D}`, `Solve for x: x = ${r.key === "a" || r.key === "b" ? `${C} × ${D} ÷ ${r.key === "a" ? B : A}` : `${A} × ${B} ÷ ${r.key === "c" ? D : C}`}`, `x = ${num(r.value)}`]
        : [`Write as fractions: ${A}/${B} = ${C}/${D}`, `Cross-multiply: ${A} × ${D} = ${B} × ${C}`,
           `Solve for x: x = ${r.key === "a" ? `${B} × ${C} ÷ ${D}` : r.key === "b" ? `${A} × ${D} ÷ ${C}` : r.key === "c" ? `${A} × ${D} ÷ ${B}` : `${B} × ${C} ÷ ${A}`}`, `x = ${num(r.value)}`];
    }
  } else {
    const [a, b, c, d] = [v.a!, v.b!, v.c!, v.d!];
    const left = inverse ? a * b : a * d, right = inverse ? c * d : b * c;
    if ((!inverse && (b === 0 || d === 0))) error = "A denominator can't be zero.";
    else {
      const eq = Math.abs(left - right) < 1e-9 * Math.max(1, Math.abs(left), Math.abs(right));
      label = "Is it a proportion?"; value = eq ? "Yes, they're equal" : "No, not equal";
      steps = [inverse ? `Compare ${num(a)} × ${num(b)} = ${num(left)} with ${num(c)} × ${num(d)} = ${num(right)}` : `Cross products: ${num(a)} × ${num(d)} = ${num(left)} and ${num(b)} × ${num(c)} = ${num(right)}`,
        eq ? "The products match, so the two ratios are equivalent." : `The products differ by ${num(Math.abs(left - right))}.`];
    }
  }

  const box = (k: "a" | "b" | "c" | "d", lab: string) => <Field id={`p-${k}`} label={lab} value={s[k]} onChange={(x) => set(k, x)} />;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Proportion calculator">
        <Segmented label="Type" value={inverse ? "inverse" : "direct"} onChange={(x) => set("type", x)} options={[{ id: "direct", label: "Direct (a/b = c/d)" }, { id: "inverse", label: "Inverse (a × b = c × d)" }]} />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-2">{box("a", "A")}<div className="h-px bg-[var(--text)] opacity-40" />{box("b", "B")}</div>
          <span className="text-2xl font-bold subtle" aria-hidden>{inverse ? "⇄" : "="}</span>
          <div className="space-y-2">{box("c", "C")}<div className="h-px bg-[var(--text)] opacity-40" />{box("d", "D")}</div>
        </div>
        <p className="text-sm subtle">Leave one box empty to solve for it. Fill all four to check whether the ratios are equal.</p>
        <button type="button" className="btn-ghost" onClick={() => { set("a", ""); set("b", ""); set("c", ""); set("d", ""); }}>Clear</button>
      </form>
      <ResultCard error={error} label={label} value={value}>
        <ol className="mt-5 space-y-2 text-sm">
          {steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono"><span className="mr-2 subtle">{i + 1}.</span>{st}</li>)}
        </ol>
      </ResultCard>
    </div>
  );
}
