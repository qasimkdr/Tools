"use client";
import { Field, ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { fromNumber, parseSci, roundSig, toDecimal, toE, toEng, toNumber, toSci, type Sci } from "@/lib/sci";

const OPS = ["×", "÷", "+", "−"] as const;

export default function SciNotationCalculator() {
  const [s, set] = useUrlState({ mode: "convert", x: "0.000456", sf: "", a: "3.2e5", op: "×", b: "4.5e4" });
  const mode = s.mode === "math" ? "math" : "convert";
  let error: string | null = null, label = "", value = "", body: React.ReactNode = null;

  if (mode === "convert") {
    const raw = parseSci(s.x), sf = Math.floor(Number(s.sf));
    if (!raw) error = "Enter a number like 0.000456, 6,020,000, 4.56e-4 or 4.56×10^-4.";
    else {
      const x: Sci = sf >= 1 && sf <= 50 ? roundSig(raw, sf) : raw;
      const eng = toEng(x), noPoint = !/\./.test(s.x.replace(/[eE×x*·].*$/, "")) && /0$/.test(s.x.replace(/[eE×x*·].*$/, "").replace(/,/g, ""));
      const move = x.exp;
      label = sf >= 1 ? `Scientific notation (${sf} significant figures)` : "Scientific notation"; value = toSci(x);
      body = <>
        <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Stat k="E notation" v={toE(x)} />
          <Stat k="Decimal" v={<span className="break-all">{toDecimal(x)}</span>} />
          <Stat k="Engineering notation" v={`${eng.text}${eng.prefix ? ` · ${eng.prefix}` : ""}`} />
          <Stat k="Significant figures" v={raw.zero ? "—" : `${raw.digits.length}${noPoint ? " (trailing zeros ambiguous)" : ""}`} />
        </dl>
        {!x.zero && <p className="mt-4 text-sm muted" data-testid="steps">{move === 0 ? "The number is already between 1 and 10, so the exponent is 0." : `Move the decimal point ${Math.abs(move)} place${Math.abs(move) === 1 ? "" : "s"} to the ${move > 0 ? "left" : "right"} to get a number between 1 and 10, so the exponent is ${move}.`}</p>}
      </>;
    }
  } else {
    const A = parseSci(s.a), B = parseSci(s.b), op = (OPS as readonly string[]).includes(s.op) ? s.op : "×";
    if (!A || !B) error = "Enter both numbers, e.g. 3.2e5 or 3.2×10^5.";
    else {
      const a = toNumber(A), b = toNumber(B);
      const r = op === "×" ? a * b : op === "÷" ? a / b : op === "+" ? a + b : a - b;
      const R = op === "÷" && b === 0 ? null : fromNumber(r);
      if (!R) error = op === "÷" && b === 0 ? "Can't divide by zero." : "The result is too large or too small to show.";
      else {
        const minSf = Math.min(A.zero ? 1 : A.digits.length, B.zero ? 1 : B.digits.length);
        label = `${toSci(A)} ${op} ${toSci(B)} =`; value = toSci(roundSig(R, Math.min(R.digits.length, 15)));
        body = <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Stat k="E notation" v={toE(roundSig(R, Math.min(R.digits.length, 15)))} />
          <Stat k="Decimal" v={<span className="break-all">{toDecimal(roundSig(R, Math.min(R.digits.length, 15)))}</span>} />
          {(op === "×" || op === "÷") && <Stat k={`Rounded to ${minSf} sig figs (fewest in the inputs)`} v={toSci(roundSig(R, minSf))} />}
          <Stat k="How it works" v={op === "×" ? "Multiply the numbers, add the exponents" : op === "÷" ? "Divide the numbers, subtract the exponents" : "Match the exponents, then add or subtract"} />
        </dl>;
      }
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Scientific notation converter">
        <Segmented label="Mode" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "convert", label: "Convert" }, { id: "math", label: "Calculate" }]} />
        {mode === "convert" ? <>
          <div>
            <label htmlFor="x" className="label">Number (decimal or scientific)</label>
            <input id="x" className="field font-mono" value={s.x} onChange={(e) => set("x", e.target.value)} spellCheck={false} autoComplete="off" inputMode="text" />
            <p className="mt-1 text-xs subtle">Examples: 0.000456 · 6,020,000 · 4.56e-4 · 4.56×10^-4</p>
          </div>
          <Field id="sf" label="Round to significant figures (optional)" value={s.sf} onChange={(v) => set("sf", v)} min={1} inputMode="numeric" />
        </> : <>
          <div><label htmlFor="a" className="label">First number</label><input id="a" className="field font-mono" value={s.a} onChange={(e) => set("a", e.target.value)} spellCheck={false} /></div>
          <div>
            <span className="label">Operation</span>
            <div className="flex gap-1">{OPS.map((o) => <button key={o} type="button" aria-pressed={s.op === o} onClick={() => set("op", o)} className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-semibold ${s.op === o ? "border-transparent bg-[var(--color-brand-600)] text-white" : "border-[var(--border)] bg-[var(--surface)]"}`}>{o}</button>)}</div>
          </div>
          <div><label htmlFor="b" className="label">Second number</label><input id="b" className="field font-mono" value={s.b} onChange={(e) => set("b", e.target.value)} spellCheck={false} /></div>
          <p className="text-xs subtle">Arithmetic uses double precision (about 15 significant digits). Conversions are exact.</p>
        </>}
      </form>
      <ResultCard error={error} label={label} value={<span className="break-all">{value}</span>}>{body}</ResultCard>
    </div>
  );
}
