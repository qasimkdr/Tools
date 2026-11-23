"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { format, rootSym, simplifyRadical } from "@/lib/radicals";

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => String(n).split("").map((c) => SUP[c]).join("");

export default function SimplifyRadicalsCalculator() {
  const [s, set] = useUrlState({ r: "72", n: "2", c: "1" });
  const r = Number(s.r), n = Number(s.n), c = s.c.trim() === "" ? 1 : Number(s.c);
  const valid = Number.isInteger(r) && Number.isInteger(n) && n >= 2 && n <= 20 && Number.isInteger(c) && Math.abs(r) <= 1e12;
  const res = valid ? simplifyRadical(r, n, c) : null;
  const err = !valid ? "Enter whole numbers: a radicand up to 1,000,000,000,000, an index from 2 to 20 and a whole-number coefficient." : !res ? "An even root of a negative number isn't a real number (it's imaginary)." : null;
  const input = `${c === 1 ? "" : c}${rootSym(n)}${r}`;
  const out = res ? format(res.outside, res.inside, n) : "";
  const decimal = res ? (res.neg ? -1 : 1) * c * Math.abs(r) ** (1 / n) : NaN;
  const pulled = res ? res.factors.filter(([, e]) => e >= n) : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Simplify radicals calculator">
        <Segmented label="Root" value={["2", "3", "4"].includes(s.n) ? s.n : "other"} onChange={(v) => v !== "other" && set("n", v)} options={[{ id: "2", label: "Square √" }, { id: "3", label: "Cube ∛" }, { id: "4", label: "4th ∜" }, { id: "other", label: "nth" }]} />
        <div className="grid grid-cols-3 gap-3">
          <Field id="c" label="Coefficient" value={s.c} onChange={(v) => set("c", v)} inputMode="numeric" hint="Number in front" />
          <Field id="n" label="Index (n)" value={s.n} onChange={(v) => set("n", v)} min={2} inputMode="numeric" />
          <Field id="r" label="Radicand" value={s.r} onChange={(v) => set("r", v)} inputMode="numeric" hint="Number under the root" />
        </div>
      </form>
      <ResultCard label={`${input} in simplest radical form`} error={err} value={err ? "–" : <span data-testid="simplified">{out}</span>}>
        {res && <>
          <p className="mt-1 text-sm muted">≈ {Number.isFinite(decimal) ? Number(decimal.toPrecision(12)) : "–"}</p>
          <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm" data-testid="steps">
            <li>Prime factorization: {Math.abs(r)} = {res.factors.length ? res.factors.map(([p, e]) => (e > 1 ? `${p}${sup(e)}` : String(p))).join(" × ") : String(Math.abs(r))}</li>
            <li>{pulled.length ? `Group factors into sets of ${n}: ${pulled.map(([p, e]) => `${p}${sup(Math.floor(e / n) * n)}`).join(" × ")} come out as ${pulled.map(([p, e]) => `${p}${Math.floor(e / n) > 1 ? sup(Math.floor(e / n)) : ""}`).join(" × ")}` : `No prime appears ${n} or more times, so nothing comes out.`}</li>
            <li>Multiply what comes out{c !== 1 ? ` by the coefficient ${c}` : ""}{res.neg ? " (an odd root keeps the minus sign)" : ""} and leave the rest under the root: <strong>{out}</strong></li>
          </ol>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Outside the root" v={String(res.outside).replace("-", "−")} />
            <Stat k="Left under the root" v={res.inside} />
            <Stat k="Perfect power?" v={res.inside === 1 ? "Yes" : "No"} />
            <Stat k="Check" v={c !== 1 || res.inside === 1 || res.outside === 0 ? "—" : <span data-testid="check">{`${String(res.outside).replace("-", "−")}${sup(n)} × ${res.inside} = ${String(res.outside ** n * res.inside).replace("-", "−")}`}</span>} />
          </dl>
        </>}
      </ResultCard>
    </div>
  );
}
