import Link from "next/link";

/** Brief + competitor findings: docs/research/cd-calculator.md · research/cd-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the CD calculator</h2>
      <ol>
        <li>Enter your <strong>deposit</strong>, the <strong>rate</strong> and the <strong>term</strong> in months or years.</li>
        <li>Say whether the rate is an <strong>APY</strong> (most U.S. banks advertise APY) or a nominal rate, and pick the compounding frequency.</li>
        <li>Optional: add your tax rate and the bank&apos;s early withdrawal penalty. Open the month-by-month table to see the balance grow, or download it.</li>
      </ol>

      <h2 id="formula">CD interest formulas</h2>
      <div className="formula">From a nominal rate: A = P × (1 + r ÷ n)^(n × t)<br />From an APY: A = P × (1 + APY)^t<br />APY = (1 + r ÷ n)^n − 1 · Interest = A − P</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>$10,000 for 18 months at 4.25% APY</strong>: 10,000 × 1.0425^1.5 = <strong>$10,644.23</strong>, so $644.23 interest.</li>
        <li><strong>$10,000 for 12 months at 4.50% APY</strong>: $10,450.00, or $450 interest.</li>
        <li><strong>$10,000 for 5 years at 4.00% APY</strong>: 10,000 × 1.04^5 = <strong>$12,166.53</strong>.</li>
        <li><strong>APR vs APY</strong>: 4.50% compounded monthly is (1 + 0.045 ÷ 12)^12 − 1 = 4.594% APY.</li>
      </ul>

      <h2 id="compare">CDs vs other savings options</h2>
      <table>
        <thead><tr><th>Account</th><th>Rate</th><th>Access to money</th></tr></thead>
        <tbody>
          <tr><td>CD / fixed deposit</td><td>Fixed for the term</td><td>Locked; penalty to withdraw early</td></tr>
          <tr><td>High-yield savings</td><td>Variable</td><td>Any time</td></tr>
          <tr><td>Money market account</td><td>Variable</td><td>Any time, sometimes with checks</td></tr>
        </tbody>
      </table>
      <p><strong>CD laddering</strong> splits your money across several terms (for example 1, 2, 3, 4 and 5 years) so part of it matures every year, balancing higher long-term rates with regular access.</p>
      <p>Compare with a flexible account using the <Link href="/money-market-calculator/">money market calculator</Link>, check the true cost of borrowing with the <Link href="/apr-calculator/">APR calculator</Link>, or plan retirement saving with the <Link href="/401k-calculator/">401(k) calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
