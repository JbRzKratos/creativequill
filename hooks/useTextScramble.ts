"use client";

import { useEffect, useState } from "react";

export interface ScrambleChar {
  char: string;
  status: "scrambled" | "resolving" | "resolved";
}

export function useTextScramble(text: string, trigger: boolean = true) {
  const [chars, setChars] = useState<ScrambleChar[]>(() =>
    text.split("").map((c) => ({ char: c, status: "scrambled" }))
  );

  useEffect(() => {
    if (!trigger) return;

    const charsList = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const originalChars = text.split("");
    const length = originalChars.length;
    let frame = 0;
    const maxFrames = 30; // 1200ms / 40ms = 30 frames
    const intervalTime = 40;

    const interval = setInterval(() => {
      frame++;
      const percent = frame / maxFrames;
      const resolvedCount = Math.floor(percent * length);

      setChars(
        originalChars.map((originalChar, i) => {
          if (i < resolvedCount) {
            return { char: originalChar, status: "resolved" };
          }
          if (i === resolvedCount) {
            return { char: originalChar, status: "resolving" };
          }
          if (originalChar === " ") {
            return { char: " ", status: "resolved" };
          }
          const randomChar = charsList[Math.floor(Math.random() * charsList.length)];
          return { char: randomChar, status: "scrambled" };
        })
      );

      if (frame >= maxFrames) {
        clearInterval(interval);
        setChars(originalChars.map((c) => ({ char: c, status: "resolved" })));
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return chars;
}
