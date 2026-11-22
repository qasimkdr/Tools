import Link from "next/link";

/** Brief + competitor findings: docs/research/scientific-notation-calculator.md · research/scientific-notation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the scientific notation converter</h2>
      <ul>
        <li><strong>Convert:</strong> type a number in almost any format (0.000456, 6,020,000, 4.56e-4 or 4.56×10^-4) to see it in scientific, E, decimal and engineering notation, with its significant figures. Optionally round to a number of significant figures.</li>
        <li><strong>Calculate:</strong> multiply, divide, add or subtract two numbers in scientific notation. For × and ÷ you also get the answer rounded to the correct number of significant figures.</li>
      </ul>

      <h2 id="formula">Scientific notation format</h2>
      <div className="formula">a × 10ⁿ   where 1 ≤ |a| &lt; 10 and n is an integer<br />E notation: a e n   ·   Engineering: a × 10ⁿ with n a multiple of 3<br />(a × 10ᵐ) × (b × 10ⁿ) = (a × b) × 10ᵐ⁺ⁿ  ·  (a × 10ᵐ) ÷ (b × 10ⁿ) = (a ÷ b) × 10ᵐ⁻ⁿ</div>

      <h2 id="examples">Examples</h2>
      <table>
        <thead><tr><th>Decimal</th><th>Scientific</th><th>E notation</th><th>Engineering</th></tr></thead>
        <tbody>
          <tr><td>0.000456</td><td>4.56 × 10⁻⁴</td><td>4.56e-4</td><td>456 × 10⁻⁶ (µ)</td></tr>
          <tr><td>45,600</td><td>4.56 × 10⁴</td><td>4.56e+4</td><td>45.6 × 10³ (k)</td></tr>
          <tr><td>6,020,000</td><td>6.02 × 10⁶</td><td>6.02e+6</td><td>6.02 × 10⁶ (M)</td></tr>
          <tr><td>299,792,458 (speed of light, m/s)</td><td>2.99792458 × 10⁸</td><td>2.99792458e+8</td><td>299.792458 × 10⁶</td></tr>
        </tbody>
      </table>
      <h3>Calculations</h3>
      <div className="formula">(3.2 × 10⁵) × (4.5 × 10⁴) = 14.4 × 10⁹ = 1.44 × 10¹⁰  →  1.4 × 10¹⁰ to 2 sig figs<br />(6.0 × 10⁸) ÷ (2.0 × 10³) = 3.0 × 10⁵<br />3.2 × 10⁵ + 4.5 × 10⁴ = 3.2 × 10⁵ + 0.45 × 10⁵ = 3.65 × 10⁵</div>

      <h2 id="prefixes">Powers of ten and SI prefixes</h2>
      <table>
        <thead><tr><th>Power</th><th>Prefix</th><th>Power</th><th>Prefix</th></tr></thead>
        <tbody>
          <tr><td>10¹²</td><td>tera (T)</td><td>10⁻³</td><td>milli (m)</td></tr>
          <tr><td>10⁹</td><td>giga (G)</td><td>10⁻⁶</td><td>micro (µ)</td></tr>
          <tr><td>10⁶</td><td>mega (M)</td><td>10⁻⁹</td><td>nano (n)</td></tr>
          <tr><td>10³</td><td>kilo (k)</td><td>10⁻¹²</td><td>pico (p)</td></tr>
        </tbody>
      </table>

      <h2 id="sigfigs">Significant figures</h2>
      <ul>
        <li><strong>Count:</strong> all non-zero digits, zeros between them, and trailing zeros after a decimal point. Leading zeros don&apos;t count.</li>
        <li><strong>Multiplying or dividing:</strong> round the answer to the fewest significant figures in any input.</li>
        <li><strong>Adding or subtracting:</strong> round to the least precise decimal place among the inputs.</li>
        <li><strong>Why scientific notation helps:</strong> 6,020,000 could have 3 to 7 significant figures; 6.02 × 10⁶ unambiguously has 3.</li>
      </ul>

      <h2 id="uses">Where it&apos;s used</h2>
      <ul>
        <li><strong>Chemistry:</strong> Avogadro&apos;s number, 6.022 × 10²³ particles per mole, links grams to moles. See the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link>.</li>
        <li><strong>Computing:</strong> computers store decimals as binary floating point, essentially scientific notation in base 2. Explore bases with the <Link href="/binary-calculator/">binary converter</Link>.</li>
        <li><strong>Roots of huge numbers:</strong> √(4 × 10⁸) = 2 × 10⁴; halve the exponent when it&apos;s even. The <Link href="/square-root-calculator/">square root calculator</Link> handles any value.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
