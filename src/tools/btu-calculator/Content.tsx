import Link from "next/link";

/** Brief + competitor findings: docs/research/btu-calculator.md · research/btu-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the BTU calculator</h2>
      <ol>
        <li>Enter the room&apos;s <strong>length and width</strong> (or its area). For an L-shaped room, add the areas of each rectangle.</li>
        <li>Choose the <strong>sun exposure</strong>, the number of <strong>people</strong> who regularly use the room and whether it&apos;s a <strong>kitchen</strong>.</li>
        <li>Read the recommended capacity in BTU per hour, tons and kilowatts, and see how each adjustment changed it.</li>
      </ol>

      <h2 id="formula">How the size is calculated</h2>
      <div className="formula">Capacity = chart BTU for the area × sun factor (0.9 shaded, 1.1 very sunny) + 600 × (people − 2) + 4,000 if a kitchen<br />Tons = BTU/h ÷ 12,000 · kW = BTU/h × 0.000293</div>

      <h2 id="chart">ENERGY STAR room AC sizing chart</h2>
      <table>
        <thead><tr><th>Area to cool (sq ft)</th><th>Capacity (BTU/h)</th></tr></thead>
        <tbody>
          {[["100 up to 150", "5,000"], ["150 up to 250", "6,000"], ["250 up to 300", "7,000"], ["300 up to 350", "8,000"], ["350 up to 400", "9,000"], ["400 up to 450", "10,000"], ["450 up to 550", "12,000"], ["550 up to 700", "14,000"], ["700 up to 1,000", "18,000"], ["1,000 up to 1,200", "21,000"], ["1,200 up to 1,400", "23,000"], ["1,400 up to 1,500", "24,000"], ["1,500 up to 2,000", "30,000"], ["2,000 up to 2,500", "34,000"]].map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}
        </tbody>
      </table>

      <h2 id="example">Worked example</h2>
      <p>A <strong>15 × 18 ft</strong> living room is 270 sq ft, so the chart gives <strong>7,000 BTU/h</strong>. It gets afternoon sun (+10% = 7,700) and three people use it regularly (+600), for <strong>8,300 BTU/h</strong>, about 0.69 tons. An 8,000 BTU unit is the closest common size.</p>

      <h2 id="tips">Getting the most from a room air conditioner</h2>
      <ul>
        <li><strong>Placement</strong>: install it in a shaded window if you can, away from lamps and TVs whose heat confuses the thermostat.</li>
        <li><strong>Efficiency</strong>: compare the CEER rating; ENERGY STAR certified units use less electricity for the same cooling.</li>
        <li><strong>Sealing</strong>: weather-strip around the unit and close blinds on sunny windows.</li>
      </ul>
      <p>Measure the room first with the <Link href="/square-footage-calculator/">square footage calculator</Link>. Running a new circuit for a large unit? Check the cable with the <Link href="/wire-size-calculator/">wire size calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
