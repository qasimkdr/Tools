import Link from "next/link";

/** Brief + competitor findings: docs/research/seller-financing-calculator.md · research/seller-financing-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the seller financing calculator</h2>
      <ol>
        <li>Enter the <strong>sale price</strong> and <strong>down payment</strong> (as a percent or a dollar amount).</li>
        <li>Enter the agreed <strong>interest rate</strong> and the <strong>amortization period</strong> that sets the payment (often 15–30 years).</li>
        <li>Enter when the <strong>balloon</strong> is due (for example after 5 years), or 0 for a loan that pays off in full.</li>
        <li>Read the monthly payment, the balloon, the interest the seller earns, and the yearly schedule (or download every month as a CSV).</li>
      </ol>

      <h2 id="formula">Seller financing formulas</h2>
      <div className="formula">Amount financed L = price − down payment<br />Monthly payment = L × r ÷ (1 − (1 + r)^−n), r = annual rate ÷ 12, n = amortization months<br />Balloon = remaining balance after the balloon month<br />Seller interest = all payments + balloon − L</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>$250,000</strong> home with <strong>10% down</strong> ($25,000) financed by the seller at <strong>7%</strong>, amortized over <strong>30 years</strong> with a <strong>5-year balloon</strong>:</p>
      <ul>
        <li>Amount financed: $225,000</li>
        <li>Monthly payment: <strong>$1,496.93</strong> for 60 months</li>
        <li>Balloon due at month 60: <strong>$211,796.08</strong></li>
        <li>Interest earned by the seller over 5 years: <strong>$76,611.91</strong></li>
      </ul>
      <p>Because early payments are mostly interest, only about $13,200 of principal is repaid before the balloon, so the buyer needs a plan to refinance or sell.</p>

      <h2 id="pros-cons">Pros and cons</h2>
      <table>
        <thead><tr><th></th><th>Buyer</th><th>Seller</th></tr></thead>
        <tbody>
          <tr><td>Pros</td><td>Easier approval, flexible terms, faster closing</td><td>Interest income, larger pool of buyers, possible installment-sale tax treatment</td></tr>
          <tr><td>Cons</td><td>Often higher rate; balloon refinancing risk</td><td>Default and foreclosure risk; money tied up in the note</td></tr>
        </tbody>
      </table>
      <p>Compare with bank financing using the <Link href="/mortgage-calculator/">mortgage calculator</Link>, check any loan payment with the <Link href="/payment-calculator/">payment calculator</Link>, or work out a rate from a payment with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
