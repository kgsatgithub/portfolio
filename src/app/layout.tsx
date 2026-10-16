import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "../fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kumargauravsharma.dev"),
  title: "Kumar Gaurav Sharma — Lead Software Engineer",
  description: "Lead Software Engineer with 11+ years of experience building secure, high-performance distributed systems in FinTech and GovTech. Expert in Java 21, Spring Boot, microservices, Kafka, and event-driven architecture.",
  keywords: ["Kumar Gaurav Sharma", "Lead Software Engineer", "Distributed Systems", "Java 21", "Spring Boot", "Kafka", "FinTech", "GovTech"],
  authors: [{ name: "Kumar Gaurav Sharma" }],
  openGraph: {
    title: "Kumar Gaurav Sharma — Lead Software Engineer",
    description: "Lead Software Engineer with 11+ years of experience building secure, high-performance distributed systems in FinTech and GovTech.",
    url: "https://kumargauravsharma.dev",
    siteName: "Kumar Gaurav Sharma Portfolio",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Kumar Gaurav Sharma — Lead Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumar Gaurav Sharma — Lead Software Engineer",
    description: "Distributed Systems, Java 21, Spring Boot, Kafka, 10M+ daily transactions.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/portrait-bust.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--ink)] selection:text-[var(--paper)]">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
