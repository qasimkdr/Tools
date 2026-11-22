import Link from "next/link";

/** Brief + competitor findings: docs/research/cylinder-volume-calculator.md · research/cylinder-volume-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the cylinder volume calculator</h2>
      <ol>
        <li><strong>Pick what you&apos;re measuring</strong>: a solid cylinder, a pipe or tube, or a tank that&apos;s only partly full.</li>
        <li><strong>Enter the diameter or radius and the height</strong>, each in any unit (inches, feet, yards, meters or centimeters).</li>
        <li><strong>Read the volume</strong> in cubic feet, US gallons, liters, cubic meters, cubic inches and cubic yards, plus the surface area.</li>
      </ol>

      <h2 id="formula">Cylinder volume formula</h2>
      <div className="formula">V = π × r² × h   (r = radius, h = height)<br />With diameter: V = π × d² × h ÷ 4<br />Hollow cylinder: V = π × (R² − r²) × h<br />Surface area = 2πr² + 2πrh</div>
      <p>The idea is simple: the base is a circle with area πr², and the cylinder is that circle stacked up to height h. Keep every length in the same unit, and the answer comes out in that unit cubed.</p>

      <h2 id="examples">Worked examples</h2>
      <h3>A water tank 4 ft across and 5 ft tall</h3>
      <div className="formula">r = 4 ÷ 2 = 2 ft  →  V = π × 2² × 5 = 62.83 ft³<br />62.83 × 7.48052 = 470.0 US gallons  ·  62.83 × 28.3168 = 1,779 liters</div>
      <h3>A can 10 cm across and 10 cm tall</h3>
      <p>r = 5 cm, so V = π × 25 × 10 = 785.4 cm³, which is <strong>0.785 liters</strong> (1,000 cm³ = 1 L).</p>
      <h3>The same tank lying on its side, filled 1 ft deep</h3>
      <p>Because the tank is round, 1 ft of liquid in a 4 ft tank is not a quarter full. The circular-segment formula gives 12.28 ft³, or <strong>91.9 gallons</strong>, just 19.6% of capacity.</p>

      <h2 id="units">Unit conversions</h2>
      <table>
        <thead><tr><th>1 cubic foot equals</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>US gallons</td><td>7.48052</td></tr>
          <tr><td>Liters</td><td>28.3168</td></tr>
          <tr><td>Cubic inches</td><td>1,728</td></tr>
          <tr><td>Cubic meters</td><td>0.0283168</td></tr>
          <tr><td>Cubic yards</td><td>0.037037 (1/27)</td></tr>
        </tbody>
      </table>
      <p>Other handy facts: 1 US gallon = 231 cubic inches, and 1 liter = 1,000 cubic centimeters.</p>

      <h2 id="uses">Common uses</h2>
      <ul>
        <li><strong>Concrete columns and sonotubes:</strong> find the volume in cubic feet, then convert to yards with the <Link href="/cubic-yard-calculator/">cubic yard calculator</Link>. Filling round holes with stone? The <Link href="/gravel-and-stone-calculator/">gravel calculator</Link> turns volume into tons.</li>
        <li><strong>Tanks, drums and pools:</strong> gallons and liters tell you how much water, fuel or chemical a container holds.</li>
        <li><strong>Pipes:</strong> the inside capacity tells you how much water sits in a run of pipe; the wall volume tells you how much material it&apos;s made of.</li>
        <li><strong>Working backward:</strong> to find the radius from a known volume, r = √(V ÷ (π × h)). The <Link href="/square-root-calculator/">square root calculator</Link> handles the last step.</li>
      </ul>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li><strong>Using the diameter as the radius</strong> makes the answer 4 times too large.</li>
        <li><strong>Mixing units</strong>, such as a diameter in inches with a height in feet, unless you convert first (this calculator does it for you).</li>
        <li><strong>Measuring the outside of a thick-walled tank</strong> when you want its capacity. Use the inside diameter.</li>
      </ul>
      <p>More <Link href="/category/math/">math calculators</Link>.</p>
    </>
  );
}
