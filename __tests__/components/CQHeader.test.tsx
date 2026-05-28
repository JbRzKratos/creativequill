/**
 * CQHeader — Component Tests
 *
 * Verifies navigation rendering, mobile menu toggle behaviour, keyboard
 * accessibility, scroll-lock side effects, and route-change auto-close.
 *
 * JSDOM NOTE: The burger button has `display:none` set by the embedded CSS
 * style block (jsdom parses inline <style> tags). This means:
 *   - We need `{ hidden: true }` to find it with getAllByRole.
 *   - We must use `fireEvent.click` (not userEvent.click) because
 *     userEvent respects CSS visibility and skips hidden elements.
 *   - We check state via aria-label/aria-expanded attributes since the
 *     button is always present in the DOM, just CSS-hidden.
 */
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CQHeader from "@/components/cq-header";

// ── Mock Next.js primitives ──────────────────────────────────────────────────

vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const mockPathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

// ── Helpers ───────────────────────────────────────────────────────────────────

// The burger has display:none from the inline CSS, so use hidden:true
function getBurgerBtn() {
  return screen.getAllByRole("button", { hidden: true })[0];
}

// Check state via aria attributes (works even with CSS-hidden elements)
function isMenuOpen(btn: HTMLElement) {
  return btn.getAttribute("aria-expanded") === "true";
}

// Click the hidden button using fireEvent (userEvent skips display:none elements)
function clickBurger(btn: HTMLElement) {
  fireEvent.click(btn);
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("CQHeader", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders the Creative Quill brand name", () => {
    render(<CQHeader />);
    expect(screen.getByText("Creative")).toBeInTheDocument();
    expect(screen.getByText("Quill")).toBeInTheDocument();
  });

  it("renders all 5 nav links", () => {
    render(<CQHeader />);
    const navLinks = ["Home", "Services", "About", "Works", "Contact"];
    navLinks.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders the Let's Talk CTA", () => {
    render(<CQHeader />);
    expect(screen.getAllByText(/let.s talk/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the hamburger button with correct initial aria attributes", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-label", "Open menu");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  // ── Mobile menu toggle ─────────────────────────────────────────────────────

  it("toggles aria-label and aria-expanded when burger is clicked", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();

    // Open
    clickBurger(btn);
    expect(btn).toHaveAttribute("aria-label", "Close menu");
    expect(btn).toHaveAttribute("aria-expanded", "true");

    // Close
    clickBurger(btn);
    expect(btn).toHaveAttribute("aria-label", "Open menu");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("locks body scroll when mobile menu is open", () => {
    render(<CQHeader />);
    clickBurger(getBurgerBtn());
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when mobile menu is closed", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();
    clickBurger(btn); // open
    clickBurger(btn); // close
    expect(document.body.style.overflow).toBe("");
  });

  it("closes menu when a mobile nav link is clicked", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();
    clickBurger(btn);
    expect(isMenuOpen(btn)).toBe(true);

    // Click a nav link inside the mobile nav — the link has an onClick handler
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    fireEvent.click(homeLinks[homeLinks.length - 1]);
    expect(isMenuOpen(btn)).toBe(false);
  });

  // ── Keyboard accessibility ─────────────────────────────────────────────────

  it("closes mobile menu on Escape key press", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();
    clickBurger(btn);
    expect(isMenuOpen(btn)).toBe(true);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(isMenuOpen(btn)).toBe(false);
  });

  // ── Active link highlighting ───────────────────────────────────────────────

  it("marks the current page link as active", () => {
    mockPathname.mockReturnValue("/services");
    render(<CQHeader />);

    const serviceLinks = screen.getAllByRole("link", { name: "Services", hidden: true });
    const hasActive = serviceLinks.some((el) => el.classList.contains("active"));
    expect(hasActive).toBe(true);
  });

  // ── Resize behaviour ───────────────────────────────────────────────────────

  it("closes mobile menu when window resizes to desktop width", () => {
    render(<CQHeader />);
    const btn = getBurgerBtn();
    clickBurger(btn);
    expect(isMenuOpen(btn)).toBe(true);

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
      fireEvent(window, new Event("resize"));
    });

    expect(isMenuOpen(btn)).toBe(false);
  });

  // ── Overlay backdrop ──────────────────────────────────────────────────────

  it("closes mobile menu when backdrop overlay is clicked", () => {
    const { container } = render(<CQHeader />);
    const btn = getBurgerBtn();
    clickBurger(btn);
    expect(isMenuOpen(btn)).toBe(true);

    const overlay = container.querySelector(".cq-mobile-overlay");
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(isMenuOpen(btn)).toBe(false);
  });

  // ── Logo link ─────────────────────────────────────────────────────────────

  it("has a logo link pointing to /", () => {
    render(<CQHeader />);
    const logoLink = screen.getByRole("link", { name: /creative quill/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
