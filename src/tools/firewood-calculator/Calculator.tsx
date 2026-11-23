"use client";
import { Field, ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";

const CORD = 128; // ft³: 4 ft × 4 ft × 8 ft, stacked
const f = (x: number, d = 2) => (Number.isFinite(x) ? x.toLocaleString("en-US", { maximumFractionDigits: d }) : "–");
const usd = (x: number) => x.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function FirewoodCalculator() {
  const [s, set] = useUrlState({ l: "16", h: "4", log: "16", n: "1", price: "", fprice: "" });
  const L = Number(s.l), H = Number(s.h), log = Number(s.log), n = Math.max(1, Math.round(Number(s.n) || 1));
  const ft3 = L * H * (log / 12) * n, cords = ft3 / CORD;
  const faceCordFt3 = 32 * (log / 12); // 4 × 8 ft face, log-length deep
  const faces = ft3 / faceCordFt3, faceShare = faceCordFt3 / CORD;
  const price = Number(s.price), fprice = Number(s.fprice);
  const err = !(L > 0 && H > 0) ? "Enter the stack's length and height." : !(log > 0) ? "Enter the log (piece) length." : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Firewood calculator">
        <div className="grid grid-cols-2 gap-3">
          <Field id="l" label="Stack length" suffix="ft" value={s.l} onChange={(v) => set("l", v)} min={0} />
          <Field id="h" label="Stack height" suffix="ft" value={s.h} onChange={(v) => set("h", v)} min={0} />
          <Field id="log" label="Log length (stack depth)" suffix="in" value={s.log} onChange={(v) => set("log", v)} min={0} hint="16 in is common for stoves" />
          <Field id="n" label="Number of stacks" value={s.n} onChange={(v) => set("n", v)} min={1} inputMode="numeric" />
          <Field id="price" label="Price per full cord (optional)" prefix="$" value={s.price} onChange={(v) => set("price", v)} min={0} />
          <Field id="fprice" label="Price per face cord (optional)" prefix="$" value={s.fprice} onChange={(v) => set("fprice", v)} min={0} />
        </div>
        <p className="text-xs subtle">Measure tightly stacked wood. Loose, thrown piles take up more space for the same amount of wood.</p>
      </form>
      <ResultCard label="Full cords" error={err} value={err ? "–" : `${f(cords, 3)} cords`}>
        {!err && <>
          <p className="mt-1 text-sm muted"><strong data-testid="ft3">{f(ft3, 1)} ft³</strong> of stacked wood ({f(ft3 * 0.0283168, 2)} m³)</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k={`Face cords (4 × 8 ft, ${f(log, 0)} in logs)`} v={<span data-testid="faces">{f(faces, 2)}</span>} />
            <Stat k="One face cord is" v={<span data-testid="share">{f(faceShare * 100, 1)}% of a full cord</span>} />
            {price > 0 && <Stat k="Value at your cord price" v={<span data-testid="value">{usd(cords * price)}</span>} />}
            {fprice > 0 && <Stat k="Face cord price as a full-cord price" v={<span data-testid="equiv">{usd(fprice / faceShare)} per cord</span>} />}
          </dl>
          <p className="mt-4 text-xs subtle">A legal cord is 128 ft³ of wood ranked and well stowed. &quot;Face cord&quot; and &quot;rick&quot; aren&apos;t standard legal units and their size varies, so always confirm the log length and stack size before you buy.</p>
        </>}
      </ResultCard>
    </div>
  );
}
