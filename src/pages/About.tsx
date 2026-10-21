import { useState, type CSSProperties, type ReactNode } from "react";
import { Droplets, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Hobby from "@/components/Hobbies";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { panelId, tabId } from "@/lib/tabs";
import { TabSectionIds } from "@/components/TapContainer";
import { scrollToSectionId } from "@/lib/section-scroll";

interface InfoItem {
  label: string;
  value: ReactNode;
}

interface ActivityItem {
  title: string;
  year: string;
  role: string;
  image: string;
  srcSet: string;
  description?: string;
}

// Emoji flags render as "BD" text on Windows, so draw the flag inline.
function BDFlag() {
  return (
    <svg viewBox="0 0 20 12" width={18} height={11} aria-hidden="true" className="inline-block rounded-[2px]">
      <rect width="20" height="12" fill="#006a4e" />
      <circle cx="9" cy="6" r="3.6" fill="#f42a41" />
    </svg>
  );
}

/* ---------- Data ---------- */
const PERSONAL_INFO: InfoItem[] = [
  { label: "Name", value: "Khairul Islam Kakon" },
  { label: "Father's Name", value: "Late Md. Shahjahan Ali Farazi" },
  { label: "Mother's Name", value: "Mrs. Kolpona Begum" },
  { label: "Date of Birth", value: "19 Feb, 2001" },
  { label: "Nationality", value: "Bangladeshi" },
  { label: "Religion", value: "Muslim" },
  {
    label: "Permanent Address",
    value: (
      <span className="inline-flex items-center gap-1.5">
        Sherpur, Mymensingh <BDFlag />
      </span>
    ),
  },
  {
    label: "Present Address",
    value: (
      <span className="inline-flex items-center gap-1.5">
        Nikunjo-2, Khilkhet, Dhaka <BDFlag />
      </span>
    ),
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    title: "AIUB Premium League Cricket Tournament",
    year: "2022-2024",
    role: "Wicket Keeper Batsman & Vice Captain (2024)",
    image: "/cricket1-800.webp",
    srcSet: "/cricket1-480.webp 480w, /cricket1-800.webp 800w",
    description: "Played 3 APL seasons, playing for CS Cougars and ending up playing for CS Chasers team.",
  },
  {
    title: "AIUB Football World Cup 2023",
    year: "2023",
    role: "Lead Center Forward",
    image: "/football1-800.webp",
    srcSet: "/football1-480.webp 480w, /football1-800.webp 800w",
    description: "Played 1 AFWC tournament for team Switzerland in group rounds. Center forward position.",
  },
  {
    title: "Assistance to the Needy during COVID-19",
    year: "Apr-Jul 2020",
    role: "Community Volunteer",
    image: "/covidvol-480.webp",
    srcSet: "/covidvol-480.webp 480w",
    description: "Provided informal assistance to those in need during the COVID-19 pandemic.",
  },
];

type Tab = "personal" | "activities" | "hobbies";
const TABS: { id: Tab; label: string }[] = [
  { id: "personal", label: "Personal" },
  { id: "activities", label: "Activities" },
  { id: "hobbies", label: "Hobbies" },
];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // All panels stay in the DOM (hidden) so their content is indexable.
  const panelProps = (id: Tab) => ({
    role: "tabpanel",
    id: panelId("about", id),
    "aria-labelledby": tabId("about", id),
    hidden: activeTab !== id,
    className: "animate-rise-in mt-8",
  });

  return (
    <div className="shell py-24 md:py-32">
      <SectionHeader
        id="section-about-title"
        eyebrow="About"
        title="Kakon, Khairul Islam."
        subtitle="Software Engineer."
      />

      <Reveal className="mt-10" delay={80}>
        <SegmentedControl idPrefix="about" label="About sections" segments={TABS} value={activeTab} onChange={setActiveTab} />
      </Reveal>

      {/* Personal */}
      <div {...panelProps("personal")}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profile image */}
          <div className="h-[580px] w-full overflow-hidden rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
            <img
              src="/mine4-800.webp"
              srcSet="/mine4-480.webp 480w, /mine4-800.webp 800w, /mine4-1200.webp 1200w"
              sizes="(min-width: 1024px) 50vw, calc(100vw - 2.5rem)"
              alt="Khairul Islam Kakon"
              className="h-full w-full rounded-xl object-cover object-top"
              loading="lazy"
              width={1200}
              height={1600}
            />
          </div>

          {/* Personal info + action buttons */}
          <div className="flex flex-col gap-3">
            {PERSONAL_INFO.map((info) => (
              <div
                key={info.label}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-transform hover:-translate-y-0.5"
              >
                <span className="cursor-default text-sm font-semibold text-muted-foreground">{info.label}</span>
                <Badge variant="outline">{info.value}</Badge>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-6">
              <Button
                asChild
                className="h-20 min-w-[130px] flex-1 rounded-md bg-[oklch(0.541_0.281_293.009)] text-sm text-white hover:bg-[oklch(0.541_0.281_293.009)]/90"
              >
                <a href="mailto:kakon.aiubcse@gmail.com">
                  <Mail aria-hidden="true" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-20 min-w-[130px] flex-1 rounded-md text-sm">
                <a href="tel:+8801923089370">
                  <Phone aria-hidden="true" />
                  Call Me
                </a>
              </Button>
              <Button
                className="h-20 min-w-[130px] flex-1 rounded-md bg-red-600 text-sm text-white hover:bg-red-700 hover:text-white dark:bg-red-700 dark:hover:bg-red-600"
                onClick={() => scrollToSectionId(TabSectionIds["Contact"])}
              >
                <Droplets aria-hidden="true" />
                Reach For: B- (Neg)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div {...panelProps("activities")}>
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {ACTIVITIES.map((act, i) => (
            <li key={act.title} className="animate-rise-in" style={{ "--rise-delay": `${i * 80}ms` } as CSSProperties}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={act.image}
                    srcSet={act.srcSet}
                    sizes="(min-width: 768px) 360px, calc(100vw - 2.5rem)"
                    alt={act.title}
                    className="size-full object-cover object-[center_30%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                    loading="lazy"
                    width={480}
                    height={360}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-[0.04em] text-muted-foreground">{act.year}</p>
                  <h3 className="mt-1.5 text-xl leading-snug font-semibold tracking-[-0.02em]">{act.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] font-medium text-foreground/80">{act.role}</p>
                  {act.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{act.description}</p>}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Hobbies */}
      <div {...panelProps("hobbies")}>
        <Hobby />
      </div>
    </div>
  );
};

export default AboutPage;
