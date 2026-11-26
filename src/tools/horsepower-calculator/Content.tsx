import Link from "next/link";

/** Brief + competitor findings: docs/research/horsepower-calculator.md · research/horsepower-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the horsepower calculator</h2>
      <ol>
        <li>Pick a mode: <strong>Torque and RPM</strong> for engines and motors, <strong>Convert units</strong> for hp, kW, PS and watts, or <strong>Work and time</strong> for lifting and moving loads.</li>
        <li>Enter the values. In torque mode you can solve for horsepower or for torque, in lb-ft or N·m.</li>
        <li>Read the result in every unit at once, plus a table of how power or torque changes with engine speed.</li>
      </ol>

      <h2 id="formulas">Horsepower formulas</h2>
      <div className="formula">hp = torque (lb-ft) × RPM ÷ 5,252<br />Torque (lb-ft) = hp × 5,252 ÷ RPM<br />kW = torque (N·m) × RPM ÷ 9,549<br />hp = force (lb) × distance (ft) ÷ time (s) ÷ 550<br />1 hp = 550 ft·lbf/s = 745.7 W · 1 PS = 735.5 W · 1 electric hp = 746 W</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Engine:</strong> 300 lb-ft at 5,000 RPM → 300 × 5,000 ÷ 5,252 = <strong>285.6 hp</strong>, or 285.6 × 0.7457 = 213.0 kW.</li>
        <li><strong>Torque from power:</strong> 400 hp at 6,000 RPM → 400 × 5,252 ÷ 6,000 = <strong>350.1 lb-ft</strong> (474.7 N·m).</li>
        <li><strong>Units:</strong> 100 hp = 74.57 kW = <strong>101.4 PS</strong>.</li>
        <li><strong>Lifting:</strong> 150 lb raised 10 ft in 2 s → 1,500 ÷ 2 ÷ 550 = <strong>1.36 hp</strong>.</li>
      </ul>

      <h2 id="units">Horsepower units compared</h2>
      <table>
        <thead><tr><th>Unit</th><th>Definition</th><th>Watts</th><th>Where it&apos;s used</th></tr></thead>
        <tbody>
          <tr><td>Mechanical hp</td><td>550 ft·lbf per second</td><td>745.7</td><td>US and UK car and engine ratings</td></tr>
          <tr><td>Metric hp (PS, CV)</td><td>75 kgf·m per second</td><td>735.5</td><td>Europe and Japan</td></tr>
          <tr><td>Electric hp</td><td>Defined as 746 W</td><td>746</td><td>Electric motor nameplates</td></tr>
          <tr><td>Kilowatt (kW)</td><td>SI unit of power</td><td>1,000</td><td>Official specifications worldwide</td></tr>
        </tbody>
      </table>

      <h2 id="torque-vs-hp">Torque vs horsepower</h2>
      <p>Torque is the twisting force an engine produces; horsepower is how fast it does work, torque multiplied by speed. That is why a diesel with high torque at low RPM and a small engine that revs high can make similar peak horsepower. Rated horsepower is usually measured at the crankshaft; power at the wheels is lower because of drivetrain losses.</p>
      <p>Estimate horsepower from a drag strip run with the <Link href="/quarter-mile-calculator/">quarter mile calculator</Link>, turn a motor&apos;s watts into current with the <Link href="/watts-to-amps-calculator/">watts to amps calculator</Link>, solve voltage and resistance with the <Link href="/ohms-law-calculator/">Ohm&apos;s law calculator</Link>, or size heating power with the <Link href="/btu-calculator/">BTU calculator</Link>. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
