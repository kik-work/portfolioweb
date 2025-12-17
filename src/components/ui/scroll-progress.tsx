"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`
        fixed left-0 right-0 z-100 origin-left pointer-events-none
        top-0 hidden sm:block
        h-1 sm:h-0.5
        bg-linear-to-r from-chart-1 via-chart-3 to-chart-3
        supports-[padding:env(safe-area-inset-top)]:top-[env(safe-area-inset-top)]
      `}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
