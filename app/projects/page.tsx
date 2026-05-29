import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { ProjectList } from "@/components/project-list";
import { SectionLabel } from "@/components/section-label";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-10">
      <BackLink href="/">Home</BackLink>
      <section className="space-y-6">
        <SectionLabel>All projects</SectionLabel>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
