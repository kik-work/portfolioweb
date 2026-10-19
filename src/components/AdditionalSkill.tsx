import type { LucideIcon } from "lucide-react";
import {
  Bug,
  CloudUpload,
  GlobeLock,
  MonitorCloud,
  PcCase,
  Plug,
  Server,
  ShieldPlusIcon,
  Sprout,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
  /** Spans two columns on wide screens (bento layout). */
  wide?: boolean;
}

const groups: SkillGroup[] = [
  { title: "Problem Solving", icon: Bug, items: ["Decision making", "Analytical thinking"] },
  {
    title: "Backend Architecture",
    icon: Server,
    wide: true,
    items: ["Sanctum Auth", "Spatie Role Permissions", "Queue Jobs", "Scheduler", "Real-time Messaging", "Courier API", "Payment Gateway"],
  },
  { title: "Deployment & DevOps", icon: CloudUpload, items: ["cPanel", "CyberPanel", "Vercel", "Server updates"] },
  { title: "Integrations", icon: Plug, items: ["Steadfast", "Pathao", "bKash", "Nagad"] },
  { title: "Planning & Analysis", icon: Workflow, items: ["SRS Documentation", "User Stories", "Project Timelines"] },
  { title: "Professional Skills", icon: ShieldPlusIcon, items: ["Leadership", "Teamwork", "Adaptability", "Confidential"] },
  { title: "Computer Science", icon: PcCase, items: ["Data structures", "Algorithms", "Compiler basics"] },
  { title: "Software Related", icon: MonitorCloud, items: ["Software testing", "Data analysis"] },
  { title: "Creative Skills", icon: Sprout, items: ["Graphic design", "Photo & video editing", "Figma"] },
  { title: "Communication", icon: GlobeLock, wide: true, items: ["English", "Bengali", "50+ WPM typing"] },
];

export default function AdditionalSkillPage() {
  return (
    <div className="mt-24 md:mt-32">
      <Reveal>
        <h3 className="title-lg">Additional skills.</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Architecture, delivery, and the people skills that get products shipped.
        </p>
      </Reveal>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {groups.map((group, i) => (
          <Reveal as="li" key={group.title} delay={(i % 4) * 70} className={group.wide ? "sm:col-span-2" : undefined}>
            <div className="group h-full rounded-3xl bg-card p-6">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-link/10 text-link transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-6">
                <group.icon className="size-7"aria-hidden="true" />
              </span>
              <h4 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em]">{group.title}</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-foreground/80 ring-1 ring-hairline"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
