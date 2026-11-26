import Link from "next/link";

/** Brief + competitor findings: docs/research/cpm-calculator.md · research/cpm-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the CPM calculator</h2>
      <ol>
        <li>Choose what to find: the CPM, the total cost or the number of impressions.</li>
        <li>Enter the other two values. Add clicks to see the click-through rate and cost per click.</li>
        <li>Use the table to see how many impressions the same budget buys at other CPMs.</li>
      </ol>

      <h2 id="formulas">CPM formulas</h2>
      <div className="formula">CPM = cost ÷ impressions × 1,000<br />Cost = CPM × impressions ÷ 1,000<br />Impressions = cost ÷ CPM × 1,000<br />CTR = clicks ÷ impressions · CPC = cost ÷ clicks<br />CPM = CPC × CTR × 1,000</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>CPM:</strong> $500 spent for 250,000 impressions → 500 ÷ 250,000 × 1,000 = <strong>$2.00 CPM</strong>.</li>
        <li><strong>Clicks:</strong> those impressions brought 1,250 clicks → CTR = 1,250 ÷ 250,000 = <strong>0.50%</strong>, CPC = $500 ÷ 1,250 = <strong>$0.40</strong>.</li>
        <li><strong>Budget:</strong> $1,000 at an $8 CPM buys 1,000 ÷ 8 × 1,000 = <strong>125,000 impressions</strong>.</li>
        <li><strong>Cost:</strong> 2 million impressions at a $5 CPM cost 5 × 2,000,000 ÷ 1,000 = <strong>$10,000</strong>.</li>
      </ul>

      <h2 id="models">CPM vs other pricing models</h2>
      <table>
        <thead><tr><th>Model</th><th>You pay for</th><th>Best when the goal is</th></tr></thead>
        <tbody>
          <tr><td>CPM</td><td>Every 1,000 impressions</td><td>Reach and brand awareness</td></tr>
          <tr><td>vCPM</td><td>1,000 viewable impressions</td><td>Awareness, paying only for ads that could be seen</td></tr>
          <tr><td>CPC</td><td>Each click</td><td>Traffic to a site or landing page</td></tr>
          <tr><td>CPA</td><td>Each conversion (sale, sign-up)</td><td>Direct response with clear conversion tracking</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Reading CPM the right way</h2>
      <ul>
        <li>A low CPM isn&apos;t automatically good: cheap impressions to the wrong audience can cost more per sale.</li>
        <li>Compare CPMs for the same platform, format and audience; video and niche B2B audiences usually cost more than broad display.</li>
        <li>Pair CPM with CTR and conversion rate to see the cost of what you actually want.</li>
      </ul>
      <p>Work out a change in percentage terms with the <Link href="/percent-calculator/">percent calculator</Link>, price products with the <Link href="/markup-calculator/">markup calculator</Link>, or compare and scale numbers with the <Link href="/ratio-calculator/">ratio calculator</Link> and <Link href="/proportion-calculator/">proportion calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
