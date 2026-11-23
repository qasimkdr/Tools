import Link from "next/link";

/** Brief + competitor findings: docs/research/markup-calculator.md · research/markup-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the markup calculator</h2>
      <ol>
        <li>Enter your <strong>cost</strong> per unit.</li>
        <li>Choose what else you know: the <strong>markup %</strong> you want to add, the <strong>selling price</strong>, or the <strong>gross margin</strong> you want to earn.</li>
        <li>Read the price, markup, margin and profit. Add a quantity to see revenue and profit for a whole order, and use the table to convert any markup to margin.</li>
      </ol>

      <h2 id="formulas">Markup and margin formulas</h2>
      <div className="formula">Profit = price − cost<br />Markup = profit ÷ cost · Margin = profit ÷ price<br />Price = cost × (1 + markup) = cost ÷ (1 − margin)<br />Margin = markup ÷ (1 + markup) · Markup = margin ÷ (1 − margin)</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Cost $40, 50% markup</strong>: price = 40 × 1.5 = <strong>$60</strong>; profit $20; margin 20 ÷ 60 = <strong>33.33%</strong>.</li>
        <li><strong>Cost $40, sells for $60</strong>: markup = 20 ÷ 40 = <strong>50%</strong>.</li>
        <li><strong>Cost $40, want a 30% margin</strong>: price = 40 ÷ 0.70 = <strong>$57.14</strong>, a 42.86% markup.</li>
        <li><strong>100 units</strong> at $60 with a $40 cost earn $2,000 gross profit.</li>
      </ul>

      <h2 id="mistakes">Common pricing mistakes</h2>
      <ul>
        <li><strong>Mixing up markup and margin</strong>: adding 30% to cost doesn&apos;t give a 30% margin; it gives 23.1%.</li>
        <li><strong>Forgetting overhead</strong>: gross margin must also cover rent, wages, shipping and payment fees.</li>
        <li><strong>Discounting from a thin margin</strong>: a 20% sale on a 25% margin item leaves almost no profit; check with the <Link href="/discount-calculator/">discount calculator</Link>.</li>
      </ul>
      <p>Comparing prices or rates? Try the <Link href="/ratio-calculator/">ratio calculator</Link>, measure output per hour with the <Link href="/productivity-calculator/">productivity calculator</Link>, or plan wage costs with the <Link href="/pay-raise-calculator/">pay raise calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
