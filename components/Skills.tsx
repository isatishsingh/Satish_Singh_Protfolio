"use client";
import { skills } from "@/data/skills";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { motion } from "framer-motion";

export function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="mx-auto max-w-5xl px-6 py-10 md:py-12"
    >
      {/* Grid */}
      <div
        className="
          absolute inset-0 -z-20 opacity-20
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* Background Glow */}
      <div
        className="
          absolute
          inset-0
          -z-10
          bg-[radial-gradient(circle_at_top_left,#0ea5e922,transparent_40%)]
        "
      />

      <div className="mx-auto mt-12 max-w-4xl">
        <SectionHeading
          title="Skills & Tools"
          subtitle="Technologies and tools I use to build reliable software."
          className="relative overflow-hidden"
        />
      </div>

      <div className="mt-12 grid justify-center gap-4 [grid-template-columns:repeat(auto-fit,minmax(210px,210px))]">
        {skills.map((skill, key) => {
          const Icon = skill.icon;

          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-[62px] items-center
                        rounded-xl border border-slate-200 bg-white px-3.5 py-2 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_8px_24px_rgba(14,165,233,0.12)] 
                        dark:border-slate-700 dark:bg-slate-900/60 dark:shadow-none dark:hover:border-cyan-400/40 dark:hover:shadow-[0_8px_24px_rgba(34,211,238,0.15)] ">
              <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800/70">
                {Icon && (
                  <Icon
                    className="text-[22px]"
                    style={{ color: skill.color }}
                  />
                )}
              </div>

              <div>
                <h3 className="text-[17px] font-semibold  text-slate-900 dark:text-white">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {skill.category}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedSection>
  );
}