import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ap-statistics-score-calculator/Calculator";
import Content from "@/tools/ap-statistics-score-calculator/Content";
import meta from "@/tools/ap-statistics-score-calculator/meta";
import { faq } from "@/tools/ap-statistics-score-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>AP Statistics score</strong> on the new May 2027 exam format: 42 multiple-choice questions and four 10-point free-response questions, each half of your score. You&apos;ll get your composite score and the likely 1–5 range.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
