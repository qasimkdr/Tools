import Link from "next/link";

/** Brief + competitor findings: docs/research/pro-rata-calculator.md · research/pro-rata-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the pro rata calculator</h2>
      <ul>
        <li><strong>Rent / bill by date:</strong> enter the monthly amount and the move-in or move-out date, then compare the three common day-count methods.</li>
        <li><strong>Any amount:</strong> prorate a fee, refund, bonus or subscription by the portion used or remaining.</li>
        <li><strong>Part-time salary:</strong> scale a full-time salary to your weekly hours, with monthly, weekly and hourly equivalents.</li>
      </ul>

      <h2 id="formula">Pro rata formulas</h2>
      <div className="formula">Pro rata amount = full amount × portion ÷ whole<br />Rent: daily rate × days occupied (daily rate = rent ÷ days in month, or rent × 12 ÷ 365, or rent ÷ 30)<br />Salary: full-time salary × your hours ÷ full-time hours</div>

      <h2 id="examples">Worked examples</h2>
      <h3>Moving in on February 20, 2027 ($1,500 rent)</h3>
      <table>
        <thead><tr><th>Method</th><th>Daily rate</th><th>9 days</th></tr></thead>
        <tbody>
          <tr><td>Days in month (28)</td><td>$53.57</td><td><strong>$482.14</strong></td></tr>
          <tr><td>365-day year</td><td>$49.32</td><td>$443.84</td></tr>
          <tr><td>30-day month</td><td>$50.00</td><td>$450.00</td></tr>
        </tbody>
      </table>
      <p>February is where the methods disagree most; in a 30-day month the first and third give the same answer.</p>
      <h3>Refund for unused time</h3>
      <p>A $1,200 annual membership cancelled with 245 days left: 1,200 × 245 ÷ 365 = <strong>$805.48</strong>.</p>
      <h3>Part-time salary</h3>
      <p>$30,000 full time at 37.5 hours, working 22.5 hours: 30,000 × 22.5 ÷ 37.5 = <strong>$18,000</strong> a year, or 0.6 FTE.</p>

      <h2 id="uses">Where pro rata is used</h2>
      <ul>
        <li><strong>Rent and utilities</strong> for partial months.</li>
        <li><strong>Subscriptions and insurance</strong>: credits or refunds when you change plans mid-cycle.</li>
        <li><strong>Pay and leave</strong>: part-time salaries, holiday entitlement, and pay for a partial first or last month.</li>
        <li><strong>Investing</strong>: pro rata rights let shareholders keep the same percentage in a new funding round.</li>
      </ul>
      <p>Pro rata is a proportion; for other proportional problems, see the <Link href="/proportion-calculator/">proportion calculator</Link> and the <Link href="/ratio-calculator/">ratio calculator</Link>. Counting days between dates? Use the <Link href="/days-from-today/">days from today calculator</Link>. For take-home pay on a pro rata salary, try the <Link href="/paycheck-calculator/">paycheck calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
