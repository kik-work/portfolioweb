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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import type { BotPayload, WhoAmIPayload, WelcomePayload } from "./ChatBubble";

const CHAT_STORAGE_KEY = "cv-chat-messages";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  // user messages are always plain strings;
  // bot messages can be a structured payload OR a plain string
  text: string | BotPayload;
}

const badges = [
  "Who are you?",
  "Experience",
  "Skills",
  "Projects",
  "Education",
  "Contact",
  "Tech Stack",
];

/* ------------------------------------------------------------------ */
/*  Response engine — returns BotPayload (typed) or string             */
/* ------------------------------------------------------------------ */
function buildResponse(input: string): string | BotPayload {
  const q = input.toLowerCase().trim();

  /* ── Who / about ─────────────────────────────────────────────── */
  if (
    q.includes("who are you") ||
    q.includes("about you") ||
    q.includes("introduce") ||
    q.includes("tell me about") ||
    q === "who are you?"
  ) {
    return {
      type: "whoami",
      name: "Khairul Islam Kakon",
      title: "Full-Stack Software Engineer",
      location: "Bangladesh",
      summary: "I'm Khairul Islam Kakon, a full-stack software engineer based in Bangladesh. I specialize in Laravel and Next.js.",
      highlights: ["Laravel", "Next.js", "TypeScript", "REST APIs"],
      company: "Alor Feri Limited",
      email: cvData.contact.email,
      github: cvData.contact.github,
      portfolio: cvData.contact.portfolio,
    };
  }

  /* ── Current job / company ───────────────────────────────────── */
  if (
    q.includes("current job") ||
    q.includes("current role") ||
    q.includes("current company") ||
    q.includes("where do you work") ||
    q.includes("where are you working")
  ) {
    return cvData.faq.currentJob;
  }

  /* ── Tech Stack ──────────────────────────────────────────────── */
  if (
    q.includes("tech stack") ||
    q.includes("preferred stack") ||
    q.includes("favourite stack") ||
    q.includes("favorite stack") ||
    q === "tech stack"
  ) {
    const s = cvData.skills;
    return {
      type: "techstack",
      sections: [
        { label: "Languages",        items: s.languages.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Frameworks",       items: s.frameworks.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Technologies",     items: s.technologies.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Databases",        items: s.databases.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Tools",            items: s.tools.map((x) => ({ name: x.name, level: x.level })) },
      ],
    };
  }

  /* ── Availability / hire ─────────────────────────────────────── */
  if (
    q.includes("available") ||
    q.includes("availability") ||
    q.includes("hire") ||
    q.includes("open to work") ||
    q.includes("looking for job")
  ) {
    return cvData.faq.availability;
  }

  /* ── Strength / best at ──────────────────────────────────────── */
  if (
    q.includes("strength") ||
    q.includes("best at") ||
    q.includes("good at") ||
    q.includes("speciali")
  ) {
    return cvData.faq.strengths;
  }

  /* ── Client / live projects ──────────────────────────────────── */
  if (
    q.includes("client project") ||
    q.includes("live project") ||
    q.includes("production")
  ) {
    return cvData.faq.clientProjects;
  }

  /* ── Summary ─────────────────────────────────────────────────── */
  if (q.includes("summary") || q.includes("overview") || q.includes("profile")) {
    return cvData.summary;
  }

  /* ── Experience ──────────────────────────────────────────────── */
  if (
    q.includes("experience") ||
    q.includes("work history") ||
    q.includes("job history") ||
    q.includes("career") ||
    q === "experience"
  ) {
    return {
      type: "experience",
      jobs: cvData.experience.map((e) => ({
        role: e.role,
        company: e.company,
        period: e.period,
        details: e.details,
      })),
    };
  }

  /* ── Alor Feri ───────────────────────────────────────────────── */
  if (q.includes("alor feri")) {
    const jobs = cvData.experience.filter((e) =>
      e.company.toLowerCase().includes("alor feri")
    );
    return {
      type: "experience",
      jobs: jobs.map((e) => ({
        role: e.role,
        company: e.company,
        period: e.period,
        details: e.details,
      })),
    };
  }

  /* ── Internship ──────────────────────────────────────────────── */
  if (q.includes("intern")) {
    const intern = cvData.experience.find((e) =>
      e.role.toLowerCase().includes("intern")
    );
    if (intern) {
      return {
        type: "experience",
        jobs: [
          {
            role: intern.role,
            company: intern.company,
            period: intern.period,
            details: intern.details,
          },
        ],
      };
    }
  }

  /* ── Education ───────────────────────────────────────────────── */
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("cgpa") ||
    q.includes("aiub") ||
    q.includes("study") ||
    q.includes("academic") ||
    q === "education"
  ) {
    return {
      type: "education",
      entries: cvData.education.map((e) => ({
        degree: e.degree,
        university: e.university,
        session: e.session,
        major: e.major,
        cgpa: e.cgpa,
      })),
    };
  }

  /* ── Skills (all) ────────────────────────────────────────────── */
  if (
    q === "skills" ||
    q.includes("all skills") ||
    q.includes("what skills") ||
    (q.includes("skill") &&
      !q.includes("soft") &&
      !q.includes("additional") &&
      !q.includes("language") &&
      !q.includes("database") &&
      !q.includes("framework") &&
      !q.includes("tool"))
  ) {
    const s = cvData.skills;
    return {
      type: "techstack",
      sections: [
        { label: "Languages",    items: s.languages.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Frameworks",   items: s.frameworks.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Technologies", items: s.technologies.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Databases",    items: s.databases.map((x) => ({ name: x.name, level: x.level })) },
        { label: "Tools",        items: s.tools.map((x) => ({ name: x.name, level: x.level })) },
      ],
    };
  }

  /* ── Languages ───────────────────────────────────────────────── */
  if (
    q.includes("language") &&
    (q.includes("program") ||
      q.includes("coding") ||
      q.includes("know") ||
      q === "languages")
  ) {
    return {
      type: "techstack",
      sections: [
        {
          label: "Programming Languages",
          items: cvData.skills.languages.map((x) => ({ name: x.name, level: x.level })),
        },
      ],
    };
  }

  /* ── Frameworks ──────────────────────────────────────────────── */
  if (q.includes("framework") || q.includes("library") || q.includes("libraries")) {
    return {
      type: "techstack",
      sections: [
        {
          label: "Frameworks & Libraries",
          items: cvData.skills.frameworks.map((x) => ({ name: x.name, level: x.level })),
        },
      ],
    };
  }

  /* ── Databases ───────────────────────────────────────────────── */
  if (
    q.includes("database") ||
    q.includes(" db") ||
    q.includes("sql") ||
    q.includes("mongo")
  ) {
    return {
      type: "techstack",
      sections: [
        {
          label: "Databases",
          items: cvData.skills.databases.map((x) => ({ name: x.name, level: x.level })),
        },
      ],
    };
  }

  /* ── Tools ───────────────────────────────────────────────────── */
  if (
    q.includes("tool") ||
    q.includes("postman") ||
    q.includes("vscode") ||
    q.includes("vs code") ||
    q.includes("git")
  ) {
    return {
      type: "techstack",
      sections: [
        {
          label: "Tools",
          items: cvData.skills.tools.map((x) => ({ name: x.name, level: x.level })),
        },
      ],
    };
  }

  /* ── Soft / additional skills ────────────────────────────────── */
  if (
    q.includes("soft skill") ||
    q.includes("additional skill") ||
    q.includes("professional skill")
  ) {
    const a = cvData.skills.additional;
    return (
      `🧠 Backend Architecture: ${a.backendArchitecture.join(", ")}\n` +
      `💼 Soft Skills: ${a.softSkills.join(", ")}\n` +
      `📋 Planning: ${a.planning.join(", ")}\n` +
      `🎨 Creative: ${a.creative.join(", ")}\n` +
      `🗣️ Communication: ${a.communication.join(", ")}`
    );
  }

  /* ── Laravel ─────────────────────────────────────────────────── */
  if (q.includes("laravel")) {
    return `Laravel is one of my strongest skills (Advanced). I use it for backend applications, RESTful APIs, Sanctum authentication, Spatie role & permissions, queue jobs, schedulers, and real-time messaging. I work with it daily at Alor Feri Limited.`;
  }

  /* ── Next.js ─────────────────────────────────────────────────── */
  if (
    q.includes("next.js") ||
    q.includes("nextjs") ||
    q.includes("next js")
  ) {
    return `Next.js is my primary frontend framework (Advanced, rating 9/10). I use it with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Redux. Most of my production client projects are built on Next.js.`;
  }

  /* ── React ───────────────────────────────────────────────────── */
  if (q.includes("react")) {
    return `React.js — Advanced level. I use it with hooks, Redux, TanStack Query, and component libraries like Shadcn UI. My portfolio site is itself built with React + Vite + TypeScript.`;
  }

  /* ── Payment / Stripe / Bkash ────────────────────────────────── */
  if (
    q.includes("stripe") ||
    q.includes("bkash") ||
    q.includes("payment")
  ) {
    return `I have hands-on experience integrating payment gateways — Stripe for international payments and Bkash for local Bangladesh payments. Both are integrated in my production projects.`;
  }

  /* ── Projects (all) ──────────────────────────────────────────── */
  if (
    q === "projects" ||
    q.includes("all projects") ||
    q.includes("what projects") ||
    q.includes("show project") ||
    q.includes("your project") ||
    (q.includes("project") &&
      !q.includes("client") &&
      !q.includes("personal") &&
      !q.includes("live"))
  ) {
    return { type: "projects", items: cvData.projects };
  }

  /* ── Personal projects ───────────────────────────────────────── */
  if (q.includes("personal project")) {
    return {
      type: "projects",
      items: cvData.projects.filter((p) => p.type === "personal"),
    };
  }

  /* ── Specific project lookup ─────────────────────────────────── */
  const projectMatch = cvData.projects.find(
    (p) =>
      q.includes(p.title.toLowerCase()) ||
      p.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && q.includes(word))
  );
  if (projectMatch) {
    return { type: "projects", items: [projectMatch] };
  }

  /* ── Contact ─────────────────────────────────────────────────── */
  if (
    q === "contact" ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("portfolio")
  ) {
    const c = cvData.contact;
    return {
      type: "contact",
      name: c.name,
      email: c.email,
      phone: c.phone,
      linkedin: c.linkedin,
      github: c.github,
      portfolio: c.portfolio,
    };
  }

  /* ── Name ────────────────────────────────────────────────────── */
  if (
    q.includes("name") ||
    q.includes("kakon") ||
    q.includes("khairul")
  ) {
    return `My name is Khairul Islam Kakon — a full-stack software engineer from Bangladesh. You can reach me at kakon.aiubcse@gmail.com.`;
  }

  /* ── Greeting ────────────────────────────────────────────────── */
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hi ") ||
    q.startsWith("hello ") ||
    q.startsWith("hey ")
  ) {
    return `Hi there! 👋 I'm Kakon's CV assistant. Ask me anything about his experience, skills, projects, or how to get in touch. Or tap a badge below!`;
  }

  /* ── Thanks ──────────────────────────────────────────────────── */
  if (
    q.includes("thank") ||
    q === "ok" ||
    q === "okay" ||
    q === "cool" ||
    q === "great"
  ) {
    return `You're welcome! Feel free to ask anything else about Kakon's background or work. 😊`;
  }

  /* ── Fallback ────────────────────────────────────────────────── */
  return `I'm not sure about that one. Try asking about:\n• Experience or career\n• Skills (Laravel, Next.js, databases…)\n• Projects\n• Education\n• Contact info\n\nOr just tap one of the badges below!`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export const CVChatModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return [
      {
        sender: "bot" as Sender,
        text: { type: "welcome" } as WelcomePayload,
      },
    ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const clearOnReload = () => localStorage.removeItem(CHAT_STORAGE_KEY);
    window.addEventListener("beforeunload", clearOnReload);
    return () => window.removeEventListener("beforeunload", clearOnReload);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const addBotMessage = async (text: string | BotPayload) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
    setMessages((prev) => [...prev, { sender: "bot", text }]);
    setLoading(false);
  };

  const handleSend = (text?: string) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage) return;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    addBotMessage(buildResponse(userMessage));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="fixed bottom-4 mr-1 md:right-4 left-auto top-auto translate-x-0 translate-y-0 w-full max-w-md
        h-[70vh] rounded-2xl flex flex-col bg-background dark:bg-background shadow-xl [&>button]:hidden"
      >
        {/* Header */}
        <DialogHeader className="flex flex-row justify-between items-center border-b border-muted">
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

        <DialogDescription className="text-xs text-slate-500">
          Ask me anything about Kakon's background, skills, or projects.
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
        <div className="flex overflow-x-auto pb-4 gap-2 mb-2 no-scrollbar">
          {badges.map((b) => (
            <button key={b} onClick={() => handleSend(b)} className="rounded-full shrink-0">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {b}
              </Badge>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            className="flex-1 rounded-xl"
            placeholder="Ask about skills, projects, experience…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSend()}
            aria-label="Send message"
            className="rounded-2xl border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
