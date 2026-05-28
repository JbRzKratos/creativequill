"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Splat {
  id: number;
  x: number;
  y: number;
}

export default function InkCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [splats, setSplats] = useState<Splat[]>([]);
  const splatIdRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const mediaHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", mediaHandler);

    const timer = setTimeout(() => {
      setIsMobile(media.matches);
    }, 0);

    const onClick = (e: MouseEvent) => {
      const id = splatIdRef.current++;
      setSplats((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSplats((s) => s.filter((item) => item.id !== id));
      }, 400);
    };

    window.addEventListener("click", onClick);

    return () => {
      media.removeEventListener("change", mediaHandler);
      clearTimeout(timer);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9998 }}>
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
                    initial={{ cx: 40, cy: 40, r: 3, opacity: 0.9 }}
                    animate={{ cx: targetX, cy: targetY, r: 1, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                );
              })}
            </svg>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
