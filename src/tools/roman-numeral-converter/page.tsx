import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/roman-numeral-converter/Calculator";
import Content from "@/tools/roman-numeral-converter/Content";
import meta from "@/tools/roman-numeral-converter/meta";
import { faq } from "@/tools/roman-numeral-converter/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To convert a number to <strong>Roman numerals</strong>, split it into thousands, hundreds, tens and ones and write each with I, V, X, L, C, D and M. 2026 is <strong>MMXXVI</strong> and 1994 is <strong>MCMXCIV</strong>. Convert either way, turn a date into Roman numerals, or go past 3,999 with overlined numerals.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
