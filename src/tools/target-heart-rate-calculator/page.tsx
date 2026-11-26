import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/target-heart-rate-calculator/Calculator";
import Content from "@/tools/target-heart-rate-calculator/Content";
import meta from "@/tools/target-heart-rate-calculator/meta";
import { faq } from "@/tools/target-heart-rate-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Your estimated <strong>maximum heart rate</strong> is 220 minus your age, and the CDC puts moderate exercise at 64–76% of it and vigorous exercise at 77–93%. At age 40 that is a maximum of 180 bpm, a moderate range of <strong>115–137 bpm</strong> and a vigorous range of 139–167 bpm. Add your resting heart rate for the Karvonen method and five training zones.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
