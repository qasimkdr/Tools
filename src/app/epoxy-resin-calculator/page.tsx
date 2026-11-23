import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/epoxy-resin-calculator/Calculator";
import Content from "@/tools/epoxy-resin-calculator/Content";
import meta from "@/tools/epoxy-resin-calculator/meta";
import { faq } from "@/tools/epoxy-resin-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>A 1/8 in flood coat takes about <strong>10 fl oz of mixed epoxy per square foot</strong>. Enter your table top, bar top, river table or mold to get the total in ounces, gallons and liters, split into resin and hardener.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
