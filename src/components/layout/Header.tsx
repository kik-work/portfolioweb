"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail, Moon, PhoneCall, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleMail = () => {
    const email = "kakon.aiubcse@gmail.com";
    const subject = "Contact from Portfolio";
    const body = "Hi Kakon,\n\nI found your portfolio and want to contact you.";

    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoURL;

    setTimeout(() => {
      window.open(gmailURL, "_blank");
    }, 600);
  };

  const handleCall = () => {
    const phoneNumber = "8801923089370";
    const message = "Hi Kakon, I found your portfolio and want to contact you.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <header className="w-full border-b dark:border-muted bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <TooltipProvider delayDuration={200}>
        <div className="mx-auto w-full flex items-center justify-between p-2 max-w-7xl">
          {/* Logo — navigate to root instead of hard-reload */}
          <a href="/" className="flex items-end gap-2 cursor-pointer">
            <img
              src="/kikLogoRH.webp"
              alt="KIK Logo"
              className="h-6 w-16"
            />
            <h1 className="text-sm font-normal text-muted-foreground">
              Khairul Islam Kakon
            </h1>
          </a>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Mail */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleMail} aria-label="Send email">
                  <Mail className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">kakon.aiubcse@gmail.com</TooltipContent>
            </Tooltip>

            {/* WhatsApp */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleCall} aria-label="Contact via WhatsApp">
                  <PhoneCall className="h-4 w-4 text-teal-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">01923089370 (4PM – 11PM)</TooltipContent>
            </Tooltip>

            {/* Theme toggle with sun/moon icons */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 mr-2">
                  <Sun className="h-3.5 w-3.5 text-muted-foreground" />
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    className="h-4 w-10"
                  />
                  <Moon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
}
