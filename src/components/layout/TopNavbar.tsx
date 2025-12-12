import  { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabContainers, TabIcons, TabPages } from "../TapContainer";



export function TopNavbar() {
  const [active, setActive] = useState("Home");

  return (
    <>
      {/* Navbar */}
      <header className="w-full bg-background/60 backdrop-blur-md sticky top-0 z-50">
        <nav className="mx-auto w-full flex justify-center py-2 gap-3 max-w-7xl">
          <Tabs value={active} onValueChange={setActive}>
            <TabsList className="flex justify-center mx-auto">
              {TabContainers.map((tab, idx) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all",
                    active === tab ? "text-primary dark:border-primary! rounded-md" : ""
                  )}
                >
                  {/* Mobile & Tablet: icon only */}
                  <span className="md:hidden">{TabIcons[idx]}</span>

                  {/* Desktop: icon + text */}
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

      {/* Render active tab content */}
      <main className="mt-4">{TabPages[active]}</main>
    </>
  );
}
