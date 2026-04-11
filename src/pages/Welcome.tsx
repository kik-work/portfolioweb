"use client";

import type { FC } from "react";
import { lazy, Suspense } from "react";
import type { TabPageProps } from "@/components/TapContainer";
import { SpinnerCustom } from "@/components/ui/spinner";

// Lazy load pages — only the active page is ever rendered
const HomePage = lazy(() => import("./Homepage")) as FC<TabPageProps>;
const ExperiencePage = lazy(() => import("./Experience")) as FC<TabPageProps>;
const ProjectPage = lazy(() => import("./Projects")) as FC<TabPageProps>;
const SkillsPage = lazy(() => import("./Skills")) as FC<TabPageProps>;
const EducationPage = lazy(() => import("./Education")) as FC<TabPageProps>;
const AboutPage = lazy(() => import("./About")) as FC<TabPageProps>;

const PAGE_MAP: Record<string, FC<TabPageProps>> = {
  home: HomePage,
  experience: ExperiencePage,
  projects: ProjectPage,
  skills: SkillsPage,
  education: EducationPage,
  about: AboutPage,
};

interface WelcomeProps extends TabPageProps {
  activeTab: string;
}

const Welcome: FC<WelcomeProps> = ({ setActiveTab, activeTab }) => {
  // Fallback to "home" if the activeTab key doesn't match
  const ActivePage = PAGE_MAP[activeTab] ?? HomePage;

  return (
    <section className="max-w-7xl mx-auto px-2 rounded-2xl py-1 overflow-x-hidden backdrop-blur-md border border-slate-200/10 space-y-8">
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <SpinnerCustom />
          </div>
        }
      >
        <ActivePage setActiveTab={setActiveTab} />
      </Suspense>
    </section>
  );
};

export default Welcome;
