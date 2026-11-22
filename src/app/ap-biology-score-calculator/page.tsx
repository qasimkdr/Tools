import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ap-biology-score-calculator/Calculator";
import Content from "@/tools/ap-biology-score-calculator/Content";
import meta from "@/tools/ap-biology-score-calculator/meta";
import { faq } from "@/tools/ap-biology-score-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Predict your <strong>AP Biology score</strong> from your multiple-choice and free-response points. It uses the official 50/50 section weighting and current point values, then estimates your 1–5 score and warns you near a cutoff.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
