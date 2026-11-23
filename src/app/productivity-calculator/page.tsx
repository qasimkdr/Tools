import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/productivity-calculator/Calculator";
import Content from "@/tools/productivity-calculator/Content";
import meta from "@/tools/productivity-calculator/meta";
import { faq } from "@/tools/productivity-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p><strong>Productivity = output ÷ input.</strong> Enter what was produced and the labor hours used to get output per hour and per worker, the percentage change from a previous period, and the hours needed to reach a target.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
