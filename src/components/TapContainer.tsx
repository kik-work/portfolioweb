import type { FC } from "react";
import { lazy, Suspense } from "react";
import { BriefcaseBusiness, GraduationCap, House, Info, Mail, Presentation, Target } from "lucide-react";

// Home is bundled with the entry chunk (it holds the LCP content); the rest are lazy.
import Welcome from "@/pages/Welcome";
import { SectionSkeleton } from "@/components/ui/skeleton";

const loaders = [
  () => import("@/pages/Experience"),
  () => import("@/pages/Projects"),
  () => import("@/pages/Skills"),
  () => import("@/pages/Education"),
  () => import("@/pages/About"),
  () => import("@/pages/Contact"),
];
const [ExperienceLazy, ProjectsLazy, SkillsLazy, EducationLazy, AboutLazy, ContactLazy] =
  loaders.map((load) => lazy(load));

// Prefetch the section chunks once the page is idle so scrolling never waits on the network.
if (typeof window !== "undefined") {
  const prefetch = () => loaders.forEach((load) => void load());
  const schedule = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(prefetch, { timeout: 4000 })
      : setTimeout(prefetch, 2000);
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

// Tab titles
export const TabContainers = [
  "Home",
  "Experience",
  "Projects",
  "Skills",
  "Education",
  "About",
  "Contact",
];

// Section IDs — each tab maps to a scrollable <section id="...">
export const TabSectionIds: Record<string, string> = {
  Home:       "section-home",
  Experience: "section-experience",
  Projects:   "section-projects",
  Skills:     "section-skills",
  Education:  "section-education",
  About:      "section-about",
  Contact:    "section-contact",
};

// Tab icons
export const TabIcons = [
  <House className="h-4 w-4" />,
  <BriefcaseBusiness className="h-4 w-4" />,
  <Presentation className="h-4 w-4" />,
  <Target className="h-4 w-4" />,
  <GraduationCap className="h-4 w-4" />,
  <Info className="h-4 w-4" />,
  <Mail className="h-4 w-4" />,
];

// Props type for all tab pages
export interface TabPageProps {
  setActiveTab: (tab: string) => void;
}

// Helper: wrap lazy-loaded component in Suspense and pass typed props
const wrapLazy = (Component: FC<TabPageProps>): FC<TabPageProps> => {
  return (props) => (
    <Suspense fallback={<SectionSkeleton />}>
      <Component {...props} />
    </Suspense>
  );
};

// Export wrapped lazy pages as functional components with props
export const TabPages: Record<string, FC<TabPageProps>> = {
  Home: Welcome,
  Experience: wrapLazy(ExperienceLazy),
  Projects: wrapLazy(ProjectsLazy),
  Skills: wrapLazy(SkillsLazy),
  Education: wrapLazy(EducationLazy),
  About: wrapLazy(AboutLazy),
  Contact: wrapLazy(ContactLazy),
};
