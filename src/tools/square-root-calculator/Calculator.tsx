"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { num, primeFactors, simplifyRoot } from "@/lib/ratio";

const SUP = (n: number) => (n === 2 ? "" : String(n).split("").map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]).join(""));

export default function SquareRootCalculator() {
  const [s, set] = useUrlState({ x: "72", n: "2" });
  const x = Number(s.x), n = Math.round(Number(s.n));
  const sym = n === 2 ? "√" : n === 3 ? "∛" : n === 4 ? "∜" : `${SUP(n)}√`;
  let error: string | null = null, value = "", imaginary = false, root = NaN;
  if (s.x.trim() === "" || !Number.isFinite(x)) error = "Enter a number.";
  else if (!(n >= 2 && n <= 100)) error = "Root index must be a whole number from 2 to 100.";
  else if (x < 0 && n % 2 === 0) { imaginary = true; root = Math.pow(-x, 1 / n); value = `${num(root, 10)} i`; }
  else { root = x < 0 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n); if (Math.abs(Math.round(root) ** n - x) < 1e-9 * Math.max(1, Math.abs(x))) root = Math.round(root); value = num(root, 10); }
  const absInt = Number.isInteger(x) && x !== 0 ? Math.abs(x) : null;
  const simp = absInt ? simplifyRoot(absInt, n) : null;
  const perfect = simp && simp.inside === 1;
  const sign = x < 0 && n % 2 === 1 ? "−" : "";
  const radical = simp ? (perfect ? `${sign}${simp.outside}` : `${sign}${simp.outside === 1 ? "" : simp.outside}${sym}${simp.inside}`) + (imaginary ? " i" : "") : null;
  const pf = absInt && absInt <= 1e12 ? primeFactors(absInt) : [];
  const lo = n === 2 && x > 0 ? Math.floor(Math.sqrt(x)) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Square root calculator">
        <Field id="x" label="Number" value={s.x} onChange={(v) => set("x", v)} />
        <Segmented label="Root" value={(["2", "3"].includes(s.n) ? s.n : "n") as "2" | "3" | "n"} onChange={(v) => set("n", v === "n" ? "4" : v)} options={[{ id: "2", label: "Square √" }, { id: "3", label: "Cube ∛" }, { id: "n", label: "Nth root" }]} />
        {!["2", "3"].includes(s.n) && <Field id="n" label="Root index n" value={s.n} onChange={(v) => set("n", v)} min={2} inputMode="numeric" />}
      </form>
      <ResultCard error={error} label={`${sym}${s.x}${imaginary ? " (imaginary)" : ""}`} value={value}>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {radical && <Stat k="Simplified radical form" v={radical} />}
          {simp && <Stat k={n === 2 ? "Perfect square?" : n === 3 ? "Perfect cube?" : "Perfect power?"} v={perfect ? "Yes" : "No"} />}
          {Number.isFinite(root) && !imaginary && <Stat k={`Check: result${SUP(n) || "²"}`} v={num(Math.pow(root, n), 8)} />}
          {lo !== null && !perfect && <Stat k="Between perfect squares" v={`√${lo * lo} = ${lo} and √${(lo + 1) ** 2} = ${lo + 1}`} />}
        </dl>
        {pf.length > 0 && simp && (
          <ol className="mt-4 space-y-2 text-sm">
            <li className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono">{absInt} = {pf.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" × ")}</li>
            <li className="rounded-lg bg-[var(--surface-2)] px-3 py-2 font-mono">Groups of {n} come outside: {simp.outside} · left inside: {simp.inside}</li>
          </ol>
        )}
      </ResultCard>
    </div>
  );
}
