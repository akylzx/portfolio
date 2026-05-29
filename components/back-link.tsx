import Link from "next/link";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
