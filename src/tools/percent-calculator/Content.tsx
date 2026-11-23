import Link from "next/link";

/** Brief + competitor findings: docs/research/percent-calculator.md · research/percent-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the percent calculator</h2>
      <ol>
        <li>Pick the question you&apos;re answering, from &quot;X% of Y&quot; to percent change or difference.</li>
        <li>Enter the two numbers. The labels change to match the question.</li>
        <li>Read the answer with each step of the working, plus related figures such as the direction of a change or the amount added.</li>
      </ol>

      <h2 id="formulas">Percentage formulas</h2>
      <table>
        <thead><tr><th>Question</th><th>Formula</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>X% of Y</td><td>X ÷ 100 × Y</td><td>20% of 150 = 30</td></tr>
          <tr><td>X is what % of Y</td><td>X ÷ Y × 100</td><td>30 of 150 = 20%</td></tr>
          <tr><td>% change A → B</td><td>(B − A) ÷ |A| × 100</td><td>30 → 50 = +66.67%</td></tr>
          <tr><td>% difference</td><td>|A − B| ÷ ((A + B) ÷ 2) × 100</td><td>30 vs 50 = 50%</td></tr>
          <tr><td>X is Y% of what</td><td>X ÷ (Y ÷ 100)</td><td>30 is 20% of 150</td></tr>
          <tr><td>Increase/decrease by %</td><td>N × (1 ± % ÷ 100)</td><td>150 + 20% = 180</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Tip</strong>: 18% of a $64 bill = 0.18 × 64 = <strong>$11.52</strong>.</li>
        <li><strong>Test score</strong>: 42 out of 50 = 42 ÷ 50 × 100 = <strong>84%</strong>.</li>
        <li><strong>Price change</strong>: from $80 to $92 = (92 − 80) ÷ 80 × 100 = <strong>+15%</strong>.</li>
        <li><strong>Comparing two measurements</strong>: 98 and 102 differ by 4 ÷ 100 × 100 = <strong>4%</strong>.</li>
      </ul>

      <h2 id="mistakes">Common percentage mistakes</h2>
      <ul>
        <li><strong>Percent vs percentage points</strong>: a rate rising from 4% to 5% is a 1 percentage point rise but a 25% increase.</li>
        <li><strong>Ups and downs don&apos;t cancel</strong>: +50% then −50% leaves you at 75% of where you started.</li>
        <li><strong>Picking the wrong base</strong>: percent change always divides by the starting value.</li>
      </ul>
      <p>Shopping? The <Link href="/discount-calculator/">discount calculator</Link> handles percent off and stacked discounts. Pricing products? Use the <Link href="/markup-calculator/">markup calculator</Link>. For salary changes, see the <Link href="/pay-raise-calculator/">pay raise calculator</Link>, and for part-to-part comparisons the <Link href="/ratio-calculator/">ratio calculator</Link>. More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
