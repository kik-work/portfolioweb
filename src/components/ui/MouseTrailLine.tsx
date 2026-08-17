// src/components/ui/MouseTrailLine.tsx
// Lightweight violet sparkle trail — no shadowBlur, no double-pass, throttled input.

import { useEffect, useRef } from "react";

interface Segment {
  x1: number; y1: number;
  x2: number; y2: number;
  life: number;
}

interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  size: number;
  hue: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Pre-baked violet hues to avoid Math.random on every draw
const HUES = [265, 275, 285, 295, 305];

export function MouseTrailLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const segments: Segment[] = [];
    const sparks: Spark[] = [];
    let prev: { x: number; y: number } | null = null;
    let raf = 0;

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Throttled mouse input (every other event) ─────────────────────────
    let skip = false;
    const onMove = (e: MouseEvent) => {
      skip = !skip;
      if (skip) return; // process every 2nd event — halves CPU cost

      const cur = { x: e.clientX, y: e.clientY };
      if (prev) {
        segments.push({ x1: prev.x, y1: prev.y, x2: cur.x, y2: cur.y, life: 1 });
        if (segments.length > 60) segments.shift(); // hard cap

        // 0–1 sparks per segment (was 1–4)
        if (Math.random() < 0.45) {
          const t = Math.random();
          sparks.push({
            x:    prev.x + (cur.x - prev.x) * t,
            y:    prev.y + (cur.y - prev.y) * t,
            vx:   rand(-1.2, 1.2),
            vy:   rand(-1.8, 0.2),
            life: rand(0.5, 0.9),
            size: rand(1, 2.5),
            hue:  HUES[Math.floor(Math.random() * HUES.length)],
          });
          if (sparks.length > 80) sparks.shift(); // hard cap
        }
      }
      prev = cur;
    };

    const onLeave = () => { prev = null; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // ── Draw loop — no shadowBlur at all ──────────────────────────────────
    const FADE_TRAIL = 0.055; // faster fade = fewer live segments
    const FADE_SPARK = 0.07;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail
      for (let i = segments.length - 1; i >= 0; i--) {
        const s = segments[i];
        s.life -= FADE_TRAIL;
        if (s.life <= 0) { segments.splice(i, 1); continue; }

        ctx.save();
        ctx.globalAlpha = s.life * 0.75;
        ctx.strokeStyle = `hsl(${275 + (1 - s.life) * 25}, 100%, 72%)`;
        ctx.lineWidth   = 1.5 * s.life + 0.5; // tapers
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
        ctx.stroke();
        ctx.restore();
      }

      // Sparks — simple filled circles, no shadow
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life -= FADE_SPARK;
        if (p.life <= 0) { sparks.splice(i, 1); continue; }

        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.08; // gravity

        const r = p.size * p.life;
        ctx.save();
        ctx.globalAlpha = p.life * 0.85;
        ctx.fillStyle   = `hsl(${p.hue}, 100%, 78%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
