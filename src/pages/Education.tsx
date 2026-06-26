"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
  TypographyP2,
} from "@/components/ui/typography";
import {
  BookOpen,
  BookText,
  Building,
  CircleArrowOutUpRight,
  Clock,
  GraduationCap,
  MapPin,
  SquareStar,
  University,
} from "lucide-react";

/* ---------- Animation variants â€” only for card entrance ---------- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institute: "American International University of Bangladesh",
    location: "Kuratoli, Khilkhet",
    year: "Spring 2020-2024",
    major: "Software Engineering",
    result: "CGPA 3.66/4.00",
    logo: "/aiub.webp",
    website: "https://www.aiub.edu/",
    level: "University",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institute: "Sherpur Government College",
    location: "Sherpur, Mymensingh, Bangladesh",
    year: "2017-2019",
    major: "Science",
    result: "GPA 4.00 / 5.00",
    logo: "/sgc.webp",
    website: "https://sherpurgovtcollege.edu.bd/",
    level: "College",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institute: "Jangaldi High School",
    location: "Sherpur, Mymensingh, Bangladesh",
    year: "2016-2017",
    major: "Science",
    result: "GPA 5.00 / 5.00",
    logo: "/jangaldi.webp",
    website: "https://locator.eduportalbd.com/institutes/?ins=113829",
    level: "School",
  },
];

function EducationCards({ level }: { level: string }) {
  const filtered = educationData.filter((e) => e.level === level);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex justify-center w-full gap-8"
    >
      {filtered.map((edu) => (
        <motion.div key={edu.degree} variants={item} className="w-full">
          <Card className="h-full rounded-2xl shadow-md hover:-translate-y-1 transition-transform">
            <CardHeader>
              <CardTitle>
                <TypographyH3>{edu.degree}</TypographyH3>
              </CardTitle>
              <TypographyH3 className="text-sm text-muted-foreground">
                <Clock className="inline-block h-4 w-4 mb-1 mr-1 text-primary" />
                {edu.year}
              </TypographyH3>
              <TypographyH3 className="text-sm text-muted-foreground">
                <Building className="inline-block h-4 w-4 mb-1 mr-1 text-primary" />
                {edu.institute}
              </TypographyH3>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row items-start justify-between space-y-3">
              <div className="flex flex-col items-start">
                <TypographyP2 className="text-sm text-muted-foreground">
                  <MapPin className="inline-block h-4 w-4 mb-1 text-primary" />{" "}
                  {edu.location}
                </TypographyP2>
                <TypographyP2 className="text-sm text-muted-foreground">
                  <GraduationCap className="inline-block h-4 w-4 mb-1 text-primary" />{" "}
                  Major: {edu.major}
                </TypographyP2>
                <TypographyP2 className="text-sm font-medium">
                  <SquareStar className="inline-block h-4 w-4 mb-1 text-primary" />{" "}
                  {edu.result}
                </TypographyP2>
              </div>

              <div className="flex flex-col items-center space-y-2 justify-center">
                <img
                  src={edu.logo}
                  alt={edu.institute}
                  className="h-20 w-20 object-contain"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <CardFooter className="justify-center">
                  {edu.website !== "#" && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-fit gap-2 rounded-lg transition hover:bg-primary hover:text-primary-foreground"
                    >
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Institution{" "}
                        <CircleArrowOutUpRight />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function EducationPage() {
  const [tab, setTab] = useState("University");

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header â€” CSS fade-in, no framer needed for a static title */}
      <div className="text-center space-y-3 mb-14 animate-fade-in-up">
        <TypographyH1>
          My <span className="text-primary">Education</span>
        </TypographyH1>
        <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Academic journey segmented by education level.
        </TypographyP>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex justify-start px-1 border-b border-muted/50 dark:border-muted/30 pb-2">
          <TabsList className="rounded-2xl px-2 bg-muted/40 dark:bg-muted/20">
            <TabsTrigger
              value="University"
              className="rounded-md px-3 py-1.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              University
              <University className="inline-block ml-2 h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="College"
              className="rounded-md px-3 py-1.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              College
              <BookText className="inline-block ml-2 h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="School"
              className="rounded-md px-3 py-1.5 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              School
              <BookOpen className="inline-block ml-2 h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-3 w-full">
          <TabsContent value="University">
            <EducationCards level="University" />
          </TabsContent>
          <TabsContent value="College">
            <EducationCards level="College" />
          </TabsContent>
          <TabsContent value="School">
            <EducationCards level="School" />
          </TabsContent>
        </div>
      </Tabs>

      {/* Certificate */}
      <div className="space-y-6 mt-14 animate-fade-in-up">
        <h2 className="text-3xl font-semibold text-center">Certificates</h2>
        <Card className="rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-transform">
          <img
            src="/cisco-1.webp"
            alt="Cisco Certificate"
            className="w-full object-cover"
            loading="lazy"
            width={1200}
            height={850}
          />
        </Card>
      </div>
    </section>
  );
}

