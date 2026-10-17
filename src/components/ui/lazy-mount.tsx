import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { MountAllContext } from "./mount-all-context";

interface LazyMountProps {
  children: ReactNode;
  /** Space reserved until the children mount, to avoid layout shift. */
  minHeight?: number | string;
  rootMargin?: string;
}

/** Renders children only once the placeholder is near the viewport. */
export function LazyMount({ children, minHeight = 200, rootMargin = "300px" }: LazyMountProps) {
  const forced = useContext(MountAllContext);
  const ref = useRef<HTMLDivElement>(null);
  // Browsers without IntersectionObserver just mount everything.
  const [seen, setSeen] = useState(() => !("IntersectionObserver" in window));

  useEffect(() => {
    if (seen || forced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen, forced, rootMargin]);

  if (seen || forced) return <>{children}</>;
  return <div ref={ref} aria-hidden="true" style={{ minHeight }} />;
}
