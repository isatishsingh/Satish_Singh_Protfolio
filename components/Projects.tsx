import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

function isValidUrl(url?: string) {
  return url && url !== "TODO_FILL_IN" && url.startsWith("http");
}

export function Projects() {
  return (
    <AnimatedSection
      id="projects"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading title="Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="glass-card group flex flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8"
          >
            <div className="mb-4 inline-flex w-fit rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Featured Project
            </div>
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {project.description}
            </p>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted">
              {project.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-surface-elevated px-2.5 py-1 text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github size={16} aria-hidden="true" />
                View Code
              </a>
              {isValidUrl(project.liveUrl) && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  View Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
