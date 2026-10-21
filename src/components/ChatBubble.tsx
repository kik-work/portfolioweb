import React from "react";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  CodeXml,
  FolderGit2,
  Github,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Payload types (exported so CVChatModal can use them)               */
/* ------------------------------------------------------------------ */
export type SkillLevel = "Advanced" | "Intermediate" | "Basic";

export interface SkillChip {
  name: string;
  /** Omitted for unrated groups such as soft skills. */
  level?: SkillLevel;
}

interface PayloadBase {
  /** Short lead-in sentence shown above the card(s). */
  intro?: string;
}

export interface TechStackPayload extends PayloadBase {
  type: "techstack";
  sections: { label: string; items: SkillChip[] }[];
}

export interface ExperiencePayload extends PayloadBase {
  type: "experience";
  jobs: {
    role: string;
    company: string;
    period: string;
    type?: string;
    current?: boolean;
    link?: string;
    details: string[];
  }[];
}

export interface EducationPayload extends PayloadBase {
  type: "education";
  entries: {
    degree: string;
    institute: string;
    level: string;
    period: string;
    major: string;
    location: string;
    resultLabel: string;
    score: string;
    outOf: string;
  }[];
  certificates?: { name: string; issuer: string; date: string }[];
}

export interface ProjectsPayload extends PayloadBase {
  type: "projects";
  items: {
    id?: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
    type: string;
  }[];
}

export interface ContactPayload extends PayloadBase {
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

export interface WhoAmIPayload extends PayloadBase {
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
/*  Shared bits                                                         */
/* ------------------------------------------------------------------ */
const card = "rounded-2xl bg-card p-4 ring-1 ring-hairline";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground";
const pill = "inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-medium ring-1 ring-hairline";
const linkPill = `${pill} text-foreground transition-colors hover:bg-secondary`;

const levelDot: Record<SkillLevel, string> = {
  Advanced: "bg-success",
  Intermediate: "bg-link",
  Basic: "bg-muted-foreground/50",
};

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Spectrum-ringed assistant avatar, shared with the typing indicator. */
export function BotAvatar({ className = "size-7" }: { className?: string }) {
  return (
    <span className={cn("relative mt-0.5 flex shrink-0 overflow-hidden rounded-full p-[1.5px]", className)}>
      <span aria-hidden="true" className="spectrum-glow absolute -inset-1/2" />
      <span className="relative flex size-full items-center justify-center rounded-full bg-background text-foreground">
        <Sparkles className="size-[55%]" aria-hidden="true" />
      </span>
    </span>
  );
}

function linkify(text: string): React.ReactNode {
  // split() with a capture group puts the URLs at the odd indexes.
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-link underline underline-offset-2 hover:opacity-75"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/* ------------------------------------------------------------------ */
/*  Structured renderers                                               */
/* ------------------------------------------------------------------ */
const WELCOME_PROMPTS: { icon: LucideIcon; label: string; ask: string }[] = [
  { icon: CodeXml, label: "Skills", ask: "Tell me about skills" },
  { icon: Briefcase, label: "Experience", ask: "Work experience" },
  { icon: FolderGit2, label: "Projects", ask: "Show projects" },
  { icon: GraduationCap, label: "Education", ask: "Education" },
  { icon: Layers, label: "Tech stack", ask: "Tech stack" },
  { icon: Mail, label: "Contact", ask: "Contact" },
];

function WelcomeCard({ onAsk }: { onAsk?: (q: string) => void }) {
  return (
    <div className="space-y-3">
      <div className={card}>
        <p className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
          Hi, I'm <span className="text-spectrum">Kakon's CV assistant.</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Ask about skills, projects, experience, education, or how to get in touch. Pick a topic to start.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {WELCOME_PROMPTS.map(({ icon: Icon, label, ask }) => (
          <button
            key={label}
            type="button"
            onClick={() => onAsk?.(ask)}
            className="group flex items-center gap-2.5 rounded-xl bg-card px-3 py-2.5 text-left text-sm font-medium ring-1 ring-hairline transition-[background-color,scale] hover:bg-secondary active:scale-[0.97]"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-link/10 text-link transition-transform duration-300 ease-spring group-hover:scale-110">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WhoAmICard({ payload }: { payload: WhoAmIPayload }) {
  const initials = payload.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-hairline">
      <div aria-hidden="true" className="h-14 bg-[image:var(--spectrum)]" />
      <div className="px-4 pb-4">
        <span className="-mt-7 flex size-14 items-center justify-center rounded-full bg-foreground text-lg font-bold tracking-tight text-background ring-4 ring-card">
          {initials}
        </span>
        <p className="mt-2.5 text-[1.0625rem] leading-tight font-semibold tracking-[-0.02em]">{payload.name}</p>
        <p className="mt-0.5 text-sm font-medium text-link">{payload.title}</p>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {payload.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="size-3.5" aria-hidden="true" />
            {payload.company}
          </span>
        </p>

        <p className="mt-3 text-[0.8125rem] leading-relaxed text-foreground/80">{payload.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {payload.highlights.map((h) => (
            <span key={h} className="rounded-full bg-link/10 px-2.5 py-1 text-xs font-medium text-link">
              {h}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <a href={`mailto:${payload.email}`} className={linkPill}>
            <Mail className="size-3.5" aria-hidden="true" />
            Email
          </a>
          <a href={payload.github} target="_blank" rel="noopener noreferrer" className={linkPill}>
            <Github className="size-3.5" aria-hidden="true" />
            GitHub
          </a>
          <a href={payload.portfolio} target="_blank" rel="noopener noreferrer" className={linkPill}>
            <Globe className="size-3.5" aria-hidden="true" />
            Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

function TechStackCard({ payload }: { payload: TechStackPayload }) {
  const rated = payload.sections.some((s) => s.items.some((i) => i.level));
  return (
    <div className="space-y-2.5">
      {payload.sections.map((section) => (
        <section key={section.label} className={card}>
          <div className="mb-2.5 flex items-center justify-between">
            <h4 className={eyebrow}>{section.label}</h4>
            <span className="text-[11px] font-medium text-muted-foreground tabular-nums">{section.items.length}</span>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {section.items.map((item) => (
              <li key={item.name} className={pill} title={item.level}>
                {item.level && (
                  <span aria-hidden="true" className={`size-1.5 rounded-full ${levelDot[item.level]}`} />
                )}
                {item.name}
                {item.level && <span className="sr-only"> ({item.level})</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
      {rated && (
        <p className="flex flex-wrap items-center gap-x-3.5 gap-y-1 px-1 text-[11px] text-muted-foreground">
          {(Object.keys(levelDot) as SkillLevel[]).map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className={`size-1.5 rounded-full ${levelDot[level]}`} />
              {level}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function ExperienceCard({ payload }: { payload: ExperiencePayload }) {
  return (
    <div className="space-y-2.5">
      {payload.jobs.map((job) => (
        <article key={`${job.company}-${job.period}`} className={card}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em]">{job.role}</h4>
              {job.link ? (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-0.5 inline-flex items-center gap-0.5 text-sm font-medium text-violet underline-offset-4 hover:underline"
                >
                  {job.company}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <p className="mt-0.5 text-sm font-medium text-violet">{job.company}</p>
              )}
            </div>
            {job.current && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success">
                <span aria-hidden="true" className="live-dot size-1.5 rounded-full bg-success" />
                Current
              </span>
            )}
          </div>

          <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className={pill}>
              <CalendarDays className="size-3.5 text-muted-foreground" aria-hidden="true" />
              {job.period}
            </span>
            {job.type && <span className={pill}>{job.type}</span>}
          </p>

          <ul className="mt-3 grid gap-1.5 text-[0.8125rem] leading-snug text-foreground/80">
            {job.details.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-violet" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function EducationCard({ payload }: { payload: EducationPayload }) {
  return (
    <div className="space-y-2.5">
      {payload.entries.map((e) => (
        <article key={e.degree} className={`${card} flex items-end justify-between gap-3`}>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground tabular-nums">
              <span className="font-semibold text-violet">{e.level}</span> · {e.period}
            </p>
            <h4 className="mt-1 text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em]">{e.degree}</h4>
            <p className="mt-0.5 text-[0.8125rem] text-foreground/80">{e.institute}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="size-3.5" aria-hidden="true" />
                {e.major}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {e.location}
              </span>
            </p>
          </div>
          <p className="shrink-0 text-right">
            <span className="block text-[11px] font-medium text-muted-foreground">{e.resultLabel}</span>
            <span className="flex items-baseline whitespace-nowrap">
              <span className="text-spectrum pr-[0.06em] text-[1.75rem] leading-none font-bold tracking-[-0.04em]">
                {e.score}
              </span>
              <span className="ml-0.5 text-xs font-medium text-muted-foreground">/ {e.outOf}</span>
            </span>
          </p>
        </article>
      ))}

      {payload.certificates?.map((c) => (
        <article key={c.name} className={`${card} flex items-center gap-3`}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
            <Award className="size-[1.125rem]" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h4 className="text-sm leading-snug font-semibold tracking-[-0.01em]">{c.name}</h4>
            <p className="text-xs text-muted-foreground">
              {c.issuer} · {c.date}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectsCard({ payload }: { payload: ProjectsPayload }) {
  return (
    <div className="space-y-2.5">
      {payload.items.map((p) => (
        <article key={p.title} className={card}>
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em]">{p.title}</h4>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.06em] uppercase ${
                p.type === "client" ? "bg-violet/12 text-violet" : "bg-link/10 text-link"
              }`}
            >
              {p.type}
            </span>
          </div>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">{p.description}</p>
          {p.tags.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className={pill}>
                  {t}
                </li>
              ))}
            </ul>
          )}
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-0.5 text-sm font-medium text-violet underline-offset-4 hover:underline"
          >
            {host(p.link)}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </article>
      ))}
    </div>
  );
}

function ContactCard({ payload }: { payload: ContactPayload }) {
  const rows: { icon: LucideIcon; label: string; value: string; href: string }[] = [
    { icon: Mail, label: "Email", value: payload.email, href: `mailto:${payload.email}` },
    { icon: Phone, label: "Phone", value: payload.phone, href: `tel:${payload.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: "Khairul Islam Kakon", href: payload.linkedin },
    { icon: Github, label: "GitHub", value: payload.github.replace(/^https?:\/\/(www\.)?/, ""), href: payload.github },
    { icon: Globe, label: "Portfolio", value: host(payload.portfolio), href: payload.portfolio },
  ];
  return (
    <div className={`${card} p-2`}>
      <ul>
        {rows.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-background"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-link/10 text-link">
                <Icon className="size-[1.125rem]" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-muted-foreground">{label}</span>
                <span className="block truncate text-sm font-medium">{value}</span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
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
        <ul key={`ul-${nodes.length}`} className="mt-1 space-y-1">
          {bulletBuffer}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    if (/^\s*•\s/.test(line)) {
      bulletBuffer.push(
        <li key={idx} className="flex items-start gap-2.5 leading-snug">
          <span aria-hidden="true" className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-link" />
          <span>{linkify(line.replace(/^\s*•\s*/, ""))}</span>
        </li>
      );
    } else if (line.trim() === "") {
      flushBullets();
      nodes.push(<div key={idx} className="h-1.5" />);
    } else {
      flushBullets();
      nodes.push(
        <p key={idx} className="leading-relaxed">
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
function renderPayload(payload: BotPayload, onAsk?: (q: string) => void): React.ReactNode {
  switch (payload.type) {
    case "welcome":
      return <WelcomeCard onAsk={onAsk} />;
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
  /** Lets cards (e.g. the welcome topics) send a question on the visitor's behalf. */
  onAsk?: (question: string) => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender, onAsk }) => {
  if (sender === "user") {
    return (
      <div className="animate-rise-in mb-4 flex justify-end">
        <p className="max-w-[85%] rounded-[1.25rem] rounded-br-md bg-[image:linear-gradient(135deg,var(--primary),#6e3cf0)] px-4 py-2.5 text-sm leading-snug break-words text-white shadow-sm">
          {message as string}
        </p>
      </div>
    );
  }

  const payload = typeof message === "string" ? null : message;
  const intro = payload && "intro" in payload ? payload.intro : undefined;

  return (
    <div className="animate-rise-in mb-4 flex items-start gap-2.5">
      <BotAvatar />
      <div className="min-w-0 flex-1">
        {payload ? (
          <>
            {intro && <p className="mb-2 px-0.5 text-sm leading-snug text-foreground/80">{intro}</p>}
            {renderPayload(payload, onAsk)}
          </>
        ) : (
          <div className="w-fit max-w-full rounded-[1.25rem] rounded-tl-md bg-card px-3.5 py-2.5 text-sm ring-1 ring-hairline">
            {renderPlainText(message as string)}
          </div>
        )}
      </div>
    </div>
  );
};
