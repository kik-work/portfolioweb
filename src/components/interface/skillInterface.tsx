import {
  Languages,
  Library,
  Grid2X2Check,
  Database,
  Settings,
} from "lucide-react";

/* ---------- Types ---------- */

export type SkillLevel = "Basic" | "Intermediate" | "Advanced";

export interface SkillItem {
  name: string;
  icon: string;
  level: "Basic" | "Intermediate" | "Advanced";
  rating: number; // 1–10
}

export interface SkillSectionProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  skills: SkillItem[];
}

export interface SkillTab {
  id: string;
  label: string;
  icon: React.ElementType;
  skills: SkillItem[];
}

/* ---------- Data ---------- */

export const SKILL_TABS: SkillTab[] = [
  {
    id: "languages",
    label: "Languages",
    icon: Languages,
    skills: [
      {
        name: "JavaScript",
        icon: "/javascript.svg",
        level: "Advanced",
        rating: 8.7,
      },
      { name: "PHP", icon: "/php.svg", level: "Advanced", rating: 8 },
      { name: "C++", icon: "/c.svg", level: "Intermediate", rating: 7.5 },
      { name: "Python", icon: "/python.svg", level: "Intermediate", rating: 7 },
      { name: "C#", icon: "/csharp.jpg", level: "Basic", rating: 6 },
      { name: "Java", icon: "/java.svg", level: "Basic", rating: 6 },
    ],
  },
  {
    id: "frameworks",
    label: "Libraries & Frameworks",
    icon: Library,
    skills: [
      { name: "React", icon: "/react.svg", level: "Advanced", rating: 8 },
      {
        name: "Next.js",
        icon: "/nextjs.Default",
        level: "Advanced",
        rating: 8,
      },
      { name: "Express", icon: "/express.png", level: "Advanced", rating: 8 },
      {
        name: "Laravel",
        icon: "/laravel.png",
        level: "Intermediate",
        rating: 7,
      },
      { name: "NestJS", icon: "/nestjs.svg", level: "Intermediate", rating: 7 },
      { name: "Django", icon: "/django.svg", level: "Basic", rating: 6 },
    ],
  },
  {
    id: "technologies",
    label: "Technologies",
    icon: Grid2X2Check,
    skills: [
      {
        name: "Firebase",
        icon: "/firebase-1.svg",
        level: "Advanced",
        rating: 8,
      },
      { name: "Node.js", icon: "/nodejs.svg", level: "Advanced", rating: 8 },
      { name: "Redux", icon: "/redux.svg", level: "Intermediate", rating: 7 },
      {
        name: "Prisma",
        icon: "/prisma-2.svg",
        level: "Intermediate",
        rating: 7,
      },
      { name: "Stripe", icon: "/stripe-4.svg", level: "Basic", rating: 6 },
      {
        name: "TanStack",
        icon: "/tanstack.png",
        level: "Advanced",
        rating: 7,
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: Database,
    skills: [
      {
        name: "PostgreSQL",
        icon: "/postgresql.svg",
        level: "Advanced",
        rating: 8,
      },
      { name: "MySQL", icon: "/mysql-3.svg", level: "Intermediate", rating: 7 },
      {
        name: "MongoDB",
        icon: "/mongodb.svg",
        level: "Intermediate",
        rating: 6,
      },
      {
        name: "Supavase",
        icon: "/supabase.png",
        level: "Basic",
        rating: 8,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Settings,
    skills: [
      { name: "VS Code", icon: "/vscode.svg", level: "Advanced", rating: 8 },
      { name: "Git Bash", icon: "/git-bash.svg", level: "Advanced", rating: 8 },
      {
        name: "Postman",
        icon: "/postman.svg",
        level: "Intermediate",
        rating: 7,
      },
      {
        name: "Visual Studio",
        icon: "/visual-studio-2013.svg",
        level: "Intermediate",
        rating: 7,
      },
    ],
  },
];
