import { CardTitle, CardContent, Card2 } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NextArrow, PrevArrow } from "@/components/interface/Arrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircleArrowOutUpRight, FolderGit2 } from "lucide-react";
import { TypographyH2, TypographyP } from "@/components/ui/typography";

/* -------------------- DATA -------------------- */
const projects = [
  {
    id: 1,
    name: "KIK QR Card",
    video: "/videos/kikqrcard.mp4",
    description: "“A modern QR scan–based web application for customizing, previewing, and purchasing cards.",
    demo: "https://kikqrcard.netlify.app/",
  },
    {
    id: 2,
    name: "Booking Management",
    video: "/videos/bookingappcv.mp4",
    description: "Managing bookings and invoices with receipts with Firebase and Next.js",
    demo: "https://bookingapppersonal.netlify.app/",
  },
 
  {
    id: 3,
    name: "E-Shop Management",
    video: "/videos/eshopvid.mp4",
    description: "Tracking and managing buy/sell of products with Express.js and Next.js",
    demo: "https://github.com/kakon-aiubcse/Eshopmanagementweb",
  },
  {
    id: 4,
    name: "Project E-Commerce",
    video: "/videos/ecom.mp4",
    description: "Created to establish payment from Stripe and manage products",
    demo: "https://ecommerceproject-kikservercoder.netlify.app/",
  },
  
  //  {
  //   id: 5,
  //   name: "Postiz Design",
  //   video: "/videos/postizvid.mp4",
  //   description: "Purpose of learning Tailwind CSS and frontend skills.",
  //   demo: "https://postiz.netlify.app/",
  // },
   {
    id: 6,
    name: "Info Strainer",
    video: "/videos/infostrainervid.mp4",
    description: "Created on VS Code with C# for information validation",
    demo: "https://github.com/kakon-aiubcse/info-strainer",
  },
   

 
 
];

/* -------------------- PAGE -------------------- */
const ProjectPage = () => {
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [startVideos, setStartVideos] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState<Record<number, boolean>>(
    () => projects.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );

  // Track window width for responsive slides
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStartVideos(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Determine slidesToShow based on window width
  let slidesToShow = 3;
  let centerMode = true;

  if (windowWidth < 768) {
    slidesToShow = 1;
    centerMode = false;
  } else if (windowWidth >= 768 && windowWidth < 1024) {
    slidesToShow = 2;
    centerMode = true;
  } else {
    slidesToShow = 3;
    centerMode = true;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    centerMode,
    centerPadding: "0px",
    lazyLoad: "ondemand",
    swipeToSlide: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <main id="projects" className="min-h-screen bg-background text-foreground py-10">
      {/* HEADER */}
      <section className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold"
        >
          My <span className="text-primary">Projects</span>
        </motion.h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Some of my recent work including personal and client projects.
        </p>
      </section>

      {/* SLIDER */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <Slider {...sliderSettings}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="px-2 sm:px-4 lg:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card2 className="rounded-2xl shadow-xl hover:shadow-primary hover:shadow-xl/50 overflow-hidden group flex flex-col h-full mb-12">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* VIDEO / SKELETON */}
                  <div className="relative w-full aspect-video bg-muted overflow-hidden rounded-t-2xl">
                    {startVideos && (
                      <video
                        muted
                        // autoPlay
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                        onLoadedData={() =>
                          setLoadingVideos((prev) => ({ ...prev, [project.id]: false }))
                        }
                        onError={() =>
                          setLoadingVideos((prev) => ({ ...prev, [project.id]: false }))
                        }
                      >
                        <source src={project.video} type="video/mp4" />
                      </video>
                    )}

                    {loadingVideos[project.id] && (
                      <Skeleton className="absolute inset-0 bg-primary" />
                    )}

                    {/* Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="backdrop-blur-sm"
                        onClick={() => setOpenVideo(project.video)}
                      >
                        View Video
                      </Button>
                    </div>
                  </div>
{/* CONTENT */}
<div className="flex flex-col flex-1 p-5 gap-3">
  {/* Title */}
  <CardTitle className="leading-tight">
    <TypographyH2 className="text-xl sm:text-2xl font-semibold tracking-tight">
      {project.name} <FolderGit2 className="inline-block ml-2 h-5 w-5 text-primary" />
    </TypographyH2>
  </CardTitle>

  {/* Description */}
  <TypographyP className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
    {project.description}
  </TypographyP>

  {/* Action */}
  <div className="mt-auto pt-4">
    <Button
      variant="outline"
      size="sm"
      className="
        w-full sm:w-fit
        gap-2
        rounded-lg
        transition
        hover:bg-primary hover:text-primary-foreground
        dark:hover:bg-primary-dark dark:hover:text-primary-foreground
        dark:bg-primary-dark dark:text-primary-foreground
      "
      onClick={() => window.open(project.demo, "_blank")}
    >
      View Project
      <CircleArrowOutUpRight className="h-4 w-4" />
    </Button>
  </div>
</div>

                  
                </CardContent>
              </Card2>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* MODAL */}
      <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
        <DialogContent className="max-w-3xl w-full p-0 bg-black rounded-2xl">
          <DialogHeader>
            <DialogClose className="absolute top-2 right-2 text-white dark:text-white hover:text-red-500">
              ×
            </DialogClose>
            <DialogTitle
              className="m-2 cursor-pointer text-white dark:text-white hover:text-red-500 transition-colors"
              onClick={() => setOpenVideo(null)}
            >
              KIK
            </DialogTitle>
          </DialogHeader>

          {openVideo && (
            <video
              key={openVideo}
              src={openVideo}
              controls
              autoPlay
              className="w-full h-[500px] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProjectPage;
