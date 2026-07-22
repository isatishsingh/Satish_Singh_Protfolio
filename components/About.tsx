import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function About() {
  return (
    <AnimatedSection
      id="about"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading title="About" />
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          {profile.about}
        </p>
      </div>
    </AnimatedSection>
  );
}
