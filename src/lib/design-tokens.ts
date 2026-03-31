// ═══════════════════════════════════════════════════════
// DESIGN TOKENS — exported constants matching CSS variables
// ═══════════════════════════════════════════════════════
export const TOKENS = {
  yellow:  'var(--brutal-yellow)',
  lime:    'var(--brutal-lime)',
  cyan:    'var(--brutal-cyan)',
  magenta: 'var(--brutal-magenta)',
  gold:    'var(--brutal-gold)',
  orange:  'var(--brutal-orange)',
  red:     'var(--brutal-red)',
  green:   'var(--brutal-green)',
  void:    'var(--brutal-void)',
  surface: 'var(--brutal-surface)',
  border:  'var(--brutal-border)',
  muted:   'var(--brutal-text-muted)',
} as const;

export type TokenKey = keyof typeof TOKENS;

export const SHADOWS = {
  brutal: '6px 6px 0px var(--brutal-yellow)',
  brutalLg: '8px 8px 0px var(--brutal-yellow)',
  brutalHover: '10px 10px 0px var(--brutal-yellow)',
} as const;

export const BORDERS = {
  thin: '2px solid var(--brutal-border)',
  thick: '4px solid var(--brutal-border)',
} as const;
