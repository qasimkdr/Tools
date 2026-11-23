import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/quarter-mile-calculator/Calculator";
import Content from "@/tools/quarter-mile-calculator/Content";
import meta from "@/tools/quarter-mile-calculator/meta";
import { faq } from "@/tools/quarter-mile-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your car&apos;s <strong>quarter-mile time and trap speed</strong> from horsepower and weight (a 3,500 lb, 400 hp car runs about 12.0 seconds at 113 mph), or work backward from a time slip to estimate horsepower.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
