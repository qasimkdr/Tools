"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const FLOZ_PER_GAL = 128, ML_PER_FLOZ = 29.5735295625, L_PER_GAL = 3.785411784;
const RATIOS = [16, 20, 24, 25, 32, 40, 50, 100];
const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function GasOilMixCalculator() {
  const [s, set] = useUrlState({ mode: "oil", ratio: "50", gas: "1", gu: "gal", oil: "3.2", ou: "floz" });
  const ratio = Number(s.ratio);
  const metric = s.gu === "L";
  const gasL = metric ? Number(s.gas) : Number(s.gas) * L_PER_GAL;
  const oilMlNeeded = (gasL * 1000) / ratio;
  const oilMlHave = s.ou === "ml" ? Number(s.oil) : Number(s.oil) * ML_PER_FLOZ;
  const gasForOilL = (oilMlHave * ratio) / 1000;
  const toGas = s.mode === "gas";
  const err = !(ratio > 0) ? "Enter the mix ratio (for example 50 for 50:1)." : toGas ? (!(oilMlHave > 0) ? "Enter how much oil you have." : null) : !(gasL > 0) ? "Enter the amount of gas." : null;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Gas oil mix calculator">
          <Segmented label="Find" value={toGas ? "gas" : "oil"} onChange={(v) => set("mode", v)} options={[{ id: "oil", label: "Oil to add" }, { id: "gas", label: "Gas for my oil bottle" }]} />
          <div>
            <Field id="ratio" label="Mix ratio (gas : oil)" suffix=": 1" value={s.ratio} onChange={(v) => set("ratio", v)} min={1} hint="Use the ratio in your engine's manual or on the oil bottle" />
            <div className="mt-2 flex flex-wrap gap-2">{RATIOS.map((r) => <button key={r} type="button" onClick={() => set("ratio", String(r))} className={`rounded-full border px-3 py-1 text-sm ${ratio === r ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white" : "border-[var(--border)]"}`}>{r}:1</button>)}</div>
          </div>
          {toGas ? (
            <div className="grid grid-cols-[1fr_auto] items-end gap-2">
              <Field id="oil" label="Oil you have" value={s.oil} onChange={(v) => set("oil", v)} min={0} />
              <Segmented label="Unit" value={s.ou === "ml" ? "ml" : "floz"} onChange={(v) => set("ou", v)} options={[{ id: "floz", label: "fl oz" }, { id: "ml", label: "mL" }]} />
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_auto] items-end gap-2">
              <Field id="gas" label="Gas" value={s.gas} onChange={(v) => set("gas", v)} min={0} />
              <Segmented label="Unit" value={metric ? "L" : "gal"} onChange={(v) => set("gu", v)} options={[{ id: "gal", label: "US gal" }, { id: "L", label: "Liters" }]} />
            </div>
          )}
        </form>
        <ResultCard label={toGas ? "Gas to mix with it" : "Oil to add"} error={err} value={err ? "–" : toGas ? <span data-testid="gas-out">{f(gasForOilL / L_PER_GAL, 2)} gal</span> : <span data-testid="oil-out">{f(oilMlNeeded / ML_PER_FLOZ, 2)} fl oz</span>}>
          {!err && <>
            <p className="mt-1 text-sm muted">{toGas ? `${f(gasForOilL, 2)} liters of gas` : `${f(oilMlNeeded, 1)} mL · about ${f((oilMlNeeded / ML_PER_FLOZ) * 2, 1)} tablespoons`}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Ratio" v={`${ratio}:1 (${f(100 / ratio, 2)}% oil)`} />
              <Stat k={`Oil per US gallon at ${ratio}:1`} v={`${f(FLOZ_PER_GAL / ratio, 2)} fl oz`} />
              <Stat k={`Oil per liter at ${ratio}:1`} v={<span data-testid="per-l">{f(1000 / ratio, 1)} mL</span>} />
              <Stat k="Total mixed fuel" v={toGas ? `${f(gasForOilL + oilMlHave / 1000, 2)} L` : `${f(gasL + oilMlNeeded / 1000, 2)} L`} />
            </dl>
            <p className="mt-4 text-xs subtle">Pour in half the gas, add the oil, close the can and shake, then add the rest of the gas. Use the ratio your engine maker specifies; too little oil can seize an engine.</p>
          </>}
        </ResultCard>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-base font-semibold">Oil per US gallons of gas (fl oz)</h2>
          <table className="mt-3 w-full text-sm" data-testid="chart-gal">
            <thead><tr className="text-left subtle"><th className="py-1">Gas</th>{[25, 32, 40, 50].map((r) => <th key={r}>{r}:1</th>)}</tr></thead>
            <tbody>{[1, 2, 2.5, 5].map((g) => <tr key={g} className="border-t border-[var(--border)]"><td className="py-1">{g} gal</td>{[25, 32, 40, 50].map((r) => <td key={r}>{f((g * 128) / r, 1)}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div>
          <h2 className="text-base font-semibold">Oil per liters of gas (mL)</h2>
          <table className="mt-3 w-full text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Gas</th>{[25, 32, 40, 50].map((r) => <th key={r}>{r}:1</th>)}</tr></thead>
            <tbody>{[1, 4, 5, 10].map((l) => <tr key={l} className="border-t border-[var(--border)]"><td className="py-1">{l} L</td>{[25, 32, 40, 50].map((r) => <td key={r}>{f((l * 1000) / r, 0)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
