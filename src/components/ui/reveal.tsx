import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealStyle = "up" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Entrance variant; "up" is the default rise-and-fade. */
  variant?: RevealStyle;
  /** Stagger delay in ms. */
  delay?: number;
  id?: string;
}

// One shared observer for every reveal on the page keeps scroll work minimal.
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  return observer;
}

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, as: Tag = "div", className, variant = "up", delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) {
      el.setAttribute("data-shown", "");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} id={id} data-reveal={variant} className={className} style={style}>
      {children}
    </Tag>
  );
}
