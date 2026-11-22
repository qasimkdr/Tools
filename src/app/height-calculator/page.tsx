import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/height-calculator/Calculator";
import Content from "@/tools/height-calculator/Content";
import meta from "@/tools/height-calculator/meta";
import { faq } from "@/tools/height-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate <strong>how tall a child will be as an adult</strong> from their age, height and weight and both parents&apos; heights, using the Khamis-Roche method, plus the mid-parental target height and range.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
