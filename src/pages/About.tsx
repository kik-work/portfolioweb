"use client";

import React, { useEffect } from "react";
import Flag from "react-world-flags";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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
interface InfoItemres {
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const info: InfoItem[] = [
    { label: "Name", value: "Khairul Islam Kakon" },
    { label: "Father's Name", value: "Md. Shahjahan Ali Farazi" },
    { label: "Mother's Name", value: "Mrs. Kolpona Begum" },
    { label: "Date of Birth", value: "19 Feb, 2001" },
    { label: "Nationality", value: "Bangladeshi" },
    { label: "Religion", value: "Muslim" },
    {
      label: "Hometown",
      value: (
        <>
          Sherpur, Mymensingh{" "}
          <Flag code="BD" style={{ width: 16, height: 16, marginLeft: 4 }} />
        </>
      ),
    },
    {
      label: "Present Address",
      value: (
        <>
          Nikunjo-2, Dhaka{" "}
          <Flag code="BD" style={{ width: 16, height: 16, marginLeft: 4 }} />
        </>
      ),
    },
  ];
  const infores: InfoItemres[] = [
    { label: "Email", value: "kakon.aiubcse@gmail.com" },
    { label: "Number", value: "01923089370" },
    {
      label: "Blood Group",
      value: (
        <>
          B <span className="text-red-500 font-bold">-</span>(Neg)
        </>
      ),
    },
  ];

  const activities: ActivityItem[] = [
    {
      title: "AIUB Premium League Cricket Tournament",
      year: "2022-2024",
      role: "Wicket Keeper Batsman & Vice Captain(2024)",
      image: "/cricket1.JPG",
    },
    {
      title: "AIUB Football World Cup 2023",
      year: "2023",
      role: "Lead Center Forward",
      image: "/football1.jpg",
    },
    {
      title: "Assistance to the Needy during COVID-19",
      year: "Apr-Jul 2020",
      role: "Community Volunteer",
      image: "/covidvol.png",
      description:
        "Provided informal assistance to those in need during the COVID-19 pandemic. Tasks included distributing essential supplies, offering support to vulnerable individuals, and contributing to community relief efforts.",
    },
  ];
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center space-y-3">
            <TypographyH1>
              <span className="text-primary">Kakon,</span> Khairul Islam
            </TypographyH1>
            <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Software Engineer.
            </TypographyP>
          </motion.div>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Image Card - displayed first on small screens */}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {info.map((item) => (
              <Card
                key={item.label}
                className="hover:shadow-xl transition-shadow border border-border rounded-lg"
              >
                <CardHeader className="flex justify-between items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-semibold text-gray-600 cursor-default">
                        {item.label}
                      </span>
                    </TooltipTrigger>
                    {item.tooltip && (
                      <TooltipContent>{item.tooltip}</TooltipContent>
                    )}
                  </Tooltip>
                  {typeof item.value === "string" ? (
                    <Badge variant="secondary">{item.value}</Badge>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </CardHeader>
                {item.level && (
                  <CardContent>
                    <Progress value={item.level} className="h-2 rounded-full" />
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
          <ScrollSlideIn
            direction="right"
            className="order-first md:order-last"
          >
            <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition">
              <img
                src="/mine4.jpg"
                alt="Kakon"
                className="w-full h-auto object-cover"
              />
            </Card>
            {infores.map((item) => (
              <Card
                key={item.label}
                className="hover:shadow-xl transition-shadow border border-border rounded-lg"
              >
                <CardHeader className="flex flex-col justify-between items-start">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-semibold text-gray-600 cursor-default">
                        {item.label}
                      </span>
                    </TooltipTrigger>
                    {item.tooltip && (
                      <TooltipContent>{item.tooltip}</TooltipContent>
                    )}
                  </Tooltip>
                  {typeof item.value === "string" ? (
                    <Badge variant="secondary">{item.value}</Badge>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </CardHeader>
                {item.level && (
                  <CardContent>
                    <Progress value={item.level} className="h-2 rounded-full" />
                  </CardContent>
                )}
              </Card>
            ))}
          </ScrollSlideIn>
        </motion.div>

        {/* Extracurricular Activities */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <TypographyH1>Extracurricular Activities</TypographyH1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act) => (
              <ScrollSlideIn key={act.title} direction="right">
                <Card className="hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                  <CardContent className="flex flex-col space-y-4 items-center">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <h3 className="text-xl font-semibold">{act.title}</h3>
                    <Badge variant="secondary">{act.year}</Badge>
                    <p className="text-center">{act.role}</p>
                    {act.description && (
                      <p className="text-sm text-gray-600">{act.description}</p>
                    )}
                  </CardContent>
                </Card>
              </ScrollSlideIn>
            ))}
          </div>
        </motion.div>
      </section>
      <Hobby />
    </>
  );
};

export default AboutPage;
