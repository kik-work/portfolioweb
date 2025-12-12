import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ThemeContext } from "../../context/ThemeContext";
import { MailQuestionMark, MessageCircleMore } from "lucide-react";
import { toast } from "sonner";


export function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);


    const handleMessage = () => toast.success("Message sent!");
    const handleMail = () => toast.success("Mail sent!");

    return (
        <header className="w-full border-b dark:border-muted bg-background/60 backdrop-blur-md sticky top-0 z-50">
            <div className="mx-auto w-full flex items-center justify-between p-2 max-w-7xl">
                {/* Logo */}
                <div className="flex items-center gap-2"><img src="/src/assets/logo.png" alt="Logo" className="h-10 w-16 rounded-md" />
                    <h1 className="text-sm font-normal  text-muted-foreground">Khairul Islam Kakon</h1>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 mr-5">
                    <Button variant="default" onClick={handleMail}>
                        <MailQuestionMark className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" onClick={handleMessage}>
                        <MessageCircleMore className="text-primary h-3 w-3" />
                    </Button>
                    <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} className="h-4 w-4" />
                </div>
            </div>
        </header>
    );
}
