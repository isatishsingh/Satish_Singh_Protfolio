import {
  User,
  Code2,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Trophy,
  BrainCircuit,
  Mail,
  FileDown,
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Achievements", href: "#achievements", icon: Trophy },
  { label: "Problem Solving", href: "/dsa", icon: BrainCircuit },
  { label: "Contact", href: "#contact", icon: Mail },
  {
    label: "Resume",
    href: "/resume/Satish_Singh_Resume.pdf",
    download: true,
    icon: FileDown,
  },
];