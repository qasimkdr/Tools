import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/gravel-and-stone-calculator/Calculator";
import Content from "@/tools/gravel-and-stone-calculator/Content";
import meta from "@/tools/gravel-and-stone-calculator/meta";
import { faq } from "@/tools/gravel-and-stone-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how much gravel or crushed stone you need</strong> in tons and cubic yards for a driveway, path or patio base. Typical gravel weighs about 1.4 tons per cubic yard.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
