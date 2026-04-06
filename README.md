# marktantongco/portfolio

<p align="center">
  <img src="public/og-image.png" alt="Mark Anthony Tantongco — AI Creative Technologist Portfolio" width="800" />
</p>

<p align="center">
  <strong>GSAP-cinematic neo-brutalist portfolio.</strong><br/>
  Raw power at the intersection of AI, cinematic design, and strategic brand systems.<br/>
  Three.js particle hero · CLI typewriter identity · 5 case studies with live Three.js demos · Chart.js radar skills.
</p>

<p align="center">
  <a href="https://marktantongco.github.io/portfolio/">GitHub Pages</a> ·
  <a href="https://github.com/marktantongco/portfolio/issues">Issues</a> ·
  <a href="https://github.com/marktantongco/portfolio">Source</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Live Deployments](#live-deployments)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Architecture](#architecture)
- [Component Map](#component-map)
- [Animation System](#animation-system)
- [Data Layer](#data-layer)
- [Page Sections](#page-sections)
- [Development](#development)
- [Performance](#performance-benchmarks)
- [Accessibility](#accessibility-wcag-aa)
- [SEO & PWA & GEO](#seo--pwa--geo)
- [Deployment](#deployment)
- [Design Philosophy](#design-philosophy)
- [License](#license)

---

## Overview

A **static single-page application** built with Vite + React + TypeScript. No server, no database, no Next.js — pure client-side rendering with progressive enhancement, cinematic Three.js 3D visuals, and GSAP ScrollTrigger-driven section reveals.

The portfolio features 10 distinct sections, 5 fully-detailed case studies with live Three.js canvas demos in a modal overlay, a CLI typewriter identity block, Chart.js radar visualization for skills, and a dark/light theme system built on CSS custom properties.

**Author:** Mark Anthony Tantongco — AI Creative Technologist, Prompt Architect, Cinematic Vision

**Built with:** Vite 8 · React 19 · TypeScript 5.9 · Three.js 0.183 · GSAP 3.14 · Chart.js 4.5 · Tailwind CSS 4

---

## Live Deployments

| Platform | URL | Strategy |
|---|---|---|
| **GitHub Pages** | [marktantongco.github.io/portfolio](https://marktantongco.github.io/portfolio) | Primary — auto-deploys on push to `main` via GitHub Actions |
| **Vercel** | Deployed via Vercel CLI | Secondary — zero-config edge deployment with cache headers |

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Build** | Vite | 8.x | Instant HMR, optimized static output, manual chunk splitting |
| **UI** | React | 19.x | Component isolation, hooks-driven state, lazy loading |
| **Language** | TypeScript | 5.9.x | Full type safety across 16 components + data layer |
| **3D** | Three.js | 0.183.x | Hero particle field + case study modal canvas demos |
| **Animation** | GSAP + ScrollTrigger | 3.14.x | All scroll reveals, section entrances, magnetic cards, parallax |
| **Charts** | Chart.js | 4.5.x | Radar chart in Skills section + radar in Identity section |
| **Styling** | Tailwind CSS | 4.x | Utility-first with `@tailwindcss/vite` plugin |
| **Fonts** | Google Fonts (CDN) | — | Bebas Neue (display), DM Sans (body), DM Mono (labels) |
| **Utilities** | clsx + tailwind-merge | latest | Safe className composition |

---

## Design System

### Color Palette — CSS Custom Properties

The entire visual identity is defined by CSS custom properties in `:root` with theme variants for dark and light modes. Component files reference only variables — zero hardcoded hex values in `.tsx`.

**Dark Mode (default):**

```
--bg:          #0a0a0a    Page background (void black)
--bg2:         #0f0f0f    Elevated surface
--bg3:         #181818    Deepest surface
--fg:          #efefef    Primary text
--fg2:         rgba(239,239,239,.58)    Secondary text
--fg3:         rgba(239,239,239,.25)    Muted captions
--border:      rgba(204,255,0,.2)       Default border (neon tint)
--card:        #0f0f0f    Card backgrounds
--nav-bg:      rgba(10,10,10,.92)       Navigation backdrop
--neon:        #ccff00    Primary accent (neon lime)
--cyan:        #00ffff    Secondary accent
--accent:      #ccff00    Alias for --neon
--accent-dim:  rgba(204,255,0,.08)      Subtle fills
--accent-mid:  rgba(204,255,0,.38)      Medium fills
--danger:      #ff3b30    Error states
--success:     #00e676    Success states
```

**Light Mode:** Automatic inversion with warm paper tones (`#f3f2ed` background, `#111` text).

### Typography Scale

| Role | Font | Weight | Size | Transform |
|---|---|---|---|---|
| Display / Hero H1 | Bebas Neue | 400 | `clamp(62px, 12vw, 190px)` | uppercase |
| Section H2 | Bebas Neue | 400 | `clamp(46px, 7.5vw, 120px)` | uppercase |
| Subheading H3 | Bebas Neue | 400 | 1.6–1.8rem | uppercase |
| Body | DM Sans | 300–400 | 0.73–0.88rem | none |
| Label / Mono | DM Mono | 400 | 0.5–0.75rem | uppercase, wide tracking |
| CLI / Code | DM Mono | 400 | 0.68–0.72rem | monospace |

### Key Design Tokens

```
--bs:                1.5px solid var(--border)   ← Standard border shorthand
--tt:                background .4s, color .4s, border-color .4s   ← Theme transition
--border-radius:     0px or 2px max              ← Never rounded
--cursor:            none (custom blob + dot)     ← Desktop only
```

### Z-Index Architecture

| Layer | z-index | Component |
|---|---|---|
| Preloader | 99999 | Preloader |
| Custom cursor dot | 10000 | CustomCursor |
| Custom cursor blob | 9999 | CustomCursor |
| Noise overlay | 9000 | `body::before` |
| Case study modal | 3000 | CaseStudyModal |
| Navigation | 800 | Navigation |
| Mobile drawer | 799 | Mobile drawer |
| Scroll progress | 9999 | ScrollProgress |
| Back to top | 500 | BackToTop |
| Hero decorations | 1–6 | Grid, vignette, scanlines, corners |

---

## Architecture

```
portfolio/
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages CI/CD (Node 22, npm build, deploy dist/)
├── backup/                     # Archived previous version (full source tree)
├── public/
│   ├── favicon.svg             # Brutalist "MT" SVG mark
│   ├── og-image.png            # 1200×630 Open Graph image
│   ├── manifest.json           # PWA manifest (standalone, theme #FFEA00)
│   └── icons.svg               # Social icon sprites
├── src/
│   ├── components/
│   │   ├── BackToTop.tsx        # Fixed scroll-to-top button (fade on scroll)
│   │   ├── Blog.tsx             # Dual-panel: featured article + stacked cards
│   │   ├── CaseStudyModal.tsx   # Full-screen modal with Three.js canvas demo
│   │   ├── Contact.tsx          # Form (4 fields) + email + socials + validation
│   │   ├── CustomCursor.tsx     # Blob + dot cursor (desktop only, mix-blend-mode)
│   │   ├── Footer.tsx           # 3-column: brand, navigation, social links
│   │   ├── Hero.tsx             # Three.js 3D particle scene + text overlay
│   │   ├── Identity.tsx         # CLI typewriter + philosophy cards + radar chart
│   │   ├── Navigation.tsx       # Fixed nav + scroll spy + mobile hamburger drawer
│   │   ├── Preloader.tsx        # "MAT" logo + progress bar + percentage counter
│   │   ├── Process.tsx          # 4-step diagonal timeline (Diagnose → Refine)
│   │   ├── ScrollProgress.tsx   # Fixed 2px neon progress bar
│   │   ├── Services.tsx         # 3-column service cards with deliverables + pricing
│   │   ├── Skills.tsx           # Chart.js radar + category pills with hover highlight
│   │   ├── Testimonials.tsx     # 3-card grid with quotes + author metadata
│   │   ├── Ticker.tsx           # Infinite horizontal marquee (neon yellow bar)
│   │   └── Work.tsx             # 5 project cards + "Next →" CTA card
│   ├── hooks/
│   │   ├── useActiveSection.ts  # IntersectionObserver → active nav section ID
│   │   └── useReducedMotion.ts  # `prefers-reduced-motion` media query hook
│   ├── lib/
│   │   ├── data.ts              # All typed content data (projects, services, etc.)
│   │   └── gsap-setup.ts        # GSAP + ScrollTrigger registration
│   ├── styles/
│   │   └── globals.css          # 500+ lines: tokens, components, animations, responsive
│   ├── App.tsx                  # Root component: layout + section orchestration
│   └── main.tsx                 # Entry point
├── index.html                   # OG meta, JSON-LD, skip link, PWA manifest, fonts
├── vite.config.ts               # base: '/portfolio/', manual chunks (hero/charts/gsap/vendor)
├── vercel.json                  # Build config, rewrites, cache headers, security headers
├── tailwind.config.js           # Extended theme tokens
├── tsconfig.json                # Strict mode, path alias @/ → src/
├── package.json                 # Scripts: dev, build, build:prod, lint, validate
├── validate.sh                  # Automated constraint validation script
└── README.md                    # This file
```

---

## Component Map

### Data Flow

```
App.tsx (state owner)
    ├── activeSection: string          ← useActiveSection() hook
    └── modalProject: Project | null   ← Work card click → CaseStudyModal

useActiveSection (IntersectionObserver)
    └── Navigation.tsx (scroll-spy highlight + mobile drawer active state)

useReducedMotion (media query)
    └── Hero, Work, Services, Skills, Process, Testimonials, Blog, Contact
```

### Component Dependencies

| Component | Lines | Key Dependencies | Renders |
|---|---|---|---|
| **App.tsx** | 59 | All components | Layout shell |
| **Hero.tsx** | 265 | Three.js, GSAP, useReducedMotion | 3D particle scene + name + badge + scroll indicator |
| **Identity.tsx** | 262 | Three.js, Chart.js, GSAP | CLI typewriter + philosophy + radar chart + stats |
| **Work.tsx** | 99 | GSAP, ScrollTrigger | 5 project cards → opens CaseStudyModal |
| **CaseStudyModal.tsx** | 332 | Three.js, GSAP | Full-screen overlay with canvas demo + metrics |
| **Services.tsx** | 56 | GSAP, ScrollTrigger | 3-column service cards |
| **Skills.tsx** | 143 | Chart.js, GSAP, ScrollTrigger | Radar chart + 4 category pill groups |
| **Process.tsx** | 56 | GSAP, ScrollTrigger | 4-step timeline |
| **Testimonials.tsx** | 46 | GSAP, ScrollTrigger | 3-card testimonial grid |
| **Blog.tsx** | 78 | GSAP, ScrollTrigger | Featured + stacked article cards |
| **Contact.tsx** | 189 | GSAP, useReducedMotion | Form + validation + social links |
| **Navigation.tsx** | 92 | — | Fixed nav + hamburger + mobile drawer |
| **CustomCursor.tsx** | 98 | — | Blob SVG + dot (desktop only) |
| **Preloader.tsx** | 32 | — | MAT logo + progress bar |
| **ScrollProgress.tsx** | 16 | — | 2px neon bar |
| **Ticker.tsx** | 15 | — | Infinite marquee |
| **BackToTop.tsx** | 19 | — | Fade-in scroll button |
| **Footer.tsx** | 43 | — | 3-column footer |

---

## Animation System

All scroll-driven animations use GSAP ScrollTrigger. The `useReducedMotion` hook detects `prefers-reduced-motion` and skips all GSAP registrations when active.

### Animation Registry

| Animation | Trigger | Duration | Easing | Purpose |
|---|---|---|---|---|
| **Hero badge fade-in** | Page load | 0.6s (0.3s delay) | power2.out | Draw attention to availability status |
| **Hero name scramble** | Page load | 0.8s (0.5s delay) | steps(1) per char | Cinematic text reveal — each character cycles through random glyphs |
| **Hero subtitle fade** | Page load | 0.6s (1.0s delay) | power2.out | Layered entrance after name resolves |
| **Hero tagline slide-up** | Page load | 0.5s (1.2s delay) | power2.out | CTA appears last in hero sequence |
| **Hero scroll indicator** | Page load | 0.5s (1.4s delay) | power2.out | Encourage scroll engagement |
| **Hero parallax** | Scroll | Continuous | Linear | Depth illusion — content shifts at 0.3× scroll speed |
| **Hero corner brackets** | Scroll into view | 0.8s | power2.out | Frame the viewport with decorative borders |
| **CLI typewriter lines** | Section enters viewport | 0.12s per char, 0.4s line gap | Linear | Terminal-style command → output reveal |
| **Identity stats count-up** | Section enters viewport | 1.2s | power2.out | Animated number counters for credibility |
| **Work cards stagger** | Section enters viewport | 0.6s per card, 0.1s stagger | power3.out | Sequential reveal creates reading rhythm |
| **Work card magnetic tilt** | Mouse hover | Instant | Spring-like | Cards subtly follow cursor for tactile feel |
| **Case study modal open** | Card click | 0.35s | cubic-bezier(0.22, 1, 0.36, 1) | Smooth scale + translate entrance |
| **Case study modal Three.js** | Modal open | Continuous | — | Per-project unique canvas demo (particles/brand orbit/shader) |
| **Services cards stagger** | Section enters viewport | 0.6s per card, 0.12s stagger | power3.out | Staggered reveal for service offerings |
| **Skills radar draw** | Section enters viewport | 1.0s | ease-out | Chart.js radar animation from center |
| **Process steps slide-in** | Section enters viewport | 0.7s per step, 0.15s stagger | power2.out | Sequential timeline reveal |
| **Testimonials stagger** | Section enters viewport | 0.5s per card, 0.1s stagger | power2.out | Quote cards appear in reading order |
| **Blog featured slide-right** | Section enters viewport | 0.7s | power2.out | Featured article enters from left |
| **Blog stacked slide-up** | Section enters viewport | 0.5s per card, 0.12s stagger | power2.out | Secondary articles follow |
| **Contact heading reveal** | Section enters viewport | 0.8s | power3.out | Large heading draws attention |
| **Ticker infinite scroll** | Always | 28s per loop | Linear | Continuous keyword marquee — ambient motion |
| **Neon pulse (hero name)** | Always | 2.8s cycle | ease-in-out | Text-shadow glow oscillation for "TANTONGCO" |
| **Badge ping** | Always | 2s cycle | ease-out | Expanding ring on availability dot |
| **Scroll indicator dot** | Always | 2.2s cycle | ease-in-out | Bouncing dot inside mouse icon |
| **Scanline sweep** | Always | 5s cycle | Linear | Horizontal line sweeps down hero |
| **Cursor blob follow** | Mouse move | 0.15s lag | Linear | Smooth trailing blob with mix-blend-mode |
| **Preloader bar fill** | Page load | ~2s total | Linear | Progress bar fills as resources load |

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- All GSAP ScrollTrigger registrations are skipped
- Three.js canvas is not initialized
- CSS animations are disabled via media query
- Preloader still functions (accessibility requirement)
- All content remains fully accessible

---

## Data Layer

All content lives in `src/lib/data.ts` as typed TypeScript exports. No external CMS, no API calls — everything is statically typed and tree-shakeable.

| Export | Type | Count | Used By |
|---|---|---|---|
| `NAV_LINKS` | `NavItem[]` | 8 sections | Navigation, Footer |
| `PROJECTS` | `Project[]` | 5 projects | Work, CaseStudyModal |
| `SERVICES` | `Service[]` | 3 services | Services |
| `TESTIMONIALS` | `Testimonial[]` | 3 quotes | Testimonials |
| `BLOG_POSTS` | `BlogPost[]` | 3 articles | Blog |
| `SKILL_CATEGORIES` | `SkillCategory[]` | 4 categories, 27 skills | Skills |
| `PROCESS_STEPS` | `ProcessStep[]` | 4 steps | Process |
| `IDENTITY_TAGS` | `string[]` | 5 tags | Identity |
| `PHILOSOPHIES` | `Philosophy[]` | 2 quotes | Identity |
| `STATS` | `StatItem[]` | 4 stats | Identity |
| `TICKER_ITEMS` | `string[]` | 8 keywords | Ticker |
| `CLI_COMMANDS` | `{cmd, output, type}[]` | 3 commands | Identity |
| `SKILL_RADAR_LABELS` | `string[]` | 4 axes | Identity |
| `SKILL_RADAR_BASE` | `number[]` | 4 values | Identity |
| `SOCIAL_LINKS` | `{label, href}[]` | 4 platforms | Contact, Footer |

### Case Study Data Structure

Each `Project` in `PROJECTS` contains a full case study with:

```typescript
interface Project {
  num: string;                    // "01" – "05"
  title: string;                  // Project name
  desc: string;                   // One-liner description
  tags: string[];                 // Tech stack tags
  problem: string;                // Problem statement
  solution: string;               // Solution description
  metrics: { n: string; l: string; sub: string }[];  // 3 key metrics
  steps: { n: string; t: string; b: string }[];      // 4 process steps
  results: { label: string; value: string; note: string }[];  // 4 result items
  demo: string;                   // Three.js demo type identifier
  demoLabel: string;              // Demo label text
}
```

### The 5 Case Studies

| # | Project | Tags | Demo |
|---|---|---|---|
| 01 | Photography AI System | Flux, Midjourney, ComfyUI, ACES | Live Particle Simulation |
| 02 | Living Portfolio OS | GSAP, Three.js, Next.js, Design Tokens | Interactive Particle Field |
| 03 | Brand Intelligence Engine | Brand Systems, Claude API, Figma | Brand Orbit Visualization |
| 04 | WebGPU Experiential Layer | Next.js, WebGPU, R3F, GSAP | WebGPU Shader Demo |
| 05 | SEO / GEO Framework | SEO, GEO, Prompt Eng, Strategy | Performance Analytics |

---

## Page Sections

| # | Section | Component | Key Features |
|---|---|---|---|
| 0 | **Preloader** | Preloader | "MAT" logo fade-in, progress bar, percentage counter |
| 1 | **Hero** | Hero | Three.js 3D particle scene, neon pulse name, availability badge, parallax, scanline, grid overlay, vignette, corner brackets, scroll indicator |
| 2 | **Ticker** | Ticker | Infinite neon yellow marquee with 8 rotating keywords |
| 3 | **Identity** | Identity | CLI typewriter (3 commands), philosophy cards, stats grid, Chart.js radar chart |
| 4 | **Work** | Work | 5 project cards in 3-column grid with magnetic hover, "Next →" CTA |
| 5 | **Case Study Modal** | CaseStudyModal | Full-screen overlay with Three.js canvas demo, problem/solution, 3 metrics, 4 process steps, 4 results, tags, CTA |
| 6 | **Services** | Services | 3-column grid: AI Creative Strategy ($2.5K), Brand Intelligence ($4K), Immersive Web ($3.5K) |
| 7 | **Skills** | Skills | Chart.js radar + 4 category pill groups (27 skills), hover highlights |
| 8 | **Process** | Process | 4-step diagonal timeline: Diagnose → Architect → Execute → Refine |
| 9 | **Testimonials** | Testimonials | 3-card grid with blockquotes, author metadata |
| 10 | **Blog** | Blog | Dual panel: featured article (large) + 2 stacked cards |
| 11 | **Contact** | Contact | Heading with watermark, email link, social links, 4-field form with validation |
| 12 | **Footer** | Footer | 3-column: brand, section links, social links |

---

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Local Setup

```bash
# Clone the repo
git clone https://github.com/marktantongco/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev
```

### Build Commands

```bash
npm run dev          # Vite dev server with HMR
npm run build        # Production build → dist/
npm run build:prod   # NODE_ENV=production build
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run validate     # Run constraint validation (validate.sh)
```

### Import Convention

```typescript
// 1. React imports
import { useState, useEffect, useRef } from 'react';
// 2. Third-party libraries
import * as THREE from 'three';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';
import { Chart } from 'chart.js/auto';
// 3. Hooks
import { useReducedMotion } from '@/hooks/useReducedMotion';
// 4. Data
import { PROJECTS, SERVICES } from '@/lib/data';
// 5. Styles (global, always imported)
import '@/styles/globals.css';
```

---

## Performance Benchmarks

| Metric | Target | Actual | Status |
|---|---|---|---|
| Total bundle (gzipped) | < 1.5 MB | ~321 KB | ✅ |
| Three.js chunk (gzipped) | < 500 KB | ~125 KB | ✅ |
| Chart.js chunk (gzipped) | < 250 KB | ~70 KB | ✅ |
| GSAP chunk (gzipped) | < 100 KB | ~44 KB | ✅ |
| App code (gzipped) | < 100 KB | ~15 KB | ✅ |
| CSS output (gzipped) | — | ~7.3 KB | ✅ |
| Build time | < 2s | ~310ms | ✅ |
| Total chunks | — | 8 | ✅ |

### Chunk Splitting Strategy

```
hero-*.js              → Three.js + postprocessing (heaviest, lazy loaded)
charts-*.js            → Chart.js (loaded with Skills section)
gsap-*.js              → GSAP + ScrollTrigger
vendor-*.js            → React + ReactDOM
rolldown-runtime-*.js  → Vite runtime
index-*.js             → All application code + components
index-*.css            → All styles (global CSS)
```

---

## Accessibility (WCAG AA)

| Requirement | Implementation |
|---|---|
| **Skip link** | First focusable element in `index.html`, hidden by default, appears on focus |
| **Semantic HTML** | `<nav>`, `<main id="main">`, `<section>`, `<article>`, `<footer>` |
| **`aria-label`** | On nav, sections, mobile drawer, form inputs, buttons |
| **`aria-modal="true"`** | On case study overlay dialog |
| **`aria-hidden="true"`** | On decorative elements (canvas, grid, scanlines, vignette, ticker, cursor) |
| **Focus-visible** | 2px solid `var(--accent)` outline with 2px offset on all interactive elements |
| **`prefers-reduced-motion`** | CSS media query + `useReducedMotion` hook disables all GSAP and Three.js |
| **Keyboard navigation** | Tab through all interactive elements, Enter/Space to activate |
| **Form validation** | HTML5 `required` + `pattern` + custom JS validation with visual feedback |
| **Color contrast** | Dark mode: `#efefef` on `#0a0a0a` = 17.6:1 ✅ · `#ccff00` on `#0a0a0a` = 14.8:1 ✅ |
| **Touch targets** | All buttons and links ≥ 44×44px |

---

## SEO, PWA & GEO

### Search Engine Optimization

- **JSON-LD** Person schema in `<head>`: name, job title, URL, sameAs, knowsAbout, workLocation
- **Open Graph** meta tags: title, description, url, image, type, locale
- **Twitter Card** `summary_large_image` with creator handle `@markytanky`
- **`robots`** meta: `index, follow, max-image-preview:large`
- **Canonical URL** via `og:url`
- **DNS prefetch + preconnect** for Google Fonts and CDN assets

### Progressive Web App

- **Manifest**: standalone display, `#FFEA00` theme color, SVG favicon, start URL `/portfolio/`
- **Apple Touch Icon**: Referenced in `<head>`
- **Installable**: Meets PWA installability criteria

### Generative Engine Optimization (GEO)

The **Blog** section is designed for GEO — making the portfolio citable by AI search engines (ChatGPT, Perplexity, Gemini):

- 3 thought-leadership articles with category taxonomy (AI Strategy, Design Engineering, SEO/GEO)
- Authorship content with timestamps and read-time metadata
- Structured data (JSON-LD Person schema) supporting entity authority
- Real article URLs for citation backlinks

---

## Deployment

### GitHub Pages (Primary)

Automatic deployment via GitHub Actions workflow at `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

Pipeline: Checkout → Setup Node.js 22 → `npm ci` → `npm run build` → Upload `dist/` → Deploy via `actions/deploy-pages@v4`

**Base path:** `/portfolio/` (configured in `vite.config.ts`)

### Vercel (Secondary)

Configuration in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" }
    ]}
  ]
}
```

Deploy via Vercel CLI: `npx vercel --prod`

Zero environment variables needed — fully static site.

### Manual Build

```bash
npm install
npm run build
# Output: dist/ directory — serve with any static file server
```

---

## Design Philosophy

> A void-black control room. Electric neon lime (`#ccff00`) commands attention from the darkness — the only warm color in a frozen monochrome field. Text is monumental, uppercase, and unapologetic: every heading is stamped in Bebas Neue like a metal plate. The hero breathes with a Three.js particle field, scanline sweep, and a grid overlay that evokes a radar display. The moment a visitor scrolls, a CLI terminal types out identity commands one character at a time — `whoami`, `cat philosophy.md`, `status --available`. Five project cards sit in a grid with magnetic hover that makes the cards subtly follow the cursor; clicking any one opens a full-screen case study modal with its own Three.js canvas demo. The Skills section renders a live Chart.js radar chart that animates on scroll. The Process timeline slides in step by step like pistons. Three testimonials, three blog cards, a contact form with real validation. A neon-yellow ticker marquee scrolls infinitely. A custom blob cursor trails the mouse with `mix-blend-mode: difference`. Every section border is a 1.5px neon-tinted line. Zero border-radius. No soft drop shadows. No corporate blue. This is not a website — it's a control room that happens to be a portfolio.

---

## License

MIT — Mark Anthony Tantongco
