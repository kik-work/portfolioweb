import { useContext } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import {  MailQuestionMark, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
const handleMessage = () => {
  toast.success("Message sent!");
}
const handleMail = () => {
  toast.success("Mail sent!");
}
  return (
    <header className="w-full border-b border-primary bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <div
        className="
          mx-auto 
          w-full 
          flex items-center justify-between 
          py-4 px-4 
        
          max-w-sm
          sm:max-w-md
          md:max-w-2xl
          lg:max-w-4xl
          xl:max-w-6xl
          2xl:max-w-7xl
        "
      >
        <h1 className="text-xl font-semibold tracking-tight">KIK Logo</h1>

        <div className="flex items-center gap-4">
          <Button variant="default" onClick={handleMail}><MailQuestionMark className="h-4 w-4"/> </Button>
          <Button variant="outline" onClick={handleMessage}><MessageCircleMore className="text-primary h-4 w-4"/> </Button>
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
