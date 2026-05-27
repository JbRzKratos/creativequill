/**
 * useCardTilt — Unit Tests
 *
 * Tests the hook's mobile detection, event handlers, and cleanup logic.
 *
 * NOTE: `handleMouseEnter` checks `ref.current` before proceeding (to cache
 * the bounding rect). In hook tests the ref is never attached to a real DOM
 * element, so we must simulate that by assigning a fake DOMRect to ref.current
 * before calling onMouseEnter.
 */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCardTilt } from "@/hooks/useCardTilt";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Create a fake MediaQueryList with configurable `matches`. */
function makeMedia(matches: boolean) {
  return {
    matches,
    media: "(pointer: coarse)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
}

/** Attach a fake DOM element to the hook's ref so mouse handlers can proceed. */
function attachFakeElement(ref: React.MutableRefObject<HTMLDivElement | null>) {
  const el = document.createElement("div");
  el.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 200, height: 200 } as DOMRect);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (ref as any).current = el;
}

describe("useCardTilt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ── Initialisation ──────────────────────────────────────────────────────────

  it("exposes ref, glareRef, isHovered, isMobile, style, and props", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { result } = renderHook(() => useCardTilt());
    const { ref, glareRef, isHovered, isMobile, style, props } = result.current;

    expect(ref).toBeDefined();
    expect(glareRef).toBeDefined();
    expect(isHovered).toBe(false);
    expect(isMobile).toBe(false);
    expect(style).toEqual({});
    expect(typeof props.onMouseEnter).toBe("function");
    expect(typeof props.onMouseMove).toBe("function");
    expect(typeof props.onMouseLeave).toBe("function");
  });

  it("sets isMobile=true when pointer:coarse matches on mount", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(true));
    const { result } = renderHook(() => useCardTilt());

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(result.current.isMobile).toBe(true);
  });

  it("does NOT set isMobile when pointer:coarse does NOT match", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { result } = renderHook(() => useCardTilt());

    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(result.current.isMobile).toBe(false);
  });

  // ── Event handlers ──────────────────────────────────────────────────────────

  it("handleMouseEnter sets isHovered=true on desktop", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { result } = renderHook(() => useCardTilt());

    // Attach a fake element so the guard `if (!ref.current) return` passes
    act(() => {
      attachFakeElement(result.current.ref);
      result.current.props.onMouseEnter();
    });

    expect(result.current.isHovered).toBe(true);
  });

  it("handleMouseEnter is a no-op on mobile", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(true));
    const { result } = renderHook(() => useCardTilt());

    act(() => {
      vi.advanceTimersByTime(10); // let isMobileRef sync
      attachFakeElement(result.current.ref);
      result.current.props.onMouseEnter();
    });

    expect(result.current.isHovered).toBe(false);
  });

  it("handleMouseLeave resets isHovered to false", () => {
    window.matchMedia = vi.fn().mockReturnValue(makeMedia(false));
    const { result } = renderHook(() => useCardTilt());

    // Enter
    act(() => {
      attachFakeElement(result.current.ref);
      result.current.props.onMouseEnter();
    });
    expect(result.current.isHovered).toBe(true);

    // Leave
    act(() => {
      result.current.props.onMouseLeave();
    });
    expect(result.current.isHovered).toBe(false);
  });

  // ── Cleanup ─────────────────────────────────────────────────────────────────

  it("removes the media-query change listener on unmount", () => {
    const media = makeMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(media);

    const { unmount } = renderHook(() => useCardTilt());
    unmount();

    expect(media.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
