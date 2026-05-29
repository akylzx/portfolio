export function TechTags({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted">
      {tech.map((item) => (
        <li key={item} className="rounded border border-border px-2 py-0.5">
          {item}
        </li>
      ))}
    </ul>
  );
}
