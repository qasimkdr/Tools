import Link from "next/link";

/** Brief + competitor findings: docs/research/credit-card-payoff-calculator.md (YMYL: finance) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the credit card payoff calculator</h2>
      <ol>
        <li><strong>Enter your balance and APR</strong> from your latest statement.</li>
        <li><strong>Choose a strategy</strong>: a fixed monthly payment, a target payoff date, or minimum payments only.</li>
        <li><strong>Set your card&apos;s minimum payment rule</strong> (from your card agreement) to compare strategies side by side, including the 3-year plan shown on statements.</li>
      </ol>

      <h2 id="formula">How payoff is calculated</h2>
      <div className="formula">Each month: interest = balance × APR ÷ 12; new balance = balance + interest − payment<br />Payment to clear in n months = B × r ÷ (1 − (1 + r)⁻ⁿ)   (r = APR ÷ 12)<br />Typical minimum = greater of (1% × balance + interest) or a $25 floor</div>

      <h2 id="example">Example: $5,000 at 22% APR</h2>
      <table>
        <thead><tr><th>Strategy</th><th>Monthly payment</th><th>Time to pay off</th><th>Total interest</th></tr></thead>
        <tbody>
          <tr><td>Minimum (1% + interest, $25 floor)</td><td>$141.67 at first, then falling</td><td>about 19 years</td><td>$8,100</td></tr>
          <tr><td>Fixed $200</td><td>$200</td><td>34 months</td><td>$1,750</td></tr>
          <tr><td>3-year plan</td><td>$190.95</td><td>36 months</td><td>$1,874</td></tr>
          <tr><td>Fixed $300</td><td>$300</td><td>21 months</td><td>$1,022</td></tr>
        </tbody>
      </table>
      <p>Sticking with minimum payments costs over $6,000 more in interest than a fixed $200 a month. A card with a flat 2% minimum is even worse at this APR: the payment barely covers interest, and payoff would take decades.</p>

      <h2 id="strategies">Strategies that work</h2>
      <ul>
        <li><strong>Pay a fixed amount, not the minimum:</strong> keep paying your current minimum even as the required amount shrinks.</li>
        <li><strong>Avalanche:</strong> put extra money on the highest-APR card first to minimize interest.</li>
        <li><strong>Snowball:</strong> clear the smallest balance first for quick wins, then roll that payment into the next card.</li>
        <li><strong>Lower the rate:</strong> a 0% balance transfer or a lower-rate personal loan can help if the fees and the post-promo APR make sense. Compare the true cost with the <Link href="/apr-calculator/">APR calculator</Link>.</li>
        <li><strong>Stop adding new charges</strong> to the card you&apos;re paying down.</li>
      </ul>

      <h2 id="rights">Know your statement</h2>
      <p>The federal CARD Act requires a minimum payment warning on statements when you carry a balance, showing how long minimum payments would take and what it would cost, plus the payment needed to pay off the balance in three years. The CFPB publishes how issuers must{" "}
        <a href="https://www.consumerfinance.gov/rules-policy/regulations/1026/m1/" rel="noopener" target="_blank">estimate minimum-payment repayment times</a> (Regulation Z, Appendix M1).</p>

      <h2 id="related">Related calculators</h2>
      <ul>
        <li><strong>Consolidation loan:</strong> see the payment and total interest on a fixed loan with the <Link href="/payment-calculator/">payment calculator</Link>.</li>
        <li><strong>Budget for it:</strong> find your take-home pay with the <Link href="/paycheck-calculator/">paycheck calculator</Link>, then decide how much you can put toward the card.</li>
        <li><strong>Check a quoted rate</strong> from monthly payments with the <Link href="/interest-rate-calculator/">interest rate calculator</Link>.</li>
      </ul>
      <p className="text-sm">Estimates for planning only, not financial advice. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
