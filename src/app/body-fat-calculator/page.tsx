import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/body-fat-calculator/Calculator";
import Content from "@/tools/body-fat-calculator/Content";
import meta from "@/tools/body-fat-calculator/meta";
import { faq } from "@/tools/body-fat-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Estimate your <strong>body fat percentage</strong> with a tape measure using the U.S. Navy method: men measure neck and waist, women add hips. See your fat and lean mass and where you fall on the American Council on Exercise chart.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
