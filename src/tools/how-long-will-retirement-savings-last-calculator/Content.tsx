import Link from "next/link";

/** Brief + competitor findings: docs/research/how-long-will-retirement-savings-last-calculator.md · research/how-long-will-retirement-savings-last-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the calculator</h2>
      <ol>
        <li>Enter your <strong>retirement savings</strong> and the <strong>monthly amount</strong> you&apos;ll take from them (after Social Security or a pension).</li>
        <li>Enter an <strong>annual return</strong> and an <strong>inflation rate</strong>; withdrawals rise by inflation once a year.</li>
        <li>See how long the money lasts, the year-by-year balance, and the starting withdrawal that would last your target number of years.</li>
      </ol>

      <h2 id="formula">How it&apos;s calculated</h2>
      <div className="formula">Monthly return rm = (1 + annual return)^(1/12) − 1<br />Each month: balance = balance × (1 + rm) − withdrawal<br />Each year: withdrawal = withdrawal × (1 + inflation)<br />Savings last until the balance reaches zero</div>

      <h2 id="example">Worked example</h2>
      <p><strong>$500,000</strong> saved, withdrawing <strong>$3,000 a month</strong> (7.2% of savings in the first year), with a <strong>5%</strong> return and <strong>3%</strong> inflation: the money lasts <strong>16 years and 6 months</strong>. To make it last 30 years, the starting withdrawal would need to be about <strong>$1,858.69 a month</strong>. Under the 4% rule, the starting withdrawal would be $1,666.67 a month, which on these assumptions lasts nearly 35 years.</p>

      <h2 id="table">Withdrawal rate vs. how long $500,000 lasts</h2>
      <p className="text-sm subtle">5% return, 3% inflation, withdrawals rising yearly.</p>
      <table>
        <thead><tr><th>First-year withdrawal</th><th>Per month</th><th>Lasts about</th></tr></thead>
        <tbody>
          <tr><td>3%</td><td>$1,250</td><td>54 years 11 months</td></tr>
          <tr><td>4%</td><td>$1,667</td><td>34 years 11 months</td></tr>
          <tr><td>5%</td><td>$2,083</td><td>25 years 10 months</td></tr>
          <tr><td>6%</td><td>$2,500</td><td>20 years 7 months</td></tr>
          <tr><td>7.2%</td><td>$3,000</td><td>16 years 6 months</td></tr>
        </tbody>
      </table>

      <h2 id="stretch">Ways to make savings last longer</h2>
      <ul>
        <li><strong>Delay Social Security</strong> to increase the guaranteed monthly benefit.</li>
        <li><strong>Spend flexibly</strong>: cut back a little after a poor market year.</li>
        <li><strong>Keep fees low</strong>, since every percentage point of fees reduces your effective return.</li>
        <li><strong>Work part-time</strong> early in retirement to delay withdrawals.</li>
      </ul>
      <p>Still saving? Project your balance with the <Link href="/401k-calculator/">401(k) calculator</Link>, model growth with the <Link href="/interest-calculator/">compound interest calculator</Link>, or compare a cash reserve in the <Link href="/money-market-calculator/">money market calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
