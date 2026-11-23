import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/army-fitness-test-aft-calculator/Calculator";
import Content from "@/tools/army-fitness-test-aft-calculator/Content";
import meta from "@/tools/army-fitness-test-aft-calculator/meta";
import { faq } from "@/tools/army-fitness-test-aft-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Score the <strong>Army Fitness Test (AFT)</strong> with the official score tables effective 1 June 2025. Enter your five event results to get points for each, your total out of 500, and whether you pass: <strong>60 points in every event</strong> plus 300 total on the general standard or 350 on the combat standard.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
