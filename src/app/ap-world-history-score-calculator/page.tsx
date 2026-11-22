import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ap-world-history-score-calculator/Calculator";
import Content from "@/tools/ap-world-history-score-calculator/Content";
import meta from "@/tools/ap-world-history-score-calculator/meta";
import { faq } from "@/tools/ap-world-history-score-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>AP World History: Modern score (1–5)</strong> from your multiple-choice, short-answer, DBQ and long-essay points. It uses the College Board&apos;s official section weights.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
