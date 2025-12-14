"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institute: "American International University of Bangladesh",
    location: "Kuratoli, Khilkhet",
    year: "Spring 2023 – 2024",
    major: "Software Engineering",
    result: "CGPA 3.66",
    logo: "/aiub.png",
    website: "https://www.aiub.edu/",
    level: "University",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institute: "Sherpur Government College",
    location: "Sherpur, Mymensingh, Bangladesh",
    year: "2019",
    major: "Science",
    result: "GPA 4.00 / 5.00",
    logo: "/sgc.jpeg",
    website: "https://sherpurgovtcollege.edu.bd/",
    level: "College",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institute: "Jangaldi High School",
    location: "Sherpur, Dhaka, Bangladesh",
    year: "2017",
    major: "Science",
    result: "GPA 5.00 / 5.00",
    logo: "/school.png",
    website: "#",
    level: "School",
  },
];

export default function EducationPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-14"
      >
        {/* Header */}
      
          <motion.div variants={item} className="text-center space-y-3">
            <TypographyH1>
              My <span className="text-primary">Education</span>
            </TypographyH1>
            <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              My academic background and certifications that shaped my
              professional journey.
            </TypographyP>
          </motion.div>
      

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationData.map((edu) => (
            <motion.div key={edu.degree} variants={item}>
              <Card className="h-full rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{edu.level}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {edu.year}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {edu.degree}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {edu.institute}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm">📍 {edu.location}</p>
                  <p className="text-sm">🎓 Major: {edu.major}</p>
                  <p className="text-sm font-medium">🏆 {edu.result}</p>

                  <div className="flex justify-center pt-4">
                    <img
                      src={edu.logo}
                      alt={edu.institute}
                      className="h-20 w-20 object-contain"
                    />
                  </div>
                </CardContent>

                <CardFooter className="justify-center">
                  {edu.website !== "#" && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Institution
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-3xl font-semibold text-center">Certificates</h2>

          <Card className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img
              src="/cisco-1.png"
              alt="Cisco Certificate"
              className="w-full object-cover"
            />
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
