/**
 * Shared motion constants — single source of truth for all Framer Motion
 * animation timing.  Mirrors the CSS custom properties in globals.css so
 * that JS and CSS motion systems stay in sync.
 *
 * Usage:
 *   import { EASE_SPRING, DURATION } from '@/lib/motion';
 *   transition={{ duration: DURATION.enter, ease: EASE_SPRING }}
 */

// ── Easing curves ──────────────────────────────────────────────────
// expo-out — fast start, gentle deceleration (no bounce)
export const EASE_SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];

// exit curve — slightly faster for snappy dismissals
export const EASE_EXIT = [0.7, 0, 0.84, 0] as [number, number, number, number];

// ── Durations (seconds) ───────────────────────────────────────────
export const DURATION = {
  enter: 0.32,
  exit: 0.2,
  hover: 0.15,
  press: 0.08,
  layout: 0.32,
} as const;

// ── Stagger delays ────────────────────────────────────────────────
export const STAGGER = {
  /** Delay between staggered children (e.g. list items, nav links) */
  items: 0.08,
  /** Initial delay before stagger begins */
  delayChildren: 0.15,
} as const;
