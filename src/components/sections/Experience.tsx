"use client";

import React, { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export const Experience: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [spineProgress, setSpineProgress] = useState(0);

  // Chronological order from oldest to newest:
  // In TIMELINE data, we reverse it or sort by start year
  const chronologicalItems = [...TIMELINE].reverse();

  // Draw spine based on scroll position within section
  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when top of timeline is at 60% of viewport, finish when bottom reaches 50%
      const start = windowHeight * 0.65;
      const totalDist = rect.height;
      const current = start - rect.top;

      const progress = Math.min(Math.max(current / totalDist, 0), 1);
      setSpineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-spacing relative bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-16 ${isInView ? "rv is-in" : "rv"}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            05 — Trajectory
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
            Education and experience as one path.
            <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
              Journey.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[var(--mute)] font-mono max-w-xl">
            Chronological continuum of academic excellence, hands-on development, and enterprise leadership.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10 md:pl-16">
          {/* Vertical Spine: Background track */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[19px] md:left-[31px] top-2 bottom-6 w-[2px] bg-[var(--line)]"
          />

          {/* Active drawing spine */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[19px] md:left-[31px] top-2 w-[2px] bg-[var(--ink)] origin-top transition-all duration-100 ease-out"
            style={{
              height: `${spineProgress * 100}%`,
              maxHeight: "calc(100% - 24px)",
            }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {chronologicalItems.map((item, idx) => {
              const nodeFraction = idx / (chronologicalItems.length);
              const isLit = spineProgress >= nodeFraction;

              return (
                <div
                  key={item.id}
                  className="relative group transition-opacity duration-300"
                >
                  {/* Spine Stop Bullet */}
                  <div
                    aria-hidden="true"
                    className={`absolute -left-[30px] sm:-left-[42px] md:-left-[54px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isLit
                        ? "border-[var(--ink)] bg-[var(--ink)] shadow-[0_0_12px_rgba(13,13,13,0.25)]"
                        : "border-[var(--line)] bg-[var(--paper)]"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isLit ? "bg-white" : "bg-neutral-300"
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`paper-card p-6 sm:p-8 transition-all duration-300 ${
                      isLit
                        ? "border-[var(--line)] shadow-md"
                        : "opacity-75"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                              item.type === "education"
                                ? "bg-neutral-200 text-neutral-800"
                                : "bg-[var(--ink)] text-white"
                            }`}
                          >
                            {item.type}
                          </span>
                          {item.score && (
                            <span className="font-mono text-xs font-bold text-[var(--ink)]">
                              Score: {item.score}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                          {item.roleOrDegree}
                        </h3>
                        <div className="font-mono text-xs sm:text-sm text-[var(--mute)]">
                          {item.organization}
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-[var(--ink)] whitespace-nowrap">
                        {item.period}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 mt-4 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed font-normal">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges if present */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[var(--line)]">
                        {item.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-[var(--paper)] text-[10px] font-mono text-[var(--mute)] border border-[var(--line)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: Next — Your team? */}
            <div className="relative group">
              <div
                aria-hidden="true"
                className={`absolute -left-[30px] sm:-left-[42px] md:-left-[54px] top-6 w-6 h-6 rounded-full border-2 border-dashed border-[var(--ink)] flex items-center justify-center bg-[var(--paper)] transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="w-2 h-2 rounded-full bg-[var(--ink)]" />
              </div>

              <div className="p-8 rounded-[28px] border-2 border-dashed border-[var(--line)] hover:border-[var(--ink)] bg-white/40 transition-colors duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider mb-1">
                    Future Roadmap
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[var(--ink)] tracking-tight">
                    Next — Your team?
                  </h3>
                  <p className="text-xs text-[var(--mute)] font-mono mt-1">
                    Ready to scale enterprise distributed architectures and lead high-impact engineering.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="btn-pill-primary text-xs py-2.5 px-5 self-start sm:self-auto"
                >
                  <span>Initiate Discussion</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
