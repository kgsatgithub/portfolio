"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export const Certifications: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="bg-white border-t border-b border-[var(--line)] py-20 md:py-28 relative overflow-hidden"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Heading & Count Line */}
          <div
            className={`lg:sticky lg:top-28 ${
              isInView ? "rv is-in" : "rv"
            }`}
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
              04 — Certifications
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)] mb-4">
              Always learning.
              <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
                Mastery.
              </span>
            </h2>
            <p className="font-mono text-xs text-[var(--mute)]">
              0{CERTIFICATIONS.length} Verified Industry &amp; Security Certifications
            </p>
          </div>

          {/* Right: Numbered Ink-flood Index Rows */}
          <div
            className={`divide-y divide-[var(--line)] border-y border-[var(--line)] ${
              isInView ? "rv is-in" : "rv"
            }`}
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.index}
                tabIndex={0}
                role="article"
                aria-label={`${cert.title} by ${cert.issuer}, ${cert.year}`}
                className="group relative overflow-hidden py-6 sm:py-8 px-4 sm:px-6 cursor-pointer focus:outline-none transition-colors duration-300"
              >
                {/* Ink-Flood background sheet from left to right */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[var(--ease)] pointer-events-none"
                />

                {/* Content row */}
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-8 flex-1">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--mute)] group-hover:text-neutral-400 group-focus:text-neutral-400 transition-colors duration-300">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-2xl text-[var(--ink)] group-hover:text-white group-focus:text-white transition-colors duration-300 tracking-tight">
                        {cert.title}
                      </h3>
                      <div className="font-mono text-xs text-[var(--mute)] group-hover:text-neutral-300 group-focus:text-neutral-300 transition-colors duration-300 mt-1">
                        Issuer: {cert.issuer}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[var(--mute)] group-hover:text-neutral-300 group-focus:text-neutral-300 transition-colors duration-300">
                      {cert.year}
                    </span>
                    {/* Sliding Arrow */}
                    <span
                      aria-hidden="true"
                      className="font-mono text-base text-[var(--ink)] group-hover:text-white group-focus:text-white transform -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 transition-all duration-300"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
