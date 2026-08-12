import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabContainers, TabIcons } from "../TapContainer";

interface TopNavbarProps {
  activeTab: string;
  /** Called with the tab name when the user clicks a tab. */
  onTabClick: (tab: string) => void;
}

export function TopNavbar({ activeTab, onTabClick }: TopNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 50));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "shadow-md" : ""
      )}
    >
      <nav className="mx-auto w-full flex justify-center py-2 gap-3 max-w-7xl">
        {/* value keeps the active highlight in sync with the scroll-spy;
            onValueChange is intentionally omitted — clicks go through
            the individual TabsTrigger onClick so we can call scrollToSection. */}
        <Tabs value={activeTab}>
          <TabsList className="flex justify-center mx-auto">
            {TabContainers.map((tab, idx) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => onTabClick(tab)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  activeTab === tab
                    ? "text-primary bg-primary/10 rounded-md"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <span className="md:hidden">{TabIcons[idx]}</span>
                <span className="hidden md:flex items-center gap-2">
                  {tab} {TabIcons[idx]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </nav>
    </header>
  );
}
