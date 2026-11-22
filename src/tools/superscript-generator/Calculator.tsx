"use client";
import { useState } from "react";
import { ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { convert, smart, type Style } from "@/lib/unicodeText";

type Mode = Style | "smart";
const SAMPLES: { label: string; mode: Mode; text: string }[] = [
  { label: "x^2 + y^2 = r^2", mode: "smart", text: "x^2 + y^2 = r^2" },
  { label: "H2O, CO2", mode: "smart", text: "H2O and CO2" },
  { label: "1st 2nd 3rd", mode: "smart", text: "1^st 2^nd 3^rd" },
  { label: "Footnote", mode: "smart", text: "As noted^1" },
];

export default function SuperscriptGenerator() {
  const [s, set] = useUrlState({ mode: "sup", t: "Hello World 123", chem: "1" });
  const [copied, setCopied] = useState(false);
  const mode = (["sup", "sub", "small", "smart"].includes(s.mode) ? s.mode : "sup") as Mode;
  const r = mode === "smart" ? { out: smart(s.t, s.chem === "1"), missing: [] as string[] } : convert(s.t, mode);
  const copy = () => { navigator.clipboard?.writeText(r.out).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Superscript generator">
        <Segmented label="Style" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "sup", label: "Superscript" }, { id: "sub", label: "Subscript" }, { id: "small", label: "Small caps" }, { id: "smart", label: "Smart (x^2, H2O)" }]} />
        <div>
          <label htmlFor="t" className="label">Your text</label>
          <textarea id="t" rows={4} className="field" value={s.t} onChange={(e) => set("t", e.target.value)} />
          {mode === "smart" && <p className="mt-1 text-xs subtle">Use ^ for superscript and _ for subscript, e.g. x^2, a_1, x^&#123;n+1&#125;.</p>}
        </div>
        {mode === "smart" && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.chem === "1"} onChange={(e) => set("chem", e.target.checked ? "1" : "0")} /> Subscript numbers in chemical formulas (H2O → H₂O)</label>}
        <div className="flex flex-wrap gap-2">{SAMPLES.map((x) => <button key={x.label} type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => { set("mode", x.mode); set("t", x.text); }}>{x.label}</button>)}</div>
      </form>
      <ResultCard label="Copy and paste" value={<span className="break-words font-normal" data-testid="output">{r.out || " "}</span>}>
        <button type="button" onClick={copy} className="btn-primary mt-4 !py-2">{copied ? "Copied ✓" : "Copy text"}</button>
        {r.missing.length > 0 && <p className="mt-3 text-sm text-amber-800" data-testid="missing">No Unicode {mode === "sub" ? "subscript" : mode === "small" ? "small-cap" : "superscript"} exists for: {r.missing.join(" ")}. They were left as normal characters.</p>}
        <p className="mt-3 text-xs subtle">These are real Unicode characters, so they work in social media bios, chats and documents without formatting, though a few may look different across fonts and devices. For proper math and documents, prefer your editor&apos;s superscript formatting.</p>
      </ResultCard>
    </div>
  );
}
