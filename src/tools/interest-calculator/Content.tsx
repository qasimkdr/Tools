import Link from "next/link";

/** Brief + competitor findings: docs/research/interest-calculator.md · research/interest-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the interest calculator</h2>
      <ol>
        <li>Choose <strong>compound</strong> or <strong>simple</strong> interest.</li>
        <li>Enter the principal, annual rate and time in years and months. For compound interest, pick the compounding frequency and, if you like, a monthly contribution.</li>
        <li>Read the final balance, total interest and APY, and open the year-by-year table (or download it).</li>
      </ol>

      <h2 id="formulas">Interest formulas</h2>
      <div className="formula">Simple: I = P × r × t · A = P(1 + rt)<br />Compound: A = P(1 + r/n)^(nt) · Continuous: A = Pe^(rt)<br />Monthly deposits D: A += D × ((1 + i)^m − 1) ÷ i, with i the monthly rate and m the number of months</div>

      <h2 id="example">Worked example: $10,000 at 5% for 10 years</h2>
      <table>
        <thead><tr><th>Method</th><th>Balance</th><th>Interest</th></tr></thead>
        <tbody>
          <tr><td>Simple interest</td><td>$15,000.00</td><td>$5,000.00</td></tr>
          <tr><td>Compounded yearly</td><td>$16,288.95</td><td>$6,288.95</td></tr>
          <tr><td>Compounded monthly</td><td>$16,470.09</td><td>$6,470.09</td></tr>
          <tr><td>Compounded daily</td><td>$16,486.65</td><td>$6,486.65</td></tr>
          <tr><td>Monthly + $100/month deposits</td><td>$31,998.32</td><td>$9,998.32</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Making interest work for you (or against you)</h2>
      <ul>
        <li><strong>Start early</strong>: time matters more than anything else in compound growth.</li>
        <li><strong>Compare APYs</strong> on savings, and APRs on borrowing, so compounding is accounted for.</li>
        <li><strong>On debt, compounding works against you</strong>: paying more than the minimum cuts the interest you&apos;ll pay.</li>
      </ul>
      <p>For a fixed-term deposit use the <Link href="/cd-calculator/">CD calculator</Link>; for a savings account with regular deposits, the <Link href="/money-market-calculator/">money market calculator</Link>. To find the rate on a loan from its payment, use the <Link href="/interest-rate-calculator/">interest rate calculator</Link>, and for fees included, the <Link href="/apr-calculator/">APR calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
