"use client";
import { useState } from "react";
import { ResultCard, Segmented } from "@/components/calc/ui";
import { useUrlState } from "@/lib/useUrlState";
import { redact, type RedactMode } from "@/lib/redact";

const BARS = ["█", "▇", "■", "▓", "X", "*"];

export default function RedactedTextGenerator() {
  const [s, set] = useUrlState({ text: "Agent [John Smith] will meet the informant at [9pm] near the old bridge.", mode: "brackets", words: "bridge, informant", bar: "█", punct: "1", hide: "0" });
  const [copied, setCopied] = useState(false);
  const mode = (["all", "words", "brackets"].includes(s.mode) ? s.mode : "brackets") as RedactMode;
  const out = redact(s.text, { mode, words: s.words.split(","), bar: BARS.includes(s.bar) ? s.bar : "█", keepPunct: s.punct === "1", hideLength: s.hide === "1", fixed: 6 });
  const copy = async () => { try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* blocked */ } };
  const hidden = [...out].filter((c) => c === (BARS.includes(s.bar) ? s.bar : "█")).length;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Redacted text generator">
        <div>
          <label htmlFor="text" className="label">Your text</label>
          <textarea id="text" rows={5} className="field" value={s.text} onChange={(e) => set("text", e.target.value)} maxLength={5000} />
        </div>
        <Segmented label="Redact" value={mode} onChange={(v) => set("mode", v)} options={[{ id: "brackets", label: "[Bracketed] parts" }, { id: "words", label: "Chosen words" }, { id: "all", label: "Everything" }]} />
        {mode === "words" && <div><label htmlFor="words" className="label">Words or phrases to redact (comma-separated)</label><input id="words" className="field" value={s.words} onChange={(e) => set("words", e.target.value)} /></div>}
        <div>
          <span className="label">Bar style</span>
          <div className="flex flex-wrap gap-2">{BARS.map((b) => <button key={b} type="button" aria-pressed={s.bar === b} onClick={() => set("bar", b)} className={`h-10 w-10 rounded-lg border text-lg ${s.bar === b ? "border-[var(--color-brand-600)] bg-[var(--color-brand-600)] text-white" : "border-[var(--border)]"}`}>{b}</button>)}</div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={s.punct === "1"} onChange={(e) => set("punct", e.target.checked ? "1" : "0")} /> Keep punctuation visible</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={s.hide === "1"} onChange={(e) => set("hide", e.target.checked ? "1" : "0")} /> Hide word lengths (fixed-width bars)</label>
        </div>
      </form>
      <ResultCard label="Redacted text" value={<span className="block whitespace-pre-wrap break-words text-xl leading-relaxed sm:text-2xl" data-testid="out">{out}</span>}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn text-sm" onClick={copy}>{copied ? "Copied ✓" : "Copy redacted text"}</button>
          <span className="text-sm muted">{hidden} characters hidden</span>
        </div>
        <p className="mt-4 text-xs subtle">This is visual text for posts, memes, games and mock documents. It is not secure redaction: anyone with your original text can still read it, and bar lengths can hint at the hidden words. For real documents, use a PDF tool&apos;s redaction feature that removes the underlying text.</p>
      </ResultCard>
    </div>
  );
}
