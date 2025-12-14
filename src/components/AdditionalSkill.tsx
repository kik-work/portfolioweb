"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            Additional Skills
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
                title: "Computer Science",
                items: ["Data structures", "Algorithms", "Compiler basics"],
              },
              {
                title: "Software Practices",
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
              {
                title: "Professional Skills",
                items: ["Leadership", "Teamwork", "Adaptability"],
              },
            ].map((group) => (
              <Card
                key={group.title}
                className="rounded-xl border bg-muted/40 hover:bg-muted transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} className="rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-start">
            <Button asChild size="lg">
              <a href="mailto:kakon.aiubcse@gmail.com">Hire Me</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
