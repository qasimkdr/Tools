import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/sand-calculator/Calculator";
import Content from "@/tools/sand-calculator/Content";
import meta from "@/tools/sand-calculator/meta";
import { faq } from "@/tools/sand-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find <strong>how much sand you need</strong> in tons, cubic yards and bags, for pavers, sandboxes, leveling or concrete. Dry sand weighs about 1.35 tons per cubic yard.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
