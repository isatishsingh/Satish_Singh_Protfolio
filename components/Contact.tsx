import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  return (
    <AnimatedSection
      id="contact"
      className="mx-auto max-w-4xl px-6 py-10 md:pb-16 md:pt-12"
    >
      <SectionHeading
        title="Contact"
        subtitle="Open to internships, collaborations, and backend or full-stack roles."
        align="center"
      />

      <div className="glass-card mx-auto max-w-3xl rounded-3xl p-8 md:p-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-4 text-sm transition-all hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail size={18} aria-hidden="true" />
            {contact.email}
          </a>

          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-4 text-sm transition-all hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Phone size={18} aria-hidden="true" />
              {contact.phone}
            </a>
          )}

          {contact.links
            .filter((link) => link.type === "linkedin" || link.type === "github")
            .map((link) => {
              const Icon = link.type === "linkedin" ? Linkedin : Github;
              return (
                <a
                  key={link.type}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-elevated px-4 py-4 text-sm transition-all hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon size={18} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${contact.email}?subject=Hello%20Satish`}
            className="btn-primary"
          >
            Send an email
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
