import Link from "next/link";

/** Brief + competitor findings: docs/research/stud-calculator.md · research/stud-calculator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the stud calculator</h2>
      <ol>
        <li><strong>Enter the wall length</strong> and choose the stud spacing (16 inches on center is most common).</li>
        <li><strong>Count corners, wall intersections, windows and doors</strong>, and adjust how many extra studs each one takes.</li>
        <li><strong>Add waste and plate details</strong>, then read the studs to buy, plate boards and cost.</li>
      </ol>

      <h2 id="formula">Stud formula</h2>
      <div className="formula">Layout studs = ⌈wall length (in) ÷ spacing (in)⌉ + 1<br />Total = layout + corners × extra + intersections × 2 + openings × extra, then + waste<br />Plate lumber = wall length × 3  (bottom + double top plate)</div>

      <h2 id="example">Example: 20 ft wall, 16 in on center</h2>
      <div className="formula">240 ÷ 16 = 15 → 15 + 1 = 16 layout studs<br />+ 2 corners × 2 = 4 · + 1 window and 1 door × 2 = 4  →  24 studs<br />+ 10% waste = 26.4  →  buy 27 studs  ·  plates: 60 ft = five 12 ft boards</div>
      <p>At 24 inches on center the same wall needs only 11 layout studs, 19 before waste.</p>

      <h2 id="spacing">Stud count by spacing</h2>
      <table>
        <thead><tr><th>Wall length</th><th>12 in OC</th><th>16 in OC</th><th>24 in OC</th></tr></thead>
        <tbody>
          {[8, 10, 12, 16, 20, 24].map((ft) => (
            <tr key={ft}><td>{ft} ft</td><td>{Math.ceil((ft * 12) / 12) + 1}</td><td>{Math.ceil((ft * 12) / 16) + 1}</td><td>{Math.ceil((ft * 12) / 24) + 1}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Layout studs only, before corners, openings and waste.</p>

      <h2 id="openings">Framing doors and windows</h2>
      <ul>
        <li><strong>King studs</strong> run full height on each side of the opening.</li>
        <li><strong>Jack (trimmer) studs</strong> sit inside the kings and carry the header.</li>
        <li><strong>Cripple studs</strong> fill above the header and below a window sill, often cut from offcuts.</li>
        <li><strong>Headers</strong> span the opening; their size depends on width and load, so check your code&apos;s header tables.</li>
      </ul>

      <h2 id="lumber">Turning the count into a lumber order</h2>
      <p>Precut studs (92⅝ in for 8-foot walls, 104⅝ in for 9-foot walls) save cutting. To price hardwood or mixed lumber by volume, total your list in the <Link href="/board-foot-calculator/">board foot calculator</Link>. For the wall&apos;s area (for drywall or sheathing), use the <Link href="/square-footage-calculator/">square footage calculator</Link>; framing a roof or stairs instead? See the <Link href="/rafter-length-calculator/">rafter length</Link> and <Link href="/stair-calculator/">stair</Link> calculators.</p>
      <p className="text-sm">Estimates for planning. Load-bearing walls, wall heights and header sizes must follow your local building code. More <Link href="/category/construction/">construction calculators</Link>.</p>
    </>
  );
}
