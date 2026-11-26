import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/fence-calculator/Calculator";
import Content from "@/tools/fence-calculator/Content";
import meta from "@/tools/fence-calculator/meta";
import { faq } from "@/tools/fence-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To estimate a <strong>fence</strong>, divide the fence length (minus gates) by the post spacing to get sections, then add one post per section plus one, and one more per gate. A 100 ft privacy fence with 8 ft spacing and a 4 ft gate needs <strong>14 posts</strong>, 36 rails and about <strong>220 boards</strong>.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
