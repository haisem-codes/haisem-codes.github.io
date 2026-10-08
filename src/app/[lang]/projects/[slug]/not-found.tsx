import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-4xl font-bold text-text">
        Project Not Found
      </h1>
      <p className="mt-4 text-text-secondary">
        The project you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-accent hover:underline"
      >
        &larr; Back to home
      </Link>
    </main>
  );
}
