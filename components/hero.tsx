import { site } from "@/data/site";
import { SocialLinks } from "./social-links";

export function Hero() {
  return (
    <header className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-mono text-xl font-medium tracking-tight text-fg">
          {site.name || "Akylzhan Sailanbay"}
        </h1>
        <p className="font-mono text-sm text-muted">
          {site.role || "Machine Learning & Software Engineer"}
          {site.location ? ` · ${site.location}` : ""}
        </p>
      </div>

      {site.intro ? (
        <p className="max-w-prose leading-relaxed text-fg/85">{site.intro}</p>
      ) : (
        <p className="max-w-prose leading-relaxed text-muted">
          Hi, my name is Akylzhan. I like building systems & training models. 
        </p>
      )}

      <SocialLinks />
    </header>
  );
}
