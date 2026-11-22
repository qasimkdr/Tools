import Link from "next/link";

/** Brief + competitor findings: docs/research/weighted-mean-calculator.md · research/weighted-mean-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the weighted mean calculator</h2>
      <ol>
        <li>Type or paste your <strong>values</strong> in the first box and their <strong>weights</strong> in the second, in the same order.</li>
        <li>The table shows each product w × x and each item&apos;s share of the total weight.</li>
        <li>Read the weighted mean, the plain mean for comparison and the weighted standard deviation. Download the table as a CSV if you need it.</li>
      </ol>

      <h2 id="formula">Weighted mean formula</h2>
      <div className="formula">x̄w = Σ(wᵢ × xᵢ) ÷ Σwᵢ<br />Weighted SD = √( Σwᵢ(xᵢ − x̄w)² ÷ Σwᵢ )</div>

      <h2 id="example">Worked example: a course grade</h2>
      <table>
        <thead><tr><th>Component</th><th>Score (x)</th><th>Weight (w)</th><th>w × x</th></tr></thead>
        <tbody>
          <tr><td>Homework</td><td>90</td><td>20%</td><td>1,800</td></tr>
          <tr><td>Midterm</td><td>80</td><td>30%</td><td>2,400</td></tr>
          <tr><td>Final exam</td><td>70</td><td>50%</td><td>3,500</td></tr>
          <tr><td><strong>Total</strong></td><td></td><td>100</td><td>7,700</td></tr>
        </tbody>
      </table>
      <p>Weighted mean = 7,700 ÷ 100 = <strong>77</strong>. The unweighted mean of 90, 80 and 70 is 80; the weighted result is lower because the final exam carries half the weight. The weighted standard deviation is √((20 × 13² + 30 × 3² + 50 × 7²) ÷ 100) = √61 ≈ <strong>7.81</strong>.</p>

      <h2 id="uses">Where weighted averages are used</h2>
      <ul>
        <li><strong>Grades and GPA</strong>: category weights or credit hours.</li>
        <li><strong>Investing</strong>: portfolio returns weighted by the amount in each holding, or average cost per share.</li>
        <li><strong>Business</strong>: average price across products sold in different quantities, or weighted average cost of inventory.</li>
        <li><strong>Surveys and statistics</strong>: grouped data where the weight is how often each value occurs.</li>
      </ul>
      <p>For course grades with categories, the <Link href="/grade-calculator/">grade calculator</Link> handles it directly, and the <Link href="/gpa-calculator/">GPA calculator</Link> weights by credit hours. For spread in unweighted data, use the <Link href="/standard-deviation-calculator/">standard deviation calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
