import type { FC } from "react";
import { lazy, Suspense } from "react";
import type { TabPageProps } from "@/components/TapContainer";
import { SpinnerCustom } from "@/components/ui/spinner";

// Lazy load all pages with proper props type
const HomePage = lazy(() => import("./Homepage")) as FC<TabPageProps>;
const ExperiencePage = lazy(() => import("./Experience")) as FC<TabPageProps>;
const ProjectPage = lazy(() => import("./Projects")) as FC<TabPageProps>;
const SkillsPage = lazy(() => import("./Skills")) as FC<TabPageProps>;
const EducationPage = lazy(() => import("./Education")) as FC<TabPageProps>;
const AboutPage = lazy(() => import("./About")) as FC<TabPageProps>;

// Optional default wrapper component
const Welcome: FC<TabPageProps> = ({ setActiveTab }) => {
  return (
    <section className="max-w-7xl mx-auto px-2 rounded-2xl py-1 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/10 space-y-8">
      <Suspense fallback={<div className="text-center py-10"> <SpinnerCustom /></div>}>
        <HomePage setActiveTab={setActiveTab} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"><SpinnerCustom /> </div>}>
        <ExperiencePage setActiveTab={setActiveTab} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"> <SpinnerCustom /></div>}>
        <ProjectPage setActiveTab={setActiveTab} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"> <SpinnerCustom /></div>}>
        <SkillsPage setActiveTab={setActiveTab} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"> <SpinnerCustom /></div>}>
        <EducationPage setActiveTab={setActiveTab} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"> <SpinnerCustom /></div>}>
        <AboutPage setActiveTab={setActiveTab} />
      </Suspense>
    </section>
  );
};

export default Welcome;
