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
import { TypographyH1, TypographyH3, TypographyP, TypographyP2 } from "@/components/ui/typography";
import { BookOpen, BookText, Building, CircleArrowOutUpRight, Clock, GraduationCap, MapPin, SquareStar, University } from "lucide-react";

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
    year: "Spring 2020-2024",
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
    year: "2017-2019",
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
    year: "2016-2017",
    major: "Science",
    result: "GPA 5.00 / 5.00",
    logo: "/jangaldi.jpeg",
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
      className="flex justify-center w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filtered.map((edu) => (
        <motion.div key={edu.degree} variants={item} className=" w-full">
          <Card className="h-full rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="">
              <div className="flex items-center justify-between">
               
                <CardTitle >
               <TypographyH1 className="text-xl ">{edu.degree}</TypographyH1>
              </CardTitle>
              </div>
              
              <TypographyH3 className="text-sm text-muted-foreground">
                 <Clock className="inline-block h-4 w-4 mb-1 mr-1 text-primary" />{edu.year}
                </TypographyH3>
              <TypographyH3 className="text-sm text-muted-foreground">
               <Building className="inline-block h-4 w-4 mb-1 mr-1 text-primary"/> {edu.institute}
              </TypographyH3>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row items-start  justify-between space-y-3">
            <div className="flex flex-col items-start" >  
              <TypographyP2 className="text-sm text-muted-foreground"><MapPin className="inline-block h-4 w-4 mb-1 text-primary"/> {edu.location}</TypographyP2>
              <TypographyP2 className="text-sm text-muted-foreground"><GraduationCap className="inline-block h-4 w-4 mb-1 text-primary"/> Major: {edu.major}</TypographyP2>
              <TypographyP2 className="text-sm font-medium"><SquareStar className="inline-block h-4 w-4 mb-1 text-primary"/> {edu.result}</TypographyP2>
              </div>

              <div className="flex flex-col items-center space-y-2 justify-center ">
                <img
                  src={edu.logo}
                  alt={edu.institute}
                  className="h-20 w-20 object-contain"
                />
                 <CardFooter className="justify-center">
              {edu.website !== "#" && (
                <Button asChild variant="outline" size="sm"  className="
        w-full sm:w-fit
        gap-2
        rounded-lg
        transition
        hover:bg-primary hover:text-primary-foreground
        dark:hover:bg-primary-dark dark:hover:text-primary-foreground
        dark:bg-primary-dark dark:text-primary-foreground
      ">
                  <a
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    
                  >
                    Visit Institution <CircleArrowOutUpRight className=""/>
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
            Academic journey segmented by education level.
          </TypographyP>
        </motion.div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <div className="flex justify-start px-1 border-b border-muted/50  pb-2 ">
            <TabsList className="rounded-2xl px-2 w-full">
  <TabsTrigger
    value="University"
className="data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-3 "
  >
    University <University className="inline-block ml-2" />
  </TabsTrigger>
  <TabsTrigger
    value="College"
    className="data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-3 "
  >
    College <BookText className="inline-block ml-2" />
  </TabsTrigger>
  <TabsTrigger
    value="School"
    className="data-[state=active]:text-white data-[state=active]:bg-primary rounded-md px-3 "
  >
    School <BookOpen className="inline-block ml-2" />
  </TabsTrigger>
</TabsList>
          </div>

          <div className="mt-2  w-full ">
            <TabsContent value="University" >
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
