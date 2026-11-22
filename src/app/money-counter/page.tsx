import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/money-counter/Calculator";
import Content from "@/tools/money-counter/Content";
import meta from "@/tools/money-counter/meta";
import { faq } from "@/tools/money-counter/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Count cash fast</strong>: enter how many of each bill and coin you have to get the total, with bill and coin subtotals. Add an expected amount to check a cash drawer, in US dollars, euros or pounds.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
