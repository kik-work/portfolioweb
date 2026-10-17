import { useState, useEffect } from "react";
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
      {/* Plain in-page navigation: the buttons scroll to sections, so ARIA tab
          roles (which require matching tabpanels) do not apply. */}
      <nav
        aria-label="Sections"
        className="mx-auto w-full flex justify-center py-2 gap-3 max-w-7xl"
      >
        <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] mx-auto">
          {TabContainers.map((tab, idx) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabClick(tab)}
              aria-label={tab}
              aria-current={activeTab === tab ? "true" : undefined}
              className={cn(
                "focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-2 border border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:ring-[3px] focus-visible:outline-1 [&_svg]:pointer-events-none [&_svg]:shrink-0",
                activeTab === tab
                  ? "text-primary bg-background dark:bg-input/30 dark:border-input shadow-sm rounded-md"
                  : "text-muted-foreground hover:text-primary rounded-full"
              )}
            >
              <span className="md:hidden">{TabIcons[idx]}</span>
              <span className="hidden md:flex items-center gap-2">
                {tab} {TabIcons[idx]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
