import type { FC } from "react";
import { lazy, Suspense } from "react";
import { BriefcaseBusiness, FolderCode, GraduationCap, House, Info, Target } from "lucide-react";

// Lazy-loaded pages
const HomeLazy = lazy(() => import("@/pages/Welcome"));
const ExperienceLazy = lazy(() => import("@/pages/Experience"));
const ProjectsLazy = lazy(() => import("@/pages/Projects"));
const SkillsLazy = lazy(() => import("@/pages/Skills"));
const EducationLazy = lazy(() => import("@/pages/Education"));
const AboutLazy = lazy(() => import("@/pages/About"));

// Tab titles
export const TabContainers = [
  "Home",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "About",
];

// Tab icons
export const TabIcons = [
  <House className="h-4 w-4" />,
  <BriefcaseBusiness className="h-4 w-4" />,
  <FolderCode className="h-4 w-4" />,
  <Target className="h-4 w-4" />,
  <GraduationCap className="h-4 w-4" />,
  <Info className="h-4 w-4" />,
];

// Props type for all tab pages
export interface TabPageProps {
  setActiveTab: (tab: string) => void;
}

// Helper: wrap lazy-loaded component in Suspense and pass typed props
const wrapLazy = (Component: FC<TabPageProps>): FC<TabPageProps> => {
  return (props) => (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <Component {...props} />
    </Suspense>
  );
};

// Export wrapped lazy pages as functional components with props
export const TabPages: Record<string, FC<TabPageProps>> = {
  Home: wrapLazy(HomeLazy),
  Experience: wrapLazy(ExperienceLazy),
  Projects: wrapLazy(ProjectsLazy),
  Skills: wrapLazy(SkillsLazy),
  Education: wrapLazy(EducationLazy),
  About: wrapLazy(AboutLazy),
};
