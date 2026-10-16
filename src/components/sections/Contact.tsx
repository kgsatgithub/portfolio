"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useInView } from "@/lib/hooks";

export const Contact: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.15 });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="section-spacing relative bg-[var(--paper)] border-t border-[var(--line)] overflow-hidden"
    >
      <div className="section-container">
        {/* Section Tag */}
        <div className={`mb-8 ${isInView ? "rv is-in" : "rv"}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            07 — Contact &amp; Inquiry
          </div>
        </div>

        {/* Huge Interactive Heading with Bouncing Letters */}
        <div
          className={`mb-16 select-none ${isInView ? "rv is-in" : "rv"}`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[-0.05em] leading-[0.95] text-[var(--ink)]">
            <div className="flex flex-wrap">
              {line1.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-300 ease-[var(--ease)] hover:-translate-y-4 hover:text-neutral-600 cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {line2.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-300 ease-[var(--ease)] hover:-translate-y-4 hover:text-neutral-600 cursor-default"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Links & Circular Spinning Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center justify-between py-12 border-t border-b border-[var(--line)]">
          <div className="space-y-8">
            {/* Direct Email with Large Underlined Link + Copy Chip */}
            <div>
              <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
                Direct Email
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-[var(--ink)] hover:text-neutral-700 underline underline-offset-8 decoration-1 decoration-[var(--line)] hover:decoration-[var(--ink)] transition-colors break-all"
                >
                  {PROFILE.email}
                </a>

                {/* Copy chip */}
                <button
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  className="px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] hover:border-[var(--ink)] text-xs font-mono font-medium text-[var(--ink)] shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <span aria-live="polite">
                    {copied ? "Copied ✓" : "Copy email"}
                  </span>
                </button>
              </div>
            </div>

            {/* Direct Phone & Social Links (Only from resume) */}
            <div className="flex flex-wrap gap-8 text-sm font-mono text-[var(--ink)]">
              <div>
                <span className="text-[var(--mute)] mr-2">Phone:</span>
                <a
                  href={PROFILE.phoneHref}
                  className="hover:underline font-bold"
                >
                  {PROFILE.phone}
                </a>
              </div>

              <div>
                <span className="text-[var(--mute)] mr-2">LinkedIn:</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-bold"
                >
                  kumargauravsharma889 ↗
                </a>
              </div>

              <div>
                <span className="text-[var(--mute)] mr-2">Location:</span>
                <span className="font-medium text-[var(--ink-2)]">
                  {PROFILE.location}
                </span>
              </div>
            </div>
          </div>

          {/* Circular Spinning 'Say Hello' Badge */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Spinning SVG Curved Text */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_16s_linear_infinite] select-none pointer-events-none"
              >
                <path
                  id="textCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[8.5px] font-mono tracking-[0.25em] fill-[var(--ink)] uppercase">
                  <textPath href="#textCircle" startOffset="0%">
                    SAY HELLO • GET IN TOUCH • START A PROJECT •&nbsp;
                  </textPath>
                </text>
              </svg>

              {/* Center icon / CTA */}
              <button
                onClick={() => scrollToTarget("#hero")}
                aria-label="Scroll back to top"
                className="absolute w-12 h-12 rounded-full bg-[var(--ink)] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md cursor-pointer"
              >
                <span className="font-mono text-sm leading-none">↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Base Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToTarget("#hero")}
              className="text-[var(--ink)] hover:underline cursor-pointer"
            >
              Back to top ↑
            </button>
            <span>Built with Next.js 15 &amp; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
