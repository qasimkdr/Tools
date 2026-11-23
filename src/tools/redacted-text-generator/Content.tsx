import Link from "next/link";

/** Brief + competitor findings: docs/research/redacted-text-generator.md · research/redacted-text-generator/report.md */
export default function Content() {
  return (
    <>
      <h2 id="how-to-use">How to use the redacted text generator</h2>
      <ol>
        <li>Type or paste your text.</li>
        <li>Choose what to hide: parts in <strong>[square brackets]</strong>, a list of <strong>chosen words</strong>, or <strong>everything</strong>.</li>
        <li>Pick a bar style, decide whether to keep punctuation and word lengths, then copy the result.</li>
      </ol>

      <h2 id="how-it-works">How it works</h2>
      <div className="formula">Each letter or digit to hide → one block character (█ = U+2588)<br />Spaces always stay · punctuation optional · &quot;hide lengths&quot; uses a fixed 6-block bar per word</div>

      <h2 id="examples">Examples</h2>
      <table>
        <thead><tr><th>Input</th><th>Mode</th><th>Output</th></tr></thead>
        <tbody>
          <tr><td>Agent [John Smith] arrives [Tuesday].</td><td>Brackets</td><td>Agent ████ █████ arrives ███████.</td></tr>
          <tr><td>Meet at 9pm near the old bridge.</td><td>Words: 9pm, bridge</td><td>Meet at ███ near the old ██████.</td></tr>
          <tr><td>Meet at 9pm near the old bridge.</td><td>Everything</td><td>████ ██ ███ ████ ███ ███ ██████.</td></tr>
        </tbody>
      </table>

      <h2 id="uses">Ideas for using redacted text</h2>
      <ul>
        <li><strong>Social posts and memes</strong>: the classic &quot;classified document&quot; look.</li>
        <li><strong>Games, escape rooms and puzzles</strong>: hide clues players have to work out.</li>
        <li><strong>Teaching</strong>: fill-in-the-blank vocabulary or cloze exercises.</li>
        <li><strong>Mock-ups</strong>: placeholder text in designs without real data.</li>
      </ul>
      <p><strong>Not for confidential files.</strong> Covering text in a document with black boxes, or pixelating it, has repeatedly leaked information, because the original text often stays underneath or can be reconstructed. Use dedicated redaction tools that delete the content.</p>
      <p>More text effects: the <Link href="/superscript-generator/">superscript generator</Link>. Need random picks for a game? Try the <Link href="/random-number-generator/">random number generator</Link>, or encode messages with the <Link href="/binary-calculator/">binary converter</Link>. More <Link href="/category/text/">text tools</Link>.</p>
    </>
  );
}
