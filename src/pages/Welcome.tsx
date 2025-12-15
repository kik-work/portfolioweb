import  { lazy, Suspense } from "react";

// Lazy load all pages
const HomePage = lazy(() => import("./Homepage"));
const ExperiencePage = lazy(() => import("./Experience"));
const ProjectPage = lazy(() => import("./Projects"));
const EducationPage = lazy(() => import("./Education"));
const AboutPage = lazy(() => import("./About"));
const SkillsPage = lazy(() => import("./Skills"));

const Welcome = () => {
  return (
    <section className="max-w-7xl mx-auto px-2 rounded-2xl py-1 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/10">
      <Suspense fallback={<div className="text-center py-10"></div>}>
        <HomePage />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"></div>}>
        <ExperiencePage  />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">=</div>}>
        <ProjectPage />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"></div>}>
        <SkillsPage />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"></div>}>
        <EducationPage />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10"></div>}>
        <AboutPage />
      </Suspense>
    </section>
  );
};

export default Welcome;
