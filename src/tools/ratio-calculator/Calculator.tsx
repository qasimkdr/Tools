"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { gcd, num, simplify, solveProportion, splitTotal } from "@/lib/ratio";

type Mode = "simplify" | "solve" | "scale" | "split";
const DEFAULTS = { mode: "simplify", terms: "12:18", a: "3", b: "4", c: "9", d: "", factor: "2", total: "100" };
const parse = (t: string) => t.split(/[:/,\s]+/).filter(Boolean).map(Number);
const COLORS = ["#0d6b5a", "#d97706", "#3aa48d", "#78716c", "#0a5548", "#f2c98a"];

export default function RatioCalculator() {
  const [s, set] = useUrlState(DEFAULTS);
  const mode = (["simplify", "solve", "scale", "split"].includes(s.mode) ? s.mode : "simplify") as Mode;
  const terms = parse(s.terms);
  const termsOk = terms.length >= 2 && terms.length <= 6 && terms.every((t) => Number.isFinite(t) && t >= 0) && terms.some((t) => t > 0);
  let error: string | null = null, label = "", value = "", stats: { k: string; v: string }[] = [], steps: string[] = [], bar: number[] = [];

  if (mode === "solve") {
    const N = (x: string) => (x.trim() === "" ? null : Number(x));
    const v = { a: N(s.a), b: N(s.b), c: N(s.c), d: N(s.d) };
    const r = solveProportion(v);
    if (!r) error = "Fill three of A, B, C, D and leave one empty. Values used as divisors can't be zero.";
    else {
      const f = (x: number | null) => (x === null ? "x" : num(x));
      label = `Missing value (${r.key.toUpperCase()})`; value = num(r.value);
      steps = [`${f(v.a)} : ${f(v.b)} = ${f(v.c)} : ${f(v.d)}`, `Cross-multiply: ${f(v.a)} × ${f(v.d)} = ${f(v.b)} × ${f(v.c)}`, `x = ${num(r.value)}`];
    }
  } else if (!termsOk) {
    error = "Enter 2 to 6 non-negative numbers separated by colons, e.g. 12:18 or 1:2:3.";
  } else if (mode === "simplify") {
    const simp = simplify(terms); const sum = simp.reduce((a, b) => a + b, 0);
    label = "Simplest form"; value = simp.map((x) => num(x)).join(" : "); bar = simp;
    const g = terms.every(Number.isInteger) ? terms.reduce((a, t) => gcd(a, t), 0) : null;
    steps = g ? [`Greatest common factor of ${terms.join(", ")} = ${g}`, `Divide each term by ${g}: ${terms.map((t) => `${t} ÷ ${g}`).join(", ")}`] : [`Scale decimals to whole numbers, then divide by their common factor`];
    stats = simp.map((t, i) => ({ k: `Part ${i + 1} share`, v: `${num((t / sum) * 100, 2)}% (${num(t)}/${num(sum)})` }));
    if (simp.length === 2 && simp[1] !== 0) stats.push({ k: "As a single number", v: `${num(simp[0] / simp[1], 4)} (${num(simp[0])}/${num(simp[1])})` }, { k: "As 1 : n", v: simp[0] ? `1 : ${num(simp[1] / simp[0], 4)}` : "—" });
  } else if (mode === "scale") {
    const k = Number(s.factor);
    if (!(k > 0)) error = "Enter a scale factor above 0 (e.g. 2 to double, 0.5 to halve).";
    else { const out = terms.map((t) => t * k); label = `Scaled ×${num(k)}`; value = out.map((x) => num(x)).join(" : "); bar = out; steps = [`Multiply every term by ${num(k)}: ${terms.map((t) => `${num(t)} × ${num(k)}`).join(", ")}`, "Scaling keeps the ratio equivalent."]; }
  } else {
    const T = Number(s.total);
    if (!Number.isFinite(T)) error = "Enter the total to split.";
    else {
      const parts = splitTotal(T, terms), sum = terms.reduce((a, b) => a + b, 0);
      label = `Split ${num(T)} in ${terms.map((t) => num(t)).join(":")}`; value = parts.map((x) => num(x, 2)).join(" / "); bar = terms;
      steps = [`Total parts: ${terms.map((t) => num(t)).join(" + ")} = ${num(sum)}`, `One part = ${num(T)} ÷ ${num(sum)} = ${num(T / sum, 4)}`, ...terms.map((t, i) => `Part ${i + 1}: ${num(t)} × ${num(T / sum, 4)} = ${num(parts[i], 2)}`)];
    }
  }
  const barSum = bar.reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Ratio calculator">
        <Segmented label="What do you want to do?" value={mode} onChange={(v) => set("mode", v)}
          options={[{ id: "simplify", label: "Simplify" }, { id: "solve", label: "Solve A:B = C:D" }, { id: "scale", label: "Scale" }, { id: "split", label: "Split a total" }]} />
        {mode === "solve" ? (
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-end gap-2">
            <Field id="r-a" label="A" value={s.a} onChange={(v) => set("a", v)} /><span className="pb-3 font-bold subtle">:</span>
            <Field id="r-b" label="B" value={s.b} onChange={(v) => set("b", v)} /><span className="pb-3 font-bold subtle">=</span>
            <Field id="r-c" label="C" value={s.c} onChange={(v) => set("c", v)} /><span className="pb-3 font-bold subtle">:</span>
            <Field id="r-d" label="D" value={s.d} onChange={(v) => set("d", v)} />
          </div>
        ) : (
          <div>
            <label htmlFor="terms" className="label">Ratio</label>
            <input id="terms" className="field text-lg font-semibold tabular-nums" value={s.terms} onChange={(e) => set("terms", e.target.value)} placeholder="e.g. 12:18 or 1:2:3" />
            <p className="mt-1 text-xs subtle">Separate terms with colons. Up to 6 terms; decimals allowed.</p>
          </div>
        )}
        {mode === "scale" && <Field id="factor" label="Scale factor" value={s.factor} onChange={(v) => set("factor", v)} hint="2 doubles, 0.5 halves." />}
        {mode === "split" && <Field id="total" label="Total to split" value={s.total} onChange={(v) => set("total", v)} />}
      </form>
      <ResultCard error={error} label={label} value={value}>
        {bar.length > 0 && barSum > 0 && (
          <div className="mt-5">
            <div className="flex h-4 overflow-hidden rounded-full" aria-label="Ratio parts">
              {bar.map((t, i) => <div key={i} style={{ width: `${(t / barSum) * 100}%`, background: COLORS[i % COLORS.length] }} />)}
            </div>
          </div>
        )}
        {stats.length > 0 && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">{stats.map((x) => <Stat key={x.k} k={x.k} v={x.v} />)}</dl>}
        {steps.length > 0 && <ol className="mt-4 space-y-2 text-sm">{steps.map((st, i) => <li key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono"><span className="mr-2 subtle">{i + 1}.</span>{st}</li>)}</ol>}
      </ResultCard>
    </div>
  );
}
