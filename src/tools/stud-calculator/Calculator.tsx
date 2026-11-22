"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import UnitField from "@/components/calc/UnitField";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";
import { toFt } from "@/lib/units";

export default function StudCalculator() {
  const [s, set] = useUrlState({ len: "20", lu: "ft", oc: "16", corners: "2", tees: "0", win: "1", door: "1", perOpen: "2", perCorner: "2", plates: "3", plateLen: "12", waste: "10", price: "" });
  const lenIn = toFt(s.len, s.lu) * 12, oc = Number(s.oc);
  const base = lenIn > 0 && oc > 0 ? Math.ceil(lenIn / oc) + 1 : 0;
  const n = (k: keyof typeof s) => Math.max(0, Math.floor(Number(s[k]) || 0));
  const corners = n("corners") * n("perCorner"), tees = n("tees") * 2, openings = (n("win") + n("door")) * n("perOpen");
  const net = base + corners + tees + openings, waste = Math.max(0, Number(s.waste) || 0) / 100;
  const total = Math.ceil(net * (1 + waste));
  const plateFt = (lenIn / 12) * n("plates"), plateBoards = Math.ceil(plateFt / (Number(s.plateLen) || 12));
  const price = Number(s.price);
  const error = !(lenIn > 0) ? "Enter the wall length." : !(oc > 0) ? "Choose a stud spacing." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Stud calculator">
        <UnitField id="len" label="Wall length" value={s.len} unit={s.lu} onValue={(v) => set("len", v)} onUnit={(u) => set("lu", u)} />
        <Segmented label="Stud spacing (on center)" value={["12", "16", "19.2", "24"].includes(s.oc) ? (s.oc as "16") : "16"} onChange={(v) => set("oc", v)} options={[{ id: "12", label: "12 in" }, { id: "16", label: "16 in" }, { id: "19.2", label: "19.2 in" }, { id: "24", label: "24 in" }]} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field id="corners" label="Corners" value={s.corners} onChange={(v) => set("corners", v)} min={0} inputMode="numeric" />
          <Field id="tees" label="Intersections" value={s.tees} onChange={(v) => set("tees", v)} min={0} inputMode="numeric" />
          <Field id="win" label="Windows" value={s.win} onChange={(v) => set("win", v)} min={0} inputMode="numeric" />
          <Field id="door" label="Doors" value={s.door} onChange={(v) => set("door", v)} min={0} inputMode="numeric" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="perCorner" label="Extra studs per corner" value={s.perCorner} onChange={(v) => set("perCorner", v)} min={0} inputMode="numeric" />
          <Field id="perOpen" label="Extra studs per opening" value={s.perOpen} onChange={(v) => set("perOpen", v)} min={0} inputMode="numeric" hint="e.g. jack studs" />
          <Field id="waste" label="Waste" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="plates" label="Plate rows" value={s.plates} onChange={(v) => set("plates", v)} min={0} inputMode="numeric" hint="3 = bottom + double top" />
          <Field id="plateLen" label="Plate board length" suffix="ft" value={s.plateLen} onChange={(v) => set("plateLen", v)} min={1} />
          <Field id="price" label="Price per stud" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={error} label={`Studs to buy${waste > 0 ? ` (incl. ${+(waste * 100).toFixed(1)}% waste)` : ""}`} value={`${total} studs`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k={`Layout studs (${s.oc} in OC)`} v={base} />
          <Stat k="Corners + intersections" v={corners + tees} />
          <Stat k="Door & window framing" v={openings} />
          <Stat k="Plates" v={`${plateBoards} × ${s.plateLen} ft (${+plateFt.toFixed(1)} ft)`} />
          {price > 0 && <Stat k="Stud cost" v={usd(total * price)} />}
        </dl>
        <p className="mt-4 text-sm muted" data-testid="steps">Layout: {+lenIn.toFixed(2)} in ÷ {s.oc} in = {+(lenIn / oc).toFixed(2)}, rounded up to {base - 1}, plus 1 for the end = {base} studs.</p>
        <p className="mt-2 text-xs subtle">Headers, cripples and blocking are extra. Stud size and spacing for load-bearing walls must follow your local building code.</p>
      </ResultCard>
    </div>
  );
}
