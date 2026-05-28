import React from "react";

interface PageIllustrationProps {
  type?: "services" | "about" | "works" | "contact" | "service-detail";
  className?: string;
}

export default function PageIllustration({ type, className = "" }: PageIllustrationProps) {
  const baseSvgProps = {
    viewBox: "0 0 100 100",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `w-full h-full ${className}`,
  };

  switch (type) {
    case "services":
      return (
        <svg {...baseSvgProps}>
          {/* Spotlight background */}
          <circle cx="50" cy="50" r="40" fill="var(--cq-parchment-deep)" opacity="0.3" />
          
          {/* Back document */}
          <rect x="36" y="24" width="36" height="48" rx="2" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="1" transform="rotate(-6 54 48)" />
          
          {/* Front document */}
          <rect x="30" y="28" width="36" height="48" rx="2" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="1" />
          
          {/* Ruled lines on front document */}
          <line x1="36" y1="38" x2="60" y2="38" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="44" x2="60" y2="44" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="50" x2="60" y2="50" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="56" x2="52" y2="56" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="62" x2="48" y2="62" stroke="var(--cq-linen)" strokeWidth="1" />
          
          {/* Mini accent tag */}
          <rect x="54" y="58" width="8" height="6" rx="1" fill="var(--cq-forest)" />
          
          {/* Decorative Sparkle */}
          <path d="M72 25 L74 29 L78 30 L74 31 L72 35 L70 31 L66 30 L70 29 Z" fill="var(--cq-forest)" opacity="0.8" />
        </svg>
      );

    case "about":
      return (
        <svg {...baseSvgProps}>
          {/* Spotlight background */}
          <circle cx="50" cy="50" r="40" fill="var(--cq-parchment-deep)" opacity="0.3" />
          
          {/* Ink pot */}
          <path d="M58 64 L74 64 L72 78 L60 78 Z" fill="var(--cq-night)" stroke="var(--cq-night-border)" strokeWidth="1" />
          <rect x="62" y="60" width="8" height="4" fill="var(--cq-ink)" rx="0.5" />
          
          {/* Ink level */}
          <rect x="61" y="70" width="10" height="6" fill="var(--cq-forest)" opacity="0.7" />

          {/* Quill feather */}
          <path
            d="M32 72 Q42 56 46 22 Q48 18 51 22 Q48 38 42 70"
            fill="var(--cq-parchment)"
            stroke="var(--cq-linen)"
            strokeWidth="1.5"
          />
          <path
            d="M42 22 C43 32 38 48 26 56 C28 54 30 52 32 50 C26 44 26 40 28 34"
            fill="var(--cq-parchment-deep)"
            opacity="0.5"
          />
          {/* Shaft of feather */}
          <path d="M46 22 Q42 54 30 78" stroke="var(--cq-forest)" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Sparkles */}
          <path d="M22 28 L24 32 L28 33 L24 34 L22 38 L20 34 L16 33 L20 32 Z" fill="var(--cq-teal)" opacity="0.7" />
        </svg>
      );

    case "works":
      return (
        <svg {...baseSvgProps}>
          {/* Spotlight background */}
          <circle cx="50" cy="50" r="40" fill="var(--cq-parchment-deep)" opacity="0.3" />
          
          {/* Open Portfolio / Book Cover */}
          <path d="M18 72 L46 76 L46 28 L18 24 Z" fill="var(--cq-night)" stroke="var(--cq-night-border)" strokeWidth="1" />
          <path d="M82 72 L54 76 L54 28 L82 24 Z" fill="var(--cq-night)" stroke="var(--cq-night-border)" strokeWidth="1" />

          {/* Open pages */}
          <path d="M22 70 L46 73 L46 29 L22 26 Z" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="1" />
          <path d="M78 70 L54 73 L54 29 L78 26 Z" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="1" />
          
          {/* Text lines simulate */}
          <line x1="26" y1="36" x2="42" y2="38" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="26" y1="42" x2="42" y2="44" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="26" y1="48" x2="42" y2="50" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="26" y1="54" x2="38" y2="56" stroke="var(--cq-linen)" strokeWidth="1" />
          
          <line x1="58" y1="38" x2="74" y2="36" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="58" y1="44" x2="74" y2="42" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="58" y1="50" x2="74" y2="48" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="58" y1="56" x2="68" y2="54" stroke="var(--cq-linen)" strokeWidth="1" />

          {/* Center binding fold */}
          <path d="M46 29 C48 30 52 30 54 29 L54 73 C52 74 48 74 46 73 Z" fill="var(--cq-parchment-deep)" />
          
          {/* Key metrics circle on book */}
          <circle cx="68" cy="60" r="5" fill="var(--cq-forest)" />
          <path d="M66.5 60 L68 61.5 L70 59.5" stroke="var(--cq-parchment)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "contact":
      return (
        <svg {...baseSvgProps}>
          {/* Spotlight background */}
          <circle cx="50" cy="50" r="40" fill="var(--cq-parchment-deep)" opacity="0.3" />
          
          {/* Speech bubble */}
          <path
            d="M26 28 H74 C76 28 78 30 78 32 V56 C78 58 76 60 74 60 H50 L34 68 V60 H26 C24 60 22 58 22 56 V32 C22 30 24 28 26 28 Z"
            fill="var(--cq-parchment)"
            stroke="var(--cq-linen)"
            strokeWidth="1"
          />
          
          {/* Conversational lines */}
          <line x1="30" y1="38" x2="70" y2="38" stroke="var(--cq-linen)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="44" x2="60" y2="44" stroke="var(--cq-linen)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="50" x2="48" y2="50" stroke="var(--cq-linen)" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Pen leaning across bubble */}
          <path d="M68 64 L74 58 L54 38 L48 44 Z" fill="var(--cq-night)" />
          <path d="M48 44 L46 48 L50 46 Z" fill="var(--cq-forest)" />
          
          {/* Sparkles */}
          <path d="M82 24 L84 27 L87 28 L84 29 L82 32 L80 29 L77 28 L80 27 Z" fill="var(--cq-forest)" opacity="0.6" />
        </svg>
      );

    case "service-detail":
    default:
      return (
        <svg {...baseSvgProps}>
          <circle cx="50" cy="50" r="40" fill="var(--cq-parchment-deep)" opacity="0.3" />
          <rect x="30" y="30" width="40" height="40" rx="4" fill="var(--cq-parchment)" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="40" x2="64" y2="40" stroke="var(--cq-forest)" strokeWidth="1.5" />
          <line x1="36" y1="48" x2="64" y2="48" stroke="var(--cq-linen)" strokeWidth="1" />
          <line x1="36" y1="56" x2="52" y2="56" stroke="var(--cq-linen)" strokeWidth="1" />
          <circle cx="60" cy="56" r="3" fill="var(--cq-teal)" />
        </svg>
      );
  }
}
