import Link from "next/link";

/** Brief + competitor findings: docs/research/standard-deviation-calculator.md · research/standard-deviation-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the standard deviation calculator</h2>
      <ol>
        <li>Paste or type your numbers, separated by commas, spaces or new lines.</li>
        <li>Choose <strong>sample</strong> (the data is part of a bigger group) or <strong>population</strong> (the data is the whole group).</li>
        <li>Read the standard deviation, mean and variance, plus the standard error, a 95% confidence interval for the mean, median, mode and range. The step-by-step section shows every deviation.</li>
      </ol>

      <h2 id="formula">Standard deviation formulas</h2>
      <div className="formula">Sample: s = √( Σ(x − x̄)² ÷ (n − 1) )<br />Population: σ = √( Σ(x − μ)² ÷ N )<br />Standard error: SE = s ÷ √n · 95% CI = x̄ ± t(0.975, n − 1) × SE</div>

      <h2 id="example">Worked example</h2>
      <p>Data: 2, 4, 4, 4, 5, 5, 7, 9 (n = 8).</p>
      <table>
        <thead><tr><th>x</th><th>x − 5</th><th>(x − 5)²</th></tr></thead>
        <tbody>
          {[2, 4, 4, 4, 5, 5, 7, 9].map((x, i) => <tr key={i}><td>{x}</td><td>{x - 5}</td><td>{(x - 5) ** 2}</td></tr>)}
          <tr><td><strong>Σ = 40</strong></td><td>0</td><td><strong>32</strong></td></tr>
        </tbody>
      </table>
      <ul>
        <li>Mean = 40 ÷ 8 = <strong>5</strong></li>
        <li>Population: σ² = 32 ÷ 8 = 4, so <strong>σ = 2</strong></li>
        <li>Sample: s² = 32 ÷ 7 ≈ 4.571, so <strong>s ≈ 2.138</strong></li>
        <li>Standard error = 2.138 ÷ √8 ≈ 0.756; 95% CI for the mean ≈ 5 ± 2.365 × 0.756 = <strong>3.21 to 6.79</strong></li>
      </ul>

      <h2 id="interpret">Interpreting standard deviation</h2>
      <p>For data that is roughly bell-shaped, the empirical rule says about 68% of values fall within 1 SD of the mean, 95% within 2 SD and 99.7% within 3 SD. The coefficient of variation (SD ÷ mean) compares spread between data sets with different units or scales.</p>
      <p>To find probabilities under the normal curve, use the <Link href="/normal-cdf-calculator/">normal CDF calculator</Link>; for intervals from summary statistics, the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>. If some values count more than others, use the <Link href="/weighted-mean-calculator/">weighted mean calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
