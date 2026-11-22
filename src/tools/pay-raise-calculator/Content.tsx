import Link from "next/link";

/** Brief + competitor findings: docs/research/pay-raise-calculator.md · research/pay-raise-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the pay raise calculator</h2>
      <ol>
        <li>Choose what you know: the <strong>raise percentage</strong>, the <strong>raise in dollars</strong>, or your <strong>new pay</strong> (to find the percentage).</li>
        <li>Pick annual salary or hourly wage and enter your current pay.</li>
        <li>See your new pay by year, month, paycheck and week. Add the inflation rate to see whether your buying power went up, and project the raise over several years.</li>
      </ol>

      <h2 id="formula">Pay raise formulas</h2>
      <div className="formula">New pay = current pay × (1 + raise % ÷ 100)<br />Raise % = (new pay − current pay) ÷ current pay × 100<br />Annual pay (hourly) = wage × hours per week × 52<br />Real raise = (1 + raise) ÷ (1 + inflation) − 1</div>

      <h2 id="example">Worked example</h2>
      <p>A <strong>4% raise on a $60,000 salary</strong>:</p>
      <table>
        <thead><tr><th>Gross pay</th><th>Before</th><th>After</th><th>Increase</th></tr></thead>
        <tbody>
          <tr><td>Year</td><td>$60,000.00</td><td>$62,400.00</td><td>$2,400.00</td></tr>
          <tr><td>Month</td><td>$5,000.00</td><td>$5,200.00</td><td>$200.00</td></tr>
          <tr><td>Every 2 weeks</td><td>$2,307.69</td><td>$2,400.00</td><td>$92.31</td></tr>
          <tr><td>Hour (2,080 h)</td><td>$28.85</td><td>$30.00</td><td>$1.15</td></tr>
        </tbody>
      </table>
      <p>With 3% inflation, the real raise is 1.04 ÷ 1.03 − 1 = <strong>0.97%</strong>. Repeating a 4% raise for five years would take the salary to about <strong>$72,999</strong>, because each raise builds on the last.</p>

      <h2 id="negotiate">Before you ask for a raise</h2>
      <ul>
        <li><strong>Know your number</strong>: research pay for your role and location, then work out the percentage you&apos;re asking for.</li>
        <li><strong>Think in take-home pay</strong>: taxes take part of every raise, so check the net effect.</li>
        <li><strong>Compare offers fairly</strong>: convert hourly and salaried offers to the same yearly basis, including overtime and benefits.</li>
      </ul>
      <p>See what the raise means for your paycheck with the <Link href="/paycheck-calculator/">paycheck calculator</Link>, price extra hours with the <Link href="/overtime-calculator/">overtime calculator</Link>, or scale a part-time salary with the <Link href="/pro-rata-calculator/">pro rata calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
