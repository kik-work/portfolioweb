/* eslint-disable no-case-declarations */
import React, { useState, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import cvData from "@/data/cvMockData.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Bot, Send, X } from "lucide-react";
import { Badge } from "./ui/badge";

const CHAT_STORAGE_KEY = "cv-chat-messages";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  text: string;
}

const badges = [
  "Summary",
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Contact",
];

export const CVChatModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    return [
      {
        sender: "bot",
        text: "Hi! I'm your CV assistant. Ask a question or click a badge below.",
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Clear messages on page reload
  useEffect(() => {
    const clearOnReload = () => localStorage.removeItem(CHAT_STORAGE_KEY);
    window.addEventListener("beforeunload", clearOnReload);
    return () => window.removeEventListener("beforeunload", clearOnReload);
  }, []);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const addBotMessage = async (text: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
    setMessages((prev) => [...prev, { sender: "bot", text }]);
    setLoading(false);
  };

  const handleBadgeClick = (badge: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: badge }]);

    let botText = "";
    switch (badge.toLowerCase()) {
      case "summary":
        botText = cvData.summary;
        break;
      case "experience":
        botText = cvData.experience
          .map(
            (e) =>
              `${e.role} at ${e.company} (${e.period})\n- ${e.details.join(
                "\n- "
              )}`
          )
          .join("\n\n");
        break;
      case "education":
        botText = cvData.education
          .map(
            (e) =>
              `${e.degree}, ${e.university} (${e.session})\nMajor: ${e.major}, CGPA: ${e.cgpa}`
          )
          .join("\n\n");
        break;
      case "skills":
        botText = cvData.skills.join(", ");
        break;
      case "projects":
        botText = cvData.projects
          .map((p) => `${p.title}: ${p.description} (${p.link})`)
          .join("\n\n");
        break;
      case "contact":
        const c = cvData.contact;
        botText = `Name: ${c.name}\nPhone: ${c.phone}\nEmail: ${c.email}\nLinkedIn: ${c.linkedin}\nPortfolio: ${c.portfolio}\nGitHub: ${c.github}`;
        break;
      default:
        botText = "I don't have information on that.";
    }

    addBotMessage(botText);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const keyword = userMessage.toLowerCase();
    if (keyword.includes("experience")) handleBadgeClick("experience");
    else if (keyword.includes("skill")) handleBadgeClick("skills");
    else if (keyword.includes("education")) handleBadgeClick("education");
    else if (keyword.includes("project")) handleBadgeClick("projects");
    else if (keyword.includes("contact")) handleBadgeClick("contact");
    else if (keyword.includes("summary")) handleBadgeClick("summary");
    else
      addBotMessage(
        "Sorry, I couldn't find that. Try selecting a badge below."
      );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className=" fixed bottom-4 mr-1 md:right-4 left-auto top-auto translate-x-0 translate-y-0 w-full max-w-md
        h-[70vh] rounded-2xl  flex flex-col bg-background dark:bg-background shadow-xl [&>button]:hidden
        "
      >
        {/* Header */}
        <DialogHeader className="flex flex-row justify-between items-center  border-b border-muted ">
          <DialogTitle className="flex items-center gap-2" asChild>
            <div className="flex items-center gap-2">
              <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                CV Chat Assistant
              </span>
              <Bot className="text-primary" />
            </div>
          </DialogTitle>
          <DialogClose>
            <X className="h-4 w-4 cursor-pointer text-destructive" />
          </DialogClose>
        </DialogHeader>

        {/* Accessibility description */}
        <DialogDescription className="text-xs text-slate-500">
          Chat with AI about your CV
        </DialogDescription>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 px-2">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg.text} sender={msg.sender} />
          ))}

          {loading && (
            <div className="flex justify-start mb-3">
              <Badge className="bg-primary text-background px-4 py-2 rounded-2xl animate-pulse">
                Typing...
              </Badge>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-2">
          {badges.map((b) => (
            <button
              key={b}
              onClick={() => handleBadgeClick(b)}
              className="rounded-full"
            >
              <Badge variant="outline">{b}</Badge>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2 dark:bg-gray-700 dark:text-white"
            placeholder="Type a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="border border-primary rounded-2xl hover:text-background hover:bg-primary"
          >
            <Send className="m-2 cursor-pointer" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
