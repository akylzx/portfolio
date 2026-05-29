import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export function ProjectRow({ project }: { project: ProjectMeta }) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col gap-1 border-b border-border py-4 transition-colors hover:border-muted"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="flex items-center gap-2 font-medium text-fg">
            {project.title}
            <span
              aria-hidden
              className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
            >
              →
            </span>
          </span>
          <span className="shrink-0 font-mono text-sm text-muted">
            {project.year}
          </span>
        </div>
        {project.blurb ? (
          <span className="text-sm leading-relaxed text-muted">
            {project.blurb}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
