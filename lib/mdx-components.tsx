import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function Anchor({ href = "", children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className="link" {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: Anchor,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 mb-3 font-mono text-sm uppercase tracking-widest text-muted" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-2 text-base font-medium text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 leading-relaxed text-fg/85" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 list-disc space-y-1 pl-5 text-fg/85 marker:text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 list-decimal space-y-1 pl-5 text-fg/85 marker:text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l border-border pl-4 text-muted italic" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    <img alt={alt} className="my-6 rounded border border-border" {...props} />
  ),
};
