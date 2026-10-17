"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail, PhoneCall } from "lucide-react";

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
        <div className="mx-auto w-full flex items-center justify-between p-2 max-w-7xl">
          {/* Logo — navigate to root instead of hard-reload */}
          <a href="/" className="flex items-end gap-2 cursor-pointer">
            <img
              src="/kikLogoRH-sm.webp"
              alt="KIK Logo"
              width={58}
              height={24}
              className="h-6 w-auto"
            />
            <h1 className="text-sm font-normal text-muted-foreground">
              Khairul Islam Kakon
            </h1>
          </a>

          {/* Action buttons — native title attributes replace Radix tooltips to keep the entry bundle small */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleMail}
              aria-label="Send email"
              title="kakon.aiubcse@gmail.com"
            >
              <Mail className="h-4 w-4 text-primary" />
            </Button>

            <Button
              variant="outline"
              onClick={handleCall}
              aria-label="Contact via WhatsApp"
              title="01923089370 (4PM – 11PM)"
            >
              <PhoneCall className="h-4 w-4 text-teal-600" />
            </Button>

            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="mr-2"
            />
          </div>
        </div>
    </header>
  );
}
