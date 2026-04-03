# Mark Anthony Tantongco -- Portfolio

A neo-brutalist portfolio website built with Vite, React 19, TypeScript, and Three.js. Features hard shadows, a 12-color design system, spring-physics animations, a WebGL particle hero scene, and full WCAG AA accessibility compliance.

**Live demo:** [https://marktantongco.github.io/portfolio](https://marktantongco.github.io/portfolio)

---

## Screenshot

<!-- TODO: Replace with actual screenshot -->
![Portfolio screenshot](public/og-image.png)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 |
| Language | TypeScript 5.9 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 + custom CSS with design tokens |
| Animation | Framer Motion 12 |
| 3D graphics | Three.js 0.183 (lazy-loaded) |
| Icons | Lucide React |
| Code highlighting | Prism React Renderer |
| Toasts | Sonner |
| Linting | ESLint 9 with React Hooks and React Refresh plugins |

---

## Architecture Overview

The application is a single-page application (SPA) served as static files. There is no server-side rendering. This is an intentional choice -- the portfolio is a personal site with no dynamic server data, so the overhead of a framework like Next.js would provide no benefit while complicating the GitHub Pages deployment.

Key architectural decisions:

1. **Vite over Next.js** -- SPA with GitHub Pages deployment. No SSR needed for a static portfolio. Vite provides faster HMR, simpler configuration, and native ES module output.
2. **Framer Motion as the sole animation library** -- GSAP was removed to reduce bundle size. Framer Motion handles entrance animations, scroll-triggered reveals, layout transitions, and spring-physics interactions.
3. **Three.js lazy-loaded** -- The 533KB Three.js bundle is code-split and deferred behind `React.lazy()`. A skeleton fallback renders immediately while the WebGL scene loads.
4. **Tab-based Proof section** -- The six-panel Proof section (Skills, Demo Lab, Projects, Code, Metrics, Timeline) only renders the active tab's content. Inactive tabs are unmounted from the DOM.
5. **content-visibility: auto** -- Major sections use the CSS `content-visibility: auto` property so the browser can skip rendering for off-screen sections, reducing layout and paint cost.
6. **CSS variables for design tokens** -- Zero hardcoded hex values exist inside any component. All colors, shadows, borders, and easing curves are defined as CSS custom properties on `:root`.

---

## Design System

### Color Palette (12 CSS custom properties)

All colors are defined as CSS custom properties and consumed throughout the codebase via `var()` references. No hex values are hardcoded in component files.

| Token | Purpose |
|-------|---------|
| `--brutal-yellow` | Primary accent, highlights, CTAs |
| `--brutal-lime` | Secondary accent, skill bars |
| `--brutal-cyan` | Tertiary accent, links, badges |
| `--brutal-magenta` | Interactive elements, hover states |
| `--brutal-gold` | Awards, premium content indicators |
| `--brutal-orange` | Warnings, process steps |
| `--brutal-red` | Errors, destructive actions |
| `--brutal-green` | Success states, availability badges |
| `--brutal-void` | Primary background |
| `--brutal-surface` | Card and panel backgrounds |
| `--brutal-border` | All borders and dividers |
| `--brutal-text-muted` | Secondary and tertiary text |

### Neo-Brutalist Design Principles

- **Hard shadows** -- `--shadow-brutal` (4px solid offset) with `--shadow-hover` (8px on interaction). No soft box-shadows anywhere in the design.
- **No border-radius** -- All elements use square corners. No rounded corners are applied at any breakpoint.
- **Thick borders** -- `--border-thin` (2px) and `--border-thick` (4px) as the only border widths.
- **High contrast** -- Saturated accent colors against the `--brutal-void` background. Typography and interactive elements maintain WCAG AA contrast ratios.

### Motion Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-enter` | `cubic-bezier(0.16,1,0.3,1) 320ms` | Element entrance animations |
| `--ease-exit` | `cubic-bezier(0.7,0,0.84,0) 200ms` | Element exit animations |
| `--ease-hover` | `cubic-bezier(0.16,1,0.3,1) 160ms` | Hover state transitions |
| `--ease-press` | `cubic-bezier(0.7,0,0.84,0) 100ms` | Active/press state transitions |
| `--ease-layout` | `cubic-bezier(0.16,1,0.3,1) 400ms` | Layout shift animations |
| `--spring-bounce` | Framer Motion spring config | Bouncy micro-interactions |

All motion respects the `prefers-reduced-motion` media query. When reduced motion is preferred, transitions are disabled or replaced with simple opacity fades.

### Component Classes

| Class | Purpose |
|-------|---------|
| `.brutal-card` | Surface container with border, shadow, and padding |
| `.brutal-btn` | Button with hard shadow, press interaction, and focus ring |
| `.brutal-input` | Form input with border, focus state, and label |
| `.interactive-press` | Scale-on-press micro-interaction (0.97 transform) |

---

## Components (22 total)

### Layout and Navigation

| Component | Description |
|-----------|-------------|
| **Navigation** | Fixed top bar with scroll-spy active state, auto-hide on scroll down, mobile hamburger menu, and Ctrl+K command palette trigger |
| **SideNav** | Fixed dot navigation on the right edge with hover tooltips showing section names |
| **ScrollProgress** | Gradient progress bar at the top of the viewport tracking page scroll position |
| **BackgroundEffects** | Full-page grid overlay and vignette effect applied behind all content |
| **LoadingScreen** | Dual animated rings with a progress bar, shown during initial bundle hydration |
| **Footer** | Status badge (available for hire), social links, and copyright |

### Content Sections

| Component | Description |
|-----------|-------------|
| **Hero** | Three.js WebGL particle scene, kinetic typewriter text effect, scrolling marquee, and CTA buttons |
| **Identity** | Four capability cards with icons describing core skill areas |
| **Process** | Four-step horizontal timeline with scroll-triggered animation |
| **Proof** | Tabbed section with six panels (see below) |
| **Trust** | Four testimonials in a carousel with navigation controls |
| **Thoughts** | Three blog post cards linking to external content |
| **Contact** | Contact form with validation, newsletter signup toggle, and submission status feedback |

### Proof Sub-Panels

| Component | Description |
|-----------|-------------|
| **Skills** | 25 filterable skill bars organized by category with animated fill widths |
| **InteractiveDemos** | Four live demos -- BREAKTHROUGH, POWERUP, SCAFFOLD, SENTIENT -- each an interactive mini-application |
| **FeaturedProjects** | Five project cards with thumbnails, tags, and case study modal triggers |
| **CodeShowcase** | Three syntax-highlighted code tabs using Prism React Renderer |
| **LiveMetrics** | Four animated counters (e.g., projects completed, years of experience) with scroll-triggered counting |
| **Timeline** | Seven chronological entries spanning 2019 to 2026 |

### Utilities and Overlays

| Component | Description |
|-----------|-------------|
| **CommandPalette** | Ctrl+K search overlay for quick navigation to any section or project |
| **ProjectModal** | Full case study overlay triggered from FeaturedProjects cards |
| **ErrorBoundary** | React error boundary wrapping the application with a fallback UI |
| **Skeleton** | Shimmer loading placeholder used while Three.js and heavy content load |

---

## File Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── manifest.json
│   └── og-image.png
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── Proof/
│   │   │   ├── CodeShowcase.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── InteractiveDemos.tsx
│   │   │   ├── LiveMetrics.tsx
│   │   │   ├── Proof.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Timeline.tsx
│   │   ├── BackgroundEffects.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── Contact.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HeroSkeleton.tsx
│   │   ├── Identity.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navigation.tsx
│   │   ├── Process.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── SideNav.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Thoughts.tsx
│   │   └── Trust.tsx
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useCommandPalette.ts
│   │   ├── useReducedMotion.ts
│   │   └── useThreeScene.ts
│   ├── lib/
│   │   ├── data.ts
│   │   ├── design-tokens.ts
│   │   ├── motion.ts
│   │   ├── social-icons.tsx
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── backup/
├── .github/                    # GitHub Actions workflows
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── validate.sh
├── vercel.json
└── vite.config.ts
```

### Key Directories

- **`src/components/`** -- All 22 React components. The `Proof/` subdirectory contains the six tab panels.
- **`src/hooks/`** -- Custom React hooks for scroll tracking, command palette state, reduced motion detection, and Three.js scene management.
- **`src/lib/`** -- Shared utilities, static data, design token definitions, motion presets, and social icon components.
- **`src/styles/`** -- Global CSS with all design token custom properties, component classes, and base styles.

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9.0 or later (or equivalent pnpm/yarn)

### Installation

```bash
git clone https://github.com/marktantongco/portfolio.git
cd portfolio
npm install
```

### Development

Start the local development server with hot module replacement:

```bash
npm run dev
```

The dev server starts at `http://localhost:5173` by default.

### Build

Type-check the project and produce a production build:

```bash
npm run build
```

This runs `tsc -b` for full type checking followed by `vite build`. Output is written to `dist/`.

### Preview

Serve the production build locally for testing:

```bash
npm run preview
```

### Lint

Run ESLint against the entire project:

```bash
npm run lint
```

---

## Performance

### Build Output

The production build produces 18 chunks. Three.js is lazy-loaded and is not part of the initial bundle.

```
dist/index.html                             4.15 kB │ gzip:   1.54 kB
dist/assets/index.css                      34.31 kB │ gzip:   7.10 kB
dist/assets/index.js                       50.31 kB │ gzip:  14.07 kB
dist/assets/vendor.js                     178.46 kB │ gzip:  56.36 kB
dist/assets/framer-motion.js              133.38 kB │ gzip:  43.57 kB
dist/assets/hero.js (Three.js, lazy)      533.00 kB │ gzip: 133.57 kB
```

### Performance Strategy

- **Code splitting** -- 18 chunks total. React, Framer Motion, and Three.js each occupy their own chunk.
- **Lazy loading** -- The Three.js hero scene (533KB) is loaded via `React.lazy()` behind a `Suspense` boundary with a skeleton fallback.
- **content-visibility: auto** -- Off-screen sections are skipped by the browser's rendering pipeline.
- **Tab virtualization** -- The Proof section only mounts the active tab panel. Switching tabs unmounts the previous and mounts the next.
- **No SSR overhead** -- As a pure SPA, there is no server-side rendering cost. All HTML is pre-built at compile time.

### Build Time

Total production build completes in approximately **389ms**.

---

## Accessibility

The site targets **WCAG AA** compliance across all interactive content.

### Contrast Ratios

- **Text content** -- Minimum 4.5:1 contrast ratio against backgrounds, meeting WCAG AA SC 1.4.3.
- **UI components and graphical objects** -- Minimum 3:1 contrast ratio, meeting WCAG AA SC 1.4.11.

### Keyboard Navigation

- All interactive elements (links, buttons, tabs, form controls) are reachable via Tab key.
- Focus order follows a logical top-to-bottom, left-to-right reading pattern.
- `focus-visible` rings are applied to all interactive elements on keyboard focus (not on mouse click).
- The command palette is activated with Ctrl+K and supports arrow key navigation through results.
- The navigation menu supports keyboard traversal including the mobile hamburger toggle.

### Screen Reader Support

- All images have descriptive `alt` text.
- Interactive elements include `aria-label` attributes where the visible text alone is insufficient.
- The tabbed Proof section uses proper ARIA tab roles: `tablist`, `tab`, `tabpanel`, `aria-selected`, and `aria-controls`.
- The command palette uses `role="dialog"` with `aria-modal="true"`.
- Status messages (form submission, errors) are announced via ARIA live regions.

### Reduced Motion

- The `useReducedMotion` hook detects the `prefers-reduced-motion: reduce` media query.
- When reduced motion is preferred, all Framer Motion animations fall back to simple opacity transitions or are disabled entirely.
- The Three.js particle scene is not rendered when reduced motion is active.
- CSS transitions on hover and press states are replaced with instant state changes.

---

## Animation System

All animations use a unified spring-overshoot easing curve:

```
cubic-bezier(0.16, 1, 0.3, 1) over 320ms
```

This creates a fast-start, slightly overshooting motion that settles naturally. It is used consistently across:

- **Entrance animations** -- Elements fade in and slide up as they enter the viewport via Framer Motion `whileInView`.
- **Exit animations** -- Elements fade out and scale down slightly before unmounting.
- **Hover states** -- Cards lift (shadow increases from 4px to 8px) and slight Y-translation.
- **Press states** -- Elements scale to 0.97 and the shadow collapses to 2px.
- **Layout transitions** -- Tab switches and modal open/close use shared layout animations to maintain visual continuity.
- **Scroll-triggered reveals** -- The Process timeline, metric counters, and section headings animate into view on scroll.

The animation presets are centralized in `src/lib/motion.ts` as reusable Framer Motion variants, ensuring consistent timing and behavior across all components.

---

## Deployment

### GitHub Pages (Primary)

The site deploys to GitHub Pages via GitHub Actions. On every push to the `main` branch, the CI pipeline runs type checking, linting, and the production build, then deploys the `dist/` directory to the `gh-pages` branch.

```
Source branch:  main
Deploy branch:  gh-pages
URL:            https://marktantongco.github.io/portfolio
Base path:      /portfolio
```

The `base` option in `vite.config.ts` is set to `/portfolio/` to ensure all asset paths are correct when served from a subdirectory on GitHub Pages.

### Vercel (Secondary)

A `vercel.json` configuration file is included for deployment to Vercel as an alternative host. Vercel serves the SPA with clean URLs by rewriting all non-file routes to `index.html`.

---

## License

This project is licensed under the **MIT License**.
