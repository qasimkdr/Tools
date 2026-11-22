"use client";
import { LENGTH_UNITS } from "@/lib/units";

/** Number input + length-unit select (ft, in, yd, m, cm). */
export default function UnitField({ id, label, value, unit, onValue, onUnit }: {
  id: string; label: string; value: string; unit: string; onValue: (v: string) => void; onUnit: (u: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <div className="flex gap-2">
        <input id={id} type="number" inputMode="decimal" min={0} step="any" value={value} onChange={(e) => onValue(e.target.value)} className="field tabular-nums" />
        <select aria-label={`${label} unit`} value={unit} onChange={(e) => onUnit(e.target.value)} className="field !w-20">
          {LENGTH_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
    </div>
  );
}
