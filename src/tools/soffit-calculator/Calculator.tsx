"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { usd } from "@/lib/money";

export default function SoffitCalculator() {
  const [s, set] = useUrlState({ eave: "120", depth: "16", rake: "0", rakeDepth: "12", pw: "12", pl: "12", waste: "10", attic: "1500", rule: "300", price: "" });
  const eave = Number(s.eave), depthFt = Number(s.depth) / 12, rake = Math.max(0, Number(s.rake) || 0), rakeFt = (Number(s.rakeDepth) || 0) / 12;
  const area = eave * depthFt + rake * rakeFt;
  const panelArea = (Number(s.pw) / 12) * Number(s.pl), waste = Math.max(0, Number(s.waste) || 0) / 100;
  const panels = panelArea > 0 ? Math.ceil((area * (1 + waste)) / panelArea) : NaN;
  const runFt = eave + rake, trimFt = 2 * runFt * (1 + waste);
  const attic = Number(s.attic), ratio = s.rule === "150" ? 150 : 300;
  const nfaTotal = attic > 0 ? (attic / ratio) * 144 : NaN, intake = nfaTotal / 2;
  const price = Number(s.price);
  const error = !(eave > 0) ? "Enter the total length of eaves to cover." : !(depthFt > 0) ? "Enter the soffit width (overhang depth)." : !(panelArea > 0) ? "Enter the panel width and length." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Soffit calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="eave" label="Total eave length" suffix="ft" value={s.eave} onChange={(v) => set("eave", v)} min={0} hint="Add up every eave side" />
          <Field id="depth" label="Soffit width (overhang)" suffix="in" value={s.depth} onChange={(v) => set("depth", v)} min={0} hint="Wall to back of fascia" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="rake" label="Gable rake length (optional)" suffix="ft" value={s.rake} onChange={(v) => set("rake", v)} min={0} />
          <Field id="rakeDepth" label="Rake soffit width" suffix="in" value={s.rakeDepth} onChange={(v) => set("rakeDepth", v)} min={0} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="pw" label="Panel width" suffix="in" value={s.pw} onChange={(v) => set("pw", v)} min={0} hint="Coverage width" />
          <Field id="pl" label="Panel length" suffix="ft" value={s.pl} onChange={(v) => set("pl", v)} min={0} />
          <Field id="waste" label="Waste" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
        </div>
        <Field id="price" label="Price per panel (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        <div>
          <span className="label">Attic ventilation</span>
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <Field id="attic" label="Attic floor area" suffix="sq ft" value={s.attic} onChange={(v) => set("attic", v)} min={0} />
            <Segmented label="Rule" value={ratio === 150 ? "150" : "300"} onChange={(v) => set("rule", v)} options={[{ id: "300", label: "1/300 balanced" }, { id: "150", label: "1/150" }]} />
          </div>
        </div>
      </form>
      <ResultCard error={error} label={`Soffit panels (incl. ${+(waste * 100).toFixed(1)}% waste)`} value={`${panels} panels`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="Soffit area" v={`${area.toFixed(1)} sq ft`} />
          <Stat k="Panel size" v={`${s.pw} in × ${s.pl} ft (${+panelArea.toFixed(2)} sq ft)`} />
          <Stat k="J/F-channel trim (approx.)" v={`${Math.ceil(trimFt)} ft`} />
          {price > 0 && <Stat k="Panel cost" v={usd(panels * price)} />}
          {Number.isFinite(nfaTotal) && <Stat k={`Total vent area (1/${ratio})`} v={`${(nfaTotal / 144).toFixed(2)} sq ft · ${Math.round(nfaTotal)} sq in`} />}
          {Number.isFinite(intake) && <Stat k="Intake (soffit) share, about half" v={<span data-testid="intake">{Math.round(intake)} sq in</span>} />}
        </dl>
        <p className="mt-4 text-sm muted">Check the net free area (NFA) printed on your vented soffit or vents and use enough to reach the intake figure. Keep insulation baffles in place so air can flow from the soffit into the attic.</p>
        <p className="mt-2 text-xs subtle">Venting follows IRC R806.2 (1/150 of attic area, or 1/300 when 40–50% of the vent area is high on the roof and the rest at the eaves). Local codes and roof designs vary.</p>
      </ResultCard>
    </div>
  );
}
