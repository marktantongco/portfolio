# Mark Anthony Tantongco — Portfolio

> A neo-brutalist single-page portfolio built with Vite, React, TypeScript, Three.js, Framer Motion, and Tailwind CSS. Zero corporate polish. Raw power.

**Live:** [marktantongco.github.io/portfolio](https://marktantongco.github.io/portfolio)

---

## Architecture

This is a **static single-page application** (SPA) — no server, no Next.js, no database. Pure client-side rendering with progressive enhancement.

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Build | Vite 8 | Instant HMR, optimized static output |
| UI | React 19 | Component isolation, Suspense + lazy loading |
| Language | TypeScript 5.9 | Full type safety |
| 3D | Three.js 0.183 | WebGL hero scene (particles, bloom, 8 shapes) |
| Animation | Framer Motion 12 | Scroll reveals, layout, springs (80%+ of animations) |
| Animation | GSAP 3.14 | Timeline sequences, magnetic buttons (20% of animations) |
| Styling | Tailwind CSS 4 | Utility-first with CSS variable integration |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Code Highlight | prism-react-renderer | Syntax-highlighted code showcase |
| Toast | Sonner | Notification system |

### Design System

12 CSS custom properties — the entire visual identity lives in `:root`:

```
--brutal-yellow   #FFEA00   Hero primary, CTAs, active nav
--brutal-lime     #ccff00   Identification, AI skill bars
--brutal-cyan     #00ffff   Process section, demos
--brutal-magenta  #FF0080   Proof demos, projects
--brutal-gold     #FFD700   Trust/testimonials
--brutal-orange   #FF6B00   Star ratings, hover accents
--brutal-red      #FF0033   Error states
--brutal-green    #00FF66   Success, live indicators
--brutal-void     #0a0a0a   Page background
--brutal-surface  #111111   Card/input backgrounds
--brutal-border   #FFFFFF   All borders, primary text
--brutal-text-muted  #666666  Secondary text
```

Zero hardcoded hex values in component files. All colors reference CSS variables.

---

## Features

### Interactive Demos (4 fully functional)
- **BREAKTHROUGH** — Cinematic Vision Analyzer: select color grading modes, see specs update in real-time
- **POWERUP** — AI Prompt Builder: write prompts, use templates, generate simulated output
- **SCAFFOLD** — Physics-First Builder: drag constraints to activate, watch confidence score shift
- **SENTIENT** — Design Token System: pick colors, spacing, typography — generates live CSS

### Case Study Modal
Click any project card to open a full-screen overlay with project overview, role/stack breakdown, key metrics, process highlights, and action buttons.

### Navigation (4 layers)
1. **Top nav** — Scroll-spy highlighting, mobile hamburger, auto-hide on scroll down
2. **Side dot nav** — 7 dots with tooltips (desktop only)
3. **Command palette** — Ctrl+K / Cmd+K, filterable search across sections and external links
4. **Scroll progress bar** — Gradient bar (yellow → cyan → green)

### Sections
1. **Hero** — Three.js 3D scene with 3000 particles, bloom, 8 floating shapes, typewriter, marquee ticker, corner brackets
2. **Identification** — 4-column capability grid (AI, Brand Systems, GEO, Prompt Architecture)
3. **THE SCAFFOLD METHOD** — 4-step process timeline with scroll-driven animations
4. **PROOF** — Tabbed interface with 6 sub-sections:
   - Skills & Expertise (25 filterable skill bars, 5 categories)
   - Interactive Demos (4 functional mini-apps)
   - Featured Projects (5 cards → case study modal)
   - Code Showcase (3 syntax-highlighted tabs)
   - Live System Metrics (simulated dashboard)
   - Journey Timeline (7 entries, 2019–2026)
5. **WHAT CLIENTS SAY** — Testimonial carousel (auto-advance, pause on hover)
6. **THOUGHTS & PROCESS** — 3 blog/thought-leadership cards for GEO
7. **START THE CONVERSATION** — 4-field contact form + newsletter + socials + confetti

---

## Project Structure

```
src/
  components/
    LoadingScreen.tsx         # Dual rings, progress bar, scanlines
    Hero.tsx                   # Three.js 3D scene (lazy-loaded)
    HeroSkeleton.tsx           # CSS gradient fallback
    Navigation.tsx             # Top nav + hamburger + auto-hide
    SideNav.tsx                # Dot navigation (desktop)
    CommandPalette.tsx         # Ctrl+K search modal
    ScrollProgress.tsx         # Gradient scroll bar
    BackgroundEffects.tsx      # Grid, vignette, floating shapes
    Identity.tsx               # 4-column capability grid
    Process.tsx                # Scaffold Method timeline
    Proof/
      Proof.tsx                # Tab container
      Skills.tsx               # 25 filterable skill bars
      InteractiveDemos.tsx     # 4 functional demo tabs
      FeaturedProjects.tsx     # 5 project cards
      CodeShowcase.tsx         # 3 code tabs
      LiveMetrics.tsx          # Simulated dashboard
      Timeline.tsx             # 7-entry timeline
    ProjectModal.tsx           # Case study overlay
    Trust.tsx                  # Testimonial carousel
    Thoughts.tsx               # 3 blog cards
    Contact.tsx                # Form + newsletter + socials
    Footer.tsx                 # Status badge + copyright
  hooks/
    useActiveSection.ts        # Intersection Observer
    useReducedMotion.ts        # prefers-reduced-motion
    useThreeScene.ts           # Three.js lifecycle
    useCommandPalette.ts       # Ctrl+K listener
  lib/
    data.ts                    # All content data
    design-tokens.ts           # CSS variable constants
    social-icons.tsx           # Custom SVG social icons
    utils.ts                   # cn() helper
  styles/
    globals.css                # Design tokens + utilities + animations
  App.tsx                      # Root composition
  main.tsx                     # Entry point
```

---

## Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build          # Development build
npm run build:prod     # Production build (minified)
```

### Validate
```bash
npm run validate       # Runs validate.sh constraint checks
```

The `validate.sh` script checks:
- No banned dependencies (Next.js, react-three/fiber, embla-carousel, etc.)
- All 22 component files exist
- 12+ color tokens in globals.css
- No hardcoded hex values in .tsx files
- Semantic HTML elements (skip link, main, header, footer)
- prefers-reduced-motion handling
- SEO meta tags (JSON-LD, og:image, manifest.json)

---

## Performance

| Metric | Target | Actual |
|---|---|---|
| Total bundle (gzipped) | < 1.5 MB | ~306 KB |
| Three.js chunk (gzipped) | < 500 KB | ~134 KB |
| Framer Motion chunk (gzipped) | < 140 KB | ~47 KB |
| Hero chunk (lazy, gzipped) | < 50 KB | ~3.3 KB |
| Build time | < 2s | ~378ms |

### Progressive Enhancement
- No WebGL → CSS animated gradient fallback
- prefers-reduced-motion → Static content, no canvas, no animations
- Slow network → 2s loading screen, then Three.js attempt with CSS fallback
- Low-end hardware (< 4 cores) → 1000 particles, no bloom

### Accessibility (WCAG AA)
- Skip link (first focusable element)
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`)
- `aria-hidden="true"` on decorative elements
- `aria-live="polite"` on dynamic content
- `prefers-reduced-motion` support
- 44×44px minimum touch targets
- Keyboard navigation support

---

## Deployment

### GitHub Pages
The site is deployed to GitHub Pages with Vite's `base: '/portfolio/'` configuration.

Push to `main` triggers the deployment workflow.

### PWA
- Service worker via `vite-plugin-pwa`
- Offline fallback with cached HTML shell
- Manifest with standalone display mode

---

## Design Philosophy

> A void-black control room. Electric yellow commands attention. Text is monumental, uppercase, and unapologetic. The hero breathes with 3,000 particles wrapped in bloom glow. Every section arrives with a kinetic punch. Twenty-five skill bars fill like fuel gauges. Four interactive demos let visitors touch the work. Five project cards prove it's shipped — clicking any opens a case study modal. Three thought-leadership cards link to process writeups for GEO.

No rounded corners. No soft drop shadows. No corporate blue. This is not a website. This is a control room that happens to be a portfolio.

---

## License

MIT — Mark Anthony Tantongco
