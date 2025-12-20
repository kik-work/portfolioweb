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
