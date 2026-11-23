import Link from "next/link";

/** Brief + competitor findings: docs/research/time-off-calculator.md · research/time-off-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the time off calculator</h2>
      <ol>
        <li>Enter how much paid time off (PTO) you earn per year, in days or hours, and how long your workday is.</li>
        <li>Choose your pay frequency and usual weekly hours.</li>
        <li>To project ahead, enter your current balance, the pay periods until the date you care about, time off you&apos;ll take, and any balance cap.</li>
      </ol>

      <h2 id="formula">PTO accrual formulas</h2>
      <div className="formula">Accrual per pay period = yearly PTO hours ÷ pay periods per year<br />Accrual per hour worked = yearly PTO hours ÷ yearly hours worked<br />Future balance = current balance + accrual × periods − time off taken (up to the cap)</div>

      <h2 id="example">Worked example</h2>
      <p>You get <strong>15 days</strong> (120 hours) a year, paid <strong>every two weeks</strong>: 120 ÷ 26 = <strong>4.615 hours per paycheck</strong>, or about 1 hour for every 17.33 hours worked. With 24 hours banked, 13 more paychecks and a 16-hour long weekend planned, you&apos;ll have 24 + 60 − 16 = <strong>68 hours (8.5 days)</strong>.</p>

      <h2 id="table">Accrual per paycheck</h2>
      <table>
        <thead><tr><th>PTO per year</th><th>Weekly (52)</th><th>Biweekly (26)</th><th>Semi-monthly (24)</th><th>Monthly (12)</th></tr></thead>
        <tbody>
          {[10, 15, 20, 25].map((d) => <tr key={d}><td>{d} days ({d * 8} h)</td>{[52, 26, 24, 12].map((p) => <td key={p}>{(d * 8 / p).toFixed(2)} h</td>)}</tr>)}
        </tbody>
      </table>
      <p>Count hours on a timesheet with the <Link href="/hours-calculator/">hours calculator</Link>, check take-home pay with the <Link href="/paycheck-calculator/">paycheck calculator</Link>, or count the days until a vacation with the <Link href="/date-difference-calculator/">date difference calculator</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
