import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/pool-salt-calculator/Calculator";
import Content from "@/tools/pool-salt-calculator/Content";
import meta from "@/tools/pool-salt-calculator/meta";
import { faq } from "@/tools/pool-salt-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find out <strong>how much salt to add to your pool</strong> to reach your chlorine generator&apos;s target. Enter the volume (or the pool&apos;s size) and your current reading to get pounds, kilograms and bags, plus how much water to replace if it&apos;s too salty.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
