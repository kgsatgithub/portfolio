"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_GROUPS, Skill } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export const Skills: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [selectedFamily, setSelectedFamily] = useState<string>("All");
  const [inspectedSkill, setInspectedSkill] = useState<Skill>(SKILLS[0]);

  const families = ["All", ...SKILL_GROUPS.map((g) => g.name)];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-spacing relative bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-10 ${isInView ? "rv is-in" : "rv"}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            02 — Periodic Stack
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
            The periodic table of my stack.
            <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
              Craft.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[var(--mute)] font-mono max-w-xl">
            Every technology and architectural discipline verified directly from enterprise systems.
          </p>
        </div>

        {/* Filter Chips */}
        <div
          className={`flex flex-wrap items-center gap-2 mb-8 ${
            isInView ? "rv is-in" : "rv"
          }`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {families.map((family) => {
            const isSelected = selectedFamily === family;
            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--ink)] text-white shadow-sm"
                    : "bg-[var(--card)] text-[var(--ink-2)] border border-[var(--line)] hover:border-[var(--ink)]"
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Main Layout: 8-col grid + Sticky Inspector Panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Element Tile Grid: 8 cols desktop, 4 cols mobile */}
          <div
            className="flex-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 sm:gap-3 w-full"
            role="grid"
            aria-label="Periodic table of skills"
          >
            {SKILLS.map((skill, idx) => {
              const isMatch =
                selectedFamily === "All" || skill.family === selectedFamily;
              const isSelected = inspectedSkill.name === skill.name;
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const delay = (row + col) * 40;

              return (
                <button
                  key={skill.atomicNumber}
                  onClick={() => setInspectedSkill(skill)}
                  onMouseEnter={() => setInspectedSkill(skill)}
                  onFocus={() => setInspectedSkill(skill)}
                  tabIndex={0}
                  aria-label={`${skill.name}, atomic number ${skill.atomicNumber}, family ${skill.family}`}
                  className={`aspect-square p-2 rounded-xl flex flex-col justify-between text-left transition-all duration-300 ease-[var(--ease)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                    isSelected
                      ? "bg-[var(--ink)] text-white shadow-md scale-105 z-10"
                      : "bg-[var(--card)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] hover:scale-102"
                  } ${
                    isMatch
                      ? "opacity-100"
                      : "opacity-25 grayscale hover:grayscale-0 hover:opacity-100"
                  }`}
                  style={{
                    transitionDelay: isInView ? `${delay}ms` : "0ms",
                  }}
                >
                  <div className="flex justify-between items-start text-[9px] font-mono leading-none">
                    <span className={isSelected ? "text-neutral-400" : "text-[var(--mute)]"}>
                      {skill.atomicNumber}
                    </span>
                    <span
                      className={`text-[8px] uppercase tracking-tighter truncate max-w-[32px] ${
                        isSelected ? "text-neutral-400" : "text-[var(--mute)]"
                      }`}
                    >
                      {skill.family.slice(0, 3)}
                    </span>
                  </div>

                  <div className="font-display font-bold text-lg sm:text-xl tracking-tight text-center my-auto">
                    {skill.symbol}
                  </div>

                  <div
                    className={`font-mono text-[9px] truncate tracking-tight text-center ${
                      isSelected ? "text-neutral-300" : "text-[var(--ink-2)]"
                    }`}
                  >
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-24">
            <div className="paper-card p-6 flex flex-col items-center text-center">
              <div className="w-full flex items-center justify-between font-mono text-[10px] text-[var(--mute)] pb-4 border-b border-[var(--line)]">
                <span>INSPECTOR</span>
                <span>NO. {inspectedSkill.atomicNumber}</span>
              </div>

              {/* 150px Brand Logo / Concept Icon with Pop Animation */}
              <div className="my-6 relative flex items-center justify-center h-[160px] w-full">
                <div
                  key={inspectedSkill.name}
                  className="transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-75"
                >
                  <TechLogo
                    name={inspectedSkill.name}
                    slug={inspectedSkill.brandSlug}
                    size={140}
                    showGlow={true}
                  />
                </div>
              </div>

              <div className="w-full pt-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 text-[var(--ink-2)] border border-[var(--line)] uppercase tracking-wider mb-2">
                  {inspectedSkill.family}
                </span>
                <h3 className="font-display font-bold text-2xl text-[var(--ink)] tracking-tight">
                  {inspectedSkill.name}
                </h3>
                <div className="font-mono text-xs text-[var(--mute)] mt-1">
                  Symbol: {inspectedSkill.symbol}
                </div>
              </div>

              {/* Projects using the skill */}
              <div className="w-full mt-6 pt-5 border-t border-[var(--line)] text-left">
                <div className="font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider mb-2">
                  Used in Projects
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {inspectedSkill.projects.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className="inline-block px-2 py-1 rounded bg-[var(--paper)] text-[10px] font-mono text-[var(--ink-2)] border border-[var(--line)]"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
