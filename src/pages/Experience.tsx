import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const experiences = [
  {
    role: "Software Engineer",
    company: "Softtech Solution Ltd",
    period: "Sep 2026 - Present",
    highlights: [
      "Build and maintain e-commerce platforms with Laravel and Next.js.",
      "Fix bugs and deliver new features and modules for live projects.",
      "Deploy and update cPanel, CyberPanel, and Vercel servers.",
      "Integrate courier APIs (Steadfast, Pathao) and payment gateways (bKash, Nagad).",
    ],
    logo: "/softtechlogo.webp",
    link: "https://softtechsolutionltd.com/",
    type: "Full Time",
  },
  {
    role: "Jr. Software Engineer",
    company: "Tech Nex Solve",
    period: "Aug 2026 - Present",
    highlights: [
      "Work on software and technology projects on a contract basis.",
      "Take on modules and features assigned per project requirements.",
      "Deliver assigned work end to end for client projects.",
      "Work remotely and join project meetings when required.",
    ],
    logo: "/technexsolve.png",
    link: "https://www.technexsolve.com/",
    type: "Contract",
  },
  {
    role: "Jr. Software Engineer",
    company: "Nidus Lab",
    period: "Jan 2026 - Aug 2026",
    highlights: [
      "Develop, test, and maintain Laravel-based backend applications.",
      "Build modern Next.js + TypeScript frontend interfaces.",
      "Create and manage RESTful APIs for web and mobile applications.",
      "Integrate third-party services (payment gateways, SMS, email, etc.).",
      "Collaborate with design, product, and QA teams.",
    ],
    logo: "/niduslab.webp",
    link: "https://www.niduslab.com/",
    type: "Full Time",
  },
  {
    role: "Jr. Software Engineer",
    company: "Alor Feri Limited",
    period: "Aug 2025 - Dec 2025",
    highlights: [
      "System analysis & architecture planning",
      "Full-stack feature development",
      "API integration & optimization",
      "Bug fixing & performance improvements",
      "Team collaboration & documentation",
    ],
    logo: "/alorferi.webp",
    link: "https://www.alorferi.com/",
    type: "Full Time",
  },
  {
    role: "Backend Development Intern",
    company: "Taskirsview",
    period: "Jan 2025 - Feb 2025",
    highlights: [
      "Server-side logic implementation",
      "Database design & optimization",
      "Backend performance tuning",
      "Cross-team collaboration",
    ],
    logo: "/taskirsview.webp",
    link: "https://t.ly/gup-v/",
    type: "Internship",
  },
  {
    role: "Backend Intern",
    company: "Pressply LLC",
    period: "Jan 2024 - May 2024",
    highlights: [
      "REST API development with Express",
      "PostgreSQL & Prisma ORM",
      "Stripe payment integration",
      "Scalable e-commerce backend",
    ],
    logo: "/pressply.webp",
    link: "https://pressply.com/",
    type: "Internship",
  },
];

export default function ExperiencePage() {
  return (
    <div className="shell py-24 md:py-32">
      <SectionHeader
        id="section-experience-title"
        title="Experience."
        subtitle="A snapshot of my professional journey."
      />

      <ol className="relative mt-14 md:mt-20">
        {/* Timeline rail; the inner fill tracks scroll where supported */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-border md:left-[231px]">
          <span className="rail-fill absolute inset-0 bg-[image:linear-gradient(to_bottom,var(--link),#8e5cff)]" />
        </span>

        {experiences.map((exp) => {
          const current = exp.period.includes("Present");
          return (
            <Reveal
              as="li"
              key={`${exp.company}-${exp.period}`}
              delay={60}
              className="relative grid gap-4 pb-12 pl-9 last:pb-0 md:grid-cols-[208px_minmax(0,1fr)] md:gap-12 md:pl-0"
            >
              {/* Rail dot */}
              <span
                aria-hidden="true"
                className={`absolute top-1.5 left-0 size-[15px] rounded-full border-[3px] border-surface-alt md:left-[224px] ${
                  current ? "live-dot bg-success" : "bg-violet"
                }`}
              />

              <div className="md:pt-0.5">
                <p className="text-sm font-semibold tracking-[-0.01em] text-foreground tabular-nums">{exp.period}</p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                  {exp.type}
                  {current && (
                    <span className="inline-flex items-center rounded-full bg-success/12 px-2 py-0.5 text-xs font-semibold text-success">
                      Current
                    </span>
                  )}
                </p>
              </div>

              <article className="rounded-3xl bg-card p-6 md:p-8">
                <div className="flex items-start gap-4 md:gap-5">
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-black/5 transition-transform duration-500 ease-spring hover:scale-105 md:size-16"
                  >
                    <img
                      src={exp.logo}
                      alt=""
                      className="size-full object-contain"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                  </a>
                  <div className="min-w-0">
                    <h3 className="title-lg">{exp.role}</h3>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-1 inline-flex items-center gap-0.5 text-[1.0625rem] font-medium text-violet underline-offset-4 hover:underline"
                    >
                      {exp.company}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>

                <ul className="mt-6 grid gap-2.5 text-[0.9375rem] leading-relaxed text-foreground/80 md:pl-[84px]">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-violet" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
