"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// FFMI = fat-free mass (kg) ÷ height (m)²; normalized FFMI = FFMI + 6.1 × (1.8 − height m) (Kouri et al., 1995).
export default function FfmiCalculator() {
  const [s, set] = useUrlState({ u: "us", ft: "5", in: "10", lb: "180", cm: "178", kg: "82", bf: "15", sex: "m" });
  const metric = s.u === "metric";
  const h = metric ? Number(s.cm) / 100 : ((Number(s.ft) || 0) * 12 + (Number(s.in) || 0)) * 0.0254;
  const kg = metric ? Number(s.kg) : Number(s.lb) * 0.45359237, bf = Number(s.bf) / 100;
  const ffm = kg * (1 - bf), fat = kg - ffm, ffmi = ffm / (h * h), norm = ffmi + 6.1 * (1.8 - h);
  const w = (k: number) => (metric ? `${k.toFixed(1)} kg` : `${(k / 0.45359237).toFixed(1)} lb`);
  const male = s.sex !== "f", ceiling = male ? 25 : 22;
  const error = !(h > 1 && h < 2.5) ? "Enter a height between about 3′4″ and 8′ (100–250 cm)." : !(kg > 25 && kg < 300) ? "Enter a realistic body weight." : !(bf > 0.02 && bf < 0.7) ? "Enter a body fat percentage between 3 and 70." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="FFMI calculator">
        <div className="flex flex-wrap gap-4">
          <Segmented label="Units" value={metric ? "metric" : "us"} onChange={(v) => set("u", v)} options={[{ id: "us", label: "ft / in / lb" }, { id: "metric", label: "cm / kg" }]} />
          <Segmented label="Sex" value={male ? "m" : "f"} onChange={(v) => set("sex", v)} options={[{ id: "m", label: "Male" }, { id: "f", label: "Female" }]} />
        </div>
        {metric ? <div className="grid grid-cols-2 gap-3">
          <Field id="cm" label="Height" suffix="cm" value={s.cm} onChange={(v) => set("cm", v)} min={0} />
          <Field id="kg" label="Weight" suffix="kg" value={s.kg} onChange={(v) => set("kg", v)} min={0} />
        </div> : <div className="grid grid-cols-3 gap-3">
          <Field id="ft" label="Height (feet)" suffix="ft" value={s.ft} onChange={(v) => set("ft", v)} min={0} inputMode="numeric" />
          <Field id="in" label="Inches" suffix="in" value={s.in} onChange={(v) => set("in", v)} min={0} />
          <Field id="lb" label="Weight" suffix="lb" value={s.lb} onChange={(v) => set("lb", v)} min={0} />
        </div>}
        <Field id="bf" label="Body fat" suffix="%" value={s.bf} onChange={(v) => set("bf", v)} min={0} hint="From a scan, calipers or a tape-measure estimate" />
      </form>
      <ResultCard error={error} label="Normalized FFMI" value={norm.toFixed(1)}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="FFMI (unadjusted)" v={ffmi.toFixed(1)} />
          <Stat k="Lean (fat-free) mass" v={w(ffm)} />
          <Stat k="Fat mass" v={w(fat)} />
          <Stat k={`Height adjustment`} v={`${norm - ffmi >= 0 ? "+" : ""}${(norm - ffmi).toFixed(2)}`} />
        </dl>
        <p className="mt-4 text-sm muted" data-testid="context">
          {male ? "Typical untrained men score around 19–21. " : "Women typically score several points lower than men. "}
          In research on drug-free {male ? "male athletes, normalized FFMI rarely exceeded about 25" : "athletes, a practical ceiling of around 22 is often cited for women"}.
          {norm > ceiling ? " Your result is above that range; double-check your body fat figure, since an underestimate inflates FFMI." : ""}
        </p>
        <p className="mt-2 text-xs subtle">FFMI is only as accurate as your body fat estimate. It describes muscularity; it isn&apos;t a health diagnosis.</p>
      </ResultCard>
    </div>
  );
}
