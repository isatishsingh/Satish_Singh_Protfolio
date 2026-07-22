import type { NavItem } from "@/types";
import { FileDown } from "lucide-react";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Problem Solving", href: "/dsa" },
  { label: "Contact", href: "#contact" },
  { label: "Resume",
    href: "/resume/Satish_Singh_Resume.pdf",
    icon: FileDown,
    download: true,
    iconSize: 16,
  },
];
