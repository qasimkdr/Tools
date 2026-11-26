import Link from "next/link";

/** Brief + competitor findings: docs/research/cap-rate-calculator.md · research/cap-rate-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the cap rate calculator</h2>
      <ol>
        <li>Enter the property&apos;s value or asking price.</li>
        <li>Enter the rent and other income, the vacancy rate and each operating expense, or switch to &quot;The NOI&quot; if you already know the net operating income.</li>
        <li>Read the cap rate and NOI, and set a target cap rate to see what price would hit it.</li>
      </ol>

      <h2 id="formulas">Cap rate formulas</h2>
      <div className="formula">Effective gross income = (rent + other income) × (1 − vacancy %)<br />NOI = effective gross income − operating expenses<br />Cap rate = NOI ÷ property value × 100<br />Value = NOI ÷ cap rate</div>

      <h2 id="example">Worked example</h2>
      <p>A $400,000 rental house renting for $3,200 a month:</p>
      <ul>
        <li>Gross rent = $3,200 × 12 = $38,400. Less 5% vacancy ($1,920) leaves <strong>$36,480</strong> collected.</li>
        <li>Expenses: taxes $4,800 + insurance $1,800 + repairs $2,400 + management 8% of $36,480 ($2,918) + other $1,000 = <strong>$12,918</strong>.</li>
        <li>NOI = $36,480 − $12,918 = <strong>$23,562</strong>.</li>
        <li>Cap rate = $23,562 ÷ $400,000 = <strong>5.89%</strong>.</li>
        <li>To buy at a 6.5% cap rate, the price would have to be $23,562 ÷ 0.065 = <strong>$362,486</strong>.</li>
      </ul>

      <h2 id="included">What counts as an operating expense?</h2>
      <table>
        <thead><tr><th>Include in NOI</th><th>Leave out of NOI</th></tr></thead>
        <tbody>
          <tr><td>Property taxes and insurance</td><td>Mortgage principal and interest</td></tr>
          <tr><td>Repairs, maintenance and cleaning</td><td>Depreciation</td></tr>
          <tr><td>Property management and leasing fees</td><td>Income tax</td></tr>
          <tr><td>Utilities, HOA dues, landscaping, pest control</td><td>Major one-off improvements (capital expenditures)</td></tr>
        </tbody>
      </table>
      <p>Many investors also set aside a yearly reserve for big items such as a roof or HVAC. Whether that goes into NOI varies; be consistent when you compare properties.</p>

      <h2 id="limits">Limits of cap rate</h2>
      <ul>
        <li>It is a one-year snapshot. It doesn&apos;t show rent growth, appreciation or a planned renovation.</li>
        <li>It ignores financing, so two buyers with different loans get the same cap rate but very different cash returns.</li>
        <li>It is only as good as the expense figures. Sellers&apos; numbers often leave out vacancy, management or repairs.</li>
      </ul>
      <p>Estimate a flip&apos;s after-repair value with the <Link href="/arv-calculator/">ARV calculator</Link>, work out the loan payment with the <Link href="/mortgage-calculator/">mortgage calculator</Link>, model owner financing with the <Link href="/seller-financing-calculator/">seller financing calculator</Link>, or value multi-year cash flows with the <Link href="/npv-calculator/">NPV calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
