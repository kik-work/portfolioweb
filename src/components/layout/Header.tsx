"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail, PhoneCall } from "lucide-react";
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

    // Try native app first
    window.location.href = mailtoURL;

    // Fallback to Gmail web
    setTimeout(() => {
      window.open(gmailURL, "_blank");
    }, 600);
  };

  const handleCall = () => {
    const phoneNumber = "8801923089370"; // country code + number (no +, no spaces)
    const message = "Hi Kakon, I found your portfolio and want to contact you.";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <header className="w-full border-b dark:border-muted bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <TooltipProvider delayDuration={200}>
        <div className="mx-auto w-full flex items-center justify-between p-2 max-w-7xl">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/kik-logo.png"
              alt="Logo"
              className="h-10 w-16 rounded-md"
            />
            <h1 className="text-sm font-normal text-muted-foreground">
              Khairul Islam Kakon
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ">
            {/* Mail Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleMail}>
                  <Mail className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">kakon.aiubcse@gmail.com</TooltipContent>
            </Tooltip>

            {/* Message Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleCall}>
                  <PhoneCall className="h-4 w-4 text-teal-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                01923089370 (4PM to 11PM)
               
              </TooltipContent>
            </Tooltip>

            {/* Theme Switch */}
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="h-4 w-10 mr-2"
            />
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
}
