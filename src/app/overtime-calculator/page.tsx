import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/overtime-calculator/Calculator";
import Content from "@/tools/overtime-calculator/Content";
import meta from "@/tools/overtime-calculator/meta";
import { faq } from "@/tools/overtime-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate <strong>overtime pay at time and a half or double time</strong>. Enter a weekly total or hours day by day, apply federal or California rules, and see regular, overtime and total pay.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
