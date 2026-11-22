import Link from "next/link";

/** Brief + competitor findings: docs/research/apr-calculator.md · research/apr-calculator/report.md (YMYL: finance) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the APR calculator</h2>
      <ol>
        <li><strong>Enter the loan amount</strong>, the interest rate the lender quotes and the term.</li>
        <li><strong>Enter the fees</strong> charged for getting the loan: origination fees, points, application or underwriting fees.</li>
        <li><strong>Say whether fees are added to the loan or paid upfront</strong> (or deducted from what you receive), then read the APR, payment and total cost.</li>
      </ol>

      <h2 id="formula">How APR is calculated</h2>
      <div className="formula">Payment = B × r ÷ (1 − (1 + r)⁻ⁿ)   (B = amount borrowed incl. financed fees, r = rate ÷ 12)<br />APR = 12 × the monthly rate i that solves: amount received = Payment × (1 − (1 + i)⁻ⁿ) ÷ i</div>
      <p>In words: the APR is the interest rate you&apos;d be paying if the fees didn&apos;t exist and the same payments bought you only the money you actually got. That&apos;s how lenders in the US disclose APR for fixed-rate installment loans under the Truth in Lending Act.</p>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Loan</th><th>Rate</th><th>Fees</th><th>Payment</th><th>APR</th></tr></thead>
        <tbody>
          <tr><td>$20,000, 5 years</td><td>7%</td><td>$800 added to loan</td><td>$411.86</td><td><strong>8.659%</strong></td></tr>
          <tr><td>$20,000, 5 years</td><td>7%</td><td>$800 paid upfront</td><td>$396.02</td><td><strong>8.727%</strong></td></tr>
          <tr><td>$300,000 mortgage, 30 years</td><td>6.5%</td><td>$7,500 upfront (points + fees)</td><td>$1,896.20</td><td><strong>6.745%</strong></td></tr>
        </tbody>
      </table>
      <p>The same kind of fees raise a 5-year loan&apos;s APR by more than 1.6 points but a 30-year mortgage&apos;s by only about a quarter point, because the cost is spread over many more payments.</p>

      <h2 id="compare">Comparing loans with APR</h2>
      <ul>
        <li><strong>Compare APR to APR</strong>, for the same loan amount and term. Comparing one lender&apos;s APR with another&apos;s interest rate is misleading.</li>
        <li><strong>Keep the loan as long as assumed?</strong> APR spreads fees over the full term. If you&apos;ll pay off or refinance early, upfront fees cost you more than the APR suggests.</li>
        <li><strong>Check the total cost</strong>: the finance charge (interest + fees) is often the clearest number of all.</li>
        <li><strong>Variable-rate loans and credit cards</strong> have APRs that can change, so a calculation like this is only a snapshot.</li>
      </ul>
      <p>The Consumer Financial Protection Bureau explains the{" "}
        <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/" rel="noopener" target="_blank">difference between interest rate and APR</a>.</p>

      <h2 id="related">Related calculators</h2>
      <ul>
        <li><strong>Only know the payment?</strong> Work out the rate it implies with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>.</li>
        <li><strong>Plan the payment and payoff</strong> for any loan with the <Link href="/payment-calculator/">payment calculator</Link>.</li>
        <li><strong>Buying a home?</strong> The <Link href="/mortgage-calculator/">mortgage calculator</Link> adds taxes, insurance and PMI to the payment.</li>
      </ul>
      <p className="text-sm">Estimates for comparison only, not financial advice. Your lender&apos;s Loan Estimate or Truth in Lending disclosure shows the official APR. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
