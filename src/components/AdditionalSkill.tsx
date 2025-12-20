"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import { CirclePlus } from "lucide-react";

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
                items: ["Decision making", "Analytical thinking"],
              },
               {
                title: "Professional Skills",
                items: ["Leadership", "Teamwork", "Adaptability"],
              },
              {
                title: "Computer Science",
                items: ["Data structures", "Algorithms", "Compiler basics"],
              },
              {
                title: "Software Related",
                items: ["Software testing", "Data analysis"],
              },
              {
                title: "Creative Skills",
                items: ["Graphic design", "Photo & video editing"],
              },
              {
                title: "Communication",
                items: ["English", "Bengali", "50+ WPM typing"],
              },
             
            ].map((group) => (
              <Card
                key={group.title}
                className="rounded-xl border bg-muted/40 hover:bg-muted transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    {group.title}
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
