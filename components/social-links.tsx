import type { ComponentType, SVGProps } from "react";
import { site } from "@/data/site";
import {
  FileIcon,
  GitHubIcon,
  LetterboxdIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
} from "./icons";

type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function SocialLinks() {
  const { email, socials, resume } = site;

  const links: SocialLink[] = [
    socials.github && {
      label: "GitHub",
      href: socials.github,
      Icon: GitHubIcon,
    },
    socials.linkedin && {
      label: "LinkedIn",
      href: socials.linkedin,
      Icon: LinkedInIcon,
    },
    resume && { label: "CV", href: resume, Icon: FileIcon },
    socials.letterboxd && {
      label: "Letterboxd",
      href: socials.letterboxd,
      Icon: LetterboxdIcon,
    },
    socials.x && { label: "X", href: socials.x, Icon: XIcon },
    email && { label: "Email", href: `mailto:${email}`, Icon: MailIcon },
  ].filter(Boolean) as SocialLink[];

  if (links.length === 0) return null;

  return (
    <nav className="flex flex-wrap items-center gap-4">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="text-muted transition-colors hover:text-fg"
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
}
