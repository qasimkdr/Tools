import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/stud-calculator/Calculator";
import Content from "@/tools/stud-calculator/Content";
import meta from "@/tools/stud-calculator/meta";
import { faq } from "@/tools/stud-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Work out <strong>how many studs a wall needs</strong> at 12, 16 or 24 inches on center. It adds extra studs for corners, intersections, doors and windows, plus plates, waste and cost, with the layout math shown.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
