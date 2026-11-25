"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { airVpd, dewPoint, leafVpd, rhForVpd, STAGES, svp } from "@/lib/vpd";

const toC = (f: number) => ((f - 32) * 5) / 9;
const color = (v: number) => (v < 0.4 ? "#bfdbfe" : v < 0.8 ? "#bbf7d0" : v < 1.2 ? "#86efac" : v < 1.6 ? "#fde68a" : "#fecaca");

export default function VpdCalculator() {
  const [s, set] = useUrlState({ u: "C", t: "25", rh: "60", off: "-2", stage: "veg" });
  const F = s.u === "F";
  const tC = F ? toC(Number(s.t)) : Number(s.t);
  const offC = F ? Number(s.off) * (5 / 9) : Number(s.off);
  const rh = Number(s.rh);
  const err = !(rh > 0 && rh <= 100) ? "Enter relative humidity between 1% and 100%." : !(tC > -10 && tC < 50) ? "Enter an air temperature between −10 and 50 °C (14–122 °F)." : null;
  const lv = leafVpd(tC, rh, offC), av = airVpd(tC, rh);
  const stage = STAGES.find((x) => x.id === s.stage) ?? STAGES[1];
  const status = lv < 0.4 ? "Too humid for most crops: higher disease risk" : lv > 1.6 ? "Too dry: plants may close stomata and slow growth" : lv < stage.lo ? `Below the ${stage.name.toLowerCase()} range` : lv > stage.hi ? `Above the ${stage.name.toLowerCase()} range` : `In the ${stage.name.toLowerCase()} range`;
  const rhLo = rhForVpd(tC, stage.hi, offC), rhHi = rhForVpd(tC, stage.lo, offC);
  const temps = F ? [64, 68, 72, 75, 79, 82, 86, 90] : [18, 20, 22, 24, 26, 28, 30, 32];
  const rhs = [40, 45, 50, 55, 60, 65, 70, 75, 80];
  const fmtT = (c: number) => (F ? `${(c * 9 / 5 + 32).toFixed(1)} °F` : `${c.toFixed(1)} °C`);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="VPD calculator">
          <Segmented label="Units" value={F ? "F" : "C"} onChange={(v) => set("u", v)} options={[{ id: "C", label: "°C" }, { id: "F", label: "°F" }]} />
          <div className="grid grid-cols-2 gap-3">
            <Field id="t" label="Air temperature" suffix={F ? "°F" : "°C"} value={s.t} onChange={(v) => set("t", v)} />
            <Field id="rh" label="Relative humidity" suffix="%" value={s.rh} onChange={(v) => set("rh", v)} min={0} />
            <Field id="off" label="Leaf temperature offset" suffix={F ? "°F" : "°C"} value={s.off} onChange={(v) => set("off", v)} hint="Leaf minus air; transpiring leaves are often 1–3 °C cooler" />
          </div>
          <Segmented label="Growth stage" value={stage.id} onChange={(v) => set("stage", v)} options={STAGES.map((x) => ({ id: x.id, label: x.name.split(" /")[0] }))} />
        </form>
        <ResultCard label="Leaf VPD" error={err} value={err ? "–" : <span data-testid="leaf">{lv.toFixed(2)} kPa</span>}>
          {!err && <>
            <p className="mt-1 text-sm font-medium" data-testid="status">{status}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Stat k="Air VPD (no leaf offset)" v={<span data-testid="air">{av.toFixed(2)} kPa</span>} />
              <Stat k={`${stage.name} target`} v={`${stage.lo}–${stage.hi} kPa`} />
              <Stat k="Humidity for that target" v={<span data-testid="target-rh">{Math.max(0, rhLo).toFixed(0)}–{Math.min(100, rhHi).toFixed(0)}% RH</span>} />
              <Stat k="Dew point" v={fmtT(dewPoint(tC, rh))} />
              <Stat k="Saturation vapor pressure" v={`${svp(tC).toFixed(2)} kPa`} />
              <Stat k="Actual vapor pressure" v={`${(svp(tC) * rh / 100).toFixed(2)} kPa`} />
            </dl>
            <p className="mt-4 text-xs subtle">Stage ranges are general guidelines for many indoor crops; follow crop-specific advice where you have it. Measure leaf temperature with an infrared thermometer for the most accurate leaf VPD.</p>
          </>}
        </ResultCard>
      </div>
      <div>
        <h2 className="text-base font-semibold">VPD chart (leaf offset {s.off}{F ? " °F" : " °C"})</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="text-center text-xs tabular-nums" data-testid="chart">
            <thead><tr><th className="p-1.5 text-left subtle">Temp \ RH</th>{rhs.map((r) => <th key={r} className="p-1.5 subtle">{r}%</th>)}</tr></thead>
            <tbody>{temps.map((t) => { const c = F ? toC(t) : t; return <tr key={t}><th className="p-1.5 text-left font-semibold">{t}°{F ? "F" : "C"}</th>{rhs.map((r) => { const v = leafVpd(c, r, offC); return <td key={r} className="p-1.5" style={{ background: color(v) }}>{v.toFixed(2)}</td>; })}</tr>; })}</tbody>
          </table>
        </div>
        <p className="mt-2 flex flex-wrap gap-3 text-xs subtle">
          {[["#bfdbfe", "< 0.4 too humid"], ["#bbf7d0", "0.4–0.8 propagation"], ["#86efac", "0.8–1.2 vegetative"], ["#fde68a", "1.2–1.6 flowering"], ["#fecaca", "> 1.6 too dry"]].map(([c, l]) => <span key={l} className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded" style={{ background: c }} />{l}</span>)}
        </p>
      </div>
    </div>
  );
}
