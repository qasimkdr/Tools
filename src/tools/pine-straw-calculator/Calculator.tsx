"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function PineStrawCalculator() {
  const [s, set] = useUrlState({ shape: "rect", l: "30", w: "10", d: "6", rings: "1", area: "300", cov: "40", waste: "10", price: "" });
  const area = s.shape === "circle" ? Math.PI * (Number(s.d) / 2) ** 2 * Math.max(1, Math.round(Number(s.rings) || 1)) : s.shape === "area" ? Number(s.area) : Number(s.l) * Number(s.w);
  const cov = Number(s.cov), waste = Number(s.waste) || 0, price = Number(s.price);
  const exact = area / cov, bales = Math.ceil(exact * (1 + waste / 100) - 1e-9);
  const err = !(area > 0) ? "Enter the size of the area to cover." : !(cov > 0) ? "Enter how many square feet one bale covers." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Pine straw calculator">
        <Segmented label="Area shape" value={s.shape === "circle" || s.shape === "area" ? s.shape : "rect"} onChange={(v) => set("shape", v)} options={[{ id: "rect", label: "Rectangle bed" }, { id: "circle", label: "Tree rings" }, { id: "area", label: "Total sq ft" }]} />
        <div className="grid grid-cols-2 gap-3">
          {s.shape === "circle" ? <>
            <Field id="d" label="Ring diameter" suffix="ft" value={s.d} onChange={(v) => set("d", v)} min={0} />
            <Field id="rings" label="Number of rings" value={s.rings} onChange={(v) => set("rings", v)} min={1} inputMode="numeric" />
          </> : s.shape === "area" ? <Field id="area" label="Total area" suffix="sq ft" value={s.area} onChange={(v) => set("area", v)} min={0} /> : <>
            <Field id="l" label="Length" suffix="ft" value={s.l} onChange={(v) => set("l", v)} min={0} />
            <Field id="w" label="Width" suffix="ft" value={s.w} onChange={(v) => set("w", v)} min={0} />
          </>}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field id="cov" label="One bale covers" suffix="sq ft" value={s.cov} onChange={(v) => set("cov", v)} min={0} hint="Check the bale label" />
          <Field id="waste" label="Extra" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="price" label="Price per bale" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
        <p className="text-xs subtle">Typical square bales cover roughly 35–50 sq ft at a 2–3 in layer, less if you spread it thicker. Large or long-needle bales can cover more.</p>
      </form>
      <ResultCard label="Pine straw to buy" error={err} value={err ? "–" : `${bales} bales`}>
        {!err && <>
          <p className="mt-1 text-sm muted">{Math.round(area).toLocaleString("en-US")} sq ft ÷ {cov} sq ft per bale = {exact.toFixed(2)} bales + {waste}% extra</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Area to cover" v={<span data-testid="area">{area.toFixed(1)} sq ft</span>} />
            <Stat k="Bales before extra" v={<span data-testid="exact">{exact.toFixed(2)}</span>} />
            <Stat k="At 35 sq ft/bale (thicker)" v={`${Math.ceil((area / 35) * (1 + waste / 100) - 1e-9)} bales`} />
            <Stat k="At 50 sq ft/bale (thinner)" v={`${Math.ceil((area / 50) * (1 + waste / 100) - 1e-9)} bales`} />
            {price > 0 && <Stat k="Total cost" v={<span data-testid="cost">{usd(bales * price)}</span>} />}
          </dl>
          <p className="mt-4 text-xs subtle">Pine straw settles and breaks down over a season, so many gardeners add a fresh layer about once a year.</p>
        </>}
      </ResultCard>
    </div>
  );
}
