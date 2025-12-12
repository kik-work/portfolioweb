import React, { useEffect, useState } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
import { SpinnerCustom } from "./components/ui/spinner";

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
         <SpinnerCustom  />
          <span className="text-lg font-light">Loading Portfolio...</span>
          <span className="text-xl italic font-bold text-primary">KIK</span>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Layout width control for 4 screen categories */}
      <main
        className="
          flex-1 
          mx-auto 
          w-full
          px-4 
          py-6

          max-w-sm      /* mobile (up to ~640px) */
          sm:max-w-md   /* tablet (640–768px) */
          md:max-w-2xl  /* laptop/small desktop */
          lg:max-w-4xl  /* medium desktop */
          xl:max-w-6xl  /* large screens */
          2xl:max-w-8xl /* very large screens */
        "
      >
        {children}
      </main>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default MainLayoutPage;
