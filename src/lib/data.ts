export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  fullHeadline: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  quote: string;
  github?: string;
  linkedin: string;
  resumePdf: string;
  dept: string;
  idNo: string;
  validTill: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Skill {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: "Languages" | "Frameworks" | "Architecture" | "Messaging & DB" | "Security" | "DevOps & Cloud" | "AI Engineering";
  isBrand: boolean;
  brandSlug?: string;
  projects: string[];
  description?: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
}

export interface Certification {
  index: string;
  title: string;
  issuer: string;
  year: string;
}

export type TimelineType = "experience" | "education";

export interface TimelineEntry {
  id: string;
  type: TimelineType;
  period: string;
  roleOrDegree: string;
  organization: string;
  location?: string;
  score?: string;
  highlights: string[];
  tech?: string[];
}

export interface Achievement {
  index: string;
  number: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  platform: string;
  platformBrand?: string;
}

export const PROFILE: Profile = {
  name: "Kumar Gaurav Sharma",
  firstName: "KUMAR",
  lastName: "SHARMA",
  initials: "KS",
  role: "Lead Software Engineer",
  fullHeadline: "Lead Software Engineer | 11+ Years | Java 21, Spring Boot, Microservices, Kafka, SQL | Distributed Systems | Fintech, Govtech",
  email: "kumargauravsharma889@gmail.com",
  phone: "+91-9111735135",
  phoneHref: "tel:+919111735135",
  location: "Bhopal, India",
  resumeSummary: "Lead Software Engineer with 11+ years of experience building secure, high-performance distributed systems in FinTech and GovTech. Expert in Java 21, Spring Boot, Hibernate, Spring Security, microservices, Kafka, and event-driven architecture, including platforms processing 10M+ daily transactions. Proven record of improving API performance, throughput, and reliability, with strong technical leadership, design review, and mentoring experience. Also experienced in AI-assisted software modernization and agentic engineering using OpenAI Codex and GitHub Copilot.",
  quote: "Specializing in high-throughput distributed architectures, secure transaction pipelines, and AI-assisted enterprise modernization.",
  linkedin: "https://linkedin.com/in/kumargauravsharma889",
  resumePdf: "/resume.pdf",
  dept: "Distributed Systems & Architecture",
  idNo: "KGS-91117",
  validTill: "2013",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Work", href: "#work" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "achievements", label: "Achievements", href: "#achievements" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS: { name: Skill["family"]; count: number }[] = [
  { name: "Languages", count: 5 },
  { name: "Frameworks", count: 7 },
  { name: "Architecture", count: 5 },
  { name: "Messaging & DB", count: 8 },
  { name: "Security", count: 5 },
  { name: "DevOps & Cloud", count: 12 },
  { name: "AI Engineering", count: 6 },
];

export const SKILLS: Skill[] = [
  // Languages
  { atomicNumber: 1, symbol: "J21", name: "Java 21", family: "Languages", isBrand: true, brandSlug: "java", projects: ["GCash Super App"] },
  { atomicNumber: 2, symbol: "J11", name: "Java 11", family: "Languages", isBrand: true, brandSlug: "java", projects: ["SAMPADA 2.0"] },
  { atomicNumber: 3, symbol: "J8", name: "Java 8", family: "Languages", isBrand: true, brandSlug: "java", projects: ["Awzpact Enterprise Apps", "UIDAI Systems"] },
  { atomicNumber: 4, symbol: "Js", name: "JavaScript", family: "Languages", isBrand: true, brandSlug: "javascript", projects: ["SAMPADA 2.0", "Enterprise Portals"] },
  { atomicNumber: 5, symbol: "Sq", name: "SQL", family: "Languages", isBrand: true, brandSlug: "mysql", projects: ["GCash Super App", "SAMPADA 2.0", "Wikimedia Pipelines"] },

  // Frameworks
  { atomicNumber: 6, symbol: "Sb", name: "Spring Boot", family: "Frameworks", isBrand: true, brandSlug: "spring", projects: ["GCash Super App", "SAMPADA 2.0", "Awzpact Apps"] },
  { atomicNumber: 7, symbol: "Sf", name: "Spring Framework", family: "Frameworks", isBrand: true, brandSlug: "spring", projects: ["Government Platforms"] },
  { atomicNumber: 8, symbol: "Ss", name: "Spring Security", family: "Frameworks", isBrand: true, brandSlug: "spring", projects: ["GCash Super App", "SAMPADA 2.0", "UIDAI Systems"] },
  { atomicNumber: 9, symbol: "Hb", name: "Hibernate/JPA", family: "Frameworks", isBrand: true, brandSlug: "hibernate", projects: ["GCash Super App", "SAMPADA 2.0"] },
  { atomicNumber: 10, symbol: "Ra", name: "REST APIs", family: "Frameworks", isBrand: false, projects: ["GCash Super App", "UIDAI Systems", "Government Platforms"] },
  { atomicNumber: 11, symbol: "J2", name: "J2EE", family: "Frameworks", isBrand: true, brandSlug: "java", projects: ["TwoAllons Infotech Enterprise Apps"] },
  { atomicNumber: 12, symbol: "Rc", name: "React", family: "Frameworks", isBrand: true, brandSlug: "react", projects: ["SAMPADA 2.0", "Awzpact Apps"] },

  // Architecture
  { atomicNumber: 13, symbol: "Ms", name: "Microservices", family: "Architecture", isBrand: false, projects: ["GCash Super App", "Awzpact Apps"] },
  { atomicNumber: 14, symbol: "Ds", name: "Distributed Systems", family: "Architecture", isBrand: false, projects: ["GCash Super App", "Volvo Application"] },
  { atomicNumber: 15, symbol: "Ed", name: "Event-Driven Architecture", family: "Architecture", isBrand: false, projects: ["GCash Super App", "Wikimedia Pipelines"] },
  { atomicNumber: 16, symbol: "Cn", name: "Cloud-Native", family: "Architecture", isBrand: false, projects: ["GCash Super App", "Volvo Application"] },
  { atomicNumber: 17, symbol: "Ap", name: "Asynchronous Processing", family: "Architecture", isBrand: false, projects: ["GCash Super App", "SAMPADA 2.0"] },

  // Messaging & Databases
  { atomicNumber: 18, symbol: "Kf", name: "Apache Kafka", family: "Messaging & DB", isBrand: true, brandSlug: "apachekafka", projects: ["GCash Super App", "Awzpact Apps", "Wikimedia Pipelines"] },
  { atomicNumber: 19, symbol: "Jm", name: "JMS", family: "Messaging & DB", isBrand: false, projects: ["TwoAllons Infotech Apps"] },
  { atomicNumber: 20, symbol: "Nf", name: "Apache NiFi", family: "Messaging & DB", isBrand: true, brandSlug: "apachenifi", projects: ["Awzpact Apps", "Wikimedia Pipelines"] },
  { atomicNumber: 21, symbol: "My", name: "MySQL", family: "Messaging & DB", isBrand: true, brandSlug: "mysql", projects: ["GCash Super App", "SAMPADA 2.0"] },
  { atomicNumber: 22, symbol: "Or", name: "Oracle", family: "Messaging & DB", isBrand: true, brandSlug: "oracle", projects: ["SAMPADA 2.0", "Government Platforms"] },
  { atomicNumber: 23, symbol: "Pg", name: "PostgreSQL", family: "Messaging & DB", isBrand: true, brandSlug: "postgresql", projects: ["Government Platforms"] },
  { atomicNumber: 24, symbol: "Ar", name: "Arango DB", family: "Messaging & DB", isBrand: true, brandSlug: "arangodb", projects: ["Enterprise Platforms"] },
  { atomicNumber: 25, symbol: "Db", name: "Relational DBs", family: "Messaging & DB", isBrand: false, projects: ["TwoAllons Infotech Apps"] },

  // Security
  { atomicNumber: 26, symbol: "O2", name: "OAuth2", family: "Security", isBrand: false, projects: ["GCash Super App", "Secure Financial Transactions"] },
  { atomicNumber: 27, symbol: "Jw", name: "JWT", family: "Security", isBrand: false, projects: ["GCash Super App", "API Access Security"] },
  { atomicNumber: 28, symbol: "Rb", name: "RBAC", family: "Security", isBrand: false, projects: ["SAMPADA 2.0", "Government Compliance"] },
  { atomicNumber: 29, symbol: "Sa", name: "Secure API Design", family: "Security", isBrand: false, projects: ["GCash Super App", "UIDAI Systems"] },
  { atomicNumber: 30, symbol: "Aa", name: "Aadhaar Authentication", family: "Security", isBrand: false, projects: ["UIDAI Aadhaar AUA/ASA", "Awzpact Apps"] },

  // DevOps & Cloud
  { atomicNumber: 31, symbol: "Aw", name: "AWS", family: "DevOps & Cloud", isBrand: true, brandSlug: "amazonwebservices", projects: ["Cloud-Native Deployments"] },
  { atomicNumber: 32, symbol: "K8", name: "Kubernetes", family: "DevOps & Cloud", isBrand: true, brandSlug: "kubernetes", projects: ["GCash Super App"] },
  { atomicNumber: 33, symbol: "Dk", name: "Docker", family: "DevOps & Cloud", isBrand: true, brandSlug: "docker", projects: ["GCash Super App", "Containerization"] },
  { atomicNumber: 34, symbol: "Rn", name: "Rancher", family: "DevOps & Cloud", isBrand: true, brandSlug: "rancher", projects: ["Cluster Management"] },
  { atomicNumber: 35, symbol: "Jk", name: "Jenkins", family: "DevOps & Cloud", isBrand: true, brandSlug: "jenkins", projects: ["CI/CD Pipelines"] },
  { atomicNumber: 36, symbol: "Gt", name: "Git", family: "DevOps & Cloud", isBrand: true, brandSlug: "git", projects: ["Version Control"] },
  { atomicNumber: 37, symbol: "Gl", name: "GitLab", family: "DevOps & Cloud", isBrand: true, brandSlug: "gitlab", projects: ["CI/CD Workflows"] },
  { atomicNumber: 38, symbol: "Ci", name: "CI/CD", family: "DevOps & Cloud", isBrand: false, projects: ["Release Automation"] },
  { atomicNumber: 39, symbol: "Pm", name: "Prometheus", family: "DevOps & Cloud", isBrand: true, brandSlug: "prometheus", projects: ["GCash Super App Monitoring"] },
  { atomicNumber: 40, symbol: "Gf", name: "Grafana", family: "DevOps & Cloud", isBrand: true, brandSlug: "grafana", projects: ["GCash Super App Metrics"] },
  { atomicNumber: 41, symbol: "Ek", name: "ELK Stack", family: "DevOps & Cloud", isBrand: true, brandSlug: "elasticsearch", projects: ["Log Aggregation & Analysis"] },

  // AI Engineering
  { atomicNumber: 42, symbol: "Ox", name: "OpenAI Codex", family: "AI Engineering", isBrand: true, brandSlug: "openai", projects: ["Volvo AI Agents", "Modernization"] },
  { atomicNumber: 43, symbol: "Cp", name: "GitHub Copilot", family: "AI Engineering", isBrand: true, brandSlug: "githubcopilot", projects: ["Volvo Application Delivery"] },
  { atomicNumber: 44, symbol: "Cu", name: "Cursor AI", family: "AI Engineering", isBrand: false, projects: ["AI-Assisted Engineering"] },
  { atomicNumber: 45, symbol: "Pe", name: "Prompt Engineering", family: "AI Engineering", isBrand: false, projects: ["AI-Driven Workflows"] },
  { atomicNumber: 46, symbol: "Cr", name: "Code Review & Refactoring", family: "AI Engineering", isBrand: false, projects: ["Volvo & GCash Architecture"] },
  { atomicNumber: 47, symbol: "Ag", name: "Agentic Engineering", family: "AI Engineering", isBrand: false, projects: ["Volvo Task-Specific AI Agents"] },
];

export const PROJECTS: Project[] = [
  {
    id: "gcash-super-app",
    index: "01",
    title: "GCash Super App",
    kicker: "FinTech · 94M+ Users · 10M+ Daily Txs",
    description: "Designed and scaled high-volume distributed microservices using Java 21, Spring Boot 3.x, Hibernate 6.x, and Spring Security 6 for a leading financial super-app processing over 10 million transactions daily.",
    features: [
      "Processes 10M+ daily financial transactions for 94M+ users",
      "Doubled system throughput (2×) with Kafka event-driven streaming",
      "Reduced API latency by 30–40% via query optimization & caching",
      "OAuth2 & JWT security architecture for high-value financial transactions",
      "Boosted release efficiency by 50% via Kubernetes and Docker",
      "Cut production incidents by 35% through Prometheus and Grafana monitoring"
    ],
    tech: ["Java 21", "Spring Boot", "Kafka", "Hibernate", "Spring Security", "Kubernetes", "Docker", "Prometheus", "Grafana"]
  },
  {
    id: "sampada-2",
    index: "02",
    title: "SAMPADA 2.0",
    kicker: "GovTech · State-wide E-Registry",
    description: "Developed SAMPADA 2.0, a mission-critical government e-registry and e-stamping platform for MAPIT / MPSEDC, supporting millions of transactions monthly across administrative departments.",
    features: [
      "State-wide digital e-registry and e-stamping platform",
      "Supports millions of high-value legal property transactions monthly",
      "Improved API performance by 25–30% and cut database load by 20%",
      "Engineered comprehensive RBAC security architecture for regulatory compliance",
      "Built modern React modules that cut client-side page load time by 40%"
    ],
    tech: ["Java 11", "Spring Boot", "Hibernate", "Spring Security", "React", "MySQL", "Oracle", "RBAC"]
  },
  {
    id: "uidai-aadhaar",
    index: "03",
    title: "UIDAI Aadhaar Systems",
    kicker: "GovTech · Identity & Authentication",
    description: "Architected enterprise Aadhaar authentication (AUA/ASA) and e-KYC integration systems with Spring Security, facilitating secure biometric and OTP-based identity verification with full statutory compliance.",
    features: [
      "Aadhaar authentication (AUA/ASA) and e-KYC pipeline implementation",
      "Spring Security layer guaranteeing cryptographic signing and non-repudiation",
      "Seamless integration with statutory enterprise onboarding pipelines",
      "High reliability and sub-second verification response times"
    ],
    tech: ["Java 8", "Spring Boot", "Spring Security", "REST APIs", "OAuth2", "Cryptography"]
  },
  {
    id: "gov-platforms",
    index: "04",
    title: "PRAYAS, SANKALP, ANUBANDH, SAMPARK",
    kicker: "GovTech · Digital Public Infrastructure",
    description: "Suite of state-level digital governance and public service platforms delivering transparent citizen grievance redressal, contract administration, and inter-agency coordination.",
    features: [
      "Covers multiple state governance systems: PRAYAS, SANKALP, ANUBANDH, SAMPARK",
      "Scalable relational data pipelines with complex workflow approvals",
      "Robust audit-trail tracking and government regulatory compliance",
      "Engineered for maximum reliability and continuous uptime"
    ],
    tech: ["Java", "Spring Framework", "J2EE", "PostgreSQL", "Oracle", "REST APIs"]
  },
  {
    id: "wikimedia-pipelines",
    index: "05",
    title: "Wikimedia Data Pipelines",
    kicker: "Data Engineering · Distributed Streaming",
    description: "Engineered scalable data processing and extraction pipelines powered by Apache NiFi and Apache Kafka to streamline Wikimedia knowledge bases and high-volume data streams.",
    features: [
      "Streaming data ingestion architecture using Apache NiFi and Apache Kafka",
      "Cut end-to-end data processing time by 50% via automated flow pipelines",
      "Doubled system scalability (2×) via decoupled microservices",
      "Improved query performance by 30% through targeted indexing"
    ],
    tech: ["Apache NiFi", "Apache Kafka", "Java", "SQL", "Microservices"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { index: "01", title: "GenAI Mastermind", issuer: "Outskills", year: "2025" },
  { index: "02", title: "CompTIA Security+ SY0-601", issuer: "CompTIA", year: "2023" },
  { index: "03", title: "UIDAI Aadhaar API Integration", issuer: "UIDAI", year: "2019" },
  { index: "04", title: "J2SE, J2EE, SQL, DBA", issuer: "NIIT", year: "2013" },
  { index: "05", title: "DB2 Certification", issuer: "IBM Centre of Excellence", year: "2012" },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: "exp-volvo",
    type: "experience",
    period: "Aug 2026 – Present",
    roleOrDegree: "Lead Software Engineer",
    organization: "Volvo (Ascendion)",
    highlights: [
      "Contribute to forward engineering and modernization of a large-scale Volvo application using AI-assisted and agentic engineering approaches.",
      "Design and develop task-specific AI agents with OpenAI Codex for development, documentation, and modernization; apply GitHub Copilot and prompt-driven workflows to accelerate delivery."
    ],
    tech: ["OpenAI Codex", "GitHub Copilot", "Java 21", "Agentic Workflows"]
  },
  {
    id: "exp-gcash",
    type: "experience",
    period: "Apr 2022 – Jul 2026",
    roleOrDegree: "Lead Software Engineer",
    organization: "GCash (Mynt / Ascendion)",
    highlights: [
      "Designed and scaled microservices with Java 21, Spring Boot 3.x, Hibernate 6.x, and Spring Security 6 for systems processing 10M+ daily transactions.",
      "Reduced API latency by 30–40% through query optimization, caching, and asynchronous processing.",
      "Doubled system throughput (2×) by implementing Kafka-based event-driven architecture.",
      "Implemented OAuth2/JWT security for high-value financial transactions and secure API access.",
      "Improved release efficiency by 50% with Kubernetes and Docker; cut production incidents by 35% using Prometheus and Grafana.",
      "Led design reviews, engineering mentorship, and cross-team architecture decisions."
    ],
    tech: ["Java 21", "Spring Boot 3.x", "Kafka", "Hibernate 6.x", "Spring Security 6", "Kubernetes", "Docker", "Prometheus", "Grafana"]
  },
  {
    id: "exp-mapit",
    type: "experience",
    period: "Jun 2021 – Apr 2022",
    roleOrDegree: "Java Developer",
    organization: "MAPIT / MPSEDC (Primeone Workforce)",
    highlights: [
      "Developed SAMPADA 2.0, a government e-registry platform, using Java 8/11, Spring Boot 2.x, Hibernate 5.x, and Spring Security 5, supporting millions of transactions monthly.",
      "Improved API performance by 25–30% and reduced database load by 20% via Hibernate tuning, indexing, and caching.",
      "Designed RBAC security architecture for government compliance; built React modules that cut page load time by 40%."
    ],
    tech: ["Java 11", "Spring Boot 2.x", "Hibernate 5.x", "Spring Security 5", "React", "MySQL", "Oracle", "RBAC"]
  },
  {
    id: "exp-awzpact",
    type: "experience",
    period: "May 2017 – May 2021",
    roleOrDegree: "Java Developer",
    organization: "Awzpact Technologies",
    highlights: [
      "Built full-stack enterprise applications with Java 8, Spring Boot, Hibernate, Spring Security, and React.",
      "Implemented Aadhaar authentication (AUA/ASA) with Spring Security.",
      "Doubled scalability (2×) via microservices and Kafka; cut data processing time by 50% with Apache NiFi; improved query performance by 30%."
    ],
    tech: ["Java 8", "Spring Boot", "Kafka", "Apache NiFi", "Hibernate", "Spring Security", "React"]
  },
  {
    id: "edu-mtech",
    type: "education",
    period: "2015 – 2017",
    roleOrDegree: "M.Tech, Computer Science",
    organization: "RGPV, Bhopal",
    score: "77.50%",
    highlights: [
      "Advanced coursework and research in Distributed Systems, Computer Science, and Data Architectures.",
      "Graduated with Distinction (77.50%)."
    ]
  },
  {
    id: "exp-twoallons",
    type: "experience",
    period: "Oct 2014 – May 2017",
    roleOrDegree: "Software Developer",
    organization: "TwoAllons Infotech",
    highlights: [
      "Developed enterprise web and desktop applications using Java, J2EE, Servlets, JSP, JMS, and relational databases.",
      "Improved application processing efficiency by 20%."
    ],
    tech: ["Java", "J2EE", "Servlets", "JSP", "JMS", "SQL"]
  },
  {
    id: "exp-niit",
    type: "experience",
    period: "Apr 2013 – Oct 2014",
    roleOrDegree: "Technical Trainer",
    organization: "NIIT",
    highlights: [
      "Delivered comprehensive technical training in Java, C, C++, Android, DBMS, and software engineering fundamentals to emerging software engineers."
    ],
    tech: ["Java", "C", "C++", "Android", "DBMS"]
  },
  {
    id: "edu-be",
    type: "education",
    period: "2008 – 2012",
    roleOrDegree: "B.E., Computer Science",
    organization: "RGPV, Bhopal",
    score: "73.50%",
    highlights: [
      "Foundational degree in Computer Science and Engineering principles.",
      "Graduated with First Class Honours (73.50%)."
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    index: "01 / 06",
    number: 11,
    suffix: "+",
    label: "Years of Experience",
    caption: "Distributed Systems & FinTech",
    detail: "Leading architecture, mentoring, and AI modernization",
    platform: "Java Ecosystem",
    platformBrand: "java"
  },
  {
    index: "02 / 06",
    number: 10,
    suffix: "M+",
    label: "Daily Transactions",
    caption: "GCash Financial Scale",
    detail: "High-concurrency microservices processing 10M+ daily events",
    platform: "GCash (Mynt)",
    platformBrand: "gcash"
  },
  {
    index: "03 / 06",
    number: 94,
    suffix: "M+",
    label: "Registered Users",
    caption: "Super App Ecosystem",
    detail: "Payments, investments, campaigns scale on GCash",
    platform: "FinTech Scale",
    platformBrand: "users"
  },
  {
    index: "04 / 06",
    number: 2,
    suffix: "×",
    label: "System Throughput",
    caption: "Kafka Event-Driven",
    detail: "Doubled system throughput via Kafka-based event-driven streaming",
    platform: "Apache Kafka",
    platformBrand: "apachekafka"
  },
  {
    index: "05 / 06",
    number: 50,
    suffix: "%",
    label: "Release Efficiency Boost",
    caption: "Cloud-Native Infrastructure",
    detail: "Kubernetes & Docker release acceleration; 35% incident reduction",
    platform: "Kubernetes",
    platformBrand: "kubernetes"
  },
  {
    index: "06 / 06",
    number: 40,
    suffix: "%",
    label: "Page Load Reduction",
    caption: "Frontend Optimization",
    detail: "Optimized React modules and 30-40% API latency cut",
    platform: "React Engine",
    platformBrand: "react"
  }
];
