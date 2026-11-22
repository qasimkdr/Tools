import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/concrete-calculator/Calculator";
import Content from "@/tools/concrete-calculator/Content";
import meta from "@/tools/concrete-calculator/meta";
import { faq } from "@/tools/concrete-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how much concrete you need</strong> for a slab, footing, wall, post hole or set of steps. Get cubic yards, cubic feet and the number of 40, 60 or 80 lb bags, with extra for waste and an optional cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
