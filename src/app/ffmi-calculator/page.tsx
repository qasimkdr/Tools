import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/ffmi-calculator/Calculator";
import Content from "@/tools/ffmi-calculator/Content";
import meta from "@/tools/ffmi-calculator/meta";
import { faq } from "@/tools/ffmi-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate your <strong>fat-free mass index (FFMI)</strong>, a measure of muscularity that ignores fat, from your height, weight and body fat percentage. You get the height-normalized score, lean mass and fat mass, with research-based benchmarks.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
