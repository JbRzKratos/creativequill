"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Splat {
  id: number;
  x: number;
  y: number;
}

export default function InkCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorType, setCursorType] = useState<"default" | "button" | "card" | "text">("default");
  const [splats, setSplats] = useState<Splat[]>([]);
  const splatIdRef = useRef(0);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs configuration
  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const springConfigRing = { damping: 25, stiffness: 180, mass: 0.55 };

  const ringX = useSpring(mouseX, springConfigRing);
  const ringY = useSpring(mouseY, springConfigRing);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const mediaHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", mediaHandler);

    let timer: NodeJS.Timeout;
    if (media.matches) {
      timer = setTimeout(() => setIsMobile(true), 0);
    }

    // Hide standard cursor using styled stylesheet insertion
    let styleEl: HTMLStyleElement | null = null;
    if (!media.matches) {
      styleEl = document.createElement("style");
      styleEl.innerHTML = `
        body, a, button, [role="button"], select, textarea, input {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!media.matches) {
      window.addEventListener("mousemove", onMouseMove);
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr === "button") {
        setCursorType("button");
      } else if (cursorAttr === "card") {
        setCursorType("card");
      } else if (cursorAttr === "text") {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    if (!media.matches) {
      window.addEventListener("mouseover", handleMouseOver);
    }

    const onClick = (e: MouseEvent) => {
      const id = splatIdRef.current++;
      setSplats((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSplats((s) => s.filter((item) => item.id !== id));
      }, 400);
    };

    if (!media.matches) {
      window.addEventListener("click", onClick);
    }

    return () => {
      media.removeEventListener("change", mediaHandler);
      if (timer) clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", onClick);
      if (styleEl && document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  let dotWidth = 10;
  let dotHeight = 10;
  let dotRadius = "50%";
  let dotBg = "var(--primary)";
  let ringWidth = 28;
  let ringHeight = 28;
  let ringRadius = "50%";
  const ringBg = "transparent";
  let ringBorder = "1px solid color-mix(in oklch, var(--foreground) 22%, transparent)";
  let dotContent = null;

  if (cursorType === "button") {
    dotWidth = 52;
    dotHeight = 52;
    dotBg = "var(--primary)";
    ringWidth = 0;
    ringHeight = 0;
    dotContent = (
      <span
        style={{
          fontSize: "9px",
          fontWeight: "800",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--primary-foreground)",
          pointerEvents: "none",
        }}
      >
        Click
      </span>
    );
  } else if (cursorType === "card") {
    dotWidth = 60;
    dotHeight = 22;
    dotRadius = "12px";
    dotBg = "color-mix(in oklch, var(--primary) 85%, transparent)";
    ringWidth = 68;
    ringHeight = 30;
    ringRadius = "16px";
  } else if (cursorType === "text") {
    dotWidth = 2;
    dotHeight = 22;
    dotRadius = "0px";
    dotBg = "var(--foreground)";
    ringWidth = 0;
    ringHeight = 0;
    ringBorder = "none";
  }

  return (
    <>
      {/* Ink particle splats */}
      <AnimatePresence>
        {splats.map((splat) => (
          <div
            key={splat.id}
            style={{
              position: "fixed",
              top: splat.y - 40,
              left: splat.x - 40,
              width: 80,
              height: 80,
              pointerEvents: "none",
              zIndex: 9998,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
              {Array.from({ length: 6 }).map((_, idx) => {
                const angle = (idx * 360) / 6;
                const radians = (angle * Math.PI) / 180;
                const distance = 26;
                const targetX = 40 + Math.cos(radians) * distance;
                const targetY = 40 + Math.sin(radians) * distance;

                return (
                  <motion.circle
                    key={idx}
                    cx={40}
                    cy={40}
                    r={3}
                    fill="var(--primary)"
                    initial={{ cx: 40, cy: 40, opacity: 0.9 }}
                    animate={{ cx: targetX, cy: targetY, r: 1, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                );
              })}
            </svg>
          </div>
        ))}
      </AnimatePresence>

      {/* Cursor Core Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          width: dotWidth,
          height: dotHeight,
          borderRadius: dotRadius,
          backgroundColor: dotBg,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          width: dotWidth,
          height: dotHeight,
          borderRadius: dotRadius,
          backgroundColor: dotBg,
        }}
        transition={springConfig}
      >
        {dotContent}
      </motion.div>

      {/* Cursor Lagging Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          width: ringWidth,
          height: ringHeight,
          borderRadius: ringRadius,
          backgroundColor: ringBg,
          border: ringBorder,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          width: ringWidth,
          height: ringHeight,
          borderRadius: ringRadius,
          border: ringBorder,
        }}
        transition={springConfig}
      />
    </>
  );
}
