"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import type { SkillSectionProps } from "@/components/interface/skillInterface";
import AdditionalSkillPage from "@/components/AdditionalSkill";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
const levelStyles: Record<"Basic" | "Intermediate" | "Advanced", string> = {
  Basic: "bg-muted text-muted-foreground",
  Intermediate: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Advanced: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const SkillSection = ({ title, description, skills }: SkillSectionProps) => (
  <motion.div variants={item}>
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold bg-linear-to-r from-indigo-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent>
        {/* Skill blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="group rounded-xl border bg-muted/40 hover:bg-muted transition-all">
                <CardContent className="flex items-center gap-4 p-4">
                  {/* Icon block */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background border shadow-sm group-hover:scale-105 transition">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      width={28}
                      height={28}
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    {/* Name + Level */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <Badge
                        className={`text-xs ${levelStyles[skill.level]}`}
                        variant="secondary"
                      >
                        {skill.level}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="space-y-1">
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${skill.rating * 10}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {skill.rating}/10
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Skills() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-3">
          <TypographyH1>
            My <span className="text-primary">Skills</span>
          </TypographyH1>
          <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Technologies, tools, and professional skills I use to build modern
            applications.{" "}
          </TypographyP>
        </motion.div>

        {/* Languages */}
        <SkillSection
          title="Languages"
          skills={[
            {
              name: "JavaScript",
              icon: "/javascript.svg",
              level: "Advanced",
              rating: 9,
            },
            {
              name: "Python",
              icon: "/python.svg",
              level: "Intermediate",
              rating: 7,
            },
            {
              name: "C++",
              icon: "/c.svg",
              level: "Intermediate",
              rating: 6,
            },
            {
              name: "PHP",
              icon: "/php.svg",
              level: "Basic",
              rating: 5,
            },
            {
              name: "Java",
              icon: "/java.svg",
              level: "Basic",
              rating: 5,
            },
          ]}
        />

        {/* Frameworks */}
        <SkillSection
          title="Frameworks"
          skills={[
            {
              name: "React",
              icon: "/react.svg",
              level: "Advanced",
              rating: 9,
            },
            {
              name: "Next.js",
              icon: "/nextjs.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Express",
              icon: "/express.svg",
              level: "Intermediate",
              rating: 7,
            },
            {
              name: "Django",
              icon: "/django.svg",
              level: "Intermediate",
              rating: 6,
            },
            {
              name: "NestJS",
              icon: "/nestjs.svg",
              level: "Intermediate",
              rating: 6,
            },
            {
              name: "Laravel",
              icon: "/laravel.png",
              level: "Basic",
              rating: 5,
            },
          ]}
        />

        {/* Technologies */}
        <SkillSection
          title="Technologies"
          skills={[
            {
              name: "Node.js",
              icon: "/nodejs.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Prisma",
              icon: "/prisma-2.svg",
              level: "Intermediate",
              rating: 7,
            },
            {
              name: "Stripe",
              icon: "/stripe-4.svg",
              level: "Intermediate",
              rating: 6,
            },
          ]}
        />

        {/* Databases */}
        <SkillSection
          title="Databases"
          skills={[
            {
              name: "PostgreSQL",
              icon: "/postgresql.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "MySQL",
              icon: "/mysql-3.svg",
              level: "Intermediate",
              rating: 7,
            },
            {
              name: "MongoDB",
              icon: "/mongodb.svg",
              level: "Intermediate",
              rating: 6,
            },
            {
              name: "Firebase",
              icon: "/firebase-1.svg",
              level: "Basic",
              rating: 5,
            },
          ]}
        />

        {/* Tools */}
        <SkillSection
          title="Tools"
          skills={[
            {
              name: "VS Code",
              icon: "/visual-studio-2013.svg",
              level: "Advanced",
              rating: 9,
            },
            {
              name: "Git",
              icon: "/git-bash.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Postman",
              icon: "/postman.svg",
              level: "Intermediate",
              rating: 7,
            },
          ]}
        />

        <AdditionalSkillPage />
      </motion.div>
    </section>
  );
}
