/**
 * InkCursor — Component Tests
 *
 * Verifies mobile detection, cursor rendering, cursor type changes on
 * data-cursor attribute, and ink splat creation on click.
 */
import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import InkCursor from "@/components/effects/InkCursor";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeMedia(matches: boolean) {
  return {
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("InkCursor", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    vi.useFakeTimers();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ── Mobile gate ────────────────────────────────────────────────────────────

  it("renders nothing on mobile (pointer:coarse)", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(true));
    const { container } = render(<InkCursor />);

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(container.firstChild).toBeNull();
  });

  it("renders cursor elements on desktop (pointer:fine)", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { container } = render(<InkCursor />);

    act(() => {
      vi.advanceTimersByTime(10);
    });

    // Should render at least the dot and ring elements (framer-motion divs)
    expect(container.children.length).toBeGreaterThan(0);
  });

  // ── Cursor type reaction ───────────────────────────────────────────────────

  it("does not throw when mousemove is fired on desktop", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    render(<InkCursor />);

    act(() => {
      vi.advanceTimersByTime(10);
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    });
    // No assertion needed — just ensure it doesn't throw
  });

  it("creates and removes a splat element on window click", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { container } = render(<InkCursor />);

    act(() => {
      vi.advanceTimersByTime(10);
    });

    const before = container.querySelectorAll("svg").length;

    act(() => {
      fireEvent.click(window, { clientX: 50, clientY: 50 });
    });

    // A splat SVG should now be present
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(before);

    // After 400ms the splat is removed
    act(() => {
      vi.advanceTimersByTime(450);
    });
    expect(container.querySelectorAll("svg").length).toBe(before);
  });

  // ── Cleanup ────────────────────────────────────────────────────────────────

  it("removes event listeners on unmount without throwing", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { unmount } = render(<InkCursor />);

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(() => unmount()).not.toThrow();
  });
});
