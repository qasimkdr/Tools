import Link from "next/link";

/** Brief + competitor findings: docs/research/watt-hour-calculator.md · research/watt-hour-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the watt hour calculator</h2>
      <ol>
        <li><strong>Watts × hours:</strong> enter a device&apos;s power and hours of use (and your electricity price) to get Wh, kWh and cost.</li>
        <li><strong>Battery capacity:</strong> enter mAh or Ah and the voltage to get watt-hours, plus whether the battery can fly under FAA rules.</li>
        <li><strong>Runtime:</strong> enter a battery&apos;s watt-hours and a device&apos;s power to see how long it will run.</li>
      </ol>

      <h2 id="formulas">Watt-hour formulas</h2>
      <div className="formula">Wh = watts × hours · kWh = Wh ÷ 1,000<br />Battery Wh = volts × amp-hours = volts × mAh ÷ 1,000<br />Runtime (hours) = Wh × efficiency ÷ load watts<br />Cost = kWh × price per kWh · 1 Wh = 3,600 joules</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>Appliance:</strong> 60 W for 8 hours = <strong>480 Wh</strong> (0.48 kWh). At $0.15/kWh that costs $0.07 a day, $2.16 over 30 days.</li>
        <li><strong>Car battery:</strong> 12 V × 50 Ah = <strong>600 Wh</strong>. Powering a 60 W load, that is about <strong>10 hours</strong> before losses.</li>
        <li><strong>Power bank:</strong> 5,000 mAh × 3.7 V ÷ 1,000 = <strong>18.5 Wh</strong>, well under the FAA&apos;s 100 Wh carry-on limit.</li>
        <li><strong>Laptop battery:</strong> 15.4 V × 6,500 mAh ÷ 1,000 = 100.1 Wh, just over 100 Wh, so check with the airline.</li>
      </ul>

      <h2 id="faa">Flying with lithium-ion batteries (FAA)</h2>
      <table>
        <thead><tr><th>Battery size</th><th>Carry-on</th><th>Checked bag</th></tr></thead>
        <tbody>
          <tr><td>Up to 100 Wh</td><td>Allowed (spares must be in carry-on)</td><td>Installed in a device only; no spares</td></tr>
          <tr><td>101–160 Wh</td><td>With airline approval; up to 2 spares</td><td>Spares forbidden</td></tr>
          <tr><td>Over 160 Wh</td><td>Forbidden</td><td>Forbidden</td></tr>
        </tbody>
      </table>
      <p>Rules from the FAA&apos;s PackSafe guidance for US flights; other countries and individual airlines may be stricter. Many airlines also require devices in checked bags to be switched off and protected from damage.</p>

      <h2 id="tips">Tips</h2>
      <ul>
        <li>Device labels often show maximum power; a plug-in energy meter gives the real average.</li>
        <li>Power-bank capacity is quoted at the cell voltage (about 3.7 V), so you get less at 5 V USB after conversion losses.</li>
        <li>Lead-acid batteries last longer if you don&apos;t regularly drain them far below half charge, so plan for less than full capacity.</li>
      </ul>
      <p>Turn watts into amps with the <Link href="/watts-to-amps-calculator/">watts to amps calculator</Link>, solve voltage and current with the <Link href="/ohms-law-calculator/">Ohm&apos;s law calculator</Link>, convert engine power with the <Link href="/horsepower-calculator/">horsepower calculator</Link>, or size heating and cooling with the <Link href="/btu-calculator/">BTU calculator</Link>. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
