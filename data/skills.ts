import type { Skill } from "@/types";
import { DiJava, DiScrum } from "react-icons/di";
import { FcLinux } from "react-icons/fc";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiSpringboot,
  SiJsonwebtokens,
  SiSqlite,
  SiGithub,
  SiGithubactions,
  SiPostman,
  SiPython,
  SiPrisma,
  SiRedux,
  SiAxios,
  SiSocketdotio,
  SiLinux,
} from "react-icons/si";

export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "Languages", icon: SiTypescript, color: "#3178C6" },
  { name: "C++", category: "Language", icon: SiCplusplus, color: "#00599C" },
  { name: "Java", category: "Language", icon: DiJava, color: "#007396" },
  { name: "Python", category: "Language", icon: SiPython, color: "#3776AB" },

  // Frontend
  { name: "React.js", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Redux", category: "State Management", icon: SiRedux, color: "#2088FF" },
  { name: "HTML5", category: "Frontend", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", category: "Frontend", icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", category: "CSS Framework", icon: SiTailwindcss, color: "#06B6D4" },
  
  // Backend
  // { name: "Spring Boot", category: "Backend & APIs", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Node.js", category: "Backend & APIs", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", category: "Backend & APIs", icon: SiExpress, color: "#FFFFFF" },
  // { name: "Socket.io", category: "Websocket", icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "RESTful API Design", category: "Backend & APIs" },
  { name: "Axios", category: "HTTP Client", icon: SiAxios, color: "#2088FF" },
  { name: "Prisma", category: "ORM", icon: SiPrisma, color: "#FFFFFF" },
  // { name: "MVC", category: "Backend & APIs" },
  { name: "JWT Auth", category: "Backend & APIs", icon: SiJsonwebtokens, color: "#FB015B" },
  // { name: "Design Patterns", category: "Design Principles" },
  
  // Database
  { name: "PostgreSQL", category: "Databases", icon: SiPostgresql, color: "#4169E1" },
  // { name: "MongoDB", category: "Databases", icon: SiMongodb, color: "#47A248" },
  { name: "SQL", category: "Databases", icon: SiSqlite, color: "#FFFFFF" },
  
  // Tools
  { name: "Git & GitHub", category: "Tools", icon: SiGithub, color: "#FFFFFF" },
  // { name: "GitHub Actions", category: "Tools", icon: SiGithubactions, color: "#2088FF" },
  { name: "Postman", category: "Tools", icon: SiPostman, color: "#FF6C37" },
  // { name: "Linux", category: "Operating System", icon: FcLinux, color: "#FFC107" },
  { name: "Docker", category: "Tools", icon: SiDocker, color: "#2496ED" },
  // { name: "Agile / Scrum", category: "Practices", icon: DiScrum, color: "#6DB33F" },
  { name: "DSA", category: "Practices" },
];
