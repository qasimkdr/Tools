"use client";
import { useState } from "react";
import { ResultCard, Segmented, Stat } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { breakdown, fromRoman, toRoman } from "@/lib/roman";

function Numeral({ n, testid }: { n: number; testid?: string }) {
  const r = toRoman(n);
  return <span className="font-serif tracking-wide" data-testid={testid}>{r.over && <span style={{ textDecoration: "overline" }}>{r.over}</span>}{r.plain}</span>;
}

export default function RomanNumeralConverter() {
  const [s, set] = useUrlState({ mode: "num", v: "2026", rn: "MCMXCIV", date: "2026-11-26", fmt: "mdy", sep: "." });
  const [copied, setCopied] = useState(false);
  const mode = ["num", "rom", "date"].includes(s.mode) ? s.mode : "num";
  const tokens = s.v.split(/[\s,;]+/).filter(Boolean);
  const nums = tokens.map((t) => Number(t.replace(/_/g, "")));
  const many = mode === "num" && tokens.length > 1;
  const one = nums[0];
  const numErr = mode === "num" ? (!tokens.length ? "Enter a whole number from 1 to 3,999,999." : nums.some((x) => !Number.isInteger(x) || x < 1 || x > 3999999) ? "Use whole numbers from 1 to 3,999,999 (there is no Roman numeral for zero or negatives)." : null) : null;
  const rom = mode === "rom" ? fromRoman(s.rn) : null;
  const d = /^\d{4}-\d{2}-\d{2}$/.test(s.date) ? s.date.split("-").map(Number) : null;
  const dateErr = mode === "date" && !d ? "Pick a date." : null;
  const err = numErr || (rom && !Number.isFinite(rom.value) ? rom.error ?? "Invalid numeral." : null) || dateErr;
  const sep = s.sep === "/" ? "/" : s.sep === "-" ? "-" : s.sep === " " ? " " : "·".includes(s.sep) ? "·" : ".";
  const dateParts = d ? (s.fmt === "dmy" ? [d[2], d[1], d[0]] : s.fmt === "ymd" ? [d[0], d[1], d[2]] : [d[1], d[2], d[0]]) : [];
  const dateRoman = dateParts.map((x) => toRoman(x).text).join(sep);
  const copyText = mode === "num" ? nums.map((x) => toRoman(x).text).join(" ") : mode === "rom" ? String(rom?.value ?? "") : dateRoman;
  const copy = () => { try { navigator.clipboard.writeText(copyText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }, () => {}); } catch {} };
  const shown = mode === "num" ? one : mode === "rom" ? rom?.value ?? NaN : NaN;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Roman numeral converter">
          <Segmented label="Convert" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "num", label: "Number → Roman" }, { id: "rom", label: "Roman → number" }, { id: "date", label: "Date → Roman" }]} />
          {mode === "num" && <div>
            <label htmlFor="v" className="label">Number(s)</label>
            <input id="v" className="field" value={s.v} onChange={(e) => set("v", e.target.value)} inputMode="numeric" autoComplete="off" />
            <p className="mt-1 text-xs subtle">1 to 3,999,999. Separate several numbers with spaces or commas to convert them all.</p>
          </div>}
          {mode === "rom" && <div>
            <label htmlFor="rn" className="label">Roman numeral</label>
            <input id="rn" className="field font-serif uppercase tracking-wide" value={s.rn} onChange={(e) => set("rn", e.target.value)} autoComplete="off" spellCheck={false} />
            <p className="mt-1 text-xs subtle">Letters I V X L C D M. For thousands with an overline, wrap them in brackets or underscores: (V)CCC or _V_CCC = 5,300.</p>
          </div>}
          {mode === "date" && <>
            <div><label htmlFor="date" className="label">Date</label><input id="date" type="date" className="field" value={s.date} onChange={(e) => set("date", e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label htmlFor="fmt" className="label">Order</label><select id="fmt" className="field" value={s.fmt} onChange={(e) => set("fmt", e.target.value)}><option value="mdy">Month · Day · Year (US)</option><option value="dmy">Day · Month · Year</option><option value="ymd">Year · Month · Day</option></select></div>
              <div><label htmlFor="sep" className="label">Separator</label><select id="sep" className="field" value={sep} onChange={(e) => set("sep", e.target.value)}><option value=".">Dot (.)</option><option value="·">Middle dot (·)</option><option value="-">Dash (-)</option><option value="/">Slash (/)</option><option value=" ">Space</option></select></div>
            </div>
          </>}
        </form>
        <ResultCard error={err} label={mode === "rom" ? "Number" : mode === "date" ? "Date in Roman numerals" : many ? "Roman numerals" : "Roman numeral"} value={err ? "–" : mode === "num" ? (many ? <span className="font-serif text-2xl" data-testid="out">{nums.map((x, i) => <span key={i}>{i ? ", " : ""}<Numeral n={x} /></span>)}</span> : <Numeral n={one} testid="out" />) : mode === "rom" ? <span data-testid="out">{rom!.value.toLocaleString("en-US")}</span> : <span className="font-serif tracking-wide" data-testid="out">{dateRoman}</span>}>
          {!err && <>
            <button type="button" className="btn-ghost mt-2 px-3 py-1.5 text-sm" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
            {mode === "rom" && rom && !rom.valid && <p className="mt-3 rounded-lg bg-amber-50 p-2 text-sm dark:bg-amber-950/40" data-testid="nonstd">“{s.rn.toUpperCase()}” isn&apos;t written in standard form. The standard spelling of {rom.value.toLocaleString("en-US")} is <strong className="font-serif">{rom.standard}</strong>.</p>}
            {mode === "date" && <p className="mt-2 text-sm muted">{dateParts.map((x, i) => `${x} = ${toRoman(x).text}`).join(" · ")}</p>}
            {Number.isFinite(shown) && !many && <>
              <h2 className="mt-4 text-sm font-semibold">Breakdown, step by step</h2>
              <ol className="mt-2 space-y-1 text-sm" data-testid="steps">
                {shown >= 4000 && <li>{Math.floor(shown / 1000).toLocaleString("en-US")} thousands → <span style={{ textDecoration: "overline" }} className="font-serif">{toRoman(Math.floor(shown / 1000)).plain}</span> (a bar multiplies by 1,000)</li>}
                {breakdown(shown >= 4000 ? shown % 1000 : shown).map((p) => <li key={p.value}>{p.value.toLocaleString("en-US")} → <span className="font-serif">{p.roman}</span></li>)}
              </ol>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <Stat k="Characters" v={toRoman(shown).over.length + toRoman(shown).plain.length} />
                <Stat k="Standard form?" v={shown < 4000 ? "Yes (1–3,999)" : "Uses an overline (vinculum)"} />
              </dl>
            </>}
          </>}
        </ResultCard>
      </div>
      <div>
        <h2 className="text-base font-semibold">Roman numerals chart</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [30, 40, 50, 60, 70, 80, 90, 100, 200, 400], [500, 900, 1000, 1500, 1900, 2000, 2025, 2026, 3999, 5000]].map((col, i) => (
            <table key={i} className="w-full text-sm" data-testid={i === 0 ? "chart" : undefined}>
              <tbody>{col.map((n) => <tr key={n} className="border-t border-[var(--border)]"><td className="py-1 pr-3">{n.toLocaleString("en-US")}</td><td><Numeral n={n} /></td></tr>)}</tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
}
