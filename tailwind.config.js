/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brutal-yellow':  'var(--brutal-yellow)',
        'brutal-lime':    'var(--brutal-lime)',
        'brutal-cyan':    'var(--brutal-cyan)',
        'brutal-magenta': 'var(--brutal-magenta)',
        'brutal-gold':    'var(--brutal-gold)',
        'brutal-orange':  'var(--brutal-orange)',
        'brutal-red':     'var(--brutal-red)',
        'brutal-green':   'var(--brutal-green)',
        'brutal-void':    'var(--brutal-void)',
        'brutal-surface': 'var(--brutal-surface)',
        'brutal-border':  'var(--brutal-border)',
        'brutal-muted':   'var(--brutal-text-muted)',
      },
      boxShadow: {
        'brutal':      '6px 6px 0px var(--brutal-yellow)',
        'brutal-lg':   '8px 8px 0px var(--brutal-yellow)',
        'brutal-hover': '10px 10px 0px var(--brutal-yellow)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
