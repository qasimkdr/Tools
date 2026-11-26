import Link from "next/link";

/** Brief + competitor findings: docs/research/gc-calculator.md · research/gc-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the GC content calculator</h2>
      <ol>
        <li>Paste a DNA or RNA sequence. FASTA format works: the header line starting with &gt; is ignored, as are spaces, line breaks and position numbers.</li>
        <li>Read the GC content, AT (or AU) content, base counts, GC skew and an estimated melting temperature.</li>
        <li>Copy the reverse complement, and adjust the window size to see how GC% changes along the sequence.</li>
      </ol>

      <h2 id="formulas">GC content formulas</h2>
      <div className="formula">GC content = (G + C) ÷ (A + T + G + C) × 100 (use U instead of T for RNA)<br />AT content = 100% − GC content<br />GC skew = (G − C) ÷ (G + C)<br />Tm, under 14 bases (Wallace rule) = 2 × (A + T) + 4 × (G + C) °C<br />Tm, 14 bases or more = 64.9 + 41 × (G + C − 16.4) ÷ N °C</div>
      <p>Ambiguous bases such as N are counted and shown but left out of the GC% denominator, so a stretch of unknown bases does not dilute the result.</p>

      <h2 id="example">Worked example</h2>
      <p>For the 23-base primer <code>ATGCGCGATTACGCGTATAGCGC</code>:</p>
      <ul>
        <li>Counts: A = 5, T = 5, G = 7, C = 6.</li>
        <li>GC content = (7 + 6) ÷ 23 × 100 = <strong>56.52%</strong>; AT content = 43.48%.</li>
        <li>GC skew = (7 − 6) ÷ 13 = <strong>0.077</strong>, a slight excess of G on this strand.</li>
        <li>Tm (23 bases, so the longer-sequence formula) = 64.9 + 41 × (13 − 16.4) ÷ 23 = <strong>58.8 °C</strong>.</li>
        <li>For the 8-base oligo ATGCATGC, the Wallace rule gives 2 × 4 + 4 × 4 = <strong>24 °C</strong>.</li>
      </ul>

      <h2 id="why">Why GC content matters</h2>
      <ul>
        <li><strong>DNA stability:</strong> G–C pairs are held by three hydrogen bonds and A–T pairs by two, so GC-rich DNA generally melts at a higher temperature.</li>
        <li><strong>PCR primers:</strong> primer guides commonly aim for about 40–60% GC and a melting temperature in the 50s or 60s °C, with the two primers of a pair within a few degrees of each other.</li>
        <li><strong>Genomics:</strong> GC content varies widely between organisms and between regions of a genome, and GC skew is used to locate replication origins in bacterial genomes.</li>
      </ul>
      <h2 id="limits">Limits of the estimates</h2>
      <p>The two melting-temperature formulas count bases but ignore their order, salt and primer concentration. They are useful for a quick check; for final primer design, use a nearest-neighbor calculator that accounts for sequence and buffer conditions.</p>
      <p>Work out the molar mass of reagents with the <Link href="/molecular-weight-calculator/">molecular weight calculator</Link>, make buffer solutions with the <Link href="/molarity-calculator/">molarity calculator</Link>, or convert counts to percentages with the <Link href="/percent-calculator/">percent calculator</Link>. More <Link href="/category/science/">science calculators</Link>.</p>
    </>
  );
}
