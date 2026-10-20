import { useEffect, useState, useRef, Suspense } from "react";
import { Header } from "./components/layout/Header";
import { TopNavbar } from "./components/layout/TopNavbar";
import Footer from "./components/layout/Footer";
import { TabContainers, TabPages, TabSectionIds } from "./components/TapContainer";
import { CVChat } from "./components/CVChatBubble";
import { LazyMount } from "./components/ui/lazy-mount";
import { SectionSkeleton } from "./components/ui/skeleton";
import { MountAllContext } from "./components/ui/mount-all-context";
import { onMountAllSections, scrollToSectionId } from "./lib/section-scroll";

// A noop setter — pages no longer need to imperatively switch tabs,
// but the prop is kept so page components compile without changes.
const noop = () => {};

// Apple-style banding: light-grey sections alternate with white, and the
// project gallery is a black "theatre" in both themes.
const sectionSurface: Record<string, string> = {
  Home: "",
  Experience: "surface-alt",
  Projects: "dark bg-background text-foreground",
  Skills: "",
  Education: "surface-alt",
  About: "",
  Contact: "surface-alt",
};

function MainLayoutPage() {
  const [mountAll, setMountAll] = useState(false);
  const [activeTab, setActiveTab] = useState(TabContainers[0]);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  // Track whether a programmatic scroll (tab click) is in progress so the
  // scroll-spy doesn't fight it and snap back to the wrong section.
  const isScrollingTo = useRef(false);
  // Don't let the observer fire on initial mount before the user scrolls —
  // that's what causes the wrong tab to be highlighted on page load.
  const hasScrolled = useRef(false);

  // ── Mount every lazy section before a programmatic scroll ───────────────────
  useEffect(() => onMountAllSections(() => setMountAll(true)), []);

  // ── Hide/show header on scroll; also marks that real scrolling has started ──
  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
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
    const observers: IntersectionObserver[] = [];
    // Give the DOM a tick to paint all sections before observing.
    const timer = setTimeout(() => {
      TabContainers.forEach((tab) => {
        const el = document.getElementById(TabSectionIds[tab]);
        if (!el) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && hasScrolled.current && !isScrollingTo.current) {
              setActiveTab(tab);
            }
          },
          // Top offset matches the sticky tab bar; a section is "active" once it
          // crosses the upper part of the viewport.
          { rootMargin: "-52px 0px -55% 0px", threshold: 0 }
        );

        observer.observe(el);
        observers.push(observer);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // ── Scroll to a section when a nav link is clicked ──────────────────────────
  const scrollToSection = (tab: string) => {
    const sectionId = TabSectionIds[tab];

    // Lock scroll-spy while we're animating to avoid flicker.
    isScrollingTo.current = true;
    hasScrolled.current = true;
    setActiveTab(tab);

    // Unlock once the scroll (including any wait for lazy sections) has settled.
    scrollToSectionId(sectionId, () => {
      isScrollingTo.current = false;
    });
  };

  return (
    <MountAllContext.Provider value={mountAll}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col bg-background text-foreground">
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
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {TabContainers.map((tab) => {
            const PageComponent = TabPages[tab];
            const page = (
              <Suspense fallback={<SectionSkeleton />}>
                <PageComponent setActiveTab={noop} />
              </Suspense>
            );
            return (
              <section
                key={tab}
                id={TabSectionIds[tab]}
                // Static label: lazy sections have no heading in the DOM yet, so aria-labelledby would dangle.
                aria-label={tab}
                // Offset scrollIntoView by the sticky tab bar.
                className={`scroll-mt-14 ${sectionSurface[tab] ?? ""}`}
              >
                {tab === TabContainers[0] ? (
                  page
                ) : (
                  <LazyMount minHeight="100vh" rootMargin="1200px">
                    {page}
                  </LazyMount>
                )}
              </section>
            );
          })}
        </main>

        <Footer />
      </div>

      <CVChat />
    </MountAllContext.Provider>
  );
}

export default MainLayoutPage;
