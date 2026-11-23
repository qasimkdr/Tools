import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/blood-pressure-by-age-calculator/Calculator";
import Content from "@/tools/blood-pressure-by-age-calculator/Content";
import meta from "@/tools/blood-pressure-by-age-calculator/meta";
import { faq } from "@/tools/blood-pressure-by-age-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>For adults of <strong>any age, normal blood pressure is below 120/80 mmHg</strong>. Enter your readings to see your category under the 2025 American Heart Association/American College of Cardiology guideline, average several readings, and learn why the target doesn&apos;t rise with age.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
