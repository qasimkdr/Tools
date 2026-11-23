import Link from "next/link";

/** Brief + competitor findings: docs/research/arv-calculator.md · research/arv-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the ARV calculator</h2>
      <ol>
        <li>Enter recent <strong>comparable sales</strong> (sale price and square feet, one per line) and the subject&apos;s size to estimate ARV, or type the ARV if you already have an appraisal or agent opinion.</li>
        <li>Enter the <strong>repair budget</strong>, the rule percentage (70% by default) and any wholesale fee to get the <strong>maximum allowable offer</strong>.</li>
        <li>Add holding and selling costs (and your purchase price if you have one) to see the projected profit and return.</li>
      </ol>

      <h2 id="formulas">ARV and 70% rule formulas</h2>
      <div className="formula">ARV = average comp price per sq ft × subject sq ft<br />Maximum allowable offer = ARV × 70% − repairs − wholesale fee<br />Profit = ARV − purchase − repairs − holding costs − selling costs<br />Return = profit ÷ (purchase + repairs + holding costs)</div>

      <h2 id="example">Worked example</h2>
      <p>Comps: $245,000 for 1,650 sq ft ($148.48), $262,000 for 1,780 sq ft ($147.19) and $255,000 for 1,700 sq ft ($150.00). The average is <strong>$148.56 per sq ft</strong>, so a 1,750 sq ft house has an ARV of about <strong>$259,978</strong>.</p>
      <p>Using a round <strong>$300,000 ARV</strong> and <strong>$40,000</strong> of repairs: maximum offer = 0.70 × 300,000 − 40,000 = <strong>$170,000</strong>. Buying at that price with 6 months of $1,500 holding costs ($9,000) and 8% selling costs ($24,000) leaves a projected profit of <strong>$57,000</strong>, a 26% return on the $219,000 invested.</p>

      <h2 id="comps">Choosing good comps</h2>
      <ul>
        <li><strong>Recent</strong>: sold within the last 3–6 months where possible.</li>
        <li><strong>Close</strong>: same neighborhood or subdivision, ideally within half a mile.</li>
        <li><strong>Similar</strong>: size within about 20%, same bed/bath count and the finish level you plan to deliver.</li>
        <li><strong>Sold, not listed</strong>: asking prices aren&apos;t values; use closed sales.</li>
      </ul>
      <p>Measure the house with the <Link href="/square-footage-calculator/">square footage calculator</Link>, estimate financing with the <Link href="/mortgage-calculator/">mortgage calculator</Link>, or structure an owner-financed resale with the <Link href="/seller-financing-calculator/">seller financing calculator</Link>. More <Link href="/category/finance/">finance calculators</Link>.</p>
    </>
  );
}
