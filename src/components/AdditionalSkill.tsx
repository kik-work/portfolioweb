"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import { Bug, CirclePlus, GlobeLock, MonitorCloud, PcCase, Server, ShieldPlusIcon, Sprout, Workflow } from "lucide-react";
import { TypographyH4 } from "./ui/typography";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdditionalSkillPage() {
  return (
    <motion.div variants={item}>
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Additional Skills <CirclePlus className="inline-block ml-2 mb-1 h-5 w-5 text-primary" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {
              [
                {
                  title: "Problem Solving",
                  icon: <Bug className="h-12 w-16 text-primary" />,
                  items: ["Decision making", "Analytical thinking"],
                },
                  {
                  title: "Backend Architecture",
                  icon: <Server className="h-12 w-16 text-primary" />,
                  items: ["Sanctum Auth", "Spatie Role Permissions", "Queue Jobs", "Scheduler", "Real-time Messaging"],
                },
                {
                  title: "Planning & Analysis",
                  icon: <Workflow className="h-12 w-16 text-primary" />,
                  items: ["SRS Documentation", "User Stories", "Project Timelines"],
                },
                {
                  title: "Professional Skills",
                  icon: <ShieldPlusIcon className="h-12 w-16 text-primary" />,
                  items: ["Leadership", "Teamwork", "Adaptability", "confidential"],
                },
                {
                  title: "Computer Science",
                  icon: <PcCase className="h-12 w-16 text-primary" />,
                  items: ["Data structures", "Algorithms", "Compiler basics"],
                },
                {
                  title: "Software Related",
                  icon: <MonitorCloud className="h-12 w-16 text-primary" />,
                  items: ["Software testing", "Data analysis"],
                },
                {
                  title: "Creative Skills",
                  icon: <Sprout className="h-12 w-16 text-primary" />,
                  items: ["Graphic design", "Photo & video editing", "Figma"],
                },
                {
                  title: "Communication",
                  icon: <GlobeLock className="h-12 w-16 text-primary" />,
                  items: ["English", "Bengali", "50+ WPM typing"],
                },
              

              ].map((group) => (
                <Card
              
                  key={group.title}
                  className="rounded-xl border bg-slate-100/40 hover:bg-slate-200/60 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      {/* 
                     */}
                      <div className="flex flex-col ">
                        <div className=" h-20 w-40 flex items-center">
                          {group.icon}

                        </div>
                        <div className="my-2">
                          <TypographyH4> {group.title}</TypographyH4>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Badge key={skill} className="rounded-full bg-violet-200/20 dark:bg-violet-500/15 dark:text-violet-200 dark:border-violet-500/30" variant={"outline"}>
                        {skill}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
