"use client";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { binaryToText, formatBase, group, intToBase, parseBase, textToBinary, twosComplement } from "@/lib/base";

const BASES = [{ id: "2", label: "Binary" }, { id: "10", label: "Decimal" }, { id: "16", label: "Hex" }, { id: "8", label: "Octal" }] as const;
const OPS = ["+", "−", "×", "÷", "AND", "OR", "XOR"] as const;
type Mode = "convert" | "math" | "text";

function Copy({ v }: { v: string }) {
  return <button type="button" className="ml-2 text-xs font-semibold text-[var(--color-brand-600)]" onClick={() => navigator.clipboard?.writeText(v)}>Copy</button>;
}

export default function BinaryCalculator() {
  const [s, set] = useUrlState({ mode: "convert", v: "156", from: "10", bits: "8", a: "1011", b: "110", op: "+", text: "Hi", dir: "t2b" });
  const mode = (["convert", "math", "text"].includes(s.mode) ? s.mode : "convert") as Mode;
  const base = Number(["2", "10", "16", "8"].includes(s.from) ? s.from : "10");
  const p = parseBase(s.v, base);
  const bits = Number(s.bits) || 8;

  let body: React.ReactNode = null, label = "", value = "", error: string | null = null;
  if (mode === "convert") {
    if (!p) error = `"${s.v}" isn't a valid ${BASES.find((b) => b.id === String(base))!.label.toLowerCase()} number.`;
    else {
      const bin = formatBase(p, 2), dec = formatBase(p, 10), hex = formatBase(p, 16), oct = formatBase(p, 8);
      label = "Binary"; value = group(bin.text);
      const isInt = p.num === 0n, n = p.neg ? -p.int : p.int;
      const tc = isInt ? twosComplement(n, bits) : null;
      body = <>
        <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Stat k="Decimal" v={<>{dec.text}{!dec.exact && "…"}<Copy v={dec.text} /></>} />
          <Stat k="Hexadecimal" v={<>{hex.text.toUpperCase()}{!hex.exact && "…"}<Copy v={hex.text.toUpperCase()} /></>} />
          <Stat k="Octal" v={<>{oct.text}{!oct.exact && "…"}</>} />
          <Stat k="Binary digits (bits)" v={p.int.toString(2).length} />
        </dl>
        {!bin.exact && <p className="mt-3 text-sm text-amber-800">This fraction doesn&apos;t terminate in binary (like 1/3 in decimal), so it&apos;s shown to 24 places.</p>}
        {isInt && <div className="mt-4 text-sm">
          <Segmented label="Two's complement width" value={String(bits) as "8"} onChange={(v) => set("bits", v)} options={["8", "16", "32", "64"].map((x) => ({ id: x as "8", label: `${x}-bit` }))} />
          <p className="mt-2 break-all"><span className="subtle">Signed (two&apos;s complement): </span><span className="font-mono" data-testid="twos">{tc ? group(tc) : `doesn't fit (range ${-(2 ** (bits - 1))} to ${2 ** (bits - 1) - 1})`}</span></p>
          {!p.neg && <p className="mt-1 break-all"><span className="subtle">Unsigned: </span><span className="font-mono" data-testid="unsigned">{p.int < 1n << BigInt(bits) ? group(p.int.toString(2).padStart(bits, "0")) : `doesn't fit (max ${(1n << BigInt(bits)) - 1n})`}</span></p>}
        </div>}
        {isInt && !p.neg && p.int < 1024n && p.int > 0n && <p className="mt-3 text-sm muted" data-testid="steps">Place values: {p.int.toString(2).split("").map((d, i, a) => (d === "1" ? 2 ** (a.length - 1 - i) : null)).filter((x) => x !== null).join(" + ")} = {p.int.toString()}</p>}
      </>;
    }
  } else if (mode === "math") {
    const A = parseBase(s.a, 2), B = parseBase(s.b, 2), op = (OPS as readonly string[]).includes(s.op) ? s.op : "+";
    if (!A || !B || A.num || B.num) error = "Enter whole binary numbers using only 0 and 1 (a leading minus sign is allowed).";
    else {
      const a = A.neg ? -A.int : A.int, b = B.neg ? -B.int : B.int;
      let r: bigint | null = null, rem: bigint | null = null;
      if (op === "+") r = a + b; else if (op === "−") r = a - b; else if (op === "×") r = a * b;
      else if (op === "÷") { if (b === 0n) error = "Can't divide by zero."; else { r = a / b; rem = a % b; } }
      else if (a < 0n || b < 0n) error = "Bitwise AND, OR and XOR need non-negative numbers here.";
      else r = op === "AND" ? a & b : op === "OR" ? a | b : a ^ b;
      if (r !== null) {
        label = `${s.a} ${op} ${s.b} =`; value = intToBase(r, 2);
        body = <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Stat k="In decimal" v={`${a} ${op} ${b} = ${r}`} />
          <Stat k="Hex" v={intToBase(r, 16).toUpperCase()} />
          {rem !== null && <Stat k="Remainder" v={`${intToBase(rem, 2)} (${rem})`} />}
        </dl>;
      }
    }
  } else {
    if (s.dir === "b2t") { const t = binaryToText(s.text); if (t === null) error = "Enter 8-bit groups of 0s and 1s separated by spaces, e.g. 01001000 01101001."; else { label = "Text"; value = t; } }
    else { label = "Binary (UTF-8, 8 bits per byte)"; value = textToBinary(s.text) || "—"; }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Binary converter">
        <Segmented label="Mode" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "convert", label: "Convert numbers" }, { id: "math", label: "Binary math" }, { id: "text", label: "Text ↔ binary" }]} />
        {mode === "convert" && <>
          <Segmented label="Input is" value={String(base) as "2"} onChange={(v) => set("from", v)} options={BASES.map((b) => ({ id: b.id as "2", label: b.label }))} />
          <div>
            <label htmlFor="v" className="label">Number</label>
            <input id="v" className="field font-mono" value={s.v} onChange={(e) => set("v", e.target.value)} spellCheck={false} autoComplete="off" placeholder={base === 2 ? "e.g. 1010.101" : base === 16 ? "e.g. 9C or 0x9C" : "e.g. 156 or 10.625"} />
            <p className="mt-1 text-xs subtle">Any size. Fractions (a point) and a leading minus sign are allowed.</p>
          </div>
        </>}
        {mode === "math" && <>
          <div><label htmlFor="a" className="label">First binary number</label><input id="a" className="field font-mono" value={s.a} onChange={(e) => set("a", e.target.value)} inputMode="numeric" /></div>
          <div>
            <span className="label">Operation</span>
            <div className="flex flex-wrap gap-1">{OPS.map((o) => <button key={o} type="button" aria-pressed={s.op === o} onClick={() => set("op", o)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${s.op === o ? "border-transparent bg-[var(--color-brand-600)] text-white" : "border-[var(--border)] bg-[var(--surface)]"}`}>{o}</button>)}</div>
          </div>
          <div><label htmlFor="b" className="label">Second binary number</label><input id="b" className="field font-mono" value={s.b} onChange={(e) => set("b", e.target.value)} inputMode="numeric" /></div>
        </>}
        {mode === "text" && <>
          <Segmented label="Direction" value={s.dir === "b2t" ? "b2t" : "t2b"} onChange={(v) => set("dir", v)} options={[{ id: "t2b", label: "Text → binary" }, { id: "b2t", label: "Binary → text" }]} />
          <div><label htmlFor="text" className="label">{s.dir === "b2t" ? "Binary" : "Text"}</label><textarea id="text" rows={4} className="field font-mono" value={s.text} onChange={(e) => set("text", e.target.value)} /></div>
        </>}
      </form>
      <ResultCard error={error} label={label} value={<span className="break-all font-mono text-2xl sm:text-3xl">{value}</span>}>
        {body}
        {mode === "text" && !error && value && <p className="mt-3"><Copy v={value} /></p>}
      </ResultCard>
    </div>
  );
}
