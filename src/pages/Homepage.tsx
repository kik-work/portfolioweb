// src/pages/Homepage.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, CircleStar, Facebook, FolderCode, Github, Globe, Linkedin,  Presentation, Signature } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";
import { ChartRadialSimple } from "@/components/chart/radial-chart";
import CareerChart from "@/components/chart/Career-chart";
import { GitHubContributionChart } from "@/components/chart/Git-clone-chart";
import { TabContainers } from "@/components/TapContainer";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

/* 🔁 ROTATING CONTENT */
const roles = [
  {
    hero: "Hi! I’m ",
    subhero: " Khairul Islam",
    icon: <Signature className="h-4 w-4 text-primary" />,
    title: "Tech Enthusiast",
    description:
      "passionate about exploring and contributing to the tech industry through continuous learning and hands-on experience.",
    skills: [
      "Quick Learner",
      "leadership",
      "Teamwork",
      "Communication",


    ],
  },
  {
    hero: "Hi! I’m ",
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
    hero: "Hi! I’m ",
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
      <section className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge variant="secondary" className="w-fits">
            786
          </Badge>

          {/* 🔁 HERO TOGGLE */}
          <div className="min-h-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.hero}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <TypographyH1 className="flex flex-col lg:flex-row items-center gap-2 text-start text-2xl md:text-2xl font-bold tracking-tight">
                  {/* {activeRole.hero} <span className="text-primary">{activeRole.subhero}</span> */}
                  Hi! I’m <motion.span
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
            Software Engineer with practical experience across multiple roles, committed to continuous learning and impactful development.
          </TypographyP>

          {/* CTA BUTTONS */}
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
              <Presentation />  View Projects
            </Button>

            <Button size="lg" variant="secondary" onClick={handleDownload}>
              <ArrowDown />  Download CV
            </Button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 pt-4">
            <a href="https://github.com/kik-work" target="_blank" rel="noopener noreferrer" >
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary hover:scale-110 cursor-pointer transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/khairul-islam-kakon-12618222a/" target="_blank" rel="noopener noreferrer" >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary hover:scale-110 cursor-pointer transition-colors" />
            </a>
            <a href="https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary hover:scale-110 cursor-pointer transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-first md:order-last"
        >
          <Card className="rounded-2xl shadow-lg ">
            <CardHeader className="flex justify-end items-center pb-0">
              <Badge variant="default" className="text-xs px-3 ">
                <CircleStar /> 1+ Year Experience
              </Badge>
            </CardHeader>

            <CardContent className="p-4 flex flex-col items-center text-center gap-4">
              <div className="w-32 h-36 rounded-full overflow-hidden bg-muted shadow-md">
                <img
                  src="/minet.jpg"
                  alt="Khairul Islam"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* 🔁 ROLE CARD TOGGLE */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className=""
                >
                  <div className=" flex items-center mt-2 justify-center gap-2">
                    <TypographyH3 className="">  {activeRole.title} </TypographyH3>
                    {activeRole.icon}
                  </div>

                  <TypographyP className="text-sm text-muted-foreground mb-2 ">
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
        </motion.div>
      </section>

      {/* ANALYTICS & SKILLS */}
      <section className="container mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card className="p-6   rounded-2xl shadow-lg">
          <CareerChart />
        </Card>

        <Card className="rounded-2xl shadow-lg p-6 ">
          <ChartRadialSimple />
        </Card>
      </section>

      {/* GITHUB CONTRIBUTION */}
      <section className="mb-4 pb-4 my-12 container mx-auto px-6  rounded-2xl">
        <Card className="rounded-2xl shadow-lg p-6  " >
          <GitHubContributionChart />
        </Card>
      </section>
    </main>
  );
}
