import Link from "next/link";

/** Brief + competitor findings: docs/research/confidence-interval-calculator.md · research/confidence-interval-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the confidence interval calculator</h2>
      <ol>
        <li><strong>Choose a mean or a proportion.</strong></li>
        <li><strong>For a mean</strong>, enter the sample mean, standard deviation and sample size, and say whether σ is known (z) or estimated from the sample (t). <strong>For a proportion</strong>, enter the number of successes and the sample size.</li>
        <li><strong>Pick a confidence level</strong> (90%, 95%, 99% or your own) and read the interval, margin of error, standard error and critical value.</li>
      </ol>

      <h2 id="formula">Confidence interval formulas</h2>
      <div className="formula">Mean, σ unknown: x̄ ± t* × s ÷ √n   (df = n − 1)<br />Mean, σ known: x̄ ± z* × σ ÷ √n<br />Proportion (Wald): p̂ ± z* × √(p̂(1 − p̂) ÷ n)<br />Proportion (Wilson): [p̂ + z²/2n ± z√(p̂(1 − p̂)/n + z²/4n²)] ÷ (1 + z²/n)</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Mean: x̄ = 50, s = 10, n = 25, 95% confidence</h3>
      <div className="formula">SE = 10 ÷ √25 = 2  ·  t* (df 24) = 2.0639<br />Margin of error = 2.0639 × 2 = 4.128  →  CI = 45.87 to 54.13</div>
      <p>If σ = 10 were known, z* = 1.960 would give a slightly narrower 46.08 to 53.92.</p>
      <h3>Proportion: 520 of 1,000 say yes, 95% confidence</h3>
      <div className="formula">p̂ = 0.52  ·  SE = √(0.52 × 0.48 ÷ 1,000) = 0.0158<br />Margin of error = 1.96 × 0.0158 = 0.031  →  48.9% to 55.1%</div>
      <h3>Small sample: 3 of 20</h3>
      <p>The simple formula gives −0.6% to 30.6%, an impossible negative lower bound. The Wilson interval gives a sensible <strong>5.2% to 36.0%</strong>, which is why the calculator shows both.</p>

      <h2 id="critical">Common critical values</h2>
      <table>
        <thead><tr><th>Confidence</th><th>z*</th><th>t* (df 10)</th><th>t* (df 30)</th></tr></thead>
        <tbody>
          <tr><td>90%</td><td>1.645</td><td>1.812</td><td>1.697</td></tr>
          <tr><td>95%</td><td>1.960</td><td>2.228</td><td>2.042</td></tr>
          <tr><td>99%</td><td>2.576</td><td>3.169</td><td>2.750</td></tr>
        </tbody>
      </table>

      <h2 id="assumptions">Assumptions</h2>
      <ul>
        <li><strong>Random sample</strong> of independent observations.</li>
        <li><strong>Means:</strong> the data are roughly normal, or n is large enough (often n ≥ 30) for the sample mean to be approximately normal.</li>
        <li><strong>Proportions:</strong> the Wald interval needs at least about 10 successes and 10 failures; otherwise use Wilson.</li>
      </ul>

      <h2 id="related">Related math</h2>
      <p>The standard error uses a square root; check it by hand with the <Link href="/square-root-calculator/">square root calculator</Link>. To draw a random sample, the <Link href="/random-number-generator/">random number generator</Link> can pick unique IDs. Survey results often come as ratios; convert them with the <Link href="/ratio-calculator/">ratio calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
