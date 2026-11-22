/** Unicode superscript / subscript / small-caps text conversion (pure). */
const mk = (from: string, to: string) => Object.fromEntries([...from].map((c, i) => [c, [...to][i]]));
export const SUP: Record<string, string> = {
  ...mk("0123456789+-=()", "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾"),
  ...mk("abcdefghijklmnoprstuvwxyz", "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"),
  ...mk("ABDEGHIJKLMNOPRTUVW", "ᴬᴮᴰᴱᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᴿᵀᵁⱽᵂ"),
  "−": "⁻",
};
export const SUB: Record<string, string> = {
  ...mk("0123456789+-=()", "₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎"),
  ...mk("aehijklmnoprstuvx", "ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ"),
  "−": "₋",
};
export const SMALL: Record<string, string> = mk("abcdefghijklmnopqrstuvwyz", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡʏᴢ");

export type Style = "sup" | "sub" | "small";
/** Convert text; letters with no form in that case fall back to the other case; others are kept and reported. */
export function convert(text: string, style: Style) {
  const map = style === "sup" ? SUP : style === "sub" ? SUB : SMALL;
  const missing = new Set<string>();
  let out = "";
  for (const ch of text) {
    const v = map[ch] ?? map[ch.toLowerCase()] ?? (style !== "small" ? map[ch.toUpperCase()] : undefined);
    if (v) out += v;
    else { out += ch; if (/\S/.test(ch) && !(style === "small" && !/[a-z]/i.test(ch))) missing.add(ch); }
  }
  return { out, missing: [...missing] };
}

/** Smart mode: x^2 → x², a_1 → a₁, {}-groups (x^{n+1}), and chemical formulas (H2O → H₂O, Ca(OH)2 → Ca(OH)₂). */
export function smart(text: string, chem = true) {
  let out = text.replace(/([\^_])(\{([^}]*)\}|[-−+]?[0-9a-zA-Z]+)/g, (_m, op: string, tok: string, grp?: string) => convert(grp ?? tok, op === "^" ? "sup" : "sub").out);
  if (chem) out = out.replace(/\b(?:[A-Z][a-z]?\d*|\((?:[A-Z][a-z]?\d*)+\)\d*)+\b/g, (w) => (/\d/.test(w) && /[A-Z]/.test(w) && !/^\d/.test(w) ? w.replace(/(?<=[A-Za-z)])\d+/g, (d) => convert(d, "sub").out) : w));
  return out;
}
