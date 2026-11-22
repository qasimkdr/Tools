import Link from "next/link";
import { SUP, SUB } from "@/lib/unicodeText";

/** Brief + competitor findings: docs/research/superscript-generator.md · research/superscript-generator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the superscript generator</h2>
      <ol>
        <li><strong>Type or paste your text.</strong></li>
        <li><strong>Choose a style</strong>: superscript, subscript, small caps, or Smart mode, which raises only what follows ^ (x^2 → x²), lowers what follows _ (a_1 → a₁) and fixes chemical formulas (H2O → H₂O).</li>
        <li><strong>Copy the result</strong> and paste it into a message, bio, spreadsheet or document.</li>
      </ol>

      <h2 id="how-it-works">How it works</h2>
      <p>Superscript and subscript text here isn&apos;t formatting: each character is swapped for a separate Unicode character that&apos;s drawn small and raised (or lowered), so it survives copy and paste into places that don&apos;t support formatting. The trade-off is that Unicode only defines these characters for some letters and symbols.</p>
      <div className="formula">x^2 + y^2 = r^2  →  x² + y² = r²<br />10^-3  →  10⁻³  ·  x^&#123;n+1&#125;  →  xⁿ⁺¹  ·  a_1  →  a₁<br />H2O, CO2, Ca(OH)2  →  H₂O, CO₂, Ca(OH)₂</div>

      <h2 id="chars">Available characters</h2>
      <h3>Superscript</h3>
      <p className="break-words font-mono text-lg">{Object.values(SUP).join(" ")}</p>
      <h3>Subscript</h3>
      <p className="break-words font-mono text-lg">{Object.values(SUB).join(" ")}</p>
      <p>Missing from Unicode: superscript q and capitals C, F, Q, S, X, Y, Z; subscript b, c, d, f, g, q, w, y, z and all capitals. The tool tells you which characters it couldn&apos;t convert.</p>

      <h2 id="uses">Common uses</h2>
      <table>
        <thead><tr><th>Use</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Exponents and units</td><td>m², cm³, 2¹⁰ = 1,024</td></tr>
          <tr><td>Chemistry</td><td>H₂O, CO₂, Na⁺, SO₄²⁻</td></tr>
          <tr><td>Ordinals and footnotes</td><td>1ˢᵗ, 2ⁿᵈ, 3ʳᵈ, text¹</td></tr>
          <tr><td>Trademark-style marks</td><td>Brandᵀᴹ</td></tr>
          <tr><td>Social bios and usernames</td><td>ᴴᵉˡˡᵒ, ꜱᴍᴀʟʟ ᴄᴀᴘꜱ</td></tr>
        </tbody>
      </table>
      <p>Writing very large or small numbers? The <Link href="/scientific-notation-calculator/">scientific notation converter</Link> shows them as a × 10ⁿ with proper superscript exponents. Working out formulas like H₂SO₄? The <Link href="/molecular-weight-calculator/">molecular weight calculator</Link> gives their molar mass, and the <Link href="/square-root-calculator/">square root calculator</Link> handles x² in reverse.</p>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Check on your device:</strong> rare characters such as superscript V (ⱽ) may not show in every font.</li>
        <li><strong>Keep it readable:</strong> screen readers can struggle with Unicode superscripts, so don&apos;t use them for whole sentences.</li>
        <li><strong>In documents,</strong> use built-in superscript formatting instead so text stays searchable.</li>
      </ul>
      <p>More <Link href="/category/text/">text tools</Link>.</p>
    </>
  );
}
