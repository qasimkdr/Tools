"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { SIZES, areaMm2, cuAllowed, diameterMm, ohmsPerKft, voltageDrop, type Metal, type Size, type System } from "@/lib/wire";

const label = (s: string) => `${s} AWG`;

export default function WireSizeCalculator() {
  const [s, set] = useUrlState({ amps: "20", volts: "120", sys: "single", len: "100", lu: "ft", metal: "cu", vd: "3", col: "60", cont: "0" });
  const amps = Number(s.amps), volts = Number(s.volts), maxVd = Number(s.vd) / 100;
  const feet = Number(s.len) * (s.lu === "m" ? 3.28084 : 1);
  const sys = (["dc", "single", "three"].includes(s.sys) ? s.sys : "single") as System;
  const metal = (s.metal === "al" ? "al" : "cu") as Metal;
  const col = (s.col === "75" ? 75 : 60) as 60 | 75;
  const design = amps * (s.cont === "1" ? 1.25 : 1);
  const rows = SIZES.map((z) => { const vd = voltageDrop(z, metal, amps, feet, sys); return { z, vd, pct: vd / volts, allowed: metal === "cu" ? cuAllowed(z, col) : NaN }; });
  const byVd = rows.find((r) => r.pct <= maxVd);
  const byAmp = metal === "cu" ? rows.find((r) => r.allowed >= design) : undefined;
  const idx = (z?: Size) => (z ? SIZES.indexOf(z) : -1);
  const pick = metal === "cu" ? (byVd && byAmp ? SIZES[Math.max(idx(byVd.z), idx(byAmp.z))] : undefined) : byVd?.z;
  const chosen = rows.find((r) => r.z === pick);
  const error = !(amps > 0) ? "Enter the load current in amps." : !(volts > 0) ? "Enter the circuit voltage." : !(feet > 0) ? "Enter the one-way length of the run." : !(maxVd > 0 && maxVd < 0.2) ? "Enter an allowed voltage drop between 0.5% and 20% (3% is common)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Wire size calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="amps" label="Load current" suffix="A" value={s.amps} onChange={(v) => set("amps", v)} min={0} />
          <Field id="volts" label="Voltage" suffix="V" value={s.volts} onChange={(v) => set("volts", v)} min={0} />
        </div>
        <Segmented label="System" value={sys} onChange={(v) => set("sys", v)} options={[{ id: "dc", label: "DC" }, { id: "single", label: "AC single-phase" }, { id: "three", label: "AC three-phase" }]} />
        <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="len" label="One-way length of the run" value={s.len} onChange={(v) => set("len", v)} min={0} hint="Distance from the source to the load, not the round trip" />
          <Segmented label="unit" value={s.lu === "m" ? "m" : "ft"} onChange={(v) => set("lu", v)} options={[{ id: "ft", label: "ft" }, { id: "m", label: "m" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Segmented label="Conductor" value={metal} onChange={(v) => set("metal", v)} options={[{ id: "cu", label: "Copper" }, { id: "al", label: "Aluminum" }]} />
          <Field id="vd" label="Max voltage drop" suffix="%" value={s.vd} onChange={(v) => set("vd", v)} min={0} />
        </div>
        {metal === "cu" && <>
          <Segmented label="Ampacity column (terminal rating)" value={String(col) as "60"} onChange={(v) => set("col", v)} options={[{ id: "60", label: "60 °C (most ≤100 A circuits)" }, { id: "75", label: "75 °C" }]} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.cont === "1"} onChange={(e) => set("cont", e.target.checked ? "1" : "0")} /> Continuous load (3+ hours): size for 125%</label>
        </>}
      </form>
      <ResultCard error={error} label="Recommended minimum wire size" value={pick ? label(pick) : "Larger than 4/0"}>
        {chosen && <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Voltage drop" v={`${chosen.vd.toFixed(2)} V (${(chosen.pct * 100).toFixed(2)}%)`} />
          <Stat k="Voltage at the load" v={`${(volts - chosen.vd).toFixed(1)} V`} />
          {metal === "cu" && <Stat k="Smallest size for the current" v={byAmp ? `${label(byAmp.z)} (${byAmp.allowed} A)` : "over 4/0"} />}
          <Stat k="Smallest size for voltage drop" v={byVd ? label(byVd.z) : "over 4/0"} />
        </dl>}
        {metal === "al" && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">Aluminum: sized here for voltage drop only. Check the size against the aluminum ampacity column of NEC Table 310.16, and use connectors rated for aluminum.</p>}
        <div className="mt-4 max-h-72 overflow-auto">
          <table className="w-full text-xs sm:text-sm" data-testid="wire-table">
            <thead><tr className="text-left subtle"><th className="py-1 font-medium">AWG</th><th className="py-1 text-right font-medium">Ø mm</th><th className="py-1 text-right font-medium">Ω/1000 ft</th><th className="py-1 text-right font-medium">Drop</th>{metal === "cu" && <th className="py-1 text-right font-medium">Max A</th>}</tr></thead>
            <tbody>{rows.map((r) => (
              <tr key={r.z} className={`border-t border-[var(--border)] ${r.z === pick ? "font-semibold text-[var(--color-brand-600)]" : ""}`}>
                <td className="py-1">{r.z}</td><td className="py-1 text-right tabular-nums">{diameterMm(r.z).toFixed(2)}</td><td className="py-1 text-right tabular-nums">{ohmsPerKft(r.z, metal).toFixed(3)}</td>
                <td className={`py-1 text-right tabular-nums ${r.pct > maxVd ? "text-amber-700" : ""}`}>{(r.pct * 100).toFixed(1)}%</td>
                {metal === "cu" && <td className={`py-1 text-right tabular-nums ${r.allowed < design ? "text-amber-700" : ""}`}>{r.allowed}</td>}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-3 text-xs subtle">For planning only. Ampacity from NEC Table 310.16 (copper, ≤3 current-carrying conductors, 30 °C ambient) with 240.4(D) limits; derating for bundling, heat or conduit fill isn&apos;t applied. Household wiring must follow your local electrical code; when in doubt, use a licensed electrician. Area of the chosen wire: {pick ? `${areaMm2(pick).toFixed(2)} mm²` : "—"}.</p>
      </ResultCard>
    </div>
  );
}
