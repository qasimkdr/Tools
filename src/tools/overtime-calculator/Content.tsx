import Link from "next/link";

/** Brief + competitor findings: docs/research/overtime-calculator.md · research/overtime-calculator/report.md (YMYL: pay) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the overtime calculator</h2>
      <ol>
        <li><strong>Enter your regular hourly rate.</strong></li>
        <li><strong>Choose how to enter hours</strong>: a weekly total (with your own threshold and multiplier) or day by day, which applies federal or California rules automatically.</li>
        <li><strong>Read the result</strong>: regular pay, overtime pay, any double time, and the total gross pay for the week.</li>
      </ol>
      <p>Adding up a timesheet first? The <Link href="/hours-calculator/">hours calculator</Link> totals clock-in and clock-out times, including breaks.</p>

      <h2 id="formula">Overtime pay formula</h2>
      <div className="formula">Overtime rate = regular rate × 1.5   (double time = rate × 2)<br />Regular pay = regular hours × rate<br />Overtime pay = overtime hours × rate × 1.5<br />Total gross pay = regular pay + overtime pay + double-time pay</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Situation ($20/hour)</th><th>Hours</th><th>Pay</th></tr></thead>
        <tbody>
          <tr><td>48 hours, federal rules</td><td>40 regular + 8 OT</td><td>$800 + $240 = <strong>$1,040</strong></td></tr>
          <tr><td>Three 12-hour shifts (36 h), federal</td><td>36 regular</td><td><strong>$720</strong></td></tr>
          <tr><td>Three 12-hour shifts (36 h), California</td><td>24 regular + 12 OT</td><td>$480 + $360 = <strong>$840</strong></td></tr>
          <tr><td>One 14-hour day, California</td><td>8 regular + 4 OT + 2 DT</td><td>$160 + $120 + $80 = <strong>$360</strong></td></tr>
        </tbody>
      </table>
      <p>The 12-hour-shift rows show why daily overtime matters: the same 36 hours pays $120 more under California&apos;s daily rule.</p>

      <h2 id="rules">Federal and state overtime rules</h2>
      <ul>
        <li><strong>Federal (FLSA):</strong> non-exempt employees get at least 1.5× their regular rate for hours over 40 in a workweek. Each 7-day workweek stands alone; two weeks can&apos;t be averaged. See the U.S. Department of Labor&apos;s{" "}
          <a href="https://www.dol.gov/agencies/whd/overtime" rel="noopener" target="_blank">overtime pay guidance</a>.</li>
        <li><strong>California:</strong> 1.5× after 8 hours in a day or 40 in a week, 2× after 12 hours in a day, and special rules for the seventh consecutive workday. See the California Labor Commissioner&apos;s{" "}
          <a href="https://www.dir.ca.gov/dlse/FAQ_Overtime.htm" rel="noopener" target="_blank">overtime FAQ</a>.</li>
        <li><strong>Other states</strong> such as Alaska, Nevada and Colorado have their own daily or extra rules. When federal and state law differ, the rule that pays the worker more applies.</li>
        <li><strong>Exempt employees:</strong> salaried workers paid at least $684 a week (the current federal level, restored by the Department of Labor in May 2026) who also meet the duties tests aren&apos;t owed overtime. Many states set higher salary levels.</li>
      </ul>

      <h2 id="regular-rate">What counts as your &quot;regular rate&quot;?</h2>
      <p>The regular rate isn&apos;t always just your base wage. Under federal law, most non-discretionary bonuses, shift differentials and commissions must be included, which raises the overtime rate. Discretionary bonuses, expense reimbursements and pay for time not worked (holidays, PTO) are generally left out. If your pay includes these extras, your real overtime rate may be higher than base × 1.5.</p>

      <h2 id="tax">Overtime and taxes</h2>
      <p>Overtime is ordinary wages: it&apos;s taxed at the same rates and appears on your W-2. For tax years 2025 through 2028, eligible workers can deduct the <strong>premium portion</strong> of FLSA-required overtime (the extra half of time and a half), up to $12,500 a year ($25,000 joint), reduced for incomes above $150,000 ($300,000 joint). The calculator shows this premium for the week. Overtime required only by state law, such as California daily overtime under 40 weekly hours, doesn&apos;t count. Details are on the IRS page{" "}
        <a href="https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction" rel="noopener" target="_blank">What to know about the No Tax on Overtime deduction</a>. To see your take-home pay after tax, use the <Link href="/paycheck-calculator/">paycheck calculator</Link>.</p>

      <h2 id="tips">Tips</h2>
      <ul>
        <li><strong>Check your pay stub</strong> against the calculator: overtime hours and rate should be listed separately.</li>
        <li><strong>Keep your own record of hours</strong>, including start and end times, in case of a dispute.</li>
        <li><strong>Saving the extra?</strong> See how overtime income could grow in a retirement account with the <Link href="/401k-calculator/">401(k) calculator</Link>.</li>
      </ul>
      <p className="text-sm">General information, not legal advice. Your employer&apos;s policies, union contract or state law may give you more. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
