"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Card2,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AdditionalSkillPage from "@/components/AdditionalSkill";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { SKILL_TABS } from "@/components/interface/skillInterface";

/* ---------- Animation ---------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const levelStyles: Record<"Basic" | "Intermediate" | "Advanced", string> = {
  Basic: "bg-muted text-muted-foreground",
  Intermediate: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Advanced: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState(SKILL_TABS[1].id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentTab = SKILL_TABS.find((t) => t.id === activeTab)!;
  const Icon = currentTab.icon;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header — CSS fade-in */}
      <div className="text-center space-y-3 animate-fade-in-up">
        <TypographyH1>
          My <span className="text-primary">Skills</span>
        </TypographyH1>
        <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Technologies, tools, and professional skills I use to build modern
          applications.
        </TypographyP>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {SKILL_TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <TabIcon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <motion.div
        key={activeTab}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
              <Icon className="w-4 h-4 text-primary" />
              {currentTab.label}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {currentTab.skills.map((skill) => (
                <motion.div key={skill.name} variants={item}>
                  <Card2 className="group rounded-xl border bg-muted/40 hover:-translate-y-1 hover:bg-muted transition-transform">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background border shadow-sm flex-shrink-0">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          width={28}
                          height={28}
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-col gap-2 w-full min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-medium text-sm truncate">
                            {skill.name}
                          </span>
                          <Badge
                            className={`text-xs shrink-0 ${
                              levelStyles[skill.level]
                            }`}
                            variant="secondary"
                          >
                            {skill.level}
                          </Badge>
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

      {/* Additional Skills */}
      <div className="animate-fade-in-up">
        <AdditionalSkillPage />
      </div>
    </section>
  );
}
