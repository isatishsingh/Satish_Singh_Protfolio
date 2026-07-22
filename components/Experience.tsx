import { experience } from "@/data/experience";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading title="Experience" />
      <div className="space-y-6">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.startDate}`}
            className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8"
          >
            <div
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent to-accent-secondary"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground md:text-xl">
                  {item.role}
                </h3>
                <p className="mt-1 font-medium text-accent">{item.company}</p>
              </div>
              <div className="text-sm text-muted">
                <p>
                  {item.startDate} – {item.endDate}
                </p>
                <p>{item.location}</p>
              </div>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
