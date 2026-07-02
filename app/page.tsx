import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { SectionLabel } from "@/components/section-label";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  const [featured, all] = await Promise.all([
    getFeaturedProjects(),
    getAllProjects(),
  ]);
  const shown = featured.length > 0 ? featured : all;

  return (
    <div className="space-y-16">
      <Hero />

      <section className="space-y-6">
        <SectionLabel>[Projects]</SectionLabel>
        <ProjectList projects={shown} />
        {all.length > shown.length ? (
          <Link
            href="/projects"
            className="inline-block font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            All projects →
          </Link>
        ) : null}
      </section>
    </div>
  );
}
