// src/pages/Homepage.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  CircleStar,
  Facebook,
  FolderCode,
  Github,
  Globe,
  Linkedin,
  Presentation,
  Signature,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { ChartRadialSimple } from "@/components/chart/radial-chart";
import CareerChart from "@/components/chart/Career-chart";
import { GitHubContributionChart } from "@/components/chart/Git-clone-chart";
import { TabContainers } from "@/components/TapContainer";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
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

export default function HomePage({ setActiveTab }: HomePageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/KhairulIslamKakonCV.pdf";
    link.download = "Kik_Kakon_CV.pdf";
    link.click();
  };

  const activeRole = roles[activeIndex];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT — CSS fade-in replaces framer initial animation */}
        <div className="space-y-6 animate-fade-in-up">
          <Badge variant="secondary">786</Badge>

          {/* Role heading — keep AnimatePresence for the toggle effect */}
          <div className="min-h-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TypographyH1 className="flex flex-col lg:flex-row items-center gap-2 text-start text-2xl md:text-2xl font-bold tracking-tight">
                  Hi! I&apos;m{" "}
                  <motion.span
                    className="text-primary inline-block"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    Khairul Islam
                  </motion.span>
                </TypographyH1>
              </motion.div>
            </AnimatePresence>
          </div>

          <TypographyP className="text-muted-foreground">
            Software Engineer with practical experience across multiple roles,
            committed to continuous learning and impactful development.
          </TypographyP>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <Button
              size="lg"
              onClick={() => {
                setActiveTab(TabContainers[2]);
                setTimeout(() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
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
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/khairul-islam-kakon-12618222a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
            <a
              href="https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary hover:-translate-y-0.5 cursor-pointer transition-transform" />
            </a>
          </div>
        </div>

        {/* PROFILE CARD — CSS fade-in, keep AnimatePresence for role toggle */}
        <div className="order-first md:order-last animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex justify-end items-center pb-0">
              <Badge variant="default" className="text-xs px-3">
                <CircleStar /> 1+ Year Experience
              </Badge>
            </CardHeader>

            <CardContent className="p-4 flex flex-col items-center text-center gap-4">
              <div className="w-32 h-36 rounded-full overflow-hidden bg-muted shadow-md">
                <img
                  src="/minet.jpg"
                  alt="Khairul Islam"
                  className="w-full h-full object-cover object-top"
                  width={128}
                  height={144}
                  loading="eager"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center mt-2 justify-center gap-2">
                    <TypographyH3>{activeRole.title}</TypographyH3>
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
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ANALYTICS — CSS fade-in replaces framer */}
      <section className="container mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <Card className="p-6 rounded-2xl shadow-lg">
          <CareerChart />
        </Card>
        <Card className="rounded-2xl shadow-lg p-6">
          <ChartRadialSimple />
        </Card>
      </section>

      {/* GITHUB CONTRIBUTION */}
      <section className="mb-4 pb-4 my-12 container mx-auto px-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <Card className="rounded-2xl shadow-lg p-6">
          <GitHubContributionChart />
        </Card>
      </section>
    </main>
  );
}
