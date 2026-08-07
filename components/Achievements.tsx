import { achievements } from "@/data/achievements";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Trophy, Award } from "lucide-react";

export function Achievements() {
  return (
    <AnimatedSection
      id="achievements"
      className="mx-auto max-w-4xl px-6 py-10 md:py-12"
    >
      <SectionHeading
        title="Achievements & Leadership"
        subtitle="Open source contributions, competitive programming, and leadership roles."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((item, index) => {
          const Icon = index === 0 ? Trophy : Award;
          return (
            <div
              key={item.title}
              className="glass-card flex flex-col justify-between rounded-3xl p-6 md:p-8"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
