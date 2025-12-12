import React, { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
import { SpinnerCustom } from "./components/ui/spinner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";

function MainLayoutPage({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <SpinnerCustom />
          <span className="text-lg text-muted-foreground font-light">Loading KIK Portfolio...</span>
          <img src="/src/assets/logo.png" alt="Logo" className="h-16 w-24 rounded-md mt-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <TopNavbar />

      {/* Layout width control for 4 screen categories */}
      <main
        className="
      flex-1 
      mx-auto 
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
        {children}
        <Footer />
      </main>

      <Toaster richColors position="top-center" />
    </div>
  );
}

export default MainLayoutPage;
