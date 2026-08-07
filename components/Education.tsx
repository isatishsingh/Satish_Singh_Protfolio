import { education } from "@/data/education";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  return (
    <AnimatedSection
      id="education"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading title="Education" />
      <div className="space-y-6">
        {education.map((item) => (
          <article
            key={`${item.institution}-${item.startDate}`}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {item.degree}
                  </h3>
                  {item.cgpa && (
                    <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-xs font-semibold text-accent">
                      CGPA: {item.cgpa}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-medium text-accent">{item.institution}</p>
              </div>
              <div className="text-sm text-muted">
                <p>
                  {item.startDate} – {item.endDate}
                </p>
                <p>{item.location}</p>
              </div>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}
