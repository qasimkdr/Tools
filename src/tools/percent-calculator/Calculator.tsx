"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const n = (x: number, d = 4) => (Number.isFinite(x) ? Number(x.toFixed(d)).toLocaleString("en-US", { maximumFractionDigits: d }) : "–");
const MODES = [
  { id: "of", label: "X% of Y", a: "Percent (X)", b: "Number (Y)" },
  { id: "what", label: "X is what % of Y", a: "Part (X)", b: "Whole (Y)" },
  { id: "change", label: "% change from A to B", a: "Old value (A)", b: "New value (B)" },
  { id: "diff", label: "% difference between A and B", a: "Value A", b: "Value B" },
  { id: "whole", label: "X is Y% of what", a: "Part (X)", b: "Percent (Y)" },
  { id: "inc", label: "Increase / decrease by %", a: "Starting number", b: "Percent (− to decrease)" },
] as const;

export default function PercentCalculator() {
  const [s, set] = useUrlState({ mode: "of", a: "20", b: "150" });
  const mode = MODES.find((m) => m.id === s.mode) ?? MODES[0];
  const a = Number(s.a), b = Number(s.b);
  let result = NaN, unit = "", steps: string[] = [], extra: [string, string][] = [];
  switch (mode.id) {
    case "of": result = (a / 100) * b; steps = [`${n(a)}% = ${n(a / 100)}`, `${n(a / 100)} × ${n(b)} = ${n(result)}`]; extra = [["Remaining", n(b - result)], ["As a fraction", `${n(a)}/100 of ${n(b)}`]]; break;
    case "what": result = (a / b) * 100; unit = "%"; steps = [`${n(a)} ÷ ${n(b)} = ${n(a / b, 6)}`, `× 100 = ${n(result)}%`]; break;
    case "change": result = ((b - a) / Math.abs(a)) * 100; unit = "%"; steps = [`Difference: ${n(b)} − ${n(a)} = ${n(b - a)}`, `÷ |${n(a)}| = ${n((b - a) / Math.abs(a), 6)}`, `× 100 = ${n(result)}%`]; extra = [["Direction", b > a ? "Increase" : b < a ? "Decrease" : "No change"], ["Change in value", n(b - a)], ["Multiplier", `${n(b / a)}×`]]; break;
    case "diff": result = (Math.abs(a - b) / ((a + b) / 2)) * 100; unit = "%"; steps = [`|${n(a)} − ${n(b)}| = ${n(Math.abs(a - b))}`, `Average: (${n(a)} + ${n(b)}) ÷ 2 = ${n((a + b) / 2)}`, `${n(Math.abs(a - b))} ÷ ${n((a + b) / 2)} × 100 = ${n(result)}%`]; extra = [["% change A → B", `${n(((b - a) / Math.abs(a)) * 100)}%`], ["% change B → A", `${n(((a - b) / Math.abs(b)) * 100)}%`]]; break;
    case "whole": result = a / (b / 100); steps = [`${n(b)}% = ${n(b / 100)}`, `${n(a)} ÷ ${n(b / 100)} = ${n(result)}`]; break;
    case "inc": result = a * (1 + b / 100); steps = [`1 ${b >= 0 ? "+" : "−"} ${n(Math.abs(b) / 100)} = ${n(1 + b / 100)}`, `${n(a)} × ${n(1 + b / 100)} = ${n(result)}`]; extra = [[b >= 0 ? "Amount added" : "Amount removed", n(Math.abs(result - a))], ["To get back to the start", `${n(((a - result) / Math.abs(result)) * 100)}%`]]; break;
  }
  const err = !Number.isFinite(a) || !Number.isFinite(b) || s.a === "" || s.b === "" ? "Enter both numbers." : !Number.isFinite(result) ? "That calculation divides by zero; check the numbers." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Percent calculator">
        <div>
          <span className="label">What do you want to calculate?</span>
          <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Calculation type">
            {MODES.map((m) => <button key={m.id} type="button" aria-pressed={m.id === mode.id} onClick={() => set("mode", m.id)} className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${m.id === mode.id ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white" : "border-[var(--border)] muted hover:text-[var(--text)]"}`}>{m.label}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="a" label={mode.a} value={s.a} onChange={(v) => set("a", v)} />
          <Field id="b" label={mode.b} value={s.b} onChange={(v) => set("b", v)} />
        </div>
      </form>
      <ResultCard label={mode.label.replace("X", s.a || "X").replace("Y", s.b || "Y").replace(/\bA\b/, s.a || "A").replace(/\bB\b/, s.b || "B")} error={err} value={err ? "–" : <span data-testid="answer">{n(result)}{unit}</span>}>
        {!err && <>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm muted" data-testid="steps">{steps.map((x) => <li key={x}>{x}</li>)}</ol>
          {extra.length > 0 && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">{extra.map(([k, v]) => <Stat key={k} k={k} v={v} />)}</dl>}
        </>}
      </ResultCard>
    </div>
  );
}
