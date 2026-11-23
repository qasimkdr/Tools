import Link from "next/link";

/** Brief + competitor findings: docs/research/tire-size-calculator.md · research/tire-size-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the tire size calculator</h2>
      <ol>
        <li>Enter your current tire size from the sidewall, such as <strong>225/65R17</strong>.</li>
        <li>To compare, enter the size you are considering. The calculator shows both sets of dimensions side by side, the diameter difference and the speedometer error.</li>
        <li>Change the speedometer reading to see your true speed at any indicated speed.</li>
      </ol>

      <h2 id="read">How to read a tire size</h2>
      <p>In <strong>P225/65R17</strong>: <strong>P</strong> is the tire type (P = passenger, LT = light truck), <strong>225</strong> is the section width in millimeters, <strong>65</strong> is the aspect ratio (the sidewall is 65% of the width), <strong>R</strong> means radial construction, and <strong>17</strong> is the wheel diameter in inches. Flotation sizes such as 33x12.50R15 give the overall diameter (33 in), width (12.50 in) and wheel size (15 in) directly.</p>

      <h2 id="formulas">Tire size formulas</h2>
      <div className="formula">Sidewall height = width (mm) × aspect ratio ÷ 100<br />Overall diameter (in) = wheel diameter + 2 × sidewall height ÷ 25.4<br />Circumference = π × diameter · Revolutions per mile = 63,360 ÷ circumference (in)<br />Actual speed = speedometer reading × new diameter ÷ original diameter</div>

      <h2 id="example">Worked example</h2>
      <p>Comparing <strong>225/65R17</strong> with <strong>235/65R17</strong>:</p>
      <ul>
        <li>225/65R17: sidewall 225 × 0.65 = 146.25 mm (5.76 in); diameter 17 + 2 × 5.76 = <strong>28.52 in</strong>; about <strong>707 revolutions per mile</strong>.</li>
        <li>235/65R17: sidewall 152.75 mm (6.01 in); diameter <strong>29.03 in</strong>.</li>
        <li>Difference: 29.03 ÷ 28.52 − 1 = <strong>+1.79%</strong>, inside the 3% guideline. At an indicated 60 mph you would actually be doing about <strong>61.1 mph</strong>, and the vehicle sits about 0.26 in higher.</li>
      </ul>

      <h2 id="three-percent">The 3% rule for changing tire size</h2>
      <p>A common rule of thumb, which came from tire makers&apos; plus-sizing advice, is to keep the new tire&apos;s overall diameter within about <strong>3%</strong> of the original. Bigger differences increase speedometer and odometer error, can upset ABS and stability-control calibration, and raise the risk of rubbing. It is a guideline, not a law, and it says nothing about load capacity: a replacement tire should never have a lower load index than the original equipment. NHTSA advises buying tires the same size as the originals or another size your vehicle&apos;s manufacturer recommends; you&apos;ll find the approved sizes on the door-jamb placard or in the owner&apos;s manual.</p>
      <ul>
        <li><strong>Plus sizing</strong> (for example 205/55R16 → 225/45R17) keeps the diameter similar by using a larger wheel with a lower-profile tire.</li>
        <li><strong>Wider tires</strong> may need wheels of a suitable width and enough clearance at full steering lock and suspension compression.</li>
        <li>After a big change, recalibrating the speedometer keeps your speed and mileage readings accurate.</li>
      </ul>
      <p>Work out any percentage change with the <Link href="/percent-calculator/">percent calculator</Link>, estimate a car&apos;s quarter-mile time and trap speed with the <Link href="/quarter-mile-calculator/">quarter mile calculator</Link>, or mix 2-stroke fuel with the <Link href="/50-to-1-gas-oil-mix-calculator/">50:1 gas oil mix calculator</Link>. More <Link href="/category/everyday/">everyday calculators</Link>.</p>
    </>
  );
}
