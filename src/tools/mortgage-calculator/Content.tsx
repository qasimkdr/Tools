import Link from "next/link";

/** Brief + competitor findings: docs/research/mortgage-calculator.md · research/mortgage-calculator/report.md (YMYL: finance) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the mortgage calculator</h2>
      <ol>
        <li><strong>Enter the home price and down payment</strong>, as a percentage or a dollar amount.</li>
        <li><strong>Enter the interest rate and term</strong> (15, 20 or 30 years are most common).</li>
        <li><strong>Replace the example costs</strong> with your property tax rate, insurance quote, PMI rate (if you&apos;re putting down less than 20%) and any HOA dues.</li>
      </ol>
      <p>You&apos;ll see the full monthly payment split into its parts, the loan amount, total interest, when PMI can be removed, and a yearly amortization table you can download.</p>

      <h2 id="formula">How the payment is calculated</h2>
      <div className="formula">Principal & interest = L × r ÷ (1 − (1 + r)<sup>−n</sup>)   (L = loan, r = rate ÷ 12, n = months)<br />Monthly total = P&I + property tax ÷ 12 + insurance ÷ 12 + PMI + HOA<br />PMI (monthly) ≈ loan × PMI rate ÷ 12</div>

      <h2 id="example">Example: $400,000 home</h2>
      <table>
        <thead><tr><th></th><th>20% down ($80,000)</th><th>10% down ($40,000)</th></tr></thead>
        <tbody>
          <tr><td>Loan</td><td>$320,000</td><td>$360,000</td></tr>
          <tr><td>Principal & interest (6.5%, 30 yr)</td><td>$2,022.62</td><td>$2,275.44</td></tr>
          <tr><td>Property tax (1.1%/yr)</td><td>$366.67</td><td>$366.67</td></tr>
          <tr><td>Insurance ($1,500/yr)</td><td>$125.00</td><td>$125.00</td></tr>
          <tr><td>PMI (0.5%/yr)</td><td>none</td><td>$150.00</td></tr>
          <tr><td><strong>Monthly total</strong></td><td><strong>$2,514.28</strong></td><td><strong>$2,917.11</strong></td></tr>
        </tbody>
      </table>
      <p>With 10% down, the scheduled balance reaches 80% of the original value after 95 payments (when you can request PMI removal) and 78% after 109 payments (when it ends automatically), about $16,200 of PMI in total. Over 30 years, the 20%-down loan costs about $408,000 in interest; a 15-year term at the same rate would cut that to about $182,000, with a payment of $2,787.54.</p>

      <h2 id="pmi">When does PMI end?</h2>
      <p>For most conventional loans, the federal Homeowners Protection Act lets you <strong>request cancellation</strong> when your balance is scheduled to reach <strong>80%</strong> of the home&apos;s original value, and requires the servicer to <strong>end it automatically at 78%</strong> if you&apos;re current. Extra payments can get you to 80% sooner if you ask. See the Consumer Financial Protection Bureau&apos;s explanation:{" "}
        <a href="https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" rel="noopener" target="_blank">When can I remove PMI?</a>. FHA and other government-backed loans have their own mortgage insurance rules.</p>

      <h2 id="lower">Ways to lower your payment</h2>
      <ul>
        <li><strong>Bigger down payment:</strong> reduces the loan and can remove PMI entirely at 20%.</li>
        <li><strong>Shop the rate:</strong> on a $320,000 loan, each 0.5% lower rate saves roughly $100+ a month. Compare offers with the <Link href="/interest-rate-calculator/">interest rate calculator</Link> using each lender&apos;s APR.</li>
        <li><strong>Shop insurance and check tax exemptions:</strong> homestead exemptions can lower property tax in many areas.</li>
        <li><strong>Consider the term carefully:</strong> 30 years lowers the payment; 15 years saves far more interest.</li>
      </ul>

      <h2 id="afford">How much house can you afford?</h2>
      <p>A widely used guideline keeps total housing costs (the monthly total above) under about 28% of gross monthly income, and all debts under about 36%. Lenders may allow more, but a payment that fits your budget comfortably matters more than the maximum you can borrow. Comparing homes? Divide price by size for price per square foot with the <Link href="/square-footage-calculator/">square footage calculator</Link>. For car or personal loans, use the <Link href="/payment-calculator/">payment calculator</Link>.</p>
      <p className="text-sm">Estimates only, not financial advice. Taxes, insurance, PMI and rates vary by location, credit and lender; your Loan Estimate shows official figures. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
