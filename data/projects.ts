import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Capital Bridge",
    description:
      "Full-stack financial platform with role-based access, secure authentication, and containerized deployment.",
    techStack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "JWT",
      "JUnit",
      "React.js",
      "Docker",
    ],
    bullets: [
      "Designed and built 20+ well-tested REST API endpoints with full CRUD operations supporting 3 user roles",
      "Implemented JWT-based authentication and authorization with role-based access",
      "Designed normalized PostgreSQL schemas, containerized with Docker",
    ],
    githubUrl: "https://github.com/isatishsingh",
    liveUrl: "https://capitalbridgeapp.vercel.app/",
  },
  {
    title: "Tourpedia",
    description:
      "Travel planning platform combining relational and document data stores with a recommendation engine.",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "React.js",
      "Docker",
    ],
    bullets: [
      "Built a scalable RESTful backend from scratch, independently designing service architecture and API contracts",
      "Combined PostgreSQL/Prisma and MongoDB for relational and schema-less data",
      "Integrated a React.js frontend for real-time itinerary visualization",
      "Researched and applied a BERT-based recommendation model",
    ],
    githubUrl: "https://github.com/isatishsingh",
    liveUrl: "TODO_FILL_IN",
  },
];
