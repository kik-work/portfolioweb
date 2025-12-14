import React from "react";

import {
  BriefcaseBusiness,
  FolderCode,
  GalleryVertical,
  GraduationCap,
  House,
  Info,
  Target,
} from "lucide-react";
import HomePage from "@/pages/Homepage";
import ExperiencePage from "@/pages/Experience";
import ProjectPage from "@/pages/Projects";
import SkillsPage from "@/pages/Skills";
import EducationPage from "@/pages/Education";
import AboutPage from "@/pages/About";
import Welcome from "@/pages/Welcome";
// Page components for each tab
export const TabPages: Record<string, React.JSX.Element> = {
  "": <Welcome />,
  Home: <HomePage />,
  Experience: <ExperiencePage goToProjects={() => { }} />,
  Projects: <ProjectPage />,
  Skills: <SkillsPage />,
  Education: <EducationPage />,
  About: <AboutPage />,
};
// Titles of tabs
export const TabContainers = [
  "",
  "Home",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "About",
];

// Icons for each tab (same order)
export const TabIcons = [
  <GalleryVertical className="h-4 w-4" />,
  <House className="h-4 w-4" />,
  <BriefcaseBusiness className="h-4 w-4" />,
  <FolderCode className="h-4 w-4" />,
  <Target className="h-4 w-4" />,
  <GraduationCap className="h-4 w-4" />,
  <Info className="h-4 w-4" />,
];
