import Link from "next/link";

/** Brief + competitor findings: docs/research/modified-adjusted-gross-income-calculator.md (YMYL: taxes) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the MAGI calculator</h2>
      <ol>
        <li><strong>Pick what you need MAGI for</strong>: Roth IRA contributions, ACA Marketplace coverage or Medicare premiums. Each uses a different definition.</li>
        <li><strong>Enter your AGI</strong> from Form 1040, line 11, and fill in only the add-backs that apply to you; most people have few or none.</li>
        <li><strong>For a Roth IRA</strong>, choose your filing status and age to see how much you can contribute for 2026.</li>
      </ol>

      <h2 id="formula">MAGI formulas</h2>
      <table>
        <thead><tr><th>Purpose</th><th>MAGI = AGI plus…</th></tr></thead>
        <tbody>
          <tr><td>Roth IRA (Pub. 590-A)</td><td>traditional IRA deduction + student loan interest deduction + foreign earned income/housing exclusion + excluded savings bond interest + excluded adoption benefits − Roth conversion income</td></tr>
          <tr><td>ACA Marketplace</td><td>untaxed foreign income + non-taxable Social Security benefits + tax-exempt interest</td></tr>
          <tr><td>Medicare IRMAA</td><td>tax-exempt interest</td></tr>
        </tbody>
      </table>
      <p>See the IRS overview of{" "}
        <a href="https://www.irs.gov/credits-deductions/modified-adjusted-gross-income" rel="noopener" target="_blank">modified adjusted gross income</a> and HealthCare.gov&apos;s{" "}
        <a href="https://www.healthcare.gov/glossary/modified-adjusted-gross-income-magi/" rel="noopener" target="_blank">MAGI definition</a>.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>Roth IRA, single filer</h3>
      <div className="formula">AGI $158,000 + student loan interest deduction $2,500 = MAGI $160,500<br />Phase-out $153,000–$168,000  →  $7,500 × (168,000 − 160,500) ÷ 15,000 = $3,750</div>
      <h3>Roth IRA, married filing jointly</h3>
      <p>MAGI of $245,000 is inside the $242,000–$252,000 range: $7,500 × 7,000 ÷ 10,000 = <strong>$5,250</strong> each.</p>
      <h3>ACA Marketplace</h3>
      <p>AGI $40,000 + non-taxable Social Security $12,000 + tax-exempt interest $500 = <strong>MAGI $52,500</strong>.</p>

      <h2 id="limits">2026 Roth IRA limits</h2>
      <table>
        <thead><tr><th>Filing status</th><th>Full contribution if MAGI under</th><th>No contribution at or above</th></tr></thead>
        <tbody>
          <tr><td>Single, head of household</td><td>$153,000</td><td>$168,000</td></tr>
          <tr><td>Married filing jointly</td><td>$242,000</td><td>$252,000</td></tr>
          <tr><td>Married filing separately (lived with spouse)</td><td>—</td><td>$10,000</td></tr>
        </tbody>
      </table>
      <p>The 2026 IRA contribution limit is $7,500, plus a $1,100 catch-up at 50 or older (IRS,{" "}
        <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" rel="noopener" target="_blank">2026 limit announcement</a>).</p>

      <h2 id="lower">Ways to lower your MAGI</h2>
      <ul>
        <li><strong>Pre-tax workplace contributions:</strong> traditional 401(k) deferrals reduce AGI and therefore MAGI. Project the effect with the <Link href="/401k-calculator/">401(k) calculator</Link> and see the paycheck impact with the <Link href="/paycheck-calculator/">paycheck calculator</Link>.</li>
        <li><strong>HSA contributions:</strong> deductible contributions reduce AGI.</li>
        <li><strong>Over the Roth limit?</strong> Some people make non-deductible traditional IRA contributions and convert them; this has tax rules worth reviewing with a professional.</li>
      </ul>
      <p>Saving cash while you decide? Compare account growth with the <Link href="/money-market-calculator/">money market calculator</Link>.</p>
      <p className="text-sm">General information, not tax advice. Use the worksheet for the specific credit or deduction you&apos;re claiming, or ask a tax professional. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
