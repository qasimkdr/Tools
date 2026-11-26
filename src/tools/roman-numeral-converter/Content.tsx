import Link from "next/link";

/** Brief + competitor findings: docs/research/roman-numeral-converter.md · research/roman-numeral-converter/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the Roman numeral converter</h2>
      <ol>
        <li>Choose Number → Roman, Roman → number, or Date → Roman.</li>
        <li>Type a number (or several, separated by spaces), a numeral, or pick a date and its order.</li>
        <li>Copy the result and check the breakdown, which shows how each part is built.</li>
      </ol>

      <h2 id="symbols">The seven symbols and the rules</h2>
      <table>
        <thead><tr><th>Symbol</th><th>Value</th><th>Symbol</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>I</td><td>1</td><td>C</td><td>100</td></tr>
          <tr><td>V</td><td>5</td><td>D</td><td>500</td></tr>
          <tr><td>X</td><td>10</td><td>M</td><td>1,000</td></tr>
          <tr><td>L</td><td>50</td><td>V with a bar</td><td>5,000</td></tr>
        </tbody>
      </table>
      <div className="formula">Larger to smaller: add (VI = 5 + 1 = 6)<br />Smaller before larger: subtract (IV = 5 − 1 = 4)<br />Only I, X and C are subtracted, and only from the next two larger symbols: IV, IX, XL, XC, CD, CM<br />A symbol repeats at most three times in a row (III, XXX, CCC, MMM)<br />A bar over a numeral multiplies it by 1,000</div>

      <h2 id="example">Worked examples</h2>
      <ul>
        <li><strong>1994</strong> = 1,000 + 900 + 90 + 4 = M + CM + XC + IV = <strong>MCMXCIV</strong>.</li>
        <li><strong>3,888</strong> = MMM + DCCC + LXXX + VIII = <strong>MMMDCCCLXXXVIII</strong>, the longest numeral below 4,000.</li>
        <li><strong>MMXXVI</strong> = 1,000 + 1,000 + 10 + 10 + 5 + 1 = <strong>2026</strong>.</li>
        <li><strong>A date:</strong> July 4, 1776 = VII.IV.MDCCLXXVI (month.day.year).</li>
        <li><strong>Big numbers:</strong> 12,345 = XII with a bar (12,000) + CCCXLV.</li>
      </ul>

      <h2 id="uses">Where Roman numerals are still used</h2>
      <ul>
        <li>Clock faces, book chapters and outline headings, and the names of monarchs and popes (Elizabeth II).</li>
        <li>Movie copyright years, Super Bowls and Olympic Games.</li>
        <li>Dates and birthdays for tattoos, rings and engravings; double-check the date order before making anything permanent.</li>
      </ul>
      <p>Convert between number bases with the <Link href="/binary-calculator/">binary calculator</Link>, write very large or small numbers with the <Link href="/scientific-notation-calculator/">scientific notation calculator</Link>, count the days between dates with the <Link href="/date-difference-calculator/">date difference calculator</Link>, or find an exact age with the <Link href="/age-calculator/">age calculator</Link>. More <Link href="/category/conversion/">conversion tools</Link>.</p>
    </>
  );
}
