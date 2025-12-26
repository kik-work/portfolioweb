"use client";

import React, { useEffect, useState } from "react";
import Flag from "react-world-flags";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

import ScrollSlideIn from "@/components/ui/ScrollSlideIn";
import Hobby from "@/components/Hobbies";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  level?: number;
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
  { label: "Name", value: "Khairul Islam Kakon", tooltip: "Full Name", level: 12.5 },
  { label: "Father's Name", value: "Md. Shahjahan Ali Farazi", tooltip: "Father's Full Name", level: 25 },
  { label: "Mother's Name", value: "Mrs. Kolpona Begum", tooltip: "Mother's Full Name", level: 37.5 },
  { label: "Date of Birth", value: "19 Feb, 2001", tooltip: "DOB", level: 50 },
  { label: "Nationality", value: "Bangladeshi", tooltip: "Country of Citizenship", level: 62.5 },
  { label: "Religion", value: "Muslim", tooltip: "Religion", level: 75 },
  { label: "Permanent Address", value: <>Sherpur, Mymensingh <Flag code="BD" style={{ width: 18, height: 20, marginLeft: 4 }} /></>, tooltip: "Place of Birth", level: 87.5 },
  { label: "Present Address", value: <>Nikunjo-2, Khilkhet, Dhaka <Flag code="BD" style={{ width: 18, height: 18, marginLeft: 4 }} /></>, tooltip: "Present Address", level: 100 },
];

const CONTACT_INFO: InfoItem[] = [
  { label: "Email", value: <a href="mailto:kakon.aiubcse@gmail.com"><Badge variant="default">kakon.aiubcse@gmail.com</Badge></a>, tooltip: "Send me an email" },
  { label: "Number", value: <Badge variant="default">01923089370</Badge>, tooltip: "Call me directly" },
  { label: "Blood Group", value: <Badge variant="default">B- (Neg)</Badge>, tooltip: "My blood group" },
];

const ACTIVITIES: ActivityItem[] = [
  { title: "AIUB Premium League Cricket Tournament", year: "2022-2024", role: "Wicket Keeper Batsman & Vice Captain(2024)", image: "/cricket1.JPG", description: "Played 3 APL seasons, I was playing for CS Cougars and ended up playing for CS Chasers team." },
  { title: "AIUB Football World Cup 2023", year: "2023", role: "Lead Center Forward", image: "/football1.jpg" , description:"Played 1 AFWC tournament for team switzerland on group rounds. I was in center forward position."} ,
  { title: "Assistance to the Needy during COVID-19", year: "Apr-Jul 2020", role: "Community Volunteer", image: "/covidvol.png", description: "Provided informal assistance to those in need during the COVID-19 pandemic." },
];

/* ---------- Page ---------- */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

type Tab = "personal" | "activities" | "hobbies";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Header */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <motion.div variants={item} className="space-y-3">
            <TypographyH1><span className="text-primary">Kakon,</span> Khairul Islam</TypographyH1>
            <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">Software Engineer.</TypographyP>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 flex-wrap">
          {["personal", "activities", "hobbies"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === tab ? "bg-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div variants={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Personal Tab */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Image */}
              <Card className="w-full h-fit flex items-center overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition p-4">
                <img src="/mine4.jpg" alt="Kakon" className="object-cover hover:border hover:border-primary rounded-xl" />
                <CardContent className="w-full">  
                  {CONTACT_INFO.map((info) => (
                  <Card key={info.label} className="hover:shadow-xl transition-shadow border border-border rounded-lg p-4 flex flex-col items-center my-2 justify-center">
                    <Tooltip>
                      <TooltipTrigger asChild><span className="font-medium text-muted-foreground">{info.label}</span></TooltipTrigger>
                      {info.tooltip && <TooltipContent>{info.tooltip}</TooltipContent>}
                    </Tooltip>
                    <Badge variant="default" className="">{info.value}</Badge>
                  </Card>
                ))}</CardContent>
              </Card>

              {/* Personal Info + Contact */}
              <div className="space-y-4">
                {PERSONAL_INFO.map((info) => (
                  <Card key={info.label} className="hover:shadow-xl transition-shadow border border-border rounded-lg">
                    <CardHeader className="flex flex-col justify-between items-start">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-semibold text-muted-foreground cursor-default">{info.label}</span>
                        </TooltipTrigger>
                        {info.tooltip && <TooltipContent>{info.tooltip}</TooltipContent>}
                      </Tooltip>
                      <Badge variant="outline">{info.value}</Badge>
                    </CardHeader>
                    {info.level && (
                      <CardContent>
                        <Progress value={info.level} className="h-2 rounded-full bg-violet-800" />
                      </CardContent>
                    )}
                  </Card>
                ))}


              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ACTIVITIES.map((act) => (
                <ScrollSlideIn key={act.title} direction="right">
                  <Card className="hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                    <CardContent className="flex flex-col space-y-4 items-center">
                      <img src={act.image} alt={act.title} className="w-full h-64 object-cover rounded-xl" />
                      <h3 className="text-xl font-semibold">{act.title}</h3>
                      <Badge variant="secondary">{act.year}</Badge>
                      <p className="text-center">{act.role}</p>
                      {act.description && <p className="text-sm text-gray-600">{act.description}</p>}
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
      </section>
    </>
  );
};

export default AboutPage;
