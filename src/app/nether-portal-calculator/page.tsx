import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/nether-portal-calculator/Calculator";
import Content from "@/tools/nether-portal-calculator/Content";
import meta from "@/tools/nether-portal-calculator/meta";
import { faq } from "@/tools/nether-portal-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>To link portals, <strong>divide your Overworld X and Z by 8</strong> to get Nether coordinates, or multiply Nether coordinates by 8 to go back. Y stays the same. Enter your coordinates for the exact spot to build.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
