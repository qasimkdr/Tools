import Link from "next/link";

/** Brief + competitor findings: docs/research/llc-tax-calculator.md · research/llc-tax-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the LLC tax calculator</h2>
      <ol>
        <li>Enter the LLC&apos;s <strong>net profit</strong> for the year (revenue minus business expenses) and your ownership share.</li>
        <li>Choose your filing status and add any other taxable income, such as a spouse&apos;s wages.</li>
        <li>Read your self-employment tax, income tax, effective rate and quarterly payment, then switch to <strong>With S-corp election</strong> to compare paying yourself a salary.</li>
      </ol>

      <h2 id="how-taxed">How an LLC is taxed</h2>
      <p>An LLC itself usually pays no federal income tax. The IRS treats a <strong>single-member LLC</strong> as a disregarded entity (profit goes on the owner&apos;s Schedule C) and a <strong>multi-member LLC</strong> as a partnership (each owner reports their share). Either kind can instead elect to be taxed as a corporation, including as an <strong>S corporation</strong>. By default, owners pay two federal taxes on their share of profit: self-employment tax and income tax.</p>

      <h2 id="formulas">LLC tax formulas (2026)</h2>
      <div className="formula">Net earnings from self-employment = profit × 92.35%<br />Self-employment tax = 12.4% (Social Security, on earnings up to $184,500) + 2.9% (Medicare, on all earnings)<br />Additional Medicare tax = 0.9% on earnings above $200,000 ($250,000 married filing jointly)<br />Taxable income = profit + other income − half of SE tax − standard deduction − QBI deduction (20%)<br />S-corp: 15.3% payroll tax on the salary only; remaining profit passes through without SE tax</div>
      <p>You owe self-employment tax when net earnings are $400 or more. The QBI deduction (up to 20% of qualified business income) is estimated in full when taxable income is at or below the 2026 threshold of $201,750 ($403,500 married filing jointly); above it, wage, property and service-business limits apply.</p>

      <h2 id="example">Worked example</h2>
      <p>A single owner of a single-member LLC with <strong>$90,000 profit</strong> in 2026 and no other income:</p>
      <ul>
        <li>Net earnings: $90,000 × 0.9235 = $83,115. Self-employment tax: 15.3% × $83,115 = <strong>$12,717</strong>.</li>
        <li>Income: $90,000 − $6,358 (half of SE tax) − $16,100 standard deduction = $67,542. QBI deduction: 20% × $67,542 = $13,508. Taxable income: <strong>$54,033</strong>.</li>
        <li>Income tax: $5,800 + 22% × ($54,033 − $50,400) = <strong>$6,599</strong>. Total federal tax: <strong>$19,316</strong> (21.5% of profit), or about $4,829 a quarter.</li>
        <li>With an S-corp and a <strong>$50,000 salary</strong>: payroll tax $7,650, income tax $8,537, total <strong>$16,187</strong>, about <strong>$3,129 less</strong>, before the cost of running payroll and filing a corporate return.</li>
      </ul>

      <h2 id="s-corp">When does an S-corp election make sense?</h2>
      <ul>
        <li><strong>Profit well above a reasonable salary.</strong> The saving comes from not paying 15.3% on profit above your salary; with low profit there is little to save.</li>
        <li><strong>The salary must be reasonable.</strong> The IRS requires S-corp owners who work in the business to pay themselves reasonable compensation and can treat distributions as wages if the salary is too low.</li>
        <li><strong>Extra costs:</strong> payroll processing, a separate business tax return (Form 1120-S) and, in some states, extra fees or taxes can eat into the saving.</li>
      </ul>
      <h2 id="quarterly">Paying quarterly estimated tax</h2>
      <p>LLC owners have no employer withholding, so they generally pay estimated tax four times a year (Form 1040-ES). Dividing the yearly estimate by four gives a starting figure for each payment.</p>
      <p>Check the brackets behind the income tax with the <Link href="/income-tax-calculator/">income tax calculator</Link>, compare with take-home pay from a job in the <Link href="/paycheck-calculator/">paycheck calculator</Link>, or work out your MAGI with the <Link href="/modified-adjusted-gross-income-calculator/">MAGI calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
