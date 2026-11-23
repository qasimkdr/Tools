import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/volume-calculator/Calculator";
import Content from "@/tools/volume-calculator/Content";
import meta from "@/tools/volume-calculator/meta";
import { faq } from "@/tools/volume-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate the <strong>volume of any common 3D shape</strong>: a box or tank is length × width × height, a cylinder is πr²h and a sphere is (4/3)πr³. Get the answer in cubic units, liters and gallons, which is handy for ponds, aquariums and tanks.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
