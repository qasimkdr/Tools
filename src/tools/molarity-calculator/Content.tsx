import Link from "next/link";

/** Brief + competitor findings: docs/research/molarity-calculator.md · research/molarity-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the molarity calculator</h2>
      <ol>
        <li>Choose what to find: the <strong>mass</strong> to weigh out, the <strong>molarity</strong> of a solution, the <strong>volume</strong> to make, or a <strong>dilution</strong>.</li>
        <li>Type the compound&apos;s formula (NaCl, C6H12O6, CuSO4·5H2O) or its molar mass in g/mol.</li>
        <li>Enter the known values with their units (M, mM, µM; L, mL, µL; g, mg). The steps show every conversion.</li>
      </ol>

      <h2 id="formula">Molarity formulas</h2>
      <div className="formula">Molarity M = n ÷ V (mol/L) · n = mass ÷ molar mass<br />Mass = M × V × molar mass · Volume = (mass ÷ molar mass) ÷ M<br />Dilution: M₁V₁ = M₂V₂</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Make 250 mL of 0.5 M NaCl</strong>: 0.5 mol/L × 0.25 L = 0.125 mol × 58.44 g/mol = <strong>7.305 g</strong>.</li>
        <li><strong>Molarity of 10 g NaCl in 500 mL</strong>: 10 ÷ 58.44 = 0.1711 mol ÷ 0.5 L = <strong>0.3422 M</strong>.</li>
        <li><strong>Dilute 1 M to 0.1 M, 500 mL</strong>: V₁ = 0.1 × 500 ÷ 1 = <strong>50 mL</strong> stock + 450 mL water.</li>
      </ul>

      <h2 id="units">Concentration units</h2>
      <table>
        <thead><tr><th>Unit</th><th>Meaning</th><th>In M</th></tr></thead>
        <tbody>
          <tr><td>M (molar)</td><td>mol per liter</td><td>1</td></tr>
          <tr><td>mM (millimolar)</td><td>mmol per liter</td><td>0.001</td></tr>
          <tr><td>µM (micromolar)</td><td>µmol per liter</td><td>0.000001</td></tr>
          <tr><td>nM (nanomolar)</td><td>nmol per liter</td><td>0.000000001</td></tr>
        </tbody>
      </table>
      <p>Need a molar mass on its own? Use the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link>. For very small concentrations, the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link> helps, and the <Link href="/ratio-calculator/">ratio calculator</Link> scales recipes and mixtures. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
