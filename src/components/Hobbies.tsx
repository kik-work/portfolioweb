import type { CSSProperties } from "react";

interface HobbyItem {
  title: string;
  category: string;
  image: string;
}

const hobbies: HobbyItem[] = [
  { title: "Football", category: "Sports", image: "/football.webp" },
  { title: "Cricket", category: "Sports", image: "/cricket.webp" },
  { title: "Badminton", category: "Sports", image: "/badminton.webp" },
  { title: "Carrom", category: "Indoor Games", image: "/carrom.webp" },
  { title: "Chess", category: "Indoor Games", image: "/chess.webp" },
  { title: "National & International Politics", category: "Politics", image: "/international-politics.svg" },
  { title: "Blockchain", category: "Trade Enthusiast", image: "/blockchain.webp" },
  { title: "NFT", category: "Trade Enthusiast", image: "/nft.webp" },
  { title: "Digital Currency", category: "Trade Enthusiast", image: "/digitalcurrency.webp" },
];

// group by category
const grouped = hobbies.reduce<Record<string, HobbyItem[]>>((acc, item) => {
  acc[item.category] = acc[item.category] || [];
  acc[item.category].push(item);
  return acc;
}, {});

const Hobby = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
      {Object.entries(grouped).map(([category, items], idx) => (
        <li key={category} className="animate-rise-in" style={{ "--rise-delay": `${idx * 70}ms` } as CSSProperties}>
          <div className="h-full rounded-3xl bg-card p-2">
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.015em]">{category}</h3>
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground tabular-nums">
                {items.length}
              </span>
            </div>
            <ul>
              {items.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-300 hover:bg-background"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-black/5">
                    <img src={item.image} alt="" className="size-full object-contain" loading="lazy" width={40} height={40} />
                  </span>
                  <span className="text-[0.9375rem] leading-snug font-medium">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Hobby;
