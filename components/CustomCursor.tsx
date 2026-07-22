"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      setHovering(
        Boolean(
          target.closest(
            "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
          )
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", onOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", onOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ x: dotX, y: dotY }}
    >
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-accent/20"
        animate={{
          width: hovering ? 40 : 10,
          height: hovering ? 40 : 10,
          opacity: hovering ? 0.35 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        animate={{
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
}
