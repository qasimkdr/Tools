import VariantPage, { variantMetadata } from "@/tools/days-from-today/VariantPage";
import { VARIANTS } from "@/tools/days-from-today/variants";

export const dynamicParams = false;
export const generateStaticParams = () => VARIANTS.days.map((n) => ({ n: String(n) }));
export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  return variantMetadata("days", Number((await params).n));
}
export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  return <VariantPage unit="days" n={Number((await params).n)} />;
}
