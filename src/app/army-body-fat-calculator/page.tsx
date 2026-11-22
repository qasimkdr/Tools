import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/army-body-fat-calculator/Calculator";
import Content from "@/tools/army-body-fat-calculator/Content";
import meta from "@/tools/army-body-fat-calculator/meta";
import { faq } from "@/tools/army-body-fat-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Check the <strong>Army&apos;s current body composition standard</strong>: since July 7, 2026, a <strong>waist-to-height ratio below 0.550</strong>. See your ratio, the largest waist allowed for your height, and your margin.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
