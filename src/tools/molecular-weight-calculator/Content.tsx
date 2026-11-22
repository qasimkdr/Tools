import Link from "next/link";

/** Brief + competitor findings: docs/research/molecular-weight-calculator.md · research/molecular-weight-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the molecular weight calculator</h2>
      <ol>
        <li><strong>Type a chemical formula</strong> such as <code>H2O</code>, <code>Ca(OH)2</code> or <code>CuSO4·5H2O</code>, or tap an example.</li>
        <li><strong>Read the molar mass</strong> in g/mol, with a table showing each element&apos;s atom count, mass contribution and percentage by mass.</li>
        <li><strong>Convert</strong> between grams and moles using the box under the formula.</li>
      </ol>

      <h2 id="formula">How molar mass is calculated</h2>
      <div className="formula">M = Σ (number of atoms of element × atomic weight of element)<br />moles = mass (g) ÷ M  ·  mass (g) = moles × M<br />mass % of element = (atoms × atomic weight) ÷ M × 100</div>
      <p>Atomic weights are the IUPAC standard values, rounded to about five significant figures. They&apos;re averages over each element&apos;s natural isotope mix, which is why chlorine is 35.45 rather than a whole number.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Glucose, C6H12O6</h3>
      <div className="formula">6 × 12.011 + 12 × 1.008 + 6 × 15.999 = 72.066 + 12.096 + 95.994 = 180.156 g/mol</div>
      <p>By mass, glucose is 40.00% carbon, 6.71% hydrogen and 53.28% oxygen. 100 g of glucose is 100 ÷ 180.156 = <strong>0.555 mol</strong>.</p>
      <h3>A hydrate: copper(II) sulfate pentahydrate, CuSO4·5H2O</h3>
      <p>CuSO4 contributes 159.60 g/mol and five waters add 5 × 18.015 = 90.08, for a total of <strong>249.68 g/mol</strong>. Forgetting the water of crystallization is one of the most common lab-calculation mistakes.</p>
      <h3>Brackets: calcium phosphate, Ca3(PO4)2</h3>
      <p>The subscript 2 multiplies everything inside the brackets: 3 Ca + 2 P + 8 O = <strong>310.17 g/mol</strong>.</p>

      <h2 id="common">Molar masses of common compounds</h2>
      <table>
        <thead><tr><th>Compound</th><th>Formula</th><th>Molar mass (g/mol)</th></tr></thead>
        <tbody>
          <tr><td>Water</td><td>H2O</td><td>18.015</td></tr>
          <tr><td>Carbon dioxide</td><td>CO2</td><td>44.009</td></tr>
          <tr><td>Sodium chloride (salt)</td><td>NaCl</td><td>58.440</td></tr>
          <tr><td>Ammonium nitrate</td><td>NH4NO3</td><td>80.043</td></tr>
          <tr><td>Sulfuric acid</td><td>H2SO4</td><td>98.072</td></tr>
          <tr><td>Glucose</td><td>C6H12O6</td><td>180.156</td></tr>
          <tr><td>Caffeine</td><td>C8H10N4O2</td><td>194.194</td></tr>
        </tbody>
      </table>

      <h2 id="mw-vs-mm">Molecular weight vs molar mass</h2>
      <p><strong>Molecular weight</strong> (molecular mass) is the mass of a single molecule, in atomic mass units (u, also called daltons, Da). <strong>Molar mass</strong> is the mass of one mole of a substance, 6.022 × 10²³ particles, in grams per mole. Because of how the mole is defined, the two numbers are the same: one water molecule is 18.015 u, and one mole of water is 18.015 g. For ionic compounds such as NaCl, &quot;formula mass&quot; is the technically correct term, calculated the same way.</p>

      <h2 id="tips">Tips and common mistakes</h2>
      <ul>
        <li><strong>Capitalize correctly:</strong> Co (cobalt) ≠ CO (carbon monoxide); Hf ≠ HF.</li>
        <li><strong>Apply subscripts after brackets</strong> to every atom inside: (NH4)2SO4 has 2 N and 8 H.</li>
        <li><strong>Don&apos;t forget hydrate water</strong> when weighing out salts from a bottle labeled ·xH2O.</li>
        <li><strong>Scaling a recipe or solution?</strong> Ratios of masses or volumes work like any proportion. Use the <Link href="/proportion-calculator/">proportion calculator</Link> or the <Link href="/ratio-calculator/">ratio calculator</Link>.</li>
      </ul>
      <p>More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
