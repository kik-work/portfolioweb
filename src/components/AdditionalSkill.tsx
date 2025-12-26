"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import { Bug, CirclePlus, GlobeLock, MonitorCloud, PcCase, ShieldPlusIcon, Sprout } from "lucide-react";

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Problem Solving",
                icon: <Bug className="h-4 w-4 text-primary"/>,
                items: ["Decision making", "Analytical thinking"],
              },
               {
                title: "Professional Skills",
                  icon: <ShieldPlusIcon className="h-4 w-4 text-primary"/>,
                items: ["Leadership", "Teamwork", "Adaptability"],
              },
              {
                title: "Computer Science",
                  icon: <PcCase className="h-4 w-4 text-primary"/>,
                items: ["Data structures", "Algorithms", "Compiler basics"],
              },
              {
                title: "Software Related",
                  icon: <MonitorCloud className="h-4 w-4 text-primary"/>,
                items: ["Software testing", "Data analysis"],
              },
              {
                title: "Creative Skills",
                  icon: <Sprout className="h-4 w-4 text-primary"/>,
                items: ["Graphic design", "Photo & video editing", "Figma"],
              },
              {
                title: "Communication",
                  icon: <GlobeLock className="h-4 w-4 text-primary"/>,
                items: ["English", "Bengali", "50+ WPM typing"],
              },
             
            ].map((group) => (
              <Card
                key={group.title}
                className="rounded-xl border bg-muted/40 hover:bg-muted transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    {group.title} {group.icon}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} className="rounded-full" variant={"outline"}>
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
