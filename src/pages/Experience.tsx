"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import {
  BriefcaseBusiness,
  Building2,
  Clock6,
  NotepadText,
  TrendingUp,
} from "lucide-react";

const experiences = [
  {
    role: "Jr. Software Engineer",
    company: "Nidus Lab",
    period: "Jan 2026 â€“ Present",
    highlights: [
      "Develop, test, and maintain Laravel-based backend applications.",
      "Build modern Next.js + TypeScript frontend interfaces.",
      "Create and manage RESTful APIs for web and mobile applications.",
      "Integrate third-party services (payment gateways, SMS, email, etc.).",
      "Collaborate with design, product, and QA teams.",
    ],
    logo: "/niduslab.webp",
    link: "https://www.niduslab.com/",
    type: "Full Time",
  },
  {
    role: "Jr. Software Engineer",
    company: "Alor Feri Limited",
    period: "Aug 2025 â€“ Dec 2025",
    highlights: [
      "System analysis & architecture planning",
      "Full-stack feature development",
      "API integration & optimization",
      "Bug fixing & performance improvements",
      "Team collaboration & documentation",
    ],
    logo: "/alorferi.webp",
    link: "https://www.alorferi.com/",
    type: "Full Time",
  },
  {
    role: "Backend Intern",
    company: "Pressply LLC",
    period: "Jan 2024 â€“ May 2024",
    highlights: [
      "REST API development with Express",
      "PostgreSQL & Prisma ORM",
      "Stripe payment integration",
      "Scalable e-commerce backend",
    ],
    logo: "/pressply.webp",
    link: "https://pressply.com/",
    type: "Internship",
  },
  {
    role: "Backend Development Intern",
    company: "Taskirsview",
    period: "Jan 2025 â€“ Feb 2025",
    highlights: [
      "Server-side logic implementation",
      "Database design & optimization",
      "Backend performance tuning",
      "Cross-team collaboration",
    ],
    logo: "/taskirsview.webp",
    link: "https://t.ly/gup-v/",
    type: "Internship",
  },
];

export default function ExperiencePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeExp = experiences[activeIndex];

  return (
    <main className="min-h-screen bg-background text-foreground py-10">
      {/* HEADER â€” CSS fade-in, no framer needed */}
      <section className="container mx-auto px-6 text-center animate-fade-in-up">
        <TypographyH1>
          My <span className="text-primary">Experience</span>
        </TypographyH1>
        <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          A snapshot of my professional journey and hands-on experience in
          software development.
        </TypographyP>
      </section>

      {/* TABS LAYOUT */}
      <section className="container mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* LEFT TABS */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {experiences.map((exp, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${exp.company}-${exp.period}`}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    text-left rounded-xl border transition-all duration-300
                    px-4 py-3 min-w-[220px] md:min-w-0
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-background border-border hover:bg-muted"
                    }
                  `}
                >
                  <p className="font-semibold text-sm md:text-base">
                    {exp.role}{" "}
                    <BriefcaseBusiness
                      className={`inline-block ml-1 h-4 w-4 ${
                        isActive ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                  </p>
                  <p
                    className={`text-xs mt-1 md:block ${
                      isActive ? "block" : "hidden"
                    } ${
                      isActive
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {exp.company}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl border border-border shadow-lg">
                  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <TypographyH2 className="text-xl md:text-2xl">
                        {activeExp.role}
                      </TypographyH2>
                      <TypographyP className="text-muted-foreground mt-1 flex flex-col md:flex-row items-start lg:items-center gap-4">
                        <Building2 className="h-5 w-5 text-primary" />
                        <Badge variant="outline">
                          <a
                            href={activeExp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            {activeExp.company}
                          </a>
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock6 className="h-5 w-5 text-primary" />
                          {activeExp.period}
                        </span>
                      </TypographyP>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit text-primary dark:text-primary-foreground"
                    >
                      {activeExp.type}{" "}
                      <TrendingUp className="inline-block h-4 w-4" />
                    </Badge>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Responsibilities */}
                    <div>
                      <TypographyP className="mb-3 flex items-center gap-2 font-medium">
                        <NotepadText className="h-5 w-5 text-primary" />
                        Key Responsibilities
                      </TypographyP>
                      <ul className="space-y-2 ml-3">
                        {activeExp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[10px_1fr] gap-3 text-sm text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Logo â€” lazy loaded */}
                    <div className="flex justify-center md:justify-end items-center">
                      <a
                        href={activeExp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center"
                      >
                        <img
                          src={activeExp.logo}
                          alt={activeExp.company}
                          className="h-42 w-42 object-contain rounded-xl border border-border p-3 bg-background dark:bg-white hover:-translate-y-1 hover:shadow-md transition-transform"
                          loading="lazy"
                          width={168}
                          height={168}
                        />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

