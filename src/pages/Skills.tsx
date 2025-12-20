"use client";

import { Card, CardHeader, CardTitle, CardContent, Card2 } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import type { SkillSectionProps } from "@/components/interface/skillInterface";
import AdditionalSkillPage from "@/components/AdditionalSkill";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { useEffect } from "react";
import { Database, Grid2X2Check, Languages, Library, Settings } from "lucide-react";

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



export default function SkillsPage() {
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
          icon={<Languages className="w-4 h-4 text-primary" />}
          skills={[
            {
              name: "JavaScript",
              icon: "/javascript.svg",
              level: "Advanced",
              rating: 8.7,
            },
            {
              name: "PHP",
              icon: "/php.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "C++",
              icon: "/c.svg",
              level: "Intermediate",
              rating: 7.5,
            },
            {
              name: "Python",
              icon: "/python.svg",
              level: "Intermediate",
              rating: 7,
            },


            {
              name: "C#",
              icon: "/csharp.jpg",
              level: "Basic",
              rating: 6,
            },
            {
              name: "Java",
              icon: "/java.svg",
              level: "Basic",
              rating: 6,
            },
          ]}
        />

        {/* Frameworks */}
        <SkillSection
          title="Libraries & Frameworks"
          icon={<Library className="w-4 h-4 text-primary" />}
          skills={[
            {
              name: "React",
              icon: "/react.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Next.js",
              icon: "/nextjs.Default",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Express",
              icon: "/express.png",
              level: "Advanced",
              rating: 8,
            },
             {
              name: "Laravel",
              icon: "/laravel.png",
              level: "Intermediate",
              rating: 7,
            },
            
           
            {
              name: "NestJS",
              icon: "/nestjs.svg",
              level: "Intermediate",
              rating: 7,
            },
             {
              name: "Django",
              icon: "/django.svg",
              level: "Basic",
              rating: 6,
            },
           
          ]}
        />

        {/* Technologies */}
        <SkillSection
          title="Technologies"
          icon={<Grid2X2Check className="w-4 h-4 text-primary" />}
          skills={[
             {
              name: "Firebase",
              icon: "/firebase-1.svg",
              level: "Advanced",
              rating: 8,
            },
            {
              name: "Node.js",
              icon: "/nodejs.svg",
              level: "Advanced",
              rating: 8,
            },
             {
              name: "Redux",
              icon: "/redux.svg",
              level: "Intermediate",
              rating: 7,
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
              level: "Basic",
              rating: 6,
            },
            
          ]}
        />

        {/* Databases */}
        <SkillSection
          title="Databases"
          icon={<Database className="w-4 h-4 text-primary"  />}
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
           
          ]}
        />

        {/* Tools */}
        <SkillSection
          title="Tools"
          icon={<Settings className="w-4 h-4 text-primary" />}
          skills={[
             {
              name: "VS Code",
              icon: "/vscode.svg",
              level: "Advanced",
              rating: 8,
            },
           
            {
              name: "Git Bash",
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
             {
              name: "Visual Studio",
              icon: "/visual-studio-2013.svg",
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
const SkillSection = ({ title, description, skills, icon }: SkillSectionProps) => (
  <motion.div variants={item}>
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow">
      <CardHeader className="space-y-1">
     <CardTitle className="flex items-center gap-2 text-xl font-semibold">
  {title}
  {icon}
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
              <Card2 className="group rounded-xl border bg-muted/40 hover:bg-muted transition-all">
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
              </Card2>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);