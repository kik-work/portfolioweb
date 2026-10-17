// src/pages/Homepage.tsx
import { useEffect, useState, lazy, Suspense } from "react";
import { Card, Card2, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  CircleStar,
  Droplet,
  Facebook,
  FolderCode,
  Github,
  Globe,
  Linkedin,
  Presentation,
  Signature,
  Youtube,
} from "lucide-react";
import {
  TypographyH1,
  TypographyP,
} from "@/components/ui/typography";

const ChartRadialSimple = lazy(() =>
  import("@/components/chart/radial-chart").then((m) => ({ default: m.ChartRadialSimple }))
);
const CareerChart = lazy(() => import("@/components/chart/Career-chart"));
const GitHubContributionChart = lazy(() =>
  import("@/components/chart/Git-clone-chart").then((m) => ({ default: m.GitHubContributionChart }))
);
const VisitorChart = lazy(() =>
  import("@/components/chart/Visitor-chart").then((m) => ({ default: m.VisitorChart }))
);
import { TabSectionIds } from "@/components/TapContainer";
import { scrollToSectionId } from "@/lib/section-scroll";
import { LazyMount } from "@/components/ui/lazy-mount";

interface HomePageProps {
  setActiveTab: (tab: string) => void; // kept for interface compatibility; unused here
}


const roles = [
  {
    hero: "Hi! I'm ",
    subhero: " Khairul Islam",
    icon: <Signature className="h-4 w-4 text-primary" />,
    title: "Tech Enthusiast",
    description:
      "passionate about exploring and contributing to the tech industry through continuous learning and hands-on experience.",
    skills: ["Quick Learner", "Leadership", "Teamwork", "Communication"],
  },
  {
    hero: "Hi! I'm ",
    subhero: " a Software Engineer",
    icon: <FolderCode className="h-4 w-4 text-primary" />,
    title: "Software Engineer",
    description:
      "Building efficient and scalable software solutions by applying engineering principles and best practices.",
    skills: [
      "C++",
      "Firebase",
      "Visual Studio",
      "System Design",
      "Github",
      "Problem Solving",
    ],
  },
  {
    hero: "Hi! I'm ",
    subhero: " a Full Stack Developer",
    icon: <Globe className="h-4 w-4 text-primary" />,
    title: "Full Stack Developer",
    description:
      "Modern web applications using both front-end and back-end technologies to deliver seamless user experiences.",
    skills: [
      "React",
      "Next.js",
      "Laravel",
      "Node.js",
      "TypeScript",
      "Redux",
      "PostgreSQL",
    ],
  },
];

export default function HomePage({ setActiveTab: _setActiveTab }: HomePageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Skip the fade on first paint so the hero text is never mid-animation (LCP/contrast).
  const [hasCycled, setHasCycled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHasCycled(true);
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/khairul_islam_kakon_CV.pdf";
    link.download = "khairul_islam_kakon_CV.pdf";
    link.click();
  };

  const activeRole = roles[activeIndex];
   const scrollToContact = () => scrollToSectionId(TabSectionIds["Contact"]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT — CSS fade-in replaces framer initial animation */}
        <div className="space-y-6">
          <Badge variant="secondary">﷽ 786</Badge>

          {/* Role heading — animates between name and role on interval */}
          <div className="min-h-16">
            <div key={activeRole.title} className={hasCycled ? "animate-fade-in-up" : undefined}>
                <TypographyH1 className="flex flex-wrap items-start gap-2 text-2xl md:text-2xl font-bold tracking-tight">
                  {activeRole.hero}
                  <span className="text-primary inline-block">
                    {activeRole.subhero}
                  </span>
                </TypographyH1>
            </div>
          </div>

          <TypographyP className="text-muted-foreground">
            Software Engineer with practical experience across multiple roles,
            committed to continuous learning and impactful development.
          </TypographyP>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <Button
              size="lg"
              onClick={() => scrollToSectionId(TabSectionIds["Projects"])}
            >
              <Presentation /> View Projects
            </Button>
            <Button size="lg" variant="secondary" onClick={handleDownload}>
              <ArrowDown /> Download CV
            </Button>
          </div>

          {/* Social */}
          <div className="flex gap-4 pt-4">
            <a
              href="https://github.com/kik-work"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/khairul-islam-kakon-12618222a/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr"
              aria-label="Facebook profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
              <a
              href="https://www.youtube.com/@kikKakon"
              aria-label="YouTube channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
              <a
               href="#"
              aria-label="Blood donation contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToContact();
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Droplet className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
          </div>
        </div>

        {/* PROFILE CARD — CSS fade on role toggle */}
        <div className="order-first md:order-last">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex justify-end items-center pb-0">
              <Badge variant="default" className="text-xs px-3">
                <CircleStar /> 1.10+ Years Experience
              </Badge>
            </CardHeader>

            <CardContent className="p-4 flex flex-col items-center text-center gap-4">
              <div className="w-64 h-64 rounded-2xl overflow-hidden bg-muted shadow-md">
                <img
                  src="/kakon_new_pp-640.webp"
                  srcSet="/kakon_new_pp-320.webp 320w, /kakon_new_pp-480.webp 480w, /kakon_new_pp-640.webp 640w"
                  sizes="256px"
                  alt="Khairul Islam"
                  className="w-full h-full object-cover object-center"
                  width={256}
                  height={256}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <div key={activeRole.title} className={hasCycled ? "animate-fade-in-up" : undefined}>
                  <div className="flex items-center mt-2 justify-center gap-2">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">{activeRole.title}</h2>
                    {activeRole.icon}
                  </div>
                  <TypographyP className="text-sm text-muted-foreground mb-2">
                    {activeRole.description}
                  </TypographyP>
                  <div className="flex gap-2 flex-wrap justify-center pt-2">
                    {activeRole.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ANALYTICS — lazy-loaded so charts don't block FCP */}
      <LazyMount minHeight={640} rootMargin="0px">
        <section className="container mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Suspense fallback={<div className="h-[600px] rounded-2xl bg-muted animate-pulse" />}>
            <CareerChart />
          </Suspense>
          <Suspense fallback={<div className="h-[600px] rounded-2xl bg-muted animate-pulse" />}>
            <ChartRadialSimple />
          </Suspense>
        </section>
      </LazyMount>

      {/* GITHUB CONTRIBUTION */}
      <LazyMount minHeight={320}>
        <section className="mb-4 pb-4 my-12 container mx-auto px-6 rounded-2xl">
          <Suspense fallback={<div className="h-72 rounded-2xl bg-muted animate-pulse" />}>
            <GitHubContributionChart />
          </Suspense>
        </section>
      </LazyMount>

      {/* VISITOR CHART */}
      <LazyMount minHeight={360}>
        <section className="mb-4 pb-4 container mx-auto px-6 rounded-2xl">
          <Suspense fallback={<div className="h-80 rounded-2xl bg-muted animate-pulse" />}>
            <VisitorChart />
          </Suspense>
        </section>
      </LazyMount>
    </main>
  );
}
