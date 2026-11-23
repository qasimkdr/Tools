import Link from "next/link";

/** Brief + competitor findings: docs/research/vpd-calculator.md · research/vpd-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the VPD calculator</h2>
      <ol>
        <li>Enter the <strong>air temperature</strong> and <strong>relative humidity</strong> at canopy height.</li>
        <li>Set the <strong>leaf temperature offset</strong> (leaf minus air). Measure it with an infrared thermometer, or use −1 to −3 °C for healthy, transpiring leaves under LEDs.</li>
        <li>Choose the growth stage to compare your leaf VPD with its target range and see the humidity that would hit it. The chart shows VPD across common temperatures and humidities.</li>
      </ol>

      <h2 id="formula">VPD formulas</h2>
      <div className="formula">SVP(T) = 0.61078 × e^(17.27T ÷ (T + 237.3)) kPa (Tetens, T in °C)<br />Actual vapor pressure = SVP(air) × RH ÷ 100<br />Air VPD = SVP(air) − actual vapor pressure · Leaf VPD = SVP(leaf) − actual vapor pressure</div>

      <h2 id="example">Worked example</h2>
      <p>At <strong>25 °C</strong> and <strong>60% RH</strong>: SVP = 3.17 kPa and the actual vapor pressure is 1.90 kPa, so <strong>air VPD = 1.27 kPa</strong>. With leaves 2 °C cooler (23 °C), SVP(leaf) = 2.81 kPa, so <strong>leaf VPD = 0.91 kPa</strong>, right in the vegetative range. The dew point is about 16.7 °C.</p>

      <h2 id="stages">Target VPD by growth stage</h2>
      <table>
        <thead><tr><th>Stage</th><th>Leaf VPD</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Propagation / seedlings</td><td>0.4–0.8 kPa</td><td>Small roots; humid air limits water loss</td></tr>
          <tr><td>Vegetative</td><td>0.8–1.2 kPa</td><td>Steady transpiration drives nutrient uptake</td></tr>
          <tr><td>Flowering / fruiting</td><td>1.2–1.6 kPa</td><td>Drier air lowers mold and rot risk</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Tips for controlling VPD</h2>
      <ul>
        <li><strong>Measure at the canopy</strong>, not near the floor or the lights.</li>
        <li><strong>Watch lights-off</strong>: when lights go off, temperature drops and humidity jumps, which can cause condensation.</li>
        <li><strong>Size equipment</strong>: dehumidifiers and air conditioners work together; see the <Link href="/btu-calculator/">BTU calculator</Link> for cooling.</li>
      </ul>
      <p>For air density effects of temperature and humidity, see the <Link href="/density-altitude-calculator/">density altitude calculator</Link>. Preparing nutrient solutions? The <Link href="/molarity-calculator/">molarity calculator</Link> helps. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
