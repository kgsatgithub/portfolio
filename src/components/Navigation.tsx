"use client";

import React, { useState, useEffect, useRef } from "react";
import { PROFILE, NAV } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export const Navigation: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navLinksRef = useRef<Record<string, HTMLButtonElement | null>>({});

  // Track scroll position for header styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = ["hero", ...NAV.map((n) => n.id)];
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "hero") {
            setActiveSection("");
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill position
  useEffect(() => {
    const activeEl = navLinksRef.current[activeSection];
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Lock scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(`#${id}`, -20);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left transition-transform duration-75 ease-out pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Main navigation header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 pt-4 pb-3 flex items-center justify-between pointer-events-none">
        {/* Left: Initials mark + Name */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => scrollToTarget("#hero")}
            aria-label="Back to top"
            className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs tracking-wider transition-all duration-500 ease-[var(--ease)] ${
              scrolled
                ? "bg-[var(--ink)] text-white shadow-sm"
                : "border border-[var(--ink)] text-[var(--ink)] bg-[var(--paper)]/60 backdrop-blur-sm"
            } hover:rotate-[360deg]`}
          >
            {PROFILE.initials}
          </button>
          <span
            className={`font-display font-medium text-sm tracking-tight text-[var(--ink)] transition-opacity duration-300 ${
              scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {PROFILE.name}
          </span>
        </div>

        {/* Centre/Right: Desktop navigation pill */}
        <nav
          aria-label="Primary navigation"
          className={`hidden md:flex items-center relative p-1.5 rounded-full pointer-events-auto transition-all duration-300 ease-[var(--ease)] ${
            scrolled
              ? "bg-white/85 backdrop-blur-md shadow-sm border border-[var(--line)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Sliding indicator pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[var(--ink)] transition-all duration-300 ease-[var(--ease)] pointer-events-none"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
          />

          {NAV.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  navLinksRef.current[item.id] = el;
                }}
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 px-4 py-1.5 text-xs font-mono font-medium tracking-wide transition-colors duration-200 cursor-pointer rounded-full ${
                  isActive
                    ? "text-white"
                    : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile menu trigger button */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="px-4 py-1.5 rounded-full border border-[var(--line)] bg-[var(--card)]/90 backdrop-blur-sm text-xs font-mono font-medium text-[var(--ink)] shadow-sm hover:border-[var(--ink)] cursor-pointer"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 transition-all duration-500 ease-[var(--ease)] md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="flex items-center justify-between">
          <div className="font-mono font-bold text-sm tracking-widest text-[var(--ink)]">
            {PROFILE.name.toUpperCase()}
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-sm text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--ink)] hover:translate-x-3 transition-transform duration-300 flex items-baseline gap-4 cursor-pointer"
            >
              <span className="font-mono text-xs text-[var(--mute)]">
                0{idx + 1}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--mute)]">
          <span>{PROFILE.role}</span>
          <a
            href={PROFILE.resumePdf}
            download
            className="text-[var(--ink)] underline font-medium"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
};
