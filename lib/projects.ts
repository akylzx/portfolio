import { readFile, readdir } from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  year: z.number().int(),
  blurb: z.string().default(""),
  tech: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  links: z
    .object({
      github: z.string().optional(),
      demo: z.string().optional(),
      paper: z.string().optional(),
    })
    .default({}),
  highlights: z.array(z.string()).default([]),
  cover: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof frontmatterSchema>;

export type ProjectMeta = ProjectFrontmatter & { slug: string };

export type Project = ProjectMeta & { content: string };

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, "");
}

async function listProjectFiles(): Promise<string[]> {
  const entries = await readdir(PROJECTS_DIR);
  return entries.filter(
    (name) => name.endsWith(".mdx") && !name.startsWith("_"),
  );
}

async function readProjectFile(filename: string): Promise<Project> {
  const fullPath = path.join(PROJECTS_DIR, filename);
  const raw = await readFile(fullPath, "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/projects/${filename}:\n${parsed.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  return { ...parsed.data, slug: slugFromFilename(filename), content };
}

function byYearDesc(a: ProjectMeta, b: ProjectMeta): number {
  if (b.year !== a.year) return b.year - a.year;
  return a.title.localeCompare(b.title);
}

export async function getAllProjects(): Promise<Project[]> {
  const files = await listProjectFiles();
  const projects = await Promise.all(files.map(readProjectFile));
  return projects
    .filter((project) => !project.draft)
    .sort(byYearDesc);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await readProjectFile(`${slug}.mdx`);
    return project.draft ? null : project;
  } catch {
    return null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const files = await listProjectFiles();
  return files.map(slugFromFilename);
}
