// MainLayout.tsx
import { useEffect, useState, useRef } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
import { SpinnerCustom } from "./components/ui/spinner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages } from "./components/TapContainer";

function MainLayoutPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabContainers[1]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  // Loading spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handler for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShowHeader(true); // At top, show header
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowHeader(false); // Hide header
      } else {
        // Scrolling up
        setShowHeader(true); // Show header
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground scrollbar-custom">
        <div className="flex flex-col items-center gap-4">
          <SpinnerCustom />
          <span className="text-lg text-muted-foreground font-light">
            Loading KIK Portfolio...
          </span>
          <img
            src="/kik-logo.png"
            alt="Logo"
            className="h-16 w-24 rounded-md mt-24"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header: slides away */}
      <div
        className={`transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
      </div>

      {/* TopNavbar: sticky at top, independent of header */}
      <div className="sticky top-0 z-50">
        <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main content */}
      <main className="flex-1 mx-auto mt-2 px-2 w-full max-w-7xl">
        {TabPages[activeTab]}
      </main>

      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default MainLayoutPage;
