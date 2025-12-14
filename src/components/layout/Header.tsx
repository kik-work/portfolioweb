"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageDialog } from "../Message";

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleMail = () => {
    window.location.href =
      "mailto:kakon.aiubcse@gmail.com?subject=Contact from Portfolio&body=Hi Kakon,%0D%0A%0D%0A";
  };

  return (
    <header className="w-full border-b dark:border-muted bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <TooltipProvider delayDuration={200}>
        <div className="mx-auto w-full flex items-center justify-between p-2 max-w-7xl">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-10 w-16 rounded-md"
            />
            <h1 className="text-sm font-normal text-muted-foreground">
              Khairul Islam Kakon
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mr-5">
            {/* Mail Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleMail}>
                  <Mail className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Send Email
              </TooltipContent>
            </Tooltip>

            {/* Message Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                {/* MessageDialog internally renders a single button trigger */}
                <MessageDialog />
              </TooltipTrigger>
              <TooltipContent side="top">
                Write Message
              </TooltipContent>
            </Tooltip>

            {/* Theme Switch */}
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="h-4 w-10 mr-6"
            />
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
}
