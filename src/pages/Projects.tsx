import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { HTMLAttributes } from "react";
const projects = [
  {
    id: 1,
    name: "Project E-Commerce",
    video: "/videos/ecom.mp4",
    description: "Created to establish payment from Stripe",
    demo: "https://ecommerceproject-kikservercoder.netlify.app/",
  },
  {
    id: 2,
    name: "Booking Management",
    video: "/videos/bookingappcv.mp4",
    description: "Managing bookings and invoices with receipts",
    demo: "https://bookingapppersonal.netlify.app/",
  },
  {
    id: 3,
    name: "E-Shop Management",
    video: "/videos/eshopvid.mp4",
    description: "Tracking and managing buy/sell of products",
    demo: "https://github.com/kakon-aiubcse/Eshopmanagementweb",
  },
  {
    id: 4,
    name: "Postiz Design",
    video: "/videos/postizvid.mp4",
    description: "Purpose of learning Tailwind CSS and frontend skills.",
    demo: "https://postiz.netlify.app/",
  },
  {
    id: 5,
    name: "Info Strainer",
    video: "/videos/infostrainervid.mp4",
    description: "Created on VS Code for information validation",
    demo: "https://github.com/kakon-aiubcse/info-strainer",
  },
];



interface ArrowProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={`${className} flex items-center justify-center rounded-full bg-primary text-white w-10 h-10 shadow-lg z-50`}
    style={{ ...style, display: "flex" }}
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </div>
);

const PrevArrow = ({ className, style, onClick }: ArrowProps) => (
  <div
    className={`${className} flex items-center justify-center rounded-full bg-primary text-white w-10 h-10 shadow-lg z-50`}
    style={{ ...style, display: "flex" }}
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </div>
);

const ProjectPage = () => {
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [loadingVideos, setLoadingVideos] = useState<Record<number, boolean>>(
    () => projects.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-20">
      {/* Page Header */}
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
          Some of my recent work including personal and client projects. Only
          live demo navigation is allowed.
        </p>
      </section>

      {/* Projects Slider */}
      <section className="max-w-[1440px] mx-auto px-6">
        <Slider {...settings}>
          {projects.map((project) => (
            <motion.div key={project.id} className="px-3">
              <Card className="rounded-2xl shadow-lg overflow-hidden relative group">
                <CardContent className="p-0">
                  {/* Video Container */}
                  <div className="relative w-full h-[250px] overflow-hidden">
                    <video
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onLoadedData={() =>
                        setLoadingVideos((prev) => ({
                          ...prev,
                          [project.id]: false,
                        }))
                      }
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Skeleton Overlay */}
                    {loadingVideos[project.id] && (
                      <Skeleton className="absolute inset-0 w-full h-full bg-primary/30" />
                    )}

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-white! "
                        onClick={() => setOpenVideo(project.video)}
                      >
                        View Video
                      </Button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <CardTitle className="text-xl font-bold mb-2">
                      {project.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.demo, "_blank")}
                      className="hover:bg-primary hover:text-white! dark:hover:bg-primary transition-all cursor-pointer"
                    >
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Video Modal */}
      <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
        <DialogContent className="max-w-3xl w-full p-0 bg-black rounded-2xl">
          <DialogHeader>
            <DialogTitle
              className="text-red-300 m-2 cursor-pointer"
              onClick={() => setOpenVideo(null)}
            >
              KIK
            </DialogTitle>
          </DialogHeader>
          {openVideo && (
            <video
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
