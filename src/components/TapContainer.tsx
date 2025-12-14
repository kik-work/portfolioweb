import { BriefcaseBusiness, FolderCode, GalleryVertical, GraduationCap, House, Info, Target } from "lucide-react";
import React, { lazy, Suspense } from "react";



// Lazy load all pages
const Welcome = lazy(() => import("@/pages/Welcome"));
const HomePage = lazy(() => import("@/pages/Homepage"));
const ExperiencePage = lazy(() => import("@/pages/Experience"));
const ProjectPage = lazy(() => import("@/pages/Projects"));
const SkillsPage = lazy(() => import("@/pages/Skills"));
const EducationPage = lazy(() => import("@/pages/Education"));
const AboutPage = lazy(() => import("@/pages/About"));

// Tab titles
export const TabContainers = [
  "",
  "Home",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "About",
];

// Tab icons
export const TabIcons = [
  <GalleryVertical className="h-4 w-4" />,
  <House className="h-4 w-4" />,
  <BriefcaseBusiness className="h-4 w-4" />,
  <FolderCode className="h-4 w-4" />,
  <Target className="h-4 w-4" />,
  <GraduationCap className="h-4 w-4" />,
  <Info className="h-4 w-4" />,
];

// Pages map with Suspense wrapper for lazy loading
export const TabPages: Record<string, React.JSX.Element> = {
  "": (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <Welcome />
    </Suspense>
  ),
  Home: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <HomePage />
    </Suspense>
  ),
  Experience: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <ExperiencePage goToProjects={() => {}} />
    </Suspense>
  ),
  Projects: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <ProjectPage />
    </Suspense>
  ),
  Skills: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <SkillsPage />
    </Suspense>
  ),
  Education: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <EducationPage />
    </Suspense>
  ),
  About: (
    <Suspense fallback={<div className="text-center py-10"></div>}>
      <AboutPage />
    </Suspense>
  ),
};
