/**
 * CQFooter — Component Tests
 *
 * Covers: brand rendering, quick links, newsletter form submit flow,
 * success message, and contact links.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CQFooter from "@/components/cq-footer";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("CQFooter", () => {
  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders the brand name and tagline", () => {
    render(<CQFooter />);
    expect(screen.getByText("Creative Quill")).toBeInTheDocument();
    expect(screen.getByText(/content that connects/i)).toBeInTheDocument();
  });

  it("renders all 5 quick links", () => {
    render(<CQFooter />);
    const labels = ["Home", "Services", "About", "Works", "Contact"];
    labels.forEach((label) => {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders the copyright notice", () => {
    render(<CQFooter />);
    expect(screen.getByText(/2026 creative quill/i)).toBeInTheDocument();
  });

  it("renders the email contact link", () => {
    render(<CQFooter />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@creativequill.co.in");
  });

  it("renders the phone contact link", () => {
    render(<CQFooter />);
    const phoneLink = screen.getByRole("link", { name: /88071/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+918807190545");
  });

  // ── Newsletter form ────────────────────────────────────────────────────────

  it("renders the newsletter email input", () => {
    render(<CQFooter />);
    expect(screen.getByRole("textbox", { name: /email for newsletter/i })).toBeInTheDocument();
  });

  it("shows success message after valid email is submitted", async () => {
    render(<CQFooter />);
    const input = screen.getByRole("textbox", { name: /email for newsletter/i });
    const submitBtn = screen.getByRole("button", { name: /join/i });

    await userEvent.type(input, "test@example.com");
    await userEvent.click(submitBtn);

    expect(screen.getByText(/you.re subscribed/i)).toBeInTheDocument();
  });

  it("does NOT submit when email field is empty", async () => {
    render(<CQFooter />);
    const submitBtn = screen.getByRole("button", { name: /join/i });
    await userEvent.click(submitBtn);

    // Form should not switch to success state
    expect(screen.queryByText(/you.re subscribed/i)).toBeNull();
    expect(screen.getByRole("textbox", { name: /email for newsletter/i })).toBeInTheDocument();
  });

  it("hides the form and shows success message after submission", async () => {
    render(<CQFooter />);
    const input = screen.getByRole("textbox", { name: /email for newsletter/i });
    await userEvent.type(input, "user@creativequill.in");
    await userEvent.click(screen.getByRole("button", { name: /join/i }));

    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.getByText(/you.re subscribed/i)).toBeInTheDocument();
  });
});
