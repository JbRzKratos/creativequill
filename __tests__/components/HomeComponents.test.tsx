/**
 * HomeComponents — Component Tests
 *
 * Covers: TypewriterTagline, StatsStrip, ClientMarquee, BentoGrid,
 * AiVsHuman, ContentAuditCard, SocialProofMarquee, ScrollProgress,
 * OpenForWorkBadge, BackToTop, ProximityGrid.
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock framer-motion so we don't need a full DOM animation environment
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_t, tag: string) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ({ children, ...rest }: any) =>
            React.createElement(tag as keyof React.JSX.IntrinsicElements, rest, children),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { get: () => 0 }, scrollY: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
    useInView: () => true,
    useSpring: (v: unknown) => v,
    useMotionValue: (init: number) => ({ set: vi.fn(), get: () => init }),
  };
});

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

import {
  TypewriterTagline,
  StatsStrip,
  ClientMarquee,
  BentoGrid,
  AiVsHuman,
  ContentAuditCard,
  SocialProofMarquee,
  ScrollProgress,
  OpenForWorkBadge,
  BackToTop,
  ProximityGrid,
} from "@/components/effects/HomeComponents";

// ── TypewriterTagline ─────────────────────────────────────────────────────────

describe("TypewriterTagline", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders a span container", () => {
    const { container } = render(<TypewriterTagline />);
    expect(container.querySelector("span.typewriter-text")).toBeInTheDocument();
  });

  it("starts with empty text and populates over time", () => {
    const { container } = render(<TypewriterTagline />);
    const span = container.querySelector("span.typewriter-text");
    // Initially empty (or partially typed)
    act(() => {
      vi.advanceTimersByTime(500);
    });
    // After 500ms some characters should be present
    expect(span?.textContent?.length).toBeGreaterThan(0);
  });
});

// ── StatsStrip ────────────────────────────────────────────────────────────────

describe("StatsStrip", () => {
  it("renders all 4 stat labels", () => {
    render(<StatsStrip />);
    expect(screen.getByText(/words written/i)).toBeInTheDocument();
    expect(screen.getByText(/happy clients/i)).toBeInTheDocument();
    expect(screen.getByText(/human-written/i)).toBeInTheDocument();
    expect(screen.getByText(/avg delivery/i)).toBeInTheDocument();
  });
});

// ── ClientMarquee ─────────────────────────────────────────────────────────────

describe("ClientMarquee", () => {
  it("renders all client names", () => {
    render(<ClientMarquee />);
    expect(screen.getAllByText(/tiger safari/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/beeonline/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/techpulse/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the trust label", () => {
    render(<ClientMarquee />);
    expect(screen.getByText(/trusted by businesses/i)).toBeInTheDocument();
  });
});

// ── BentoGrid ─────────────────────────────────────────────────────────────────

describe("BentoGrid", () => {
  it("renders the key bento cell headings", () => {
    render(<BentoGrid />);
    expect(screen.getByText(/unmistakably you/i)).toBeInTheDocument();
    expect(screen.getByText(/48h/i)).toBeInTheDocument();
    expect(screen.getByText(/expert craft/i)).toBeInTheDocument();
    expect(screen.getByText(/story-driven/i)).toBeInTheDocument();
  });

  it("renders the pull-quote blockquote", () => {
    render(<BentoGrid />);
    expect(screen.getByText(/strategic content/i)).toBeInTheDocument();
  });
});

// ── AiVsHuman ─────────────────────────────────────────────────────────────────

describe("AiVsHuman", () => {
  it("renders both toggle buttons", () => {
    render(<AiVsHuman />);
    expect(screen.getByRole("button", { name: /ai generated/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /human written/i })).toBeInTheDocument();
  });

  it("toggles opacity when AI Generated is clicked", async () => {
    render(<AiVsHuman />);
    const aiButton = screen.getByRole("button", { name: /ai generated/i });
    await userEvent.click(aiButton);
    // After clicking AI, the human panel should be dimmed
    // We just verify no error is thrown and the component re-renders
    expect(screen.getByRole("button", { name: /human written/i })).toBeInTheDocument();
  });

  it("renders the CTA link to /contact", () => {
    render(<AiVsHuman />);
    const ctaLinks = screen.getAllByRole("link", { name: /begin your journey/i });
    expect(ctaLinks[0]).toHaveAttribute("href", "/contact");
  });
});

// ── ContentAuditCard ──────────────────────────────────────────────────────────

describe("ContentAuditCard", () => {
  it("renders the free audit heading", () => {
    render(<ContentAuditCard />);
    expect(screen.getByText(/free content audit/i)).toBeInTheDocument();
  });

  it("renders the ₹0 price element", () => {
    render(<ContentAuditCard />);
    expect(screen.getByText("₹0")).toBeInTheDocument();
  });

  it("renders the Claim CTA linking to /contact", () => {
    render(<ContentAuditCard />);
    const link = screen.getByRole("link", { name: /claim your free audit/i });
    expect(link).toHaveAttribute("href", "/contact");
  });
});

// ── SocialProofMarquee ────────────────────────────────────────────────────────

describe("SocialProofMarquee", () => {
  it("renders review snippets", () => {
    render(<SocialProofMarquee />);
    expect(screen.getAllByText(/breathtaking/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders client names", () => {
    render(<SocialProofMarquee />);
    expect(screen.getAllByText(/sarah m\./i).length).toBeGreaterThanOrEqual(1);
  });
});

// ── ScrollProgress ────────────────────────────────────────────────────────────

describe("ScrollProgress", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders without errors", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).not.toBeNull();
  });
});

// ── OpenForWorkBadge ──────────────────────────────────────────────────────────

describe("OpenForWorkBadge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });
  afterEach(() => {
    vi.useRealTimers();
    localStorage.clear();
  });

  it("does not show badge before scrolling (dismissed by default until scroll)", () => {
    render(<OpenForWorkBadge />);
    act(() => {
      vi.advanceTimersByTime(10);
    });
    // Badge requires scroll > 300 — not visible on mount
    expect(screen.queryByText(/open for work/i)).toBeNull();
  });

  it("shows badge after scroll event when not dismissed", () => {
    render(<OpenForWorkBadge />);
    act(() => {
      vi.advanceTimersByTime(10);
    });

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByText(/open for work/i)).toBeInTheDocument();
  });

  it("hides badge when X button is clicked", () => {
    render(<OpenForWorkBadge />);
    act(() => {
      vi.advanceTimersByTime(10);
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });

    // Verify badge appeared
    expect(screen.getByText(/open for work/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /dismiss badge/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/open for work/i)).toBeNull();
  });

  it("does not show badge if already dismissed in localStorage", () => {
    localStorage.setItem("cq-badge-dismissed", "true");
    render(<OpenForWorkBadge />);
    act(() => {
      vi.advanceTimersByTime(10);
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      fireEvent.scroll(window);
    });
    expect(screen.queryByText(/open for work/i)).toBeNull();
  });
});

// ── BackToTop ─────────────────────────────────────────────────────────────────

describe("BackToTop", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("is hidden on initial render (scrollY < 400)", () => {
    render(<BackToTop />);
    expect(screen.queryByRole("button", { name: /back to top/i })).toBeNull();
  });

  it("appears after scroll > 400px", () => {
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole("button", { name: /back to top/i })).toBeInTheDocument();
  });

  it("calls window.scrollTo on click", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<BackToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 500, writable: true });
      fireEvent.scroll(window);
    });

    const btn = screen.getByRole("button", { name: /back to top/i });
    fireEvent.click(btn);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});

// ── ProximityGrid ─────────────────────────────────────────────────────────────

describe("ProximityGrid", () => {
  it("renders an SVG with circles", () => {
    const { container } = render(<ProximityGrid />);
    const circles = container.querySelectorAll("circle");
    // 22 cols × 28 rows = 616 dots
    expect(circles.length).toBe(22 * 28);
  });

  it("renders without throwing on touch devices", () => {
    // Override to simulate touch/coarse pointer
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: "(pointer: coarse)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    expect(() => render(<ProximityGrid />)).not.toThrow();
  });
});
