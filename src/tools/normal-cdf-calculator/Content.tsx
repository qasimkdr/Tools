import Link from "next/link";

/** Brief + competitor findings: docs/research/normal-cdf-calculator.md · research/normal-cdf-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the normal CDF calculator</h2>
      <ol>
        <li><strong>Choose what to find</strong>: the probability below a value, above it, between two values or outside them, or use Inverse to find a value from a probability.</li>
        <li><strong>Enter the mean and standard deviation</strong> (0 and 1 for the standard normal z-table).</li>
        <li><strong>Enter your value(s)</strong> and read the probability, z-scores, the shaded curve and the matching TI-83/84 command.</li>
      </ol>

      <h2 id="formula">Normal CDF formulas</h2>
      <div className="formula">z = (x − μ) ÷ σ<br />P(X ≤ x) = Φ(z)  ·  P(X ≥ x) = 1 − Φ(z)  ·  P(a ≤ X ≤ b) = Φ(z_b) − Φ(z_a)<br />Inverse: x = μ + Φ⁻¹(p) × σ</div>
      <p>Φ is the standard normal cumulative distribution function. It has no simple closed form, so calculators and tables use accurate numerical approximations.</p>

      <h2 id="examples">Worked examples (IQ scores: μ = 100, σ = 15)</h2>
      <table>
        <thead><tr><th>Question</th><th>z</th><th>Probability</th></tr></thead>
        <tbody>
          <tr><td>P(X ≤ 120)</td><td>1.333</td><td>0.9088 (90.9%)</td></tr>
          <tr><td>P(85 ≤ X ≤ 115)</td><td>−1 to 1</td><td>0.6827 (68.3%)</td></tr>
          <tr><td>P(X ≥ 130)</td><td>2</td><td>0.0228 (2.3%)</td></tr>
          <tr><td>95th percentile</td><td>1.645</td><td>x = 124.67</td></tr>
        </tbody>
      </table>

      <h2 id="ztable">Common z-scores</h2>
      <table>
        <thead><tr><th>z</th><th>Φ(z) = area to the left</th><th>z</th><th>Φ(z)</th></tr></thead>
        <tbody>
          <tr><td>−3</td><td>0.0013</td><td>0.5</td><td>0.6915</td></tr>
          <tr><td>−2</td><td>0.0228</td><td>1</td><td>0.8413</td></tr>
          <tr><td>−1</td><td>0.1587</td><td>1.645</td><td>0.9500</td></tr>
          <tr><td>0</td><td>0.5000</td><td>1.96</td><td>0.9750</td></tr>
          <tr><td>−0.5</td><td>0.3085</td><td>2.576</td><td>0.9950</td></tr>
        </tbody>
      </table>

      <h2 id="uses">Where it&apos;s used</h2>
      <ul>
        <li><strong>Test scores and measurements</strong> that cluster around an average, such as heights or standardized test results.</li>
        <li><strong>Confidence intervals and hypothesis tests:</strong> the z-values 1.645, 1.96 and 2.576 come straight from the normal CDF. Build intervals with the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>.</li>
        <li><strong>AP Statistics:</strong> normal probability questions appear every year; estimate your exam score with the <Link href="/ap-statistics-score-calculator/">AP Stats score calculator</Link>.</li>
        <li><strong>Very small tail probabilities</strong> are easier to read in scientific notation; convert them with the <Link href="/scientific-notation-calculator/">scientific notation converter</Link>.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
