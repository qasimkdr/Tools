"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// ENERGY STAR room air conditioner sizing chart: [area up to (sq ft, exclusive), BTU/h]. Assumes 8 ft ceilings.
const CHART: [number, number][] = [[150, 5000], [250, 6000], [300, 7000], [350, 8000], [400, 9000], [450, 10000], [550, 12000], [700, 14000], [1000, 18000], [1200, 21000], [1400, 23000], [1500, 24000], [2000, 30000], [2500, 34000]];
const btu = (n: number) => `${Math.round(n).toLocaleString("en-US")} BTU/h`;

export default function BtuCalculator() {
  const [s, set] = useUrlState({ mode: "dims", l: "15", w: "18", area: "270", sun: "normal", ppl: "2", kitchen: "0", m: "0" });
  const metric = s.m === "1";
  const raw = s.mode === "area" ? Number(s.area) : Number(s.l) * Number(s.w);
  const sqft = metric ? raw * 10.7639104 : raw;
  const row = CHART.find(([upTo]) => sqft < upTo);
  const base = row?.[1] ?? NaN;
  const sunF = s.sun === "shaded" ? 0.9 : s.sun === "sunny" ? 1.1 : 1;
  const ppl = Math.max(0, Math.round(Number(s.ppl) || 0));
  const extraPeople = Math.max(0, ppl - 2) * 600;
  const kitchen = s.kitchen === "1" ? 4000 : 0;
  const need = base * sunF + extraPeople + kitchen;
  const err = !(sqft > 0) ? "Enter the room size." : sqft >= 2500 ? "Over 2,500 sq ft is beyond room-unit sizing. A whole-home system needs a load calculation (ACCA Manual J) by an HVAC professional." : null;
  const u = metric ? "m" : "ft", au = metric ? "m²" : "sq ft";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="BTU calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Room size from" value={s.mode === "area" ? "area" : "dims"} onChange={(v) => set("mode", v)} options={[{ id: "dims", label: "Length × width" }, { id: "area", label: "Area" }]} />
          <Segmented label="Units" value={metric ? "1" : "0"} onChange={(v) => set("m", v)} options={[{ id: "0", label: "Feet" }, { id: "1", label: "Meters" }]} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {s.mode === "area" ? <Field id="area" label="Room area" suffix={au} value={s.area} onChange={(v) => set("area", v)} min={0} /> : <>
            <Field id="l" label="Length" suffix={u} value={s.l} onChange={(v) => set("l", v)} min={0} />
            <Field id="w" label="Width" suffix={u} value={s.w} onChange={(v) => set("w", v)} min={0} />
          </>}
        </div>
        <Segmented label="Sun exposure" value={s.sun === "shaded" || s.sun === "sunny" ? s.sun : "normal"} onChange={(v) => set("sun", v)} options={[{ id: "shaded", label: "Heavily shaded" }, { id: "normal", label: "Normal" }, { id: "sunny", label: "Very sunny" }]} />
        <div className="grid grid-cols-2 gap-3">
          <Field id="ppl" label="People who regularly use the room" value={s.ppl} onChange={(v) => set("ppl", v)} min={0} inputMode="numeric" />
          <Segmented label="Is it a kitchen?" value={s.kitchen === "1" ? "1" : "0"} onChange={(v) => set("kitchen", v)} options={[{ id: "0", label: "No" }, { id: "1", label: "Yes" }]} />
        </div>
      </form>
      <ResultCard label="Air conditioner size needed" error={err} value={err ? "–" : btu(need)}>
        {!err && <>
          <p className="mt-1 text-sm muted">≈ {(need / 12000).toFixed(2)} tons · {(need * 0.29307107 / 1000).toFixed(2)} kW · for {Math.round(sqft).toLocaleString("en-US")} sq ft</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Chart capacity" v={<span data-testid="base">{btu(base)}</span>} />
            <Stat k="Sun adjustment" v={sunF === 1 ? "none" : `${sunF < 1 ? "−" : "+"}10% (${sunF < 1 ? "−" : "+"}${Math.round(Math.abs(base * (sunF - 1))).toLocaleString("en-US")})`} />
            <Stat k="Extra people" v={extraPeople ? `+${extraPeople.toLocaleString("en-US")} (${ppl - 2} × 600)` : "none"} />
            <Stat k="Kitchen" v={kitchen ? "+4,000" : "none"} />
          </dl>
          <p className="mt-4 text-sm muted">Choose a unit close to this size. A unit that&apos;s too big cools the room before it removes humidity, leaving it damp and clammy; one that&apos;s too small runs constantly without keeping up.</p>
          <p className="mt-2 text-xs subtle">Based on the ENERGY STAR room air conditioner sizing chart, which assumes 8 ft ceilings. Rooms with high ceilings, poor insulation or big west-facing windows may need more.</p>
        </>}
      </ResultCard>
    </div>
  );
}
