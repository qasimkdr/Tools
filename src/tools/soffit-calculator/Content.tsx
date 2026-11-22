import Link from "next/link";

/** Brief + competitor findings: docs/research/soffit-calculator.md (no reachable competitor offered this tool) */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the soffit calculator</h2>
      <ol>
        <li><strong>Add up the length of every eave</strong> you&apos;re covering, and measure the soffit width from the wall to the back of the fascia.</li>
        <li><strong>Add gable rake soffits</strong> if your roof has them, and enter your panel&apos;s coverage width and length.</li>
        <li><strong>Enter the attic floor area</strong> to see how much ventilation the code calls for and how much should come from the soffits.</li>
      </ol>

      <h2 id="formula">Soffit formulas</h2>
      <div className="formula">Soffit area = eave length × soffit width (ft) + rake length × rake width (ft)<br />Panels = area × (1 + waste) ÷ panel coverage<br />Vent area = attic area ÷ 150 (or ÷ 300 if balanced)  ·  soffit intake ≈ ½ of it</div>

      <h2 id="example">Example</h2>
      <div className="formula">120 ft of eaves × 16 in (1.333 ft) = 160 sq ft<br />12 in × 12 ft panels (12 sq ft): 160 × 1.10 ÷ 12 = 14.7  →  15 panels<br />1,500 sq ft attic, balanced 1/300: 5 sq ft = 720 sq in total, about 360 sq in at the soffits</div>

      <h2 id="venting">Attic ventilation basics</h2>
      <ul>
        <li><strong>The code rule:</strong> IRC R806.2 calls for net free vent area of at least 1/150 of the attic floor area, reduced to 1/300 when 40–50% of it is in the upper part of the attic and the rest is at the eaves (or, in climate zones 6–8, with a ceiling vapor retarder). Check the edition your area uses.</li>
        <li><strong>Intake and exhaust work together:</strong> soffit vents let cool air in low; ridge or roof vents let warm, moist air out high.</li>
        <li><strong>Don&apos;t block it:</strong> install insulation baffles so attic insulation doesn&apos;t cover the soffit vents.</li>
      </ul>
      <p>For more on how venting ratios work, see the U.S. Department of Energy&apos;s Building America{" "}
        <a href="https://basc.pnnl.gov/information/calculating-attic-passive-ventilation" rel="noopener" target="_blank">guide to calculating attic passive ventilation</a>.</p>

      <h2 id="materials">Choosing materials</h2>
      <table>
        <thead><tr><th>Material</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Vinyl</td><td>Low cost and low maintenance; sold solid or vented in panels</td></tr>
          <tr><td>Aluminum</td><td>Durable, doesn&apos;t rot; often paired with aluminum fascia wrap</td></tr>
          <tr><td>Fiber cement</td><td>Paintable and fire resistant; heavier to install</td></tr>
          <tr><td>Wood</td><td>Traditional look; needs painting and can rot if moisture gets in</td></tr>
        </tbody>
      </table>

      <h2 id="related">Related calculators</h2>
      <p>The soffit width comes from your rafter tails; the <Link href="/rafter-length-calculator/">rafter length calculator</Link> includes the overhang. For wall and floor areas use the <Link href="/square-footage-calculator/">square footage calculator</Link>, and to price wood trim or blocking use the <Link href="/board-foot-calculator/">board foot calculator</Link>. More <Link href="/category/construction/">construction calculators</Link>.</p>
      <p className="text-sm">Estimates for planning. Follow the panel manufacturer&apos;s instructions and your local building code for ventilation.</p>
    </>
  );
}
