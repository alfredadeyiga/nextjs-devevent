import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh flex-col items-center px-6 justify-center">
      <div className="max-w-md text-center">
        <p className="font-martian-mono text-sm tracking-[0.25em] text-primary">
          404
        </p>

        <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>

        <p className="mt-4 text-light-100">
          The event or page you were looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary/20"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
