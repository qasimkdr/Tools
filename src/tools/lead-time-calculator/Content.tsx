import Link from "next/link";

/** Brief + competitor findings: docs/research/lead-time-calculator.md · research/lead-time-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the lead time calculator</h2>
      <ol>
        <li>Choose <strong>Delivery date</strong> (when will it arrive?) or <strong>Latest order date</strong> (when must I order?).</li>
        <li>Enter the order date or need-by date and the days for each stage. Leave unused stages at 0.</li>
        <li>Pick business or calendar days. Optionally add daily demand and safety stock to get a reorder point.</li>
      </ol>

      <h2 id="formula">Lead time formulas</h2>
      <div className="formula">Total lead time = processing + production + shipping + receiving<br />Delivery date = order date + lead time · Latest order date = need-by date − lead time<br />Reorder point = daily demand × lead time + safety stock</div>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>Delivery date</strong>: ordered Tuesday, December 1, 2026 with 2 + 5 + 4 + 1 = 12 business days → arrives <strong>Thursday, December 17, 2026</strong>.</li>
        <li><strong>Order-by date</strong>: needed by Friday, January 15, 2027, 12 business days, skipping Christmas and New Year&apos;s Day → order by <strong>Tuesday, December 29, 2026</strong>.</li>
        <li><strong>Reorder point</strong>: 20 units a day × 12 days + 50 safety stock = <strong>290 units</strong>.</li>
      </ul>

      <h2 id="types">Types of lead time</h2>
      <table>
        <thead><tr><th>Type</th><th>Measured from → to</th></tr></thead>
        <tbody>
          <tr><td>Customer lead time</td><td>Customer places order → receives it</td></tr>
          <tr><td>Supply (procurement) lead time</td><td>You order from a supplier → goods arrive</td></tr>
          <tr><td>Manufacturing lead time</td><td>Production order released → product finished</td></tr>
          <tr><td>Cumulative lead time</td><td>Longest path through all sub-components to the finished item</td></tr>
        </tbody>
      </table>
      <p>For a date a set number of days away, use the <Link href="/days-from-today/">days from today calculator</Link>; to count days between two dates, the <Link href="/date-difference-calculator/">date difference calculator</Link>. Measure team output with the <Link href="/productivity-calculator/">productivity calculator</Link>. More <Link href="/category/time-date/">date and time calculators</Link>.</p>
    </>
  );
}
