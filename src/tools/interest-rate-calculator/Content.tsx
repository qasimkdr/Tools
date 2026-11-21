import Link from "next/link";

/** Brief + competitor findings: docs/research/interest-rate-calculator.md · research/interest-rate-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the interest rate calculator</h2>
      <ol>
        <li><strong>Choose loan or savings.</strong> Use <em>A loan</em> when you know the amount, payment and term. Use <em>Savings / investment</em> when you know a starting and ending balance.</li>
        <li><strong>Enter your numbers.</strong> For a loan, enter the amount you actually received, the monthly payment and the number of payments. For savings, enter both balances, the years between them and how often interest compounds.</li>
        <li><strong>Read the nominal and effective rates.</strong> The nominal rate is what lenders quote. The effective annual rate includes compounding and shows the real yearly cost or return.</li>
      </ol>

      <h2 id="how-it-works">How the rate is calculated</h2>
      <p>For a loan, the payment formula links four things: amount (P), periodic rate (r), number of payments (n) and payment:</p>
      <div className="formula">Payment = P × r ÷ (1 − (1 + r)<sup>−n</sup>)</div>
      <p>You can&apos;t rearrange this to isolate r, so the calculator searches numerically. It narrows the range until the formula reproduces your payment to a fraction of a cent, then multiplies the monthly rate by 12 to get the yearly nominal rate.</p>
      <p>For savings with no deposits or withdrawals, the rate comes straight from the compound-growth formula, where m is the number of compounding periods per year and t is years:</p>
      <div className="formula">rate = m × ((End ÷ Start)<sup>1/(m·t)</sup> − 1)</div>
      <p>The <strong>effective annual rate</strong> then adds the effect of compounding:</p>
      <div className="formula">EAR = (1 + rate ÷ m)<sup>m</sup> − 1</div>

      <h2 id="examples">Worked examples</h2>
      <h3>What rate is the dealer charging?</h3>
      <p>A car dealer offers <strong>$25,000 financed at $500 a month for 60 months</strong>. Entered as a loan, that&apos;s a nominal rate of <strong>7.42%</strong> (7.68% effective). Now you can compare it fairly against a bank or credit union quote.</p>
      <h3>Fees raise the real rate</h3>
      <p>A $20,000 loan at $386.66 a month for 60 months works out to exactly <strong>6.00%</strong>. If a $500 fee is taken out so you only receive $19,500, the same payments imply <strong>7.06%</strong>. That&apos;s why the APR, which includes fees, is higher than the note rate. Use the <Link href="/payment-calculator/">payment calculator</Link> to see how a different rate or term changes your monthly payment.</p>
      <h3>How fast did my savings grow?</h3>
      <p>$10,000 that grew to <strong>$12,000 in 3 years</strong> earned 6.09% compounded monthly, an effective <strong>6.27% a year</strong>.</p>

      <h2 id="nominal-vs-effective">Nominal vs effective rate: quick reference</h2>
      <table>
        <thead><tr><th>Nominal rate</th><th>Compounding</th><th>Effective annual rate</th></tr></thead>
        <tbody>
          <tr><td>5%</td><td>Quarterly</td><td>5.095%</td></tr>
          <tr><td>5%</td><td>Daily</td><td>5.127%</td></tr>
          <tr><td>6%</td><td>Monthly</td><td>6.168%</td></tr>
          <tr><td>12%</td><td>Monthly</td><td>12.683%</td></tr>
        </tbody>
      </table>
      <p>The more often interest compounds, the bigger the gap. Savings accounts usually advertise the effective rate as APY; loans advertise the APR.</p>

      <h2 id="apr">Interest rate, APR and APY</h2>
      <ul>
        <li><strong>Interest rate (nominal):</strong> the yearly rate used to calculate interest on the balance.</li>
        <li><strong>APR:</strong> the interest rate plus certain lender fees, expressed yearly. It&apos;s the standard way to compare loans. See the Consumer Financial Protection Bureau&apos;s explanation of{" "}
          <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/" rel="noopener" target="_blank">interest rate vs APR</a>.</li>
        <li><strong>APY / effective rate:</strong> the yearly return including compounding. It&apos;s the fair way to compare savings accounts and CDs.</li>
      </ul>

      <h2 id="tips">Tips</h2>
      <ul>
        <li>Compare loans by APR and savings by APY. Comparing an APR with a plain interest rate is misleading.</li>
        <li>Ask lenders for the total amount repaid. If it&apos;s much higher than payments × term suggests, there are fees or add-ons to question.</li>
        <li>For a savings goal, work out when it ends with <Link href="/months-from-today/12/">12 months from today</Link> or any other length, and browse more <Link href="/category/finance/">finance calculators</Link>.</li>
      </ul>
      <p className="text-sm">Results are estimates for fixed-rate loans and steady growth. Variable rates, irregular deposits and fees not reflected in the amount will change the true rate. Confirm figures with your lender or bank.</p>
    </>
  );
}
