import Link from "next/link";

/** Brief + competitor findings: docs/research/ohms-law-calculator.md · research/ohms-law-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the Ohm&apos;s law calculator</h2>
      <ol>
        <li>Choose which two quantities you know: voltage (V), current (I), resistance (R) or power (P).</li>
        <li>Enter them in base units: volts, amps, ohms and watts (for example 0.02 A for 20 mA, 4700 Ω for 4.7 kΩ).</li>
        <li>Read the other two values, shown with SI prefixes (mA, kΩ…), plus the formula used.</li>
      </ol>

      <h2 id="formulas">Ohm&apos;s law and power formulas</h2>
      <table>
        <thead><tr><th>Find</th><th>Formulas</th></tr></thead>
        <tbody>
          <tr><td>Voltage V</td><td>I × R · P ÷ I · √(P × R)</td></tr>
          <tr><td>Current I</td><td>V ÷ R · P ÷ V · √(P ÷ R)</td></tr>
          <tr><td>Resistance R</td><td>V ÷ I · V² ÷ P · P ÷ I²</td></tr>
          <tr><td>Power P</td><td>V × I · I² × R · V² ÷ R</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>12 V across 8 Ω</strong>: I = 12 ÷ 8 = <strong>1.5 A</strong>; P = 12² ÷ 8 = <strong>18 W</strong>.</li>
        <li><strong>1,200 W heater on 120 V</strong>: I = 1,200 ÷ 120 = <strong>10 A</strong>; R = 120² ÷ 1,200 = 12 Ω.</li>
        <li><strong>LED resistor</strong>: 5 V supply, 2 V LED, 20 mA: R = 3 ÷ 0.02 = <strong>150 Ω</strong>, dissipating 3 × 0.02 = 0.06 W.</li>
      </ul>

      <h2 id="series-parallel">Resistors in series and parallel</h2>
      <p>Ohm&apos;s law works on a whole circuit once you combine resistances into one equivalent value:</p>
      <div className="formula">Series: R = R₁ + R₂ + R₃ + …<br />Parallel: 1 ÷ R = 1 ÷ R₁ + 1 ÷ R₂ + 1 ÷ R₃ + … (two resistors: R = R₁R₂ ÷ (R₁ + R₂))</div>
      <p>For example, 100 Ω and 220 Ω in series make 320 Ω, so a 9 V battery drives 9 ÷ 320 = 28.1 mA through both. The same two resistors in parallel make 100 × 220 ÷ 320 = 68.75 Ω, drawing 9 ÷ 68.75 = 131 mA in total. In series the current is the same through every part and the voltages add; in parallel the voltage is the same across every branch and the currents add.</p>

      <h2 id="units">Units and prefixes</h2>
      <table>
        <thead><tr><th>Quantity</th><th>Unit</th><th>Common prefixes</th></tr></thead>
        <tbody>
          <tr><td>Voltage</td><td>volt (V)</td><td>mV, kV</td></tr>
          <tr><td>Current</td><td>ampere (A)</td><td>µA, mA</td></tr>
          <tr><td>Resistance</td><td>ohm (Ω)</td><td>kΩ, MΩ</td></tr>
          <tr><td>Power</td><td>watt (W)</td><td>mW, kW</td></tr>
        </tbody>
      </table>
      <p>Sizing cable for a circuit? The <Link href="/wire-size-calculator/">wire size calculator</Link> covers ampacity and voltage drop. For very large or small values, use the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>. More <Link href="/category/science/">science and engineering calculators</Link>.</p>
    </>
  );
}
