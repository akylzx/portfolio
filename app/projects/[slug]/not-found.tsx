import { BackLink } from "@/components/back-link";

export default function ProjectNotFound() {
  return (
    <div className="space-y-6">
      <h1 className="font-mono text-lg text-fg">Project not found</h1>
      <p className="text-sm text-muted">
        This project doesn’t exist or hasn’t been published yet.
      </p>
      <BackLink href="/projects">Projects</BackLink>
    </div>
  );
}
