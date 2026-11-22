import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/fill-dirt-calculator/Calculator";
import Content from "@/tools/fill-dirt-calculator/Content";
import meta from "@/tools/fill-dirt-calculator/meta";
import { faq } from "@/tools/fill-dirt-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how much fill dirt you need</strong> for a hole, low spot or grade change. You get cubic yards and tons with a compaction allowance, plus truckloads and an optional cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
