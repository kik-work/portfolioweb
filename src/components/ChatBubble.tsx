import React from "react";

/* ------------------------------------------------------------------ */
/*  Payload types (exported so CVChatModal can use them)               */
/* ------------------------------------------------------------------ */
export type SkillLevel = "Advanced" | "Intermediate" | "Basic";

export interface SkillChip {
  name: string;
  level: SkillLevel;
}

export interface TechStackPayload {
  type: "techstack";
  sections: { label: string; items: SkillChip[] }[];
}

export interface ExperiencePayload {
  type: "experience";
  jobs: {
    role: string;
    company: string;
    period: string;
    details: string[];
  }[];
}

export interface EducationPayload {
  type: "education";
  entries: {
    degree: string;
    university: string;
    session: string;
    major: string;
    cgpa: string;
  }[];
}

export interface ProjectsPayload {
  type: "projects";
  items: {
    id?: number;
    title: string;
    description: string;
    tech: string[];
    link: string;
    type: string;
  }[];
}

export interface ContactPayload {
  type: "contact";
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface WelcomePayload {
  type: "welcome";
}

export interface WhoAmIPayload {
  type: "whoami";
  name: string;
  title: string;
  location: string;
  summary: string;
  highlights: string[];
  company: string;
  email: string;
  github: string;
  portfolio: string;
}

export type BotPayload =
  | WelcomePayload
  | WhoAmIPayload
  | TechStackPayload
  | ExperiencePayload
  | EducationPayload
  | ProjectsPayload
  | ContactPayload;

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function linkify(text: string): React.ReactNode {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-primary break-all hover:opacity-75"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const levelColor: Record<SkillLevel, string> = {
  Advanced:     "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Intermediate: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Basic:        "bg-muted text-muted-foreground",
};

/* ------------------------------------------------------------------ */
/*  Structured renderers                                               */
/* ------------------------------------------------------------------ */

function WelcomeCard() {
  return (
    <div className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-3">
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg">
          🤖
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">CV Assistant</p>
          <p className="text-[11px] text-primary font-medium">Kakon's Portfolio Bot</p>
        </div>
      </div>

      {/* Greeting */}
      <p className="text-xs leading-relaxed opacity-80">
        Hi! 👋 Ask me anything about Kakon's experience, skills, or projects.
      </p>

      {/* Quick topics */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest opacity-40 mb-1.5">
          Quick topics
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Experience", "Skills", "Projects", "Education", "Contact"].map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhoAmICard({ payload }: { payload: WhoAmIPayload }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-3">
      {/* Name + title */}
      <div className="space-y-0.5">
        <p className="font-bold text-base leading-tight">{payload.name}</p>
        <p className="text-xs text-primary font-medium">{payload.title}</p>
        <p className="text-[11px] text-muted-foreground">📍 {payload.location}</p>
      </div>

      {/* Summary */}
      <p className="text-xs leading-relaxed opacity-80">{payload.summary}</p>

      {/* Specialises in */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest opacity-40 mb-1.5">
          Specialises in
        </p>
        <div className="flex flex-wrap gap-1.5">
          {payload.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2 pt-0.5">
        <a
          href={`mailto:${payload.email}`}
          className="text-[11px] text-primary underline hover:opacity-75"
        >
          📧 {payload.email}
        </a>
        <a
          href={payload.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-primary underline hover:opacity-75"
        >
          🐙 GitHub
        </a>
        <a
          href={payload.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-primary underline hover:opacity-75"
        >
          🌐 Portfolio
        </a>
      </div>
    </div>
  );
}

function TechStackCard({ payload }: { payload: TechStackPayload }) {
  return (
    <div className="space-y-4">
      {payload.sections.map((section) => (
        <div key={section.label}>
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-50 mb-2">
            {section.label}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {section.items.map((item) => (
              <span
                key={item.name}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${levelColor[item.level]}`}
              >
                {item.name}
                <span className="opacity-50 text-[10px] font-normal">{item.level[0]}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
      <p className="text-[10px] opacity-40 pt-1">A = Advanced · I = Intermediate · B = Basic</p>
    </div>
  );
}

function ExperienceCard({ payload }: { payload: ExperiencePayload }) {
  return (
    <div className="space-y-3">
      {payload.jobs.map((job, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-2"
        >
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="font-semibold text-sm leading-tight">{job.role}</p>
              <p className="text-xs text-primary font-medium mt-0.5">{job.company}</p>
            </div>
            <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5 shrink-0 font-medium">
              {job.period}
            </span>
          </div>
          <ul className="space-y-1">
            {job.details.map((d, di) => (
              <li key={di} className="flex gap-2 items-start text-xs opacity-80 leading-snug">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-current shrink-0 opacity-60" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationCard({ payload }: { payload: EducationPayload }) {
  return (
    <div className="space-y-3">
      {payload.entries.map((e, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-2"
        >
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="font-semibold text-sm leading-tight">{e.degree}</p>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 rounded-full px-2 py-0.5 shrink-0 font-medium">
              CGPA {e.cgpa}
            </span>
          </div>
          <p className="text-xs text-primary font-medium">{e.university}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[11px] font-medium">
              📚 {e.major}
            </span>
            <span className="rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[11px] font-medium">
              📅 {e.session}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsCard({ payload }: { payload: ProjectsPayload }) {
  return (
    <div className="space-y-3">
      {payload.items.map((p, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-1.5"
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-semibold text-sm leading-tight">{p.title}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                p.type === "client"
                  ? "bg-violet-500/15 text-violet-600 dark:text-violet-300"
                  : "bg-sky-500/15 text-sky-600 dark:text-sky-300"
              }`}
            >
              {p.type}
            </span>
          </div>
          <p className="text-xs opacity-70 leading-snug">{p.description}</p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-primary underline hover:opacity-75 break-all pt-0.5"
          >
            {p.link}
          </a>
        </div>
      ))}
    </div>
  );
}

function ContactCard({ payload }: { payload: ContactPayload }) {
  const rows = [
    { icon: "📧", label: "Email",     value: payload.email,     href: `mailto:${payload.email}` },
    { icon: "📞", label: "Phone",     value: payload.phone,     href: `tel:${payload.phone}` },
    { icon: "💼", label: "LinkedIn",  value: payload.linkedin,  href: payload.linkedin },
    { icon: "🐙", label: "GitHub",    value: payload.github,    href: payload.github },
    { icon: "🌐", label: "Portfolio", value: payload.portfolio, href: payload.portfolio },
  ];
  return (
    <div className="rounded-xl border border-border bg-background/60 dark:bg-white/5 p-3 space-y-2">
      <p className="font-semibold text-sm">📬 {payload.name}</p>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2 text-xs">
            <span className="shrink-0 w-20 opacity-50 font-medium">
              {r.icon} {r.label}
            </span>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-75 break-all"
            >
              {r.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Plain-text fallback renderer (for string messages)                 */
/* ------------------------------------------------------------------ */
function renderPlainText(message: string): React.ReactNode {
  const lines = message.split("\n");
  const nodes: React.ReactNode[] = [];
  let bulletBuffer: React.ReactNode[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      nodes.push(
        <ul key={`ul-${nodes.length}`} className="space-y-1 ml-0.5 mt-1">
          {bulletBuffer}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    const isBullet = line.startsWith("  •") || line.startsWith("• ");
    if (isBullet) {
      const text = line.replace(/^\s*•\s*/, "");
      bulletBuffer.push(
        <li key={idx} className="flex gap-2 items-start leading-snug">
          <span className="mt-1.5 h-1 w-1 rounded-full bg-current shrink-0 opacity-60" />
          <span>{linkify(text)}</span>
        </li>
      );
    } else if (line.trim() === "") {
      flushBullets();
      nodes.push(<div key={idx} className="h-1.5" />);
    } else {
      flushBullets();
      nodes.push(
        <p key={idx} className="leading-snug">
          {linkify(line)}
        </p>
      );
    }
  });
  flushBullets();

  return <div className="space-y-1 text-sm">{nodes}</div>;
}

/* ------------------------------------------------------------------ */
/*  Dispatch structured payloads                                        */
/* ------------------------------------------------------------------ */
function renderPayload(payload: BotPayload): React.ReactNode {
  switch (payload.type) {
    case "welcome":
      return <WelcomeCard />;
    case "whoami":
      return <WhoAmICard payload={payload} />;
    case "techstack":
      return <TechStackCard payload={payload} />;
    case "experience":
      return <ExperienceCard payload={payload} />;
    case "education":
      return <EducationCard payload={payload} />;
    case "projects":
      return <ProjectsCard payload={payload} />;
    case "contact":
      return <ContactCard payload={payload} />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
interface ChatBubbleProps {
  message: string | BotPayload;
  sender: "user" | "bot";
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const isBot = sender === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      <div
        className={`
          max-w-[90%] px-4 py-3 rounded-2xl text-sm
          ${
            isBot
              ? "bg-muted text-foreground rounded-bl-none"
              : "bg-primary text-primary-foreground rounded-br-none"
          }
        `}
      >
        {isBot
          ? typeof message === "string"
            ? renderPlainText(message)
            : renderPayload(message as BotPayload)
          : <p className="leading-snug">{message as string}</p>
        }
      </div>
    </div>
  );
};
