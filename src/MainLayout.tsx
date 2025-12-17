import { useEffect, useState, useRef } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
// import { SpinnerCustom } from "./components/ui/spinner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages } from "./components/TapContainer";

import { ProgressLineLoader } from "./components/ui/progress-line-loader";
import { ScrollProgress } from "./components/ui/scroll-progress";

function MainLayoutPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabContainers[0]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Loading spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [activeTab]);

  // Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) setShowHeader(true);
      else if (currentScrollY > lastScrollY.current) setShowHeader(false);
      else setShowHeader(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground scrollbar-custom">
        <div className="flex flex-col items-center gap-4">


          <img src="/kik-logo.png" alt="Logo" className="h-14 w-36 rounded-md mt-10" />
          <ProgressLineLoader />


        </div>
      </div>
    );
  }

  const ActiveTabComponent = TabPages[activeTab];

  return (
    
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header: slides away */}
      <ScrollProgress />
      <div
        className={`transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
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
  );
}

export default MainLayoutPage;
