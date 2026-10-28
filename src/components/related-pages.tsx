import Link from "next/link";
import { Arrow } from "./arrow";

export function RelatedPages({ pages }: { pages: readonly { href: string; title: string; description: string }[] }) {
  return (
    <nav className="related-pages" aria-label="Continue a leitura">
      <h2>Continue a leitura</h2>
      {pages.map(page => (
        <Link prefetch={false} className="related-page" key={page.href} href={page.href}>
          <span><strong>{page.title}</strong><span>{page.description}</span></span>
          <Arrow direction="diagonal" />
        </Link>
      ))}
    </nav>
  );
}
