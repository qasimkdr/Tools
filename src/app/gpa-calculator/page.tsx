import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/gpa-calculator/Calculator";
import Content from "@/tools/gpa-calculator/Content";
import meta from "@/tools/gpa-calculator/meta";
import { faq } from "@/tools/gpa-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate your <strong>GPA from letter grades and credits</strong>, weighted or unweighted, and your cumulative GPA. You can also see what grades you need to reach a target GPA.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
