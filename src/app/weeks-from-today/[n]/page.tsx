import VariantPage, { variantMetadata } from "@/tools/days-from-today/VariantPage";
import { VARIANTS } from "@/tools/days-from-today/variants";

export const dynamicParams = false;
export const generateStaticParams = () => VARIANTS.weeks.map((n) => ({ n: String(n) }));
export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  return variantMetadata("weeks", Number((await params).n));
}
export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  return <VariantPage unit="weeks" n={Number((await params).n)} />;
}
