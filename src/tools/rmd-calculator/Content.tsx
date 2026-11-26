import Link from "next/link";

/** Brief + competitor findings: docs/research/rmd-calculator.md · research/rmd-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the RMD calculator</h2>
      <ol>
        <li>Enter the year you were born and the year you want the RMD for.</li>
        <li>Enter the account&apos;s balance on December 31 of the previous year (your statement shows it).</li>
        <li>Read this year&apos;s RMD, your starting age and deadline, and a year-by-year projection at the growth rate you choose. Download the projection as a CSV.</li>
      </ol>

      <h2 id="formula">RMD formula</h2>
      <div className="formula">RMD = account balance on December 31 of last year ÷ IRS distribution period for your age this year<br />Age = the age you reach by December 31 of the RMD year</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Age 74 in 2026</strong> (born 1952), balance $500,000 on December 31, 2025: divisor 25.5, so the RMD is 500,000 ÷ 25.5 = <strong>$19,607.84</strong>, due by December 31, 2026.</li>
        <li><strong>First RMD:</strong> born 1953, you turn 73 in 2026. Your first RMD is for 2026 and is due by <strong>April 1, 2027</strong>; the 2027 RMD is due by December 31, 2027.</li>
        <li><strong>Projection:</strong> if the $500,000 grows 5% a year after each withdrawal, the 2027 RMD (age 75, divisor 24.6) is about $20,505 and the 2028 RMD (age 76, divisor 23.7) about $21,439.</li>
      </ul>

      <h2 id="table">IRS Uniform Lifetime Table (selected ages)</h2>
      <table>
        <thead><tr><th>Age</th><th>Divisor</th><th>RMD per $100,000</th></tr></thead>
        <tbody>
          <tr><td>73</td><td>26.5</td><td>$3,774</td></tr>
          <tr><td>75</td><td>24.6</td><td>$4,065</td></tr>
          <tr><td>78</td><td>22.0</td><td>$4,545</td></tr>
          <tr><td>80</td><td>20.2</td><td>$4,950</td></tr>
          <tr><td>85</td><td>16.0</td><td>$6,250</td></tr>
          <tr><td>90</td><td>12.2</td><td>$8,197</td></tr>
          <tr><td>95</td><td>8.9</td><td>$11,236</td></tr>
          <tr><td>100</td><td>6.4</td><td>$15,625</td></tr>
        </tbody>
      </table>
      <p>Source: IRS Publication 590-B, Appendix B, Table III. The calculator uses every age from 72 to 120 and over.</p>

      <h2 id="start-age">RMD starting age by birth year</h2>
      <table>
        <thead><tr><th>Born</th><th>RMDs start at</th><th>First RMD due by</th></tr></thead>
        <tbody>
          <tr><td>July 1, 1949 – 1950</td><td>72</td><td>April 1 after turning 72</td></tr>
          <tr><td>1951 – 1959</td><td>73</td><td>April 1 after turning 73</td></tr>
          <tr><td>1960 or later</td><td>75</td><td>April 1 after turning 75</td></tr>
        </tbody>
      </table>
      <p>The SECURE 2.0 Act text can be read as giving people born in 1959 either age 73 or 75; the calculator uses 73, and final IRS guidance or a technical correction may change that.</p>

      <h2 id="rules">Rules and tips</h2>
      <ul>
        <li><strong>Which accounts:</strong> traditional, SEP and SIMPLE IRAs, and workplace plans such as 401(k), 403(b) and 457(b). Roth IRAs have no RMDs for the owner.</li>
        <li><strong>Several IRAs:</strong> calculate each one&apos;s RMD, then take the total from any of your IRAs. Each 401(k) generally pays its own RMD.</li>
        <li><strong>Still working:</strong> you may be able to delay RMDs from your current employer&apos;s plan until you retire, unless you own 5% or more of the company.</li>
        <li><strong>Inherited accounts</strong> follow different rules (the 10-year rule and single-life tables); this calculator is for your own accounts.</li>
        <li><strong>Your statement:</strong> if an RMD is due, your IRA custodian must report the amount to you, or offer to calculate it, by January 31, with the deadline for taking it.</li>
        <li><strong>Taxes:</strong> RMDs from pre-tax accounts are taxed as ordinary income; a qualified charitable distribution from an IRA can count toward the RMD.</li>
      </ul>
      <p>See how long savings last with the <Link href="/how-long-will-retirement-savings-last-calculator/">retirement savings calculator</Link>, project a 401(k) with the <Link href="/401k-calculator/">401(k) calculator</Link>, estimate the tax on a withdrawal with the <Link href="/income-tax-calculator/">income tax calculator</Link>, or compare cash yields with the <Link href="/money-market-calculator/">money market calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
