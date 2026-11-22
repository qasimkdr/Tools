import Link from "next/link";

/** Brief + competitor findings: docs/research/density-altitude-calculator.md · research/density-altitude-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the density altitude calculator</h2>
      <ol>
        <li>Enter the <strong>field elevation</strong>, the <strong>outside air temperature</strong> and the <strong>altimeter setting</strong> from the METAR or ATIS.</li>
        <li>Add the <strong>dew point</strong> to include humidity, or leave it blank for a dry-air answer.</li>
        <li>Read the density altitude (rounded to the nearest 100 ft), plus pressure altitude, ISA temperature and deviation, and the quick rule-of-thumb result for comparison.</li>
      </ol>

      <h2 id="formula">Density altitude formulas</h2>
      <h3>Rule of thumb</h3>
      <div className="formula">Pressure altitude = elevation + 1,000 × (29.92 − altimeter)<br />ISA temperature (°C) = 15 − 2 × (pressure altitude ÷ 1,000)<br />Density altitude ≈ pressure altitude + 120 × (OAT − ISA)</div>
      <h3>National Weather Service method (used for the main result)</h3>
      <div className="formula">Vapor pressure e (hPa) = 6.11 × 10^(7.5 × Td ÷ (237.7 + Td))<br />Station pressure P (inHg) = altimeter × ((288 − 0.0065 × elevation m) ÷ 288)^5.2561<br />Virtual temperature Tv (K) = T ÷ (1 − 0.379 × e ÷ P)<br />Density altitude (ft) = 145,366 × (1 − (17.326 × P ÷ Tv in °R)^0.235)</div>
      <p>The virtual temperature is the temperature dry air would need to have the same density as the humid air, which is how the dew point enters the calculation.</p>

      <h2 id="example">Worked example</h2>
      <p>A field at <strong>5,000 ft</strong>, <strong>90 °F</strong> (32.2 °C), altimeter <strong>30.00 inHg</strong>, dew point 50 °F:</p>
      <ul>
        <li>Pressure altitude = 5,000 + 1,000 × (29.92 − 30.00) = <strong>4,920 ft</strong></li>
        <li>ISA temperature = 15 − 2 × 4.92 = 5.2 °C, so the air is <strong>27.1 °C warmer</strong> than standard</li>
        <li>Rule of thumb: 4,920 + 120 × 27.1 ≈ <strong>8,170 ft</strong></li>
        <li>NWS method with humidity: <strong>8,146 ft</strong>, reported as <strong>8,100 ft</strong> (8,000 ft for dry air)</li>
      </ul>
      <p>The aircraft will perform as if it were taking off from an airport more than 3,000 ft higher than the real one.</p>

      <h2 id="factors">What raises density altitude</h2>
      <table>
        <thead><tr><th>Factor</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td>Higher elevation</td><td>Lower pressure → higher density altitude</td></tr>
          <tr><td>Higher temperature</td><td>About 120 ft for every 1 °C above ISA</td></tr>
          <tr><td>Lower altimeter setting</td><td>About 1,000 ft for every 1 inHg below 29.92</td></tr>
          <tr><td>Higher humidity</td><td>Usually adds tens to a few hundred feet</td></tr>
        </tbody>
      </table>
      <p>Working with very large or small numbers? Try the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>. For gas and chemistry problems, see the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link>, or size cable runs with the <Link href="/wire-size-calculator/">wire size calculator</Link>. More <Link href="/category/science/">science and engineering calculators</Link>.</p>
    </>
  );
}
