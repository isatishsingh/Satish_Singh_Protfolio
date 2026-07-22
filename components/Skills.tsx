import { skills } from "@/data/skills";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading
        title="Coding Skills"
        subtitle="Technologies and tools I use to build reliable software."
      />
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li key={skill.name}>
            <span className="skill-pill inline-block rounded-full px-4 py-2.5 text-sm text-foreground">
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
