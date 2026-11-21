import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="text-gradient text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/tools/" className="btn-primary mt-8">Browse all calculators</Link>
    </div>
  );
}
