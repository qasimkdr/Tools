import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/linear-feet-calculator/Calculator";
import Content from "@/tools/linear-feet-calculator/Content";
import meta from "@/tools/linear-feet-calculator/meta";
import { faq } from "@/tools/linear-feet-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate <strong>linear feet</strong> three ways: add up pieces, convert square feet using the material&apos;s width, or measure a room&apos;s perimeter. It adds waste and tells you how many boards to buy and what they&apos;ll cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
