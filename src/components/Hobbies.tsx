"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HobbyItem {
  title: string;
  category: string;
  image: string;
}

const hobbies: HobbyItem[] = [
  { title: "Football", category: "Sports", image: "/football.png" },
  { title: "Cricket", category: "Sports", image: "/cricket.png" },
  { title: "Badminton", category: "Sports", image: "/badminton.png" },
  { title: "Carrom", category: "Games", image: "/carrom.png" },
  { title: "Chess", category: "Games", image: "/chess.png" },
  {
    title: "Global Dynamics",
    category: "International Affairs",
    image: "/globalaffair.png",
  },
  {
    title: "International Politics",
    category: "Politics",
    image: "/international-politics.svg",
  },
  {
    title: "Blockchain",
    category: "Trade Enthusiast",
    image: "/blockchain.png",
  },
  { title: "NFT", category: "Trade Enthusiast", image: "/nft.png" },
  {
    title: "Digital Currency",
    category: "Trade Enthusiast",
    image: "/digitalcurrency.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hobby: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Hobbies & Interests</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of my hobbies, interests, and activities I enjoy in my
            free time.
          </p>
        </motion.div>

        {/* Hobby Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => (
            <motion.div key={hobby.title} variants={itemVariants}>
              <Card className="hover:shadow-xl transition-shadow rounded-2xl border bg-muted/50">
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-48 h-36 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex flex-col items-center text-center">
                    <h2 className="text-xl font-bold">{hobby.title}</h2>
                    <Badge variant="secondary" className="mt-1">
                      {hobby.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-10"
        >
          <Button asChild size="lg">
            <a href="mailto:kakon.aiubcse@gmail.com">Hire Me</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hobby;
