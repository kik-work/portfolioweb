import React from "react";

import {
  BriefcaseBusiness,
  FolderCode,
  GraduationCap,
  House,
  Info,
  Target,
} from "lucide-react";
import HomePage from "@/pages/Homepage";
import ExperiencePage from "@/pages/Experience";
import ProjectsPage from "@/pages/Projects";
import SkillsPage from "@/pages/Skills";
import EducationPage from "@/pages/Education";
import AboutPage from "@/pages/About";
// Page components for each tab
export const TabPages: Record<string, React.JSX.Element> = {
  Home: <HomePage/>,
  Experience: <ExperiencePage goToProjects={() => {}} />,
  Projects: <ProjectsPage/>,
  Skills: <SkillsPage/>,
  Education: <EducationPage/>,
  About: <AboutPage/>,
};
// Titles of tabs
export const TabContainers = [
  "Home",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "About",
];

// Icons for each tab (same order)
export const TabIcons = [
  <House className="h-4 w-4" />,
  <BriefcaseBusiness className="h-4 w-4" />,
  <FolderCode className="h-4 w-4"/>,
  <Target className="h-4 w-4" />,
  <GraduationCap className="h-4 w-4" />,
  <Info className="h-4 w-4" />,
];
