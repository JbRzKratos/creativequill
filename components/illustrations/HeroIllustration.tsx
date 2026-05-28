"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[360px] mx-auto flex items-center justify-center">
      {/* Background Spotlight Circle */}
      <div 
        className="absolute w-[280px] h-[280px] rounded-full" 
        style={{ backgroundColor: "var(--cq-parchment-mid)", opacity: 0.6 }} 
      />

      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full z-10"
      >
        {/* Notebook Cover (Dark) */}
        <motion.g
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Main Book Shadow */}
          <rect x="62" y="52" width="180" height="200" rx="8" fill="rgba(22,18,14,0.08)" />
          
          {/* Outer Cover */}
          <rect x="60" y="50" width="180" height="200" rx="8" fill="var(--cq-night)" stroke="var(--cq-night-border)" strokeWidth="1" />
          
          {/* Book spine line */}
          <line x1="150" y1="50" x2="150" y2="250" stroke="var(--cq-night-border)" strokeWidth="2" />
          
          {/* Left Page Page Stack Effect */}
          <rect x="67" y="57" width="80" height="186" rx="3" fill="var(--cq-parchment-deep)" />
          {/* Left Page (Main) */}
          <rect x="65" y="55" width="80" height="186" rx="3" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="0.5" />
          
          {/* Right Page Page Stack Effect */}
          <rect x="155" y="57" width="80" height="186" rx="3" fill="var(--cq-parchment-deep)" />
          {/* Right Page (Main) */}
          <rect x="153" y="55" width="80" height="186" rx="3" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="0.5" />

          {/* Left Page Ruled Lines & Text Simulation */}
          <line x1="75" y1="75" x2="135" y2="75" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="90" x2="135" y2="90" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="105" x2="135" y2="105" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="120" x2="135" y2="120" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="135" x2="135" y2="135" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="150" x2="135" y2="150" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="75" y1="165" x2="125" y2="165" stroke="var(--cq-linen)" strokeWidth="0.5" />
          
          {/* Left Page - simulated content block (forest green tint) */}
          <rect x="75" y="180" width="40" height="6" rx="1" fill="var(--cq-forest-light)" />
          <rect x="75" y="195" width="55" height="4" rx="0.5" fill="var(--cq-linen)" />
          <rect x="75" y="205" width="50" height="4" rx="0.5" fill="var(--cq-linen)" />

          {/* Right Page Ruled Lines & Text Simulation */}
          <line x1="163" y1="75" x2="223" y2="75" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="163" y1="90" x2="223" y2="90" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="163" y1="105" x2="223" y2="105" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="163" y1="120" x2="223" y2="120" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="163" y1="135" x2="223" y2="135" stroke="var(--cq-linen)" strokeWidth="0.5" />
          <line x1="163" y1="150" x2="223" y2="150" stroke="var(--cq-linen)" strokeWidth="0.5" />
          
          {/* Right page content simulation */}
          <rect x="163" y="165" width="50" height="4" rx="0.5" fill="var(--cq-linen)" />
          <rect x="163" y="175" width="55" height="4" rx="0.5" fill="var(--cq-linen)" />
          <rect x="163" y="185" width="30" height="4" rx="0.5" fill="var(--cq-linen)" />
          
          {/* Small checkmark / signature spot on right */}
          <path d="M165 210 L168 213 L174 207" stroke="var(--cq-forest)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="178" y1="210" x2="210" y2="210" stroke="var(--cq-linen)" strokeWidth="1" />

          {/* Fountain Pen (Angled across) */}
          <g transform="translate(145, 140) rotate(-35)">
            {/* Pen shadow */}
            <rect x="-4" y="-38" width="10" height="110" rx="2" fill="rgba(22,18,14,0.15)" />
            {/* Pen Body */}
            <rect x="-5" y="-40" width="10" height="110" rx="1.5" fill="var(--cq-night)" stroke="var(--cq-night-border)" strokeWidth="0.5" />
            {/* Pen Clip */}
            <rect x="-1" y="-30" width="2" height="35" fill="var(--cq-ink-muted)" />
            {/* Gold Ring */}
            <rect x="-5" y="40" width="10" height="3" fill="var(--cq-linen)" />
            {/* Grip section */}
            <rect x="-4" y="43" width="8" height="20" fill="var(--cq-ink-mid)" />
            {/* Nib Base */}
            <path d="M-4 63 L4 63 L2 75 L-2 75 Z" fill="var(--cq-linen)" />
            {/* Nib Point */}
            <path d="M-2 75 L2 75 L0 83 Z" fill="var(--cq-forest)" />
          </g>
        </motion.g>

        {/* Decorative Sparkles (✦) */}
        <motion.path
          d="M 50 40 L 52 44 L 56 45 L 52 46 L 50 50 L 48 46 L 44 45 L 48 44 Z"
          fill="var(--cq-forest)"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 240 220 L 241.5 223 L 225 224 L 221.5 225 L 220 229 L 218.5 225 L 215 224 L 218.5 223 Z"
          fill="var(--cq-forest)"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 230 45 L 232 49 L 236 50 L 232 51 L 230 55 L 228 51 L 224 50 L 228 49 Z"
          fill="var(--cq-teal)"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating Word Chips in HTML overlays (for clean crisp text rendering) */}
      <motion.div
        className="absolute top-10 left-4 bg-white border border-[var(--cq-linen)] rounded-[var(--radius-sm)] px-2.5 py-1 shadow-sm text-[10px] font-medium tracking-wider text-[var(--cq-ink-muted)] z-20"
        style={{ rotate: "-4deg" }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        BLOG
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-2 bg-white border border-[var(--cq-linen)] rounded-[var(--radius-sm)] px-2.5 py-1 shadow-sm text-[10px] font-medium tracking-wider text-[var(--cq-ink-muted)] z-20"
        style={{ rotate: "3deg" }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
      >
        SEO
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-6 bg-white border border-[var(--cq-linen)] rounded-[var(--radius-sm)] px-2.5 py-1 shadow-sm text-[10px] font-medium tracking-wider text-[var(--cq-ink-muted)] z-20"
        style={{ rotate: "-2deg" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        STORY
      </motion.div>

      <motion.div
        className="absolute bottom-12 right-12 bg-white border border-[var(--cq-linen)] rounded-[var(--radius-sm)] px-2.5 py-1 shadow-sm text-[10px] font-medium tracking-wider text-[var(--cq-ink-muted)] z-20"
        style={{ rotate: "5deg" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.2, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}
      >
        COPY
      </motion.div>
    </div>
  );
}
