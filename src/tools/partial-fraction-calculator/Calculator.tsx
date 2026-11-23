"use client";
import { ResultCard } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { decompose, deg, polyStr, qstr, verify, type PFResult } from "@/lib/partialFractions";

const EXAMPLES: [string, string, string][] = [
  ["Distinct linear", "3x+5", "x^2-x-2"],
  ["Repeated", "5x-4", "(x-1)(x+2)^2"],
  ["Quadratic", "2x^2+3", "x^3+x"],
  ["Improper", "x^3", "x^2-1"],
  ["Laplace (s)", "s+3", "s^2+3s+2"],
];

export default function PartialFractionCalculator() {
  const [s, set, setAll] = useUrlState({ n: "3x+5", d: "x^2-x-2" });
  let r: PFResult | null = null, err: string | null = null, ok = false;
  try { r = decompose(s.n, s.d); ok = verify(s.n, s.d, r); } catch (e) { err = (e as Error).message; }
  const v = r?.v ?? "x";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Partial fraction calculator">
        <div>
          <label htmlFor="num" className="label">Numerator</label>
          <input id="num" className="field font-mono" value={s.n} onChange={(e) => set("n", e.target.value)} spellCheck={false} autoComplete="off" maxLength={200} />
        </div>
        <div className="border-t-2 border-[var(--text)]" aria-hidden />
        <div>
          <label htmlFor="den" className="label">Denominator</label>
          <input id="den" className="field font-mono" value={s.d} onChange={(e) => set("d", e.target.value)} spellCheck={false} autoComplete="off" maxLength={200} />
          <p className="mt-1 text-xs subtle">Type it expanded or factored: <code>x^3+x</code>, <code>x(x^2+1)</code>, <code>(x-1)(x+2)^2</code>. Use ^ for powers. Any one letter works as the variable (x, s, t…).</p>
        </div>
        <div>
          <span className="label">Try an example</span>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map(([label, n, d]) => <button key={label} type="button" className="btn-ghost px-3 py-1.5 text-xs" onClick={() => setAll({ n, d })}>{label}</button>)}
          </div>
        </div>
      </form>
      <ResultCard error={err} label="Partial fraction decomposition" value={r ? <span className="font-mono text-2xl break-words" data-testid="decomposition">{r.result}</span> : "–"}>
        {r && <>
          <p className="mt-2 text-sm" data-testid="check">{ok ? "✓ Checked: both sides agree exactly at test values." : "Check failed. Please report this input."}</p>
          <ol className="mt-4 space-y-3 text-sm">
            {r.quotient && deg(r.quotient) !== -Infinity && (
              <li><strong>Divide first</strong> (the numerator&apos;s degree is not lower than the denominator&apos;s): quotient <span className="font-mono">{polyStr(r.quotient, v)}</span>, remainder <span className="font-mono">{polyStr(r.remainder, v)}</span>.</li>
            )}
            <li><strong>Factor the denominator:</strong> <span className="font-mono" data-testid="factored">{r.denominatorFactored}</span></li>
            <li><strong>Set up the form</strong> (one term per factor power; quadratic factors get a linear numerator):<br /><span className="font-mono">({polyStr(r.remainder, v)}) / ({r.denominatorFactored}) = {r.setup}</span></li>
            <li><strong>Multiply through and compare coefficients:</strong>
              <ul className="mt-1 font-mono text-xs">{r.equations.map((e) => <li key={e}>{e}</li>)}</ul>
            </li>
            <li><strong>Solve:</strong> <span className="font-mono">{r.unknowns.map((u) => `${u.label} = ${qstr(u.value)}`).join(", ")}</span></li>
          </ol>
        </>}
      </ResultCard>
    </div>
  );
}
