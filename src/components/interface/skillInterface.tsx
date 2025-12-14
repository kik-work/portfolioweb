export interface SkillItem {
  name: string;
  icon: string;
  level: "Basic" | "Intermediate" | "Advanced";
  rating: number; // 1–10
}

export interface SkillSectionProps {
  title: string;
  description?: string;
  skills: SkillItem[];
}
