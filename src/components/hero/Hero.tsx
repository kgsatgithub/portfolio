"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export const Hero: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Video autoplay & sound unlocking behavior
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // First attempt: try play with sound unmuted
    video.muted = false;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Autoplay with sound blocked: fall back to muted
        video.muted = true;
        setAutoplayBlocked(true);
        setIsMuted(true);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });

    // Unlock sound on first user gesture (pointerdown, keydown, touchend)
    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
        setAutoplayBlocked(false);
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  // IntersectionObserver: Pause video when less than 35% visible, resume when back
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: [0, 0.35, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-20 pb-8 px-[var(--gutter)] bg-[var(--paper)]"
    >
      {/* Giant outlined ghost word behind person */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="font-display font-black text-[22vw] leading-none tracking-tighter text-transparent uppercase opacity-80"
          style={{
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.12)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Top subtle meta bar */}
      <div className="relative z-10 flex items-center justify-between max-w-[1320px] w-full mx-auto text-xs font-mono text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for High-Scale Distributed Engineering</span>
        </div>
        <div className="hidden sm:block">
          <span>{PROFILE.location}</span>
        </div>
      </div>

      {/* Center: Hero Video with multiply blend */}
      <div className="relative z-10 flex items-center justify-center my-auto w-full">
        <div
          className="relative max-w-full flex items-center justify-center h-[62svh] md:h-[min(72svh,840px)]"
          style={{
            aspectRatio: "768 / 960",
          }}
        >
          <video
            ref={videoRef}
            loop
            playsInline
            preload="auto"
            muted
            className="w-full h-full object-cover select-none pointer-events-none [mix-blend-mode:multiply]"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound control button */}
          <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute voice audio" : "Mute voice audio"}
              className="relative w-[46px] h-[46px] rounded-full bg-[var(--ink)] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {/* Soft ping ring while muted or autoplay blocked */}
              {isMuted && (
                <span className="absolute -inset-1 rounded-full border border-[var(--ink)]/40 animate-ping pointer-events-none" />
              )}
              {isMuted ? (
                // Triangle ▶
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="translate-x-[1px]"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                // Two bars ❚❚
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hero Content: Role Heading & CTAs */}
      <div className="relative z-10 max-w-[1320px] w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            00 — {PROFILE.name}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
            {PROFILE.role}
            <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
              architect.
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] max-w-xl font-normal leading-relaxed">
            11+ years engineering distributed systems, microservices, and 10M+ daily financial transactions.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => scrollToTarget("#work")}
            className="btn-pill-primary"
          >
            <span>Explore work</span>
            <span aria-hidden="true">→</span>
          </button>
          <button
            onClick={() => scrollToTarget("#contact")}
            className="btn-pill-secondary"
          >
            <span>Let&apos;s talk</span>
          </button>
          <a
            href={PROFILE.resumePdf}
            download
            className="btn-pill-secondary"
          >
            <span>Résumé ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};
