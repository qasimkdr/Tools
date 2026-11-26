import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/brick-calculator/Calculator";
import Content from "@/tools/brick-calculator/Content";
import meta from "@/tools/brick-calculator/meta";
import { faq } from "@/tools/brick-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To find <strong>how many bricks</strong> you need, multiply the wall area (minus openings) by the bricks per square foot and add 5% for breakage. US modular bricks with ⅜-inch joints come to about 6.86 per sq ft, so a 20 × 8 ft wall with one window needs about <strong>1,066 bricks</strong> and 8 cu ft of mortar.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
