import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/average-calculator/Calculator";
import Content from "@/tools/average-calculator/Content";
import meta from "@/tools/average-calculator/meta";
import { faq } from "@/tools/average-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>average</strong> of any list: add the values and divide by how many there are. For 4, 8, 15, 16, 23 and 42 that is 108 ÷ 6 = <strong>18</strong>. You also get the median, mode and range, and can average percentages by group size or times in minutes and seconds.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
