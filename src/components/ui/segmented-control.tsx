import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { panelId, tabId } from "@/lib/tabs";

export interface Segment<T extends string> {
  id: T;
  label: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  segments: Segment<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name of the tab list. */
  label: string;
  /** Prefix for tab/panel ids so panels can reference their tab. */
  idPrefix: string;
  className?: string;
}


/**
 * iOS-style segmented control implementing the WAI-ARIA tabs pattern.
 * A single thumb slides under the active segment.
 */
export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  label,
  idPrefix,
  className,
}: SegmentedControlProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>('[aria-selected="true"]');
      if (active) setThumb({ x: active.offsetLeft, w: active.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [value]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = segments.findIndex((s) => s.id === value);
    let next = -1;
    if (e.key === "ArrowRight") next = (index + 1) % segments.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + segments.length) % segments.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = segments.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(segments[next].id);
    listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={cn("max-w-full overflow-x-auto no-scrollbar", className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative inline-flex min-w-max items-center rounded-full bg-secondary p-1"
      >
        <span
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-0 rounded-full bg-background shadow-[0_3px_8px_rgb(0_0_0/0.12),0_3px_1px_rgb(0_0_0/0.04)] transition-[translate,width] duration-500 ease-out-expo dark:bg-[#636366]"
          style={thumb ? { width: thumb.w, translate: `${thumb.x}px 0` } : { opacity: 0 }}
        />
        {segments.map((s) => {
          const selected = s.id === value;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={tabId(idPrefix, s.id)}
              aria-selected={selected}
              aria-controls={panelId(idPrefix, s.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(s.id)}
              className={cn(
                "relative z-10 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300 [&_svg]:size-4",
                selected ? "text-foreground" : "text-foreground/75 hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
