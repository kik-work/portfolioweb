import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabContainers } from "../TapContainer";

const tabs = TabContainers;
export function TopNavbar() {
  const [active, setActive] = useState("Home");

  return (
    <header className="hidden sm:block w-full bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <nav className="mx-auto w-full flex justify-center px-4 py-3 gap-3 max-w-7xl">
        <Tabs value={active} onValueChange={setActive}>
          <TabsList className="flex justify-center mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all",
                  active === tab
                    ? "text-primary dark:border-primary! rounded-md"
                    : ""
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </nav>
    </header>
  );
}
