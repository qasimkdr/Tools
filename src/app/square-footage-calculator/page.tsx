import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/square-footage-calculator/Calculator";
import Content from "@/tools/square-footage-calculator/Content";
import meta from "@/tools/square-footage-calculator/meta";
import { faq } from "@/tools/square-footage-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Find the <strong>square footage of any room or space</strong>: multiply length × width for rectangles, or add up several shapes. Enter measurements in any unit and include flooring waste and cost.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
