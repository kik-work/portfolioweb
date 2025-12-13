// src/pages/Experience.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TypographyH1, TypographyH2, TypographyP } from "@/components/ui/typography";

interface ExperiencePageProps {
  goToProjects: () => void;
}

const experiences = [
  {
    role: "Junior Software Developer",
    company: "Alor Feri Limited",
    period: "Aug 2024 – Present",
    description:
      "System analysis, design, development, integration, testing, bug fixing, documentation, and team collaboration.",
    logo: "/alorferi.png",
    link: "https://www.alorferi.com/",
    type: "Full Time",
  },
  {
    role: "Backend Intern",
    company: "Pressply LLC",
    period: "Jan 2024 – May 2024",
    description:
      "Built scalable e-commerce backend with Express, PostgreSQL, Prisma, and Stripe integration.",
    logo: "/pressply.png",
    link: "https://pressply.com/",
    type: "Internship",
  },
  {
    role: "Backend Development Intern",
    company: "Taskirsview",
    period: "Jan 2025 – Feb 2025",
    description:
      "Designed and maintained server-side logic, databases, and collaborated on high-quality solutions.",
    logo: "/taskirsview.png",
    link: "https://t.ly/gup-v/",
    type: "Internship",
  },
];

export default function ExperiencePage({ goToProjects }: ExperiencePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground py-16">
      {/* HEADER */}
      <section className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypographyH1>
            My <span className="text-primary">Experience</span>
          </TypographyH1>
          <TypographyP className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my professional journey, internships, and hands-on experience in software development.
          </TypographyP>
        </motion.div>
      </section>

      {/* EXPERIENCE LIST */}
      <section className="container mx-auto px-6 pb-24 space-y-12 mt-16">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <Card className="hover:shadow-2xl transition-shadow duration-300 rounded-2xl border border-border">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <TypographyH2>{exp.role}</TypographyH2>
                  <TypographyP className="text-muted-foreground mt-1 md:mt-2 text-base md:text-lg">
                    {exp.company} • {exp.period}
                  </TypographyP>
                </div>
                <Badge variant="secondary" className="w-fit px-3 py-1 text-sm md:text-base">
                  {exp.type}
                </Badge>
              </CardHeader>

              <CardContent className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center mt-4">
                <TypographyP className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {exp.description}
                </TypographyP>

                <div className="flex flex-col items-center gap-4">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-lg border border-border p-2 bg-background"
                  />
                  <Button
                    variant="outline"
                    onClick={goToProjects}
                    className="hover:bg-primary/10 transition-all"
                  >
                    View Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
