import type { FC } from "react";
import { lazy, Suspense, useState, useEffect } from "react";
import type { TabPageProps } from "@/components/TapContainer";
import { SpinnerCustom } from "@/components/ui/spinner";

// Lazy load pages
const HomePage = lazy(() => import("./Homepage")) as FC<TabPageProps>;
const ExperiencePage = lazy(() => import("./Experience")) as FC<TabPageProps>;
const ProjectPage = lazy(() => import("./Projects")) as FC<TabPageProps>;
const SkillsPage = lazy(() => import("./Skills")) as FC<TabPageProps>;
const EducationPage = lazy(() => import("./Education")) as FC<TabPageProps>;
const AboutPage = lazy(() => import("./About")) as FC<TabPageProps>;

const Welcome: FC<TabPageProps> = ({ setActiveTab }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 500); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-2 rounded-2xl py-1  backdrop-blur-md border border-slate-200/10 space-y-8">
      {showSpinner ? (
        <div className="flex justify-center py-20">
          <SpinnerCustom />
        </div>
      ) : (
        <Suspense fallback={
          <div className="flex justify-center py-20">
            <SpinnerCustom />
          </div>
        }>
          <HomePage setActiveTab={setActiveTab} />
          <ExperiencePage setActiveTab={setActiveTab} />
          <ProjectPage setActiveTab={setActiveTab} />
          <SkillsPage setActiveTab={setActiveTab} />
          <EducationPage setActiveTab={setActiveTab} />
          <AboutPage setActiveTab={setActiveTab} />
        </Suspense>
      )}
    </section>
  );
};

export default Welcome;
