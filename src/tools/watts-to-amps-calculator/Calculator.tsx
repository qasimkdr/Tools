"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");

export default function WattsToAmpsCalculator() {
  const [s, set] = useUrlState({ dir: "w2a", sys: "ac1", p: "1500", pu: "W", a: "10", v: "120", pf: "1", vt: "ll" });
  const sys = s.sys === "dc" || s.sys === "ac3" ? s.sys : "ac1";
  const pf = sys === "dc" ? 1 : Number(s.pf);
  const V = Number(s.v);
  // Effective voltage factor k so that P = k × V × I × PF.
  const k = sys === "ac3" ? (s.vt === "ln" ? 3 : Math.sqrt(3)) : 1;
  const toAmps = s.dir !== "a2w";
  const P = Number(s.p) * (s.pu === "kW" ? 1000 : 1), I = Number(s.a);
  const amps = P / (k * V * pf), watts = k * V * I * pf;
  const err = !(V > 0) ? "Enter the voltage." : !(pf > 0 && pf <= 1) ? "Power factor must be between 0 and 1." : toAmps ? (!(P > 0) ? "Enter the power." : null) : !(I > 0) ? "Enter the current." : null;
  const va = toAmps ? P / pf : watts / pf;
  const formula = sys === "dc" ? (toAmps ? "I = P ÷ V" : "P = V × I") : sys === "ac1" ? (toAmps ? "I = P ÷ (PF × V)" : "P = PF × V × I") : s.vt === "ln" ? (toAmps ? "I = P ÷ (3 × PF × V(L-N))" : "P = 3 × PF × V(L-N) × I") : (toAmps ? "I = P ÷ (√3 × PF × V(L-L))" : "P = √3 × PF × V(L-L) × I");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Watts to amps calculator">
        <Segmented label="Convert" value={toAmps ? "w2a" : "a2w"} onChange={(v) => set("dir", v)} options={[{ id: "w2a", label: "Watts → amps" }, { id: "a2w", label: "Amps → watts" }]} />
        <Segmented label="Circuit" value={sys} onChange={(v) => set("sys", v)} options={[{ id: "dc", label: "DC" }, { id: "ac1", label: "AC single-phase" }, { id: "ac3", label: "AC three-phase" }]} />
        <div className="grid grid-cols-2 gap-3">
          {toAmps ? <div className="grid grid-cols-[1fr_auto] items-end gap-2">
            <Field id="p" label="Power" value={s.p} onChange={(v) => set("p", v)} min={0} />
            <select aria-label="Power unit" className="field !w-auto" value={s.pu === "kW" ? "kW" : "W"} onChange={(e) => set("pu", e.target.value)}><option>W</option><option>kW</option></select>
          </div> : <Field id="a" label="Current" suffix="A" value={s.a} onChange={(v) => set("a", v)} min={0} />}
          <Field id="v" label={sys === "ac3" ? (s.vt === "ln" ? "Voltage (line to neutral)" : "Voltage (line to line)") : "Voltage"} suffix="V" value={s.v} onChange={(v) => set("v", v)} min={0} />
          {sys !== "dc" && <Field id="pf" label="Power factor" value={s.pf} onChange={(v) => set("pf", v)} min={0} hint="1 for heaters and incandescent bulbs; lower for motors" />}
        </div>
        {sys === "ac3" && <Segmented label="Voltage measured" value={s.vt === "ln" ? "ln" : "ll"} onChange={(v) => set("vt", v)} options={[{ id: "ll", label: "Line to line" }, { id: "ln", label: "Line to neutral" }]} />}
        <div className="formula">{formula}</div>
      </form>
      <ResultCard label={toAmps ? "Current" : "Real power"} error={err} value={err ? "–" : toAmps ? `${f(amps)} A` : `${f(watts)} W`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{toAmps ? `${f(P)} W at ${f(V)} V` : `${f(I)} A at ${f(V)} V`}{sys !== "dc" ? `, power factor ${pf}` : ""}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {!toAmps && <Stat k="Kilowatts" v={`${f(watts / 1000, 3)} kW`} />}
            {sys !== "dc" && <Stat k="Apparent power" v={<span data-testid="va">{f(va)} VA ({f(va / 1000, 3)} kVA)</span>} />}
            {toAmps && <Stat k="Circuit rating for a continuous load" v={`at least ${f(amps / 0.8)} A`} />}
          </dl>
          {toAmps && sys === "ac1" && <table className="mt-4 w-full text-sm">
            <thead><tr className="text-left subtle"><th className="py-1">Same load at</th><th>Current</th></tr></thead>
            <tbody>{[110, 120, 208, 220, 230, 240].map((vv) => <tr key={vv} className="border-t border-[var(--border)]"><td className="py-1">{vv} V</td><td>{f(P / (vv * pf))} A</td></tr>)}</tbody>
          </table>}
          <p className="mt-4 text-xs subtle">For continuous loads (3 hours or more), the U.S. National Electrical Code generally limits circuits to 80% of the breaker rating. Motors draw extra current at start-up. Have a licensed electrician size circuits.</p>
        </>}
      </ResultCard>
    </div>
  );
}
