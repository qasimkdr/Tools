import Link from "next/link";

/** Brief + competitor findings: docs/research/tip-calculator.md · research/tip-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the tip calculator</h2>
      <ol>
        <li>Enter the <strong>bill total</strong> from the receipt. To tip on the pre-tax amount, also enter the tax shown on the receipt.</li>
        <li>Pick a tip percentage (or type your own) and the number of people paying.</li>
        <li>Optionally round the tip, the total or each person&apos;s share up to the next dollar.</li>
        <li>Already paid? Switch to <strong>Find the % I tipped</strong> and enter what you paid.</li>
      </ol>

      <h2 id="formulas">Tip formulas</h2>
      <div className="formula">Tip = bill × tip % ÷ 100 (use the bill before tax to tip pre-tax)<br />Total = bill + tip<br />Per person = total ÷ people<br />Tip % you paid = (amount paid − bill) ÷ bill before tax × 100</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>15% of $80:</strong> $80 × 0.15 = <strong>$12.00</strong>, so the total is <strong>$92.00</strong>.</li>
        <li><strong>18% of $80:</strong> $80 × 0.18 = <strong>$14.40</strong>, total <strong>$94.40</strong>; split 2 ways, $47.20 each.</li>
        <li><strong>Pre-tax tip:</strong> a $108 receipt that includes $8 tax. 20% of $100 = <strong>$20</strong> (20% of the full $108 would be $21.60).</li>
        <li><strong>What did I tip?</strong> You paid $60 on a $50 bill: ($60 − $50) ÷ $50 = <strong>20%</strong>.</li>
      </ul>

      <h2 id="mental-math">How to calculate a tip in your head</h2>
      <ul>
        <li><strong>10%:</strong> move the decimal point one place left. $46.80 → $4.68.</li>
        <li><strong>20%:</strong> double the 10% amount. $4.68 × 2 = $9.36.</li>
        <li><strong>15%:</strong> 10% plus half of it. $4.68 + $2.34 = $7.02.</li>
        <li><strong>18%:</strong> 20% minus 2% (a fifth of 10%). $9.36 − $0.94 = $8.42.</li>
      </ul>

      <h2 id="how-much">How much should you tip?</h2>
      <p>US etiquette guidance from the Emily Post Institute suggests:</p>
      <ul>
        <li><strong>Sit-down restaurant service:</strong> 15–20% of the bill before tax.</li>
        <li><strong>Buffet service:</strong> 10% before tax.</li>
      </ul>
      <p>These are suggestions, not rules: tip more for great service or larger groups, and check whether a service charge or automatic gratuity is already on the bill so you don&apos;t tip twice. Customs differ by country, and in many places service is included.</p>
      <p>Splitting a bill by what each person ordered? Use the <Link href="/split-calculator/">split calculator</Link>. Work out any other percentage with the <Link href="/percent-calculator/">percent calculator</Link>, or check a sale price with the <Link href="/discount-calculator/">discount calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
