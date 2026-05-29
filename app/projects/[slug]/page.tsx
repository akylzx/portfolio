import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { BackLink } from "@/components/back-link";
import { TechTags } from "@/components/tech-tags";
import { mdxComponents } from "@/lib/mdx-components";
import { getProject, getProjectSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.blurb || undefined };
}

const prettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const externalLinks = [
    project.links.github && { label: "GitHub", href: project.links.github },
    project.links.demo && { label: "Demo", href: project.links.demo },
    project.links.paper && { label: "Paper", href: project.links.paper },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article className="space-y-10">
      <BackLink href="/projects">Projects</BackLink>

      <header className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-2xl font-medium tracking-tight text-fg">
              {project.title}
            </h1>
            <span className="shrink-0 font-mono text-sm text-muted">
              {project.year}
            </span>
          </div>
          {project.blurb ? (
            <p className="leading-relaxed text-muted">{project.blurb}</p>
          ) : null}
        </div>

        <TechTags tech={project.tech} />

        {externalLinks.length > 0 ? (
          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-muted">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fg"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      {project.highlights.length > 0 ? (
        <ul className="space-y-1.5 border-y border-border py-5 text-sm leading-relaxed text-fg/85 marker:text-muted">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden className="select-none text-muted">
                —
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="text-[0.95rem]">
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </div>
    </article>
  );
}
