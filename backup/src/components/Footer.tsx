import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from '@/lib/social-icons';
import { socialLinks } from '@/lib/data';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Github: GithubIcon,
  Twitter: TwitterIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Mail,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-6" style={{ borderTop: 'var(--border-thick)' }}>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Tagline */}
        <p className="label-text" style={{ color: 'var(--brutal-text-muted)' }}>
          FORGED WITH RAW POWER. ZERO CORPORATE POLISH.
        </p>

        {/* Built with */}
        <p className="text-xs" style={{ color: 'var(--brutal-text-muted)' }}>
          Built with React, Three.js, Framer Motion, TypeScript
        </p>

        {/* Status */}
        <div className="flex items-center gap-2">
          <motion.span
            className="inline-block w-2 h-2"
            style={{ background: 'var(--brutal-green)', borderRadius: '50%' }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="label-text" style={{ color: 'var(--brutal-green)' }}>
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-all duration-150 hover:-translate-y-0.5"
                style={{ border: 'var(--border-thin)', color: 'var(--brutal-border)' }}
                aria-label={link.ariaLabel}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: 'var(--brutal-text-muted)' }}>
          &copy; {year} Mark Anthony Tantongco. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
