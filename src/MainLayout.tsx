import { useEffect, useState, useRef } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
// import { SpinnerCustom } from "./components/ui/spinner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages } from "./components/TapContainer";

import { ProgressLineLoader } from "./components/ui/progress-line-loader";
import { ScrollProgress } from "./components/ui/scroll-progress";
import { CVChat } from "./components/CVChatBubble";


function MainLayoutPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabContainers[0]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Show splash only until the browser is idle (400ms max)
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const ric = window.requestIdleCallback(() => setLoading(false), { timeout: 400 });
      return () => window.cancelIdleCallback(ric);
    }
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [activeTab]);

  // Scroll handler for header — RAF-throttled so it runs at most once per frame
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY <= 0) setShowHeader(true);
        else if (currentScrollY > lastScrollY.current) setShowHeader(false);
        else setShowHeader(true);
        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground scrollbar-custom">
        <div className="flex flex-col items-center gap-4">


          <img src="/kikLogoRH.webp" alt="Logo" className="h-24 w-56 rounded-md mt-10" />
          <ProgressLineLoader />


        </div>
      </div>
    );
  }

  const ActiveTabComponent = TabPages[activeTab];

  return (
    <> 
    
     <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header: slides away */}
      <ScrollProgress />
      <div
        className={`transition-transform duration-300 will-change-transform ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <Header />
      </div>

      {/* TopNavbar: sticky at top */}
      <div className="sticky top-0 z-50">
        <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main content */}
      <main className="flex-1 mx-auto mt-2 px-2 w-full max-w-7xl">
        <ActiveTabComponent setActiveTab={setActiveTab} />
      </main>

      <Footer />
      <Toaster richColors position="top-center" />
    </div>
   <CVChat/>

</>


  
  );
}

export default MainLayoutPage;

