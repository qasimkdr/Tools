import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/protein-calculator/Calculator";
import Content from "@/tools/protein-calculator/Content";
import meta from "@/tools/protein-calculator/meta";
import { faq } from "@/tools/protein-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how much protein you need a day</strong>. Adults need at least 0.8 g per kg of body weight; if you exercise, 1.4–2.0 g/kg is recommended. That is <strong>114–163 g a day</strong> for a 180 lb person who works out. Pick your goal to get your range and per-meal amounts.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
