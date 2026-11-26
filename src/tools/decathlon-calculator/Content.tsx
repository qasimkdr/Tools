import Link from "next/link";

/** Brief + competitor findings: docs/research/decathlon-calculator.md · research/decathlon-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the decathlon calculator</h2>
      <ol>
        <li>Choose the decathlon (10 events) or the heptathlon (7 events).</li>
        <li>Enter each mark: sprint times in seconds, the 1500 m or 800 m as minutes:seconds, jumps and throws in metres.</li>
        <li>Read the points for each event, the day totals and the overall score. The table below shows the marks needed for 700 to 1,000 points.</li>
      </ol>

      <h2 id="formula">Decathlon scoring formulas</h2>
      <div className="formula">Running events: points = A × (B − T)^C, T in seconds<br />Jumps: points = A × (M − B)^C, M in centimetres<br />Throws: points = A × (M − B)^C, M in metres<br />Points are rounded down; total = sum of all events</div>
      <table>
        <thead><tr><th>Decathlon event</th><th>A</th><th>B</th><th>C</th></tr></thead>
        <tbody>
          <tr><td>100 m</td><td>25.4347</td><td>18</td><td>1.81</td></tr>
          <tr><td>Long jump</td><td>0.14354</td><td>220</td><td>1.4</td></tr>
          <tr><td>Shot put</td><td>51.39</td><td>1.5</td><td>1.05</td></tr>
          <tr><td>High jump</td><td>0.8465</td><td>75</td><td>1.42</td></tr>
          <tr><td>400 m</td><td>1.53775</td><td>82</td><td>1.81</td></tr>
          <tr><td>110 m hurdles</td><td>5.74352</td><td>28.5</td><td>1.92</td></tr>
          <tr><td>Discus</td><td>12.91</td><td>4</td><td>1.1</td></tr>
          <tr><td>Pole vault</td><td>0.2797</td><td>100</td><td>1.35</td></tr>
          <tr><td>Javelin</td><td>10.14</td><td>7</td><td>1.08</td></tr>
          <tr><td>1500 m</td><td>0.03768</td><td>480</td><td>1.85</td></tr>
        </tbody>
      </table>

      <h2 id="example">Worked example: the world record</h2>
      <ul>
        <li>100 m in 10.55 s: 25.4347 × (18 − 10.55)^1.81 = 963.8 → <strong>963 points</strong>.</li>
        <li>Pole vault 5.45 m (545 cm): 0.2797 × (545 − 100)^1.35 = <strong>1,051 points</strong>, Mayer&apos;s best event.</li>
        <li>All ten events: 963 + 1,010 + 851 + 850 + 889 + 1,007 + 882 + 1,051 + 918 + 705 = <strong>9,126 points</strong> (Kevin Mayer, 2018).</li>
        <li>Heptathlon: Jackie Joyner-Kersee&apos;s 1988 marks give 1,172 + 1,054 + 915 + 1,123 + 1,264 + 776 + 987 = <strong>7,291 points</strong>.</li>
      </ul>

      <h2 id="notes">Things to know</h2>
      <ul>
        <li>The formulas reward improvements more steeply at higher levels (C is above 1), so a tenth of a second matters more for an elite sprinter.</li>
        <li>Field marks are measured to the centimetre and times to the hundredth of a second.</li>
        <li>Official results use World Athletics scoring tables, which these formulas generate; results with hand timing or for youth and masters events can follow different rules or implements.</li>
      </ul>
      <p>Track other sports with the <Link href="/earned-run-average-calculator/">ERA calculator</Link>, test your vertical with the <Link href="/dunk-calculator/">dunk calculator</Link>, estimate your one-rep max with the <Link href="/bench-press-max-calculator/">bench press max calculator</Link>, or turn steps into distance with the <Link href="/steps-to-miles-calculator/">steps to miles calculator</Link>. More <Link href="/category/education/">education and sports calculators</Link>.</p>
    </>
  );
}
