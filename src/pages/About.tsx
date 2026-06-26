"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSlideIn from "@/components/ui/ScrollSlideIn";
import Hobby from "@/components/Hobbies";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
}

interface ActivityItem {
  title: string;
  year: string;
  role: string;
  image: string;
  description?: string;
}

/* ---------- Data ---------- */
const PERSONAL_INFO: InfoItem[] = [
  { label: "Name", value: "Khairul Islam Kakon", tooltip: "Full Name" },
  {
    label: "Father's Name",
    value: "Late Md. Shahjahan Ali Farazi",
    tooltip: "Father's Full Name",
  },
  {
    label: "Mother's Name",
    value: "Mrs. Kolpona Begum",
    tooltip: "Mother's Full Name",
  },
  { label: "Date of Birth", value: "19 Feb, 2001", tooltip: "DOB" },
  {
    label: "Nationality",
    value: "Bangladeshi",
    tooltip: "Country of Citizenship",
  },
  { label: "Religion", value: "Muslim", tooltip: "Religion" },
  {
    label: "Permanent Address",
    // Replaced react-world-flags with emoji flag â€” same visual, zero bundle cost
    value: "Sherpur, Mymensingh ðŸ‡§ðŸ‡©",
    tooltip: "Place of Birth",
  },
  {
    label: "Present Address",
    value: "Nikunjo-2, Khilkhet, Dhaka ðŸ‡§ðŸ‡©",
    tooltip: "Present Address",
  },
];

const CONTACT_INFO: InfoItem[] = [
  {
    label: "Email",
    value: (
      <a href="mailto:kakon.aiubcse@gmail.com">
        <Badge variant="default">kakon.aiubcse@gmail.com</Badge>
      </a>
    ),
    tooltip: "Send me an email",
  },
  {
    label: "Number",
    value: <Badge variant="default">01923089370</Badge>,
    tooltip: "Call me directly",
  },
  {
    label: "Blood Group",
    value: <Badge variant="default">B- (Neg)</Badge>,
    tooltip: "My blood group",
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    title: "AIUB Premium League Cricket Tournament",
    year: "2022-2024",
    role: "Wicket Keeper Batsman & Vice Captain (2024)",
    image: "/cricket1.webp",
    description:
      "Played 3 APL seasons, playing for CS Cougars and ending up playing for CS Chasers team.",
  },
  {
    title: "AIUB Football World Cup 2023",
    year: "2023",
    role: "Lead Center Forward",
    image: "/football1.webp",
    description:
      "Played 1 AFWC tournament for team Switzerland in group rounds. Center forward position.",
  },
  {
    title: "Assistance to the Needy during COVID-19",
    year: "Apr-Jul 2020",
    role: "Community Volunteer",
    image: "/covidvol.webp",
    description:
      "Provided informal assistance to those in need during the COVID-19 pandemic.",
  },
];

/* ---------- Animation variants ---------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

type Tab = "personal" | "activities" | "hobbies";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.div variants={item} className="space-y-3">
          <TypographyH1>
            Khairul Islam{" "}
            <span className="text-primary">(Kakon)</span>
          </TypographyH1>
          <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Software Engineer
          </TypographyP>
        </motion.div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {(["personal", "activities", "hobbies"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {/* Personal Tab */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile image + contact */}
              <Card className="w-full h-fit flex items-center overflow-hidden rounded-2xl shadow-lg hover:-translate-y-1 transition-transform p-4">
                <img
                  src="/mine4.webp"
                  alt="Kakon"
                  className="object-cover hover:border hover:border-primary rounded-xl"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <CardContent className="w-full">
                  {CONTACT_INFO.map((info) => (
                    <Card
                      key={info.label}
                      className="hover:-translate-y-0.5 transition-transform border border-border rounded-lg p-4 flex flex-col items-center my-2 justify-center"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium text-muted-foreground">
                            {info.label}
                          </span>
                        </TooltipTrigger>
                        {info.tooltip && (
                          <TooltipContent>{info.tooltip}</TooltipContent>
                        )}
                      </Tooltip>
                      <span>{info.value}</span>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Personal info â€” flattened DOM, no nested Progress bars */}
              <div className="space-y-3">
                {PERSONAL_INFO.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center justify-between border border-border rounded-lg px-4 py-3 hover:-translate-y-0.5 transition-transform"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-semibold text-sm text-muted-foreground cursor-default">
                          {info.label}
                        </span>
                      </TooltipTrigger>
                      {info.tooltip && (
                        <TooltipContent>{info.tooltip}</TooltipContent>
                      )}
                    </Tooltip>
                    <Badge variant="outline">{info.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACTIVITIES.map((act) => (
                <ScrollSlideIn key={act.title} direction="right">
                  <Card className="hover:-translate-y-1 transition-transform rounded-2xl overflow-hidden">
                    <CardContent className="flex flex-col space-y-4 items-center">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-full h-64 object-cover rounded-xl"
                        loading="lazy"
                        width={400}
                        height={256}
                      />
                      <h3 className="text-xl font-semibold">{act.title}</h3>
                      <Badge variant="secondary">{act.year}</Badge>
                      <p className="text-center">{act.role}</p>
                      {act.description && (
                        <p className="text-sm text-muted-foreground">
                          {act.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </ScrollSlideIn>
              ))}
            </div>
          )}

          {/* Hobbies Tab */}
          {activeTab === "hobbies" && (
            <div className="grid grid-cols-1">
              <Hobby />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AboutPage;

