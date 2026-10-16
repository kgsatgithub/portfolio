import React from "react";

export interface TechLogoProps {
  name: string;
  slug?: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

export const BRAND_MAP: Record<string, { src: string; glow: string; label: string }> = {
  java: { src: "/logos/java.svg", glow: "rgba(231, 111, 0, 0.22)", label: "Java" },
  spring: { src: "/logos/spring.svg", glow: "rgba(109, 179, 63, 0.22)", label: "Spring Boot" },
  apachekafka: { src: "/logos/apachekafka.svg", glow: "rgba(35, 31, 32, 0.18)", label: "Apache Kafka" },
  apachenifi: { src: "/logos/apachenifi.svg", glow: "rgba(114, 158, 206, 0.22)", label: "Apache NiFi" },
  react: { src: "/logos/react.svg", glow: "rgba(97, 218, 251, 0.25)", label: "React" },
  javascript: { src: "/logos/javascript.svg", glow: "rgba(247, 223, 30, 0.22)", label: "JavaScript" },
  mysql: { src: "/logos/mysql.svg", glow: "rgba(0, 117, 143, 0.22)", label: "MySQL" },
  postgresql: { src: "/logos/postgresql.svg", glow: "rgba(51, 103, 145, 0.22)", label: "PostgreSQL" },
  oracle: { src: "/logos/oracle.svg", glow: "rgba(248, 0, 0, 0.20)", label: "Oracle" },
  arangodb: { src: "/logos/arangodb.svg", glow: "rgba(223, 48, 40, 0.20)", label: "ArangoDB" },
  amazonwebservices: { src: "/logos/amazonwebservices.svg", glow: "rgba(255, 153, 0, 0.22)", label: "AWS" },
  kubernetes: { src: "/logos/kubernetes.svg", glow: "rgba(50, 108, 229, 0.22)", label: "Kubernetes" },
  docker: { src: "/logos/docker.svg", glow: "rgba(36, 150, 237, 0.22)", label: "Docker" },
  rancher: { src: "/logos/rancher.svg", glow: "rgba(0, 117, 169, 0.22)", label: "Rancher" },
  jenkins: { src: "/logos/jenkins.svg", glow: "rgba(211, 56, 51, 0.22)", label: "Jenkins" },
  git: { src: "/logos/git.svg", glow: "rgba(240, 80, 50, 0.22)", label: "Git" },
  gitlab: { src: "/logos/gitlab.svg", glow: "rgba(226, 67, 41, 0.22)", label: "GitLab" },
  prometheus: { src: "/logos/prometheus.svg", glow: "rgba(228, 82, 42, 0.22)", label: "Prometheus" },
  grafana: { src: "/logos/grafana.svg", glow: "rgba(244, 104, 34, 0.22)", label: "Grafana" },
  elasticsearch: { src: "/logos/elasticsearch.svg", glow: "rgba(0, 85, 99, 0.22)", label: "Elasticsearch" },
  openai: { src: "/logos/openai.svg", glow: "rgba(16, 163, 127, 0.22)", label: "OpenAI" },
  githubcopilot: { src: "/logos/githubcopilot.svg", glow: "rgba(0, 0, 0, 0.16)", label: "GitHub Copilot" },
  hibernate: { src: "/logos/hibernate.svg", glow: "rgba(89, 102, 109, 0.22)", label: "Hibernate" },
};

export function isBrand(nameOrSlug: string): boolean {
  const normalized = nameOrSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
  return !!BRAND_MAP[nameOrSlug] || !!BRAND_MAP[normalized];
}

export function getBrandKey(nameOrSlug?: string): string | undefined {
  if (!nameOrSlug) return undefined;
  if (BRAND_MAP[nameOrSlug]) return nameOrSlug;
  const normalized = nameOrSlug.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (BRAND_MAP[normalized]) return normalized;
  // Specific lookups
  if (normalized.includes("java")) return "java";
  if (normalized.includes("spring")) return "spring";
  if (normalized.includes("kafka")) return "apachekafka";
  if (normalized.includes("nifi")) return "apachenifi";
  if (normalized.includes("aws")) return "amazonwebservices";
  if (normalized.includes("k8") || normalized.includes("kuber")) return "kubernetes";
  if (normalized.includes("copilot")) return "githubcopilot";
  if (normalized.includes("codex") || normalized.includes("openai")) return "openai";
  if (normalized.includes("elastic") || normalized.includes("elk")) return "elasticsearch";
  return undefined;
}

export const CONCEPT_MAP: Record<string, React.FC<{ size?: number }>> = {
  "Microservices": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1.5" />
      <rect x="16" y="2" width="6" height="6" rx="1.5" />
      <rect x="9" y="16" width="6" height="6" rx="1.5" />
      <path d="M5 8v4a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2V8m-7 8v-2" />
    </svg>
  ),
  "Distributed Systems": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="6" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="20" cy="18" r="2" />
      <path d="M5.7 7.3 9.6 10.4m4.8 0 3.9-3.1M5.7 16.7l3.9-3.1m4.8 0 3.9 3.1" />
    </svg>
  ),
  "Event-Driven Architecture": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  "Cloud-Native": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <circle cx="12" cy="13" r="1.5" />
    </svg>
  ),
  "Asynchronous Processing": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M4 12a8 8 0 0 1 3-6.2" />
    </svg>
  ),
  "REST APIs": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  "OAuth2": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4m0 4h.01" />
    </svg>
  ),
  "JWT": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="16" cy="12" r="1.5" />
    </svg>
  ),
  "RBAC": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <rect x="16" y="11" width="6" height="8" rx="1" />
      <path d="M18 11V9a2 2 0 1 1 4 0v2" />
    </svg>
  ),
  "Secure API Design": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  "Aadhaar Authentication": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 0-7.07 17.07l.71.71A10 10 0 1 0 12 2Z" />
      <path d="M12 7v5l3 3" />
      <path d="M8 12a4 4 0 0 1 8 0" />
    </svg>
  ),
  "CI/CD": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 12a6 6 0 0 0-6-6 6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6Z" />
      <path d="M22 12a10 10 0 0 0-10-10A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10Z" />
    </svg>
  ),
  "Cursor AI": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 3 7 18 3-7 7-3L3 3z" />
    </svg>
  ),
  "Prompt Engineering": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
    </svg>
  ),
  "Code Review & Refactoring": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7M6 9v12" />
    </svg>
  ),
  "Agentic Engineering": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4m-4 5h.01m7.99 0h.01" />
    </svg>
  ),
  "JMS": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  ),
  "Relational DBs": ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
};

export const TechLogo: React.FC<TechLogoProps> = ({
  name,
  slug,
  size = 28,
  className = "",
  showGlow = false,
}) => {
  const brandKey = getBrandKey(slug || name);
  const brand = brandKey ? BRAND_MAP[brandKey] : null;

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.glow }}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.src}
          alt={`${name} official brand logo`}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Check CONCEPT_MAP
  const ConceptComponent = CONCEPT_MAP[name];
  if (ConceptComponent) {
    return (
      <div
        className={`relative inline-flex items-center justify-center text-[var(--ink-2)] ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-lg pointer-events-none opacity-20"
            style={{ backgroundColor: "rgba(13, 13, 13, 0.15)" }}
          />
        )}
        <ConceptComponent size={size} />
      </div>
    );
  }

  // Fallback geometric glyph
  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-bold text-xs rounded border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] ${className}`}
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
