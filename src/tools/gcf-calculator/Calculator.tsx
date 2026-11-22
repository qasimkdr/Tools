"use client";
import { ResultCard, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { divisors, euclidSteps, factorize, gcdAll } from "@/lib/gcf";

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const pow = (e: number) => (e === 1 ? "" : String(e).split("").map((d) => SUP[Number(d)]).join(""));
const fmt = (f: [bigint, number][] | null) => (f === null ? "too large to factor here" : f.length ? f.map(([p, e]) => `${p}${pow(e)}`).join(" × ") : "1");

export default function GcfCalculator() {
  const [s, set] = useUrlState({ n: "48, 180, 300" });
  const parts = s.n.split(/[\s,;]+/).filter(Boolean);
  const bad = parts.find((p) => !/^-?\d{1,40}$/.test(p));
  const nums = bad ? [] : parts.map((p) => BigInt(p));
  const nonzero = nums.filter((x) => x !== 0n);
  const g = gcdAll(nums);
  const error = bad ? `"${bad}" isn't a whole number. Separate numbers with commas or spaces.` : nums.length < 2 ? "Enter at least two whole numbers." : !nonzero.length ? "At least one number must be non-zero." : null;
  const common = !error ? divisors(g) : null;
  const steps = !error && nums.length >= 2 ? euclidSteps(nums[0], nums[1]) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="GCF calculator">
        <div>
          <label htmlFor="n" className="label">Numbers</label>
          <textarea id="n" rows={3} className="field font-mono" value={s.n} onChange={(e) => set("n", e.target.value)} spellCheck={false} />
          <p className="mt-1 text-xs subtle">Two or more whole numbers, separated by commas or spaces. Any size works.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["12, 18", "48, 180, 300", "1071, 462", "17, 31"].map((x) => <button key={x} type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => set("n", x)}>{x}</button>)}
        </div>
      </form>
      <ResultCard error={error} label={`GCF(${parts.join(", ")})`} value={g.toString()}>
        {!error && <>
          <p className="mt-1 text-sm muted">{g === 1n ? "The numbers are relatively prime (coprime): their only common factor is 1." : `Every number divides evenly by ${g}.`}</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 text-sm">
            <Stat k="Common factors" v={<span className="break-words" data-testid="common">{common ? common.join(", ") : "too many to list"}</span>} />
            <Stat k="Prime factorizations" v={<span className="space-y-0.5" data-testid="primes">{nums.slice(0, 8).map((x, i) => <span key={i} className="block">{x.toString()} = {fmt(factorize(x))}</span>)}<span className="block font-semibold">GCF = {fmt(factorize(g))}</span></span>} />
          </dl>
          {steps.length > 0 && <>
            <p className="mt-4 text-sm font-medium">Euclidean algorithm ({nums[0].toString()}, {nums[1].toString()})</p>
            <ol className="mt-1 space-y-0.5 font-mono text-xs" data-testid="euclid">
              {steps.map((st, i) => <li key={i}>{st.a.toString()} = {st.q.toString()} × {st.b.toString()} + {st.r.toString()}</li>)}
            </ol>
            {nums.length > 2 && <p className="mt-2 text-xs subtle">For more numbers, repeat: GCF(a, b, c) = GCF(GCF(a, b), c).</p>}
          </>}
        </>}
      </ResultCard>
    </div>
  );
}
