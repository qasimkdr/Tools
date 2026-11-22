import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/grade-curve-calculator/Calculator";
import Content from "@/tools/grade-curve-calculator/Content";
import meta from "@/tools/grade-curve-calculator/meta";
import { faq } from "@/tools/grade-curve-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Paste a class&apos;s test scores and <strong>curve them five ways</strong>: add flat points, shift to a target average, scale so the top score is 100, apply a square-root curve, or fit a bell curve. See every new score, letter grade and the new average.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
