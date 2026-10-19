import { useState, useEffect, useRef, useCallback, memo } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

/* -------------------- DATA -------------------- */
/**
 * Display order. List project ids here: first three show first, then the rest in order.
 * Ids not listed go to the end. ids: 1 SNF, 2 EWF, 3 Info Strainer, 4 Booking,
 * 5 E-Shop, 6 E-Commerce, 7 Dr. Momita, 8 KIK QR Card
 */
const PROJECT_ORDER = [1, 2, 7, 8, 5, 3, 6, 4 ];

const allProjects = [
  {
    id: 7,
    name: "Dr. Momita Healthcare",
    video: "/videos/momitapu.mp4",
    description: "Bilingual (English/Bangla) doctor website with services, 4-step appointment booking.",
    demo: "https://drmomitahealthcare.vercel.app/",
  },
  {
    id: 1,
    name: "SN Foundation (SNF)",
    video: "/videos/snf.mp4",
    description: "Orphan Sponsorship Management with Recurring Donations & Real-Time Messaging.",
    demo: "https://snfoundations.org/",
  },
  {
    id: 2,
    name: "Expro Welfare Foundation",
    video: "/videos/ewf.mp4",
    description: "Membership and Pension package enrollment, installment, Document management.",
    demo: "https://ewfbd.org/",
  },
  {
    id: 3,
    name: "Info Strainer",
    video: "/videos/infostrainervid.mp4",
    description: "Created on VS Code with C# for information validation.",
    demo: "https://github.com/kakon-aiubcse/info-strainer",
  },
  {
    id: 4,
    name: "Booking Management",
    video: "/videos/bookingappcv.mp4",
    description: "Managing bookings and invoices with receipts with Firebase and Next.js.",
    demo: "https://bookingapppersonal.netlify.app/",
  },
  {
    id: 5,
    name: "E-Shop Management",
    video: "/videos/eshopvid.mp4",
    description: "Tracking and managing buy/sell of products with Express.js and Next.js.",
    demo: "https://github.com/kakon-aiubcse/Eshopmanagementweb",
  },
  {
    id: 6,
    name: "Project E-Commerce",
    video: "/videos/ecom.mp4",
    description: "Created to establish payment from Stripe and manage products.",
    demo: "https://ecommerceproject-kikservercoder.netlify.app/",
  },
  {
    id: 8,
    name: "KIK QR Card",
    video: "/videos/kikqrcard.mp4",
    description: "A modern QR scan–based web application for customizing, previewing, and purchasing cards.",
    demo: "https://kikqrcard.netlify.app/",
  },
];

const rank = (id: number) => {
  const i = PROJECT_ORDER.indexOf(id);
  return i === -1 ? PROJECT_ORDER.length : i;
};
const projects = [...allProjects].sort((a, b) => rank(a.id) - rank(b.id));

type Project = (typeof projects)[0];
type OpenVideo = { src: string; name: string };

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------- Card -------------------- */
interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenVideo: (video: OpenVideo) => void;
}

const ProjectCard = memo(function ProjectCard({ project, index, onOpenVideo }: ProjectCardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the preview only when the card is mostly visible; pause it off-screen.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !prefersReducedMotion()) video.play().catch(() => {});
    else video.pause();
  }, [inView, mounted]);

  // relative: keeps sr-only text inside the scroll container (no page overflow).
  return (
    <li ref={cardRef} className="relative w-[min(84vw,24rem)] shrink-0 snap-start md:w-[30rem]">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {mounted && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 ease-out-expo group-hover:scale-[1.03]"
              style={{ opacity: ready ? 1 : 0 }}
              onLoadedData={() => setReady(true)}
              onError={() => setReady(true)}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          )}
          {!ready && <div aria-hidden="true" className="shimmer absolute inset-0" />}

          <button
            type="button"
            onClick={() => onOpenVideo({ src: project.video, name: project.name })}
            className="absolute right-3 bottom-3 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-black/65 px-3.5 text-sm font-medium text-white backdrop-blur-md transition-[background-color,scale] duration-300 hover:bg-black/80 active:scale-95"
          >
            <Play className="size-3.5 fill-current" aria-hidden="true" />
            Watch<span className="sr-only"> {project.name} demo video</span>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="text-xs font-semibold tracking-[0.08em] text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="title-lg mt-2">{project.name}</h3>
          <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link mt-auto inline-flex w-fit items-center gap-0.5 pt-6 text-[1.0625rem] font-medium text-violet underline-offset-4 hover:underline"
          >
            View project<span className="sr-only">: {project.name}</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </article>
    </li>
  );
});

/* -------------------- PAGE -------------------- */
const paddle =
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-secondary text-foreground/90 transition-[background-color,opacity,scale] duration-300 hover:bg-foreground/[0.18] active:scale-90 disabled:cursor-default disabled:opacity-40 disabled:active:scale-100 [&_svg]:size-5";

const ProjectPage = () => {
  const [openVideo, setOpenVideo] = useState<OpenVideo | null>(null);
  const handleOpenVideo = useCallback((video: OpenVideo) => setOpenVideo(video), []);
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  // Enable/disable the paddles based on scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = track.scrollWidth - track.clientWidth;
        setEdges({ start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Mouse click-drag to slide. Touch/pen keep native scrolling.
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 5) return;
      d.moved = true;
      setDragging(true);
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (trackRef.current?.hasPointerCapture(e.pointerId)) trackRef.current.releasePointerCapture(e.pointerId);
    setDragging(false); // snap re-engages and settles on nearest card
  };

  // Swallow the click that ends a drag so links/buttons don't fire.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className="py-24 md:py-32">
      <div className="shell">
        <SectionHeader
          id="section-projects-title"
          title="Projects."
          subtitle="Recent personal and client work."
        >
          <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
            Some of my recent work, including personal and client projects. Watch a preview or open the live
            build.
          </p>
        </SectionHeader>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <ul
          ref={trackRef}
          aria-label="Project gallery"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          style={dragging ? { scrollSnapType: "none" } : undefined}
          className={`gallery-pad no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 md:gap-5 ${
            dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
          }`}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenVideo={handleOpenVideo} />
          ))}
        </ul>
      </Reveal>

      <div className="shell mt-6 flex justify-end gap-3">
        <button type="button" aria-label="Previous project" className={paddle} disabled={edges.start} onClick={() => scrollByCard(-1)}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next project" className={paddle} disabled={edges.end} onClick={() => scrollByCard(1)}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      {/* VIDEO MODAL */}
      <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
        <DialogContent
          className="w-[calc(100%-2rem)] max-w-4xl gap-0 overflow-hidden rounded-3xl border-0 bg-black p-0 sm:max-w-4xl"
          showCloseButton={false}
          aria-describedby={undefined}
        >
          <DialogHeader className="flex flex-row items-center justify-between gap-4 px-5 py-3">
            <DialogTitle className="truncate text-base font-semibold tracking-[-0.01em] text-white">
              {openVideo?.name ?? "Project Video"}
            </DialogTitle>
            <DialogClose
              aria-label="Close video"
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="size-4" aria-hidden="true" />
            </DialogClose>
          </DialogHeader>

          {openVideo && (
            <video
              key={openVideo.src}
              src={openVideo.src}
              controls
              autoPlay
              playsInline
              className="aspect-video max-h-[75vh] w-full bg-black object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectPage;
