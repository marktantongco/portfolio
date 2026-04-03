import { Globe, Link2, AtSign, Mail } from 'lucide-react';

const socials = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: AtSign, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: 'var(--border-thin)' }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status badge */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono font-semibold tracking-wide"
          style={{
            background: 'var(--brutal-surface)',
            border: 'var(--border-thin)',
            color: 'var(--brutal-green)',
          }}
        >
          <span
            className="w-2 h-2 inline-block"
            style={{
              background: 'var(--brutal-green)',
              animation: 'pulse-bar 2s ease-in-out infinite',
            }}
          />
          AVAILABLE FOR WORK
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="p-2 transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[-2px]"
              style={{
                border: 'var(--border-thin)',
                color: 'var(--brutal-border)',
              }}
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-xs font-mono"
          style={{ color: 'var(--brutal-text-muted)' }}
        >
          © {new Date().getFullYear()} MARK ANTHONY TANTONGCO
        </p>
      </div>
    </footer>
  );
}
