import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/grade-calculator/Calculator";
import Content from "@/tools/grade-calculator/Content";
import meta from "@/tools/grade-calculator/meta";
import { faq } from "@/tools/grade-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>what you need on your final exam</strong> to reach the grade you want. See the course grade any exam score would give you, or work out a weighted grade from your assignments and categories.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
