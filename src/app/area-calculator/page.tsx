import ToolLayout from "@/components/ToolLayout";
import Calculator from "@/tools/area-calculator/Calculator";
import Content from "@/tools/area-calculator/Content";
import meta from "@/tools/area-calculator/meta";
import { faq } from "@/tools/area-calculator/faq";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: meta.title, description: meta.description, path: `/${meta.slug}/` });

export default function Page() {
  return (
    <ToolLayout tool={meta} faq={faq}
      intro={<p>Calculate the <strong>area of any flat shape</strong> (rectangle = length × width, circle = πr², triangle = ½ × base × height) or the <strong>surface area of a 3D solid</strong> such as a cube, sphere, cylinder or cone, with the formula and extra measurements shown.</p>}
      calculator={<Calculator />}>
      <Content />
    </ToolLayout>
  );
}
