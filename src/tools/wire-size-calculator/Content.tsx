import Link from "next/link";
import { SIZES, areaMm2, diameterMm, kcmil, ohmsPerKft } from "@/lib/wire";

/** Brief + competitor findings: docs/research/wire-size-calculator.md · research/wire-size-calculator/report.md (safety-sensitive) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the wire size calculator</h2>
      <ol>
        <li><strong>Enter the load current and voltage</strong>, and choose DC, single-phase or three-phase AC.</li>
        <li><strong>Enter the one-way distance</strong> from the panel or source to the load, and the voltage drop you&apos;ll accept (3% is a common target).</li>
        <li><strong>For copper</strong>, pick the ampacity column and tick &quot;continuous load&quot; if it runs for 3 hours or more. The calculator picks the larger of the size needed for the current and the size needed for voltage drop.</li>
      </ol>

      <h2 id="formula">Formulas</h2>
      <div className="formula">Voltage drop (DC, single-phase) = 2 × I × R × L<br />Voltage drop (three-phase) = √3 × I × R × L   (R in Ω per foot, L = one-way feet)<br />AWG diameter = 0.127 mm × 92^((36 − n) ÷ 39)   (1/0 = 0, 2/0 = −1, 3/0 = −2, 4/0 = −3)<br />Required size = larger of (ampacity ≥ current × 1.25 if continuous) and (drop ≤ limit)</div>

      <h2 id="examples">Worked examples</h2>
      <table>
        <thead><tr><th>Circuit</th><th>Ampacity needs</th><th>Voltage drop needs (≤3%)</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td>20 A, 120 V, 100 ft, copper</td><td>12 AWG</td><td>8 AWG (2.55%; 12 AWG would drop 6.4%)</td><td><strong>8 AWG</strong></td></tr>
          <tr><td>30 A, 240 V, 50 ft, copper</td><td>10 AWG</td><td>10 AWG (1.52%)</td><td><strong>10 AWG</strong></td></tr>
          <tr><td>16 A continuous, 120 V, 25 ft, copper</td><td>12 AWG (16 × 1.25 = 20 A)</td><td>14 AWG</td><td><strong>12 AWG</strong></td></tr>
        </tbody>
      </table>

      <h2 id="ampacity">Copper ampacity (NEC Table 310.16)</h2>
      <table>
        <thead><tr><th>AWG</th><th>60 °C</th><th>75 °C</th><th>AWG</th><th>60 °C</th><th>75 °C</th></tr></thead>
        <tbody>
          <tr><td>14*</td><td>15</td><td>20</td><td>2</td><td>95</td><td>115</td></tr>
          <tr><td>12*</td><td>20</td><td>25</td><td>1</td><td>110</td><td>130</td></tr>
          <tr><td>10*</td><td>30</td><td>35</td><td>1/0</td><td>125</td><td>150</td></tr>
          <tr><td>8</td><td>40</td><td>50</td><td>2/0</td><td>145</td><td>175</td></tr>
          <tr><td>6</td><td>55</td><td>65</td><td>3/0</td><td>165</td><td>200</td></tr>
          <tr><td>4</td><td>70</td><td>85</td><td>4/0</td><td>195</td><td>230</td></tr>
        </tbody>
      </table>
      <p>*NEC 240.4(D) limits overcurrent protection for copper to 15 A on 14 AWG, 20 A on 12 AWG and 30 A on 10 AWG, whatever the table says. Values assume no more than three current-carrying conductors and 30 °C ambient; more conductors or heat require derating.</p>

      <h2 id="gauge-chart">AWG size chart</h2>
      <table>
        <thead><tr><th>AWG</th><th>Diameter</th><th>Area</th><th>Copper Ω/1000 ft (75 °C)</th></tr></thead>
        <tbody>
          {SIZES.map((z) => (
            <tr key={z}><td>{z}</td><td>{diameterMm(z).toFixed(3)} mm ({(diameterMm(z) / 25.4).toFixed(4)} in)</td><td>{areaMm2(z).toFixed(2)} mm² ({kcmil(z).toFixed(1)} kcmil)</td><td>{ohmsPerKft(z, "cu").toFixed(3)}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Resistances are calculated from copper&apos;s resistivity for a solid conductor at 75 °C and closely match NEC Chapter 9, Table 8; stranded wire is about 2% higher. Diameters come from the AWG formula; the wire&apos;s cross-section is a circle, the same math as the <Link href="/cylinder-volume-calculator/">cylinder volume calculator</Link>.</p>

      <h2 id="tips">Safety tips</h2>
      <ul>
        <li><strong>Match the breaker to the wire,</strong> never the other way around: a breaker bigger than the wire&apos;s rating can let it overheat.</li>
        <li><strong>Low-voltage DC (12 V, 24 V) needs thick wire</strong> for any distance: 10 A at 12 V over 20 ft drops 6.4% even on 12 AWG copper.</li>
        <li><strong>Check derating</strong> for attics, conduit with many wires and buried runs, and use the right cable type for the location.</li>
      </ul>
      <p className="text-sm">Planning estimates only, not electrical design advice. Follow your local electrical code and have work inspected; hire a licensed electrician for mains wiring. Large numbers in physics problems? Try the <Link href="/scientific-notation-calculator/">scientific notation converter</Link>. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
