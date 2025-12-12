import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeContext } from "../../context/ThemeContext";
import {
  MailQuestionMark,
  MessageCircleMore,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { TabContainers } from "../TapContainer";
const tabs = TabContainers;
export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleMessage = () => toast.success("Message sent!");
  const handleMail = () => toast.success("Mail sent!");

  return (
    <header className="w-full border-b dark:border-muted bg-background/60 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto w-full flex items-center justify-between py-4 px-4 max-w-7xl">
        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-tight">KIK </h1>

        {/* Desktop buttons */}
        <div className="items-center gap-4 hidden sm:flex">
          <Button variant="default" onClick={handleMail}>
            <MailQuestionMark className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleMessage}>
            <MessageCircleMore className="text-primary h-4 w-4" />
          </Button>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            className="h-4 w-4"
          />
        </div>

        {/* Mobile menu using Popover */}
        <div className="sm:hidden mr-2">
          <Popover>
            <PopoverTrigger asChild>
              <div className="mx-5 flex items-center gap-5">
                <Button variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="h-4 w-4"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-36 bg-secondary  py-4  border-primary">
              <div>
                <div>
                  {" "}
                  {tabs.map((tab) => (
                    <Button
                      key={tab}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => console.log(`Selected tab: ${tab}`)}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 my-4 border-t p-2">
                  <Button variant="default" onClick={handleMail}>
                    <MailQuestionMark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleMessage}>
                    <MessageCircleMore className="text-primary h-4 w-4" />
                  </Button>
                </div>
              </div>
              <span className="flex items-center justify-center italic text-muted-foreground text-sm">KIK</span>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
