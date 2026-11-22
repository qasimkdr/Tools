import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/arrow-speed-calculator/Calculator";
import Content from "@/tools/arrow-speed-calculator/Content";
import meta from "@/tools/arrow-speed-calculator/meta";
import { faq } from "@/tools/arrow-speed-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Your bow&apos;s <strong>IBO speed</strong> is measured at 30 in, 70 lb and a 350-grain arrow. Enter your real draw length, draw weight and arrow weight to estimate your actual <strong>arrow speed in fps</strong>, with kinetic energy and momentum.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
