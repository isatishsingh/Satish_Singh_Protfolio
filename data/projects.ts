import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Capital Bridge",
    description:
      "Full-stack enterprise application with Java, Spring Boot, role-based security, normalized relational storage, and Docker containerization.",
    techStack: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "JWT",
      "React.js",
      "Docker",
    ],
    bullets: [
      "Designed and built 20+ REST API endpoints with full CRUD operations in Java and Spring Boot, supporting a full-stack application with 3 distinct user roles and role-based service layers.",
      "Implemented JWT-based authentication and authorization using object-oriented design principles and MVC architecture across backend services to enforce secure, role-based access.",
      "Designed normalized relational schemas in PostgreSQL, validated API behavior with Postman, and containerized services with Docker for reproducible, scalable deployment.",
    ],
    githubUrl: "https://github.com/isatishsingh",
    liveUrl: "https://capitalbridgeapp.vercel.app/",
  },
  {
    title: "Tourpedia",
    description:
      "Scalable travel itinerary platform featuring Node.js & Express REST APIs, MongoDB document storage, and dynamic React frontend.",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React.js",
      "Docker",
    ],
    bullets: [
      "Built a scalable RESTful backend service from scratch using Node.js and Express.js, independently designing the application architecture and REST API endpoints.",
      "Used MongoDB to store user profiles, travel preferences, and itinerary data, leveraging its flexible document model for dynamic travel information.",
      "Integrated a React.js frontend with backend APIs for dynamic itinerary generation and visualization, and containerized the application using Docker for consistent development and deployment.",
    ],
    githubUrl: "https://github.com/isatishsingh",
  },
];
