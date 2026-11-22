import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cone-volume-calculator/Calculator";
import Content from "@/tools/cone-volume-calculator/Content";
import meta from "@/tools/cone-volume-calculator/meta";
import { faq } from "@/tools/cone-volume-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>volume of a cone</strong> (or a truncated cone) from its diameter or radius and height, in cubic units, gallons and liters. You also get the slant height, surface area and the formula worked with your numbers.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
