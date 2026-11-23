import Link from "next/link";

/** Brief + competitor findings: docs/research/watts-to-amps-calculator.md · research/watts-to-amps-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the watts to amps calculator</h2>
      <ol>
        <li>Choose <strong>watts → amps</strong> or <strong>amps → watts</strong>.</li>
        <li>Pick the circuit: <strong>DC</strong> (batteries, solar, cars), <strong>single-phase AC</strong> (most homes) or <strong>three-phase AC</strong> (commercial and industrial).</li>
        <li>Enter the voltage and, for AC, the power factor from the nameplate (use 1 for heaters and other resistive loads).</li>
      </ol>

      <h2 id="formulas">Watts and amps formulas</h2>
      <table>
        <thead><tr><th>Circuit</th><th>Amps</th><th>Watts</th></tr></thead>
        <tbody>
          <tr><td>DC</td><td>I = P ÷ V</td><td>P = V × I</td></tr>
          <tr><td>AC single-phase</td><td>I = P ÷ (PF × V)</td><td>P = PF × V × I</td></tr>
          <tr><td>AC three-phase (line to line)</td><td>I = P ÷ (√3 × PF × V)</td><td>P = √3 × PF × V × I</td></tr>
          <tr><td>AC three-phase (line to neutral)</td><td>I = P ÷ (3 × PF × V)</td><td>P = 3 × PF × V × I</td></tr>
        </tbody>
      </table>

      <h2 id="examples">Worked examples</h2>
      <ul>
        <li><strong>1,500 W heater at 120 V</strong> (PF 1): 1,500 ÷ 120 = <strong>12.5 A</strong>.</li>
        <li><strong>1,500 W load at 230 V, PF 0.9</strong>: 1,500 ÷ (0.9 × 230) = <strong>7.25 A</strong>.</li>
        <li><strong>15 kW three-phase motor at 400 V, PF 0.9</strong>: 15,000 ÷ (1.732 × 400 × 0.9) = <strong>24.06 A</strong>.</li>
        <li><strong>10 A at 120 V</strong>: 10 × 120 = <strong>1,200 W</strong>.</li>
      </ul>

      <h2 id="table">Amps for common wattages at 120 V and 240 V (PF 1)</h2>
      <table>
        <thead><tr><th>Watts</th><th>120 V</th><th>240 V</th></tr></thead>
        <tbody>{[100, 500, 1000, 1500, 2000, 3000, 5000].map((w) => <tr key={w}><td>{w.toLocaleString("en-US")} W</td><td>{+(w / 120).toFixed(2)} A</td><td>{+(w / 240).toFixed(2)} A</td></tr>)}</tbody>
      </table>
      <p>For resistance and the full Ohm&apos;s law set, use the <Link href="/ohms-law-calculator/">Ohm&apos;s law calculator</Link>; to choose cable for the current, the <Link href="/wire-size-calculator/">wire size calculator</Link>; and to size an air conditioner, the <Link href="/btu-calculator/">BTU calculator</Link>. More <Link href="/category/science/">science and engineering calculators</Link>.</p>
    </>
  );
}
