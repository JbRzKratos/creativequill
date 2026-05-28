"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // TODO: integrate with error monitoring (e.g. Sentry)
    }
  }, [error]);

  return (
    <>
      <style>{`
        .err-page {
          min-height: 100vh;
          background: var(--cq-cream, #faf7f0);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1.5rem;
          font-family: system-ui, sans-serif;
        }
        .err-container {
          max-width: 36rem;
          text-align: center;
        }
        .err-icon {
          width: 4rem;
          height: 4rem;
          background: #fef2f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #dc2626;
        }
        .err-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 0.75rem;
        }
        .err-desc {
          font-size: 0.9rem;
          color: #6b7280;
          line-height: 1.65;
          margin: 0 auto 2rem;
          max-width: 30ch;
        }
        .err-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .err-btn-primary {
          display: inline-flex;
          align-items: center;
          background: #2d5a27;
          color: #faf7f0;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: opacity 0.15s;
          min-height: 44px;
        }
        .err-btn-primary:hover { opacity: 0.85; }
        .err-btn-ghost {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
          text-decoration: none;
          min-height: 44px;
        }
        .err-btn-ghost:hover { border-color: #9ca3af; color: #374151; }
      `}</style>
      <div className="err-page">
        <div className="err-container">
          <div className="err-icon" aria-hidden="true">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="err-title">Something went wrong</h1>
          <p className="err-desc">
            An unexpected error occurred. Please try again, or return to the homepage.
          </p>
          <div className="err-actions">
            <button onClick={reset} className="err-btn-primary">
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className="err-btn-ghost">
              Go home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
