import Link from "next/link";

/** Brief + competitor findings: docs/research/discount-calculator.md · research/discount-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the discount calculator</h2>
      <ul>
        <li><strong>Sale price:</strong> enter the price and a percent or dollar discount. Add an <em>extra</em> discount for &quot;take another 10% off sale items&quot; deals, and sales tax if you want the checkout total.</li>
        <li><strong>Original price:</strong> enter what you paid and the discount to find the price before the sale.</li>
        <li><strong>Discount %:</strong> enter the original and sale prices to see what percentage you actually saved.</li>
      </ul>
      <p>The table under the result shows the same price at common discounts (10% to 70% off), which is handy when you&apos;re comparing deals in a store.</p>

      <h2 id="formulas">Discount formulas</h2>
      <div className="formula">Sale price = Price × (1 − Discount ÷ 100)<br />Savings = Price − Sale price<br />Discount % = (Price − Sale price) ÷ Price × 100<br />Original price = Sale price ÷ (1 − Discount ÷ 100)</div>

      <h2 id="examples">Worked examples</h2>
      <h3>25% off $80</h3>
      <p>80 × 0.25 = $20 off, so you pay <strong>$60</strong>. Mental-math shortcut: 25% is a quarter, and a quarter of $80 is $20.</p>
      <h3>What percent off is $50 → $35?</h3>
      <p>(50 − 35) ÷ 50 = 0.30, which is <strong>30% off</strong>.</p>
      <h3>Find the original price</h3>
      <p>A jacket costs $45 after 25% off: 45 ÷ 0.75 = <strong>$60</strong>. A common mistake is adding 25% of $45 back on, which gives $56.25 and is wrong.</p>
      <h3>Stacked discounts: 20% + extra 10%</h3>
      <p>On a $100 item: $100 × 0.80 = $80, then $80 × 0.90 = <strong>$72</strong>. That&apos;s 28% off in total, not 30%, because the second discount comes off the already-reduced price.</p>
      <h3>Adding sales tax</h3>
      <p>A $60 sale price with 8% sales tax: 60 × 1.08 = <strong>$64.80</strong> at checkout.</p>

      <h2 id="mental-math">Quick mental math for discounts</h2>
      <table>
        <thead><tr><th>Discount</th><th>Shortcut</th><th>On $60</th></tr></thead>
        <tbody>
          <tr><td>10% off</td><td>Move the decimal one place left, then subtract</td><td>$6 off → $54</td></tr>
          <tr><td>20% off</td><td>Double the 10% figure</td><td>$12 off → $48</td></tr>
          <tr><td>25% off</td><td>Divide by 4</td><td>$15 off → $45</td></tr>
          <tr><td>50% off</td><td>Halve it</td><td>$30 off → $30</td></tr>
          <tr><td>15% off</td><td>10% + half of 10%</td><td>$9 off → $51</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Shopping tips</h2>
      <ul>
        <li><strong>Compare with the usual price, not the &quot;was&quot; price.</strong> An inflated list price makes a discount look bigger than the real saving.</li>
        <li><strong>Check unit prices.</strong> A bigger pack on sale isn&apos;t always cheaper per ounce. Compare two sizes with the <Link href="/proportion-calculator/">proportion calculator</Link>; for example, 12 oz for $4 vs 32 oz for $9.</li>
        <li><strong>Watch stacked offers.</strong> &quot;40% + 20% off&quot; is 52% off in total, not 60%.</li>
        <li><strong>Financing a big purchase?</strong> A discount can be wiped out by interest. Check the monthly cost with the <Link href="/payment-calculator/">payment calculator</Link>.</li>
      </ul>
      <p>Browse more <Link href="/category/finance/">money calculators</Link>.</p>
    </>
  );
}
