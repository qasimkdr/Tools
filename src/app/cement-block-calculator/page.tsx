import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cement-block-calculator/Calculator";
import Content from "@/tools/cement-block-calculator/Content";
import meta from "@/tools/cement-block-calculator/meta";
import { faq } from "@/tools/cement-block-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how many cement blocks you need</strong> for a wall. Standard 8x8x16 blocks cover 1.125 per square foot, so a 40 × 6 ft wall takes <strong>270 blocks</strong>, or 284 with 5% extra. You also get courses, blocks per course and mortar bags.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
