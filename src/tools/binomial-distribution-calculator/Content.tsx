import Link from "next/link";

/** Brief + competitor findings: docs/research/binomial-distribution-calculator.md · research/binomial-distribution-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the binomial distribution calculator</h2>
      <ol>
        <li>Enter the number of trials n and the probability of success p on each trial.</li>
        <li>Choose the question: exactly, at most, fewer than, at least, more than, or between two values.</li>
        <li>Enter k (or a and b). Read the probability, every cumulative version, the mean and variance, the chart and the step-by-step working.</li>
      </ol>

      <h2 id="formulas">Binomial formulas</h2>
      <div className="formula">P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)<br />C(n, k) = n! ÷ (k! × (n − k)!)<br />P(X ≤ k) = Σ P(X = i) for i = 0…k · P(X ≥ k) = 1 − P(X ≤ k − 1)<br />Mean = np · Variance = np(1 − p) · SD = √(np(1 − p))</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Coin flips:</strong> 10 flips, p = 0.5, exactly 3 heads: C(10, 3) = 120, so P = 120 × 0.5¹⁰ = 120 ÷ 1,024 = <strong>0.1172</strong>.</li>
        <li><strong>At most 3 heads:</strong> (1 + 10 + 45 + 120) ÷ 1,024 = <strong>0.1719</strong>. At least 3: 1 − (1 + 10 + 45) ÷ 1,024 = <strong>0.9453</strong>.</li>
        <li><strong>Quality control:</strong> 20 parts, each defective with probability 0.05. P(no defects) = 0.95²⁰ = <strong>0.3585</strong>; P(at least one) = 0.6415.</li>
        <li><strong>Dice:</strong> rolling a six at least twice in 6 rolls: 1 − P(0) − P(1) = 1 − 0.3349 − 0.4019 = <strong>0.2632</strong>.</li>
      </ul>

      <h2 id="which">Exactly, at most, at least: which one?</h2>
      <table>
        <thead><tr><th>Words in the question</th><th>Probability</th><th>Values of k counted</th></tr></thead>
        <tbody>
          <tr><td>exactly 3</td><td>P(X = 3)</td><td>3</td></tr>
          <tr><td>at most 3, no more than 3</td><td>P(X ≤ 3)</td><td>0, 1, 2, 3</td></tr>
          <tr><td>fewer than 3, less than 3</td><td>P(X &lt; 3)</td><td>0, 1, 2</td></tr>
          <tr><td>at least 3, 3 or more</td><td>P(X ≥ 3)</td><td>3 … n</td></tr>
          <tr><td>more than 3</td><td>P(X &gt; 3)</td><td>4 … n</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Tips for binomial word problems</h2>
      <ul>
        <li>Decide what counts as a &quot;success&quot; first; it doesn&apos;t have to be a good outcome (a defective part can be the success).</li>
        <li>Translate the words carefully: &quot;at least 3&quot; includes 3, &quot;more than 3&quot; doesn&apos;t.</li>
        <li>For &quot;at least one&quot;, use the complement: 1 − P(X = 0) = 1 − (1 − p)^n.</li>
        <li>Write p as a decimal: 1 in 6 is 0.1667, 35% is 0.35.</li>
        <li>Check the answer against the mean np: probabilities are largest near it.</li>
      </ul>

      <h2 id="conditions">When the binomial model applies</h2>
      <ul>
        <li>A fixed number of trials, decided in advance.</li>
        <li>Two outcomes per trial: success or failure.</li>
        <li>The same probability of success on every trial.</li>
        <li>Independent trials: one result doesn&apos;t change the next. Sampling without replacement from a small group breaks this; use the hypergeometric distribution.</li>
      </ul>
      <p>For draws without replacement use the <Link href="/hypergeometric-calculator/">hypergeometric calculator</Link>; for continuous data the <Link href="/normal-cdf-calculator/">normal CDF calculator</Link>. Measure spread with the <Link href="/standard-deviation-calculator/">standard deviation calculator</Link> or estimate a proportion with the <Link href="/confidence-interval-calculator/">confidence interval calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
