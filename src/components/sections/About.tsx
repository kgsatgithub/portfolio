"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export const About: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  const angleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const lastMouseX = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);

  // Damped pendulum swing with pointer velocity and idle sway
  useEffect(() => {
    let startTime = performance.now();

    const loop = (time: number) => {
      // Idle sway when stationary
      const idle = Math.sin((time - startTime) * 0.0018) * 1.5;
      const target = targetAngleRef.current + idle;

      // Spring damping
      angleRef.current += (target - angleRef.current) * 0.08;
      // Decay target back toward 0
      targetAngleRef.current *= 0.94;

      setSwingAngle(angleRef.current);
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (lastMouseX.current !== null) {
      const deltaX = e.clientX - lastMouseX.current;
      targetAngleRef.current = Math.max(Math.min(targetAngleRef.current + deltaX * 0.15, 14), -14);
    }
    lastMouseX.current = e.clientX;
  };

  const handleMouseLeave = () => {
    lastMouseX.current = null;
    setIsFlipped(false);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="section-spacing relative bg-[var(--paper)] overflow-hidden border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Tag & Heading */}
        <div className={`mb-12 ${isInView ? "rv is-in" : "rv"}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            01 — Background &amp; Profile
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
            Engineering distributed scale.
            <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
              About.
            </span>
          </h2>
        </div>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 xl:gap-12 items-stretch">
          {/* Left Column: Summary & Bio */}
          <div
            className={`paper-card p-8 flex flex-col justify-between ${
              isInView ? "rv is-in" : "rv"
            }`}
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <div>
              <div className="font-mono text-xs text-[var(--mute)] mb-4">
                01.1 / STATEMENT
              </div>
              <h3 className="font-display font-semibold text-2xl text-[var(--ink)] mb-4">
                Hi, I&apos;m {PROFILE.name.split(" ")[0]}.
              </h3>
              <p className="text-[var(--ink-2)] text-sm sm:text-base leading-relaxed font-normal mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-xs text-[var(--mute)] leading-relaxed border-t border-[var(--line)] pt-4">
                Specialized in Java 21, Spring Boot, Hibernate, microservices, and Kafka event streaming supporting 10M+ daily transactions.
              </p>
            </div>

            {/* Resume and LinkedIn buttons (only links existing in resume) */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--line)]">
              <a
                href={PROFILE.resumePdf}
                download
                className="btn-pill-primary text-xs py-2.5 px-4"
              >
                <span>Résumé ↓</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-secondary text-xs py-2.5 px-4"
              >
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </div>

          {/* Centre Column: Realistic Hanging Lanyard ID Card */}
          <div
            className={`flex flex-col items-center justify-start ${
              isInView ? "rv is-in" : "rv"
            }`}
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {/* Pendulum Swing Pivot Assembly */}
            <div
              className="origin-top flex flex-col items-center transition-transform duration-75 will-change-transform"
              style={{
                transform: `rotate(${swingAngle}deg)`,
              }}
            >
              {/* Lanyard Strap: 30x56 px with scrolling text and metal clip */}
              <div className="relative w-[30px] h-[56px] bg-[var(--ink)] overflow-hidden shadow-inner flex flex-col items-center justify-center rounded-t-sm">
                <div className="text-[7px] font-mono font-bold text-white tracking-widest whitespace-nowrap rotate-90 select-none opacity-80 uppercase">
                  ENGINEERING
                </div>
              </div>
              {/* Metal Clip & Keyring */}
              <div className="w-4 h-3 bg-neutral-400 rounded-sm shadow-sm border border-neutral-500 mb-1" />
              <div className="w-2.5 h-2 border-2 border-neutral-600 rounded-full mb-1" />

              {/* 3D Flippable Card: 300x404 px */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID card. Press Enter or Space to flip card."
                onClick={toggleFlip}
                onKeyDown={handleKeyDown}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                className="w-[300px] h-[404px] [perspective:1200px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-[24px]"
              >
                <div
                  className="relative w-full h-full rounded-[24px] [transform-style:preserve-3d] transition-transform duration-700 ease-[var(--ease)] shadow-xl"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-[var(--line)] [backface-visibility:hidden] overflow-hidden flex flex-col justify-between p-5 select-none shadow-sm">
                    {/* Top black band */}
                    <div className="-mx-5 -mt-5 bg-[var(--ink)] text-white px-5 py-2.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                        DEVELOPER ID
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400">
                        OFFICIAL
                      </span>
                    </div>

                    {/* Centred highlighted portrait with gradient ring & hover zoom */}
                    <div className="flex flex-col items-center my-auto">
                      <div className="relative w-[128px] h-[156px] rounded-xl p-[2px] bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 shadow-md group">
                        <div className="w-full h-full rounded-[10px] overflow-hidden bg-neutral-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/portrait-bust.webp"
                            alt={PROFILE.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <h4 className="font-display font-bold text-base text-[var(--ink)] leading-snug">
                          {PROFILE.name}
                        </h4>
                        <div className="font-mono text-[10px] text-[var(--mute)]">
                          {PROFILE.role}
                        </div>
                      </div>
                    </div>

                    {/* Metadata Rows: ID No, Dept, Valid from */}
                    <div className="space-y-1.5 border-t border-b border-[var(--line)] py-2 text-[10px] font-mono text-[var(--ink-2)]">
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">ID NO:</span>
                        <span className="font-bold">{PROFILE.idNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">DEPT:</span>
                        <span className="font-medium truncate max-w-[170px] text-right">
                          {PROFILE.dept}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--mute)]">VALID FROM:</span>
                        <span className="font-bold">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Bottom: Barcode + Grayscale Hologram */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Barcode representation */}
                      <div
                        className="flex items-center gap-[2px] h-7 opacity-80"
                        aria-hidden="true"
                      >
                        {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 3, 1, 4, 2, 1, 3, 2].map(
                          (w, idx) => (
                            <span
                              key={idx}
                              className="bg-black inline-block h-full"
                              style={{ width: `${w}px` }}
                            />
                          )
                        )}
                      </div>
                      {/* Holographic sticker */}
                      <div className="w-8 h-8 rounded-full border border-neutral-300 bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 flex items-center justify-center text-[7px] font-mono font-bold text-neutral-600 shadow-inner">
                        SECURE
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white border border-[var(--line)] [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 flex flex-col justify-between text-left select-none shadow-sm">
                    <div>
                      <div className="font-mono text-[10px] font-bold text-[var(--mute)] tracking-wider uppercase mb-3">
                        WHAT I AM
                      </div>
                      <div className="space-y-2 text-xs font-mono text-[var(--ink-2)] leading-relaxed">
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>{PROFILE.role} with 11+ years in FinTech &amp; GovTech</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>M.Tech Computer Science (RGPV Bhopal, 77.50%)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>10M+ daily transactions scaled on GCash Super App</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>SAMPADA 2.0 &amp; UIDAI Aadhaar AUA/ASA Platform Lead</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[var(--ink)] font-bold">▪</span>
                          <span>Agentic AI with OpenAI Codex &amp; Copilot at Volvo</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[var(--line)] pt-3">
                      <div className="font-serif-italic text-sm text-[var(--ink)] tracking-wider">
                        Kumar Gaurav Sharma
                      </div>
                      <div className="font-mono text-[9px] text-[var(--mute)] mt-1">
                        If found, say hello · {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 font-mono text-[11px] text-[var(--mute)] text-center">
              Hover / tap card to flip ↺
            </div>
          </div>

          {/* Right Column: Quick Facts & Paraphrased Quote */}
          <div
            className={`paper-card p-8 flex flex-col justify-between ${
              isInView ? "rv is-in" : "rv"
            }`}
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div>
              <div className="font-mono text-xs text-[var(--mute)] mb-4">
                01.2 / QUICK FACTS
              </div>
              <div className="divide-y divide-[var(--line)]">
                <div className="py-3 flex justify-between text-xs">
                  <span className="font-mono text-[var(--mute)]">Location:</span>
                  <span className="font-mono font-medium text-[var(--ink)] text-right">
                    {PROFILE.location}
                  </span>
                </div>
                <div className="py-3 flex justify-between text-xs">
                  <span className="font-mono text-[var(--mute)]">Education:</span>
                  <span className="font-mono font-medium text-[var(--ink)] text-right">
                    M.Tech (CS), 77.5%
                  </span>
                </div>
                <div className="py-3 flex justify-between text-xs">
                  <span className="font-mono text-[var(--mute)]">Current Role:</span>
                  <span className="font-mono font-medium text-[var(--ink)] text-right">
                    Lead SE @ Volvo (Ascendion)
                  </span>
                </div>
                <div className="py-3 flex justify-between text-xs">
                  <span className="font-mono text-[var(--mute)]">Direct Email:</span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="font-mono font-medium text-[var(--ink)] hover:underline text-right truncate max-w-[170px]"
                  >
                    {PROFILE.email}
                  </a>
                </div>
                <div className="py-3 flex justify-between text-xs">
                  <span className="font-mono text-[var(--mute)]">Phone:</span>
                  <a
                    href={PROFILE.phoneHref}
                    className="font-mono font-medium text-[var(--ink)] hover:underline text-right"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Quote paraphrased strictly from resume text */}
            <div className="pt-6 border-t border-[var(--line)]">
              <blockquote className="font-serif-italic text-base md:text-lg text-[var(--ink-2)] leading-snug">
                &ldquo;{PROFILE.quote}&rdquo;
              </blockquote>
              <div className="mt-2 font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider">
                — Verified Résumé Record
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
