import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { AnimatedSection } from "@/components/AnimatedSection";

const iconMap = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  phone: Mail,
} as const;

export function Hero() {
  const socialLinks = contact.links.filter((link) => link.type !== "phone");

  return (
    <AnimatedSection
      id="top"
      className="relative mx-auto max-w-4xl overflow-hidden px-6 pb-12 pt-12 md:pb-16 md:pt-16"
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent-secondary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Available for opportunities
          </p>
          <h1 className="max-w-3xl bg-gradient-to-br from-foreground via-foreground to-muted bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-accent md:text-2xl">
            {profile.role}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/dsa" className="btn-primary">
              View Problem Solving
              <ArrowRight size={16} />
            </Link>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.type];
              return (
                <a
                  key={link.type}
                  href={link.href}
                  target={link.type === "email" ? undefined : "_blank"}
                  rel={link.type === "email" ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="btn-outline"
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Quick snapshot
          </p>
          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <dt className="text-sm text-muted">Focus</dt>
              <dd className="text-sm font-medium">Full-stack & APIs</dd>
            </div>
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <dt className="text-sm text-muted">LeetCode</dt>
              <dd className="text-sm font-medium">459+ solved</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-muted">Location</dt>
              <dd className="text-sm font-medium">Pune, India</dd>
            </div>
          </dl>
        </div>
      </div>
    </AnimatedSection>
  );
}
