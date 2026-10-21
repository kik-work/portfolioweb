// src/pages/Homepage.tsx
import { useEffect, useState, lazy, Suspense, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  CircleStar,
  Droplet,
  Facebook,
  FolderCode,
  Github,
  Globe,
  Linkedin,
  Presentation,
  Signature,
  Youtube,
} from "lucide-react";
import { TabSectionIds } from "@/components/TapContainer";
import { scrollToSectionId } from "@/lib/section-scroll";
import { LazyMount } from "@/components/ui/lazy-mount";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ChartRadialSimple = lazy(() =>
  import("@/components/chart/radial-chart").then((m) => ({ default: m.ChartRadialSimple }))
);
const CareerChart = lazy(() => import("@/components/chart/Career-chart"));
const GitHubContributionChart = lazy(() =>
  import("@/components/chart/Git-clone-chart").then((m) => ({ default: m.GitHubContributionChart }))
);
const VisitorChart = lazy(() =>
  import("@/components/chart/Visitor-chart").then((m) => ({ default: m.VisitorChart }))
);

interface HomePageProps {
  setActiveTab: (tab: string) => void; // kept for interface compatibility; unused here
}

const roles = [
  {
    title: "Software Engineer",
    icon: FolderCode,
    description:
      "Building efficient and scalable software solutions by applying engineering principles and best practices.",
    skills: ["Data Engineering", "OOP & Data Structures", "System Architect"],
  },
  {
    title: "Full Stack Developer",
    icon: Globe,
    description:
      "Modern web applications using both front-end and back-end technologies to deliver seamless user experiences.",
    skills: [ "Next.js", "Laravel", "MySQL", "DevOps"],
  },
  {
    title: "Tech Enthusiast",
    icon: Signature,
    description:
      "Passionate about exploring and contributing to the tech industry through continuous learning and hands-on experience.",
    skills: ["Quick Learner", "Leadership", "Teamwork", "Communication"],
  },
];

const socials = [
  { label: "GitHub profile", href: "https://github.com/kik-work", icon: Github },
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/khairul-islam-kakon-12618222a/", icon: Linkedin },
  { label: "Facebook profile", href: "https://www.facebook.com/share/17XSYL6Q7R/?mibextid=wwXIfr", icon: Facebook },
  { label: "YouTube channel", href: "https://www.youtube.com/@kikKakon", icon: Youtube },
];

const stats = [
  { label: "Experience", value: "1.10+", caption: "Years building production software" },
  { label: "Teams", value: "05", caption: "Companies I've shipped with" },
  { label: "Projects", value: "09", caption: "Live builds in the showcase" },
  { label: "Education", value: "3.66", caption: "CGPA in CSE at AIUB" },
];

const ROTATE_MS = 3000;
const MAX_CYCLES = 3;

/** Cycles through the roles a few times, pausing while hovered. */
function useRoleCycle(paused: boolean) {
  const [state, setState] = useState({ index: 0, prev: -1, ticks: 0 });

  useEffect(() => {
    if (paused || state.ticks >= roles.length * MAX_CYCLES) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setState((s) => ({ index: (s.index + 1) % roles.length, prev: s.index, ticks: s.ticks + 1 })),
      ROTATE_MS
    );
    return () => window.clearTimeout(id);
  }, [paused, state]);

  const clearPrev = () => setState((s) => ({ ...s, prev: -1 }));
  return { ...state, clearPrev };
}

// Compact, softly-rounded CTA shape (violet primary + grey secondary).
const CTA_SHAPE = "h-10 rounded-[0.55rem] px-6 text-sm";

const delay = (ms: number) => ({ "--intro-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage({ setActiveTab: _setActiveTab }: HomePageProps) {
  const [paused, setPaused] = useState(false);
  const { index, prev, ticks, clearPrev } = useRoleCycle(paused);
  const role = roles[index];
  // Skip the word animation on first paint so the hero is never mid-fade (LCP).
  const animateWord = ticks > 0;

  return (
    <div className="overflow-x-clip">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div
        className="shell grid items-center gap-14 pt-14 pb-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-10 md:pt-24 md:pb-32"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div>
          <p className="intro inline-flex items-center gap-2 rounded-full bg-foreground/[0.06] px-3 py-1 text-sm font-medium text-foreground/80">
            ﷽ <span aria-hidden="true" className="h-3 w-px bg-foreground/20" /> 786
          </p>

          <h1 id="hero-title" className="headline-hero intro mt-6" style={delay(60)}>
            <span className="block">Khairul Islam</span>{" "}
            <span className="text-spectrum block w-fit pb-[0.08em]">Kakon.</span>
          </h1>

          <p className="lede intro mt-6 max-w-xl" style={delay(160)}>
            <span className="block text-foreground">
              Hi! I'm a{" "}
              <span aria-hidden="true" className="inline-grid align-bottom">
                {prev >= 0 && (
                  <span
                    key={`out-${prev}-${ticks}`}
                    className="word-out text-foreground [grid-area:1/1] whitespace-nowrap"
                    onAnimationEnd={clearPrev}
                  >
                    {roles[prev].title}.
                  </span>
                )}
                <span
                  key={`in-${index}-${ticks}`}
                  className={cn("text-foreground [grid-area:1/1] whitespace-nowrap", animateWord && "word-in")}
                >
                  {role.title}.
                </span>
              </span>
              <span className="sr-only">{roles.map((r) => r.title).join(", ")}</span>
            </span>
            <span className="mt-2 block text-base leading-relaxed font-normal tracking-normal text-muted-foreground md:text-[1.0625rem]">
              Practical experience across multiple roles, committed to continuous learning and impactful
              development.
            </span>
          </p>

          <div className="intro mt-9 flex flex-wrap gap-4" style={delay(260)}>
            <Button
              size="lg"
              className={cn(CTA_SHAPE, "bg-[oklch(0.541_0.281_293.009)] text-white hover:bg-[oklch(0.541_0.281_293.009)]/90")}
              onClick={() => scrollToSectionId(TabSectionIds["Projects"])}
            >
              <Presentation /> View Projects
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className={cn(CTA_SHAPE, "bg-[oklch(0.967_0.001_286.375)] text-[oklch(0.21_0.006_285.885)] hover:bg-[oklch(0.967_0.001_286.375)]/80 dark:bg-[oklch(0.274_0.006_286.033)] dark:text-[oklch(0.985_0_0)]")}
              asChild
            >
              <a href="/khairul_islam_kakon_CV.pdf" download="khairul_islam_kakon_CV.pdf">
                <ArrowDown /> Download CV
              </a>
            </Button>
          </div>

          <ul className="intro mt-10 flex flex-wrap gap-2" style={delay(360)}>
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-11 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/80 transition-[background-color,color,translate] duration-300 hover:-translate-y-0.5 hover:bg-foreground/[0.1] hover:text-foreground"
                >
                  <Icon className="size-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`#${TabSectionIds["Contact"]}`}
                aria-label="Blood donation contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSectionId(TabSectionIds["Contact"]);
                }}
                className="inline-flex size-11 items-center justify-center rounded-full bg-[#d70015]/10 text-[#c00012] transition-[background-color,translate] duration-300 hover:-translate-y-0.5 hover:bg-[#d70015]/15 dark:text-[#ff6961]"
              >
                <Droplet className="size-[18px]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* Portrait with spectrum glow; badge and role card float around it */}
        <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
          <div
            aria-hidden="true"
            className="spectrum-aurora pointer-events-none absolute -inset-[30%] opacity-90 dark:opacity-100"
          />
          <figure className="relative overflow-hidden rounded-[2.25rem] bg-muted shadow-float">
            <img
              src="/kakon_new_pp-640.webp"
              srcSet="/kakon_new_pp-320.webp 320w, /kakon_new_pp-480.webp 480w, /kakon_new_pp-640.webp 640w, /kakon_new_pp-960.webp 960w"
              sizes="(min-width: 768px) 416px, 88vw"
              alt="Portrait of Khairul Islam Kakon"
              className="aspect-square w-full object-cover object-center"
              width={640}
              height={640}
              loading="eager"
              fetchPriority="high"
            />
          </figure>

          {/* Experience badge: hangs off the left edge of the portrait */}
          <span className="absolute top-6 -left-2 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-2 text-xs font-semibold text-foreground shadow-float ring-1 ring-foreground/5 backdrop-blur-xl backdrop-saturate-150 md:top-10 md:-left-4 lg:-left-12">
            <CircleStar className="size-3.5 text-link" aria-hidden="true" />
            1.10+ Years Experience
          </span>

          {/* Role card: sits beside the portrait on desktop, below it on mobile */}
          <div className="relative mt-4 rounded-[1.5rem] bg-background/90 p-4 shadow-float ring-1 ring-foreground/5 backdrop-blur-xl backdrop-saturate-150 md:absolute md:-right-2 md:-bottom-14 md:mt-0 md:w-80 lg:-right-14 lg:w-[26rem]">
            {/* All roles share one grid cell so the card keeps the height of the tallest: no layout shift on swap */}
            <div className="grid">
              {roles.map((r, i) => {
                const Icon = r.icon;
                const active = i === index;
                return (
                  <div
                    key={r.title}
                    aria-hidden={!active}
                    className={cn("[grid-area:1/1]", !active && "invisible", active && animateWord && "word-in")}
                  >
                    <p className="flex items-center gap-2 text-[0.9375rem] font-semibold tracking-[-0.015em]">
                      <Icon className="size-4 text-link" aria-hidden="true" />
                      {r.title}
                    </p>
                    <p className="mt-1 line-clamp-3 text-[0.8125rem] leading-snug text-foreground/80">{r.description}</p>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label={`${r.title} skills`}>
                      {r.skills.slice(0, 4).map((skill) => (
                        <li key={skill} className="rounded-full bg-foreground/[0.07] px-2.5 py-0.5 text-xs font-medium">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── HIGHLIGHTS ───────────────────────────────────────────────────── */}
      <div className="shell pb-24 md:pb-32">
        <SectionHeader id="highlights-title" title="At a glance." subtitle="Numbers, milestones and live activity." />

        <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} variant="scale" delay={i * 80}>
              <div className="flex h-full min-h-32 flex-col justify-between rounded-3xl bg-card p-4 sm:p-5 lg:min-h-44 lg:p-7">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">{s.label}</p>
                <p className="mt-4 lg:mt-8">
                  <span className="text-spectrum block w-fit py-[0.06em] pr-[0.1em] text-[clamp(1.5rem,0.9rem+3vw,2.25rem)] leading-none font-bold tracking-[-0.045em] lg:text-[clamp(2.5rem,1.9rem+2.4vw,3.75rem)]">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block min-h-[2.75em] text-xs leading-snug text-foreground/80 sm:text-sm lg:mt-2 lg:min-h-0 lg:text-[0.9375rem]">{s.caption}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Charts are lazy so they never compete with the hero */}
        <LazyMount minHeight={560} rootMargin="0px">
          <div className="mt-3 grid gap-3 md:mt-5 md:gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <Suspense fallback={<Skeleton className="h-[560px] rounded-3xl" />}>
                <CareerChart />
              </Suspense>
            </Reveal>
            <Reveal className="h-full" delay={100}>
              <Suspense fallback={<Skeleton className="h-[560px] rounded-3xl" />}>
                <ChartRadialSimple />
              </Suspense>
            </Reveal>
          </div>
        </LazyMount>

        <LazyMount minHeight={320}>
          <Reveal className="mt-3 md:mt-5">
            <Suspense fallback={<Skeleton className="h-72 rounded-3xl" />}>
              <GitHubContributionChart />
            </Suspense>
          </Reveal>
        </LazyMount>

        <LazyMount minHeight={360}>
          <Reveal className="mt-3 md:mt-5">
            <Suspense fallback={<Skeleton className="h-80 rounded-3xl" />}>
              <VisitorChart />
            </Suspense>
          </Reveal>
        </LazyMount>
      </div>
    </div>
  );
}
