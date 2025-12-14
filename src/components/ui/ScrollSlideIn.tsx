// src/components/ScrollSlideIn.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface ScrollSlideInProps {
  direction?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const ScrollSlideIn: React.FC<ScrollSlideInProps> = ({
  direction = "left",
  children,
}) => {
  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSlideIn;
