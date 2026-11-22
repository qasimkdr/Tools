import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/cylinder-volume-calculator/Calculator";
import Content from "@/tools/cylinder-volume-calculator/Content";
import meta from "@/tools/cylinder-volume-calculator/meta";
import { faq } from "@/tools/cylinder-volume-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>volume of a cylinder</strong> from its diameter or radius and height, in cubic feet, gallons, liters and cubic meters. It also handles pipes and partly filled tanks, and shows the formula with your numbers.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
