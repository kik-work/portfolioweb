"use client";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Mail, Moon, PhoneCall, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const iconButton =
  "relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-foreground/80 transition-[background-color,color,scale] duration-300 hover:bg-foreground/[0.07] hover:text-foreground active:scale-90 [&_svg]:size-[18px]";

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
    <header className="w-full border-b border-hairline nav-glass sticky top-0 z-50">
        <div className="shell flex h-12 items-center justify-between">
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
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={handleMail}
              aria-label="Send email"
              title="kakon.aiubcse@gmail.com"
              className={iconButton}
            >
              <Mail />
            </button>
            <button
              type="button"
              onClick={handleCall}
              aria-label="Contact via WhatsApp"
              title="01923089370 (4PM – 11PM)"
              className={iconButton}
            >
              <PhoneCall />
            </button>
            <button
              type="button"
              onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={iconButton}
            >
              <Sun
                className={cn(
                  "absolute transition-[rotate,scale,opacity] duration-500 ease-out-expo",
                  theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
                )}
              />
              <Moon
                className={cn(
                  "absolute transition-[rotate,scale,opacity] duration-500 ease-out-expo",
                  theme === "dark" ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                )}
              />
            </button>
          </div>
        </div>
    </header>
  );
}
