import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/decathlon-calculator/Calculator";
import Content from "@/tools/decathlon-calculator/Content";
import meta from "@/tools/decathlon-calculator/meta";
import { faq } from "@/tools/decathlon-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A <strong>decathlon score</strong> is the sum of points from ten events, each worked out with the World Athletics formula A × (B − performance)^C for running or A × (performance − B)^C for jumps and throws. Kevin Mayer&apos;s world record adds up to <strong>9,126 points</strong>. Enter your marks to get every event&apos;s points and your total, for the decathlon or the heptathlon.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
