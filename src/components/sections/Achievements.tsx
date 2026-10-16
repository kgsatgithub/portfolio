"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";

function useCountUp(target: number, duration: number = 1400, trigger: boolean = false): number {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    let rafId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutQuart(progress);
      setVal(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, trigger]);

  return val;
}

const AchievementCard: React.FC<{
  item: (typeof ACHIEVEMENTS)[0];
  isCentered: boolean;
  hasTriggered: boolean;
}> = ({ item, isCentered, hasTriggered }) => {
  const count = useCountUp(item.number, 1400, hasTriggered);

  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`${item.label}: ${item.number}${item.suffix}. ${item.caption}`}
      className={`shrink-0 bg-white rounded-[28px] p-8 flex flex-col justify-between transition-all duration-500 ease-[var(--ease)] focus:outline-none select-none ${
        isCentered
          ? "-translate-y-3 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5"
          : "shadow-md hover:-translate-y-1"
      }`}
      style={{
        width: "clamp(340px, 40vw, 540px)",
        height: "clamp(260px, 36vh, 310px)",
      }}
    >
      {/* Top: 72px logo tile + Index */}
      <div className="flex items-center justify-between">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[var(--paper)] flex items-center justify-center p-3 relative shadow-inner">
          <TechLogo
            name={item.platform}
            slug={item.platformBrand}
            size={48}
            showGlow={isCentered}
          />
        </div>
        <span className="font-mono text-xs font-bold text-[var(--mute)]">
          {item.index}
        </span>
      </div>

      {/* Bottom Area: Left text & Right giant number */}
      <div className="flex items-end justify-between gap-4 mt-auto">
        <div className="max-w-[280px]">
          <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] leading-snug tracking-tight">
            {item.label}
          </h3>
          <div className="font-mono text-xs text-[var(--mute)] mt-1">
            {item.caption}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-2)] mt-0.5 leading-tight">
            {item.detail}
          </div>
        </div>

        {/* Huge count-up number */}
        <div className="text-right shrink-0">
          <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-[-0.05em] text-[var(--ink)] leading-none select-none">
            {count}
          </span>
          <span className="font-display font-bold text-3xl sm:text-4xl text-[var(--mute)] ml-0.5 leading-none">
            {item.suffix}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCenterIdx, setActiveCenterIdx] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  // References for smooth animation loop
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const getMaxScroll = useCallback((): number => {
    if (!trackRef.current) return 2000;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    return Math.max(trackWidth - viewportWidth + 140, 100);
  }, []);

  // Animation frame loop for buttery-smooth horizontal motion
  useEffect(() => {
    const loop = () => {
      const maxScroll = getMaxScroll();
      // Lerp toward target offset
      const diff = targetOffsetRef.current - currentOffsetRef.current;
      if (Math.abs(diff) > 0.1) {
        currentOffsetRef.current += diff * 0.16;
        const progress = Math.min(Math.max(currentOffsetRef.current / maxScroll, 0), 1);
        setScrollProgress(progress);

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${currentOffsetRef.current}px)`;
        }

        const cardCount = ACHIEVEMENTS.length;
        const centerIdx = Math.min(
          Math.max(Math.round(progress * (cardCount - 1)), 0),
          cardCount - 1
        );
        setActiveCenterIdx(centerIdx);

        if (progress > 0.05 && !hasTriggered) {
          setHasTriggered(true);
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [getMaxScroll, hasTriggered]);

  // Wheel interception: stop vertical scroll when mouse is under section until horizontal reaches boundary
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If mouse is NOT hovered over this section, let page scroll normally
      if (!isHoveredRef.current) return;

      const rect = container.getBoundingClientRect();
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;

      // If section is still far below the viewport top, let vertical scroll bring it into view
      if (rect.top > 40 && delta > 0) {
        return;
      }
      // If section's bottom is far above the viewport and scrolling up, let vertical scroll bring it down
      if (rect.bottom < window.innerHeight - 40 && delta < 0) {
        return;
      }

      const maxScroll = getMaxScroll();
      const currentTarget = targetOffsetRef.current;

      // Scrolling Down / Forward
      if (delta > 0) {
        if (currentTarget < maxScroll - 1) {
          // INTERCEPT: Stop vertical scroll, consume delta for horizontal
          e.preventDefault();
          e.stopPropagation();

          // Keep section top anchored flush with viewport top
          if (Math.abs(rect.top) > 4) {
            window.scrollTo({
              top: window.scrollY + rect.top,
              behavior: "instant",
            });
          }

          targetOffsetRef.current = Math.min(currentTarget + delta * 1.15, maxScroll);
          setHasTriggered(true);
        } else {
          // At the end of horizontal items: allow vertical scroll to proceed down to next section
          // Do not call e.preventDefault()
        }
      }
      // Scrolling Up / Backward
      else if (delta < 0) {
        if (currentTarget > 1) {
          // INTERCEPT: Stop vertical scroll, consume delta for horizontal
          e.preventDefault();
          e.stopPropagation();

          // Keep section top anchored flush with viewport top
          if (Math.abs(rect.top) > 4) {
            window.scrollTo({
              top: window.scrollY + rect.top,
              behavior: "instant",
            });
          }

          targetOffsetRef.current = Math.max(currentTarget + delta * 1.15, 0);
        } else {
          // At the start of horizontal items: allow vertical scroll to proceed up to previous section
          // Do not call e.preventDefault()
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [getMaxScroll]);

  // Touch swipe support for mobile
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = touchStartXRef.current - currentX;
    const maxScroll = getMaxScroll();

    if (Math.abs(deltaX) > 10) {
      if (
        (deltaX > 0 && targetOffsetRef.current < maxScroll) ||
        (deltaX < 0 && targetOffsetRef.current > 0)
      ) {
        targetOffsetRef.current = Math.min(
          Math.max(targetOffsetRef.current + deltaX * 1.2, 0),
          maxScroll
        );
        touchStartXRef.current = currentX;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  return (
    <section
      id="achievements"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[100svh] h-[100svh] w-full flex flex-col justify-between overflow-hidden py-10 px-[var(--gutter)] bg-[var(--paper)] border-t border-[var(--line)] select-none"
    >
      {/* Header with Title and Thin Progress Bar */}
      <div className="max-w-[1320px] w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4">
          <div>
            <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-1">
              06 — Verified Milestones
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
              Quantified engineering impact.
              <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
                Scale.
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs text-[var(--mute)] flex items-center gap-2">
            <span>Scroll metrics horizontally</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>

        {/* Thin Progress Bar */}
        <div className="w-full h-[2px] bg-[var(--line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--ink)] origin-left transition-transform duration-75 ease-out"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </div>

      {/* Horizontal Scrolling Card Track */}
      <div className="my-auto w-full overflow-hidden py-6">
        <div
          ref={trackRef}
          className="flex items-center gap-8 pl-4 pr-16 will-change-transform"
        >
          {ACHIEVEMENTS.map((item, idx) => (
            <AchievementCard
              key={item.index}
              item={item}
              isCentered={activeCenterIdx === idx}
              hasTriggered={hasTriggered}
            />
          ))}

          {/* End Marker */}
          <div className="shrink-0 flex items-center justify-center px-12 text-center">
            <span className="font-serif-italic text-2xl text-[var(--mute)] select-none whitespace-nowrap">
              and counting →
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info Note */}
      <div className="max-w-[1320px] w-full mx-auto text-xs font-mono text-[var(--mute)] flex justify-between items-center">
        <span>* Data audited strictly from verified enterprise deployments</span>
        <span>
          {isHovered ? "Vertical scroll locked • Scrolling metrics" : "01 — 06"}
        </span>
      </div>
    </section>
  );
};
