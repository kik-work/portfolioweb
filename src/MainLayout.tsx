import { useEffect, useState, useRef, Suspense } from "react";
import { Header } from "./components/layout/Header";
import { Toaster } from "sonner";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages, TabSectionIds } from "./components/TapContainer";
import { ProgressLineLoader } from "./components/ui/progress-line-loader";
import { CVChat } from "./components/CVChatBubble";

// A noop setter — pages no longer need to imperatively switch tabs,
// but the prop is kept so page components compile without changes.
const noop = () => {};

function MainLayoutPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabContainers[0]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  // Track whether a programmatic scroll (tab click) is in progress so the
  // scroll-spy doesn't fight it and snap back to the wrong section.
  const isScrollingTo = useRef(false);
  // Don't let the observer fire on initial mount before the user scrolls —
  // that's what causes the wrong tab to be highlighted on page load.
  const hasScrolled = useRef(false);

  // ── Splash screen ───────────────────────────────────────────────────────────
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const ric = window.requestIdleCallback(() => setLoading(false), { timeout: 400 });
      return () => window.cancelIdleCallback(ric);
    }
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // ── Hide/show header on scroll ──────────────────────────────────────────────
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Mark that real user scrolling has started so the spy can activate.
        hasScrolled.current = true;

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

  // ── Scroll-spy: update activeTab as sections enter the viewport ─────────────
  useEffect(() => {
    if (loading) return;

    // Give the DOM a tick to paint all sections before observing.
    const timer = setTimeout(() => {
      const observers: IntersectionObserver[] = [];

      TabContainers.forEach((tab) => {
        const sectionId = TabSectionIds[tab];
        const el = document.getElementById(sectionId);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            // Only update when:
            // 1. The section is intersecting
            // 2. The user has already scrolled (suppresses the spurious
            //    initial-mount fires that caused the wrong tab on load)
            // 3. We're not in the middle of a programmatic scroll-to
            if (entry.isIntersecting && hasScrolled.current && !isScrollingTo.current) {
              setActiveTab(tab);
            }
          },
          {
            // Fire when at least 30% of the section is visible.
            // rootMargin top offset accounts for the sticky navbar height (~52px).
            rootMargin: "-52px 0px -40% 0px",
            threshold: 0.1,
          }
        );

        observer.observe(el);
        observers.push(observer);
      });

      return () => observers.forEach((o) => o.disconnect());
    }, 100);

    return () => clearTimeout(timer);
  }, [loading]);

  // ── Scroll to a section when the navbar tab is clicked ──────────────────────
  const scrollToSection = (tab: string) => {
    const sectionId = TabSectionIds[tab];
    const el = document.getElementById(sectionId);
    if (!el) return;

    // Lock scroll-spy while we're animating to avoid flicker.
    isScrollingTo.current = true;
    hasScrolled.current = true; // treat a tab click as "user has navigated"
    setActiveTab(tab);

    el.scrollIntoView({ behavior: "smooth" });

    // Unlock after the scroll animation completes (~800 ms is safe for most
    // viewport heights; the spy will resume on the next user scroll).
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 900);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <img src="/kikLogoRH.webp" alt="Logo" className="h-24 w-56 rounded-md mt-10" />
          <ProgressLineLoader />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Header: slides away on scroll-down */}
        <div
          className={`transition-transform duration-300 will-change-transform ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Header />
        </div>

        {/* TopNavbar: sticky, highlights the active section */}
        <div className="sticky top-0 z-50">
          <TopNavbar activeTab={activeTab} onTabClick={scrollToSection} />
        </div>

        {/* All page sections rendered in one continuous scroll */}
        <main className="flex-1 mx-auto px-2 w-full max-w-7xl">
          {TabContainers.map((tab) => {
            const PageComponent = TabPages[tab];
            return (
              <section
                key={tab}
                id={TabSectionIds[tab]}
                // Offset the section's scroll-snap point by the sticky navbar height
                // so scrollIntoView lands correctly.
                className="scroll-mt-14"
              >
                <Suspense fallback={<div className="h-40" />}>
                  <PageComponent setActiveTab={noop} />
                </Suspense>
              </section>
            );
          })}
        </main>

        <Footer />
        <Toaster richColors position="top-center" />
      </div>

      <CVChat />
    </>
  );
}

export default MainLayoutPage;
