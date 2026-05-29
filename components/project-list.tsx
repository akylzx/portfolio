import type { ProjectMeta } from "@/lib/projects";
import { ProjectRow } from "./project-row";

export function ProjectList({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted">No projects yet.</p>
    );
  }

  return (
    <ul className="border-t border-border">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </ul>
  );
}
