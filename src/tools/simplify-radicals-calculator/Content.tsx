import Link from "next/link";

/** Brief + competitor findings: docs/research/simplify-radicals-calculator.md · research/simplify-radicals-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the simplify radicals calculator</h2>
      <ol>
        <li>Choose the root (square, cube, 4th, or type any index up to 20).</li>
        <li>Enter the number under the root and, if there is one, the coefficient in front.</li>
        <li>Read the simplest radical form, the decimal value and the step-by-step prime factorization.</li>
      </ol>

      <h2 id="method">How to simplify radicals by hand</h2>
      <div className="formula">ⁿ√(a × bⁿ) = b × ⁿ√a<br />1. Prime-factorize the radicand · 2. Group identical factors in sets of n · 3. Move one factor per group outside · 4. Multiply</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>√72</strong>: 72 = 2³ × 3² → pairs 2² and 3² come out as 2 × 3 → <strong>6√2</strong> (≈ 8.485).</li>
        <li><strong>∛54</strong>: 54 = 2 × 3³ → 3 comes out → <strong>3∛2</strong> (≈ 3.780).</li>
        <li><strong>3√200</strong>: 200 = 2³ × 5² → 2 × 5 = 10 comes out → 3 × 10√2 = <strong>30√2</strong>.</li>
        <li><strong>∜1024</strong>: 1024 = 2¹⁰ → two groups of four come out as 2² = 4 → <strong>4∜4</strong>.</li>
        <li><strong>√30</strong>: 2 × 3 × 5, no pairs → already simplest.</li>
      </ul>

      <h2 id="table">Simplified square roots</h2>
      <table>
        <thead><tr><th>Root</th><th>Simplest form</th><th>Root</th><th>Simplest form</th></tr></thead>
        <tbody>
          <tr><td>√8</td><td>2√2</td><td>√48</td><td>4√3</td></tr>
          <tr><td>√12</td><td>2√3</td><td>√50</td><td>5√2</td></tr>
          <tr><td>√18</td><td>3√2</td><td>√75</td><td>5√3</td></tr>
          <tr><td>√20</td><td>2√5</td><td>√98</td><td>7√2</td></tr>
          <tr><td>√27</td><td>3√3</td><td>√128</td><td>8√2</td></tr>
          <tr><td>√32</td><td>4√2</td><td>√200</td><td>10√2</td></tr>
        </tbody>
      </table>
      <p>For decimal square roots and perfect squares, use the <Link href="/square-root-calculator/">square root calculator</Link>. Factoring helps with the <Link href="/gcf-calculator/">GCF calculator</Link> and <Link href="/fraction-calculator/">fraction calculator</Link> too. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
