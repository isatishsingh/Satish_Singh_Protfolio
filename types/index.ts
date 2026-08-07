import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export type Profile = {
  name: string;
  role: string[];
  intro: string;
  about: string;
};

export type ContactLink = {
  label: string;
  href: string;
  type: "email" | "phone" | "linkedin" | "github";
};

export type Contact = {
  email: string;
  phone?: string;
  links: ContactLink[];
};

export type Skill = {
  name: string;
  category?: string;
  icon?: IconType;
  color?: string;
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  bullets: string[];
  githubUrl: string;
  liveUrl?: string;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  details: string[];
};

export type Achievement = {
  title: string;
  description: string;
};

export type DifficultyBreakdown = {
  solved: number;
  total: number;
};

export type LeetCodeStats = {
  profileUrl: string;
  username: string;
  totalSolved: number;
  totalProblems: number;
  easy: DifficultyBreakdown;
  medium: DifficultyBreakdown;
  hard: DifficultyBreakdown;
  contestRating: number;
  globalRanking: number;
  percentile: number;
  contestsAttended: number;
  submissionsPastYear: number;
  activeDays: number;
  maxStreak: number;
  badges: number;
  location: string;
  education: string;
  skillTags: string[];
};

export type SolvedProblem = {
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
};

export type Pattern = {
  id: string;
  name: string;
  solved: number;
  total: number;
  problems: SolvedProblem[];
};

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  iconSize?: number;
  download?: boolean;
};
