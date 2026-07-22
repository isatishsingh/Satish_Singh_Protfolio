import { ExternalLink, Github, GraduationCap, Linkedin, MapPin } from "lucide-react";
import { contact } from "@/data/contact";
import { leetcodeStats } from "@/data/leetcode";
import { profile } from "@/data/profile";

export function DsaSidebar() {
  const { username, profileUrl, location, education, skillTags } = leetcodeStats;
  const github = contact.links.find((l) => l.type === "github");
  const linkedin = contact.links.find((l) => l.type === "linkedin");

  return (
    <aside className="dsa-card sticky top-24 p-6">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-secondary/20 to-accent/20 text-3xl font-bold text-accent">
        {profile.name
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </div>

      <div className="mt-5 text-center">
        <h1 className="text-xl font-semibold text-foreground">{profile.name}</h1>
        <p className="mt-1 text-sm text-muted">@{username}</p>
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-5 w-full justify-center"
      >
        View on LeetCode
        <ExternalLink size={14} />
      </a>

      <ul className="mt-6 space-y-3 text-sm text-muted">
        <li className="flex items-center gap-2">
          <MapPin size={15} className="shrink-0 text-accent" />
          {location}
        </li>
        <li className="flex items-center gap-2">
          <GraduationCap size={15} className="shrink-0 text-accent" />
          {education}
        </li>
        {github && (
          <li className="flex items-center gap-2">
            <Github size={15} className="shrink-0 text-accent" />
            <a href={github.href} target="_blank" rel="noopener noreferrer" className="truncate hover:text-accent">
              {github.href.replace("https://", "")}
            </a>
          </li>
        )}
        {linkedin && (
          <li className="flex items-center gap-2">
            <Linkedin size={15} className="shrink-0 text-accent" />
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="truncate hover:text-accent">
              {linkedin.href.replace("https://", "")}
            </a>
          </li>
        )}
      </ul>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Skills</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skillTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-surface-elevated px-2.5 py-1 text-xs text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
