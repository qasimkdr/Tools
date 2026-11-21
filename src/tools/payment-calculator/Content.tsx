import Link from "next/link";

/** Brief + competitor findings: docs/research/payment-calculator.md · research/payment-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the payment calculator</h2>
      <ol>
        <li><strong>Choose what to calculate.</strong> <em>Payment amount</em> finds the regular payment for a loan term. <em>Payoff time</em> finds how long a payment you choose takes to clear the loan.</li>
        <li><strong>Enter the loan amount and yearly interest rate.</strong> Use the interest rate from your loan offer, not the APR (more on that below).</li>
        <li><strong>Enter the term or your payment</strong>, and pick monthly, every-two-weeks or weekly payments.</li>
        <li><strong>Optionally add an extra payment</strong> to see how much interest you save and how much sooner you finish.</li>
      </ol>
      <p>Results update as you type. Download the full payment-by-payment schedule as a CSV for Excel or Google Sheets, or print it. The page address keeps your inputs, so you can bookmark or share a scenario.</p>

      <h2 id="formula">The loan payment formula</h2>
      <p>Fixed-rate loans such as car loans, personal loans and most mortgages use the standard amortization formula:</p>
      <div className="formula">Payment = P × r ÷ (1 − (1 + r)<sup>−n</sup>)<br />P = amount borrowed · r = yearly rate ÷ payments per year · n = total number of payments</div>
      <p>Each payment first covers the interest charged on the current balance; whatever is left reduces the balance. Because the balance shrinks every period, the interest part falls and the principal part grows, even though your payment never changes. That&apos;s why the schedule shows mostly interest in year one and mostly principal near the end.</p>
      <p>To solve for <strong>payoff time</strong> instead, the same formula is rearranged: n = −ln(1 − P × r ÷ payment) ÷ ln(1 + r). If the payment is smaller than one period&apos;s interest (P × r), the balance can never fall. The calculator tells you instead of returning a meaningless number.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Car loan: 5 years vs 6 years</h3>
      <p>Borrowing <strong>$30,000 at 7%</strong>:</p>
      <table>
        <thead><tr><th>Term</th><th>Monthly payment</th><th>Total interest</th></tr></thead>
        <tbody>
          <tr><td>60 months</td><td>$594.04</td><td>$5,642.16</td></tr>
          <tr><td>72 months</td><td>$511.47</td><td>$6,825.85</td></tr>
        </tbody>
      </table>
      <p>The longer term lowers the payment by about $83 a month but costs about $1,184 more in interest. If the 60-month payment fits your budget, it&apos;s the cheaper loan.</p>
      <h3>Personal loan: how long will $300 a month take?</h3>
      <p>For <strong>$10,000 at 12%</strong> with a $300 monthly payment, switch to <em>Payoff time</em>. It takes 41 payments, about 3 years and 5 months. For comparison, a 36-month term would need $332.14 a month.</p>
      <h3>The power of a small extra payment</h3>
      <p>A <strong>$20,000, 5-year loan at 6%</strong> costs $386.66 a month and $3,199.36 in interest. Adding <strong>$100 a month</strong> finishes 13 months early and saves about $755.</p>

      <h2 id="apr">Interest rate vs APR</h2>
      <p>Lenders quote two numbers. The <strong>interest rate</strong> is what&apos;s charged on the balance, and it&apos;s what this calculator needs to work out payments. The <strong>APR</strong> adds certain fees, such as origination charges, so it&apos;s usually a little higher and is the better number for comparing offers. The Consumer Financial Protection Bureau explains the difference in{" "}
        <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/" rel="noopener" target="_blank">its guide to loan rates and APR</a>.
        Only have a payment and a balance? Our <Link href="/interest-rate-calculator/">interest rate calculator</Link> works backwards to find the rate you&apos;re really paying.
      </p>

      <h2 id="tips">Tips before you borrow</h2>
      <ul>
        <li><strong>Compare total cost, not just the payment.</strong> A lower payment over a longer term almost always means more interest.</li>
        <li><strong>Check for prepayment penalties</strong> before planning extra payments; most car and personal loans don&apos;t have them, but some do.</li>
        <li><strong>Keep the payment affordable.</strong> Many lenders look at your debt-to-income ratio. You can work yours out with our <Link href="/ratio-calculator/">ratio calculator</Link> by comparing monthly debt payments to gross monthly income.</li>
        <li><strong>Know your end date.</strong> To see the calendar date a loan term ends, try <Link href="/months-from-today/24/">24 months from today</Link> or any other length.</li>
      </ul>

      <h2 id="limits">What this calculator doesn&apos;t include</h2>
      <p>Results cover principal and interest for fixed-rate, fully amortizing loans. Mortgage payments usually also include property tax, homeowners insurance and sometimes PMI or HOA dues. Variable-rate loans, interest-only periods and credit cards change over time, so treat those results as estimates and confirm figures with your lender. See more <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
