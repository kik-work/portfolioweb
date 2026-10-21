import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const arrow =
  "glass absolute top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow-float ring-1 ring-hairline transition-[scale] active:scale-90";

/**
 * Horizontal row that scrolls by mouse click-drag, the vertical wheel, or the
 * edge arrows. Touch and pen keep native scrolling. Edges fade where more
 * content is hidden.
 */
export function DragScroller({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ start: track.scrollLeft <= 2, end: track.scrollLeft >= max - 2 });
    };
    // Vertical wheel scrolls the row sideways; native horizontal gestures pass through.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || track.scrollWidth <= track.clientWidth) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    };

    measure();
    track.addEventListener("scroll", measure, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: false });
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", measure);
      track.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (e.pointerType !== "mouse" || e.button !== 0 || !track) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < 5) return;
      d.moved = true;
      setDragging(true);
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (trackRef.current?.hasPointerCapture(e.pointerId)) trackRef.current.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  // Swallow the click that ends a drag so the item under the cursor doesn't fire.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const step = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 180, behavior: "smooth" });

  const fade = (on: boolean) => (on ? "1.75rem" : "0px");
  const mask = `linear-gradient(to right, transparent 0, #000 ${fade(!edges.start)}, #000 calc(100% - ${fade(!edges.end)}), transparent 100%)`;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="toolbar"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className={cn(
          "no-scrollbar flex overflow-x-auto overscroll-x-contain select-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
          className
        )}
      >
        {children}
      </div>
      {!edges.start && (
        <button type="button" tabIndex={-1} aria-label="Scroll left" onClick={() => step(-1)} className={cn(arrow, "left-2")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
      )}
      {!edges.end && (
        <button type="button" tabIndex={-1} aria-label="Scroll right" onClick={() => step(1)} className={cn(arrow, "right-2")}>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
