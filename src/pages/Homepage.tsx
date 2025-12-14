import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function HomePage() {
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <Badge variant="secondary" className="w-fit">
            Personal Portfolio
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hi, I’m <span className="text-primary">Khairul Islam</span>
          </h1>

          <p className="text-muted-foreground max-w-xl">
            Frontend-focused developer building modern, responsive web
            applications with React, Tailwind CSS, and shadcn/ui.
          </p>

          <div className="flex gap-4">
            <Button size="lg">View Projects</Button>
            <Button size="lg" variant="secondary">
              Download CV
            </Button>
          </div>

          <div className="flex gap-4 pt-4">
            <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <div className="w-40 h-40 rounded-full bg-muted ">
                <img
                  src="/minet.jpg"
                  alt="Kakon"
                  className="w-full h-full object-cover rounded-xl "
                />
              </div>
              <h3 className="text-xl font-semibold">Frontend Developer</h3>
              <p className="text-sm text-muted-foreground">
                Passionate about clean UI, smooth UX, and scalable frontend
                architecture.
              </p>
              <div className="flex gap-2">
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
