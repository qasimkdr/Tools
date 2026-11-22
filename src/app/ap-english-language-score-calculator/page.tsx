import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ap-english-language-score-calculator/Calculator";
import Content from "@/tools/ap-english-language-score-calculator/Content";
import meta from "@/tools/ap-english-language-score-calculator/meta";
import { faq } from "@/tools/ap-english-language-score-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>AP English Language and Composition score</strong> from your multiple-choice answers and your three essay scores (0–6 each), using the official 45% / 55% weighting, with the likely 1–5 range.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
