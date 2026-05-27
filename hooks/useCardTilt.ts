"use client";

import { useRef, useState, useEffect } from "react";

export function useCardTilt<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    setIsMobile(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    if (isMobile || !ref.current) return;
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Norm coordinates: between -0.5 and 0.5
    const normX = (x / width) - 0.5;
    const normY = (y / height) - 0.5;

    // Max 15deg rotation
    const rotateX = normY * 15;
    const rotateY = -normX * 15;

    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 100ms ease-out",
    });
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    });
  };

  return {
    ref,
    style,
    isHovered,
    mousePos,
    isMobile,
    props: {
      ref,
      style,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
