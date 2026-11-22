import Link from "next/link";

/** Brief + competitor findings: docs/research/paycheck-calculator.md · research/paycheck-calculator/report.md (YMYL: taxes) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the paycheck calculator</h2>
      <ol>
        <li><strong>Enter your hourly wage, regular hours and overtime hours</strong> for a typical week.</li>
        <li><strong>Pick how often you&apos;re paid</strong> and your filing status.</li>
        <li><strong>Add pre-tax deductions</strong> (401(k), health insurance) and your state&apos;s income tax rate.</li>
      </ol>
      <p>You&apos;ll get take-home pay per paycheck and per year, a line-by-line breakdown of every deduction, your federal tax bracket and what you really keep per hour worked.</p>

      <h2 id="formula">How take-home pay is calculated</h2>
      <div className="formula">Yearly gross = (wage × hours + wage × 1.5 × overtime hours) × 52<br />Taxable income = gross − pre-tax deductions − standard deduction<br />Net pay = gross − pre-tax deductions − federal tax − Social Security − Medicare − state tax<br />Per paycheck = net pay ÷ paychecks per year</div>

      <h2 id="example">Example: $25 an hour, paid every two weeks</h2>
      <table>
        <thead><tr><th>Single, 2026, no state tax</th><th>40 h/week</th><th>40 h + 5 h overtime</th></tr></thead>
        <tbody>
          <tr><td>Gross per paycheck</td><td>$2,000.00</td><td>$2,375.00</td></tr>
          <tr><td>Federal income tax</td><td>$156.15</td><td>$201.15</td></tr>
          <tr><td>Social Security (6.2%)</td><td>$124.00</td><td>$147.25</td></tr>
          <tr><td>Medicare (1.45%)</td><td>$29.00</td><td>$34.44</td></tr>
          <tr><td><strong>Take-home per paycheck</strong></td><td><strong>$1,690.85</strong></td><td><strong>$1,992.16</strong></td></tr>
          <tr><td>Take-home per year</td><td>$43,962</td><td>$51,796</td></tr>
        </tbody>
      </table>
      <p>With 5 overtime hours a week, the yearly overtime premium is $3,250 (the extra half on 260 hours). Under the 2025–2028 overtime deduction that could cut federal tax by about $390 when filing. With $100 to a 401(k), $50 of health insurance per paycheck and a 5% state tax, the 40-hour paycheck drops to $1,470.17. Married filing jointly on the same wage takes home $1,770.85.</p>

      <h2 id="brackets">2026 federal tax brackets</h2>
      <table>
        <thead><tr><th>Rate</th><th>Single (taxable income)</th><th>Married filing jointly</th></tr></thead>
        <tbody>
          <tr><td>10%</td><td>$0 – $12,400</td><td>$0 – $24,800</td></tr>
          <tr><td>12%</td><td>$12,401 – $50,400</td><td>$24,801 – $100,800</td></tr>
          <tr><td>22%</td><td>$50,401 – $105,700</td><td>$100,801 – $211,400</td></tr>
          <tr><td>24%</td><td>$105,701 – $201,775</td><td>$211,401 – $403,550</td></tr>
          <tr><td>32%</td><td>$201,776 – $256,225</td><td>$403,551 – $512,450</td></tr>
          <tr><td>35%</td><td>$256,226 – $640,600</td><td>$512,451 – $768,700</td></tr>
          <tr><td>37%</td><td>over $640,600</td><td>over $768,700</td></tr>
        </tbody>
      </table>
      <p>Standard deduction: $16,100 single, $32,200 joint. Source: IRS,{" "}
        <a href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" rel="noopener" target="_blank">tax inflation adjustments for tax year 2026</a>. Brackets are marginal: only the income inside each band is taxed at that rate, so a raise never lowers your take-home pay.</p>

      <h2 id="fica">Social Security and Medicare (FICA)</h2>
      <ul>
        <li><strong>Social Security:</strong> 6.2% of wages up to $184,500 in 2026, so at most $11,439 a year.</li>
        <li><strong>Medicare:</strong> 1.45% of all wages, plus 0.9% withheld on wages above $200,000 in a year.</li>
        <li><strong>Pre-tax effects:</strong> 401(k) deferrals still pay FICA; Section 125 health and FSA deductions don&apos;t.</li>
      </ul>

      <h2 id="state">State income tax</h2>
      <p>Nine states don&apos;t tax wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming. Elsewhere, rates and brackets vary widely, and some cities add their own tax. Enter your state&apos;s approximate effective rate for a quick estimate; your state revenue department has the exact tables.</p>

      <h2 id="more">Get more from your paycheck</h2>
      <ul>
        <li><strong>Working extra hours?</strong> See exactly how overtime is paid, including California&apos;s daily rules, with the <Link href="/overtime-calculator/">overtime calculator</Link>.</li>
        <li><strong>Tracking a timesheet:</strong> total your clock-in and clock-out times with the <Link href="/hours-calculator/">hours calculator</Link>.</li>
        <li><strong>Saving for retirement:</strong> a 401(k) contribution costs less than it looks because it lowers your income tax. Project the growth with the <Link href="/401k-calculator/">401(k) calculator</Link>.</li>
        <li><strong>Budgeting for a home:</strong> compare your take-home pay with a full monthly payment from the <Link href="/mortgage-calculator/">mortgage calculator</Link>.</li>
      </ul>
      <p className="text-sm">Estimates for general information, not tax advice. The IRS{" "}
        <a href="https://www.irs.gov/individuals/tax-withholding-estimator" rel="noopener" target="_blank">Tax Withholding Estimator</a> can help you set your W-4. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
