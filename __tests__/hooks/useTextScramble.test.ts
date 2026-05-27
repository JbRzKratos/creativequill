/**
 * useTextScramble — Unit Tests
 *
 * Tests the hook's character scrambling and resolution lifecycle.
 */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTextScramble } from "@/hooks/useTextScramble";

describe("useTextScramble", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initialises with all characters in 'scrambled' status", () => {
    const { result } = renderHook(() => useTextScramble("Hello"));
    const chars = result.current;
    expect(chars).toHaveLength(5);
    chars.forEach((c) => expect(c.status).toBe("scrambled"));
  });

  it("returns the correct number of characters for the input", () => {
    const text = "Creative Quill";
    const { result } = renderHook(() => useTextScramble(text));
    expect(result.current).toHaveLength(text.length);
  });

  it("eventually resolves all characters to 'resolved'", () => {
    const { result } = renderHook(() => useTextScramble("Hi"));

    // Run all intervals (30 frames × 40ms = 1200ms)
    act(() => {
      vi.advanceTimersByTime(1300);
    });

    const chars = result.current;
    chars.forEach((c) => {
      expect(c.status).toBe("resolved");
    });
  });

  it("does NOT start the animation when trigger=false", () => {
    const { result } = renderHook(() => useTextScramble("Hi", false));

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    // With trigger=false, chars should remain scrambled (initial state)
    const chars = result.current;
    chars.forEach((c) => expect(c.status).toBe("scrambled"));
  });

  it("restores original character values when resolved", () => {
    const text = "ABC";
    const { result } = renderHook(() => useTextScramble(text));

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    const chars = result.current;
    expect(chars.map((c) => c.char).join("")).toBe(text);
  });

  it("resolves spaces immediately (no scramble on whitespace)", () => {
    const { result } = renderHook(() => useTextScramble("A B"));

    // After one tick many chars should still be scrambling
    act(() => {
      vi.advanceTimersByTime(40);
    });

    // The space at index 1 should be resolved (never scrambled)
    const space = result.current[1];
    expect(space.char).toBe(" ");
    expect(space.status).toBe("resolved");
  });
});
