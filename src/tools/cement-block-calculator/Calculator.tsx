"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

// Nominal face sizes (inches) include a 3/8 in mortar joint: an 8x8x16 block is 7-5/8 x 7-5/8 x 15-5/8 actual.
const SIZES: Record<string, { label: string; l: number; h: number }> = {
  "16x8": { label: "Standard 16 × 8 face (8x8x16, 6x8x16, 4x8x16, 12x8x16)", l: 16, h: 8 },
  "16x4": { label: "Half-high 16 × 4 face (8x4x16)", l: 16, h: 4 },
  "8x8": { label: "Half block 8 × 8 face (8x8x8)", l: 8, h: 8 },
  "12x4": { label: "12 × 4 face (4x4x12)", l: 12, h: 4 },
};
const n0 = (x: number) => Math.round(x).toLocaleString("en-US");

export default function CementBlockCalculator() {
  const [s, set] = useUrlState({ len: "40", ht: "6", size: "16x8", open: "0", waste: "5", per100: "3", price: "" });
  const size = SIZES[s.size] ?? SIZES["16x8"];
  const len = Number(s.len), ht = Number(s.ht), open = Number(s.open) || 0, waste = (Number(s.waste) || 0) / 100;
  const faceSqft = (size.l * size.h) / 144;
  const area = len * ht - open;
  const err = !(len > 0) ? "Enter the wall length." : !(ht > 0) ? "Enter the wall height." : !(area > 0) ? "Openings can't be larger than the wall." : null;
  const net = area / faceSqft;
  const total = Math.ceil(net * (1 + waste));
  const courses = Math.ceil((ht * 12) / size.h), perCourse = Math.ceil((len * 12) / size.l);
  const bags = Math.ceil((total * (Number(s.per100) || 0)) / 100);
  const price = Number(s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Cement block calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="len" label="Wall length" suffix="ft" value={s.len} onChange={(v) => set("len", v)} min={0} />
          <Field id="ht" label="Wall height" suffix="ft" value={s.ht} onChange={(v) => set("ht", v)} min={0} />
        </div>
        <div>
          <label htmlFor="size" className="label">Block size</label>
          <select id="size" className="field" value={s.size in SIZES ? s.size : "16x8"} onChange={(e) => set("size", e.target.value)}>
            {Object.entries(SIZES).map(([id, x]) => <option key={id} value={id}>{x.label}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field id="open" label="Doors and windows" suffix="sq ft" value={s.open} onChange={(v) => set("open", v)} min={0} hint="Total area to leave out" />
          <Field id="waste" label="Extra for cuts and breakage" suffix="%" value={s.waste} onChange={(v) => set("waste", v)} min={0} />
          <Field id="per100" label="Mortar bags per 100 blocks" value={s.per100} onChange={(v) => set("per100", v)} min={0} hint="Check your bag's coverage" />
          <Field id="price" label="Price per block (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
        </div>
      </form>
      <ResultCard error={err} label="Blocks to buy" value={err ? "–" : <span data-testid="blocks">{n0(total)}</span>}>
        {!err && <>
          <p className="mt-1 text-sm muted">{n0(net)} for {n0(area)} sq ft of wall, plus {Math.round(waste * 100)}% extra</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Courses (rows)" v={<span data-testid="courses">{courses}</span>} />
            <Stat k="Blocks per course" v={<span data-testid="per-course">{perCourse}</span>} />
            <Stat k="Blocks per sq ft" v={(1 / faceSqft).toFixed(3)} />
            <Stat k="Mortar (80 lb bags)" v={<span data-testid="bags">{bags}</span>} />
            {price > 0 && <Stat k="Block cost" v={<span data-testid="cost">{(total * price).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>} />}
            <Stat k="Wall area" v={`${n0(area)} sq ft`} />
          </dl>
          {(ht * 12) % size.h !== 0 && <p className="mt-3 text-sm">The height isn&apos;t a whole number of {size.h}-inch courses, so the top course will need cut or half-high blocks.</p>}
          <p className="mt-3 text-xs subtle">Nominal block sizes already include a 3/8 in mortar joint. The mortar figure is a rule of thumb (about 3 bags of 80 lb mortar mix per 100 standard blocks); use the coverage printed on your bag. Core fill, rebar and footings are extra.</p>
        </>}
      </ResultCard>
    </div>
  );
}
