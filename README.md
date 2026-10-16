# Kumar Gaurav Sharma — Personal Portfolio

A clean, light, smooth, and premium personal portfolio website engineered for **Kumar Gaurav Sharma**, Lead Software Engineer (11+ Years of Experience in FinTech & GovTech distributed systems).

The design philosophy follows an Awwwards "Site of the Day" aesthetic in a restrained palette of pure white, ink black, and warm off-white (`#f4f2ee`), with official brand colors preserved exclusively for technology badges and platform logos.

---

## Quick Start & Run Commands

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Production build
npm run build

# 4. Start production server
npm run start
```

The site will be running at `http://localhost:3000`.

---

## Sections Architecture

The portfolio follows a single continuous scroll surface without jarring page curtains or transition breaks:

| # | Section | Component | Description & Key Interaction |
|---|---|---|---|
| **0.0** | **Navigation** | `src/components/Navigation.tsx` | Fixed frosted glass pill with sliding ink indicator, 2px top scroll progress bar, 360° spinning KS mark, and mobile full-screen clip-path menu. |
| **0.1** | **Hero** | `src/components/hero/Hero.tsx` | Ultra-clean video hero with `mix-blend-mode: multiply` blending into page canvas, seamless 10s audio/video loop, giant outlined ghost word, automatic sound pause on scroll, and pinging audio unlock button. |
| **0.2** | **About** | `src/components/sections/About.tsx` | 3-column layout featuring an interactive hanging lanyard ID card with a damped pendulum physics swing and 3D flip on hover/tap/keyboard. |
| **0.3** | **Skills** | `src/components/sections/Skills.tsx` | "Periodic Table of My Stack" in an 8-column elemental grid with category chips, diagonal wave reveal, and sticky 320px Inspector panel with 150px brand logos. |
| **0.4** | **Work** | `src/components/sections/Work.tsx` | Expanding accordion gallery with responsive flex panels, 2-column feature breakdowns, verified tech chips, and pure CSS/JSX grayscale illustrative mini-UIs. |
| **0.5** | **Certifications**| `src/components/sections/Certifications.tsx` | White band layout with a sticky left header and interactive ink-flood rows that flood with ink from left to right on hover. |
| **0.6** | **Experience** | `src/components/sections/Experience.tsx` | Unified chronological path linking education (B.E., M.Tech) and career milestones with a scroll-drawn spine that illuminates stops, ending with a dashed "Next — Your team?" card. |
| **0.7** | **Achievements** | `src/components/sections/Achievements.tsx` | Viewport-pinned horizontal gallery with 72px brand logo tiles, easeOutQuart count-up counters, and dynamic card center-lift. |
| **0.8** | **Contact & Footer** | `src/components/sections/Contact.tsx` | Giant interactive hopping-letter headline, large underlined email with a live copy chip, rotating "say hello" badge, and clean footer credits. |

---

## Rebuilding the Hero Video Assets

The hero video pipeline is fully automated via `scripts/build-hero-assets.py`:

```bash
# Ensure Python 3.10+ with numpy and ffmpeg are installed
python scripts/build-hero-assets.py
```

### Pipeline Steps:
1. **Centering & Aspect Ratio Crop**: Crops the 1280×720 source tightly around the person head-to-toe (`576×720` at `x=352, y=0`) and scales to `768×960`.
2. **Background Whitening**: Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` so the off-white studio background becomes pure `#ffffff`, allowing `mix-blend-mode: multiply` to seamlessly blend into `--paper` (`#f4f2ee`).
3. **Seamless Video Cross-Fade**: Uses `ffmpeg xfade` to blend the last 0.5s of the video into the first 0.5s over an offset of 9.0s.
4. **Sample-Accurate Audio Cross-Fade in NumPy**: Extracts raw 48 kHz 32-bit float PCM audio, performs sample-accurate linear cross-fading of the last 24,000 samples into the first 24,000 samples, avoiding audio dropouts or click artifacts.
5. **Dual-Format Lightweight Export**:
   - `public/hero/hero.webm`: VP9 video with Opus audio at 80 kbps (~422 kB).
   - `public/hero/hero.mp4`: H.264 video with AAC audio at 96 kbps and `+faststart` (~626 kB).
6. **Bust & OG Still Generation**: Generates `public/portrait-bust.webp` (480×600) and `public/og.jpg` (1200×630).

---

## Tech Stack & Performance

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript.
- **Styling**: Tailwind CSS 4 with custom design tokens in `@layer base` and `@layer components`.
- **Smooth Scroll**: Lenis (`lenis`), disabled automatically when `prefers-reduced-motion` is active.
- **First Load JS**: **128 kB** (well within the 130 kB target).
- **Fonts**: Self-hosted locally with `next/font/local`:
  - `Inter Tight` (Variable)
  - `Instrument Serif` (Regular & Italic)
  - `JetBrains Mono` (Variable)

---

## Credits & Brand Logo Licenses

All brand logos in `public/logos/` are sourced under permissive licenses:
- **Devicon** (`https://devicon.dev`): MIT License. Copyright (c) 2015-present Devicon Authors.
- **Simple Icons** (`https://simpleicons.org`): CC0 1.0 Universal Public Domain Dedication.
- **Fonts**: Google Fonts / SIL Open Font License (OFL).

All trademarks, service marks, and trade names are the property of their respective owners.
