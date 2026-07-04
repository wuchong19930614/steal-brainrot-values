import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The value tracker does not have that page yet.</p>
      <Link className="primary-link" href="/">
        Back to values
      </Link>
    </section>
  );
}

