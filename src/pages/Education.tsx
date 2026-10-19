import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institute: "American International University of Bangladesh",
    shortName: "AIUB",
    location: "Kuratoli, Khilkhet",
    year: "Spring 2020-2024",
    major: "Software Engineering",
    resultLabel: "CGPA",
    score: "3.66",
    outOf: "4.00",
    logo: "/aiub.webp",
    website: "https://www.aiub.edu/",
    level: "University",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institute: "Sherpur Government College",
    shortName: "Sherpur Govt. College",
    location: "Sherpur, Mymensingh, Bangladesh",
    year: "2017-2019",
    major: "Science",
    resultLabel: "GPA",
    score: "4.00",
    outOf: "5.00",
    logo: "/sgc.webp",
    website: "https://sherpurgovtcollege.edu.bd/",
    level: "College",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institute: "Jangaldi High School",
    shortName: "Jangaldi High School",
    location: "Sherpur, Mymensingh, Bangladesh",
    year: "2016-2017",
    major: "Science",
    resultLabel: "GPA",
    score: "5.00",
    outOf: "5.00",
    logo: "/jangaldi.webp",
    website: "https://locator.eduportalbd.com/institutes/?ins=113829",
    level: "School",
  },
];

export default function EducationPage() {
  return (
    <div className="shell py-24 md:py-32">
      <SectionHeader
        id="section-education-title"
        title="Education."
        subtitle="My academic journey."
      />

      <ul className="mt-12 grid gap-3 md:mt-16 md:gap-5 lg:grid-cols-2">
        {educationData.map((edu, i) => {
          const featured = i === 0;
          return (
            <Reveal as="li" key={edu.degree} delay={i * 90} className={cn(featured && "lg:col-span-2")}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-3xl bg-card p-7 md:p-9",
                  featured && "lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12"
                )}
              >
                <div>
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-black/5">
                    <img src={edu.logo} alt="" className="size-full object-contain" loading="lazy" width={64} height={64} />
                  </div>
                  <p className="mt-7 text-sm font-medium text-muted-foreground tabular-nums">
                    <span className="font-semibold text-violet">{edu.level}</span> · {edu.year}
                  </p>
                  <h3 className={cn("mt-1.5 font-semibold tracking-[-0.025em]", featured ? "title-lg md:text-[2rem]" : "title-lg")}>
                    {edu.degree}
                  </h3>
                  <p className="mt-1.5 text-foreground/80">{edu.institute}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-4 text-[0.9375rem]">
                    <div>
                      <dt className="text-sm text-muted-foreground">Major</dt>
                      <dd className="mt-0.5 font-medium">{edu.major}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Location</dt>
                      <dd className="mt-0.5 font-medium">{edu.location}</dd>
                    </div>
                  </dl>
                </div>

                <div className={cn("mt-auto flex items-end justify-between gap-4 pt-8", featured && "lg:flex-col lg:items-end lg:pt-0")}>
                  <p className={cn(featured && "lg:text-right")}>
                    <span className="block text-sm font-medium text-muted-foreground">{edu.resultLabel}</span>
                    <span className="flex items-baseline whitespace-nowrap">
                      <span className="text-spectrum text-[2.25rem] leading-none font-bold tracking-[-0.05em] sm:text-[3rem] md:text-[3.5rem]">
                        {edu.score}
                      </span>
                      <span className="ml-1 text-sm font-medium text-muted-foreground sm:text-lg">/ {edu.outOf}</span>
                    </span>
                  </p>
                  <a
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-violet sm:text-[0.9375rem] underline-offset-4 hover:underline"
                  >
                    Visit {edu.shortName}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>

      {/* Certificate */}
      <Reveal className="mt-20 md:mt-28">
        <h3 className="title-lg">Certificates.</h3>
        <figure className="group mt-6 overflow-hidden rounded-3xl bg-card">
          <div className="overflow-hidden">
            <img
              src="/cisco-1-1400.webp"
              srcSet="/cisco-1-800.webp 800w, /cisco-1-1400.webp 1400w, /cisco-1.webp 2584w"
              sizes="(min-width: 1536px) 1376px, (min-width: 1280px) 1216px, (min-width: 1120px) 1056px, calc(100vw - 2.5rem)"
              alt="Cisco Networking Academy certificate awarded to Khairul Islam Kakon for IT Essentials: PC Hardware and Software"
              className="h-auto w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
              loading="lazy"
              width={2584}
              height={1750}
            />
          </div>
          <figcaption className="px-6 py-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">IT Essentials: PC Hardware and Software</span> · Cisco Networking
            Academy · Jul 2020
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
}
