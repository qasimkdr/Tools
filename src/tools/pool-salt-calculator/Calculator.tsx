"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// 1 ppm in 1 US gallon of water ≈ 8.34 × 10⁻⁶ lb (water weighs ≈ 8.34 lb/gal). Volume factors: rectangle 7.48 gal/ft³; round/oval π/4 × 7.48 ≈ 5.875.
const LB_PER_GAL_PPM = 8.34e-6, GAL_PER_FT3 = 7.48052, L_PER_GAL = 3.78541;
type Vol = "known" | "rect" | "round" | "oval";

export default function PoolSaltCalculator() {
  const [s, set] = useUrlState({ vm: "known", gal: "15000", vu: "gal", l: "32", w: "16", dia: "18", depth: "5", cur: "2500", tgt: "3200", bag: "40" });
  const vm = (["known", "rect", "round", "oval"].includes(s.vm) ? s.vm : "known") as Vol;
  const L = Number(s.l), W = Number(s.w), Dm = Number(s.dia), dep = Number(s.depth);
  const gal = vm === "known" ? Number(s.gal) / (s.vu === "L" ? L_PER_GAL : 1)
    : vm === "rect" ? L * W * dep * GAL_PER_FT3 : vm === "round" ? Dm * Dm * dep * GAL_PER_FT3 * Math.PI / 4 : L * W * dep * GAL_PER_FT3 * Math.PI / 4;
  const cur = Math.max(0, Number(s.cur) || 0), tgt = Number(s.tgt), bag = Number(s.bag) || 40;
  const delta = tgt - cur, lbs = gal * delta * LB_PER_GAL_PPM, kg = lbs * 0.45359237;
  const drain = cur > tgt ? gal * (1 - tgt / cur) : 0;
  const error = !(gal > 0) ? "Enter the pool volume or its dimensions." : !(tgt > 0 && tgt < 10000) ? "Enter a target salt level in ppm (most chlorine generators want about 2,700–3,400)." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Pool salt calculator">
        <Segmented label="Pool volume" value={vm} onChange={(v) => set("vm", v)} options={[{ id: "known", label: "I know it" }, { id: "rect", label: "Rectangle" }, { id: "round", label: "Round" }, { id: "oval", label: "Oval" }]} />
        {vm === "known" && <div className="grid grid-cols-[1fr_auto] items-end gap-3">
          <Field id="gal" label="Volume" value={s.gal} onChange={(v) => set("gal", v)} min={0} />
          <Segmented label="unit" value={s.vu === "L" ? "L" : "gal"} onChange={(v) => set("vu", v)} options={[{ id: "gal", label: "US gal" }, { id: "L", label: "liters" }]} />
        </div>}
        {(vm === "rect" || vm === "oval") && <div className="grid grid-cols-3 gap-3">
          <Field id="l" label="Length" suffix="ft" value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="w" label="Width" suffix="ft" value={s.w} onChange={(v) => set("w", v)} min={0} />
          <Field id="depth" label="Avg. depth" suffix="ft" value={s.depth} onChange={(v) => set("depth", v)} min={0} />
        </div>}
        {vm === "round" && <div className="grid grid-cols-2 gap-3">
          <Field id="dia" label="Diameter" suffix="ft" value={s.dia} onChange={(v) => set("dia", v)} min={0} />
          <Field id="depth" label="Avg. depth" suffix="ft" value={s.depth} onChange={(v) => set("depth", v)} min={0} />
        </div>}
        {vm !== "known" && <p className="text-xs subtle">Average depth = (shallow end + deep end) ÷ 2.</p>}
        <div className="grid grid-cols-2 gap-3">
          <Field id="cur" label="Current salt level" suffix="ppm" value={s.cur} onChange={(v) => set("cur", v)} min={0} hint="0 for a new pool of fresh water" />
          <Field id="tgt" label="Target salt level" suffix="ppm" value={s.tgt} onChange={(v) => set("tgt", v)} min={0} hint="Check your generator's manual" />
        </div>
        <Segmented label="Bag size" value={["20", "40", "50"].includes(s.bag) ? (s.bag as "40") : "40"} onChange={(v) => set("bag", v)} options={[{ id: "20", label: "20 lb" }, { id: "40", label: "40 lb" }, { id: "50", label: "50 lb" }]} />
      </form>
      <ResultCard error={error} label={delta > 0 ? "Salt to add" : delta === 0 ? "Salt level" : "Too much salt"} value={delta > 0 ? `${lbs.toFixed(1)} lb` : delta === 0 ? "On target" : `Drain ${Math.round(drain).toLocaleString()} gal`}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {delta > 0 && <Stat k={`${bag} lb bags`} v={Math.ceil(lbs / bag)} />}
          {delta > 0 && <Stat k="Kilograms" v={`${kg.toFixed(1)} kg`} />}
          <Stat k="Pool volume" v={`${Math.round(gal).toLocaleString()} gal (${Math.round(gal * L_PER_GAL).toLocaleString()} L)`} />
          <Stat k="Change needed" v={`${delta > 0 ? "+" : ""}${Math.round(delta).toLocaleString()} ppm`} />
        </dl>
        {delta < 0 && <p className="mt-4 text-sm muted">Salt doesn&apos;t evaporate, so the only fix is dilution: drain about {Math.round(drain).toLocaleString()} gallons ({Math.round((1 - tgt / cur) * 100)}% of the water) and refill with fresh water.</p>}
        {delta > 0 && <p className="mt-4 text-sm muted">Add about three-quarters, run the pump for 24 hours, retest, then add the rest if needed. It&apos;s easier to add more than to remove extra.</p>}
      </ResultCard>
    </div>
  );
}
