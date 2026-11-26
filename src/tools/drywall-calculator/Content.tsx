import Link from "next/link";

/** Brief + competitor findings: docs/research/drywall-calculator.md · research/drywall-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the drywall calculator</h2>
      <ol>
        <li>Enter the room&apos;s length, width and wall height, and choose whether to include the ceiling. Or switch to Total area if you already know the square footage.</li>
        <li>Enter the number and size of doors and windows to subtract.</li>
        <li>Pick a sheet size and waste allowance. The result shows sheets, joint compound, tape and, if you add a price, the cost.</li>
      </ol>

      <h2 id="formulas">Drywall formulas</h2>
      <div className="formula">Wall area = 2 × (length + width) × wall height<br />Net area = wall area + ceiling area − doors − windows<br />Sheets = net area × (1 + waste %) ÷ sheet area, rounded up<br />Joint compound ≈ net area × 9.5 gal ÷ 1,000 · Tape ≈ net area × 370 ft ÷ 1,000</div>

      <h2 id="example">Worked example</h2>
      <p>A 14 × 12 ft bedroom with 8 ft walls, a ceiling, one door (21 sq ft) and two windows (15 sq ft each):</p>
      <ul>
        <li>Walls = 2 × (14 + 12) × 8 = 416 sq ft. Ceiling = 14 × 12 = 168 sq ft.</li>
        <li>Net = 416 + 168 − 21 − 30 = <strong>533 sq ft</strong>; with 10% waste, 586.3 sq ft.</li>
        <li>4 × 8 sheets: 586.3 ÷ 32 = 18.3, so <strong>19 sheets</strong>. With 4 × 12 sheets: 586.3 ÷ 48 = 12.2, so 13 sheets.</li>
        <li>Joint compound ≈ 533 × 0.0095 = <strong>5.1 gallons</strong> (two 4.5-gallon pails). Tape ≈ 533 × 0.37 = <strong>197 ft</strong>, one 250 ft roll.</li>
      </ul>

      <h2 id="gables">Gable walls and sloped ceilings</h2>
      <p>Walls under a pitched roof have a triangle above the normal wall height. Each triangle&apos;s area is half its width times its peak height: a 12 ft wide gable that rises 4 ft adds 0.5 × 12 × 4 = 24 sq ft, so two gable ends add 48 sq ft. A cathedral (sloped) ceiling has more area than the floor below it, by the same factor used for roofs: √(1 + (slope ÷ 12)²). A 14 × 12 ft ceiling at a 6/12 slope is 168 × 1.118 = 187.8 sq ft instead of 168.</p>
      <div className="formula">Gable area = ½ × gable width × peak height (per gable)<br />Sloped ceiling area = floor area × √(1 + (slope ÷ 12)²)</div>

      <h2 id="types">Types of drywall</h2>
      <table>
        <thead><tr><th>Type</th><th>Where it&apos;s used</th><th>How to spot it</th></tr></thead>
        <tbody>
          <tr><td>Regular (standard)</td><td>Most walls and ceilings in dry rooms</td><td>Usually white or gray face paper</td></tr>
          <tr><td>Moisture-resistant</td><td>Bathrooms, laundry rooms, kitchens (not wet areas like inside showers)</td><td>Often green face paper</td></tr>
          <tr><td>Mold- and moisture-resistant (paperless)</td><td>Basements and humid spaces</td><td>Fiberglass facing instead of paper</td></tr>
          <tr><td>Fire-resistant (Type X)</td><td>Garages next to living space, furnace rooms, rated assemblies required by code</td><td>⅝ inch thick with glass fibers in the core; marked Type X</td></tr>
          <tr><td>Sound-dampening</td><td>Home theaters, shared walls, bedrooms</td><td>Heavier, layered panels sold as acoustic or soundproof board</td></tr>
          <tr><td>Cement board</td><td>Tile backer inside showers and tub surrounds</td><td>Not gypsum drywall; heavy and rigid</td></tr>
        </tbody>
      </table>
      <p>Building codes decide where Type X and moisture-resistant board are required, so check local rules for garages, shared walls and bathrooms.</p>

      <h2 id="sizes">Drywall sheet sizes</h2>
      <table>
        <thead><tr><th>Size</th><th>Area</th><th>Good for</th></tr></thead>
        <tbody>
          <tr><td>4 × 8 ft</td><td>32 sq ft</td><td>Most DIY jobs, small rooms, working alone</td></tr>
          <tr><td>4 × 10 ft</td><td>40 sq ft</td><td>Hanging horizontally on walls up to 10 ft long</td></tr>
          <tr><td>4 × 12 ft</td><td>48 sq ft</td><td>Fewer seams on long walls and ceilings</td></tr>
          <tr><td>4.5 × 12 ft (54 in)</td><td>54 sq ft</td><td>9 ft walls with two rows and one seam</td></tr>
        </tbody>
      </table>
      <p>Thickness: ½ inch is standard for walls; ⅝ inch is common for ceilings (it sags less) and is the usual thickness for fire-rated (Type X) assemblies. Moisture-resistant board is used in bathrooms and other damp areas.</p>

      <h2 id="tips">Tips for ordering and hanging</h2>
      <ul>
        <li>Hang the ceiling first, then the walls, so the wall sheets support the ceiling edges.</li>
        <li>Plan the layout so joints fall on studs or joists and stagger the end joints between rows.</li>
        <li>Order a sheet or two extra for damaged corners, mistakes and closets you forgot to measure.</li>
        <li>Joint compound and tape figures assume a standard three-coat finish; texture and skim coats need more compound.</li>
      </ul>
      <p>Frame the wall first with the <Link href="/stud-calculator/">stud calculator</Link>, measure floor and wall area with the <Link href="/square-footage-calculator/">square footage calculator</Link>, total trim runs with the <Link href="/linear-feet-calculator/">linear feet calculator</Link>, or plan ceiling lights with the <Link href="/recessed-light-calculator/">recessed light calculator</Link>. More <Link href="/category/construction/">home and construction calculators</Link>.</p>
    </>
  );
}
