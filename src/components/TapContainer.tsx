import React from "react";

import {
  BriefcaseBusiness,
  FolderCode,
  GraduationCap,
  House,
  Info,
  Target,
} from "lucide-react";
// Dummy components for each tab (replace with your real components)
export const TabPages: Record<string, React.JSX.Element> = {
  Home: <div>Home Page Content</div>,
  Experience: <div>Experience Page Content</div>,
  Projects: <div>Projects Page Content</div>,
  Skills: <div>Skills Page Content</div>,
  Education: <div>Education Page Content</div>,
  About: <div>About Page Content</div>,
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
