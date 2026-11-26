import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/decking-calculator/Calculator";
import Content from "@/tools/decking-calculator/Content";
import meta from "@/tools/decking-calculator/meta";
import { faq } from "@/tools/decking-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To work out <strong>deck boards</strong>, divide the deck width by the board width plus the gap to get the number of rows, multiply by the deck length, and add waste. A 12 × 16 ft deck with 5½-inch boards and ⅛-inch gaps needs 26 rows (416 linear ft), or <strong>29 sixteen-foot boards</strong> with 10% waste.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
