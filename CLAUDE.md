# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build (also the type/frontmatter validation gate)
npm run start    # serve the production build
npm run lint     # next lint (eslint-config-next, core-web-vitals + typescript)
```

There is no test suite. `npm run build` is the de facto correctness check: it type-checks and runs each project's Zod frontmatter validation (a bad `.mdx` frontmatter throws and fails the build).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · MDX via `next-mdx-remote/rsc`.

- **Tailwind v4 has no `tailwind.config.js`.** Design tokens live in `app/globals.css` under `@theme` (colors `bg`/`fg`/`muted`/`border`/`accent`, fonts `sans`/`mono`). Add or change theme values there, then use them as utility classes like `text-muted` or `border-border`.
- Path alias `@/*` maps to the repo root (e.g. `@/lib/projects`).

## Architecture

This is a content-driven portfolio. Pages are thin Server Components; all project data flows from MDX files through one module.

**`lib/projects.ts` is the single source of truth for project data.** It reads `content/projects/*.mdx`, parses frontmatter with `gray-matter`, and validates it against a Zod schema. Non-obvious rules enforced here:

- Slug = filename without `.mdx`. A file at `content/projects/foo.mdx` is served at `/projects/foo` automatically — no routing or registry to update.
- Files starting with `_` (e.g. `_template.mdx`) are skipped entirely.
- `draft: true` hides a project from all listings **and** makes `getProject` return `null` (so the detail page 404s). Use it for unpublished work.
- `featured: true` controls the home page: it shows featured projects, falling back to all projects if none are featured.
- Projects sort by `year` descending, then title.

**Rendering flow:**
- `app/page.tsx` (home) and `app/projects/page.tsx` (full list) consume the `getAll*`/`getFeatured*` helpers and render via `components/project-list.tsx`.
- `app/projects/[slug]/page.tsx` renders one case study. It uses `generateStaticParams` (from `getProjectSlugs`) so detail pages are statically generated, and `generateMetadata` for per-project title/description. MDX body is rendered with `<MDXRemote>` + `lib/mdx-components.tsx` (custom-styled HTML elements) and `rehype-pretty-code` for syntax highlighting.

**`data/site.ts`** holds personal config (name, role, intro, socials, resume path). Fields are currently mostly empty strings; components (`hero.tsx`, `layout.tsx`, `social-links.tsx`) fall back to hardcoded defaults when a field is blank, so check both the data file and the component before assuming a value is missing.

## Adding a project

Copy `content/projects/_template.mdx` to `content/projects/<slug>.mdx`, set `draft: false`, fill in frontmatter and body. It appears automatically. Frontmatter is validated — see `frontmatterSchema` in `lib/projects.ts` for the exact shape (`title` and `year` are required; `links`, `tech`, `highlights` etc. have defaults).

## Conventions

- Dark theme only (`color-scheme: dark`). Match the existing muted, monospace-accented aesthetic; reuse theme tokens rather than hardcoding hex colors.
- Respect `prefers-reduced-motion` for any animation — both `globals.css` and the canvas animation in `components/lissajous.tsx` already gate motion on it.
- Components are Server Components by default; add `"use client"` only when needed (e.g. `lissajous.tsx` uses canvas + `useEffect`).
- The `insipration/` directory (note the misspelling) is gitignored scratch material, not part of the app.
