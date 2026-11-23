import Link from "next/link";

/** Brief + competitor findings: docs/research/income-tax-calculator.md · research/income-tax-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the income tax calculator</h2>
      <ol>
        <li>Choose your <strong>filing status</strong> and enter your total income for 2026.</li>
        <li>Enter pre-tax deductions such as 401(k) and HSA contributions, then pick the standard deduction or enter your itemized total.</li>
        <li>Optionally add credits and the tax already withheld to see an estimated refund or amount owed.</li>
        <li>Read your taxable income, tax by bracket, and your marginal and effective rates.</li>
      </ol>

      <h2 id="formulas">How federal income tax is calculated</h2>
      <div className="formula">Adjusted gross income (AGI) = total income − pre-tax deductions and adjustments<br />Taxable income = AGI − standard or itemized deduction (− any other deductions)<br />Tax = sum over brackets of (income in each bracket × that bracket&apos;s rate) − credits<br />Effective rate = tax ÷ total income · Marginal rate = rate of your highest bracket</div>

      <h2 id="brackets">2026 federal tax brackets</h2>
      <p>These are the official tax-year 2026 rates from IRS Revenue Procedure 2025-32 (for returns filed in 2027). Each rate applies only to the income inside its band.</p>
      <div className="overflow-x-auto">
        <table>
          <thead><tr><th>Rate</th><th>Single</th><th>Married filing jointly</th><th>Head of household</th></tr></thead>
          <tbody>
            <tr><td>10%</td><td>$0–$12,400</td><td>$0–$24,800</td><td>$0–$17,700</td></tr>
            <tr><td>12%</td><td>$12,400–$50,400</td><td>$24,800–$100,800</td><td>$17,700–$67,450</td></tr>
            <tr><td>22%</td><td>$50,400–$105,700</td><td>$100,800–$211,400</td><td>$67,450–$105,700</td></tr>
            <tr><td>24%</td><td>$105,700–$201,775</td><td>$211,400–$403,550</td><td>$105,700–$201,750</td></tr>
            <tr><td>32%</td><td>$201,775–$256,225</td><td>$403,550–$512,450</td><td>$201,750–$256,200</td></tr>
            <tr><td>35%</td><td>$256,225–$640,600</td><td>$512,450–$768,700</td><td>$256,200–$640,600</td></tr>
            <tr><td>37%</td><td>over $640,600</td><td>over $768,700</td><td>over $640,600</td></tr>
          </tbody>
        </table>
      </div>
      <p>Married filing separately uses the single brackets up to $256,225, then 35% to $384,350 and 37% above. <strong>2026 standard deductions:</strong> $16,100 single or married filing separately, $32,200 married filing jointly, $24,150 head of household. Each spouse or filer who is 65 or older or blind adds $1,650 (married) or $2,050 (unmarried).</p>

      <h2 id="example">Worked example</h2>
      <p>A single filer earns <strong>$85,000</strong> and puts <strong>$5,000</strong> into a 401(k):</p>
      <ul>
        <li>AGI = $85,000 − $5,000 = $80,000. Taxable income = $80,000 − $16,100 = <strong>$63,900</strong>.</li>
        <li>Tax = 10% of $12,400 ($1,240) + 12% of $38,000 ($4,560) + 22% of $13,500 ($2,970) = <strong>$8,770</strong>.</li>
        <li>Marginal rate: <strong>22%</strong>. Effective rate: $8,770 ÷ $85,000 = <strong>10.32%</strong>.</li>
      </ul>

      <h2 id="marginal">Marginal vs effective tax rate</h2>
      <p>Moving into a higher bracket never makes your whole income taxed at the higher rate: only the dollars above the threshold are. That is why the effective rate (10.32% above) is far below the marginal rate (22%). A $1,000 raise in the 22% bracket adds $220 of federal income tax.</p>
      <ul>
        <li><strong>Standard or itemized?</strong> Itemize only if your deductible expenses (mortgage interest, state and local taxes, charitable gifts…) exceed your standard deduction.</li>
        <li><strong>Credits beat deductions:</strong> a $1,000 credit cuts tax by $1,000; a $1,000 deduction saves $1,000 × your marginal rate.</li>
        <li>The One Big Beautiful Bill Act also added other deductions, such as a deduction for seniors; if you qualify, enter it under other deductions.</li>
      </ul>
      <p>See your take-home pay after FICA with the <Link href="/paycheck-calculator/">paycheck calculator</Link>, work out your MAGI with the <Link href="/modified-adjusted-gross-income-calculator/">MAGI calculator</Link>, plan pre-tax savings with the <Link href="/401k-calculator/">401(k) calculator</Link>, or check what a raise adds with the <Link href="/pay-raise-calculator/">pay raise calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
