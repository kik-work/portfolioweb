"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface HobbyItem {
  title: string;
  category: string;
  image: string;
}

const hobbies: HobbyItem[] = [
  { title: "Football", category: "Sports", image: "/football.png" },
  { title: "Cricket", category: "Sports", image: "/cricket.png" },
  { title: "Badminton", category: "Sports", image: "/badminton.png" },
  { title: "Carrom", category: "Indoor Games", image: "/carrom.png" },
  { title: "Chess", category: "Indoor Games", image: "/chess.png" },
 
  { title: "National & International Politics", category: "Politics", image: "/international-politics.svg" },
  { title: "Blockchain", category: "Trade Enthusiast", image: "/blockchain.png" },
  { title: "NFT", category: "Trade Enthusiast", image: "/nft.png" },
  { title: "Digital Currency", category: "Trade Enthusiast", image: "/digitalcurrency.png" },
];

// group by category
const grouped = hobbies.reduce<Record<string, HobbyItem[]>>((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);
  return acc;
}, {});

const Hobby = () => {
  return (
    <section className="w-full pb-20 bg-background">
      <div className="w-full max-w-6xl mx-auto px-4 space-y-14">
        {/* Header */}
      

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(grouped).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border bg-muted/30"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/40 rounded-t-2xl">
                <h3 className="text-lg font-semibold">{category}</h3>
                <Badge variant="outline">{items.length}</Badge>
              </div>

              {/* Items */}
              <div className="divide-y">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobby;
