"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export const Work: React.FC = () => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  const renderMiniUI = (project: Project) => {
    switch (project.id) {
      case "gcash-super-app":
        return (
          <div className="h-full w-full bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-neutral-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white tracking-wide">GCASH STREAM CLUSTER</span>
              </div>
              <span className="text-[10px] text-neutral-400">TPS: 12,480 / sec</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-neutral-800/80 p-3 rounded-lg border border-neutral-700">
                <div className="text-[10px] text-neutral-400">DAILY TRANSACTIONS</div>
                <div className="text-xl font-bold text-white mt-1">10,240,000+</div>
                <div className="text-[9px] text-neutral-400 mt-1">Kafka 2× Throughput</div>
              </div>
              <div className="bg-neutral-800/80 p-3 rounded-lg border border-neutral-700">
                <div className="text-[10px] text-neutral-400">P99 LATENCY</div>
                <div className="text-xl font-bold text-white mt-1">18.4 ms</div>
                <div className="text-[9px] text-emerald-400 mt-1">-38% via Query Cache</div>
              </div>
            </div>

            <div className="space-y-1.5 flex-1 overflow-hidden my-1">
              <div className="text-[9px] text-neutral-400 tracking-wider">LIVE EVENT STREAM</div>
              {[
                { time: "00:00:01", type: "PAYMENT_TRANSFER", val: "₱4,500.00", status: "COMMITTED" },
                { time: "00:00:02", type: "QR_MERCHANT_SETTLE", val: "₱850.00", status: "COMMITTED" },
                { time: "00:00:02", type: "INVEST_DIVIDEND", val: "₱12,000.00", status: "COMMITTED" },
              ].map((tx, idx) => (
                <div key={idx} className="flex justify-between items-center bg-neutral-950 px-2.5 py-1.5 rounded border border-neutral-800/60 text-[10px]">
                  <span className="text-neutral-400">{tx.time}</span>
                  <span className="text-white truncate">{tx.type}</span>
                  <span className="text-neutral-300 font-bold">{tx.val}</span>
                  <span className="text-[9px] text-neutral-400">{tx.status}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[9px] text-neutral-400 flex justify-between items-center">
              <span>SECURITY: OAuth2 / Spring Sec 6</span>
              <span className="text-neutral-300">INCIDENTS: -35% (Prometheus)</span>
            </div>
          </div>
        );

      case "sampada-2":
        return (
          <div className="h-full w-full bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-neutral-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="font-bold text-white">SAMPADA 2.0 PORTAL</span>
              </div>
              <span className="text-[10px] text-neutral-400">MAPIT / MPSEDC</span>
            </div>

            <div className="bg-neutral-800/80 p-3 rounded-lg border border-neutral-700 my-3">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 mb-1">
                <span>E-REGISTRY WORKFLOW VERIFICATION</span>
                <span className="text-emerald-400 font-bold">CERTIFIED</span>
              </div>
              <div className="w-full bg-neutral-700 h-2 rounded-full overflow-hidden my-2">
                <div className="bg-neutral-300 h-full w-[85%]" />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-300">
                <span>Deed Verification: Approved</span>
                <span>Stamp Duty: Cleared</span>
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="text-[9px] text-neutral-400 tracking-wider">COMPLIANCE & PERFORMANCE</div>
              <div className="bg-neutral-950 p-2 rounded border border-neutral-800 text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">RBAC Architecture:</span>
                  <span className="text-white">Strict Gov Compliance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Hibernate 5.x Tuning:</span>
                  <span className="text-white">25-30% Faster API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">React Client Optimization:</span>
                  <span className="text-emerald-400 font-bold">40% Page Load Cut</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[9px] text-neutral-400 flex justify-between">
              <span>PLATFORM: Java 11 / Spring Boot 2.x</span>
              <span>VOLUME: Millions / Month</span>
            </div>
          </div>
        );

      case "uidai-aadhaar":
        return (
          <div className="h-full w-full bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-neutral-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white">UIDAI AUA/ASA GATEWAY</span>
              </div>
              <span className="text-[10px] text-neutral-400">ISO/IEC 27001</span>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 my-auto space-y-2 text-[10px]">
              <div className="flex justify-between">
                <span className="text-neutral-400">PID Block Encryption:</span>
                <span className="text-white">RSA-2048 + AES-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Auth Modality:</span>
                <span className="text-white">Biometric &amp; OTP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Gateway Status:</span>
                <span className="text-emerald-400 font-bold">200 OK (VERIFIED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Security Engine:</span>
                <span className="text-neutral-300">Spring Security Handshake</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[9px] text-neutral-400 flex justify-between">
              <span>STATUTORY COMPLIANCE: UIDAI Mandate</span>
              <span>INTEGRATION: REST / Java</span>
            </div>
          </div>
        );

      case "gov-platforms":
        return (
          <div className="h-full w-full bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-neutral-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="font-bold text-white">STATE GOV PLATFORMS</span>
              <span className="text-[10px] text-neutral-400">4 INTEGRATED SYSTEMS</span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-auto">
              {[
                { name: "PRAYAS", desc: "Citizen Grievance Redressal" },
                { name: "SANKALP", desc: "Scheme Implementation" },
                { name: "ANUBANDH", desc: "Contract Governance" },
                { name: "SAMPARK", desc: "Inter-Agency Comms" },
              ].map((sys, idx) => (
                <div key={idx} className="bg-neutral-800 p-2.5 rounded border border-neutral-700 text-[10px]">
                  <div className="font-bold text-white">{sys.name}</div>
                  <div className="text-[9px] text-neutral-400 mt-1">{sys.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[9px] text-neutral-400 flex justify-between">
              <span>STACK: Java / Spring / PostgreSQL</span>
              <span>ARCHITECTURE: Multi-tier</span>
            </div>
          </div>
        );

      default:
        // Wikimedia Data Pipelines
        return (
          <div className="h-full w-full bg-neutral-900 text-neutral-100 p-5 rounded-2xl flex flex-col justify-between font-mono text-xs border border-neutral-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-white">WIKIMEDIA PIPELINES</span>
              </div>
              <span className="text-[10px] text-neutral-400">NiFi + Kafka Stream</span>
            </div>

            <div className="my-auto space-y-3">
              <div className="flex items-center justify-between text-[10px] text-neutral-300">
                <span>Ingest: Apache NiFi</span>
                <span>→</span>
                <span>Bus: Apache Kafka</span>
                <span>→</span>
                <span>DB: SQL / NoSQL</span>
              </div>
              <div className="bg-neutral-800 p-3 rounded border border-neutral-700 space-y-2 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Processing Time Reduction:</span>
                  <span className="text-emerald-400 font-bold">-50% via NiFi Flows</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">System Scalability:</span>
                  <span className="text-white font-bold">2× via Microservices</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Query Performance:</span>
                  <span className="text-white">+30% via Indexing</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[9px] text-neutral-400 flex justify-between">
              <span>THROUGHPUT: High-Volume Stream</span>
              <span>EVENT-DRIVEN: 100% Asynchronous</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-spacing relative bg-[var(--paper)] border-t border-[var(--line)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-12 ${isInView ? "rv is-in" : "rv"}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
            03 — Selected Work
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.045em] leading-[1.0] text-[var(--ink)]">
            High-scale distributed systems.
            <span className="font-serif-italic font-normal text-[var(--mute)] ml-3">
              Work.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[var(--mute)] font-mono max-w-xl">
            Architected enterprise solutions handling tens of millions of transactions with strict security and uptime.
          </p>
        </div>

        {/* Accordion Gallery: Side-by-side on desktop, vertical on mobile */}
        <div
          className="flex flex-col lg:flex-row gap-4 items-stretch w-full"
          style={{ minHeight: "clamp(520px, 78svh, 640px)" }}
        >
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                tabIndex={0}
                role="region"
                aria-label={`Project: ${project.title}`}
                onClick={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                className={`paper-card relative overflow-hidden transition-all duration-500 ease-[var(--ease)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] ${
                  isOpen
                    ? "lg:flex-[8] p-6 sm:p-8"
                    : "lg:flex-[1] p-5 lg:p-4 hover:border-neutral-400"
                }`}
              >
                {/* Slim spine view when closed */}
                {!isOpen && (
                  <div className="h-full flex flex-row lg:flex-col justify-between items-center select-none py-2">
                    <div className="font-mono text-xs font-bold text-[var(--mute)]">
                      {project.index}
                    </div>

                    <div className="font-display font-bold text-base lg:text-lg text-[var(--ink)] lg:[writing-mode:vertical-rl] lg:rotate-180 tracking-tight my-auto whitespace-nowrap">
                      {project.title}
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-sm text-[var(--ink)] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </div>
                )}

                {/* Open Panel View */}
                {isOpen && (
                  <div className="h-full flex flex-col justify-between animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
                      {/* Left: Project Description & Features */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 font-mono text-xs text-[var(--mute)] mb-2">
                            <span>{project.index}</span>
                            <span>—</span>
                            <span className="text-[var(--ink)] font-medium">
                              {project.kicker}
                            </span>
                          </div>

                          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mb-4 tracking-tight">
                            {project.title}
                          </h3>

                          <p className="text-sm text-[var(--ink-2)] leading-relaxed font-normal mb-6">
                            {project.description}
                          </p>

                          {/* 2-column feature list */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--ink-2)] border-t border-[var(--line)] pt-4 mb-6">
                            {project.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2">
                                <span className="text-[var(--ink)] font-bold">▪</span>
                                <span className="leading-snug">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Chips */}
                        <div className="border-t border-[var(--line)] pt-4">
                          <div className="text-[10px] font-mono text-[var(--mute)] uppercase tracking-wider mb-2">
                            Verified Tech Stack
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tName, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--paper)] text-xs font-mono text-[var(--ink)] border border-[var(--line)]"
                              >
                                <TechLogo name={tName} size={14} />
                                <span>{tName}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Illustrative Mini-UI built in pure CSS/JSX */}
                      <div className="relative flex flex-col justify-between h-full min-h-[300px]">
                        <div className="flex-1 rounded-2xl overflow-hidden relative">
                          {renderMiniUI(project)}
                        </div>
                        <div className="mt-2 text-right">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--mute)]">
                            Illustrative UI — Grayscale Architecture Simulation
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
