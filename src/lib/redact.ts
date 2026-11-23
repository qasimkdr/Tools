/** Cosmetic text redaction with block characters. Pure. */
export type RedactMode = "all" | "words" | "brackets";
const WORDCH = /[\p{L}\p{N}]/u;

export function redact(text: string, o: { mode: RedactMode; words: string[]; bar: string; keepPunct: boolean; hideLength: boolean; fixed: number }) {
  const blk = (s: string) => {
    if (o.hideLength) return o.bar.repeat(o.fixed);
    return [...s].map((c) => (o.keepPunct && !WORDCH.test(c) ? c : /\s/.test(c) ? c : o.bar)).join("");
  };
  if (o.mode === "brackets") return text.replace(/\[([^\]]*)\]/g, (_, inner: string) => blk(inner));
  if (o.mode === "words") {
    const list = o.words.map((w) => w.trim()).filter(Boolean).sort((a, b) => b.length - a.length);
    if (!list.length) return text;
    const esc = list.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return text.replace(new RegExp(`(?<![\\p{L}\\p{N}])(${esc.join("|")})(?![\\p{L}\\p{N}])`, "giu"), (m) => blk(m));
  }
  if (o.hideLength) return text.split(/(\s+)/).map((t) => (/^\s+$/.test(t) || !t ? t : o.bar.repeat(o.fixed))).join("");
  return [...text].map((c) => (/\s/.test(c) ? c : o.keepPunct && !WORDCH.test(c) ? c : o.bar)).join("");
}
