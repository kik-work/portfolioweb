import { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
import { SpinnerCustom } from "./components/ui/spinner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages } from "./components/TapContainer";
function MainLayoutPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabContainers[0]); // Default to first tab

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <SpinnerCustom />
          <span className="text-lg text-muted-foreground font-light">
            Loading KIK Portfolio...
          </span>
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="h-16 w-24 rounded-md mt-24"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Navbar */}
      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area */}
      <main
        className="
        flex-1 
        mx-auto 
        mt-2
        px-2
        w-full
        h-full
        max-h-screen
        max-w-sm      
        sm:max-w-md   
        md:max-w-2xl  
        lg:max-w-4xl  
        xl:max-w-6xl  
        2xl:max-w-7xl 
      "
      >
        {/* Render page corresponding to active tab */}
        {TabPages[activeTab]}
      </main>

      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default MainLayoutPage;
