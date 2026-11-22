"use client";
import { ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { invert, matMul, parseQ, toNum, toStr, type Q } from "@/lib/rational";

const SIZES = ["2", "3", "4", "5", "6"] as const;
const DEFAULT: Record<string, string> = { "2": "4,7;2,6", "3": "1,2,3;0,1,4;5,6,0" };

function Grid({ m, mono = true }: { m: string[][]; mono?: boolean }) {
  return (
    <div className="mt-2 inline-grid gap-1 rounded-lg border-x-2 border-[var(--text)] px-2 py-1" style={{ gridTemplateColumns: `repeat(${m[0].length}, minmax(3rem, auto))` }}>
      {m.flat().map((v, i) => <span key={i} className={`px-1 text-right text-sm tabular-nums ${mono ? "font-mono" : ""}`}>{v}</span>)}
    </div>
  );
}

export default function MatrixInverseCalculator() {
  const [s, set] = useUrlState({ n: "3", m: DEFAULT["3"], view: "frac" });
  const n = Number(SIZES.includes(s.n as "2") ? s.n : "3");
  const rows = s.m.split(";").map((r) => r.split(","));
  const cell = (i: number, j: number) => rows[i]?.[j] ?? (i === j ? "1" : "0");
  const setCell = (i: number, j: number, v: string) => {
    const g = Array.from({ length: n }, (_, a) => Array.from({ length: n }, (_, b) => (a === i && b === j ? v.replace(/[;,]/g, "") : cell(a, b))));
    set("m", g.map((r) => r.join(",")).join(";"));
  };
  const resize = (k: string) => { set("n", k); set("m", DEFAULT[k] ?? Array.from({ length: Number(k) }, (_, a) => Array.from({ length: Number(k) }, (_, b) => (a === b ? "1" : "0")).join(",")).join(";")); };
  const parsed = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => parseQ(cell(i, j))));
  const bad = parsed.flat().some((x) => x === null);
  const A = parsed as Q[][];
  const res = bad ? null : invert(A);
  const show = (x: Q) => (s.view === "dec" ? (+toNum(x).toFixed(6)).toString() : toStr(x));
  const check = res?.inverse ? matMul(A, res.inverse).every((r, i) => r.every((x, j) => x.n === (i === j ? 1n : 0n) && x.d === 1n)) : false;
  const error = bad ? "Enter numbers, decimals or fractions (like 3, -2.5 or 1/3) in every cell." : res && !res.inverse ? "The determinant is 0, so this matrix is singular and has no inverse." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Inverse matrix calculator">
        <Segmented label="Matrix size" value={String(n) as "3"} onChange={resize} options={SIZES.map((k) => ({ id: k, label: `${k}×${k}` }))} />
        <div>
          <span className="label">Matrix A</span>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {Array.from({ length: n * n }, (_, k) => { const i = Math.floor(k / n), j = k % n; return (
              <input key={k} aria-label={`Row ${i + 1}, column ${j + 1}`} className="field !px-2 text-center font-mono" value={cell(i, j)} onChange={(e) => setCell(i, j, e.target.value)} inputMode="decimal" />
            ); })}
          </div>
          <p className="mt-1 text-xs subtle">Integers, decimals or fractions such as 1/3.</p>
        </div>
        <Segmented label="Show answer as" value={s.view === "dec" ? "dec" : "frac"} onChange={(v) => set("view", v)} options={[{ id: "frac", label: "Fractions" }, { id: "dec", label: "Decimals" }]} />
      </form>
      <ResultCard error={error} label="Determinant" value={res ? show(res.det) : ""}>
        {res?.inverse && <>
          <p className="mt-4 text-sm font-medium">Inverse A⁻¹</p>
          <div data-testid="inverse"><Grid m={res.inverse.map((r) => r.map(show))} /></div>
          <p className={`mt-3 text-sm ${check ? "text-[var(--color-brand-600)]" : "text-amber-700"}`}>{check ? "✓ Checked: A × A⁻¹ = I (identity matrix)" : "Check failed"}</p>
          <details className="mt-3 text-sm">
            <summary className="cursor-pointer font-medium">Gauss-Jordan steps ({res.steps.length})</summary>
            <p className="mt-1 text-xs subtle">Start with [A | I] and apply these row operations until the left side is I; the right side is then A⁻¹.</p>
            <ol className="mt-2 list-decimal space-y-0.5 pl-5 font-mono text-xs" data-testid="steps">{res.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
          </details>
        </>}
      </ResultCard>
    </div>
  );
}
