# Complete Deployment & Local Execution Guide

This document provides step-by-step instructions to publish this portfolio website publicly **100% for free**, compares the best hosting platforms, details exactly which files to copy/upload, and provides step-by-step instructions to manually run the application on any **Mac** or **Windows** machine.

---

## Table of Contents
1. [Platform Comparison: Which is Best & Why?](#1-platform-comparison-which-is-best--why)
2. [Recommended: Deploy to Vercel (100% Free, 3 Minutes)](#2-recommended-deploy-to-vercel-100-free-3-minutes)
3. [Alternative 1: Deploy to Render (Free Web Service)](#3-alternative-1-deploy-to-render-free-web-service)
4. [Alternative 2: Deploy to Google Cloud Run (Free Tier)](#4-alternative-2-deploy-to-google-cloud-run-free-tier)
5. [File Checklist: What to Copy Where](#5-file-checklist-what-to-copy-where)
6. [Manual Run Instructions for Any Windows or Mac System](#6-manual-run-instructions-for-any-windows-or-mac-system)

---

## 1. Platform Comparison: Which is Best & Why?

For a modern **Next.js 15 (App Router)** website with media streaming (`intro.mp4`, `hero.webm`), self-hosted fonts, and client-side interactions:

| Platform | Cost | Setup Complexity | Performance & Cold Starts | Recommendation |
|---|---|---|---|---|
| **Vercel** | **100% Free** (Hobby Plan) | **Zero config** (Connect GitHub & click Deploy) | **Instant, 0s cold start**; global Edge CDN caches video & fonts worldwide. | 🏆 **Best Choice (Recommended)** |
| **Render** | Free | Low (Connect GitHub, set build command) | Free tier **spins down to sleep** after 15 minutes of inactivity; 50-second delay for the first visitor. | Good backup, but cold starts hurt portfolio first impressions. |
| **Google Cloud Run** | Free tier (2M requests/mo free) | Moderate (Requires Dockerfile, GCP project, Cloud SDK, and credit card on file for billing setup) | Fast, auto-scales down to zero instances. | Excellent for enterprise, but requires more manual DevOps configuration. |
| **Cloudflare Pages / Netlify** | Free | Low-to-Moderate (Requires Next.js edge adapter for some App Router features) | Very fast Edge network. | Great alternative, but Vercel has native 1st-party Next.js support. |

### Verdict: Why You Should Choose Vercel
1. **Created by Next.js**: Vercel is built by the authors of Next.js. Every optimization in Next.js 15 works out of the box with zero custom configuration.
2. **Global CDN for Video & Fonts**: The hero video files (`hero.webm`, `hero.mp4`) and fonts (`.woff2`) are cached at edge servers worldwide, ensuring sub-50ms playback anywhere in the world.
3. **No Sleep / No Cold Starts**: Unlike Render, your portfolio stays awake 24/7.
4. **Free Custom Domain with Automated SSL**: You can link your own domain (e.g., `kumargauravsharma.dev` or `yourname.com`) for free with automated HTTPS renewal.

---

## 2. Recommended: Deploy to Vercel (100% Free, 3 Minutes)

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com) (create a free account if you don't have one).
2. Click the **+** icon in the top right corner → **New repository**.
3. Name your repository (e.g., `portfolio` or `kumar-gaurav-sharma-portfolio`).
4. Keep it **Public** (or **Private**, Vercel supports both). Do not check "Add a README" since we already have project files. Click **Create repository**.

### Step 2: Push Your Project to GitHub
Open your terminal (PowerShell on Windows or Terminal on Mac) in the project root folder:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all project files
git add .

# 3. Commit your code
git commit -m "Initial commit: Kumar Gaurav Sharma portfolio"

# 4. Set the main branch
git branch -M main

# 5. Link your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 6. Push the code
git push -u origin main
```

> **Note**: Thanks to the included `.gitignore` file, heavy temporary folders like `node_modules` and `.next` will automatically be excluded from your git repository.

### Step 3: Connect and Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and click **Sign Up** (choose **Continue with GitHub**).
2. On your Vercel Dashboard, click **Add New...** → **Project**.
3. Under **Import Git Repository**, find your portfolio repository and click **Import**.
4. In the configuration screen:
   - **Framework Preset**: Automatically detected as `Next.js`.
   - **Root Directory**: `./` (default).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `.next` (default).
   - **Install Command**: `npm install` (default).
5. Click **Deploy**.
6. In about 45–60 seconds, your site is deployed! Vercel will give you a public URL like:
   `https://kumar-gaurav-sharma-portfolio.vercel.app`

### Step 4 (Optional): Add Your Own Custom Domain
1. In your Vercel project dashboard, go to **Settings** → **Domains**.
2. Type your domain (e.g. `kumargauravsharma.dev`) and click **Add**.
3. Add the two DNS records (CNAME or A record) shown by Vercel in your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.).
4. SSL certificates are generated automatically within minutes at no cost.

---

## 3. Alternative 1: Deploy to Render (Free Web Service)

If you prefer to deploy on Render:

1. Sign up for a free account at [render.com](https://render.com) using your GitHub account.
2. Push your project to GitHub (following the steps in Section 2).
3. On your Render Dashboard, click **New +** → **Web Service**.
4. Select **Build and deploy from a Git repository** and connect your repository.
5. Configure the service:
   - **Name**: `kumar-portfolio`
   - **Region**: Choose the closest region (e.g., Singapore, Frankfurt, Oregon).
   - **Branch**: `main`
   - **Root Directory**: leave blank (root).
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: **Free**
6. Click **Create Web Service**. Render will build and deploy the application.

---

## 4. Alternative 2: Deploy to Google Cloud Run (Free Tier)

Google Cloud Run provides a generous free tier of **2 million requests per month**.

A production-ready `Dockerfile` and `.dockerignore` are already included in your project root.

### Prerequisites:
- A Google Cloud Platform (GCP) account with an active project.
- Google Cloud CLI (`gcloud`) installed on your system.

### Steps:
1. Open your terminal in the project directory.
2. Authenticate and select your project:
   ```bash
   gcloud auth login
   gcloud config set project <YOUR_GCP_PROJECT_ID>
   ```
3. Enable Cloud Run and Cloud Build APIs:
   ```bash
   gcloud services enable run.googleapis.com cloudbuild.googleapis.com
   ```
4. Deploy directly from source with one command:
   ```bash
   gcloud run deploy portfolio --source . --region us-central1 --allow-unauthenticated
   ```
5. Google Cloud Build will automatically build the included Docker container and deploy it, printing your public live URL (e.g., `https://portfolio-xyz-uc.a.run.app`).

---

## 5. File Checklist: What to Copy Where

When copying files or pushing to GitHub for deployment, follow this exact structure:

### ✅ MUST INCLUDE (Commit or copy these files):
```
├── public/
│   ├── hero/
│   │   ├── hero.mp4             <-- Optimized hero video
│   │   └── hero.webm            <-- Lightweight VP9 hero video
│   ├── logos/                   <-- Official brand SVGs & LICENSE
│   ├── portrait-bust.webp       <-- Head-to-shirt ID card portrait
│   ├── og.jpg                   <-- 1200x630 OpenGraph social share card
│   └── resume.pdf               <-- Downloadable resume
├── src/
│   ├── app/
│   │   ├── globals.css          <-- Tailwind 4 tokens & layout styles
│   │   ├── layout.tsx           <-- Font loading, metadata, viewport
│   │   └── page.tsx             <-- Root page entry
│   ├── components/
│   │   ├── hero/Hero.tsx        <-- Centered video hero with audio toggle
│   │   ├── sections/            <-- About, Skills, Work, Certifications,
│   │   │                            Experience, Achievements, Contact
│   │   ├── ui/TechLogo.tsx      <-- SVG logos & brand glow mapping
│   │   ├── App.tsx              <-- Master component orchestrator
│   │   └── Navigation.tsx       <-- Top frosted pill & mobile menu
│   ├── fonts/                   <-- Self-hosted local .woff2 font files
│   └── lib/
│       ├── data.ts              <-- ALL content from resume.pdf
│       ├── hooks.ts             <-- useInView, usePrefersReducedMotion
│       └── scroll.tsx           <-- Lenis smooth scrolling provider
├── scripts/
│   └── build-hero-assets.py     <-- Video processing pipeline script
├── .dockerignore
├── .gitignore                   <-- Keeps node_modules out of git
├── Dockerfile                   <-- Production container configuration
├── next.config.mjs              <-- Next.js framework settings
├── package.json                 <-- Dependencies & build scripts
├── package-lock.json            <-- Exact locked dependency tree
├── postcss.config.mjs           <-- Tailwind CSS 4 PostCSS plugin
├── tsconfig.json                <-- TypeScript configuration
└── README.md
```

### ❌ NEVER COPY OR COMMIT (Automatically created during build):
- `node_modules/`: Package dependencies (never copy; installed automatically via `npm install`).
- `.next/`: Build cache and compiled artifacts (created automatically by `npm run build`).
- `scripts/tmp/`: Temporary video/audio buffers.

---

## 6. Manual Run Instructions for Any Windows or Mac System

You can run this project locally on **any computer** (macOS, Windows 10/11, or Linux) with the following steps.

### Prerequisites (Install Once)
1. **Node.js**: Version **20.x** or **22.x LTS** (download from [nodejs.org](https://nodejs.org/)).
2. **Git**: (download from [git-scm.com](https://git-scm.com/) or via Xcode CLI tools on Mac).

---

### Instructions for Windows

1. **Open PowerShell or Command Prompt**:
   Navigate to the folder where you have copied or cloned the project:
   ```powershell
   cd "C:\path\to\your\project"
   ```

2. **Verify Node.js and NPM**:
   ```powershell
   node -v
   npm -v
   ```
   *(Ensure Node is v20+ or v22+)*

3. **Install Dependencies**:
   ```powershell
   npm install
   ```

4. **Option A: Run in Development Mode** (with hot reload):
   ```powershell
   npm run dev
   ```
   Open your browser at: `http://localhost:3000`

5. **Option B: Run in Production Mode** (optimized, fastest performance):
   ```powershell
   npm run build
   npm run start
   ```
   Open your browser at: `http://localhost:3000`

---

### Instructions for macOS / Linux

1. **Open Terminal**:
   Navigate to your project directory:
   ```bash
   cd ~/path/to/your/project
   ```

2. **Verify Node.js and NPM**:
   ```bash
   node -v
   npm -v
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Option A: Run in Development Mode**:
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:3000`

5. **Option B: Run in Production Mode**:
   ```bash
   npm run build
   npm run start
   ```
   Open your browser at: `http://localhost:3000`

---

### Troubleshooting Common Issues

1. **Port 3000 is already in use**:
   If another application is using port 3000, specify a different port:
   - On Windows:
     ```powershell
     $env:PORT="3001"; npm run dev
     ```
   - On Mac / Linux:
     ```bash
     PORT=3001 npm run dev
     ```

2. **Rebuilding Hero Video Assets from a New Video**:
   If you ever replace `intro.mp4` with a new clip:
   - Ensure Python 3.10+ and FFmpeg are installed.
   - Install NumPy: `pip install numpy`
   - Run:
     ```bash
     python scripts/build-hero-assets.py
     ```
   The script will automatically re-generate `hero.webm`, `hero.mp4`, `portrait-bust.webp`, and `og.jpg` with seamless looping, sample-accurate audio cross-fade, and background whitening.
