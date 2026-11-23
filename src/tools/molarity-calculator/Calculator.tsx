"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { molarMass, parseFormula } from "@/lib/chem";

const VOL: Record<string, number> = { L: 1, mL: 1e-3, "µL": 1e-6 };
const CONC: Record<string, number> = { M: 1, mM: 1e-3, "µM": 1e-6 };
const MASS: Record<string, number> = { g: 1, mg: 1e-3, "µg": 1e-6, kg: 1e3 };
const sig = (x: number, n = 5) => (Number.isFinite(x) ? Number(x.toPrecision(n)).toLocaleString("en-US", { maximumFractionDigits: 10 }) : "–");
/** Pick the most readable unit for a value given in base units. */
const best = (x: number, table: Record<string, number>) => { const e = Object.entries(table).sort((a, b) => b[1] - a[1]).find(([, f]) => Math.abs(x) >= f) ?? Object.entries(table).sort((a, b) => a[1] - b[1])[0]; return `${sig(x / e[1])} ${e[0]}`; };

export default function MolarityCalculator() {
  const [s, set] = useUrlState({ mode: "mass", cmp: "NaCl", m: "0.5", mu: "M", v: "250", vu: "mL", g: "10", gu: "g", c1: "1", c1u: "M", c2: "0.1", c2u: "M", v2: "500", v2u: "mL" });
  let mw = NaN, mwErr: string | null = null;
  const t = s.cmp.trim();
  if (/^\d*\.?\d+$/.test(t)) mw = Number(t);
  else { try { mw = molarMass(parseFormula(t)); } catch (e) { mwErr = (e as Error).message; } }
  const M = Number(s.m) * (CONC[s.mu] ?? 1), V = Number(s.v) * (VOL[s.vu] ?? 1e-3), G = Number(s.g) * (MASS[s.gu] ?? 1);
  const unit = (id: string, val: string, table: Record<string, number>) => (
    <select aria-label="unit" className="field !w-auto" value={val} onChange={(e) => set(id as "mu", e.target.value)}>{Object.keys(table).map((k) => <option key={k}>{k}</option>)}</select>
  );
  const mode = s.mode;
  const dil = mode === "dilute";
  let main = "–", steps: string[] = [], extra: [string, string][] = [];
  let err: string | null = null;
  if (dil) {
    const C1 = Number(s.c1) * (CONC[s.c1u] ?? 1), C2 = Number(s.c2) * (CONC[s.c2u] ?? 1), V2 = Number(s.v2) * (VOL[s.v2u] ?? 1e-3);
    if (!(C1 > 0 && C2 > 0 && V2 > 0)) err = "Enter the stock and final concentrations and the final volume.";
    else if (C2 > C1) err = "The final concentration can't be higher than the stock.";
    else {
      const V1 = (C2 * V2) / C1;
      main = best(V1, VOL);
      steps = [`V₁ = M₂ × V₂ ÷ M₁ = ${sig(C2)} M × ${sig(V2)} L ÷ ${sig(C1)} M = ${sig(V1)} L`];
      extra = [["Stock solution", best(V1, VOL)], ["Add solvent", best(V2 - V1, VOL)], ["Dilution factor", `${sig(C1 / C2)}×`]];
    }
  } else if (mwErr || !(mw > 0)) err = mwErr ?? "Enter a chemical formula (e.g. NaCl) or a molar mass in g/mol.";
  else if (mode === "mass") {
    if (!(M > 0 && V > 0)) err = "Enter the molarity and volume.";
    else { const mol = M * V, g = mol * mw; main = best(g, MASS); steps = [`moles = M × V = ${sig(M)} mol/L × ${sig(V)} L = ${sig(mol)} mol`, `mass = moles × molar mass = ${sig(mol)} × ${sig(mw)} g/mol = ${sig(g)} g`]; extra = [["Moles of solute", `${sig(mol)} mol`]]; }
  } else if (mode === "molarity") {
    if (!(G > 0 && V > 0)) err = "Enter the mass of solute and the volume.";
    else { const mol = G / mw, c = mol / V; main = `${sig(c, 4)} M`; steps = [`moles = mass ÷ molar mass = ${sig(G)} g ÷ ${sig(mw)} g/mol = ${sig(mol)} mol`, `M = moles ÷ volume = ${sig(mol)} mol ÷ ${sig(V)} L = ${sig(c)} M`]; extra = [["Moles of solute", `${sig(mol)} mol`], ["Millimolar", `${sig(c * 1000)} mM`], ["Mass concentration", `${sig(G / V)} g/L`]]; }
  } else {
    if (!(G > 0 && M > 0)) err = "Enter the mass of solute and the molarity.";
    else { const mol = G / mw, vol = mol / M; main = best(vol, VOL); steps = [`moles = ${sig(G)} g ÷ ${sig(mw)} g/mol = ${sig(mol)} mol`, `V = moles ÷ M = ${sig(mol)} ÷ ${sig(M)} = ${sig(vol)} L`]; extra = [["Moles of solute", `${sig(mol)} mol`]]; }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Molarity calculator">
        <Segmented label="Find" value={["mass", "molarity", "volume", "dilute"].includes(mode) ? mode : "mass"} onChange={(v) => set("mode", v)} options={[{ id: "mass", label: "Mass needed" }, { id: "molarity", label: "Molarity" }, { id: "volume", label: "Volume" }, { id: "dilute", label: "Dilution" }]} />
        {!dil && <div>
          <label htmlFor="cmp" className="label">Compound formula or molar mass (g/mol)</label>
          <input id="cmp" className="field font-mono" value={s.cmp} onChange={(e) => set("cmp", e.target.value)} spellCheck={false} />
          <p className="mt-1 text-xs subtle">{mw > 0 && !mwErr ? <>Molar mass: <strong data-testid="mw">{sig(mw, 6)} g/mol</strong></> : "e.g. NaCl, C6H12O6, CuSO4·5H2O or 58.44"}</p>
        </div>}
        {dil ? <>
          <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="c1" label="Stock concentration (M₁)" value={s.c1} onChange={(v) => set("c1", v)} min={0} />{unit("c1u", s.c1u, CONC)}</div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="c2" label="Final concentration (M₂)" value={s.c2} onChange={(v) => set("c2", v)} min={0} />{unit("c2u", s.c2u, CONC)}</div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="v2" label="Final volume (V₂)" value={s.v2} onChange={(v) => set("v2", v)} min={0} />{unit("v2u", s.v2u, VOL)}</div>
        </> : <>
          {mode !== "molarity" && <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="m" label="Molarity" value={s.m} onChange={(v) => set("m", v)} min={0} />{unit("mu", s.mu, CONC)}</div>}
          {mode !== "volume" && <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="v" label="Solution volume" value={s.v} onChange={(v) => set("v", v)} min={0} />{unit("vu", s.vu, VOL)}</div>}
          {mode !== "mass" && <div className="grid grid-cols-[1fr_auto] items-end gap-2"><Field id="g" label="Mass of solute" value={s.g} onChange={(v) => set("g", v)} min={0} />{unit("gu", s.gu, MASS)}</div>}
        </>}
      </form>
      <ResultCard label={dil ? "Volume of stock to use" : mode === "mass" ? "Mass of solute to weigh" : mode === "molarity" ? "Molarity" : "Solution volume"} error={err} value={main}>
        {!err && <>
          <ol className="mt-3 space-y-1 text-sm muted" data-testid="steps">{steps.map((x) => <li key={x}>{x}</li>)}</ol>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">{extra.map(([k, v]) => <Stat key={k} k={k} v={<span data-testid={`x-${k.split(" ")[0].toLowerCase()}`}>{v}</span>} />)}</dl>
          <p className="mt-4 text-xs subtle">{dil ? "Add the stock to part of the solvent, then make up to the final volume." : "Dissolve the solute in less solvent than the final volume, then top up to the mark in a volumetric flask: molarity is per liter of solution, not of solvent."} Check hydrates (e.g. ·5H₂O) match the reagent you use.</p>
        </>}
      </ResultCard>
    </div>
  );
}
