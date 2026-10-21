import React, { useState, useEffect, useRef } from "react";
import { ChatBubble, BotAvatar } from "./ChatBubble";
import cvData from "@/data/cvMockData.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowUp,
  Briefcase,
  CodeXml,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
  RotateCcw,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { DragScroller } from "@/components/ui/drag-scroller";
import type { BotPayload, ExperiencePayload, SkillChip, SkillLevel, WelcomePayload } from "./ChatBubble";

// Bump when the stored message shape changes so stale payloads never reach the renderer.
const CHAT_STORAGE_KEY = "cv-chat-messages-v2";
const LEGACY_STORAGE_KEY = "cv-chat-messages";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  // user messages are always plain strings;
  // bot messages can be a structured payload OR a plain string
  text: string | BotPayload;
}

const topics: { label: string; icon: LucideIcon }[] = [
  { label: "About", icon: UserRound },
  { label: "Experience", icon: Briefcase },
  { label: "Skills", icon: CodeXml },
  { label: "Projects", icon: FolderGit2 },
  { label: "Education", icon: GraduationCap },
  { label: "Contact", icon: Mail },
  { label: "Tech Stack", icon: Layers },
];

const gradient = "bg-[image:linear-gradient(135deg,var(--primary),#6e3cf0)]";

/* ------------------------------------------------------------------ */
/*  Response engine — returns BotPayload (typed) or string             */
/* ------------------------------------------------------------------ */
const welcome: WelcomePayload = { type: "welcome" };

/**
 * True when any term starts a word in the question. A trailing "$" also
 * requires the word to end there ("react$" skips "reaction"); terms of three
 * letters or fewer always do ("git" skips "digital").
 */
const has = (q: string, ...terms: string[]) =>
  terms.some((raw) => {
    const exact = raw.endsWith("$") || raw.length <= 3;
    const term = raw.replace(/\$$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${term}${exact ? "\\b" : ""}`).test(q);
  });

const chips = (list: { name: string; level: string }[]): SkillChip[] =>
  list.map(({ name, level }) => ({ name, level: level as SkillLevel }));

const { skills: s } = cvData;

const technicalSections = [
  { label: "Languages", items: chips(s.languages) },
  { label: "Frameworks", items: chips(s.frameworks) },
  { label: "Technologies", items: chips(s.technologies) },
  { label: "Databases", items: chips(s.databases) },
  { label: "Tools", items: chips(s.tools) },
];

const additionalSections = s.additional.map((g) => ({
  label: g.title,
  items: g.items.map((name) => ({ name })),
}));

// Generic title words that would match too many projects.
const PROJECT_STOPWORDS = new Set(["project", "projects", "management", "info", "with"]);
const PROJECT_ALIASES: Record<number, string[]> = {
  5: ["eshop", "e-shop"],
  6: ["ecommerce", "e-commerce"],
  7: ["momita", "doctor", "healthcare"],
  8: ["qr"],
};

// Keeps only the best-matching projects, so "lukaz shop" skips "E-Shop Management".
function findProjects(q: string) {
  const scored = cvData.projects.map((p) => {
    const title = p.title.toLowerCase();
    const tokens = title.split(/[^a-z0-9]+/).filter((t) => t.length > 3 && !PROJECT_STOPWORDS.has(t));
    const acronym = title.match(/\(([a-z]+)\)/)?.[1];
    const terms = [...tokens, ...(acronym ? [acronym] : []), ...(PROJECT_ALIASES[p.id] ?? [])];
    return { p, hits: q.includes(title) ? 99 : terms.filter((t) => has(q, t)).length };
  });
  const best = Math.max(0, ...scored.map((x) => x.hits));
  return best === 0 ? [] : scored.filter((x) => x.hits === best).map((x) => x.p);
}

// "Softtech Solution Ltd" -> "softtech"; "Alor Feri Limited" -> "alor feri"
const companyKey = (company: string) =>
  company.toLowerCase().replace(/\b(ltd|limited|llc|solution)\b/g, "").trim();

const toJobs = (list: typeof cvData.experience): ExperiencePayload => ({
  type: "experience",
  jobs: list.map((e) => ({
    role: e.role,
    company: e.company,
    period: e.period,
    type: e.type,
    current: e.current,
    link: e.link,
    details: e.details,
  })),
});

function buildResponse(input: string): string | BotPayload {
  const q = input.toLowerCase().trim();

  /* ── Greeting / thanks ───────────────────────────────────────── */
  if (/^(hi|hello|hey|salam|assalamu)\b/.test(q) && q.split(/\s+/).length <= 4) return welcome;
  if (has(q, "thank") || ["ok", "okay", "cool", "great", "nice"].includes(q)) {
    return `You're welcome! Feel free to ask anything else about Kakon's background or work.`;
  }

  /* ── A specific company ──────────────────────────────────────── */
  const companyJobs = cvData.experience.filter((e) => {
    const key = companyKey(e.company);
    const first = key.split(" ")[0];
    return q.includes(key) || (first.length >= 5 && has(q, first));
  });
  if (companyJobs.length) {
    return { ...toJobs(companyJobs), intro: `Here's what I did at ${companyJobs[0].company}:` };
  }

  /* ── Internships ─────────────────────────────────────────────── */
  if (has(q, "intern")) {
    const interns = cvData.experience.filter((e) => e.type === "Internship");
    return { ...toJobs(interns), intro: "My internships:" };
  }

  /* ── Current job / company ───────────────────────────────────── */
  if (has(q, "current job", "current role", "current company", "where do you work", "where are you working")) {
    return cvData.faq.currentJob;
  }

  /* ── Availability / hire ─────────────────────────────────────── */
  if (has(q, "available", "availability", "hire", "hiring", "open to work", "looking for job")) {
    return cvData.faq.availability;
  }

  /* ── Strength / best at ──────────────────────────────────────── */
  if (has(q, "strength", "best at", "good at", "speciali", "backend", "frontend", "full stack", "full-stack", "fullstack")) {
    return cvData.faq.strengths;
  }

  /* ── Client / live projects ──────────────────────────────────── */
  if (has(q, "client project", "client work", "live project", "production")) {
    return {
      type: "projects",
      intro: "Live client work I've built or shipped:",
      items: cvData.projects.filter((p) => p.type === "client"),
    };
  }
  if (has(q, "personal project")) {
    return {
      type: "projects",
      intro: "My personal projects:",
      items: cvData.projects.filter((p) => p.type === "personal"),
    };
  }

  /* ── Stack ───────────────────────────────────────────────────── */
  if (has(q, "preferred stack", "favourite stack", "favorite stack")) return cvData.faq.preferredStack;
  if (has(q, "tech stack", "stack")) {
    return { type: "techstack", intro: "Here's the stack I work with:", sections: technicalSections };
  }

  /* ── Soft / additional skills ────────────────────────────────── */
  if (has(q, "soft skill", "additional", "professional skill", "other skill")) {
    return { type: "techstack", intro: "Beyond code, here's what else I bring:", sections: additionalSections };
  }
  if (has(q, "speak", "english", "bengali", "bangla", "typing", "communicat")) {
    return {
      type: "techstack",
      sections: additionalSections.filter((g) => g.label === "Communication"),
    };
  }

  /* ── Skill categories ────────────────────────────────────────── */
  if (has(q, "language", "programming")) {
    return { type: "techstack", intro: "Programming languages I use:", sections: technicalSections.slice(0, 1) };
  }
  if (has(q, "framework", "library", "libraries")) {
    return { type: "techstack", intro: "Frameworks I build with:", sections: technicalSections.slice(1, 2) };
  }
  if (has(q, "database", "db", "sql", "mongo", "postgres", "supabase", "firebase")) {
    return { type: "techstack", intro: "Databases I work with:", sections: technicalSections.slice(3, 4) };
  }
  if (has(q, "tool", "postman", "vscode", "vs code", "git", "cpanel", "cyberpanel", "vercel", "figma")) {
    return { type: "techstack", intro: "Tools I use daily:", sections: technicalSections.slice(4) };
  }

  /* ── Skills (all) ────────────────────────────────────────────── */
  if (has(q, "skill", "technolog", "expertise", "proficien")) {
    return {
      type: "techstack",
      intro: `Here's a full breakdown of my skills. Ask for "soft skills" to see the rest.`,
      sections: technicalSections,
    };
  }

  /* ── Single technologies ─────────────────────────────────────── */
  if (has(q, "laravel", "php")) {
    return `Laravel is one of my strongest skills (Advanced, 9/10). I use it for backend applications, RESTful APIs, Sanctum authentication, Spatie roles & permissions, queue jobs, schedulers, and real-time messaging. I work with it daily at Softtech Solution Ltd.`;
  }
  if (has(q, "next.js", "nextjs", "next js")) {
    return `Next.js is my primary frontend framework (Advanced, 9/10). I use it with TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, and Redux. Most of my production client projects are built on Next.js.`;
  }
  if (has(q, "react$", "react.js", "reactjs")) {
    return `React.js — Advanced level. I use it with hooks, Redux, TanStack Query, and component libraries like Shadcn UI. This portfolio is itself built with React + Vite + TypeScript.`;
  }
  if (has(q, "stripe", "bkash", "nagad", "payment", "gateway", "courier", "steadfast", "pathao")) {
    return `I integrate payment gateways and couriers in production: Stripe for international payments, bKash and Nagad for local Bangladesh payments, and Steadfast and Pathao courier APIs for order delivery.`;
  }

  /* ── Experience ──────────────────────────────────────────────── */
  if (has(q, "experience", "work history", "job history", "career", "worked", "companies", "employment", "job")) {
    return { ...toJobs(cvData.experience), intro: "Here's my work history, newest first:" };
  }

  /* ── Education ───────────────────────────────────────────────── */
  if (has(q, "education", "degree", "universit", "cgpa", "gpa", "aiub", "study", "studied", "academic", "college", "school", "hsc", "ssc", "certificat", "cisco")) {
    return {
      type: "education",
      intro: "My academic background:",
      entries: cvData.education,
      certificates: cvData.certificates,
    };
  }

  /* ── Summary ─────────────────────────────────────────────────── */
  if (has(q, "summary", "overview", "profile", "bio$")) return cvData.summary;

  /* ── Specific project lookup, then all projects ──────────────── */
  const matches = findProjects(q);
  if (matches.length) return { type: "projects", items: matches };
  if (has(q, "project", "built", "portfolio work", "work samples")) {
    return { type: "projects", intro: `All ${cvData.projects.length} projects in my showcase:`, items: cvData.projects };
  }

  /* ── Contact ─────────────────────────────────────────────────── */
  if (has(q, "contact", "email", "phone", "reach", "linkedin", "github", "portfolio", "whatsapp", "call")) {
    const c = cvData.contact;
    return {
      type: "contact",
      intro: "Here's how to reach me:",
      name: c.name,
      email: c.email,
      phone: c.phone,
      linkedin: c.linkedin,
      github: c.github,
      portfolio: c.portfolio,
    };
  }

  /* ── Who / about ─────────────────────────────────────────────── */
  if (has(q, "who are you", "about you", "yourself", "introduce", "tell me about", "about$", "name", "kakon", "khairul", "who is")) {
    return {
      type: "whoami",
      name: cvData.contact.name,
      title: "Full-Stack Software Engineer",
      location: "Bangladesh",
      summary:
        "Full-stack engineer based in Bangladesh, building production web apps and e-commerce platforms with Laravel, Next.js and TypeScript.",
      highlights: ["Laravel", "Next.js", "TypeScript", "REST APIs", "MySQL", "PostgreSQL"],
      company: "Softtech Solution Ltd",
      email: cvData.contact.email,
      github: cvData.contact.github,
      portfolio: cvData.contact.portfolio,
    };
  }

  /* ── Fallback ────────────────────────────────────────────────── */
  return `I'm not sure about that one. Try asking about:\n• Skills (Laravel, Next.js, databases…)\n• Experience or career\n• Projects\n• Education\n• Contact info\n\nOr tap one of the topics below.`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
// Longer answers "type" a little longer; cards count as a medium-length answer.
const typingDelay = (reply: string | BotPayload) =>
  450 + Math.min(typeof reply === "string" ? reply.length : 180, 300);

const initialMessages = (): Message[] => [{ sender: "bot", text: welcome }];

function loadMessages(): Message[] {
  if (typeof window === "undefined") return initialMessages();
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as Message[];
  } catch {
    /* storage blocked or corrupt — start fresh */
  }
  return initialMessages();
}

export const CVChatModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or blocked */
    }
  }, [messages]);

  useEffect(() => {
    const clearOnReload = () => {
      try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("beforeunload", clearOnReload);
    return () => {
      window.removeEventListener("beforeunload", clearOnReload);
      clearTimeout(timer.current);
    };
  }, []);

  // New bot cards start at their top edge so long answers are read from the beginning.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (!loading && last?.sender === "bot" && messages.length > 1) {
      const node = el.querySelectorAll<HTMLElement>("[data-msg]")[messages.length - 1];
      if (node) {
        el.scrollTo({ top: Math.max(0, node.offsetTop - 12), behavior: "smooth" });
        return;
      }
    }
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage || loading) return;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);
    const reply = buildResponse(userMessage);
    timer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setLoading(false);
    }, typingDelay(reply));
  };

  const handleReset = () => {
    clearTimeout(timer.current);
    setLoading(false);
    setInput("");
    setMessages(initialMessages());
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          // Only pop the keyboard on devices with a precise pointer.
          e.preventDefault();
          if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
        }}
        className="top-auto right-3 bottom-3 left-3 flex h-[min(42rem,calc(100dvh-1.5rem))] w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-[1.75rem] border-0 bg-background p-0 shadow-float ring-1 ring-hairline sm:right-6 sm:bottom-6 sm:left-auto sm:w-[27rem] sm:max-w-[27rem]"
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center gap-3 border-b border-hairline px-4 py-3.5 text-left">
          <BotAvatar className="mt-0 size-10" />
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-base leading-tight font-semibold tracking-[-0.015em]">
              CV Assistant
            </DialogTitle>
            <DialogDescription className="mt-1 flex items-center gap-1.5 text-xs leading-none">
              <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-success" />
              Online · Ask about Kakon's work
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Start a new conversation"
            title="New conversation"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary text-muted-foreground transition-[color,scale] hover:text-foreground active:scale-90"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </button>
          <DialogClose
            aria-label="Close chat"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-secondary text-muted-foreground transition-[color,scale] hover:text-foreground active:scale-90"
          >
            <X className="size-4" aria-hidden="true" />
          </DialogClose>
        </DialogHeader>

        {/* Messages */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-1"
        >
          {messages.map((msg, idx) => (
            <div key={idx} data-msg>
              <ChatBubble message={msg.text} sender={msg.sender} onAsk={handleSend} />
            </div>
          ))}

          {loading && (
            <div className="animate-rise-in mb-4 flex items-start gap-2.5" role="status" aria-label="Assistant is typing">
              <BotAvatar />
              <div className="flex items-center gap-1 rounded-[1.25rem] rounded-tl-md bg-card px-4 py-3.5 ring-1 ring-hairline">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick topics: drag, wheel, or use the arrows */}
        <DragScroller label="Quick topics" className="gap-2 px-4 py-2">
          {topics.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              disabled={loading}
              onClick={() => handleSend(label)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-card px-3.5 py-2 text-sm font-medium ring-1 ring-hairline transition-[background-color,scale,opacity] hover:bg-secondary active:scale-95 disabled:opacity-50"
            >
              <Icon className="size-4 text-link" aria-hidden="true" />
              {label}
            </button>
          ))}
        </DragScroller>

        {/* Input */}
        <form
          className="px-4 pt-1 pb-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-card p-1.5 pl-5 ring-1 ring-hairline transition-shadow focus-within:ring-2 focus-within:ring-ring">
            <input
              ref={inputRef}
              aria-label="Message"
              className="h-9 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              placeholder="Ask about skills, projects, experience…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full ${gradient} text-white transition-[opacity,scale] hover:opacity-90 active:scale-90 disabled:pointer-events-none disabled:opacity-35`}
            >
              <ArrowUp className="size-[1.125rem]" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
