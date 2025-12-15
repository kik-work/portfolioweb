// src/pages/Homepage.tsx
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { TabContainers } from "@/components/TapContainer";

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export default function HomePage({ setActiveTab }: HomePageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <Badge variant="secondary" className="w-fit">Personal Portfolio</Badge>
          <TypographyH1 className="text-start text-4xl md:text-5xl font-bold tracking-tight">
            Hi, I’m <span className="text-primary">Khairul Islam</span>
          </TypographyH1>
          <TypographyP className="text-muted-foreground">
            A tech enthusiast with practical experience across multiple roles...
          </TypographyP>

          {/* CTA BUTTONS */}
          <div className="flex gap-4 flex-wrap">
            <Button
              size="lg"
              onClick={() => {
                setActiveTab(TabContainers[2]); // Projects tab
                setTimeout(() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              View Projects
            </Button>

            <Button size="lg" variant="secondary">Download CV</Button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 pt-4">
            <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-muted shadow-md">
                <img src="/minet.jpg" alt="Khairul Islam" className="w-full h-full object-cover object-top" />
              </div>
              <h3 className="text-xl font-semibold">Frontend Developer</h3>
              <p className="text-sm text-muted-foreground">Passionate about clean UI, smooth UX, and scalable frontend architecture.</p>
              <div className="flex gap-2 flex-wrap justify-center">
                <Badge>React</Badge>
                <Badge>Tailwind</Badge>
                <Badge>shadcn/ui</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
