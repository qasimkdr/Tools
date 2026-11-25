"use client";
import { Field, ResultCard } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { ATOMIC_WEIGHTS, NO_STABLE, molarMass, parseFormula } from "@/lib/chem";

const EXAMPLES = ["H2O", "NaCl", "C6H12O6", "CO2", "H2SO4", "CuSO4·5H2O", "Ca(OH)2", "C8H10N4O2"];

export default function MolecularWeightCalculator() {
  const [s, set] = useUrlState({ f: "C6H12O6", g: "100", mol: "" });
  let counts: Record<string, number> | null = null, error: string | null = null;
  try { counts = parseFormula(s.f); } catch (e) { error = (e as Error).message; }
  const mm = counts ? molarMass(counts) : NaN;
  const g = Number(s.g), mol = Number(s.mol);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Molecular weight calculator">
        <div>
          <label htmlFor="f" className="label">Chemical formula</label>
          <input id="f" className="field font-mono text-lg" value={s.f} onChange={(e) => set("f", e.target.value)} placeholder="e.g. CuSO4·5H2O" spellCheck={false} autoCapitalize="off" />
          <p className="mt-1 text-xs subtle">Case-sensitive. Brackets and hydrates (·, . or *) are supported.</p>
        </div>
        <div>
          <span className="label">Examples</span>
          <div className="flex flex-wrap gap-2">{EXAMPLES.map((x) => <button key={x} type="button" className="chip font-mono" aria-pressed={s.f === x} onClick={() => set("f", x)}>{x}</button>)}</div>
        </div>
        {counts && (
          <div className="card space-y-3 p-4">
            <h2 className="font-semibold">Grams ↔ moles</h2>
            <div className="grid grid-cols-2 gap-3">
              <Field id="g" label="Mass" suffix="g" value={s.g} onChange={(v) => set("g", v)} min={0} />
              <Field id="mol" label="Amount" suffix="mol" value={s.mol} onChange={(v) => set("mol", v)} min={0} />
            </div>
            <p className="text-sm muted" data-testid="convert">
              {g > 0 && <>{s.g} g = <strong className="text-[var(--text)]">{(g / mm).toPrecision(5)} mol</strong>. </>}
              {mol > 0 && <>{s.mol} mol = <strong className="text-[var(--text)]">{(mol * mm).toPrecision(6)} g</strong>.</>}
            </p>
          </div>
        )}
      </form>
      <ResultCard error={error} label={`Molar mass of ${s.f}`} value={`${mm.toFixed(3)} g/mol`}>
        {counts && (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead><tr className="text-left subtle"><th className="py-1 pr-3 font-medium">Element</th><th className="pr-3 font-medium">Atoms</th><th className="pr-3 font-medium">Atomic weight</th><th className="pr-3 font-medium">Mass</th><th className="font-medium">Mass %</th></tr></thead>
              <tbody>{Object.entries(counts).map(([el, n]) => (
                <tr key={el} className="border-t border-[var(--border)]">
                  <td className="py-1.5 pr-3 font-semibold">{el}</td><td className="pr-3">{n}</td>
                  <td className="pr-3">{NO_STABLE.has(el) ? `[${ATOMIC_WEIGHTS[el]}]` : ATOMIC_WEIGHTS[el]}</td>
                  <td className="pr-3">{(ATOMIC_WEIGHTS[el] * n).toFixed(3)}</td><td>{((ATOMIC_WEIGHTS[el] * n * 100) / mm).toFixed(2)}%</td>
                </tr>))}
              </tbody>
            </table>
            <p className="mt-3 text-xs subtle">Sum of (atoms × atomic weight). [ ] = mass number of the most stable isotope.</p>
          </div>
        )}
      </ResultCard>
    </div>
  );
}
