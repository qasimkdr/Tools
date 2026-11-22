import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/asphalt-calculator/Calculator";
import Content from "@/tools/asphalt-calculator/Content";
import meta from "@/tools/asphalt-calculator/meta";
import { faq } from "@/tools/asphalt-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how many tons of asphalt you need</strong> for a driveway, path or parking area. Enter the size and thickness to get US tons, metric tonnes, cubic yards, the bitumen binder content and an optional cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
