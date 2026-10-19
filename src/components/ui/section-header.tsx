import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id: string;
  /** Primary, bold part of the headline. */
  title: ReactNode;
  /** Muted continuation of the headline — Apple's two-tone style. */
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ id, title, subtitle, eyebrow, className, children }: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)} variant="blur">
      {eyebrow && <p className="eyebrow mb-3 text-link">{eyebrow}</p>}
      <h2 id={id} className="headline text-balance">
        <span className="text-violet">{title}</span>
        {subtitle && <span className="font-normal text-muted-foreground"> {subtitle}</span>}
      </h2>
      {children}
    </Reveal>
  );
}
