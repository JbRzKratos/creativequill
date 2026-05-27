"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/**
 * High-performance card tilt hook.
 *
 * Key optimisations vs the previous version:
 *  1. The CSS transform is applied directly to the DOM node via `element.style`
 *     inside a `requestAnimationFrame` callback, so React NEVER re-renders on
 *     mousemove. This eliminates the jitter entirely.
 *  2. `getBoundingClientRect()` is called lazily (only once per enter, cached
 *     for the rest of the hover), avoiding repeated forced-layout reflows.
 *  3. The glare radial-gradient is also written directly to its own DOM node
 *     instead of being driven by state.
 *  4. A `rafId` guard prevents stacked rAF calls.
 */
export function useCardTilt<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cache rect to avoid re-measuring on every mousemove.
  const cachedRect = useRef<DOMRect | null>(null);
  const rafId = useRef<number>(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const mobile = media.matches;
    setIsMobile(mobile);
    isMobileRef.current = mobile;
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      isMobileRef.current = e.matches;
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobileRef.current || !ref.current) return;
    // Cache the bounding rect once on enter.
    cachedRect.current = ref.current.getBoundingClientRect();
    setIsHovered(true);
    if (ref.current) {
      ref.current.style.transition = "transform 50ms linear, will-change 0s";
      ref.current.style.willChange = "transform";
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (isMobileRef.current || !ref.current) return;
    const rect = cachedRect.current;
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    const rotateX = normY * 12;
    const rotateY = -normX * 12;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      // Update glare position directly on its DOM node.
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.07), transparent 60%)`;
        glareRef.current.style.opacity = "1";
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isMobileRef.current) return;
    cachedRect.current = null;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setIsHovered(false);
    if (ref.current) {
      ref.current.style.transition = "transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), will-change 0s";
      ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      ref.current.style.willChange = "auto";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, []);

  return {
    ref,
    glareRef,
    isHovered,
    isMobile,
    // `style` is intentionally empty — we drive transforms via direct DOM writes.
    style: {} as React.CSSProperties,
    props: {
      ref,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
