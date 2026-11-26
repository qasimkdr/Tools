import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/running-record-calculator/Calculator";
import Content from "@/tools/running-record-calculator/Content";
import meta from "@/tools/running-record-calculator/meta";
import { faq } from "@/tools/running-record-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>running record</strong> is scored with three numbers: accuracy = (words − errors) ÷ words, error rate = words ÷ errors, and self-correction rate = (errors + self-corrections) ÷ self-corrections. A child who reads 99 words with 8 errors scores <strong>92% accuracy</strong> (instructional level) and an error rate of <strong>1:12</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
