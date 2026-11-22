import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/steps-to-miles-calculator/Calculator";
import Content from "@/tools/steps-to-miles-calculator/Content";
import meta from "@/tools/steps-to-miles-calculator/meta";
import { faq } from "@/tools/steps-to-miles-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Convert steps to miles</strong> (or miles to steps) using your height or measured step length. For most adults, 10,000 walking steps is about 4 to 5 miles, and a mile is roughly 2,000 to 2,600 steps.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
