import Link from "next/link";

/** Brief + competitor findings: docs/research/nm-to-ft-lb.md · research/nm-to-ft-lb/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the torque converter</h2>
      <ol>
        <li>Type the torque value and choose the unit you have.</li>
        <li>Choose the unit you want, or read every unit at once in the results.</li>
        <li>Use the chart for quick lookups. It switches to ft·lb → N·m when you convert from foot-pounds.</li>
      </ol>

      <h2 id="formulas">Torque conversion formulas</h2>
      <div className="formula">ft·lb = N·m × 0.737562 (= N·m ÷ 1.355818)<br />N·m = ft·lb × 1.355818<br />in·lb = N·m × 8.85075 = ft·lb × 12<br />N·m = kgf·m × 9.80665 = kgf·cm × 0.0980665</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>100 N·m</strong> = 100 × 0.737562 = <strong>73.76 ft·lb</strong>.</li>
        <li><strong>150 ft·lb</strong> = 150 × 1.355818 = <strong>203.37 N·m</strong>.</li>
        <li><strong>25 N·m</strong> = 25 × 8.85075 = <strong>221.27 in·lb</strong>.</li>
        <li><strong>10 kgf·m</strong> = 98.07 N·m = <strong>72.33 ft·lb</strong>.</li>
      </ul>

      <h2 id="units">Torque units compared</h2>
      <table>
        <thead><tr><th>Unit</th><th>In N·m</th><th>In ft·lb</th><th>Where you see it</th></tr></thead>
        <tbody>
          <tr><td>Newton-metre (N·m)</td><td>1</td><td>0.7376</td><td>SI unit; most car and bike manuals</td></tr>
          <tr><td>Foot-pound (ft·lb, lb·ft)</td><td>1.3558</td><td>1</td><td>US wrenches, wheel nuts, engine torque</td></tr>
          <tr><td>Inch-pound (in·lb)</td><td>0.1130</td><td>0.0833</td><td>Small fasteners, electronics, firearms</td></tr>
          <tr><td>Kilogram-force metre (kgf·m)</td><td>9.8067</td><td>7.2330</td><td>Older metric specs</td></tr>
          <tr><td>Kilogram-force centimetre (kgf·cm)</td><td>0.0981</td><td>0.0723</td><td>Small motors and servos</td></tr>
          <tr><td>Ounce-force inch (ozf·in)</td><td>0.00706</td><td>0.00521</td><td>Hobby motors and small instruments</td></tr>
        </tbody>
      </table>

      <h2 id="tips">Torque wrench tips</h2>
      <ul>
        <li>Always use the torque value and units from the manufacturer&apos;s manual for the exact part.</li>
        <li>Check whether a spec is for clean, dry threads or lubricated ones; lubrication changes the clamping force at the same torque.</li>
        <li>Click-type wrenches are most accurate in the middle of their range; use an in·lb wrench for small values.</li>
      </ul>
      <p>Turn torque and RPM into power with the <Link href="/horsepower-calculator/">horsepower calculator</Link>, estimate power from a drag run with the <Link href="/quarter-mile-calculator/">quarter mile calculator</Link>, compare wheel sizes with the <Link href="/tire-size-calculator/">tire size calculator</Link>, or mix two-stroke fuel with the <Link href="/50-to-1-gas-oil-mix-calculator/">50:1 gas oil mix calculator</Link>. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
