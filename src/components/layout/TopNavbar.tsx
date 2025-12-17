import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabContainers, TabIcons } from "../TapContainer";

interface TopNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function TopNavbar({ activeTab, setActiveTab }: TopNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
       "w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "shadow-md" : ""
      )}
    >
      <nav className="mx-auto w-full flex justify-center py-2 gap-3 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center mx-auto">
            {TabContainers.map((tab, idx) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  activeTab === tab
                    ? "text-primary bg-primary/10 rounded-md"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <span className="md:hidden">{TabIcons[idx]}</span>
                <span className="hidden md:flex items-center gap-2">
                  {TabIcons[idx]}
                  {tab}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </nav>
    </header>
  );
}
